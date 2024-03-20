import { BsSearch } from "react-icons/bs";
import toast from 'react-hot-toast';
import { requestMoviesByQuery } from "../services/api"
import { useState, useEffect } from "react";
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

const MoviesPage = ({ onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const query = form.elements.query.value.trim();
    if (!query) {
      onSubmit(query);
    } else {
       toast.error('Please enter a search query!');
    }

    form.reset();
  }

  useEffect(() => {
    if (searchQuery === null) return;   
    const fetchMoviesByQuery = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const movieData = requestMoviesByQuery(searchQuery);
        setSearchQuery(movieData);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMoviesByQuery()
  }, [searchQuery]);

  return (
    <header>
    <form onSubmit={handleSubmit}>
      <div>
      <input
      type="text"
      name="query"
      autoComplete="off"
      autoFocus
      placeholder="Search"
          />
          <button type="submit"><BsSearch /></button>
      </div>
      </form>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
</header>
  )
}

export default MoviesPage