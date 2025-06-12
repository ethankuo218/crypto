import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { routes } from './routes';

function App() {
  return (
    <MainLayout>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </MainLayout>
  );
}

export default App;
