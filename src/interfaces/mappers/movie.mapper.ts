import type { Movie } from "../movie.interface";
import type { TMDBMovie } from "../TMDB.interface";


export class MovieMapper {

  static mapTMDBMovieToMovie(TMDBMovie: TMDBMovie): Movie {
    return {
      id: TMDBMovie.id,
      name: TMDBMovie.title,
      genres: TMDBMovie.genre_ids,
      rating: TMDBMovie.vote_average,
      description: TMDBMovie.overview,
      posterImg: `${import.meta.env.VITE_IMG_URL}${TMDBMovie.poster_path}`,
      popularity: TMDBMovie.popularity
    }
  }

  static mapTMDBMoviesToMovies(TMDBMovies: TMDBMovie[]): Movie[] {
    return TMDBMovies.map(TMDBMovie => MovieMapper.mapTMDBMovieToMovie(TMDBMovie));
  }
}
