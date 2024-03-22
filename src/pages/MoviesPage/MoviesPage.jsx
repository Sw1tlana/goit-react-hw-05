import { BsSearch } from "react-icons/bs";
import toast from 'react-hot-toast';
import { requestMoviesByQuery } from "../../services/api";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import css from './MoviesPage.module.css';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import MovieList from "../../components/MovieList/MovieList";
import { Toaster } from 'react-hot-toast';

const MoviesPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const searchQuery = searchParams.get('query');

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const query = form.elements.query.value.trim();

    if (query.trim().length === 0) {
      toast.success('Please enter a search term first!');
    } else {
      try {
        setIsLoading(true);
        setIsError(false);
        const searchData = await requestMoviesByQuery(query);
        setMovies(searchData);
        setSearchParams({ query: query });
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    form.reset();
  }

  useEffect(() => {
    if (searchQuery === null) return;
    
    const fetchMoviesByQuery = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const searchData = await requestMoviesByQuery(searchQuery);
        setMovies(searchData);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMoviesByQuery()
  }, [searchQuery]);

  return (
    <div className={css.container}>
      <Toaster />
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.inputContainer}>
      <input
      className={css.inputSearch}
      type="text"
      name="query"
      autoComplete="off"
      autoFocus
          />
          <button className={css.searchButton} type="submit"><BsSearch /></button>
      </div>
      </form>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <MovieList movies={movies}/> 
    </div>
  )
}

export default MoviesPage