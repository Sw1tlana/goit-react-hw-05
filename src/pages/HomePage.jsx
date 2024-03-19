import { useEffect, useState } from "react"
import { requestMovies } from "../services/api"
import { Link } from "react-router-dom";
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setIsLoading(true);
                const data = await requestMovies();
                setMovies(data);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchMovies();
    }, []);

  return (
      <div>
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
            <ul>
              {movies !== null && movies.map((movie) => {
                  return <li key={movie.id}>
                       <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                  </li>
                })}
            </ul>
      </div>
  )
}

export default HomePage
