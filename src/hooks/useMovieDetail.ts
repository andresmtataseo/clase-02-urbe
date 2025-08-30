import { useState, useEffect } from 'react';
import type { MovieDetail } from '../interfaces/movieDetail.interface';
import { MovieDetailService } from '../services/movieDetail.service';

export const useMovieDetail = (movieId: number | null) => {
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) {
      setMovieDetail(null);
      return;
    }

    const fetchMovieDetail = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const detail = await MovieDetailService.getMovieDetail(movieId);
        setMovieDetail(detail);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setMovieDetail(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  return {
    movieDetail,
    isLoading,
    error
  };
};