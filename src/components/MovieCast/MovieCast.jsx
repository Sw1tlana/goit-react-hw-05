import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { requestMoviesByCast } from "../../services/api";

import css from './MovieCast.module.css';
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
    {!isLoading && !isError && (movieCast && movieCast.length > 0 ? (
        <div className={css.container}>
            <ul className={css.listCast}>
                {movieCast.map(actor => (
                    <li key={actor.id}>
                        <img
                            className={css.castImg}
                            src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : 'https://via.placeholder.com/200'}
                            alt={actor.name}
                            style={{ width: '200px', height: '300px' }} 
                        />
                        <h3 className={css.nameCast}>{actor.name}</h3>
                        <p><span className={css.miniAccent}>Character: </span>{actor.character}</p>
                    </li>
                ))}
            </ul>
        </div>
    ) : (
        <p className={css.infoText}>No cast available</p>
    ))}
</div>
)
}

export default MovieCast
