import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import { articleService } from '../../services/article.service';
import { formatTime } from '../../utils/time';

interface ArticleSidebarProps {
  articleId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ArticleSidebar = ({ articleId, isOpen, onClose }: ArticleSidebarProps) => {
  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['article', articleId],
    queryFn: () => articleService.getArticleById(articleId!),
    enabled: !!articleId, // Only run query when articleId exists
  });

  return (
    <div
      className={`fixed top-0 left-0 h-full w-full md:w-1/3 lg:w-1/4 bg-[#1E2329] text-[#EAECEF] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      aria-hidden={!isOpen}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#2B3139] flex-shrink-0">
        <h2 className="text-xl font-semibold text-[#F0B90B] truncate pr-2">
          {isLoading && articleId ? 'Loading...' : article?.title || (articleId ? 'Article' : '')}
        </h2>
        <button
          onClick={onClose}
          className="text-[#AEB4BB] hover:text-white transition-colors"
          aria-label="Close article sidebar"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="p-4 overflow-y-auto flex-1">
        {/* Only show content if an articleId is present, otherwise it might flash old content during close */}
        {articleId && (
          <>
            {isLoading && <div className="text-center">Loading content...</div>}
            {error && <div className="text-center text-red-400">Error: {error.message}</div>}
            {!isLoading && !error && !article && (
              <div className="text-center">Article data not available.</div>
            )}
            {article && (
              <div>
                <p className="text-xs text-gray-400 mb-2">{formatTime(article.publishedAt)}</p>
                <div
                  className="prose prose-sm prose-invert max-w-none prose-p:text-[#D1D5DB] prose-strong:text-[#EAECEF] prose-a:text-[#F0B90B] hover:prose-a:text-yellow-300"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
