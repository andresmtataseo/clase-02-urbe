import type { GenreResponse } from '../interfaces/genre.interface';

export class GenreService {
  private static readonly BASE_URL = import.meta.env.VITE_URL_TMDB;
  private static readonly TOKEN = import.meta.env.VITE_TOKEN;

  static async getGenres(): Promise<GenreResponse> {
    const url = `${this.BASE_URL}/genre/movie/list?language=es`;
    
    const headers = {
      'Authorization': `Bearer ${this.TOKEN}`,
      'Content-Type': 'application/json'
    };

    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`Error al obtener géneros: ${response.status}`);
    }

    return await response.json();
  }
}