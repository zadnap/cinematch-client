import { onboard } from '@/api/user.api.js';
import { useState } from 'react';

export default function useOnboarding() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitOnboarding = async (genres, movies) => {
    try {
      setLoading(true);
      setError(null);
      await onboard(genres, movies);
    } catch (err) {
      setError(err.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { submitOnboarding, loading, error };
}
