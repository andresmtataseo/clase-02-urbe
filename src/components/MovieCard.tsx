import type { Movie } from '../interfaces/movie.interface';
import { useGenres } from '../hooks/useGenres';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import ImagePlaceholder from './ImagePlaceholder';

interface CardMovieProp{
    movie: Movie
}

const MovieCard = ({movie} : CardMovieProp ) => {
  const { getGenresByIds, isLoading: genresLoading } = useGenres();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  
  const movieGenres = getGenresByIds(movie.genres);

  const handleCardClick = () => {
    navigate(`/cinema/movie/${movie.id}`);
  };

  // Funciones para manejar datos faltantes o incorrectos
  const getMovieTitle = () => {
    return movie.name && movie.name.trim() !== '' ? movie.name : 'Título no disponible';
  };

  const getMovieRating = () => {
    return movie.rating && !isNaN(movie.rating) && movie.rating >= 0 ? movie.rating : 0;
  };

  const hasValidGenres = () => {
    return movie.genres && Array.isArray(movie.genres) && movie.genres.length > 0;
  };

  return (
    <div 
      className="card bg-base-300 shadow-xl movie-card group overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
      onClick={handleCardClick}
    >
    <div className="relative">
        {/* Placeholder mientras carga la imagen o si hay error */}
        {(imageLoading || imageError || !movie.posterImg) && (
          <div className="w-full h-96">
            <ImagePlaceholder 
              width="w-full" 
              height="h-full" 
              text={imageError ? "Error al cargar imagen" : "Póster no disponible"} 
              icon="movie"
              className="rounded-t-lg"
            />
          </div>
        )}
        
        {/* Imagen real */}
        {movie.posterImg && !imageError && (
          <img
            src={`${movie.posterImg}`}
            className={`w-full h-96 object-cover transition-opacity duration-300 ${
              imageLoading ? 'opacity-0 absolute' : 'opacity-100'
            }`}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
            alt={movie.name}
          />
        )}

        {/* Badge de rating */}
         <div className="absolute top-2 right-2">
           <span className={`badge badge-soft ${
             getMovieRating() === 0 ? 'badge-warning' : 'badge-primary'
           }`}>
             {getMovieRating() === 0 ? 'N/A' : `${getMovieRating().toFixed(1)}/10`}
           </span>
         </div>
    </div>

    {/* <!-- Información de la película --> */}
    <div className="p-4">
        {/* <!-- Título de la película --> */}
        <h3 className={`font-semibold text-lg mb-2 truncate ${
          movie.name && movie.name.trim() !== '' ? 'text-primary' : 'text-base-content/50'
        }`}>
          {getMovieTitle()}
        </h3>

        {/* <!-- Contenedor de géneros --> */}
        <div className="flex flex-wrap gap-2">
        {genresLoading ? (
          <span className="badge badge-soft badge-secondary min-h-[2rem] py-2 px-3 leading-tight flex items-center justify-center text-center">
            Cargando géneros...
          </span>
        ) : !hasValidGenres() ? (
          <span className="badge badge-soft badge-warning min-h-[2rem] py-2 px-3 leading-tight flex items-center justify-center text-center">
            Géneros no disponibles
          </span>
        ) : movieGenres.length === 0 ? (
          <span className="badge badge-soft badge-error min-h-[2rem] py-2 px-3 leading-tight flex items-center justify-center text-center">
            Error al cargar géneros
          </span>
        ) : (
          movieGenres.map((genre) => (
            <span key={genre.id} className="badge badge-soft badge-primary min-h-[2rem] py-2 px-3 leading-tight flex items-center justify-center text-center break-words">
              {genre.name || 'Género desconocido'}
            </span>
          ))
        )}
        </div>

    </div>
    </div>
  )
}

export default MovieCard
