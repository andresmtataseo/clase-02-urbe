import { useState, useEffect } from 'react';
import type { MovieRecommendation } from '../services/movieRecommendations.service';
import { MovieRecommendationsService } from '../services/movieRecommendations.service';

export const useMovieRecommendations = (movieId: number | null) => {
  const [recommendations, setRecommendations] = useState<MovieRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) {
      setRecommendations([]);
      return;
    }

    const fetchRecommendations = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await MovieRecommendationsService.getMovieRecommendations(movieId);
        setRecommendations(response.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setRecommendations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [movieId]);

  return {
    recommendations,
    isLoading,
    error
  };
};