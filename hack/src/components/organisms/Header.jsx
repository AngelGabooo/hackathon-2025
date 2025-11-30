import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Film, 
  Heart, 
  Home, 
  Flame, 
  Sun, 
  Moon, 
  Search,
  User,
  X,
  Menu,
  Clock,
  BarChart3
} from 'lucide-react';

const Header = ({ 
  onSearch, 
  onThemeToggle, 
  isDarkMode = false
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogoClick = () => {
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const handleFavoritesClick = () => {
    navigate('/favorites');
    setIsMobileMenuOpen(false);
  };

  const handleHomeClick = () => {
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const handleTrendingClick = () => {
    navigate('/search?q=trending');
    setIsMobileMenuOpen(false);
  };

  const handleWatchlistClick = () => {
    navigate('/watchlist');
    setIsMobileMenuOpen(false);
  };

  const handleComparisonClick = () => {
    navigate('/comparison');
    setIsMobileMenuOpen(false);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery('');
    }
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery);
      setIsSearchOpen(false);
      setSearchQuery('');
    } else if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e);
    } else if (e.key === 'Escape') {
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleQuickSearch = (query) => {
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    } else {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
    setIsSearchOpen(false);
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Menú de navegación
  const navItems = [
    { path: '/', label: 'Inicio', icon: Home },
    { path: '/favorites', label: 'Favoritos', icon: Heart },
    { path: '/watchlist', label: 'Watchlist', icon: Clock },
    { path: '/comparison', label: 'Comparar', icon: BarChart3 },
    { path: '/search?q=trending', label: 'Trending', icon: Flame },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo y Menú Hamburguesa */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Botón Menú Hamburguesa - Solo Mobile */}
              <button 
                onClick={handleMobileMenuToggle}
                className="lg:hidden w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 flex items-center justify-center text-gray-400 hover:text-white"
              >
                <Menu size={20} />
              </button>

              {/* Logo */}
              <div 
                className="flex items-center gap-2.5 lg:gap-3 cursor-pointer group"
                onClick={handleLogoClick}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-red-600 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative w-9 h-9 lg:w-11 lg:h-11 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white shadow-lg">
                    <Film size={20} className="lg:w-6 lg:h-6" />
                  </div>
                </div>
                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-white via-white to-red-200 bg-clip-text text-transparent tracking-tight">
                  CineVerse
                </h1>
              </div>
            </div>

            {/* Navegación Desktop */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button 
                  key={item.path}
                  onClick={() => {
                    if (item.path === '/') handleHomeClick();
                    else if (item.path === '/favorites') handleFavoritesClick();
                    else if (item.path === '/watchlist') handleWatchlistClick();
                    else if (item.path === '/comparison') handleComparisonClick();
                    else if (item.path === '/search?q=trending') handleTrendingClick();
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive(item.path) 
                      ? 'text-white bg-white/10' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Acciones Derecha */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Botón de Búsqueda */}
              <button 
                onClick={handleSearchToggle}
                className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 flex items-center justify-center text-gray-400 hover:text-white"
              >
                <Search size={18} className="lg:w-5 lg:h-5" />
              </button>

              {/* Toggle Tema */}
              <button 
                onClick={onThemeToggle}
                className="hidden sm:flex w-9 h-9 lg:w-10 lg:h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 items-center justify-center text-gray-400 hover:text-white"
              >
                {isDarkMode ? <Sun size={18} className="lg:w-5 lg:h-5" /> : <Moon size={18} className="lg:w-5 lg:h-5" />}
              </button>

              {/* Avatar Usuario */}
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-red-600 rounded-lg blur-md opacity-0 group-hover:opacity-50 transition-opacity" />
                <div className="relative w-9 h-9 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white shadow-lg">
                  <User size={18} className="lg:w-5 lg:h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Menú Mobile Overlay */}
      <div className={`fixed inset-0 z-40 transition-all duration-300 lg:hidden ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Contenido del Menú Mobile */}
        <div className="relative h-full flex flex-col">
          {/* Header del Menú Mobile */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white">
                <Film size={20} />
              </div>
              <h2 className="text-xl font-bold text-white">Menú</h2>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 flex items-center justify-center text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navegación Mobile */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button 
                  key={item.path}
                  onClick={() => {
                    if (item.path === '/') handleHomeClick();
                    else if (item.path === '/favorites') handleFavoritesClick();
                    else if (item.path === '/watchlist') handleWatchlistClick();
                    else if (item.path === '/comparison') handleComparisonClick();
                    else if (item.path === '/search?q=trending') handleTrendingClick();
                  }}
                  className={`w-full px-4 py-3 rounded-xl text-left transition-all duration-200 flex items-center gap-3 ${
                    isActive(item.path) 
                      ? 'text-white bg-red-600/20 border border-red-500/50' 
                      : 'text-gray-400 hover:text-white hover:bg-white/10 border border-transparent'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Tema Mobile */}
            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <button 
                onClick={onThemeToggle}
                className="w-full flex items-center justify-between text-gray-400 hover:text-white transition-colors"
              >
                <span className="font-medium">Modo {isDarkMode ? 'Claro' : 'Oscuro'}</span>
                <div className="w-10 h-6 bg-white/10 rounded-full flex items-center justify-center">
                  {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                </div>
              </button>
            </div>
          </nav>

          {/* Footer del Menú Mobile */}
          <div className="p-4 border-t border-white/10">
            <div className="text-center text-gray-500 text-sm">
              CineVerse © 2024
            </div>
          </div>
        </div>
      </div>

      {/* Barra de Búsqueda Expandible */}
      <div className={`fixed inset-0 z-50 transition-all duration-300 ${
        isSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          onClick={handleSearchToggle}
        />
        
        {/* Contenido de Búsqueda */}
        <div className="relative h-full flex items-start justify-center pt-20 lg:pt-32 px-4">
          <div className="w-full max-w-3xl">
            <div className="relative">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-800/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl overflow-hidden group-focus-within:border-red-500/50 transition-colors">
                  <Search className="ml-6 text-gray-400 flex-shrink-0" size={24} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Buscar películas, series, actores..."
                    className="w-full px-6 py-5 lg:py-6 bg-transparent text-white text-lg lg:text-xl placeholder-gray-500 focus:outline-none"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleSearchToggle}
                    className="mr-4 p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
              
              {/* Texto de ayuda */}
              <p className="mt-6 text-center text-gray-500 text-sm">
                Presiona <kbd className="px-2 py-1 bg-white/10 rounded text-xs">Enter</kbd> para buscar o <kbd className="px-2 py-1 bg-white/10 rounded text-xs">Esc</kbd> para cerrar
              </p>

              {/* Sugerencias rápidas */}
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['acción', 'comedia', 'terror', 'sci-fi', 'aventura', 'drama'].map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => handleQuickSearch(genre)}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-sm text-gray-400 hover:text-white transition-all"
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer para compensar el header fixed */}
      <div className="h-16 lg:h-20" />
    </>
  );
};

export default Header;