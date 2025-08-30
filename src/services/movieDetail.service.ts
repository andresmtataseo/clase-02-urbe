import type { MovieDetail } from '../interfaces/movieDetail.interface';

export class MovieDetailService {
  private static readonly BASE_URL = import.meta.env.VITE_URL_TMDB;
  private static readonly TOKEN = import.meta.env.VITE_TOKEN;

  static async getMovieDetail(movieId: number): Promise<MovieDetail> {
    const url = `${this.BASE_URL}/movie/${movieId}?language=es-MX`;
    
    const headers = {
      'Authorization': `Bearer ${this.TOKEN}`,
      'Content-Type': 'application/json'
    };

    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`Error al obtener detalles de la película: ${response.status}`);
    }

    return await response.json();
  }
}