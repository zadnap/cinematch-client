import { useEffect, useState } from 'react';
import { getFavourites } from '@/api/user.api.js';

export default function useFavourites(page) {
  const [favourites, setFavourites] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getFavourites(page);

        setFavourites(data.favourites);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError(err.message);
        setFavourites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return { favourites, totalPages, loading, error };
}
