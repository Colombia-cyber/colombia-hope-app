import express from 'express';
import { body, validationResult, query } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get news articles
router.get('/', optionalAuth, [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('category').optional().isLength({ min: 1, max: 50 }),
  query('search').optional().isLength({ min: 1, max: 100 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { page = 1, limit = 10, category, search } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build where clause
    const where = {
      published: true,
      ...(category && { category }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } },
          { summary: { contains: search, mode: 'insensitive' } }
        ]
      })
    };

    const [news, total] = await Promise.all([
      prisma.news.findMany({
        where,
        select: {
          id: true,
          title: true,
          summary: true,
          imageUrl: true,
          source: true,
          category: true,
          tags: true,
          publishedAt: true,
          createdAt: true
        },
        skip,
        take: parseInt(limit),
        orderBy: { publishedAt: 'desc' }
      }),
      prisma.news.count({ where })
    ]);

    res.json({
      news,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get news error:', error);
    res.status(500).json({ message: 'Failed to get news' });
  }
});

// Get single news article
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const article = await prisma.news.findUnique({
      where: { 
        id,
        published: true
      }
    });

    if (!article) {
      return res.status(404).json({ message: 'News article not found' });
    }

    res.json({ article });
  } catch (error) {
    console.error('Get news article error:', error);
    res.status(500).json({ message: 'Failed to get news article' });
  }
});

// Create news article (admin/moderator only - simplified for demo)
router.post('/', authenticateToken, [
  body('title').isLength({ min: 1, max: 200 }),
  body('content').isLength({ min: 1, max: 10000 }),
  body('summary').optional().isLength({ max: 500 }),
  body('imageUrl').optional().isURL(),
  body('source').optional().isLength({ max: 100 }),
  body('category').optional().isLength({ max: 50 }),
  body('tags').optional().isArray(),
  body('published').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { 
      title, 
      content, 
      summary, 
      imageUrl, 
      source, 
      category, 
      tags = [], 
      published = false 
    } = req.body;

    const article = await prisma.news.create({
      data: {
        title,
        content,
        summary,
        imageUrl,
        source,
        category,
        tags,
        published,
        publishedAt: published ? new Date() : null
      }
    });

    res.status(201).json({
      message: 'News article created successfully',
      article
    });
  } catch (error) {
    console.error('Create news error:', error);
    res.status(500).json({ message: 'Failed to create news article' });
  }
});

// Update news article
router.put('/:id', authenticateToken, [
  body('title').optional().isLength({ min: 1, max: 200 }),
  body('content').optional().isLength({ min: 1, max: 10000 }),
  body('summary').optional().isLength({ max: 500 }),
  body('imageUrl').optional().isURL(),
  body('source').optional().isLength({ max: 100 }),
  body('category').optional().isLength({ max: 50 }),
  body('tags').optional().isArray(),
  body('published').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const updateData = req.body;

    // If publishing for the first time, set publishedAt
    if (updateData.published && !updateData.publishedAt) {
      const existing = await prisma.news.findUnique({
        where: { id },
        select: { published: true }
      });

      if (existing && !existing.published) {
        updateData.publishedAt = new Date();
      }
    }

    const article = await prisma.news.update({
      where: { id },
      data: updateData
    });

    res.json({
      message: 'News article updated successfully',
      article
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'News article not found' });
    }
    console.error('Update news error:', error);
    res.status(500).json({ message: 'Failed to update news article' });
  }
});

// Delete news article
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.news.delete({
      where: { id }
    });

    res.json({ message: 'News article deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'News article not found' });
    }
    console.error('Delete news error:', error);
    res.status(500).json({ message: 'Failed to delete news article' });
  }
});

// Get news categories
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await prisma.news.findMany({
      where: {
        published: true,
        category: { not: null }
      },
      select: {
        category: true
      },
      distinct: ['category']
    });

    const uniqueCategories = categories
      .map(item => item.category)
      .filter(Boolean)
      .sort();

    res.json({ categories: uniqueCategories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Failed to get categories' });
  }
});

// Get trending tags
router.get('/meta/tags', async (req, res) => {
  try {
    const articles = await prisma.news.findMany({
      where: {
        published: true,
        tags: { not: { equals: [] } }
      },
      select: { tags: true },
      take: 100, // Limit for performance
      orderBy: { publishedAt: 'desc' }
    });

    // Flatten tags and count frequency
    const tagCounts = {};
    articles.forEach(article => {
      article.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    // Sort by frequency and take top 20
    const trendingTags = Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 20)
      .map(([tag, count]) => ({ tag, count }));

    res.json({ tags: trendingTags });
  } catch (error) {
    console.error('Get trending tags error:', error);
    res.status(500).json({ message: 'Failed to get trending tags' });
  }
});

export default router;