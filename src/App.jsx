import { Suspense, lazy } from 'react';
import { Route, Routes } from "react-router-dom";
import "modern-normalize";
import Loader from './components/Loader/Loader';
import Layout from "./components/Layout/Layout";
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'));

function App() {
  return (
    <div>
      <Layout>
        <Suspense fallback={<Loader/>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
     </Layout>
    </div>
  )
}

export default App
