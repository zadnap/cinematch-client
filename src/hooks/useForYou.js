import { useEffect, useState } from 'react';
import { getForYou } from '@/api/movie.api.js';

export default function useForYou(page) {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getForYou(page);

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
  }, [page]);

  return { movies, totalPages, loading, error };
}
