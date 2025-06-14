import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import ArticlesDialog from '../articles/ArticlesDialog';

interface NavItem {
  label: string;
  path?: string; // Optional path for Links
  action?: () => void; // Optional action for buttons
}

interface DropdownItem {
  label: string;
  path: string;
}

const Header: React.FC = () => {
  const location = useLocation();
  const [isUtilsOpen, setIsUtilsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleArticleClick = () => setIsDialogOpen(true);

  const navItems: NavItem[] = [
    { label: 'Market', path: '/market' },
    { label: 'Articles', action: handleArticleClick },
  ];

  const utilsItems: DropdownItem[] = [
    { label: 'Leverage Calculator', path: '/utils/leverage-calculator' },
    { label: 'Contract Calculator', path: '/utils/contract-calculator' },
  ];

  return (
    <>
      <header className="bg-[#141416] fixed top-0 left-0 right-0 z-40">
        <div className="max-w-8xl mx-auto px-8">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <div className="flex gap-1">
              <img src={logo} />

              <Link to="/" className="text-text-primary font-bold text-2xl">
                Crypto
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-8 mr-[120px]">
              {navItems.map(item =>
                item.path ? (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      location.pathname === item.path
                        ? 'text-primary'
                        : 'text-text-primary hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : item.action ? (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className="text-sm font-medium transition-colors duration-200 text-text-primary hover:text-primary"
                  >
                    {item.label}
                  </button>
                ) : null
              )}

              {/* Utils Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsUtilsOpen(true)}
                onMouseLeave={() => setIsUtilsOpen(false)}
              >
                <button
                  className={`text-sm font-medium transition-colors duration-200 ${
                    location.pathname.startsWith('/utils')
                      ? 'text-primary'
                      : 'text-text-primary hover:text-primary'
                  }`}
                >
                  Utils
                </button>

                {isUtilsOpen && (
                  <div className="absolute left-0 top-full w-48 rounded-md shadow-lg bg-[#1E2329] border border-[#2B3139] z-50">
                    <div className="py-1">
                      {utilsItems.map(item => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="block px-4 py-2 text-sm text-text-primary hover:bg-[#2B3139] hover:text-primary transition-colors duration-200"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>

      <ArticlesDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </>
  );
};

export default Header;
