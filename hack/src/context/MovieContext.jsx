import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const MovieContext = createContext();

const movieReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return { ...state, movies: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_TOTAL_RESULTS':
      return { ...state, totalResults: action.payload };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'ADD_FAVORITE':
      const exists = state.favorites.some(fav => fav.imdbID === action.payload.imdbID);
      if (exists) {
        return state;
      }
      const newFavorites = [...state.favorites, { ...action.payload, addedAt: new Date().toISOString() }];
      localStorage.setItem('movieFavorites', JSON.stringify(newFavorites));
      return { ...state, favorites: newFavorites };
    case 'REMOVE_FAVORITE':
      const filteredFavorites = state.favorites.filter(fav => fav.imdbID !== action.payload);
      localStorage.setItem('movieFavorites', JSON.stringify(filteredFavorites));
      return { ...state, favorites: filteredFavorites };
    case 'TOGGLE_FAVORITE':
      const isFavorite = state.favorites.some(fav => fav.imdbID === action.payload.imdbID);
      let updatedFavorites;
      if (isFavorite) {
        updatedFavorites = state.favorites.filter(fav => fav.imdbID !== action.payload.imdbID);
      } else {
        updatedFavorites = [...state.favorites, { ...action.payload, addedAt: new Date().toISOString() }];
      }
      localStorage.setItem('movieFavorites', JSON.stringify(updatedFavorites));
      return { ...state, favorites: updatedFavorites };
    case 'SET_FAVORITES':
      return { ...state, favorites: action.payload };
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
  favorites: []
};

export const MovieProvider = ({ children }) => {
  const [storedFavorites, setStoredFavorites] = useLocalStorage('movieFavorites', []);
  const [state, dispatch] = useReducer(movieReducer, {
    ...initialState,
    favorites: storedFavorites
  });

  // Sincronizar favoritos con localStorage
  useEffect(() => {
    setStoredFavorites(state.favorites);
  }, [state.favorites, setStoredFavorites]);

  const value = {
    ...state,
    dispatch
  };

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