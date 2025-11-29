import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from '../molecules/SearchBar';
import Button from '../atoms/Button';

const Header = ({ 
  onSearch, 
  onThemeToggle, 
  isDarkMode = false
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleFavoritesClick = () => {
    navigate('/favorites');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleTrendingClick = () => {
    navigate('/search?q=trending');
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 glass-dark border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={handleLogoClick}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-primary-500 to-neon-purple flex items-center justify-center text-white font-bold text-lg shadow-lg">
                🎬
              </div>
              <h1 className="text-2xl font-bold gradient-text font-display">
                CineVerse
              </h1>
            </div>
            
            <nav className="hidden lg:flex gap-1">
              <button 
                onClick={handleHomeClick}
                className={`px-4 py-2 rounded-xl transition-all duration-300 font-medium flex items-center gap-2 ${
                  isActive('/') 
                    ? 'text-white bg-white/20' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                🏠 Inicio
              </button>
              <button 
                onClick={handleFavoritesClick}
                className={`px-4 py-2 rounded-xl transition-all duration-300 font-medium flex items-center gap-2 ${
                  isActive('/favorites') 
                    ? 'text-white bg-white/20' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                ❤️ Favoritos
              </button>
              <button 
                onClick={handleTrendingClick}
                className="px-4 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium flex items-center gap-2"
              >
                🔥 Trending
              </button>
            </nav>
          </div>

          {/* Search Bar - Centered */}
          <div className="hidden xl:block flex-1 max-w-2xl mx-8">
            <SearchBar onSearch={onSearch} />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button 
              onClick={onThemeToggle}
              className="p-3 rounded-xl glass hover:bg-white/20 transition-all duration-300 text-white"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            
            {/* Favorites Button Mobile */}
            <Button 
              variant="ghost"
              onClick={handleFavoritesClick}
              className="hidden md:flex items-center gap-2 border-white/20"
              icon="❤️"
            >
              Favoritos
            </Button>
            
            {/* User Avatar */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-primary-500 to-neon-blue flex items-center justify-center text-white font-bold cursor-pointer hover:scale-105 transition-transform">
              👤
            </div>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="xl:hidden mt-4">
          <SearchBar onSearch={onSearch} />
        </div>

        {/* Mobile Navigation */}
        <nav className="lg:hidden flex gap-1 mt-4 overflow-x-auto pb-2">
          <button 
            onClick={handleHomeClick}
            className={`px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-300 ${
              isActive('/') 
                ? 'text-white bg-white/20' 
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            🏠 Inicio
          </button>
          <button 
            onClick={handleFavoritesClick}
            className={`px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-300 ${
              isActive('/favorites') 
                ? 'text-white bg-white/20' 
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            ❤️ Favoritos
          </button>
          <button 
            onClick={handleTrendingClick}
            className="px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 text-sm whitespace-nowrap"
          >
            🔥 Trending
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;