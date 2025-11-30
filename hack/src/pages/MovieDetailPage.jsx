import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  Clock, 
  Calendar, 
  Users, 
  Award, 
  Globe,
  Film,
  Tv,
  Share2,
  Bookmark
} from 'lucide-react';
import Header from '../components/organisms/Header';
import Button from '../components/atoms/Button';
import ShareModal from '../components/molecules/ShareModal';
import { movieAPI } from '../services/api';
import { useTheme } from '../hooks/useTheme';
import { useMovies } from '../hooks/useMovies';

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useMovies();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) {
        setError('ID de película no proporcionado');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await movieAPI.getMovieById(id);
        
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setError(data.Error || 'No se pudo cargar la película');
        }
      } catch (err) {
        setError('Error al cargar los detalles: ' + err.message);
        console.error('Error fetching movie details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleSearch = (searchTerm) => {
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const handleShare = () => {
    setIsShareOpen(true);
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'dark bg-black' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'}`}>
        <Header 
          onSearch={handleSearch}
          onThemeToggle={toggleTheme} 
          isDarkMode={isDarkMode}
        />
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-12 max-w-7xl">
          <div className="animate-pulse">
            <div className="bg-gradient-to-r from-gray-300 to-gray-400 dark:from-red-600/20 dark:to-red-600/10 h-8 w-24 sm:w-32 rounded-full mb-6 sm:mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-gray-300 to-gray-400 dark:from-red-600/20 dark:to-red-600/10 aspect-[2/3] w-full rounded-2xl sm:rounded-3xl"></div>
              </div>
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                <div className="bg-gradient-to-r from-gray-300 to-gray-400 dark:from-red-600/20 dark:to-red-600/10 h-8 sm:h-12 rounded-xl sm:rounded-2xl w-3/4"></div>
                <div className="flex gap-2 sm:gap-3">
                  <div className="bg-gradient-to-r from-gray-300 to-gray-400 dark:from-red-600/20 dark:to-red-600/10 h-6 sm:h-8 w-16 sm:w-24 rounded-full"></div>
                  <div className="bg-gradient-to-r from-gray-300 to-gray-400 dark:from-red-600/20 dark:to-red-600/10 h-6 sm:h-8 w-16 sm:w-24 rounded-full"></div>
                </div>
                <div className="bg-gradient-to-r from-gray-300 to-gray-400 dark:from-red-600/20 dark:to-red-600/10 h-24 sm:h-32 rounded-xl sm:rounded-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'dark bg-black' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'}`}>
        <Header 
          onSearch={handleSearch}
          onThemeToggle={toggleTheme} 
          isDarkMode={isDarkMode}
        />
        <div className="container mx-auto px-3 sm:px-4 py-12 sm:py-20 text-center max-w-2xl">
          <div className="backdrop-blur-xl bg-white/80 dark:bg-black/80 rounded-2xl sm:rounded-3xl p-6 sm:p-12 border border-gray-200/50 dark:border-red-600/30 shadow-2xl">
            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center shadow-lg">
              <Film size={32} className="sm:w-12 sm:h-12 text-white" />
            </div>
            <h1 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-3 sm:mb-4">
              {error || 'Película no encontrada'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 text-sm sm:text-lg">
              No pudimos cargar los detalles de esta película.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button 
                onClick={() => navigate(-1)} 
                variant="outline"
                className="border-gray-300 dark:border-red-600/30 hover:bg-gray-100 dark:hover:bg-black dark:hover:border-red-600/50 text-sm sm:text-base"
                icon={<ArrowLeft size={16} className="sm:w-4 sm:h-4" />}
              >
                Volver
              </Button>
              <Button 
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-sm sm:text-base"
              >
                Ir al Inicio
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const avgRating = movie.Ratings && movie.Ratings.length > 0 
    ? movie.Ratings.find(r => r.Source === 'Internet Movie Database')?.Value.split('/')[0] 
    : null;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-black' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'}`}>
      <Header 
        onSearch={handleSearch}
        onThemeToggle={toggleTheme} 
        isDarkMode={isDarkMode}
      />
      
      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-7xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 mb-6 sm:mb-8 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full backdrop-blur-xl bg-white/80 dark:bg-black/80 border border-gray-200/50 dark:border-red-600/30 hover:bg-white dark:hover:bg-black hover:border-red-600/50 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
        >
          <ArrowLeft size={16} className="sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium text-gray-700 dark:text-gray-300">Volver</span>
        </button>

        {/* Hero Section con Backdrop */}
        <div className="relative mb-8 sm:mb-12 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
          {/* Backdrop difuminado */}
          <div 
            className="absolute inset-0 bg-cover bg-center blur-2xl opacity-20 scale-110"
            style={{
              backgroundImage: movie.Poster !== 'N/A' ? `url(${movie.Poster})` : 'none'
            }}
          />
          
          {/* Gradiente overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-white/80 dark:from-black dark:via-black/95 dark:to-black/80" />

          {/* Contenido */}
          <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8 lg:p-12">
            {/* Poster */}
            <div className="lg:col-span-1 flex justify-center lg:justify-start">
              <div className="relative group w-full max-w-xs">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 rounded-2xl sm:rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <img 
                  src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.jpg'} 
                  alt={movie.Title}
                  className="relative w-full aspect-[2/3] object-cover rounded-2xl sm:rounded-3xl shadow-2xl border-4 border-white/50 dark:border-red-600/20"
                />
                {avgRating && (
                  <div className="absolute top-3 right-3 backdrop-blur-xl bg-black/70 rounded-xl sm:rounded-2xl px-3 py-1.5 sm:px-4 sm:py-2 border border-white/20">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Star size={16} className="sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
                      <span className="text-white font-bold text-sm sm:text-lg">{avgRating}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Información Principal */}
            <div className="lg:col-span-2 flex flex-col">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
                  {movie.Title}
                </h1>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                  <span className="backdrop-blur-xl bg-red-600/90 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1 sm:gap-2 shadow-lg">
                    <Calendar size={14} className="sm:w-4 sm:h-4" />
                    {movie.Year}
                  </span>
                  <span className="backdrop-blur-xl bg-blue-600/90 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold capitalize flex items-center gap-1 sm:gap-2 shadow-lg">
                    {movie.Type === 'movie' ? <Film size={14} className="sm:w-4 sm:h-4" /> : <Tv size={14} className="sm:w-4 sm:h-4" />}
                    {movie.Type === 'movie' ? 'Película' : 'Serie'}
                  </span>
                  {movie.Rated && movie.Rated !== 'N/A' && (
                    <span className="backdrop-blur-xl bg-green-600/90 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                      {movie.Rated}
                    </span>
                  )}
                  {movie.Runtime && movie.Runtime !== 'N/A' && (
                    <span className="backdrop-blur-xl bg-purple-600/90 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1 sm:gap-2 shadow-lg">
                      <Clock size={14} className="sm:w-4 sm:h-4" />
                      {movie.Runtime}
                    </span>
                  )}
                </div>

                {/* Sinopsis */}
                {movie.Plot && movie.Plot !== 'N/A' && (
                  <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                    {movie.Plot}
                  </p>
                )}

                {/* Genre */}
                {movie.Genre && movie.Genre !== 'N/A' && (
                  <div className="mb-6 sm:mb-8">
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {movie.Genre.split(', ').map((genre, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium backdrop-blur-xl bg-gray-200/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-300/50 dark:border-gray-700/50"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <button
                  onClick={() => toggleFavorite(movie)}
                  className={`flex-1 min-w-[140px] sm:min-w-[200px] flex items-center justify-center gap-2 sm:gap-3 px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base ${
                    isFavorite(movie.imdbID)
                      ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white'
                      : 'backdrop-blur-xl bg-white/80 dark:bg-black/80 border-2 border-gray-200 dark:border-red-600/30 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-black dark:hover:border-red-600/50'
                  }`}
                >
                  {isFavorite(movie.imdbID) ? (
                    <>
                      <Heart size={16} className="sm:w-5 sm:h-5 fill-current" />
                      En Favoritos
                    </>
                  ) : (
                    <>
                      <Heart size={16} className="sm:w-5 sm:h-5" />
                      Agregar a Favoritos
                    </>
                  )}
                </button>
                <button 
                  onClick={handleShare}
                  className="p-3 sm:p-4 rounded-xl sm:rounded-2xl backdrop-blur-xl bg-white/80 dark:bg-black/80 border-2 border-gray-200 dark:border-red-600/30 hover:bg-white dark:hover:bg-black dark:hover:border-red-600/50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Share2 size={16} className="sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
                </button>
                <button className="p-3 sm:p-4 rounded-xl sm:rounded-2xl backdrop-blur-xl bg-white/80 dark:bg-black/80 border-2 border-gray-200 dark:border-red-600/30 hover:bg-white dark:hover:bg-black dark:hover:border-red-600/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <Bookmark size={16} className="sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Ratings Section */}
        {movie.Ratings && movie.Ratings.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500">
                <Star size={18} className="sm:w-6 sm:h-6 text-white" />
              </div>
              Calificaciones
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {movie.Ratings.map((rating, index) => (
                <div 
                  key={index} 
                  className="backdrop-blur-xl bg-white/80 dark:bg-black/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200/50 dark:border-red-600/30 hover:bg-white dark:hover:bg-black dark:hover:border-red-600/50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                    {rating.Value}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                    {rating.Source}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detalles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {movie.Director && movie.Director !== 'N/A' && (
            <div className="backdrop-blur-xl bg-white/80 dark:bg-black/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200/50 dark:border-red-600/30 hover:bg-white dark:hover:bg-black dark:hover:border-red-600/50 transition-all duration-300 shadow-lg">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                  <Users size={16} className="sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">Director</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base pl-8 sm:pl-11">{movie.Director}</p>
            </div>
          )}

          {movie.Actors && movie.Actors !== 'N/A' && (
            <div className="backdrop-blur-xl bg-white/80 dark:bg-black/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200/50 dark:border-red-600/30 hover:bg-white dark:hover:bg-black dark:hover:border-red-600/50 transition-all duration-300 shadow-lg md:col-span-2">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-pink-500 to-red-600">
                  <Users size={16} className="sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">Reparto Principal</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base pl-8 sm:pl-11">{movie.Actors}</p>
            </div>
          )}

          {movie.Language && movie.Language !== 'N/A' && (
            <div className="backdrop-blur-xl bg-white/80 dark:bg-black/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200/50 dark:border-red-600/30 hover:bg-white dark:hover:bg-black dark:hover:border-red-600/50 transition-all duration-300 shadow-lg">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-green-500 to-teal-600">
                  <Globe size={16} className="sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">Idioma</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base pl-8 sm:pl-11">{movie.Language}</p>
            </div>
          )}

          {movie.Country && movie.Country !== 'N/A' && (
            <div className="backdrop-blur-xl bg-white/80 dark:bg-black/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200/50 dark:border-red-600/30 hover:bg-white dark:hover:bg-black dark:hover:border-red-600/50 transition-all duration-300 shadow-lg">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-orange-500 to-red-600">
                  <Globe size={16} className="sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">País</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base pl-8 sm:pl-11">{movie.Country}</p>
            </div>
          )}

          {movie.Awards && movie.Awards !== 'N/A' && (
            <div className="backdrop-blur-xl bg-white/80 dark:bg-black/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200/50 dark:border-red-600/30 hover:bg-white dark:hover:bg-black dark:hover:border-red-600/50 transition-all duration-300 shadow-lg md:col-span-2">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600">
                  <Award size={16} className="sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">Premios y Reconocimientos</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base pl-8 sm:pl-11">{movie.Awards}</p>
            </div>
          )}
        </div>
      </main>

      {/* Share Modal */}
      <ShareModal 
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        movie={movie}
      />
    </div>
  );
};

export default MovieDetailPage;