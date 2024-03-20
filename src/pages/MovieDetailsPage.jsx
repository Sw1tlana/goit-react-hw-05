import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { requestMoviesById } from "../services/api"
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [moviId, setMoviId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchMoviesId = async () => {
            try {
                setIsLoading(true);
                setIsError(false);
                const data = requestMoviesById(moviId);
                setMoviId(data);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchMoviesId();
    }, [moviId]);

  return (
      <div>{ movieId }</div>
  )
}

export default MovieDetailsPage
