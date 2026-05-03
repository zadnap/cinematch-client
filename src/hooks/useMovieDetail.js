import { useEffect, useState } from 'react';
import { getMovieDetail } from '@/api/movie.api.js';

export default function useMovieDetail(id) {
  const [movie, setMovie] = useState(null);
  const [casts, setCasts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getMovieDetail(id);
        setMovie(data.movie);
        setCasts(data.casts);
        setReviews(data.reviews);
      } catch (err) {
        setError(err.message);
        setMovie(null);
        setCasts([]);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { movie, casts, reviews, loading, error };
}
