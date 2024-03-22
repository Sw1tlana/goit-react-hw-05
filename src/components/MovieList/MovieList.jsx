import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';
const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <div>
      <ul className={css.movieList}>
          {movies !== null && movies.map((movie) => {
           return <li key={movie.id}>
                <Link state={location} to={`/movies/${movie.id}`}><img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} /></Link>
           </li>
        })}
      </ul>
  </div>
  )
}

export default MovieList
