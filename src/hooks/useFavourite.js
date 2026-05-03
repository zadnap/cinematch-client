import { useEffect, useState, useCallback } from 'react';
import {
  checkFavourite,
  addToFavourites,
  deleteFromFavourites,
} from '@/api/user.api';
import useAuth from './useAuth';

export default function useFavourite(movieId) {
  const { user } = useAuth();
  const [isFavourite, setIsFavourite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchFavourite = async () => {
      if (!user) {
        setIsFavourite(false);
        setInitialLoading(false);
        return;
      }

      try {
        setInitialLoading(true);
        const data = await checkFavourite(movieId);
        setIsFavourite(data.is_favourite);
      } catch (err) {
        console.error(err);
      } finally {
        setInitialLoading(false);
      }
    };

    if (movieId) fetchFavourite();
  }, [movieId, user]);

  const toggleFavourite = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);

      if (isFavourite) {
        await deleteFromFavourites(movieId);
        setIsFavourite(false);
      } else {
        await addToFavourites(movieId);
        setIsFavourite(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [movieId, isFavourite, user]);

  return {
    isFavourite,
    loading,
    initialLoading,
    toggleFavourite,
  };
}
