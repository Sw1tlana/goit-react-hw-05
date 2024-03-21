import { useEffect, useState, useRef } from "react";
import { NavLink, Link, Route, Routes, useLocation, useParams } from "react-router-dom"
import { requestMoviesById } from "../../services/api"

import Loader from  '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';

const MovieDetailsPage = () => {
    const location = useLocation();
    const backLinkRef = useRef(location.state ?? "/search")
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
          {movieData !== null && <div>
              <Link to={backLinkRef.current}>Go back</Link>
               <img src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} alt={movieData.title} />
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
          </div>
          <Routes>
              <Route path="cast" element={<MovieCast />} />
          </Routes>
        <div>
            <NavLink to="reviews">Reviews</NavLink>
        </div>
          <Routes>
              <Route path="reviews" element={<MovieReviews />} />
          </Routes>
      </div>
  )
}

export default MovieDetailsPage
