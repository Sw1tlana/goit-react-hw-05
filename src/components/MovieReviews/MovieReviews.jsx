import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

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
      <div>
         {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            {movieReviews && movieReviews.length > 0 ? (
                <ul>
                    {movieReviews.map((review) => {
                        return <li key={review.id}>
                            <h2>{review.author}</h2>
                            <p>{review.content}</p>
                            <p>{review.created_at}</p>
                        </li>
                    })}
                </ul>
            ) : (
                 <p>No reviews available</p>
            )}
        </div>
  )
}

export default MovieReviews
