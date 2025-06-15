import { Suspense } from 'react';
import ErrorBoundary from '../common/ErrorBoundary';
import LoadingSpinner from '../common/LoadingSpinner';
import Footer from './Footer';
import Header from './Header';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />

      <main className="pt-12">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
