import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <div>
      <ul className={css.movieList}>
          {movies !== null && movies.map((movie) => {
           return <li key={movie.id}>
            <Link state={location} to={`/movies/${movie.id}`}>
                <img
                className={css.listImg}
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/300'}
                alt={movie.title}
                style={{ width: '300px', height: '450px' }} 
              />
            </Link>
           </li>
        })}
      </ul>
  </div>
  )
}

export default MovieList
