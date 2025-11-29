import axios from 'axios';

const API_BASE_URL = 'https://www.omdbapi.com/';
const API_KEY = 'f8fe7a4'; // Tu API key

export const movieAPI = {
  // Búsqueda por título
  searchMovies: async (query, page = 1) => {
    try {
      const response = await axios.get(API_BASE_URL, {
        params: {
          s: query,
          page: page,
          apikey: API_KEY
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al buscar películas');
    }
  },

  // Búsqueda con filtros
  searchWithFilters: async (query, filters = {}, page = 1) => {
    try {
      const params = {
        s: query,
        page: page,
        apikey: API_KEY,
        ...filters
      };
      
      const response = await axios.get(API_BASE_URL, { params });
      return response.data;
    } catch (error) {
      throw new Error('Error al buscar con filtros');
    }
  },

  // Obtener detalles por ID
  getMovieById: async (id) => {
    try {
      const response = await axios.get(API_BASE_URL, {
        params: {
          i: id,
          plot: 'full',
          apikey: API_KEY
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener detalles');
    }
  },

  // Búsqueda avanzada
  advancedSearch: async (params) => {
    try {
      const response = await axios.get(API_BASE_URL, {
        params: {
          ...params,
          apikey: API_KEY
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Error en búsqueda avanzada');
    }
  }
};