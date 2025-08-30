import { useParams, useNavigate } from 'react-router';
import MovieDetail from '../../components/MovieDetail';

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const movieId = id ? parseInt(id, 10) : null;

  if (!movieId || isNaN(movieId)) {
    return (
      <div className="max-w-2xl mx-auto mt-8">
        <div className="alert alert-error">
          <span>ID de película inválido</span>
        </div>
        <div className="mt-4">
          <button 
            onClick={() => navigate('/cinema/now-playing')} 
            className="btn btn-primary"
          >
            Volver a películas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Navigation */}
      <div className="mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="btn btn-ghost btn-sm"
        >
          ← Volver
        </button>
      </div>
      
      {/* Movie Detail Component */}
      <MovieDetail movieId={movieId} />
    </div>
  );
};

export default MovieDetailPage;