import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Rocket, TrendingUp } from 'lucide-react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const SearchBar = ({ onSearch, placeholder = "Buscar películas, series..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setShowSuggestions(false);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (!searchTerm) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    setTimeout(() => setShowSuggestions(false), 200);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const popularSearches = ['Avengers', 'Stranger Things', 'The Batman', 'Breaking Bad', 'Game of Thrones'];

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-4xl mx-auto" ref={searchRef}>
      <div className="flex gap-3 items-stretch">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="pr-12 text-lg h-16 rounded-2xl border-2 border-red-600/30 bg-white dark:bg-black text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-red-600 transition-all duration-300"
            icon={<Search size={20} className="text-gray-500 dark:text-gray-400" />}
            size="lg"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-red-600 transition-colors z-10"
            >
              <X size={20} />
            </button>
          )}
        </div>
        <Button 
          type="submit" 
          variant="primary" 
          size="lg"
          className="h-16 px-8 rounded-2xl whitespace-nowrap font-bold text-lg min-w-[140px] transition-all duration-300"
          icon={<Rocket size={20} />}
          disabled={!searchTerm.trim()}
        >
          Buscar
        </Button>
      </div>
      
      {/* Search suggestions - Solo visible cuando está enfocado y no hay texto */}
      {showSuggestions && !searchTerm && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-black backdrop-blur-lg rounded-2xl border border-red-600/30 p-4 shadow-xl z-50 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={18} className="text-red-600" />
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
              Búsquedas populares:
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((search, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSuggestionClick(search)}
                className="px-3 py-2 bg-red-600/10 hover:bg-red-600/20 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 rounded-lg text-sm transition-all duration-200 border border-red-600/30 hover:border-red-600/50 hover:scale-105"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sugerencias mientras se escribe */}
      {showSuggestions && searchTerm && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-black backdrop-blur-lg rounded-2xl border border-red-600/30 p-4 shadow-xl z-50 animate-in fade-in duration-200">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
            Presiona <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-900 rounded text-xs border border-gray-300 dark:border-gray-800">Enter</kbd> para buscar
          </p>
        </div>
      )}
    </form>
  );
};

export default SearchBar;