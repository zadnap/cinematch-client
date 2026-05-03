import { useEffect, useState } from 'react';
import { getAllGenres } from '@/api/movie.api.js';

export default function useGenres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getAllGenres();

        setGenres(data.genres);
      } catch (err) {
        setError(err.message);
        setGenres([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { genres, loading, error };
}
