import type { MovieVideosResponse } from '../interfaces/movieVideos.interface';

export class MovieVideosService {
  private static readonly BASE_URL = import.meta.env.VITE_URL_TMDB;
  private static readonly TOKEN = import.meta.env.VITE_TOKEN;

  static async getMovieVideos(movieId: number): Promise<MovieVideosResponse> {
    const url = `${this.BASE_URL}/movie/${movieId}/videos?language=en-US`;
    
    const headers = {
      'Authorization': `Bearer ${this.TOKEN}`,
      'Content-Type': 'application/json'
    };

    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`Error al obtener videos de la película: ${response.status}`);
    }

    return await response.json();
  }
}