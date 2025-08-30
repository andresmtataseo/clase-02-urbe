import { useMovieCredits } from '../hooks/useMovieCredits';
import type { CastMember } from '../interfaces/movieCredits.interface';
import AutoSlider from './AutoSlider';
import ImagePlaceholder from './ImagePlaceholder';

interface MovieCastProps {
  movieId: number;
}

const MovieCast = ({ movieId }: MovieCastProps) => {
  const { credits, loading, error } = useMovieCredits(movieId);

  const getProfileImageUrl = (profilePath: string | null) => {
    if (!profilePath) return '/placeholder-person.jpg';
    return `${import.meta.env.VITE_IMG_URL}${profilePath}`;
  };

  if (loading) {
    return (
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Reparto</h3>
        <div className="flex justify-center items-center py-8">
          <span className="loading loading-spinner loading-lg"></span>
          <span className="ml-2">Cargando reparto...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Reparto</h3>
        <div className="alert alert-error">
          <span>Error al cargar el reparto: {error}</span>
        </div>
      </div>
    );
  }

  if (!credits || !credits.cast || credits.cast.length === 0) {
    return (
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Reparto</h3>
        <div className="alert alert-info">
          <span>No hay información de reparto disponible.</span>
        </div>
      </div>
    );
  }

  // Mostrar todo el reparto
  const mainCast = credits.cast;

  return (
    <div className="mt-8 bg-base-200 rounded-lg p-6">
      <h3 className="text-2xl font-bold mb-6">Reparto</h3>
      
      <AutoSlider
        autoplayDelay={4000}
        slidesPerView={8}
        spaceBetween={8}
        loop={true}
        showNavigation={true}
        showPagination={false}
        className="cast-slider"
      >
        {mainCast.map((actor: CastMember) => (
          <div key={actor.cast_id} className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer group h-full">
            <figure className="px-2 pt-2">
              {actor.profile_path ? (
                <img
                  src={getProfileImageUrl(actor.profile_path)}
                  alt={actor.name}
                  className="rounded-lg w-full h-48 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const placeholder = target.parentElement?.querySelector('.image-placeholder');
                    if (placeholder) {
                      target.style.display = 'none';
                      (placeholder as HTMLElement).style.display = 'flex';
                    }
                  }}
                />
              ) : null}
              <div 
                className={`image-placeholder rounded-lg w-full h-48 ${actor.profile_path ? 'hidden' : 'flex'}`}
              >
                <ImagePlaceholder 
                  width="w-full" 
                  height="h-full" 
                  text="Foto no disponible" 
                  icon="person"
                  className="rounded-lg"
                />
              </div>
            </figure>
            
            <div className="card-body p-4 text-center">
              <h4 className="font-bold text-sm leading-tight mb-1 group-hover:text-primary transition-colors duration-300">
                {actor.name}
              </h4>
              <p className="text-xs text-gray-600 leading-tight group-hover:text-gray-800 transition-colors duration-300">
                {actor.character}
              </p>
            </div>
          </div>
        ))}
      </AutoSlider>
      


    </div>
  );
};

export default MovieCast;