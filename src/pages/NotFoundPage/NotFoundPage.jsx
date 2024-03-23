import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={css.containerNotFound}>
      <h2 className={css.titleNotFound}>404 - Page not found</h2>
      <p className={css.textNotFound}>Go to <Link to="/">Home</Link></p>
    </div>
  )
}

export default NotFoundPage
