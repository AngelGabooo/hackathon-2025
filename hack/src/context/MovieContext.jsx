import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const MovieContext = createContext();

const movieReducer = (state, action) => {
  console.log('Reducer Action:', action.type, action.payload);
  
  switch (action.type) {
    case 'SET_MOVIES':
      return { 
        ...state, 
        movies: action.payload,
        loading: false,
        error: null
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { 
        ...state, 
        error: action.payload, 
        loading: false,
        movies: action.payload ? [] : state.movies
      };
    case 'SET_TOTAL_RESULTS':
      return { ...state, totalResults: action.payload };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    
    // Favorites actions
    case 'ADD_FAVORITE':
      const exists = state.favorites.some(fav => fav.imdbID === action.payload.imdbID);
      if (exists) {
        return state;
      }
      const newFavorites = [...state.favorites, { 
        ...action.payload, 
        addedAt: new Date().toISOString(),
        favoriteId: Date.now()
      }];
      console.log('Added favorite. Total:', newFavorites.length);
      return { ...state, favorites: newFavorites };
    
    case 'REMOVE_FAVORITE':
      const filteredFavorites = state.favorites.filter(fav => fav.imdbID !== action.payload);
      console.log('Removed favorite. Total:', filteredFavorites.length);
      return { ...state, favorites: filteredFavorites };
    
    case 'TOGGLE_FAVORITE':
      const movieToToggle = action.payload;
      console.log('Toggling favorite for:', movieToToggle.imdbID, movieToToggle.Title);
      
      const favoriteExists = state.favorites.some(fav => fav.imdbID === movieToToggle.imdbID);
      
      if (favoriteExists) {
        // Remover de favoritos
        const newFavorites = state.favorites.filter(fav => fav.imdbID !== movieToToggle.imdbID);
        console.log('Removed from favorites. New count:', newFavorites.length);
        return { ...state, favorites: newFavorites };
      } else {
        // Agregar a favoritos
        const newFavorite = {
          ...movieToToggle,
          addedAt: new Date().toISOString(),
          favoriteId: Date.now()
        };
        const newFavorites = [...state.favorites, newFavorite];
        console.log('Added to favorites. New count:', newFavorites.length);
        return { ...state, favorites: newFavorites };
      }
    
    case 'SET_FAVORITES':
      return { ...state, favorites: action.payload };
    
    case 'CLEAR_FAVORITES':
      console.log('Clearing all favorites');
      return { ...state, favorites: [] };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };

    // Watchlist actions
    case 'ADD_TO_WATCHLIST':
      const watchlistExists = state.watchlist.some(item => item.imdbID === action.payload.imdbID);
      if (watchlistExists) {
        return state;
      }
      const newWatchlist = [...state.watchlist, { 
        ...action.payload, 
        addedAt: new Date().toISOString(),
        priority: 'medium',
        watched: false
      }];
      console.log('Added to watchlist. Total:', newWatchlist.length);
      return { ...state, watchlist: newWatchlist };
    
    case 'REMOVE_FROM_WATCHLIST':
      const filteredWatchlist = state.watchlist.filter(item => item.imdbID !== action.payload);
      console.log('Removed from watchlist. Total:', filteredWatchlist.length);
      return { ...state, watchlist: filteredWatchlist };
    
    case 'TOGGLE_WATCHLIST':
      const isInWatchlist = state.watchlist.some(item => item.imdbID === action.payload.imdbID);
      let updatedWatchlist;
      if (isInWatchlist) {
        updatedWatchlist = state.watchlist.filter(item => item.imdbID !== action.payload.imdbID);
      } else {
        updatedWatchlist = [...state.watchlist, { 
          ...action.payload, 
          addedAt: new Date().toISOString(),
          priority: 'medium',
          watched: false
        }];
      }
      console.log('Toggled watchlist. Total:', updatedWatchlist.length);
      return { ...state, watchlist: updatedWatchlist };
    
    case 'UPDATE_WATCHLIST_PRIORITY':
      const priorityUpdatedWatchlist = state.watchlist.map(item =>
        item.imdbID === action.payload.movieId 
          ? { ...item, priority: action.payload.priority }
          : item
      );
      return { ...state, watchlist: priorityUpdatedWatchlist };
    
    case 'MARK_AS_WATCHED':
      const watchedUpdatedWatchlist = state.watchlist.map(item =>
        item.imdbID === action.payload 
          ? { ...item, watched: true, watchedAt: new Date().toISOString() }
          : item
      );
      return { ...state, watchlist: watchedUpdatedWatchlist };
    
    case 'CLEAR_WATCHLIST':
      console.log('Clearing all watchlist');
      return { ...state, watchlist: [] };

    // Comparison actions
    case 'ADD_TO_COMPARISON':
      if (state.comparison.length >= 4) {
        console.log('Comparison limit reached (max 4)');
        return state;
      }
      const comparisonExists = state.comparison.some(item => item.imdbID === action.payload.imdbID);
      if (comparisonExists) {
        return state;
      }
      const newComparison = [...state.comparison, action.payload];
      console.log('Added to comparison. Total:', newComparison.length);
      return { ...state, comparison: newComparison };
    
    case 'REMOVE_FROM_COMPARISON':
      const filteredComparison = state.comparison.filter(item => item.imdbID !== action.payload);
      console.log('Removed from comparison. Total:', filteredComparison.length);
      return { ...state, comparison: filteredComparison };
    
    case 'CLEAR_COMPARISON':
      console.log('Clearing all comparison');
      return { ...state, comparison: [] };

    default:
      return state;
  }
};

const initialState = {
  movies: [],
  loading: false,
  error: null,
  totalResults: 0,
  currentPage: 1,
  favorites: [],
  watchlist: [],
  comparison: []
};

export const MovieProvider = ({ children }) => {
  const [storedFavorites, setStoredFavorites] = useLocalStorage('movieFavorites', []);
  const [storedWatchlist, setStoredWatchlist] = useLocalStorage('movieWatchlist', []);
  const [storedComparison, setStoredComparison] = useLocalStorage('movieComparison', []);
  
  const [state, dispatch] = useReducer(movieReducer, {
    ...initialState,
    favorites: storedFavorites || [],
    watchlist: storedWatchlist || [],
    comparison: storedComparison || []
  });

  // Sincronizar con localStorage
  useEffect(() => {
    console.log('Saving favorites to localStorage:', state.favorites);
    setStoredFavorites(state.favorites);
  }, [state.favorites, setStoredFavorites]);

  useEffect(() => {
    console.log('Saving watchlist to localStorage:', state.watchlist);
    setStoredWatchlist(state.watchlist);
  }, [state.watchlist, setStoredWatchlist]);

  useEffect(() => {
    console.log('Saving comparison to localStorage:', state.comparison);
    setStoredComparison(state.comparison);
  }, [state.comparison, setStoredComparison]);

  // Actions
  const actions = {
    // Movies actions
    setMovies: (movies) => dispatch({ type: 'SET_MOVIES', payload: movies }),
    setLoading: (loading) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: (error) => dispatch({ type: 'SET_ERROR', payload: error }),
    setTotalResults: (total) => dispatch({ type: 'SET_TOTAL_RESULTS', payload: total }),
    setCurrentPage: (page) => dispatch({ type: 'SET_CURRENT_PAGE', payload: page }),
    
    // Favorites actions
    toggleFavorite: (movie) => {
      console.log('Dispatching toggleFavorite for:', movie?.imdbID);
      dispatch({ type: 'TOGGLE_FAVORITE', payload: movie });
    },
    clearFavorites: () => dispatch({ type: 'CLEAR_FAVORITES' }),
    clearError: () => dispatch({ type: 'CLEAR_ERROR' }),

    // Watchlist actions
    addToWatchlist: (movie) => dispatch({ type: 'ADD_TO_WATCHLIST', payload: movie }),
    removeFromWatchlist: (movieId) => dispatch({ type: 'REMOVE_FROM_WATCHLIST', payload: movieId }),
    toggleWatchlist: (movie) => dispatch({ type: 'TOGGLE_WATCHLIST', payload: movie }),
    updateWatchlistPriority: (movieId, priority) => dispatch({ 
      type: 'UPDATE_WATCHLIST_PRIORITY', 
      payload: { movieId, priority } 
    }),
    markAsWatched: (movieId) => dispatch({ type: 'MARK_AS_WATCHED', payload: movieId }),
    clearWatchlist: () => dispatch({ type: 'CLEAR_WATCHLIST' }),

    // Comparison actions
    addToComparison: (movie) => dispatch({ type: 'ADD_TO_COMPARISON', payload: movie }),
    removeFromComparison: (movieId) => dispatch({ type: 'REMOVE_FROM_COMPARISON', payload: movieId }),
    clearComparison: () => dispatch({ type: 'CLEAR_COMPARISON' })
  };

  const value = {
    ...state,
    ...actions
  };

  console.log('MovieProvider value:', value);

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext debe ser usado dentro de un MovieProvider');
  }
  return context;
};