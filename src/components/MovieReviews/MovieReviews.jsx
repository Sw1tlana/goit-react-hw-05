import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import css from "./MovieReviews.module.css";

import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { requestMoviesByReviews } from "../../services/api";

const MovieReviews = () => {
    const { movieId } = useParams();
    const [isError, setIsError] = useState(false); 
    const [isLoading, setIsLoading] = useState(false);
    const [movieReviews, setMovieReviews] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
            setIsLoading(true);
            setIsError(false);   
            const reviewsData = await requestMoviesByReviews(movieId);   
            setMovieReviews(reviewsData.results);                
            } catch (error) {
             setIsError(true);
            } finally {
            setIsLoading(false);
            }
        }
        fetchReviews();
    }, [movieId]);

  return (

    <div className={css.container}>
    {isLoading && <Loader />}
    {isError && <ErrorMessage />}
    {!isLoading && !isError && (
        <div>
            {movieReviews && movieReviews.length > 0 ? (
                <ul className={css.listReviews}>
                    {movieReviews.map((review) => {
                        return <li key={review.id}>
                            <h2 className={css.nameReview}>{review.author}</h2>
                            <p className={css.textReview}>{review.content}</p>
                            <p className={css.createdReview}>{review.created_at}</p>
                        </li>
                    })}
                </ul>
            ) : (
                <p className={css.infoText}>No reviews available</p>
            )}
        </div>
    )}
</div>
  )
}

export default MovieReviews
