import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MarketDashboard } from './components/MarketDashboard';
import { Header } from './components/Header';
import { AnnouncementBar } from './components/AnnouncementBar';
import { ArticleSidebar } from './components/ArticleSidebar';
import { Overlay } from './components/Overlay';
import { ArticlesDialog } from './components/ArticlesDialog';

function App() {
  const [selectedArticleIdForSidebar, setSelectedArticleIdForSidebar] = useState<string | null>(
    null
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isArticlesDialogOpen, setIsArticlesDialogOpen] = useState(false);

  const handleShowArticleInSidebar = (articleId: string) => {
    setSelectedArticleIdForSidebar(articleId);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openArticlesDialog = () => setIsArticlesDialogOpen(true);
  const closeArticlesDialog = () => {
    setIsArticlesDialogOpen(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isSidebarOpen && selectedArticleIdForSidebar) {
      timer = setTimeout(() => {
        setSelectedArticleIdForSidebar(null);
      }, 300);
    }
    return () => clearTimeout(timer);
  }, [isSidebarOpen, selectedArticleIdForSidebar]);

  return (
    <div className="h-screen w-screen bg-[#0B0E11] flex flex-col">
      <Header onOpenArticlesDialog={openArticlesDialog} />
      <div className="flex-1 flex flex-col overflow-auto pt-16">
        <AnnouncementBar onShowArticle={handleShowArticleInSidebar} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<MarketDashboard />} />
            <Route path="/market" element={<MarketDashboard />} />
            <Route
              path="/utils/leverage-calculator"
              element={<div className="p-4 text-[#EAECEF]">Leverage Calculator (Coming Soon)</div>}
            />
            <Route
              path="/utils/contract-calculator"
              element={<div className="p-4 text-[#EAECEF]">Contract Calculator (Coming Soon)</div>}
            />
          </Routes>
        </main>
      </div>
      {(selectedArticleIdForSidebar || isSidebarOpen) && !isArticlesDialogOpen && (
        <Overlay isActive={isSidebarOpen} onClick={handleCloseSidebar} />
      )}
      {selectedArticleIdForSidebar && (
        <ArticleSidebar
          articleId={selectedArticleIdForSidebar}
          isOpen={isSidebarOpen}
          onClose={handleCloseSidebar}
        />
      )}
      <ArticlesDialog isOpen={isArticlesDialogOpen} onClose={closeArticlesDialog} />
    </div>
  );
}

export default App;
