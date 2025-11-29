import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/organisms/Header';
import Button from '../components/atoms/Button';
import { movieAPI } from '../services/api';
import { useTheme } from '../hooks/useTheme';
import { useMovies } from '../hooks/useMovies';

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useMovies();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) {
        setError('ID de película no proporcionado');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await movieAPI.getMovieById(id);
        
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setError(data.Error || 'No se pudo cargar la película');
        }
      } catch (err) {
        setError('Error al cargar los detalles: ' + err.message);
        console.error('Error fetching movie details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]); // Solo dependemos de id

  const handleSearch = (searchTerm) => {
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const handleFavoritesClick = () => {
    navigate('/favorites');
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <Header 
          onSearch={handleSearch}
          onThemeToggle={toggleTheme} 
          isDarkMode={isDarkMode}
        />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="bg-gray-300 dark:bg-gray-700 h-8 w-1/3 rounded mb-4"></div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="bg-gray-300 dark:bg-gray-700 h-96 w-full rounded-xl"></div>
              </div>
              <div className="md:w-2/3 space-y-4">
                <div className="bg-gray-300 dark:bg-gray-700 h-8 rounded"></div>
                <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded w-3/4"></div>
                <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded w-1/2"></div>
                <div className="bg-gray-300 dark:bg-gray-700 h-20 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <Header 
          onSearch={handleSearch}
          onThemeToggle={toggleTheme} 
          isDarkMode={isDarkMode}
        />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-auto">
            <div className="text-6xl mb-4">😞</div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {error || 'Película no encontrada'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              No pudimos cargar los detalles de esta película.
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => navigate(-1)} variant="outline">
                ← Volver
              </Button>
              <Button onClick={() => navigate('/')}>
                🏠 Ir al Inicio
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Header 
        onSearch={handleSearch}
        onThemeToggle={toggleTheme} 
        isDarkMode={isDarkMode}
      />
      
      <main className="container mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2"
        >
          ← Volver
        </Button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Poster */}
            <div className="lg:w-1/3 p-6 flex justify-center">
              <div className="w-full max-w-sm">
                <img 
                  src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.jpg'} 
                  alt={movie.Title}
                  className="w-full rounded-xl shadow-lg"
                />
              </div>
            </div>

            {/* Información */}
            <div className="lg:w-2/3 p-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {movie.Title}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {movie.Year}
                    </span>
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {movie.Type}
                    </span>
                    {movie.Rated && movie.Rated !== 'N/A' && (
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {movie.Rated}
                      </span>
                    )}
                    {movie.Runtime && movie.Runtime !== 'N/A' && (
                      <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {movie.Runtime}
                      </span>
                    )}
                  </div>
                </div>
                
                <Button
                  variant={isFavorite(movie.imdbID) ? 'primary' : 'outline'}
                  onClick={() => toggleFavorite(movie)}
                  className="flex items-center gap-2 whitespace-nowrap mt-4 lg:mt-0"
                >
                  {isFavorite(movie.imdbID) ? '★' : '☆'}
                  {isFavorite(movie.imdbID) ? 'En Favoritos' : 'Agregar a Favoritos'}
                </Button>
              </div>

              {/* Ratings */}
              {movie.Ratings && movie.Ratings.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Calificaciones
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {movie.Ratings.map((rating, index) => (
                      <div key={index} className="text-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3 min-w-[100px]">
                        <div className="text-xl font-bold text-red-600">
                          {rating.Value}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {rating.Source}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Información detallada */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {movie.Genre && movie.Genre !== 'N/A' && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Género</h4>
                    <p className="text-gray-600 dark:text-gray-400">{movie.Genre}</p>
                  </div>
                )}
                
                {movie.Director && movie.Director !== 'N/A' && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Director</h4>
                    <p className="text-gray-600 dark:text-gray-400">{movie.Director}</p>
                  </div>
                )}
                
                {movie.Actors && movie.Actors !== 'N/A' && (
                  <div className="md:col-span-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Reparto</h4>
                    <p className="text-gray-600 dark:text-gray-400">{movie.Actors}</p>
                  </div>
                )}
                
                {movie.Language && movie.Language !== 'N/A' && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Idioma</h4>
                    <p className="text-gray-600 dark:text-gray-400">{movie.Language}</p>
                  </div>
                )}
                
                {movie.Country && movie.Country !== 'N/A' && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">País</h4>
                    <p className="text-gray-600 dark:text-gray-400">{movie.Country}</p>
                  </div>
                )}
                
                {movie.Awards && movie.Awards !== 'N/A' && (
                  <div className="md:col-span-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Premios</h4>
                    <p className="text-gray-600 dark:text-gray-400">{movie.Awards}</p>
                  </div>
                )}
              </div>

              {/* Sinopsis */}
              {movie.Plot && movie.Plot !== 'N/A' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Sinopsis
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                    {movie.Plot}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MovieDetailPage;