import { httpClient } from './http-client.service';
import { KlineData } from './types';

export const marketService = {
  /**
   * Get kline data for a specific symbol and interval
   */
  getKlines: async (symbol: string, interval: string): Promise<KlineData[]> => {
    return httpClient.get<KlineData[]>('/market/klines', {
      params: { symbol, interval },
    });
  },

  /**
   * Subscribe to market updates for specific symbols
   * Returns a cleanup function that can be called to unsubscribe
   */
  subscribeToMarketUpdates: (
    symbols: string[],
    callbacks: {
      onMessage: (data: any) => void;
      onError?: (error: Error | Event) => void;
    }
  ): (() => void) => {
    const url = `/market/symbols/stream?symbols=${symbols.join(',')}`;
    return httpClient.subscribeToSSE(url, {
      onMessage: callbacks.onMessage,
      onError: callbacks.onError,
    });
  },

  /**
   * Subscribe to real-time kline/candlestick data for a specific symbol and interval
   * Returns a cleanup function that can be called to unsubscribe
   */
  subscribeToKlineStream: (
    symbol: string,
    interval: string,
    callbacks: {
      onInitial: (data: KlineData[]) => void;
      onMessage: (message: { data: { k: KlineData }; symbol: string; interval: string }) => void;
      onError?: (error: Error | Event) => void;
    }
  ): (() => void) => {
    const url = `/market/klines?symbol=${symbol}&interval=${interval}`;
    return httpClient.subscribeToSSE(url, {
      onInitial: callbacks.onInitial,
      onMessage: callbacks.onMessage,
      onError: callbacks.onError,
    });
  },
};
