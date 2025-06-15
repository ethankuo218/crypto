import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import WelcomePage from './pages/Welcome';
import { routes } from './routes';

function App() {
  // state to check current the welcome page animation is completed
  const [isWelcomePageAnimationCompleted, setIsWelcomePageAnimationCompleted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsWelcomePageAnimationCompleted(true);
    }, 3500);
  }, []);

  return (
    <>
      {isWelcomePageAnimationCompleted ? (
        <MainLayout>
          <Routes>
            <Route>
              {routes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Route>
          </Routes>
        </MainLayout>
      ) : (
        <WelcomePage />
      )}
    </>
  );
}

export default App;
