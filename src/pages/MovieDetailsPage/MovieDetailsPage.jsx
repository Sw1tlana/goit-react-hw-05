import { useEffect, useState, useRef, Suspense, lazy } from "react";
import { NavLink, Link, Route, Routes, useParams, useLocation } from "react-router-dom";
import { requestMoviesById } from "../../services/api";
import css from './MovieDetailsPage.module.css';

import Loader from  '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../../components/MovieReviews/MovieReviews'));

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movieData, setMovieData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const location = useLocation();
    const backLinkRef = useRef(location.state ?? "/search")

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
          {movieData !== null && <div>
            <Link to={backLinkRef.current}>Go back</Link>
               <img className={css.imgDetailPage} src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} alt={movieData.title} />
              <ul>
                  <li><h2>{movieData.title}</h2></li>
                  <li><p>Overview: {movieData.overview}</p></li>
                  <li><p>User Score: {movieData.vote_average}</p></li>
                  {movieData.genres && (<li><p>
                    Genres: {movieData.genres.map(genre => genre.name).join(', ')}</p>
                </li>
                )}
              </ul>
          </div>}
          <div>
              <NavLink to="cast">Cast</NavLink>
              <NavLink to="reviews">Reviews</NavLink>
          </div>
          <div>
            <Suspense fallback={<Loader/>}>
              <Routes>
                <Route path="cast" element={<MovieCast />} />
                <Route path="reviews" element={<MovieReviews />} />
              </Routes>
            </Suspense>
        </div>
       
      </div>
  )
}

export default MovieDetailsPage
