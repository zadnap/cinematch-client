import { useEffect, useState } from 'react';
import { getPreviewTrailers } from '@/api/movie.api.js';

export default function usePreviewTrailers(limit = 5) {
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getPreviewTrailers(limit);

        setTrailers(data.trailers);
      } catch (err) {
        setError(err.message);
        setTrailers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [limit]);

  return { trailers, loading, error };
}
