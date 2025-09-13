import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const { user, token, isAuthenticated } = useAuth();
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(new Set());

  // Socket events handlers
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (isAuthenticated && token && !socket) {
      const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';
      
      const newSocket = io(SOCKET_URL, {
        auth: {
          token: token
        },
        autoConnect: true
      });

      newSocket.on('connect', () => {
        console.log('Connected to server');
        setIsConnected(true);
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from server');
        setIsConnected(false);
      });

      newSocket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        setIsConnected(false);
      });

      // User status events
      newSocket.on('user_online', (data) => {
        setOnlineUsers(prev => new Set([...prev, data.userId]));
      });

      newSocket.on('user_offline', (data) => {
        setOnlineUsers(prev => {
          const newSet = new Set(prev);
          newSet.delete(data.userId);
          return newSet;
        });
      });

      // Notification events
      newSocket.on('notification', (notification) => {
        setNotifications(prev => [notification, ...prev]);
        setUnreadCount(prev => prev + 1);
        
        // Show browser notification if permitted
        if (Notification.permission === 'granted') {
          new Notification(notification.title, {
            body: notification.message,
            icon: '/favicon.ico'
          });
        }
      });

      // Friend request events
      newSocket.on('friend_request_received', (data) => {
        console.log('Friend request received from:', data.sender.username);
      });

      newSocket.on('friend_request_accepted_notification', (data) => {
        console.log('Friend request accepted by:', data.accepter.username);
      });

      // Post interaction events
      newSocket.on('post_like_notification', (data) => {
        console.log(`${data.likerName} liked your post`);
      });

      newSocket.on('new_comment_notification', (data) => {
        console.log(`${data.commenter.username} commented on your post`);
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    } else if (!isAuthenticated && socket) {
      socket.close();
      setSocket(null);
      setIsConnected(false);
      setOnlineUsers(new Set());
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [isAuthenticated, token, socket]);

  // Chat functions
  const sendMessage = (recipientId, message, type = 'text') => {
    if (socket && isConnected) {
      socket.emit('send_message', {
        recipientId,
        message,
        type
      });
    }
  };

  const joinChat = (chatId) => {
    if (socket && isConnected) {
      socket.emit('join_chat', { chatId });
    }
  };

  const leaveChat = (chatId) => {
    if (socket && isConnected) {
      socket.emit('leave_chat', { chatId });
    }
  };

  const startTyping = (recipientId) => {
    if (socket && isConnected) {
      socket.emit('typing_start', { recipientId });
    }
  };

  const stopTyping = (recipientId) => {
    if (socket && isConnected) {
      socket.emit('typing_stop', { recipientId });
    }
  };

  // Post interaction functions
  const notifyPostLiked = (postId, authorId) => {
    if (socket && isConnected) {
      socket.emit('post_liked', { postId, authorId });
    }
  };

  const notifyCommentAdded = (postId, authorId, comment) => {
    if (socket && isConnected) {
      socket.emit('comment_added', { postId, authorId, comment });
    }
  };

  // Friend request functions
  const notifyFriendRequestSent = (recipientId) => {
    if (socket && isConnected) {
      socket.emit('friend_request_sent', { recipientId });
    }
  };

  const notifyFriendRequestAccepted = (senderId) => {
    if (socket && isConnected) {
      socket.emit('friend_request_accepted', { senderId });
    }
  };

  // Notification management
  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, read: true }
          : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  // Request notification permission on first connection
  useEffect(() => {
    if (isConnected && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, [isConnected]);

  const value = {
    socket,
    isConnected,
    onlineUsers,
    notifications,
    unreadCount,
    
    // Chat functions
    sendMessage,
    joinChat,
    leaveChat,
    startTyping,
    stopTyping,
    
    // Post interaction functions
    notifyPostLiked,
    notifyCommentAdded,
    
    // Friend functions
    notifyFriendRequestSent,
    notifyFriendRequestAccepted,
    
    // Notification functions
    markNotificationAsRead,
    clearAllNotifications,
    
    // Utility functions
    isUserOnline: (userId) => onlineUsers.has(userId)
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};