import { useMovieDetail } from '../hooks/useMovieDetail';
import { useMovieVideos } from '../hooks/useMovieVideos';
import type { MovieDetail as MovieDetailType } from '../interfaces/movieDetail.interface';
import MovieCast from './MovieCast';
import MovieRecommendations from './MovieRecommendations';
import ImagePlaceholder from './ImagePlaceholder';
import { MovieTrailer } from './MovieTrailer';

interface MovieDetailProps {
  movieId: number;
}

const MovieDetail = ({ movieId }: MovieDetailProps) => {
  const { movieDetail, isLoading, error } = useMovieDetail(movieId);
  const { trailer, isLoading: isLoadingVideos, error: videosError } = useMovieVideos(movieId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <span className="loading loading-spinner loading-xl text-primary"></span>
          <p className="mt-4 text-lg">Cargando detalles de la película...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error max-w-2xl mx-auto mt-8">
        <span>Error: {error}</span>
      </div>
    );
  }

  if (!movieDetail) {
    return (
      <div className="alert alert-warning max-w-2xl mx-auto mt-8">
        <span>No se encontraron detalles para esta película</span>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Hero Section */}
      <div className="relative mb-8">
        <div className="relative h-96 rounded-lg overflow-hidden">
          {movieDetail.backdrop_path ? (
            <img
              src={`${import.meta.env.VITE_IMG_URL}${movieDetail.backdrop_path}`}
              alt={movieDetail.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                const placeholder = target.parentElement?.querySelector('.backdrop-placeholder');
                if (placeholder) {
                  target.style.display = 'none';
                  (placeholder as HTMLElement).style.display = 'flex';
                }
              }}
            />
          ) : null}
          <div className={`backdrop-placeholder w-full h-full ${movieDetail.backdrop_path ? 'hidden' : 'flex'}`}>
            <ImagePlaceholder 
              width="w-full" 
              height="h-full" 
              text="Imagen de fondo no disponible" 
              icon="movie"
              className="rounded-lg"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-4xl font-bold mb-2">{movieDetail.title}</h1>
            {movieDetail.tagline && (
              <p className="text-xl italic opacity-90">{movieDetail.tagline}</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Poster and Basic Info */}
        <div className="lg:col-span-1">
          <div className="card bg-base-200 shadow-xl">
            <figure className="px-4 pt-4">
              {movieDetail.poster_path ? (
                <img
                  src={`${import.meta.env.VITE_IMG_URL}${movieDetail.poster_path}`}
                  alt={movieDetail.title}
                  className="rounded-lg w-full max-w-sm"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const placeholder = target.parentElement?.querySelector('.poster-placeholder');
                    if (placeholder) {
                      target.style.display = 'none';
                      (placeholder as HTMLElement).style.display = 'flex';
                    }
                  }}
                />
              ) : null}
              <div className={`poster-placeholder w-full max-w-sm h-96 ${movieDetail.poster_path ? 'hidden' : 'flex'}`}>
                <ImagePlaceholder 
                  width="w-full" 
                  height="h-full" 
                  text="Póster no disponible" 
                  icon="movie"
                  className="rounded-lg"
                />
              </div>
            </figure>
            <div className="card-body">
              <div className="stats stats-vertical shadow">
                <div className="stat">
                  <div className="stat-title">Calificación</div>
                  <div className="stat-value text-primary">{movieDetail.vote_average.toFixed(1)}</div>
                  <div className="stat-desc">{movieDetail.vote_count} votos</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Duración</div>
                  <div className="stat-value text-secondary">{formatRuntime(movieDetail.runtime)}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Fecha de estreno</div>
                  <div className="stat-value text-sm">{formatDate(movieDetail.release_date)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview */}
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Sinopsis</h2>
              <p className="text-lg leading-relaxed">{movieDetail.overview}</p>
            </div>
          </div>

          {/* Genres */}
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
              <h3 className="card-title mb-4">Géneros</h3>
              <div className="flex flex-wrap gap-2">
                {movieDetail.genres.map((genre) => (
                  <span key={genre.id} className="badge badge-primary badge-lg">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Trailer */}
          <MovieTrailer 
            trailer={trailer} 
            isLoading={isLoadingVideos} 
            error={videosError} 
          />

          {/* Financial Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h3 className="card-title">Presupuesto</h3>
                <p className="text-2xl font-bold text-success">
                  {movieDetail.budget > 0 ? formatCurrency(movieDetail.budget) : 'No disponible'}
                </p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h3 className="card-title">Recaudación</h3>
                <p className="text-2xl font-bold text-warning">
                  {movieDetail.revenue > 0 ? formatCurrency(movieDetail.revenue) : 'No disponible'}
                </p>
              </div>
            </div>
          </div>

          {/* Production Companies */}
          {movieDetail.production_companies.length > 0 && (
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h3 className="card-title mb-4">Compañías Productoras</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {movieDetail.production_companies.map((company) => (
                    <div key={company.id} className="flex items-center space-x-3 p-3 bg-base-200 rounded-lg">
                      {company.logo_path && (
                        <img
                          src={`${import.meta.env.VITE_IMG_URL}${company.logo_path}`}
                          alt={company.name}
                          className="w-12 h-12 object-contain bg-white rounded p-1"
                        />
                      )}
                      <div>
                        <p className="font-semibold">{company.name}</p>
                        <p className="text-sm opacity-70">{company.origin_country}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
              <h3 className="card-title mb-4">Información Adicional</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><span className="font-semibold">Título original:</span> {movieDetail.original_title}</p>
                  <p><span className="font-semibold">Idioma original:</span> {movieDetail.original_language.toUpperCase()}</p>
                  <p><span className="font-semibold">Estado:</span> {movieDetail.status}</p>
                  <p><span className="font-semibold">Popularidad:</span> {movieDetail.popularity.toFixed(1)}</p>
                </div>
                <div>
                  {movieDetail.imdb_id && (
                    <p>
                      <span className="font-semibold">IMDB ID:</span> 
                      <a 
                        href={`https://www.imdb.com/title/${movieDetail.imdb_id}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="link link-primary ml-1"
                      >
                        {movieDetail.imdb_id}
                      </a>
                    </p>
                  )}
                  {movieDetail.homepage && (
                    <p>
                      <span className="font-semibold">Sitio web:</span> 
                      <a 
                        href={movieDetail.homepage} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="link link-primary ml-1"
                      >
                        Visitar
                      </a>
                    </p>
                  )}
                  <p><span className="font-semibold">Países de origen:</span> {movieDetail.origin_country.join(', ')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Spoken Languages */}
          {movieDetail.spoken_languages.length > 0 && (
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h3 className="card-title mb-4">Idiomas Disponibles</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {movieDetail.spoken_languages.map((language, index) => (
                    <div key={index} className="flex items-center justify-center p-3 bg-base-100 rounded-lg border border-base-300 hover:bg-base-300 transition-colors duration-200">
                      <span className="text-sm font-medium text-center">
                        {language.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Sección de Reparto */}
      <MovieCast movieId={movieId} />
      
      {/* Sección de Recomendaciones */}
      <MovieRecommendations movieId={movieId} />
    </div>
  );
};

export default MovieDetail;