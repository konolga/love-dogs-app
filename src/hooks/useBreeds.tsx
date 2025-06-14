// wite hook for search breeds
import { useState, useEffect } from 'react';
import { searchService } from '../services/searchService';


export const useBreeds = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        setLoading(true);
        const response = await searchService.getBreeds();
        if (response) {
          setBreeds(response);
        } else {
          throw new Error('Failed to fetch breeds');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  return { breeds, loading, error };
};