import express from 'express';
import { query, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get user's friends
router.get('/', authenticateToken, [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 })
], async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const friendships = await prisma.friendship.findMany({
      where: {
        AND: [
          {
            OR: [
              { senderId: req.user.id },
              { receiverId: req.user.id }
            ]
          },
          { status: 'ACCEPTED' }
        ]
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true,
            verified: true
          }
        },
        receiver: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true,
            verified: true
          }
        }
      },
      skip,
      take: parseInt(limit),
      orderBy: { updatedAt: 'desc' }
    });

    const total = await prisma.friendship.count({
      where: {
        AND: [
          {
            OR: [
              { senderId: req.user.id },
              { receiverId: req.user.id }
            ]
          },
          { status: 'ACCEPTED' }
        ]
      }
    });

    const friends = friendships.map(friendship => {
      const friend = friendship.senderId === req.user.id 
        ? friendship.receiver 
        : friendship.sender;
      
      return {
        ...friend,
        friendshipId: friendship.id,
        friendsSince: friendship.updatedAt
      };
    });

    res.json({
      friends,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get friends error:', error);
    res.status(500).json({ message: 'Failed to get friends' });
  }
});

// Send friend request
router.post('/request/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId === req.user.id) {
      return res.status(400).json({ message: 'Cannot send friend request to yourself' });
    }

    // Check if user exists
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true, displayName: true }
    });

    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if friendship already exists
    const existingFriendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { senderId: req.user.id, receiverId: userId },
          { senderId: userId, receiverId: req.user.id }
        ]
      }
    });

    if (existingFriendship) {
      let message;
      switch (existingFriendship.status) {
        case 'ACCEPTED':
          message = 'You are already friends';
          break;
        case 'PENDING':
          message = existingFriendship.senderId === req.user.id 
            ? 'Friend request already sent' 
            : 'This user has already sent you a friend request';
          break;
        case 'REJECTED':
          message = 'Friend request was rejected';
          break;
        case 'BLOCKED':
          message = 'Cannot send friend request';
          break;
        default:
          message = 'Friendship already exists';
      }
      return res.status(400).json({ message });
    }

    // Create friend request
    const friendship = await prisma.friendship.create({
      data: {
        senderId: req.user.id,
        receiverId: userId,
        status: 'PENDING'
      }
    });

    // Send real-time notification
    if (global.socketIO) {
      global.socketIO.emit('friend_request_sent', {
        recipientId: userId,
        senderId: req.user.id,
        sender: req.user
      });
    }

    res.status(201).json({
      message: 'Friend request sent successfully',
      friendship: {
        id: friendship.id,
        status: friendship.status,
        sentTo: targetUser
      }
    });
  } catch (error) {
    console.error('Send friend request error:', error);
    res.status(500).json({ message: 'Failed to send friend request' });
  }
});

// Get pending friend requests (received)
router.get('/requests/received', authenticateToken, [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 })
], async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const requests = await prisma.friendship.findMany({
      where: {
        receiverId: req.user.id,
        status: 'PENDING'
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true,
            verified: true,
            createdAt: true
          }
        }
      },
      skip,
      take: parseInt(limit),
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.friendship.count({
      where: {
        receiverId: req.user.id,
        status: 'PENDING'
      }
    });

    res.json({
      requests: requests.map(req => ({
        id: req.id,
        sender: req.sender,
        requestedAt: req.createdAt
      })),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get friend requests error:', error);
    res.status(500).json({ message: 'Failed to get friend requests' });
  }
});

// Get sent friend requests
router.get('/requests/sent', authenticateToken, [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 })
], async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const requests = await prisma.friendship.findMany({
      where: {
        senderId: req.user.id,
        status: 'PENDING'
      },
      include: {
        receiver: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true,
            verified: true
          }
        }
      },
      skip,
      take: parseInt(limit),
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.friendship.count({
      where: {
        senderId: req.user.id,
        status: 'PENDING'
      }
    });

    res.json({
      requests: requests.map(req => ({
        id: req.id,
        receiver: req.receiver,
        sentAt: req.createdAt
      })),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get sent friend requests error:', error);
    res.status(500).json({ message: 'Failed to get sent friend requests' });
  }
});

// Respond to friend request
router.put('/request/:requestId', authenticateToken, async (req, res) => {
  try {
    const { requestId } = req.params;
    const { action } = req.body; // 'accept' or 'reject'

    if (!['accept', 'reject'].includes(action)) {
      return res.status(400).json({ message: 'Action must be either "accept" or "reject"' });
    }

    const friendship = await prisma.friendship.findUnique({
      where: { id: requestId },
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

    if (!friendship) {
      return res.status(404).json({ message: 'Friend request not found' });
    }

    if (friendship.receiverId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to respond to this request' });
    }

    if (friendship.status !== 'PENDING') {
      return res.status(400).json({ message: 'Friend request has already been responded to' });
    }

    const updatedFriendship = await prisma.friendship.update({
      where: { id: requestId },
      data: {
        status: action === 'accept' ? 'ACCEPTED' : 'REJECTED'
      }
    });

    // Send real-time notification if accepted
    if (action === 'accept' && global.socketIO) {
      global.socketIO.emit('friend_request_accepted', {
        senderId: friendship.senderId,
        accepterId: req.user.id,
        accepter: req.user
      });
    }

    res.json({
      message: `Friend request ${action}ed successfully`,
      friendship: {
        id: updatedFriendship.id,
        status: updatedFriendship.status,
        friend: friendship.sender
      }
    });
  } catch (error) {
    console.error('Respond to friend request error:', error);
    res.status(500).json({ message: 'Failed to respond to friend request' });
  }
});

// Remove friend / Cancel friend request
router.delete('/:friendshipId', authenticateToken, async (req, res) => {
  try {
    const { friendshipId } = req.params;

    const friendship = await prisma.friendship.findUnique({
      where: { id: friendshipId }
    });

    if (!friendship) {
      return res.status(404).json({ message: 'Friendship not found' });
    }

    // Check if user is part of this friendship
    if (friendship.senderId !== req.user.id && friendship.receiverId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to modify this friendship' });
    }

    await prisma.friendship.delete({
      where: { id: friendshipId }
    });

    const action = friendship.status === 'PENDING' ? 'cancelled' : 'removed';
    res.json({ message: `Friendship ${action} successfully` });
  } catch (error) {
    console.error('Remove friendship error:', error);
    res.status(500).json({ message: 'Failed to remove friendship' });
  }
});

// Block user
router.post('/block/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId === req.user.id) {
      return res.status(400).json({ message: 'Cannot block yourself' });
    }

    // Check if user exists
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true }
    });

    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if friendship exists
    const existingFriendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { senderId: req.user.id, receiverId: userId },
          { senderId: userId, receiverId: req.user.id }
        ]
      }
    });

    if (existingFriendship) {
      // Update existing friendship to blocked
      await prisma.friendship.update({
        where: { id: existingFriendship.id },
        data: { status: 'BLOCKED' }
      });
    } else {
      // Create new blocked relationship
      await prisma.friendship.create({
        data: {
          senderId: req.user.id,
          receiverId: userId,
          status: 'BLOCKED'
        }
      });
    }

    res.json({ message: 'User blocked successfully' });
  } catch (error) {
    console.error('Block user error:', error);
    res.status(500).json({ message: 'Failed to block user' });
  }
});

// Unblock user
router.delete('/block/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;

    const friendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { senderId: req.user.id, receiverId: userId, status: 'BLOCKED' },
          { senderId: userId, receiverId: req.user.id, status: 'BLOCKED' }
        ]
      }
    });

    if (!friendship) {
      return res.status(404).json({ message: 'User is not blocked' });
    }

    // Only the blocker can unblock
    if (friendship.senderId !== req.user.id) {
      return res.status(403).json({ message: 'Cannot unblock this user' });
    }

    await prisma.friendship.delete({
      where: { id: friendship.id }
    });

    res.json({ message: 'User unblocked successfully' });
  } catch (error) {
    console.error('Unblock user error:', error);
    res.status(500).json({ message: 'Failed to unblock user' });
  }
});

export default router;