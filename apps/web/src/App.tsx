import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { Header } from './components/layout/Header';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { ArticleSidebar } from './components/articles/ArticleSidebar';
import { Overlay } from './components/common/Overlay';
import { ArticlesDialog } from './components/articles/ArticlesDialog';

// Lazy load components for better performance
const MarketDashboard = lazy(() => import('./components/market/MarketDashboard'));

// Types
interface ArticleState {
  selectedId: string | null;
  isSidebarOpen: boolean;
  isDialogOpen: boolean;
}

function App() {
  const [articleState, setArticleState] = useState<ArticleState>({
    selectedId: null,
    isSidebarOpen: false,
    isDialogOpen: false,
  });

  const handleShowArticleInSidebar = (articleId: string) => {
    setArticleState(prev => ({
      ...prev,
      selectedId: articleId,
      isSidebarOpen: true,
    }));
  };

  const handleCloseSidebar = () => {
    setArticleState(prev => ({
      ...prev,
      isSidebarOpen: false,
    }));
  };

  const openArticlesDialog = () => {
    setArticleState(prev => ({
      ...prev,
      isDialogOpen: true,
    }));
  };

  const closeArticlesDialog = () => {
    setArticleState(prev => ({
      ...prev,
      isDialogOpen: false,
    }));
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!articleState.isSidebarOpen && articleState.selectedId) {
      timer = setTimeout(() => {
        setArticleState(prev => ({
          ...prev,
          selectedId: null,
        }));
      }, 300);
    }
    return () => clearTimeout(timer);
  }, [articleState.isSidebarOpen, articleState.selectedId]);

  return (
    <div className="h-screen w-screen bg-[#0B0E11] flex flex-col">
      <Header onOpenArticlesDialog={openArticlesDialog} />
      <div className="flex-1 flex flex-col overflow-auto pt-16">
        <AnnouncementBar onShowArticle={handleShowArticleInSidebar} />
        <main className="flex-1">
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<MarketDashboard />} />
                <Route path="/market" element={<MarketDashboard />} />
                <Route
                  path="/utils/leverage-calculator"
                  element={
                    <div className="p-4 text-[#EAECEF]">Leverage Calculator (Coming Soon)</div>
                  }
                />
                <Route
                  path="/utils/contract-calculator"
                  element={
                    <div className="p-4 text-[#EAECEF]">Contract Calculator (Coming Soon)</div>
                  }
                />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>

      {(articleState.selectedId || articleState.isSidebarOpen) && !articleState.isDialogOpen && (
        <Overlay isActive={articleState.isSidebarOpen} onClick={handleCloseSidebar} />
      )}
      {articleState.selectedId && (
        <ArticleSidebar
          articleId={articleState.selectedId}
          isOpen={articleState.isSidebarOpen}
          onClose={handleCloseSidebar}
        />
      )}
      <ArticlesDialog isOpen={articleState.isDialogOpen} onClose={closeArticlesDialog} />
    </div>
  );
}

export default App;
