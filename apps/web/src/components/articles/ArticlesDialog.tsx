import { faArrowLeft, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { articleService } from '../../services/article.service';
import { ApiError, ArticleData } from '../../services/types';
import { formatTimeAgo } from '../../utils/time';

const MIN_LOADING_DURATION = 2000; // 2 seconds

// --- Time Formatting Utility ---
// function formatTimeAgo(isoDateString: string): string {
//   const date = new Date(isoDateString);
//   if (isNaN(date.getTime())) {
//     return 'Unknown time';
//   }
//   const now = new Date();
//   const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
//   const minutes = Math.round(seconds / 60);
//   const hours = Math.round(minutes / 60);
//   const days = Math.round(hours / 24);
//
//   if (seconds < 5) return 'just now';
//   if (seconds < 60) return `${seconds} seconds ago`;
//   if (minutes < 60) return `${minutes} minutes ago`;
//   if (hours < 24) return `${hours} hours ago`;
//   if (days === 1) return '1 day ago';
//   return `${days} days ago`;
// }

interface ArticlesDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArticlesDialog = ({ isOpen, onClose }: ArticlesDialogProps) => {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [listError, setListError] = useState<string | null>(null);
  const articlesPerPage = 10;

  const [selectedArticleDetail, setSelectedArticleDetail] = useState<ArticleData | null>(null);
  const [isFetchingDetail, setIsFetchingDetail] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  const scrollableListRef = useRef<HTMLDivElement>(null);

  const fetchArticlesList = useCallback(
    async (pageToFetch: number, isInitialLoad: boolean = false) => {
      if (!isInitialLoad && isLoadingList) return;

      const startTime = Date.now();
      setIsLoadingList(true);
      if (isInitialLoad) {
        setArticles([]);
        setListError(null);
      }

      try {
        const response = await articleService.getArticles({
          page: pageToFetch,
          limit: articlesPerPage,
        });
        setArticles(prev =>
          pageToFetch === 1 ? response.articles : [...prev, ...response.articles]
        );
        setHasMorePages(response.hasMore);
        setCurrentPage(pageToFetch);
        if (isInitialLoad) setListError(null);
      } catch (err) {
        console.error('Error fetching articles list:', err);
        const message = (err as ApiError)?.message || 'Failed to load articles list.';
        setListError(message);
      } finally {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = MIN_LOADING_DURATION - elapsedTime;
        if (remainingTime > 0) {
          setTimeout(() => setIsLoadingList(false), remainingTime);
        } else {
          setIsLoadingList(false);
        }
      }
    },
    [isLoadingList, articlesPerPage]
  );

  useEffect(() => {
    if (isOpen) {
      setSelectedArticleDetail(null);
      setDetailError(null);
      setCurrentPage(1);
      setHasMorePages(true);
      fetchArticlesList(1, true);
    }
  }, [isOpen, fetchArticlesList]);

  const handleViewArticleDetail = async (articleId: string) => {
    const startTime = Date.now();
    setIsFetchingDetail(true);
    setDetailError(null);
    try {
      const data = await articleService.getArticleById(articleId);
      setSelectedArticleDetail(data);
    } catch (err) {
      console.error(`Error fetching article detail for ${articleId}:`, err);
      const message = (err as ApiError)?.message || 'Failed to load article details.';
      setDetailError(message);
    } finally {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = MIN_LOADING_DURATION - elapsedTime;
      if (remainingTime > 0) {
        setTimeout(() => setIsFetchingDetail(false), remainingTime);
      } else {
        setIsFetchingDetail(false);
      }
    }
  };

  const handleBackToList = () => {
    setSelectedArticleDetail(null);
    setDetailError(null);
  };

  useEffect(() => {
    const listElement = scrollableListRef.current;
    if (!listElement || selectedArticleDetail) return;

    const handleScroll = () => {
      if (
        listElement.scrollHeight - listElement.scrollTop - listElement.clientHeight < 200 &&
        hasMorePages &&
        !isLoadingList
      ) {
        fetchArticlesList(currentPage + 1);
      }
    };

    listElement.addEventListener('scroll', handleScroll);
    return () => listElement.removeEventListener('scroll', handleScroll);
  }, [isLoadingList, hasMorePages, currentPage, fetchArticlesList, selectedArticleDetail]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[60]">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-[#171A1E] text-[#EAECEF] rounded-lg shadow-2xl w-[70%] h-[85%] md:w-[60%] md:h-[80%] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-3 md:p-4 border-b border-[#2B3139] flex-shrink-0">
            {selectedArticleDetail && (
              <button
                onClick={handleBackToList}
                className="text-[#AEB4BB] hover:text-white transition-colors mr-2 md:mr-3 p-1"
                aria-label="Back to articles list"
              >
                <FontAwesomeIcon icon={faArrowLeft} size="lg" />
              </button>
            )}

            <DialogTitle className="text-lg md:text-xl font-semibold text-[#F0B90B] truncate">
              {selectedArticleDetail ? selectedArticleDetail.title : 'Recent Articles'}
            </DialogTitle>

            <button
              onClick={onClose}
              className="text-[#AEB4BB] hover:text-white transition-colors ml-auto pl-2 md:pl-3 p-1"
              aria-label="Close dialog"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
          </div>

          {/* Content */}
          <div ref={scrollableListRef} className="overflow-y-auto flex-1">
            {selectedArticleDetail ? (
              <div className="p-3 md:p-4">
                {isFetchingDetail && (
                  <div className="text-center py-4">
                    <FontAwesomeIcon icon={faSpinner} spin size="2x" className="text-[#F0B90B]" />
                  </div>
                )}
                {detailError && (
                  <p className="text-center text-red-400 py-4">Error: {detailError}</p>
                )}
                {!isFetchingDetail && !detailError && selectedArticleDetail && (
                  <div
                    className="prose prose-sm prose-invert max-w-none prose-p:text-[#D1D5DB] prose-strong:text-[#EAECEF] prose-a:text-[#F0B90B] hover:prose-a:text-yellow-300"
                    dangerouslySetInnerHTML={{ __html: selectedArticleDetail.content }}
                  />
                )}
              </div>
            ) : (
              <div className="p-0">
                {isLoadingList && articles.length === 0 && (
                  <div className="text-center py-10">
                    <FontAwesomeIcon icon={faSpinner} spin size="2x" className="text-[#F0B90B]" />
                  </div>
                )}
                {articles.length === 0 && !isLoadingList && !listError && (
                  <p className="text-center text-gray-400 py-10">No articles found.</p>
                )}
                {articles.map(article => (
                  <div
                    key={article.id}
                    className="flex items-start p-3 md:p-4 border-b border-[#2B3139] last:border-b-0 hover:bg-[#23282D] transition-colors duration-150 cursor-pointer group"
                    onClick={() => handleViewArticleDetail(article.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') handleViewArticleDetail(article.id);
                    }}
                  >
                    <div className="flex-shrink-0 mt-1 mr-3">
                      <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 mb-0.5">
                        {formatTimeAgo(article.publishedAt || new Date().toISOString())}
                      </p>
                      <h3 className="text-sm md:text-md font-medium text-[#EAECEF] group-hover:text-[#F0B90B] mb-1 truncate">
                        {article.title}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed truncate-2-lines">
                        {article.abstract}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoadingList && articles.length > 0 && (
                  <div className="text-center py-4">
                    <FontAwesomeIcon icon={faSpinner} spin size="lg" className="text-[#F0B90B]" />
                  </div>
                )}
                {listError && <p className="text-center text-red-400 py-4">Error: {listError}</p>}
              </div>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
