import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { routes } from './routes';

function App() {
  return (
    <Routes>
      {/* <Route key={'/'} path="/" element={<Home />}></Route> */}

      <Route element={<MainLayout />}>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
