import { useState, useEffect } from 'react';
import { MovieMapper } from '../../interfaces/mappers/movie.mapper';
import type { Movie } from '../../interfaces/movie.interface';
import MovieCard from '../../components/MovieCard';

const NowPlayingPage = () => {
  
    const [ movies, setMovies ] = useState<Movie[]>([]);
    const [ isLoading, setLoading ] = useState(true)
    const [ isError, setError ] = useState(false)
  
    useEffect(() => {
       
        const fetchNowPlaying = async () => {

            const url = `${import.meta.env.VITE_URL_TMDB}/movie/now_playing?language=es&region=ES&page=1`;

            const headers = {
                'Authorization': `Bearer ${import.meta.env.VITE_TOKEN}`,
                'Content-Type': 'application/json'
            };

            const response = await fetch(url, {
                headers
            });
            
            if ( !response.ok) {
                setError(true)
                throw new Error("No se ha podido consultar las peliculas");
            }

            const data = await response.json();

            const movies: Movie[] = MovieMapper.mapTMDBMoviesToMovies(data.results);

            setLoading(false);
            setMovies(movies)
            
            // setMovies(data)
        }

        fetchNowPlaying();

    }, [])
  
  
  
  
    return (
  
    <div className="flex">

    <div className="flex-1">

        <div className="p-8">
        <h1 className="text-4xl font-bold mb-2">En cines</h1>
        <p className="  ">Descubre las últimas películas que estrenan en cines</p>
        </div>

        <div className="px-8 pb-8">

        {
            isLoading && (
                <div className="flex justify-center flex-col items-center h-full py-12">
                    {/* <!-- Spinner de carga usando DaisyUI --> */}
                    <span className="loading loading-spinner loading-xl text-secondary"></span>
                    <p className="mt-4">Cargando películas...</p>
                </div>
            )
        }
           
        {/* <!-- Grid de películas (solo se muestra si hay datos y no está cargando) --> */}
        {/* @if (!isLoading() && movies().length > 0) { */}
            {/* <!-- Grid responsive que se adapta a diferentes tamaños de pantalla --> */}
        {
            movies.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} />
                    ))}
                </div>
            )
        }
            
        
        {/* <!-- Estado de error -->
        @if (hasError()) {
            <!-- Alert de error usando DaisyUI --> */}
        {
            isError && (
            <div role="alert" className="alert alert-error alert-soft text-center justify-center flex-1">
                <span className="text-base">Ha ocurrido un error</span>
            </div>
            )
        }
            

        </div>
    </div>
    </div>

  )
}

export default NowPlayingPage
