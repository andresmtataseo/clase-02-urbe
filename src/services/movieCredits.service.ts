import type { MovieCredits } from '../interfaces/movieCredits.interface';

export class MovieCreditsService {
  private static readonly BASE_URL = import.meta.env.VITE_URL_TMDB;
  private static readonly TOKEN = import.meta.env.VITE_TOKEN;

  static async getMovieCredits(movieId: number): Promise<MovieCredits> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/movie/${movieId}/credits?language=es-MX`,
        {
          headers: {
            'Authorization': `Bearer ${this.TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching movie credits: ${response.status}`);
      }

      const data: MovieCredits = await response.json();
      return data;
    } catch (error) {
      console.error('Error in MovieCreditsService.getMovieCredits:', error);
      throw error;
    }
  }
}