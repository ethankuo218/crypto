import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from '../common/ErrorBoundary';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { AnnouncementBar } from './AnnouncementBar';
import { Header } from './Header';

export const MainLayout = () => {
  return (
    <div className="h-screen w-screen bg-[#0B0E11] flex flex-col">
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
