import { EventEmitter } from 'events';
import type { Request, Response } from 'express';
import WebSocket from 'ws';
import { BinanceClient } from './client.js';
import { BinanceKlineInterval } from './types.js';

export class BinanceSSEClient extends EventEmitter {
  private readonly baseUrl: string;
  private readonly apiKey?: string;
  private readonly apiSecret?: string;
  private connections: Map<string, WebSocket>;

  constructor(
    baseUrl: string = process.env.BINANCE_API_URL || 'wss://data-stream.binance.vision',
    apiKey?: string,
    apiSecret?: string
  ) {
    super();
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.connections = new Map();
  }

  private setupSSEHeaders(res: Response): void {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  private sendSSE(res: Response, event: string, data: any): void {
    res.write(`event: ${event}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }

  private createWebSocketConnection(stream: string): WebSocket {
    const ws = new WebSocket(`${this.baseUrl}/ws/${stream}`);

    ws.on('error', error => {
      this.emit('error', error);
    });

    ws.on('close', () => {
      this.connections.delete(stream);
    });

    return ws;
  }

  public async createKlineStream(req: Request, res: Response): Promise<void> {
    const { symbol, interval } = req.query;

    if (!symbol || !interval || typeof symbol !== 'string' || typeof interval !== 'string') {
      res
        .status(400)
        .json({ error: 'Missing or invalid required parameters: symbol and interval' });
      return;
    }

    this.setupSSEHeaders(res);

    // Fetch and send initial klines
    try {
      const binance = new BinanceClient();
      const klines = await binance.getKlines(symbol, interval as BinanceKlineInterval);
      this.sendSSE(res, 'initial', klines);
    } catch (error) {
      this.sendSSE(res, 'error', { error: 'Failed to fetch initial kline data' });
      return;
    }

    const stream = `${symbol.toLowerCase()}@kline_${interval}`;
    const ws = this.createWebSocketConnection(stream);
    this.connections.set(stream, ws);

    ws.on('message', (data: Buffer) => {
      try {
        const parsedData = JSON.parse(data.toString());
        this.sendSSE(res, 'message', {
          symbol,
          interval,
          data: parsedData,
        });
      } catch (error) {
        this.sendSSE(res, 'error', { error: 'Failed to parse kline data' });
      }
    });

    req.on('close', () => {
      ws.close();
      this.connections.delete(stream);
    });
  }

  public createTickerStream(req: Request, res: Response): void {
    const { symbol } = req.query;

    if (!symbol || typeof symbol !== 'string') {
      res.status(400).json({ error: 'Missing or invalid required parameter: symbol' });
      return;
    }

    this.setupSSEHeaders(res);

    const stream = `${symbol.toLowerCase()}@ticker`;
    const ws = this.createWebSocketConnection(stream);
    this.connections.set(stream, ws);

    ws.on('message', (data: Buffer) => {
      try {
        const parsedData = JSON.parse(data.toString());
        this.sendSSE(res, 'message', {
          symbol,
          data: parsedData,
        });
      } catch (error) {
        this.sendSSE(res, 'error', { error: 'Failed to parse ticker data' });
      }
    });

    req.on('close', () => {
      ws.close();
      this.connections.delete(stream);
    });
  }

  public createDepthStream(req: Request, res: Response): void {
    const { symbol } = req.query;

    if (!symbol || typeof symbol !== 'string') {
      res.status(400).json({ error: 'Missing or invalid required parameter: symbol' });
      return;
    }

    this.setupSSEHeaders(res);

    const stream = `${symbol.toLowerCase()}@depth`;
    const ws = this.createWebSocketConnection(stream);
    this.connections.set(stream, ws);

    ws.on('message', (data: Buffer) => {
      try {
        const parsedData = JSON.parse(data.toString());
        this.sendSSE(res, 'message', {
          symbol,
          data: parsedData,
        });
      } catch (error) {
        this.sendSSE(res, 'error', { error: 'Failed to parse depth data' });
      }
    });

    req.on('close', () => {
      ws.close();
      this.connections.delete(stream);
    });
  }

  public createTradesStream(req: Request, res: Response): void {
    const { symbol } = req.query;

    if (!symbol || typeof symbol !== 'string') {
      res.status(400).json({ error: 'Missing or invalid required parameter: symbol' });
      return;
    }

    this.setupSSEHeaders(res);

    const stream = `${symbol.toLowerCase()}@trade`;
    const ws = this.createWebSocketConnection(stream);
    this.connections.set(stream, ws);

    ws.on('message', (data: Buffer) => {
      try {
        const parsedData = JSON.parse(data.toString());
        this.sendSSE(res, 'message', {
          symbol,
          data: parsedData,
        });
      } catch (error) {
        this.sendSSE(res, 'error', { error: 'Failed to parse trades data' });
      }
    });

    req.on('close', () => {
      ws.close();
      this.connections.delete(stream);
    });
  }

  public createMultiTickerStream(
    symbols: string[],
    req: Request,
    res: Response,
    initialData?: any[]
  ): void {
    if (!Array.isArray(symbols) || symbols.length === 0) {
      if (!res.headersSent) {
        res.status(400);
        res.write(
          `data: ${JSON.stringify({ error: 'Missing or invalid required parameter: symbols' })}\n\n`
        );
      }
      return;
    }

    // Set up SSE headers only if they haven't been set
    if (!res.headersSent) {
      this.setupSSEHeaders(res);
      res.write('\n');
    }

    // Send initial data if provided
    if (initialData && initialData.length > 0) {
      this.sendSSE(res, 'initial', initialData);
    }

    // Build combined stream path
    const streams = symbols.map(s => `${s.toLowerCase()}@ticker`).join('/');
    const wsUrl = `${this.baseUrl}/stream?streams=${streams}`;
    const ws = new WebSocket(wsUrl);
    this.connections.set(streams, ws);

    ws.on('message', (data: Buffer) => {
      try {
        const parsed = JSON.parse(data.toString());
        // Combined stream wraps data as { stream, data }
        if (parsed && parsed.stream && parsed.data) {
          const symbol = parsed.stream.split('@')[0].toUpperCase();
          const tickerData = parsed.data;

          // Format the data to match the expected structure
          const formattedData = {
            symbol,
            price: tickerData.c,
            priceChangePercent: tickerData.P,
            volume: tickerData.v,
          };

          this.sendSSE(res, 'message', formattedData);
        }
      } catch (error) {
        console.error('Failed to parse multi-ticker data:', error);
        if (!res.headersSent) {
          this.sendSSE(res, 'error', { error: 'Failed to parse multi-ticker data' });
        }
      }
    });

    ws.on('error', error => {
      console.error('WebSocket error:', error);
      if (!res.headersSent) {
        this.sendSSE(res, 'error', { error: error.message || 'WebSocket error' });
      }
    });

    ws.on('close', () => {
      this.connections.delete(streams);
    });

    // Keep the SSE connection alive
    const keepAlive = setInterval(() => {
      if (res.writableEnded) {
        clearInterval(keepAlive);
        return;
      }
      this.sendSSE(res, 'initial', { timestamp: Date.now() });
    }, 30000); // Send ping every 30 seconds

    req.on('close', () => {
      clearInterval(keepAlive);
      ws.close();
      this.connections.delete(streams);
    });
  }

  public close(): void {
    for (const ws of this.connections.values()) {
      ws.close();
    }
    this.connections.clear();
  }
}
