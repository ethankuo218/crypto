import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import ErrorBoundary from '../common/ErrorBoundary';
import LoadingSpinner from '../common/LoadingSpinner';
import AnnouncementBar from './AnnouncementBar';
import Header from './Header';

const MainLayout: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col overflow-auto pt-16">
        <AnnouncementBar />

        <main className="flex-1">
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>{<Outlet />}</Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
