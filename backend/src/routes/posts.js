import express from 'express';
import { body, validationResult, query } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get posts feed
router.get('/', optionalAuth, [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 })
], async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // If user is authenticated, prioritize posts from friends
    let friendIds = [];
    if (req.user) {
      const friendships = await prisma.friendship.findMany({
        where: {
          OR: [
            { senderId: req.user.id, status: 'ACCEPTED' },
            { receiverId: req.user.id, status: 'ACCEPTED' }
          ]
        }
      });
      
      friendIds = friendships.map(f => 
        f.senderId === req.user.id ? f.receiverId : f.senderId
      );
    }

    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true,
            verified: true
          }
        },
        _count: {
          select: {
            comments: true,
            likes: true
          }
        },
        likes: req.user ? {
          where: { userId: req.user.id },
          select: { id: true }
        } : false
      },
      skip,
      take: parseInt(limit),
      orderBy: [
        // Prioritize friends' posts if user is authenticated
        ...(req.user && friendIds.length > 0 ? [{
          author: {
            id: { in: friendIds }
          }
        }] : []),
        { createdAt: 'desc' }
      ]
    });

    const total = await prisma.post.count();

    const postsWithLikeStatus = posts.map(post => ({
      ...post,
      isLiked: req.user ? post.likes.length > 0 : false,
      likes: undefined // Remove the likes array from response
    }));

    res.json({
      posts: postsWithLikeStatus,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Failed to get posts' });
  }
});

// Create new post
router.post('/', authenticateToken, [
  body('content').isLength({ min: 1, max: 2000 }),
  body('imageUrl').optional().isURL()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content, imageUrl } = req.body;

    const post = await prisma.post.create({
      data: {
        content,
        imageUrl,
        authorId: req.user.id
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true,
            verified: true
          }
        },
        _count: {
          select: {
            comments: true,
            likes: true
          }
        }
      }
    });

    res.status(201).json({
      message: 'Post created successfully',
      post: {
        ...post,
        isLiked: false
      }
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Failed to create post' });
  }
});

// Get single post
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true,
            verified: true
          }
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
                displayName: true,
                avatar: true,
                verified: true
              }
            }
          },
          orderBy: { createdAt: 'asc' }
        },
        _count: {
          select: {
            comments: true,
            likes: true
          }
        },
        likes: req.user ? {
          where: { userId: req.user.id },
          select: { id: true }
        } : false
      }
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({
      post: {
        ...post,
        isLiked: req.user ? post.likes.length > 0 : false,
        likes: undefined // Remove the likes array from response
      }
    });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ message: 'Failed to get post' });
  }
});

// Like/unlike post
router.post('/:id/like', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { id },
      select: { id: true, authorId: true }
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if already liked
    const existingLike = await prisma.postLike.findUnique({
      where: {
        postId_userId: {
          postId: id,
          userId: req.user.id
        }
      }
    });

    let isLiked;
    let likesCount;

    if (existingLike) {
      // Unlike
      await prisma.postLike.delete({
        where: { id: existingLike.id }
      });
      isLiked = false;
    } else {
      // Like
      await prisma.postLike.create({
        data: {
          postId: id,
          userId: req.user.id
        }
      });
      isLiked = true;

      // Send real-time notification if it's not the author's own post
      if (post.authorId !== req.user.id && global.socketIO) {
        global.socketIO.emit('post_liked', {
          postId: id,
          authorId: post.authorId,
          likerId: req.user.id,
          likerName: req.user.displayName || req.user.username
        });
      }
    }

    // Get updated likes count
    likesCount = await prisma.postLike.count({
      where: { postId: id }
    });

    res.json({
      message: isLiked ? 'Post liked' : 'Post unliked',
      isLiked,
      likesCount
    });
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({ message: 'Failed to like/unlike post' });
  }
});

// Add comment to post
router.post('/:id/comments', authenticateToken, [
  body('content').isLength({ min: 1, max: 1000 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { content } = req.body;

    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { id },
      select: { id: true, authorId: true }
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        postId: id,
        authorId: req.user.id
      },
      include: {
        author: {
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

    // Send real-time notification if it's not the author's own post
    if (post.authorId !== req.user.id && global.socketIO) {
      global.socketIO.emit('comment_added', {
        postId: id,
        authorId: post.authorId,
        comment: comment
      });
    }

    res.status(201).json({
      message: 'Comment added successfully',
      comment
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Failed to add comment' });
  }
});

// Delete post (only by author)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: { id },
      select: { id: true, authorId: true }
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.authorId !== req.user.id) {
      return res.status(403).json({ message: 'Only the author can delete this post' });
    }

    await prisma.post.delete({
      where: { id }
    });

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'Failed to delete post' });
  }
});

// Delete comment (only by author or post author)
router.delete('/:postId/comments/:commentId', authenticateToken, async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      include: {
        post: {
          select: { authorId: true }
        }
      }
    });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.postId !== postId) {
      return res.status(400).json({ message: 'Comment does not belong to this post' });
    }

    // Only comment author or post author can delete
    if (comment.authorId !== req.user.id && comment.post.authorId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await prisma.comment.delete({
      where: { id: commentId }
    });

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ message: 'Failed to delete comment' });
  }
});

export default router;