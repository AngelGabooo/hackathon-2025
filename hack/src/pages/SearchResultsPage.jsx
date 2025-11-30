import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Grid, List, AlertCircle } from 'lucide-react';
import Header from '../components/organisms/Header';
import FilterBar from '../components/molecules/FilterBar';
import MovieGrid from '../components/organisms/MovieGrid';
import Pagination from '../components/organisms/Pagination';
import IconButton from '../components/atoms/IconButton';
import { useMovies } from '../hooks/useMovies';
import { useTheme } from '../hooks/useTheme';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  
  const { 
    movies, 
    loading, 
    error, 
    totalResults, 
    currentPage,
    favorites,
    searchMovies, 
    toggleFavorite, 
    setCurrentPage 
  } = useMovies();
  
  const { isDarkMode, toggleTheme } = useTheme();
  
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    type: '',
    year: '',
    genre: ''
  });

  useEffect(() => {
    if (query) {
      searchMovies(query, filters, 1);
    }
  }, [query]);

  useEffect(() => {
    if (query) {
      searchMovies(query, filters, 1);
    }
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ type: '', year: '', genre: '' });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    searchMovies(query, filters, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDetails = (movie) => {
    navigate(`/movie/${movie.imdbID}`);
  };

  const handleSearch = (searchTerm) => {
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-black' : 'bg-gray-50'}`}>
      <Header 
        onSearch={handleSearch}
        onThemeToggle={toggleTheme}
        isDarkMode={isDarkMode}
      />
      
      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Controles de vista y resultados */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Resultados de: "{query}"
            </h1>
            {!loading && (
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                {totalResults > 0 ? `${totalResults} resultados encontrados` : 'No se encontraron resultados'}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Selector de vista */}
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
          </div>
        </div>

        {/* Filtros */}
        <div className="mb-4 sm:mb-6">
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <AlertCircle size={18} className="sm:w-6 sm:h-6 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-400 text-sm sm:text-base">Error en la búsqueda</h3>
                <p className="text-red-700 dark:text-red-300 text-xs sm:text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Resultados */}
        <MovieGrid
          movies={movies}
          onFavorite={toggleFavorite}
          onDetails={handleDetails}
          favorites={favorites}
          viewMode={viewMode}
          loading={loading}
        />

        {/* Paginación */}
        {totalPages > 1 && !loading && (
          <div className="mt-6 sm:mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchResultsPage;