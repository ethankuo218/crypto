import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useLatestArticleState } from '../../hooks/useLatestArticleState';
import ArticleSidebar from '../articles/ArticleSidebar';

const AnnouncementBar: React.FC = () => {
  const { latestArticle, error, isInitialLoad, animationKey } = useLatestArticleState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (error && !latestArticle) {
    return <div className="bg-red-600 text-white p-2 text-center text-sm">{error}</div>;
  }

  if (!latestArticle) {
    return null;
  }

  const handleTitleClick = () => {
    if (latestArticle) {
      setIsSidebarOpen(true);
    }
  };

  return (
    <>
      <div
        key={latestArticle.id + '-' + animationKey}
        className={`bg-primary text-black p-2 text-center text-sm flex items-center justify-center ${
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

      {isSidebarOpen && (
        <ArticleSidebar
          articleId={latestArticle.id}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default AnnouncementBar;
