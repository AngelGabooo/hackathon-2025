import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import MovieCard from '../molecules/MovieCard';

const FeaturedSection = ({ 
  title, 
  movies, 
  onFavorite, 
  onDetails, 
  onShare,
  onAddToWatchlist,
  onAddToComparison,
  isFavorite,
  isInWatchlist,
  isInComparison
}) => {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          {title}
          <ChevronRight size={20} className="text-red-600" />
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {movies.map((movie, index) => (
          <motion.div
            key={movie.imdbID}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <MovieCard
              movie={movie}
              onFavorite={onFavorite}
              onDetails={onDetails}
              onShare={onShare}
              onAddToWatchlist={onAddToWatchlist}
              onAddToComparison={onAddToComparison}
              isFavorite={isFavorite(movie.imdbID)}
              isInWatchlist={isInWatchlist(movie.imdbID)}
              isInComparison={isInComparison(movie.imdbID)}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;