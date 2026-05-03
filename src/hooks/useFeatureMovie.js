import { useEffect, useState } from 'react';
import { getFeaturedMovie } from '@/api/movie.api.js';

export default function useFeaturedMovie(page) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getFeaturedMovie();

        setMovie(data.movie);
      } catch (err) {
        setError(err.message);
        setMovie([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return { movie, loading, error };
}
