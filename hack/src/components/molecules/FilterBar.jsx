import React from 'react';
import { Filter, Trash2, Film, Tv, Calendar } from 'lucide-react';
import Button from '../atoms/Button';

const FilterBar = ({ 
  filters, 
  onFilterChange,
  onClearFilters 
}) => {
  const { type, year } = filters;

  const hasActiveFilters = type || year;

  return (
    <div className="bg-white dark:bg-black p-6 rounded-xl shadow-lg border border-red-600/30 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <Filter size={20} className="text-red-600" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filtros de Búsqueda</h3>
      </div>
      
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <Film size={16} />
            Tipo de Contenido
          </label>
          <select
            value={type}
            onChange={(e) => onFilterChange('type', e.target.value)}
            className="w-full px-4 py-3 border border-red-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-black text-gray-900 dark:text-white transition-all duration-200 hover:border-red-600/50"
          >
            <option value="">Todos los tipos</option>
            <option value="movie">Película</option>
            <option value="series">Serie</option>
            <option value="episode">Episodio</option>
          </select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <Calendar size={16} />
            Año
          </label>
          <input
            type="number"
            placeholder="Ej: 2020"
            value={year}
            onChange={(e) => onFilterChange('year', e.target.value)}
            min="1900"
            max="2024"
            className="w-full px-4 py-3 border border-red-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-black text-gray-900 dark:text-white transition-all duration-200 hover:border-red-600/50 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        <div className="flex gap-2">
          {hasActiveFilters && (
            <Button 
              variant="outline" 
              onClick={onClearFilters}
              className="whitespace-nowrap border-red-600 text-red-600 hover:bg-red-600 hover:text-white flex items-center gap-2"
              icon={<Trash2 size={16} />}
            >
              Limpiar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;