import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import css from '../../App.module.css';

const getNavLinkClass = ({ isActive }) => {
  return clsx(css.headerLink, {
    [css.active]: isActive,
  })
}
const Layout = ({ children }) => {
  return (
      <div className={css.container}>
      <header className={css.header}>
        <NavLink className={getNavLinkClass} to="/">Home</NavLink>
        <NavLink className={getNavLinkClass} to="/movies" end>Movies</NavLink>
      </header>
      
      <main>
       {children}
      </main>
    </div>
  )
}

export default Layout
