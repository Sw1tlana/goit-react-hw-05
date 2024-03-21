
import clsx from 'clsx';
import { NavLink, Route, Routes } from "react-router-dom";
import "modern-normalize";
import css from "./App.module.css";

import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import MovieDetailsPage from './pages/MovieDetailsPage';

const getNavLinkClass = ({ isActive }) => {
  return clsx(css.headerLink, {
    [css.active]: isActive,
  })
}

function App() {
  return (
    <div>
      <header className={css.header}>
        <NavLink className={getNavLinkClass} to="/">Home</NavLink>
        <NavLink className={getNavLinkClass} to="/movies" end>Movies</NavLink>
      </header>
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
