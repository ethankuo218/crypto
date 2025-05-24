import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { articleService } from '../../services/article.service';
import { ArticleData } from '../../services/types';

interface SseEventData {
  type: 'connected' | 'initial' | 'article' | 'error';
  articles?: ArticleData[]; // For 'initial' type
  data?: ArticleData; // For 'article' type
  message?: string; // For 'error' type
}

// Define props for AnnouncementBar
interface AnnouncementBarProps {
  onShowArticle: (articleId: string) => void;
}

export const AnnouncementBar = ({ onShowArticle }: AnnouncementBarProps) => {
  const [latestArticle, setLatestArticle] = useState<ArticleData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const handleNewArticle = (article: ArticleData) => {
      setLatestArticle(article);
      if (isInitialLoad) {
        setIsInitialLoad(false);
      } else {
        setAnimationKey(prevKey => prevKey + 1);
      }
    };

    const handleSSEMessage = (data: SseEventData) => {
      if (data.type === 'initial' && data.articles && data.articles.length > 0) {
        handleNewArticle(data.articles[0]);
      } else if (data.type === 'article' && data.data) {
        handleNewArticle(data.data);
      } else if (data.type === 'error' && data.message) {
        console.error('SSE error event for announcements:', data.message);
        setError(`Announcement stream error: ${data.message}`);
      }
    };

    const unsubscribe = articleService.subscribeToAnnouncements({
      onMessage: handleSSEMessage,
      onError: (error: Event) => {
        console.error('EventSource failed for announcements:', error);
        setError('Announcement service connection failed. Retrying...');
      },
      onOpen: () => {
        setError(null);
      },
    });

    return () => unsubscribe();
  }, [isInitialLoad]);

  if (error && !latestArticle) {
    return <div className="bg-red-600 text-white p-2 text-center text-sm">{error}</div>;
  }

  if (!latestArticle) {
    return null;
  }

  const handleTitleClick = () => {
    if (latestArticle) {
      onShowArticle(latestArticle.id);
    }
  };

  return (
    <div
      key={latestArticle.id + '-' + animationKey}
      className={`bg-yellow-400 text-black p-2 text-center text-sm flex items-center justify-center ${
        !isInitialLoad ? 'slide-down-fade-in' : ''
      }`}
    >
      <FontAwesomeIcon icon={faBell} className="w-5 h-5 mr-2 flex-shrink-0" />
      <span
        onClick={handleTitleClick}
        className="truncate hover:underline focus:underline outline-none cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') handleTitleClick();
        }}
      >
        {latestArticle.title}
      </span>
    </div>
  );
};
