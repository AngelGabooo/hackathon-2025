import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Filter, 
  Trash2, 
  Eye, 
  EyeOff, 
  Star,
  Calendar,
  ArrowUp,
  ArrowDown,
  CheckCircle2
} from 'lucide-react';
import Header from '../components/organisms/Header';
import Button from '../components/atoms/Button';
import { useMovies } from '../hooks/useMovies';
import { useTheme } from '../hooks/useTheme';

const WatchlistPage = () => {
  const navigate = useNavigate();
  const { watchlist, removeFromWatchlist, updateWatchlistPriority, markAsWatched, clearWatchlist } = useMovies();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('added');

  const handleSearch = (searchTerm) => {
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const handleDetails = (movie) => {
    navigate(`/movie/${movie.imdbID}`);
  };

  const filteredWatchlist = watchlist.filter(item => {
    if (filter === 'watched') return item.watched;
    if (filter === 'unwatched') return !item.watched;
    return true;
  });

  const sortedWatchlist = [...filteredWatchlist].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.Title.localeCompare(b.Title);
      case 'year':
        return b.Year.localeCompare(a.Year);
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'added':
      default:
        return new Date(b.addedAt) - new Date(a.addedAt);
    }
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <ArrowUp size={14} className="sm:w-4 sm:h-4" />;
      case 'medium': return <Star size={14} className="sm:w-4 sm:h-4" />;
      case 'low': return <ArrowDown size={14} className="sm:w-4 sm:h-4" />;
      default: return <Star size={14} className="sm:w-4 sm:h-4" />;
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
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                <Clock size={18} className="sm:w-6 sm:h-6 text-white" />
              </div>
              Mi Watchlist
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              {watchlist.length} {watchlist.length === 1 ? 'película por ver' : 'películas por ver'}
            </p>
          </div>

          {watchlist.length > 0 && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-4 md:mt-0">
              {/* Filtros */}
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-2 py-1.5 sm:px-3 sm:py-2 border border-red-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-black text-gray-900 dark:text-white text-sm"
              >
                <option value="all">Todas</option>
                <option value="unwatched">Por ver</option>
                <option value="watched">Vistas</option>
              </select>

              {/* Ordenar */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2 py-1.5 sm:px-3 sm:py-2 border border-red-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-black text-gray-900 dark:text-white text-sm"
              >
                <option value="added">Más recientes</option>
                <option value="title">Orden A-Z</option>
                <option value="year">Año</option>
                <option value="priority">Prioridad</option>
              </select>

              {/* Limpiar todo */}
              <Button
                variant="outline"
                onClick={() => {
                  if (window.confirm('¿Eliminar toda la watchlist?')) {
                    clearWatchlist();
                  }
                }}
                className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white flex items-center gap-2 text-sm"
                icon={<Trash2 size={14} className="sm:w-4 sm:h-4" />}
              >
                Limpiar
              </Button>
            </div>
          )}
        </div>

        {/* Contenido */}
        {watchlist.length === 0 ? (
          <motion.div 
            className="text-center py-12 sm:py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-blue-600/10 flex items-center justify-center">
              <Clock size={32} className="sm:w-12 sm:h-12 text-blue-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
              Tu watchlist está vacía
            </h2>
            <p className="text-gray-500 dark:text-gray-500 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">
              Agrega películas a tu lista de pendientes para verlas más tarde
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 mx-auto text-sm sm:text-base"
            >
              Explorar Películas
            </Button>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
            layout
          >
            <AnimatePresence>
              {sortedWatchlist.map((item) => (
                <motion.div
                  key={item.imdbID}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden group hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative">
                    <img 
                      src={item.Poster !== 'N/A' ? item.Poster : '/placeholder-movie.jpg'} 
                      alt={item.Title}
                      className="w-full h-40 sm:h-48 object-cover"
                    />
                    
                    {/* Estado de visto */}
                    {item.watched && (
                      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-green-500 text-white p-1 rounded-full">
                        <CheckCircle2 size={12} className="sm:w-4 sm:h-4" />
                      </div>
                    )}

                    {/* Prioridad */}
                    <div className={`absolute top-2 left-2 sm:top-3 sm:left-3 ${getPriorityColor(item.priority)}`}>
                      {getPriorityIcon(item.priority)}
                    </div>

                    {/* Overlay de acciones */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-1 sm:gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleDetails(item)}
                          icon={<Eye size={12} className="sm:w-3 sm:h-3" />}
                          className="text-xs"
                        >
                          Ver
                        </Button>
                        {!item.watched && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => markAsWatched(item.imdbID)}
                            icon={<CheckCircle2 size={12} className="sm:w-3 sm:h-3" />}
                            className="text-xs"
                          >
                            Vista
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 sm:p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 text-sm sm:text-base">
                      {item.Title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">
                      <span>{item.Year}</span>
                      <span className="capitalize">{item.Type}</span>
                    </div>

                    {/* Selector de prioridad */}
                    <select
                      value={item.priority}
                      onChange={(e) => updateWatchlistPriority(item.imdbID, e.target.value)}
                      className="w-full px-2 py-1 text-xs sm:text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="low">Baja prioridad</option>
                      <option value="medium">Media prioridad</option>
                      <option value="high">Alta prioridad</option>
                    </select>

                    {/* Botón eliminar */}
                    <button
                      onClick={() => removeFromWatchlist(item.imdbID)}
                      className="w-full mt-2 px-2 py-1 text-xs sm:text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded border border-red-600/30 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default WatchlistPage;