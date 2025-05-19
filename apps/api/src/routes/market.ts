import { Router, Request, Response } from 'express';
import { BinanceClient } from '../utils/binance/index.js';
import { BinanceSSEClient } from '../utils/binance/sse-client.js';

const router = Router();
const binance = new BinanceClient();
const sseClient = new BinanceSSEClient();

/**
 * @openapi
 * /api/market/stream/{symbol}:
 *   get:
 *     summary: Get real-time market data for a symbol (SSE)
 *     description: Streams real-time market data for a specific symbol using Server-Sent Events (SSE).
 *     parameters:
 *       - in: path
 *         name: symbol
 *         schema:
 *           type: string
 *         required: true
 *         description: Symbol (e.g. ETHUSDT)
 *     responses:
 *       200:
 *         description: SSE stream of market data
 *         content:
 *           text/event-stream:
 *             schema:
 *               type: object
 *       500:
 *         description: Server error
 */
router.get('/stream/:symbol', (req: Request, res: Response) => {
  const { symbol } = req.params;
  req.query.symbol = symbol;
  sseClient.createTickerStream(req, res);
});

/**
 * @openapi
 * /api/market/symbols/stream:
 *   get:
 *     summary: Get real-time market data for multiple symbols (SSE)
 *     description: Streams real-time price, price change percent, and volume for each requested symbol using Server-Sent Events (SSE).
 *     parameters:
 *       - in: query
 *         name: symbols
 *         schema:
 *           type: string
 *         required: true
 *         description: Comma-separated list of symbols (e.g. ETHUSDT,BTCUSDT)
 *     responses:
 *       200:
 *         description: SSE stream of market summaries for each symbol
 *         content:
 *           text/event-stream:
 *             schema:
 *               type: object
 *               properties:
 *                 symbol:
 *                   type: string
 *                 price:
 *                   type: string
 *                 priceChangePercent:
 *                   type: string
 *                 volume:
 *                   type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.get('/symbols/stream', async (req: Request, res: Response) => {
  try {
    const symbolsParam = req.query.symbols;
    if (!symbolsParam || typeof symbolsParam !== 'string') {
      res.status(400);
      res.write(`data: ${JSON.stringify({ error: 'symbols query parameter is required' })}\n\n`);
      return;
    }
    const symbols = symbolsParam.split(',').map(s => s.trim().toUpperCase());

    // Send initial data
    const initialData = await Promise.all(
      symbols.map(async symbol => {
        try {
          const ticker = await binance.getTicker(symbol);
          return {
            symbol: ticker.symbol,
            price: ticker.lastPrice,
            priceChangePercent: ticker.priceChangePercent,
            volume: ticker.volume,
          };
        } catch (err) {
          console.error(`Error fetching initial data for ${symbol}:`, err);
          return null;
        }
      })
    );

    // Start multi-ticker SSE stream
    sseClient.createMultiTickerStream(symbols, req, res, initialData.filter(Boolean));
  } catch (error) {
    console.error('Error in /symbols/stream:', error);
    if (!res.headersSent) {
      res.status(500);
      res.write(
        `data: ${JSON.stringify({ error: 'Failed to set up SSE stream for symbols' })}\n\n`
      );
    }
  }
});

/**
 * @openapi
 * /api/market/klines:
 *   get:
 *     summary: Get historical and real-time kline/candlestick data
 *     description: Streams historical and real-time kline/candlestick data for a symbol and interval using Server-Sent Events (SSE)
 *     parameters:
 *       - in: query
 *         name: symbol
 *         schema:
 *           type: string
 *         required: true
 *         description: Symbol (e.g. BTCUSDT)
 *       - in: query
 *         name: interval
 *         schema:
 *           type: string
 *         required: true
 *         description: Interval (e.g. 1m, 5m, 15m, 1h, 4h, 1d)
 *     responses:
 *       200:
 *         description: SSE stream of kline data
 *         content:
 *           text/event-stream:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.get('/klines', (req: Request, res: Response) => {
  sseClient.createKlineStream(req, res);
});

export default router;
