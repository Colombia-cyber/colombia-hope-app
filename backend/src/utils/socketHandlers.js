import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Store connected users
const connectedUsers = new Map();

export const setupSocketHandlers = (io) => {
  // Authentication middleware for Socket.IO
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          username: true,
          displayName: true,
          avatar: true
        }
      });

      if (!user) {
        return next(new Error('User not found'));
      }

      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User ${socket.user.username} connected`);
    
    // Store user connection
    connectedUsers.set(socket.user.id, {
      socketId: socket.id,
      user: socket.user,
      lastSeen: new Date()
    });

    // Join user to their personal room for notifications
    socket.join(`user_${socket.user.id}`);

    // Emit user online status
    socket.broadcast.emit('user_online', {
      userId: socket.user.id,
      username: socket.user.username
    });

    // Chat message handler
    socket.on('send_message', async (data) => {
      try {
        const { recipientId, message, type = 'text' } = data;

        // Validate message
        if (!message || !recipientId) {
          socket.emit('error', { message: 'Message and recipient required' });
          return;
        }

        // Check if users are friends (optional - you might want to allow messages to all users)
        const friendship = await prisma.friendship.findFirst({
          where: {
            OR: [
              { senderId: socket.user.id, receiverId: recipientId, status: 'ACCEPTED' },
              { senderId: recipientId, receiverId: socket.user.id, status: 'ACCEPTED' }
            ]
          }
        });

        if (!friendship) {
          socket.emit('error', { message: 'Can only message friends' });
          return;
        }

        // Create message object
        const messageData = {
          id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          senderId: socket.user.id,
          recipientId,
          message,
          type,
          timestamp: new Date(),
          sender: socket.user
        };

        // Send to recipient if online
        io.to(`user_${recipientId}`).emit('receive_message', messageData);
        
        // Send back to sender as confirmation
        socket.emit('message_sent', messageData);

        // Create notification for recipient
        await createNotification({
          type: 'SYSTEM_UPDATE',
          title: 'New Message',
          message: `${socket.user.displayName || socket.user.username} sent you a message`,
          senderId: socket.user.id,
          receiverId: recipientId
        });

      } catch (error) {
        console.error('Send message error:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Typing indicator
    socket.on('typing_start', (data) => {
      const { recipientId } = data;
      if (recipientId) {
        io.to(`user_${recipientId}`).emit('user_typing', {
          userId: socket.user.id,
          username: socket.user.username
        });
      }
    });

    socket.on('typing_stop', (data) => {
      const { recipientId } = data;
      if (recipientId) {
        io.to(`user_${recipientId}`).emit('user_stopped_typing', {
          userId: socket.user.id
        });
      }
    });

    // Join/leave chat rooms
    socket.on('join_chat', (data) => {
      const { chatId } = data;
      socket.join(`chat_${chatId}`);
      socket.emit('joined_chat', { chatId });
    });

    socket.on('leave_chat', (data) => {
      const { chatId } = data;
      socket.leave(`chat_${chatId}`);
      socket.emit('left_chat', { chatId });
    });

    // Post like real-time update
    socket.on('post_liked', async (data) => {
      try {
        const { postId, authorId } = data;
        
        // Emit to post author if online
        io.to(`user_${authorId}`).emit('post_like_notification', {
          postId,
          likerId: socket.user.id,
          likerName: socket.user.displayName || socket.user.username
        });

        // Create notification
        if (authorId !== socket.user.id) {
          await createNotification({
            type: 'POST_LIKE',
            title: 'Post Liked',
            message: `${socket.user.displayName || socket.user.username} liked your post`,
            senderId: socket.user.id,
            receiverId: authorId,
            relatedId: postId
          });
        }
      } catch (error) {
        console.error('Post like notification error:', error);
      }
    });

    // New comment real-time update
    socket.on('comment_added', async (data) => {
      try {
        const { postId, authorId, comment } = data;
        
        // Emit to post author if online
        io.to(`user_${authorId}`).emit('new_comment_notification', {
          postId,
          comment,
          commenter: socket.user
        });

        // Create notification
        if (authorId !== socket.user.id) {
          await createNotification({
            type: 'POST_COMMENT',
            title: 'New Comment',
            message: `${socket.user.displayName || socket.user.username} commented on your post`,
            senderId: socket.user.id,
            receiverId: authorId,
            relatedId: postId
          });
        }
      } catch (error) {
        console.error('Comment notification error:', error);
      }
    });

    // Friend request notification
    socket.on('friend_request_sent', async (data) => {
      try {
        const { recipientId } = data;
        
        io.to(`user_${recipientId}`).emit('friend_request_received', {
          senderId: socket.user.id,
          sender: socket.user
        });

        await createNotification({
          type: 'FRIEND_REQUEST',
          title: 'Friend Request',
          message: `${socket.user.displayName || socket.user.username} sent you a friend request`,
          senderId: socket.user.id,
          receiverId: recipientId
        });
      } catch (error) {
        console.error('Friend request notification error:', error);
      }
    });

    // Friend request accepted notification
    socket.on('friend_request_accepted', async (data) => {
      try {
        const { senderId } = data;
        
        io.to(`user_${senderId}`).emit('friend_request_accepted_notification', {
          accepterId: socket.user.id,
          accepter: socket.user
        });

        await createNotification({
          type: 'FRIEND_ACCEPTED',
          title: 'Friend Request Accepted',
          message: `${socket.user.displayName || socket.user.username} accepted your friend request`,
          senderId: socket.user.id,
          receiverId: senderId
        });
      } catch (error) {
        console.error('Friend accept notification error:', error);
      }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`User ${socket.user.username} disconnected`);
      
      // Remove from connected users
      connectedUsers.delete(socket.user.id);

      // Emit user offline status
      socket.broadcast.emit('user_offline', {
        userId: socket.user.id,
        username: socket.user.username
      });
    });

    // Error handler
    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  });

  // Helper function to send notifications to online users
  const sendNotificationToUser = (userId, notification) => {
    io.to(`user_${userId}`).emit('notification', notification);
  };

  // Export for use in other parts of the application
  io.sendNotificationToUser = sendNotificationToUser;
  io.getConnectedUsers = () => Array.from(connectedUsers.values());
};

// Helper function to create notifications
async function createNotification({ type, title, message, senderId, receiverId, relatedId = null }) {
  try {
    const notification = await prisma.notification.create({
      data: {
        type,
        title,
        message,
        senderId,
        receiverId,
        relatedId
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true
          }
        }
      }
    });

    // Send real-time notification if user is online
    const io = global.socketIO;
    if (io) {
      io.to(`user_${receiverId}`).emit('notification', notification);
    }

    return notification;
  } catch (error) {
    console.error('Create notification error:', error);
  }
}