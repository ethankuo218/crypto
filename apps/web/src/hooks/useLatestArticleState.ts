import { useCallback, useEffect, useState } from 'react';
import articleService from '../services/article.service';
import { ArticleData } from '../services/types';

interface SseEventData {
  type: 'connected' | 'initial' | 'article' | 'error';
  articles?: ArticleData[];
  data?: ArticleData;
  message?: string;
}

interface UseSSEReturn {
  latestArticle: ArticleData | null;
  error: string | null;
  isInitialLoad: boolean;
  animationKey: number;
}

export const useLatestArticleState = (): UseSSEReturn => {
  const [latestArticle, setLatestArticle] = useState<ArticleData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);

  const handleLatestArticle = useCallback(
    (article: ArticleData) => {
      setLatestArticle(article);
      if (isInitialLoad) {
        setIsInitialLoad(false);
      } else {
        setAnimationKey(prevKey => prevKey + 1);
      }
    },
    [isInitialLoad]
  );

  const handleSSEMessage = useCallback(
    (data: SseEventData) => {
      if (data.type === 'initial' && data.articles && data.articles.length > 0) {
        handleLatestArticle(data.articles[0]);
      } else if (data.type === 'article' && data.data) {
        handleLatestArticle(data.data);
      } else if (data.type === 'error' && data.message) {
        console.error('SSE error event:', data.message);
        setError(`Stream error: ${data.message}`);
      }
    },
    [handleLatestArticle]
  );

  useEffect(() => {
    const unsubscribe = articleService.subscribeToAnnouncements({
      onMessage: handleSSEMessage,
      onError: (error: Error | Event) => {
        console.error('EventSource failed:', error);
        setError('Connection failed. Retrying...');
      },
      onOpen: () => {
        setError(null);
      },
    });

    return () => unsubscribe();
  }, [handleSSEMessage]);

  return { latestArticle, error, isInitialLoad, animationKey };
};
