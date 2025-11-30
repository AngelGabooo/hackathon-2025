import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Star, 
  Eye, 
  Film, 
  Tv, 
  Calendar,
  Share2,
  BarChart3,
  Plus
} from 'lucide-react';
import Button from '../atoms/Button';
import ShareModal from './ShareModal';

const MovieCard = ({ 
  movie, 
  onFavorite, 
  onDetails,
  onShare,
  onAddToWatchlist,
  onAddToComparison,
  isFavorite = false,
  isInWatchlist = false,
  isInComparison = false,
  className = ''
}) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleFavorite = (e) => {
    e.stopPropagation();
    if (onFavorite) {
      onFavorite(movie);
    }
  };

  const handleDetails = (e) => {
    e.stopPropagation();
    if (onDetails) {
      onDetails(movie);
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    setIsShareOpen(true);
    if (onShare) {
      onShare(movie);
    }
  };

  const handleAddToWatchlist = (e) => {
    e.stopPropagation();
    if (onAddToWatchlist) {
      onAddToWatchlist(movie);
    }
  };

  const handleAddToComparison = (e) => {
    e.stopPropagation();
    if (onAddToComparison) {
      onAddToComparison(movie);
    } else {
      console.warn('onAddToComparison function not provided to MovieCard');
    }
  };

  const getTypeIcon = () => {
    return movie.Type === 'movie' ? <Film size={14} /> : <Tv size={14} />;
  };

  return (
    <>
      <motion.div 
        className={`
          relative bg-white dark:bg-black rounded-xl shadow-lg hover:shadow-2xl 
          transition-all duration-300 cursor-pointer overflow-hidden group
          border border-red-600/30 hover:border-red-600/50
          ${className}
        `}
        onClick={handleDetails}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        whileHover={{ y: -8 }}
        layout
      >
        <div className="relative overflow-hidden">
          <motion.img 
            src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.jpg'} 
            alt={movie.Title}
            className="w-full h-48 sm:h-60 md:h-72 object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Badge de tipo */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
            <span className="bg-red-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium capitalize flex items-center gap-1">
              {getTypeIcon()}
              <span className="hidden xs:inline">{movie.Type}</span>
            </span>
          </div>

          {/* Botones de acción flotantes */}
          <motion.div 
            className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col gap-1 sm:gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: showActions ? 1 : 0, x: showActions ? 0 : 20 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              onClick={handleFavorite}
              className={`
                w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center 
                transition-all duration-300 backdrop-blur-sm border text-sm
                ${isFavorite 
                  ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/25' 
                  : 'bg-black/80 border-red-600/30 text-white hover:bg-red-600 hover:border-red-600'
                }
              `}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isFavorite ? <Star size={14} className="fill-current sm:w-4 sm:h-4" /> : <Heart size={14} className="sm:w-4 sm:h-4" />}
            </motion.button>

            <motion.button
              onClick={handleAddToWatchlist}
              className={`
                w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center 
                transition-all duration-300 backdrop-blur-sm border text-sm
                ${isInWatchlist 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/25' 
                  : 'bg-black/80 border-blue-600/30 text-white hover:bg-blue-600 hover:border-blue-600'
                }
              `}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Plus size={14} className="sm:w-4 sm:h-4" />
            </motion.button>
          </motion.div>

          {/* Overlay con acciones */}
          <motion.div 
            className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: showActions ? 0.4 : 0 }}
          />
          
          {/* Año */}
          <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
            <span className="bg-black/80 text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 backdrop-blur-sm">
              <Calendar size={10} className="sm:w-3 sm:h-3" />
              {movie.Year}
            </span>
          </div>

          {/* Barra de acciones inferior */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showActions ? 1 : 0, y: showActions ? 0 : 20 }}
          >
            <div className="flex gap-1 sm:gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 flex items-center gap-1 bg-white/20 backdrop-blur-sm text-xs"
                onClick={handleDetails}
                icon={<Eye size={12} className="sm:w-3 sm:h-3" />}
              >
                Ver
              </Button>
              <button
                onClick={handleShare}
                className="p-1 sm:p-2 rounded-lg bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
              >
                <Share2 size={12} className="sm:w-3 sm:h-3" />
              </button>
              <button
                onClick={handleAddToComparison}
                className="p-1 sm:p-2 rounded-lg bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
              >
                <BarChart3 size={12} className="sm:w-3 sm:h-3" />
              </button>
            </div>
          </motion.div>
        </div>
        
        <div className="p-3 sm:p-4">
          <h3 className="font-bold text-sm sm:text-lg mb-2 sm:mb-3 line-clamp-2 text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors min-h-[40px] sm:min-h-[56px]">
            {movie.Title}
          </h3>
          
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <Calendar size={12} className="sm:w-3 sm:h-3" />
              {movie.Year}
            </span>
            <span className="text-gray-600 dark:text-gray-400 capitalize flex items-center gap-1">
              {getTypeIcon()}
              <span className="hidden xs:inline">{movie.Type}</span>
            </span>
          </div>
        </div>
      </motion.div>

      <ShareModal 
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        movie={movie}
      />
    </>
  );
};

export default MovieCard;