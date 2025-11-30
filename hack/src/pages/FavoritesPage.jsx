import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Trash2, Calendar, BarChart3, Filter, Grid, List } from 'lucide-react';
import Header from '../components/organisms/Header';
import MovieGrid from '../components/organisms/MovieGrid';
import Button from '../components/atoms/Button';
import IconButton from '../components/atoms/IconButton';
import { useMovies } from '../hooks/useMovies';
import { useTheme } from '../hooks/useTheme';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, clearFavorites } = useMovies();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('addedAt');

  const handleSearch = (searchTerm) => {
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const handleDetails = (movie) => {
    navigate(`/movie/${movie.imdbID}`);
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

  const handleClearAllFavorites = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar todos tus favoritos?')) {
      clearFavorites();
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-black' : 'bg-gray-50'}`}>
      <Header 
        onSearch={handleSearch}
        onThemeToggle={toggleTheme}
        isDarkMode={isDarkMode}
      />
      
      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Mis Favoritos
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              {favorites.length} {favorites.length === 1 ? 'película o serie guardada' : 'películas o series guardadas'}
            </p>
          </div>

          {favorites.length > 0 && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-4 md:mt-0">
              {/* Ordenar */}
              <div className="flex items-center gap-2">
                <Filter size={14} className="sm:w-4 sm:h-4 text-gray-600 dark:text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-2 py-1.5 sm:px-3 sm:py-2 border border-red-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-black text-gray-900 dark:text-white text-sm"
                >
                  <option value="addedAt">Más recientes</option>
                  <option value="title">Orden A-Z</option>
                  <option value="year">Año (nuevo a viejo)</option>
                </select>
              </div>

              {/* Vista */}
              <div className="flex items-center gap-1 border border-red-600/30 rounded-lg p-1">
                <IconButton
                  icon={<Grid size={14} className="sm:w-4 sm:h-4" />}
                  variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                />
                <IconButton
                  icon={<List size={14} className="sm:w-4 sm:h-4" />}
                  variant={viewMode === 'list' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                />
              </div>

              {/* Limpiar todo */}
              <Button
                variant="outline"
                onClick={handleClearAllFavorites}
                className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white flex items-center gap-2 text-sm"
                icon={<Trash2 size={14} className="sm:w-4 sm:h-4" />}
              >
                Limpiar Todo
              </Button>
            </div>
          )}
        </div>

        {/* Contenido */}
        {favorites.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-red-600/10 flex items-center justify-center">
              <Search size={32} className="sm:w-12 sm:h-12 text-red-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
              Aún no tienes favoritos
            </h2>
            <p className="text-gray-500 dark:text-gray-500 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">
              Comienza a explorar películas y series, y agrega tus favoritos haciendo clic en el corazón ❤️
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 mx-auto text-sm sm:text-base"
              icon={<Search size={14} className="sm:w-4 sm:h-4" />}
            >
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
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-white dark:bg-black rounded-xl shadow-lg border border-red-600/30">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <BarChart3 size={16} className="sm:w-5 sm:h-5 text-red-600" />
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                  Estadísticas de tus Favoritos
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-red-600">{favorites.length}</div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {favorites.filter(fav => fav.Type === 'movie').length}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Películas</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                    {favorites.filter(fav => fav.Type === 'series').length}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Series</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {new Set(favorites.map(fav => fav.Year?.substring(0, 3) + '0')).size}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Décadas</div>
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