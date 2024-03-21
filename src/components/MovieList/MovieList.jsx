// import { useRef } from 'react';
import { Link } from 'react-router-dom';

const MovieList = ({ movies }) => {
  // const location = useLocation();
  // const backLinkRef = useRef(location.state ?? "/search")
  // const backLinkRef
  return (
    <div>
      <ul>
         {/* <Link to={backLinkRef.current}>Go back</Link> */}
            {movies !== null && movies.map((movie) => {
           return <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}><img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} /></Link>
           </li>
        })}
      </ul>
  </div>
  )
}

export default MovieList
