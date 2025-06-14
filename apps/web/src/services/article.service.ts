import httpClient from './http-client.service';
import { ArticleData, PaginatedArticlesResponse } from './types';

interface SseEventData {
  type: 'connected' | 'initial' | 'article' | 'error';
  articles?: ArticleData[]; // For 'initial' type
  data?: ArticleData; // For 'article' type
  message?: string; // For 'error' type
}

const articleService = {
  /**
   * Get a single article by its ID
   */
  getArticleById: async (id: string): Promise<ArticleData> => {
    return httpClient.get<ArticleData>(`/lookonchain/articles/${id}`);
  },

  /**
   * Get articles with pagination
   */
  getArticles: async ({
    page = 1,
    limit = 10,
  }: { page?: number; limit?: number } = {}): Promise<PaginatedArticlesResponse> => {
    return httpClient.get<PaginatedArticlesResponse>('/lookonchain/articles', {
      params: { page, limit },
    });
  },

  /**
   * Subscribe to article announcements via SSE
   */
  subscribeToAnnouncements: (callbacks: {
    onMessage: (data: SseEventData) => void;
    onError?: (error: Error | Event) => void;
    onOpen?: (event: Event) => void;
  }): (() => void) => {
    return httpClient.subscribeToSSE('/lookonchain/articles/stream', {
      onMessage: data => {
        try {
          const parsedData = data as SseEventData;
          callbacks.onMessage(parsedData);
        } catch (error) {
          console.error('Failed to parse SSE event data:', error);
          callbacks.onMessage({ type: 'error', message: 'Failed to process announcement update.' });
        }
      },
      onError: callbacks.onError,
      onOpen: callbacks.onOpen,
    });
  },
};

export default articleService;
