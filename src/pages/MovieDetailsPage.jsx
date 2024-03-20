import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { requestMoviesById } from "../services/api"
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movieData, setMovieData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchMoviesId = async () => {
            try {
                setIsLoading(true);
                setIsError(false);
                const data = await requestMoviesById(movieId);
                setMovieData(data);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchMoviesId();
    }, [movieId]);

  return (
      <div>
          {isLoading && <Loader />}
          {isError && <ErrorMessage />}
          <img src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} alt={movieData.title} />
          <ul>
              <li><h2>{movieData.title}</h2></li>
              <li><p>Overview: {movieData.overview}</p></li>
              <li>User Score: {movieData.vote_average}</li>
              <li>Genres: {movieData.genres}</li>
          </ul> 
      </div>
  )
}

export default MovieDetailsPage
