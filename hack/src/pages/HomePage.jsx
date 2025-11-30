import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, Tv, Heart } from 'lucide-react';
import Header from '../components/organisms/Header';
import SearchBar from '../components/molecules/SearchBar';
import FilterBar from '../components/molecules/FilterBar';
import MovieGrid from '../components/organisms/MovieGrid';
import { useMovies } from '../hooks/useMovies';
import { useTheme } from '../hooks/useTheme';
import { movieAPI } from '../services/api';

const HomePage = () => {
  const navigate = useNavigate();
  const { 
    toggleFavorite, 
    favorites
  } = useMovies();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);

  useEffect(() => {
    const loadFeaturedContent = async () => {
      try {
        // Películas destacadas
        const moviesResponse = await movieAPI.searchMovies('avengers');
        if (moviesResponse.Response === 'True') {
          setFeaturedMovies(moviesResponse.Search.slice(0, 6));
        }

        // Series populares
        const seriesResponse = await movieAPI.searchMovies('series');
        if (seriesResponse.Response === 'True') {
          setPopularSeries(seriesResponse.Search.slice(0, 6));
        }
      } catch (error) {
        console.error('Error loading featured content:', error);
      }
    };

    loadFeaturedContent();
  }, []);

  const handleSearch = (searchTerm) => {
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const handleDetails = (movie) => {
    navigate(`/movie/${movie.imdbID}`);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-black' : 'bg-gray-50'}`}>
      <Header 
        onSearch={handleSearch}
        onThemeToggle={toggleTheme}
        isDarkMode={isDarkMode}
      />
      
      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Hero Section Mejorada */}
        <section className="text-center mb-12 sm:mb-16 py-8 sm:py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              CineVerse
            </h1>
            <p className="text-base sm:text-xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 leading-relaxed">
              Descubre un universo de películas y series. Encuentra tus títulos favoritos, 
              explora nuevos géneros y crea tu colección personal.
            </p>
            <div className="max-w-2xl mx-auto">
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Buscar películas, series, actores..."
              />
            </div>
          </div>
        </section>

        {/* Estadísticas Rápidas */}
        <section className="mb-8 sm:mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white dark:bg-black p-4 sm:p-6 rounded-xl shadow-lg text-center border border-red-600/30">
              <div className="flex justify-center mb-2 sm:mb-3">
                <Film size={24} className="sm:w-8 sm:h-8 text-red-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">10K+</div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Películas Disponibles</div>
            </div>
            <div className="bg-white dark:bg-black p-4 sm:p-6 rounded-xl shadow-lg text-center border border-red-600/30">
              <div className="flex justify-center mb-2 sm:mb-3">
                <Tv size={24} className="sm:w-8 sm:h-8 text-red-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">5K+</div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Series de TV</div>
            </div>
            <div className="bg-white dark:bg-black p-4 sm:p-6 rounded-xl shadow-lg text-center border border-red-600/30">
              <div className="flex justify-center mb-2 sm:mb-3">
                <Heart size={24} className="sm:w-8 sm:h-8 text-red-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">{favorites.length}</div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Tus Favoritos</div>
            </div>
          </div>
        </section>

        {/* Filtros Rápidos */}
        <section className="mb-8 sm:mb-12">
          <FilterBar 
            filters={{ type: '', year: '', genre: '' }}
            onFilterChange={() => {}}
            onClearFilters={() => {}}
          />
        </section>

        {/* Secciones Destacadas */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Películas Destacadas
          </h2>
          <MovieGrid
            movies={featuredMovies}
            onFavorite={toggleFavorite}
            onDetails={handleDetails}
            favorites={favorites}
            viewMode="grid"
          />
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Series Populares
          </h2>
          <MovieGrid
            movies={popularSeries}
            onFavorite={toggleFavorite}
            onDetails={handleDetails}
            favorites={favorites}
            viewMode="grid"
          />
        </section>
      </main>
    </div>
  );
};

export default HomePage;