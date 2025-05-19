import { Router } from 'express';
import { LookOnChainScraper, Article } from '../utils/scraper/lookOnChainScraper.js';

const router = Router();
const scraper = new LookOnChainScraper();

// Store active SSE connections
const clients = new Set<{ res: any }>();

// SSE endpoint for LookOnChain articles
router.get('/articles/stream', async (req, res) => {
  // Set headers for SSE
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  // Send initial connection message
  res.write('data: {"type": "connected"}\n\n');

  // Add this client to our set
  const client = { res };
  clients.add(client);

  // Send initial articles
  const initialArticles = await scraper.getLatestArticles();
  if (initialArticles.length > 0) {
    const articlesWithPublishedAt = initialArticles.map((article: Article) => ({
      ...article,
      publishedAt: article.createTime,
    }));
    res.write(
      `data: ${JSON.stringify({ type: 'initial', articles: articlesWithPublishedAt })}\n\n`
    );
  }

  // Handle client disconnect
  req.on('close', () => {
    clients.delete(client);
  });
});

// New endpoint to get a single article by ID
router.get('/articles/:id', async (req, res) => {
  try {
    const articleId = req.params.id;
    const latestArticles = await scraper.getLatestArticles(); // Assuming this gets a reasonably small list
    const article = latestArticles.find(a => a.id === articleId);

    if (article) {
      res.json({
        ...article,
        publishedAt: article.createTime,
      });
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    console.error(`Error fetching article with ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Error fetching article' });
  }
});

// New paginated endpoint for articles
router.get('/articles', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const allArticles = await scraper.getLatestArticles(); // Fetch all and paginate

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedArticlesRaw = allArticles.slice(startIndex, endIndex);
    const paginatedArticles = paginatedArticlesRaw.map(article => ({
      ...article,
      publishedAt: article.createTime,
    }));
    const totalArticles = allArticles.length;
    const hasMore = endIndex < totalArticles;

    res.json({
      articles: paginatedArticles,
      page,
      limit,
      total: totalArticles,
      hasMore,
    });
  } catch (error) {
    console.error('Error fetching paginated articles:', error);
    res.status(500).json({ message: 'Error fetching articles' });
  }
});

// Handle new articles
scraper.on('newArticle', article => {
  // Broadcast to all connected clients
  clients.forEach(client => {
    try {
      const articleWithPublishedAt = {
        ...article,
        publishedAt: article.createTime,
      };
      client.res.write(
        `data: ${JSON.stringify({ type: 'article', data: articleWithPublishedAt })}\n\n`
      );
    } catch (error) {
      // If write fails, remove the client
      clients.delete(client);
    }
  });
});

// Handle errors
scraper.on('error', error => {
  clients.forEach(client => {
    try {
      client.res.write(`data: ${JSON.stringify({ type: 'error', message: error.message })}\n\n`);
    } catch (error) {
      clients.delete(client);
    }
  });
});

// Start scraping if not already started
if (!scraper.getRunningStatus()) {
  scraper.start(); // Using the correct method name
}

export default router;
