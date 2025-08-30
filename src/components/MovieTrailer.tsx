import React from 'react';
import type { MovieTrailerData } from '../interfaces/movieVideos.interface';

interface MovieTrailerProps {
  trailer: MovieTrailerData | null;
  isLoading: boolean;
  error: string | null;
}

export const MovieTrailer: React.FC<MovieTrailerProps> = ({ trailer, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="card bg-base-200 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-lg font-semibold mb-4">Trailer</h3>
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card bg-base-200 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-lg font-semibold mb-4">Trailer</h3>
          <div className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Error al cargar el trailer: {error}</span>
          </div>
        </div>
      </div>
    );
  }

  if (!trailer) {
    return (
      <div className="card bg-base-200 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-lg font-semibold mb-4">Trailer</h3>
          <div className="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>No hay trailer disponible para esta película</span>
          </div>
        </div>
      </div>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${trailer.key}`;

  return (
    <div className="card bg-base-200 shadow-lg">
      <div className="card-body">
        <h3 className="card-title text-lg font-semibold mb-4">
          Trailer
          {trailer.official && (
            <div className="badge badge-primary badge-sm ml-2">Oficial</div>
          )}
        </h3>
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src={embedUrl}
            title={trailer.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <p className="text-sm text-base-content/70 mt-2">{trailer.name}</p>
      </div>
    </div>
  );
};