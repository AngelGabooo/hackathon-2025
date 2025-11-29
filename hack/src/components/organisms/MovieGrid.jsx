import React from 'react';
import MovieCard from '../molecules/MovieCard';

const MovieGrid = ({ 
  movies, 
  onFavorite, 
  onDetails,
  favorites = [],
  viewMode = 'grid',
  loading = false 
}) => {
  if (loading) {
    return (
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        : "flex flex-col gap-4"
      }>
        {[...Array(10)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-300 dark:bg-gray-700 h-64 rounded-lg mb-2"></div>
            <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded mb-2"></div>
            <div className="bg-gray-300 dark:bg-gray-700 h-3 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎬</div>
        <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
          No se encontraron películas
        </h3>
        <p className="text-gray-500 dark:text-gray-500">
          Intenta con otros términos de búsqueda o filtros
        </p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="flex flex-col gap-4">
        {movies.map((movie) => (
          <div 
            key={movie.imdbID}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex"
            onClick={() => onDetails(movie)}
          >
            <div className="w-32 flex-shrink-0">
              <img 
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450/4A5568/FFFFFF?text=No+Image'} 
                alt={movie.Title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  {movie.Title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {movie.Year} • {movie.Type}
                </p>
              </div>
              <div className="flex gap-2 mt-2">
                <button 
                  className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDetails(movie);
                  }}
                >
                  Detalles
                </button>
                <button 
                  className={`px-3 py-1 rounded-lg text-sm ${
                    favorites.some(fav => fav.imdbID === movie.imdbID) 
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onFavorite(movie);
                  }}
                >
                  {favorites.some(fav => fav.imdbID === movie.imdbID) ? '★' : '☆'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Vista grid (por defecto)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onFavorite={onFavorite}
          onDetails={onDetails}
          isFavorite={favorites.some(fav => fav.imdbID === movie.imdbID)}
        />
      ))}
    </div>
  );
};

export default MovieGrid;