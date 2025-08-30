import { useState, useEffect } from 'react';
import type { MovieCredits } from '../interfaces/movieCredits.interface';
import { MovieCreditsService } from '../services/movieCredits.service';

export const useMovieCredits = (movieId: number | null) => {
  const [credits, setCredits] = useState<MovieCredits | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) {
      setCredits(null);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchCredits = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const creditsData = await MovieCreditsService.getMovieCredits(movieId);
        setCredits(creditsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido al cargar los créditos');
        setCredits(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();
  }, [movieId]);

  return { credits, loading, error };
};