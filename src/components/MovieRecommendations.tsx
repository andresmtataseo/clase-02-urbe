import { useMovieRecommendations } from '../hooks/useMovieRecommendations';
import { MovieRecommendationsService } from '../services/movieRecommendations.service';
import AutoSlider from './AutoSlider';
import { useNavigate } from 'react-router';
import ImagePlaceholder from './ImagePlaceholder';

interface MovieRecommendationsProps {
  movieId: number;
}

const MovieRecommendations = ({ movieId }: MovieRecommendationsProps) => {
  const { recommendations, isLoading, error } = useMovieRecommendations(movieId);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Películas Recomendadas</h2>
        <div className="flex justify-center items-center p-8">
          <span className="loading loading-spinner loading-lg"></span>
          <span className="ml-2">Cargando recomendaciones...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Películas Recomendadas</h2>
        <div className="alert alert-error">
          <span>Error al cargar recomendaciones: {error}</span>
        </div>
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Películas Recomendadas</h2>
        <div className="alert alert-info">
          <span>No hay recomendaciones disponibles para esta película.</span>
        </div>
      </div>
    );
  }

  const handleMovieClick = (id: number) => {
    navigate(`/cinema/movie/${id}`);
  };

  return (
    <div className="mt-8 bg-base-200 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Películas Recomendadas</h2>
      
      <AutoSlider
        autoplayDelay={5000}
        slidesPerView={{
          320: 1,
          640: 2,
          768: 3,
          1024: 4,
          1280: 5,
          1536: 6
        }}
        spaceBetween={12}
        loop={true}
        showNavigation={true}
        showPagination={false}
      >
        {recommendations.map((movie) => (
          <div 
            key={movie.id} 
            className="bg-base-100 rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer group mx-2 my-4"
            onClick={() => handleMovieClick(movie.id)}
          >
            {/* Imagen de la película */}
            <div className="relative">
              {movie.poster_path ? (
                <img
                  src={MovieRecommendationsService.getImageUrl(movie.poster_path)}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const placeholder = target.parentElement?.querySelector('.movie-placeholder');
                    if (placeholder) {
                      target.style.display = 'none';
                      (placeholder as HTMLElement).style.display = 'flex';
                    }
                  }}
                />
              ) : null}
              <div className={`movie-placeholder w-full h-64 ${movie.poster_path ? 'hidden' : 'flex'}`}>
                <ImagePlaceholder 
                  width="w-full" 
                  height="h-full" 
                  text="Póster no disponible" 
                  icon="movie"
                />
              </div>
              
              {/* Rating badge */}
              <div className="absolute top-2 right-2">
                <span className="badge badge-primary">
                  {movie.vote_average.toFixed(1)}/10
                </span>
              </div>
            </div>

            {/* Información de la película */}
            <div className="p-5">
              <h3 className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                {movie.title}
              </h3>
              
              <p className="text-sm text-gray-600 mb-3">
                {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
              </p>
              
              <p className="text-sm text-gray-700 line-clamp-3 mb-4">
                {movie.overview || 'Sin descripción disponible'}
              </p>
              
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {movie.vote_count} votos
                </span>
                <span className="text-xs text-gray-500">
                  ★ {movie.popularity.toFixed(0)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </AutoSlider>
    </div>
  );
};

export default MovieRecommendations;