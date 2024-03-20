import { Link } from 'react-router-dom';

const MovieList = ({ movies }) => {
  return (
    <ul>
        {movies !== null && movies.map((movie) => {
           return <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}><img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} /></Link>
            <p>{movie.title}</p>
           </li>
        })}
    </ul>
  )
}

export default MovieList
