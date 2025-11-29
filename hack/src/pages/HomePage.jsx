import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/organisms/Header';
import SearchBar from '../components/molecules/SearchBar';
import FeaturedSection from '../components/organisms/FeaturedSection';
import FilterBar from '../components/molecules/FilterBar';
import { useMovies } from '../hooks/useMovies';
import { useTheme } from '../hooks/useTheme';
import { movieAPI } from '../services/api';

const HomePage = () => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite, favorites } = useMovies();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);

  useEffect(() => {
    const loadFeaturedContent = async () => {
      try {
        // Películas destacadas
        const moviesResponse = await movieAPI.searchMovies('avengers');
        if (moviesResponse.Response === 'True') {
          setFeaturedMovies(moviesResponse.Search.slice(0, 5));
        }

        // Series populares
        const seriesResponse = await movieAPI.searchWithFilters('series', { type: 'series' });
        if (seriesResponse.Response === 'True') {
          setPopularSeries(seriesResponse.Search.slice(0, 5));
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

  const handleFavoritesClick = () => {
    navigate('/favorites');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Header 
        onSearch={handleSearch}
        onThemeToggle={toggleTheme}
        isDarkMode={isDarkMode}
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section Mejorada */}
        <section className="text-center mb-16 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
              CineSearch
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Descubre un universo de películas y series. Encuentra tus títulos favoritos, 
              explora nuevos géneros y crea tu colección personal.
            </p>
            <div className="max-w-2xl mx-auto">
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Buscar películas, series, actores..."
                size="lg"
              />
            </div>
          </div>
        </section>

        {/* Estadísticas Rápidas */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">10K+</div>
              <div className="text-gray-600 dark:text-gray-400">Películas Disponibles</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">5K+</div>
              <div className="text-gray-600 dark:text-gray-400">Series de TV</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">{favorites.length}</div>
              <div className="text-gray-600 dark:text-gray-400">Tus Favoritos</div>
            </div>
          </div>
        </section>

        {/* Filtros Rápidos */}
        <section className="mb-12">
          <FilterBar 
            filters={{ type: '', year: '', genre: '' }}
            onFilterChange={() => {}}
            onClearFilters={() => {}}
          />
        </section>

        {/* Secciones Destacadas */}
        <FeaturedSection
          title="🎬 Películas Destacadas"
          movies={featuredMovies}
          onFavorite={toggleFavorite}
          onDetails={handleDetails}
          favorites={favorites}
        />

        <FeaturedSection
          title="📺 Series Populares"
          movies={popularSeries}
          onFavorite={toggleFavorite}
          onDetails={handleDetails}
          favorites={favorites}
        />
      </main>
    </div>
  );
};

export default HomePage;