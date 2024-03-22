import { useEffect, useState } from "react"
import { requestMovies } from "../../services/api"

import css from './HomePage.module.css';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setIsLoading(true);
                setIsError(false);
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
      <div className={css.containerHome}>
       <h1 className={css.heroTitle}>Trending today</h1>
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        <MovieList movies={movies}/>
      </div>
  )
}

export default HomePage
