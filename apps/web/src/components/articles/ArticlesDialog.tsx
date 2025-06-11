import { faArrowLeft, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { articleService } from '../../services/article.service';
import { ArticleData } from '../../services/types';
import { formatTimeAgo } from '../../utils/time';

interface ArticlesDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ArticleListItem = ({ article, onClick }: { article: ArticleData; onClick: () => void }) => (
  <div
    className="flex items-start p-3 md:p-4 border-b border-[#2B3139] last:border-b-0 hover:bg-[#23282D] transition-colors duration-150 cursor-pointer group"
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={e => {
      if (e.key === 'Enter' || e.key === ' ') onClick();
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
      <p className="text-xs text-gray-400 leading-relaxed truncate-3-lines">{article.abstract}</p>
    </div>
  </div>
);

const ArticleDetail = ({ article }: { article: ArticleData; onBack: () => void }) => (
  <div className="p-4 md:p-10">
    <div
      className="prose prose-sm prose-invert max-w-none prose-p:text-[#D1D5DB] prose-strong:text-[#EAECEF] prose-a:text-[#F0B90B] hover:prose-a:text-yellow-300"
      dangerouslySetInnerHTML={{ __html: article.content }}
    />
  </div>
);

const LoadingSpinner = ({ size = 'lg' }: { size?: 'lg' | '2x' }) => (
  <div className="text-center py-4">
    <FontAwesomeIcon icon={faSpinner} spin size={size} className="text-[#F0B90B]" />
  </div>
);

export const ArticlesDialog = ({ isOpen, onClose }: ArticlesDialogProps) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const scrollableListRef = useRef<HTMLDivElement>(null);
  const articlesPerPage = 10;

  // Query for articles list
  const {
    data: articlesData,
    isLoading: isLoadingList,
    error: listError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['articles'],
    queryFn: ({ pageParam = 1 }) =>
      articleService.getArticles({ page: pageParam, limit: articlesPerPage }),
    initialPageParam: 1,
    getNextPageParam: lastPage => (lastPage.hasMore ? lastPage.page + 1 : undefined),
    enabled: isOpen,
  });

  // Query for selected article
  const {
    data: selectedArticle,
    isLoading: isLoadingDetail,
    error: detailError,
  } = useQuery({
    queryKey: ['article', selectedArticleId],
    queryFn: () => articleService.getArticleById(selectedArticleId!),
    enabled: !!selectedArticleId,
  });

  // Handle infinite scroll
  const handleScroll = useCallback(() => {
    const listElement = scrollableListRef.current;
    if (!listElement || selectedArticleId) return;

    if (
      listElement.scrollHeight - listElement.scrollTop - listElement.clientHeight < 200 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [selectedArticleId, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const listElement = scrollableListRef.current;
    if (!listElement) return;

    listElement.addEventListener('scroll', handleScroll);
    return () => listElement.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Reset state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setSelectedArticleId(null);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[60]">
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-[#171A1E] text-[#EAECEF] rounded-lg shadow-2xl w-[70%] h-[85%] md:w-[60%] md:h-[80%] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-3 md:p-4 border-b border-[#2B3139] flex-shrink-0">
            {selectedArticleId && (
              <button
                onClick={() => setSelectedArticleId(null)}
                className="text-[#AEB4BB] hover:text-white transition-colors mr-2 md:mr-3 p-1"
                aria-label="Back to articles list"
              >
                <FontAwesomeIcon icon={faArrowLeft} size="lg" />
              </button>
            )}

            <DialogTitle className="text-lg md:text-xl font-semibold text-[#F0B90B] truncate">
              {selectedArticle ? selectedArticle.title : 'Recent Articles'}
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
            {selectedArticleId ? (
              <>
                {isLoadingDetail && <LoadingSpinner size="2x" />}
                {detailError && (
                  <p className="text-center text-red-400 py-4">
                    Error: {(detailError as Error).message}
                  </p>
                )}
                {selectedArticle && (
                  <ArticleDetail
                    article={selectedArticle}
                    onBack={() => setSelectedArticleId(null)}
                  />
                )}
              </>
            ) : (
              <div className="p-0">
                {isLoadingList && <LoadingSpinner size="2x" />}
                {!isLoadingList && !listError && articlesData?.pages.length === 0 && (
                  <p className="text-center text-gray-400 py-10">No articles found.</p>
                )}
                {articlesData?.pages.map(page =>
                  page.articles.map(article => (
                    <ArticleListItem
                      key={article.id}
                      article={article}
                      onClick={() => setSelectedArticleId(article.id)}
                    />
                  ))
                )}
                {isFetchingNextPage && <LoadingSpinner />}
                {listError && (
                  <p className="text-center text-red-400 py-4">
                    Error: {(listError as Error).message}
                  </p>
                )}
              </div>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
