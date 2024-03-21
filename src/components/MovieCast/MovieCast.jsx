import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { requestMoviesByCast } from "../../services/api";
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const MovieCast = () => {
    const { movieId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [movieCast, setMovieCast] = useState(null);

    useEffect(() => {
        const fetchMovieCast = async () => {
            setIsLoading(true);
            setIsError(false);

            try {
                const castData = await requestMoviesByCast(movieId);
                setMovieCast(castData.cast);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchMovieCast();
    }, [movieId]);
    
    return (
        <div>
            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            {movieCast && movieCast.length > 0 &&
                <div>
                <ul>
                    {movieCast.map(actor => (
                        <li key={actor.id}>
                            {actor.profile_path && (
                                <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />
                            )}
                            <p>{actor.name}</p>
                            <p>Character: {actor.character}</p>
                        </li>
                    ))}
                </ul>
            </div>}
        </div>
  )
}

export default MovieCast
