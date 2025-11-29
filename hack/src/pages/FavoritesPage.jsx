import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/organisms/Header';
import MovieGrid from '../components/organisms/MovieGrid';
import Button from '../components/atoms/Button';
import IconButton from '../components/atoms/IconButton';
import { useMovies } from '../hooks/useMovies';
import { useTheme } from '../hooks/useTheme';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useMovies();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('addedAt');

  const handleSearch = (searchTerm) => {
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const handleDetails = (movie) => {
    navigate(`/movie/${movie.imdbID}`);
  };

  const handleFavoritesClick = () => {
    // Ya estamos en favoritos
  };

  // Ordenar favoritos
  const sortedFavorites = [...favorites].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.Title.localeCompare(b.Title);
      case 'year':
        return b.Year.localeCompare(a.Year);
      case 'addedAt':
      default:
        return new Date(b.addedAt) - new Date(a.addedAt);
    }
  });

  const clearAllFavorites = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar todos tus favoritos?')) {
      localStorage.removeItem('movieFavorites');
      window.location.reload();
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Header 
        onSearch={handleSearch}
        onThemeToggle={toggleTheme}
        isDarkMode={isDarkMode}
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              ❤️ Mis Favoritos
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {favorites.length} {favorites.length === 1 ? 'película o serie guardada' : 'películas o series guardadas'}
            </p>
          </div>

          {favorites.length > 0 && (
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              {/* Ordenar */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="addedAt">Más recientes</option>
                <option value="title">Orden A-Z</option>
                <option value="year">Año (nuevo a viejo)</option>
              </select>

              {/* Vista */}
              <div className="flex items-center gap-1 border border-gray-300 dark:border-gray-600 rounded-lg p-1">
                <IconButton
                  icon="⧄"
                  variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                />
                <IconButton
                  icon="☰"
                  variant={viewMode === 'list' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                />
              </div>

              {/* Limpiar todo */}
              <Button
                variant="outline"
                onClick={clearAllFavorites}
                className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900"
              >
                Limpiar Todo
              </Button>
            </div>
          )}
        </div>

        {/* Contenido */}
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🎬</div>
            <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-4">
              Aún no tienes favoritos
            </h2>
            <p className="text-gray-500 dark:text-gray-500 mb-8 max-w-md mx-auto">
              Comienza a explorar películas y series, y agrega tus favoritos haciendo clic en la estrella ☆
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 mx-auto"
            >
              <span>🔍</span>
              Explorar Películas
            </Button>
          </div>
        ) : (
          <>
            <MovieGrid
              movies={sortedFavorites}
              onFavorite={toggleFavorite}
              onDetails={handleDetails}
              favorites={favorites}
              viewMode={viewMode}
            />

            {/* Estadísticas */}
            <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Estadísticas de tus Favoritos
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{favorites.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {favorites.filter(fav => fav.Type === 'movie').length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Películas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {favorites.filter(fav => fav.Type === 'series').length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Series</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {new Set(favorites.map(fav => fav.Year.substring(0, 3) + '0')).size}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Décadas</div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default FavoritesPage;