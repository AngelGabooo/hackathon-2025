import { useMovieContext } from '../context/MovieContext';
import { movieAPI } from '../services/api';

export const useMovies = () => {
  const context = useMovieContext();
  const { dispatch, ...state } = context;

  const searchMovies = async (query, filters = {}, page = 1) => {
    if (!query.trim()) {
      dispatch({ type: 'SET_MOVIES', payload: [] });
      dispatch({ type: 'SET_ERROR', payload: null });
      return;
    }
    
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    
    try {
      let response;
      if (Object.keys(filters).length > 0) {
        response = await movieAPI.searchWithFilters(query, filters, page);
      } else {
        response = await movieAPI.searchMovies(query, page);
      }
      
      if (response.Response === 'True') {
        dispatch({ type: 'SET_MOVIES', payload: response.Search || [] });
        dispatch({ type: 'SET_TOTAL_RESULTS', payload: parseInt(response.totalResults) || 0 });
        dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.Error || 'No se encontraron resultados' });
        dispatch({ type: 'SET_MOVIES', payload: [] });
        dispatch({ type: 'SET_TOTAL_RESULTS', payload: 0 });
      }
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: 'Error de conexión: ' + err.message });
      dispatch({ type: 'SET_MOVIES', payload: [] });
      dispatch({ type: 'SET_TOTAL_RESULTS', payload: 0 });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const toggleFavorite = (movie) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: movie });
  };

  const isFavorite = (movieId) => {
    return state.favorites.some(fav => fav.imdbID === movieId);
  };

  const clearSearch = () => {
    dispatch({ type: 'SET_MOVIES', payload: [] });
    dispatch({ type: 'SET_ERROR', payload: null });
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 1 });
    dispatch({ type: 'SET_TOTAL_RESULTS', payload: 0 });
  };

  const setCurrentPage = (page) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
  };

  return {
    ...state,
    searchMovies,
    toggleFavorite,
    isFavorite,
    clearSearch,
    setCurrentPage
  };
};