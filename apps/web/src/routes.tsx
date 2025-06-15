import { lazy } from 'react';
import Home from './pages/Home';

const MarketDashboard = lazy(() => import('./pages/MarketDashboard'));

export const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/market',
    element: <MarketDashboard />,
  },
  {
    path: '/utils/leverage-calculator',
    element: <div className="p-4 text-[#EAECEF]">Leverage Calculator (Coming Soon)</div>,
  },
  {
    path: '/utils/contract-calculator',
    element: <div className="p-4 text-[#EAECEF]">Contract Calculator (Coming Soon)</div>,
  },
];
