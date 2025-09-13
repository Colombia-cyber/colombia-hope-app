import express from 'express';
import { query, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get user notifications
router.get('/', authenticateToken, [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('unread').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { page = 1, limit = 20, unread } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {
      receiverId: req.user.id,
      ...(unread === 'true' && { read: false })
    };

    const [notifications, total, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where,
        include: {
          sender: {
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
      }),
      prisma.notification.count({ where }),
      prisma.notification.count({
        where: {
          receiverId: req.user.id,
          read: false
        }
      })
    ]);

    res.json({
      notifications,
      unreadCount,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ message: 'Failed to get notifications' });
  }
});

// Mark notification as read
router.put('/:id/read', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await prisma.notification.findUnique({
      where: { id }
    });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    if (notification.receiverId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to modify this notification' });
    }

    const updatedNotification = await prisma.notification.update({
      where: { id },
      data: { read: true },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true,
            verified: true
          }
        }
      }
    });

    res.json({
      message: 'Notification marked as read',
      notification: updatedNotification
    });
  } catch (error) {
    console.error('Mark notification read error:', error);
    res.status(500).json({ message: 'Failed to mark notification as read' });
  }
});

// Mark multiple notifications as read
router.put('/read', authenticateToken, async (req, res) => {
  try {
    const { notificationIds } = req.body;

    if (!Array.isArray(notificationIds) || notificationIds.length === 0) {
      return res.status(400).json({ message: 'notificationIds array is required' });
    }

    // Verify all notifications belong to the user
    const notifications = await prisma.notification.findMany({
      where: {
        id: { in: notificationIds },
        receiverId: req.user.id
      }
    });

    if (notifications.length !== notificationIds.length) {
      return res.status(400).json({ message: 'Some notifications not found or not accessible' });
    }

    await prisma.notification.updateMany({
      where: {
        id: { in: notificationIds },
        receiverId: req.user.id
      },
      data: { read: true }
    });

    res.json({ message: `${notificationIds.length} notifications marked as read` });
  } catch (error) {
    console.error('Mark notifications read error:', error);
    res.status(500).json({ message: 'Failed to mark notifications as read' });
  }
});

// Mark all notifications as read
router.put('/read-all', authenticateToken, async (req, res) => {
  try {
    const result = await prisma.notification.updateMany({
      where: {
        receiverId: req.user.id,
        read: false
      },
      data: { read: true }
    });

    res.json({ 
      message: 'All notifications marked as read',
      count: result.count
    });
  } catch (error) {
    console.error('Mark all notifications read error:', error);
    res.status(500).json({ message: 'Failed to mark all notifications as read' });
  }
});

// Delete notification
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await prisma.notification.findUnique({
      where: { id }
    });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    if (notification.receiverId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this notification' });
    }

    await prisma.notification.delete({
      where: { id }
    });

    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({ message: 'Failed to delete notification' });
  }
});

// Delete multiple notifications
router.delete('/', authenticateToken, async (req, res) => {
  try {
    const { notificationIds } = req.body;

    if (!Array.isArray(notificationIds) || notificationIds.length === 0) {
      return res.status(400).json({ message: 'notificationIds array is required' });
    }

    // Verify all notifications belong to the user
    const notifications = await prisma.notification.findMany({
      where: {
        id: { in: notificationIds },
        receiverId: req.user.id
      }
    });

    if (notifications.length !== notificationIds.length) {
      return res.status(400).json({ message: 'Some notifications not found or not accessible' });
    }

    await prisma.notification.deleteMany({
      where: {
        id: { in: notificationIds },
        receiverId: req.user.id
      }
    });

    res.json({ message: `${notificationIds.length} notifications deleted` });
  } catch (error) {
    console.error('Delete notifications error:', error);
    res.status(500).json({ message: 'Failed to delete notifications' });
  }
});

// Get notification statistics
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const [total, unread, byType] = await Promise.all([
      prisma.notification.count({
        where: { receiverId: req.user.id }
      }),
      prisma.notification.count({
        where: { receiverId: req.user.id, read: false }
      }),
      prisma.notification.groupBy({
        by: ['type'],
        where: { receiverId: req.user.id },
        _count: { type: true }
      })
    ]);

    const typeStats = byType.reduce((acc, item) => {
      acc[item.type] = item._count.type;
      return acc;
    }, {});

    res.json({
      total,
      unread,
      read: total - unread,
      byType: typeStats
    });
  } catch (error) {
    console.error('Get notification stats error:', error);
    res.status(500).json({ message: 'Failed to get notification statistics' });
  }
});

export default router;