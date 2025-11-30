import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  X, 
  Plus,
  Film,
  Tv,
  Calendar,
  Star,
  Clock,
  Award
} from 'lucide-react';
import Header from '../components/organisms/Header';
import Button from '../components/atoms/Button';
import { useMovies } from '../hooks/useMovies';
import { useTheme } from '../hooks/useTheme';

const ComparisonPage = () => {
  const navigate = useNavigate();
  const { comparison, removeFromComparison, clearComparison } = useMovies();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleSearch = (searchTerm) => {
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const handleDetails = (movie) => {
    navigate(`/movie/${movie.imdbID}`);
  };

  const getTypeIcon = (type) => {
    return type === 'movie' ? <Film size={14} className="sm:w-4 sm:h-4" /> : <Tv size={14} className="sm:w-4 sm:h-4" />;
  };

  const getRating = (movie) => {
    const imdbRating = movie.Ratings?.find(r => r.Source === 'Internet Movie Database');
    return imdbRating ? imdbRating.Value.split('/')[0] : 'N/A';
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-black' : 'bg-gray-50'}`}>
      <Header 
        onSearch={handleSearch}
        onThemeToggle={toggleTheme}
        isDarkMode={isDarkMode}
      />
      
      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500 to-pink-600">
                <BarChart3 size={18} className="sm:w-6 sm:h-6 text-white" />
              </div>
              Comparar Películas
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Compara {comparison.length} de 4 películas seleccionadas
            </p>
          </div>

          {comparison.length > 0 && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-4 md:mt-0">
              <Button
                variant="outline"
                onClick={clearComparison}
                className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white text-sm"
                icon={<X size={14} className="sm:w-4 sm:h-4" />}
              >
                Limpiar Todo
              </Button>
              
              <Button
                onClick={() => navigate('/')}
                icon={<Plus size={14} className="sm:w-4 sm:h-4" />}
                className="text-sm"
              >
                Agregar Más
              </Button>
            </div>
          )}
        </div>

        {/* Contenido */}
        {comparison.length === 0 ? (
          <motion.div 
            className="text-center py-12 sm:py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-purple-600/10 flex items-center justify-center">
              <BarChart3 size={32} className="sm:w-12 sm:h-12 text-purple-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
              No hay películas para comparar
            </h2>
            <p className="text-gray-500 dark:text-gray-500 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">
              Agrega películas desde cualquier página para compararlas lado a lado
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 mx-auto text-sm sm:text-base"
            >
              Explorar Películas
            </Button>
          </motion.div>
        ) : (
          <div className="overflow-x-auto">
            <div className="grid gap-4 sm:gap-6 min-w-max" style={{ 
              gridTemplateColumns: `repeat(${comparison.length}, minmax(280px, 1fr))` 
            }}>
              {comparison.map((movie) => (
                <motion.div
                  key={movie.imdbID}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden min-w-[280px]"
                >
                  {/* Header de la película */}
                  <div className="relative">
                    <img 
                      src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.jpg'} 
                      alt={movie.Title}
                      className="w-full h-48 sm:h-64 object-cover"
                    />
                    
                    <button
                      onClick={() => removeFromComparison(movie.imdbID)}
                      className="absolute top-2 right-2 sm:top-3 sm:right-3 w-6 h-6 sm:w-8 sm:h-8 bg-black/70 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <X size={12} className="sm:w-4 sm:h-4" />
                    </button>

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 sm:p-4">
                      <h3 className="text-white font-semibold text-base sm:text-lg mb-1">
                        {movie.Title}
                      </h3>
                      <div className="flex items-center gap-1 sm:gap-2 text-white/80 text-xs sm:text-sm">
                        <Calendar size={12} className="sm:w-3 sm:h-3" />
                        {movie.Year}
                        <span className="capitalize flex items-center gap-1">
                          {getTypeIcon(movie.Type)}
                          {movie.Type}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Detalles de comparación */}
                  <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                    {/* Rating */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Rating IMDb</span>
                      <div className="flex items-center gap-1">
                        <Star size={12} className="sm:w-3 sm:h-3 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold text-gray-900 dark:text-white text-sm">
                          {getRating(movie)}/10
                        </span>
                      </div>
                    </div>

                    {/* Runtime */}
                    {movie.Runtime && movie.Runtime !== 'N/A' && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Duración</span>
                        <div className="flex items-center gap-1">
                          <Clock size={12} className="sm:w-3 sm:h-3 text-gray-500" />
                          <span className="font-medium text-gray-900 dark:text-white text-sm">
                            {movie.Runtime}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Genre */}
                    {movie.Genre && movie.Genre !== 'N/A' && (
                      <div>
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 block mb-1">Géneros</span>
                        <div className="flex flex-wrap gap-1">
                          {movie.Genre.split(', ').slice(0, 3).map((genre, index) => (
                            <span 
                              key={index}
                              className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-700 dark:text-gray-300"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Director */}
                    {movie.Director && movie.Director !== 'N/A' && (
                      <div>
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 block mb-1">Director</span>
                        <p className="text-xs sm:text-sm text-gray-900 dark:text-white line-clamp-2">
                          {movie.Director}
                        </p>
                      </div>
                    )}

                    {/* Awards */}
                    {movie.Awards && movie.Awards !== 'N/A' && (
                      <div>
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 block mb-1 flex items-center gap-1">
                          <Award size={12} className="sm:w-3 sm:h-3" />
                          Premios
                        </span>
                        <p className="text-xs sm:text-sm text-gray-900 dark:text-white line-clamp-2">
                          {movie.Awards}
                        </p>
                      </div>
                    )}

                    {/* Botón de detalles */}
                    <Button
                      variant="outline"
                      onClick={() => handleDetails(movie)}
                      className="w-full text-xs sm:text-sm"
                    >
                      Ver Detalles Completos
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ComparisonPage;