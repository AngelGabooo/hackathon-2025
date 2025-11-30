import { useMovieContext } from '../context/MovieContext';
import { movieAPI } from '../services/api';

export const useMovies = () => {
  const context = useMovieContext();
  
  if (!context) {
    throw new Error('useMovies debe ser usado dentro de un MovieProvider');
  }

  const { 
    movies, 
    loading, 
    error, 
    totalResults, 
    currentPage,
    favorites,
    watchlist,
    comparison,
    searchMovies,
    toggleFavorite,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,
    updateWatchlistPriority,
    markAsWatched,
    clearWatchlist,
    addToComparison,
    removeFromComparison,
    clearComparison,
    clearFavorites,
    clearSearch,
    setCurrentPage
  } = context;

  // Funciones auxiliares
  const checkIsFavorite = (movieId) => {
    return favorites.some(fav => fav.imdbID === movieId);
  };

  const checkIsInWatchlist = (movieId) => {
    return watchlist.some(item => item.imdbID === movieId);
  };

  const checkIsInComparison = (movieId) => {
    return comparison.some(item => item.imdbID === movieId);
  };

  return {
    // State
    movies,
    loading,
    error,
    totalResults,
    currentPage,
    favorites,
    watchlist,
    comparison,
    
    // Actions
    searchMovies,
    toggleFavorite,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,
    updateWatchlistPriority,
    markAsWatched,
    clearWatchlist,
    addToComparison,
    removeFromComparison,
    clearComparison,
    clearFavorites,
    clearSearch,
    setCurrentPage,
    
    // Helper functions
    isFavorite: checkIsFavorite,
    isInWatchlist: checkIsInWatchlist,
    isInComparison: checkIsInComparison
  };
};