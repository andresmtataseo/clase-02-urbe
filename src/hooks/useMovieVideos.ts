import { useState, useEffect } from 'react';
import type { MovieVideosResponse, MovieTrailerData } from '../interfaces/movieVideos.interface';
import { MovieVideosService } from '../services/movieVideos.service';

export const useMovieVideos = (movieId: number | null) => {
  const [videos, setVideos] = useState<MovieVideosResponse | null>(null);
  const [trailer, setTrailer] = useState<MovieTrailerData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) {
      setVideos(null);
      setTrailer(null);
      return;
    }

    const fetchMovieVideos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const videosData = await MovieVideosService.getMovieVideos(movieId);
        setVideos(videosData);
        
        // Buscar el primer trailer oficial de YouTube
        const officialTrailer = videosData.results.find(
          video => video.site === 'YouTube' && 
                   video.type === 'Trailer' && 
                   video.official === true
        );
        
        // Si no hay trailer oficial, buscar cualquier trailer de YouTube
        const anyTrailer = videosData.results.find(
          video => video.site === 'YouTube' && video.type === 'Trailer'
        );
        
        const selectedTrailer = officialTrailer || anyTrailer;
        
        if (selectedTrailer) {
          setTrailer({
            key: selectedTrailer.key,
            name: selectedTrailer.name,
            site: selectedTrailer.site,
            type: selectedTrailer.type,
            official: selectedTrailer.official
          });
        } else {
          setTrailer(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setVideos(null);
        setTrailer(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieVideos();
  }, [movieId]);

  return {
    videos,
    trailer,
    isLoading,
    error
  };
};