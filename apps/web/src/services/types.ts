export interface CryptoData {
  symbol: string;
  price: string;
  priceChangePercent: string;
  volume: string;
  sma7?: string | null;
}

export interface KlineData {
  t: number; // Open time
  o: string; // Open price
  h: string; // High price
  l: string; // Low price
  c: string; // Close price
  v: string; // Volume
}

export type MarketUpdateResponse = CryptoData[] | CryptoData;

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface ArticleData {
  id: string;
  title: string;
  content: string; // HTML content
  abstract: string;
  publishedAt: string; // Assuming ISO 8601 date string
  // Add other relevant fields from your data structure if any, e.g., timestamp, source, etc.
}

// Response type for paginated articles
export interface PaginatedArticlesResponse {
  articles: ArticleData[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}
