import { useEffect, useState } from 'react';
import { getMoviesByGenres } from '@/api/movie.api.js';

export default function useMoviesByGenres(genreIds, page) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getMoviesByGenres(genreIds, page);

        setMovies(data.movies);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError(err.message);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [genreIds, page]);

  return { movies, totalPages, loading, error };
}
