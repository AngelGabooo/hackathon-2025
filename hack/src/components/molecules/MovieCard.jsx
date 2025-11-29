import React from 'react';
import Button from '../atoms/Button';

const MovieCard = ({ 
  movie, 
  onFavorite, 
  onDetails,
  isFavorite = false,
  className = ''
}) => {
  const { Title, Year, Type, Poster, imdbID } = movie;

  const handleFavorite = (e) => {
    e.stopPropagation();
    onFavorite(movie);
  };

  const handleDetails = (e) => {
    e.stopPropagation();
    onDetails(movie);
  };

  return (
    <div 
      className={`
        bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl 
        transition-all duration-300 cursor-pointer overflow-hidden group
        transform hover:-translate-y-2 ${className}
      `}
      onClick={() => onDetails(movie)}
    >
      <div className="relative overflow-hidden">
        <img 
          src={Poster !== 'N/A' ? Poster : '/placeholder-movie.jpg'} 
          alt={Title}
          className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Badge de tipo */}
        <div className="absolute top-3 left-3">
          <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium capitalize">
            {Type}
          </span>
        </div>

        {/* Botón favorito */}
        <div className="absolute top-3 right-3">
          <button
            onClick={handleFavorite}
            className={`
              w-10 h-10 rounded-full flex items-center justify-center 
              transition-all duration-300 backdrop-blur-sm
              ${isFavorite 
                ? 'bg-yellow-500 text-white shadow-lg' 
                : 'bg-black bg-opacity-50 text-white hover:bg-opacity-70'
              }
            `}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        </div>

        {/* Overlay al hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">
          {Title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
          <span>{Year}</span>
          <span className="capitalize">{Type}</span>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="primary" 
            size="sm" 
            className="flex-1"
            onClick={handleDetails}
          >
            Ver Detalles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;