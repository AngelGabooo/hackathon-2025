import React from 'react';
import MovieCard from '../molecules/MovieCard';

const FeaturedSection = ({ 
  title, 
  movies, 
  onFavorite, 
  onDetails,
  favorites = [],
  viewAllLink = "#"
}) => {
  if (!movies || movies.length === 0) return null;

  return (
    <section className="mb-16 relative">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-2 h-12 bg-gradient-to-b from-primary-500 to-neon-purple rounded-full"></div>
          <div>
            <h2 className="text-3xl font-bold text-white font-display">
              {title}
            </h2>
            <p className="text-white/60 mt-1">Descubre lo más popular esta semana</p>
          </div>
        </div>
        
        <button className="group flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300 font-semibold">
          Ver todos
          <span className="transform group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {movies.map((movie, index) => (
          <div 
            key={movie.imdbID}
            className="animate-slide-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <MovieCard
              movie={movie}
              onFavorite={onFavorite}
              onDetails={onDetails}
              isFavorite={favorites.some(fav => fav.imdbID === movie.imdbID)}
            />
          </div>
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-dark-900 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default FeaturedSection;