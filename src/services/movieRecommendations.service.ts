export interface MovieRecommendation {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  media_type: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieRecommendationsResponse {
  page: number;
  results: MovieRecommendation[];
  total_pages: number;
  total_results: number;
}

export class MovieRecommendationsService {
  private static readonly BASE_URL = import.meta.env.VITE_URL_TMDB;
  private static readonly TOKEN = import.meta.env.VITE_TOKEN;

  static async getMovieRecommendations(movieId: number): Promise<MovieRecommendationsResponse> {
    const url = `${this.BASE_URL}/movie/${movieId}/recommendations?language=es-MX&page=1`;
    
    const headers = {
      'Authorization': `Bearer ${this.TOKEN}`,
      'Content-Type': 'application/json'
    };

    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`Error al obtener recomendaciones: ${response.status}`);
    }

    return await response.json();
  }

  static getImageUrl(posterPath: string | null): string {
    if (!posterPath) {
      return '/placeholder-movie.jpg';
    }
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }
}