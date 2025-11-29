import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const SearchBar = ({ onSearch, placeholder = "Buscar películas, series..." }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-4xl mx-auto">
      <div className="flex gap-3 items-stretch">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-12 text-lg h-16 rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-lg text-white placeholder-white/60"
            icon="🔍"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            >
              ✕
            </button>
          )}
        </div>
        <Button 
          type="submit" 
          variant="neon" 
          size="lg"
          className="h-16 px-8 rounded-2xl whitespace-nowrap font-bold text-lg"
          icon="🚀"
        >
          Explorar
        </Button>
      </div>
      
      {/* Search suggestions */}
      <div className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-4 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
        <div className="text-white/60 text-sm">Sugerencias: Avengers, Stranger Things, The Batman...</div>
      </div>
    </form>
  );
};

export default SearchBar;