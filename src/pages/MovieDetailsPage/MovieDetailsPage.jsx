import { useEffect, useState, useRef, Suspense, lazy } from "react";
import { NavLink, Route, Routes, useParams, useLocation } from "react-router-dom";
import clsx from 'clsx';
import { requestMoviesById } from "../../services/api";

import css from './MovieDetailsPage.module.css';
import Loader from  '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../../components/MovieReviews/MovieReviews'));

const navLinkClass = ({ isActive }) => {
  return clsx(css.detailsLink, {
    [css.active]: isActive,
  })
}

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
      <div className={css.container}>
          {isLoading && <Loader />}
          {isError && <ErrorMessage />}
          {movieData !== null &&
        <section>

          <NavLink className={navLinkClass} to={backLinkRef.current}>Go back</NavLink>

          <div className={css.containerDetailsPage}>
            <img className={css.imgDetailPage} src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} alt={movieData.title} />
              <ul className={css.listDetailsPage}>
                  <li><h2 className={css.titleDetailsPage}>{movieData.title}</h2></li>
                  <li><p><span className={css.miniDetails}>Overview: </span>{movieData.overview}</p></li>
                  <li><p><span className={css.miniDetails}>User Score: </span>{movieData.vote_average}</p></li>
                  {movieData.genres && (<li><p>
                  <span className={css.miniDetails}>Genres: </span>{movieData.genres.map(genre => genre.name).join(', ')}</p>
                </li>
                )}
              </ul>
          </div>
        <h2 className={css.titleAddInformation}>Additional information</h2>
        </section>}
      <div className={css.containerLinkDetails}>
          {movieData && (
            <>
              <NavLink  className={navLinkClass} to="cast">Cast</NavLink>
              <NavLink className={navLinkClass} to="reviews">Reviews</NavLink>
            </>
          )}

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
