import { useEffect, useState } from 'react';
import { searchMovie } from '@/api/movie.api.js';

export default function useSearchMovie(query, page) {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await searchMovie(query, page);

        setMovies(data.movies);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError(err.message);
        setMovies([]);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  return { movies, totalPages, loading, error };
}
