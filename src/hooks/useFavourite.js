import { useEffect, useState, useCallback } from 'react';
import {
  checkFavourite,
  addToFavourites,
  deleteFromFavourites,
} from '@/api/user.api';
import useAuth from './useAuth';

export default function useFavourite({ id, title, genres, year }) {
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
        const data = await checkFavourite(id);
        setIsFavourite(data.is_favourite);
      } catch (err) {
        console.error(err);
      } finally {
        setInitialLoading(false);
      }
    };

    if (id) fetchFavourite();
  }, [id, user]);

  const toggleFavourite = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);

      if (isFavourite) {
        await deleteFromFavourites(id);
        setIsFavourite(false);
      } else {
        await addToFavourites({ id, title, genres, year });
        setIsFavourite(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id, title, genres, year, isFavourite, user]);

  return {
    isFavourite,
    loading,
    initialLoading,
    toggleFavourite,
  };
}
