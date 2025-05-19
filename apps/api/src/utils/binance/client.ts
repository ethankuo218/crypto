import axios, { AxiosError } from 'axios';
import type {
  BinanceKline,
  BinanceTicker,
  BinanceOrderBook,
  BinanceExchangeInfo,
  BinanceSystemStatus,
  BinanceServerTime,
  BinanceError,
  BinanceKlineInterval,
  BinanceSymbol,
} from './types.js';

export class BinanceClient {
  private readonly baseUrl: string;
  private readonly apiKey?: string;
  private readonly apiSecret?: string;

  constructor(
    baseUrl: string = process.env.BINANCE_API_URL || 'https://data-api.binance.vision',
    apiKey?: string,
    apiSecret?: string
  ) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  private async request<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    try {
      const response = await axios.get<T>(`${this.baseUrl}${endpoint}`, {
        params,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
          Accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.9',
        },
        timeout: 10000,
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const binanceError = error.response?.data as BinanceError;

        if (status === 451) {
          console.error(
            'Binance API access restricted. This might be due to regional restrictions.'
          );
          throw new Error(
            'Binance API access restricted in this region. Please try using a different region or VPN.'
          );
        }

        throw new Error(`Binance API error: ${binanceError?.msg || error.message}`);
      }
      throw error;
    }
  }

  // General Endpoints
  async getSystemStatus(): Promise<BinanceSystemStatus> {
    return this.request<BinanceSystemStatus>('/sapi/v1/system/status');
  }

  async getServerTime(): Promise<number> {
    const response = await this.request<BinanceServerTime>('/api/v3/time');
    return response.serverTime;
  }

  async getExchangeInfo(): Promise<BinanceExchangeInfo> {
    return this.request<BinanceExchangeInfo>('/api/v3/exchangeInfo');
  }

  // Market Data Endpoints
  async getKlines(
    symbol: string,
    interval: BinanceKlineInterval,
    limit: number = 500,
    startTime?: number,
    endTime?: number
  ): Promise<BinanceKline[]> {
    const params: Record<string, string> = {
      symbol: symbol.toUpperCase(),
      interval,
      limit: limit.toString(),
    };

    if (startTime) params.startTime = startTime.toString();
    if (endTime) params.endTime = endTime.toString();

    return this.request<BinanceKline[]>('/api/v3/klines', params);
  }

  async getTicker(symbol: string): Promise<BinanceTicker> {
    return this.request<BinanceTicker>('/api/v3/ticker/24hr', {
      symbol: symbol.toUpperCase(),
    });
  }

  async getOrderBook(symbol: string, limit: number = 100): Promise<BinanceOrderBook> {
    return this.request<BinanceOrderBook>('/api/v3/depth', {
      symbol: symbol.toUpperCase(),
      limit: limit.toString(),
    });
  }

  async getRecentTrades(symbol: string, limit: number = 500): Promise<any[]> {
    return this.request<any[]>('/api/v3/trades', {
      symbol: symbol.toUpperCase(),
      limit: limit.toString(),
    });
  }

  async getAggregateTrades(
    symbol: string,
    limit: number = 500,
    startTime?: number,
    endTime?: number
  ): Promise<any[]> {
    const params: Record<string, string> = {
      symbol: symbol.toUpperCase(),
      limit: limit.toString(),
    };

    if (startTime) params.startTime = startTime.toString();
    if (endTime) params.endTime = endTime.toString();

    return this.request<any[]>('/api/v3/aggTrades', params);
  }

  async getSymbolPrice(symbol: string): Promise<{ symbol: string; price: string }> {
    const response = await this.request<{ symbol: string; price: string }[]>(
      '/api/v3/ticker/price',
      { symbol: symbol.toUpperCase() }
    );
    const price = response[0];
    if (!price) {
      throw new Error(`No price data found for symbol ${symbol}`);
    }
    return price;
  }

  async getAllSymbolPrices(): Promise<{ symbol: string; price: string }[]> {
    return this.request<{ symbol: string; price: string }[]>('/api/v3/ticker/price');
  }

  async getSymbolInfo(symbol: string): Promise<BinanceSymbol | null> {
    const info = await this.getExchangeInfo();
    const symbolInfo = info.symbols.find(s => s.symbol === symbol.toUpperCase());
    if (!symbolInfo) return null;

    // Ensure all required properties are present
    if (!this.isValidSymbol(symbolInfo)) {
      throw new Error(`Invalid symbol info for ${symbol}`);
    }

    return symbolInfo;
  }

  private isValidSymbol(symbol: any): symbol is BinanceSymbol {
    return (
      typeof symbol === 'object' &&
      symbol !== null &&
      typeof symbol.symbol === 'string' &&
      typeof symbol.status === 'string' &&
      typeof symbol.baseAsset === 'string' &&
      typeof symbol.baseAssetPrecision === 'number' &&
      typeof symbol.quoteAsset === 'string' &&
      typeof symbol.quotePrecision === 'number' &&
      typeof symbol.quoteAssetPrecision === 'number' &&
      typeof symbol.baseCommissionPrecision === 'number' &&
      typeof symbol.quoteCommissionPrecision === 'number' &&
      Array.isArray(symbol.orderTypes) &&
      typeof symbol.icebergAllowed === 'boolean' &&
      typeof symbol.ocoAllowed === 'boolean' &&
      typeof symbol.quoteOrderQtyMarketAllowed === 'boolean' &&
      typeof symbol.allowTrailingStop === 'boolean' &&
      typeof symbol.cancelReplaceAllowed === 'boolean' &&
      typeof symbol.isSpotTradingAllowed === 'boolean' &&
      typeof symbol.isMarginTradingAllowed === 'boolean' &&
      Array.isArray(symbol.filters) &&
      Array.isArray(symbol.permissions)
    );
  }
}
