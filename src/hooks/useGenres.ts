import { useState, useEffect } from 'react';
import type { Genre } from '../interfaces/genre.interface';
import { GenreService } from '../services/genre.service';

export const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setIsLoading(true);
        const response = await GenreService.getGenres();
        setGenres(response.genres);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenres();
  }, []);

  const getGenresByIds = (genreIds: number[]): Genre[] => {
    return genres.filter(genre => genreIds.includes(genre.id));
  };

  return {
    genres,
    isLoading,
    error,
    getGenresByIds
  };
};