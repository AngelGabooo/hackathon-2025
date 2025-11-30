import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../atoms/Button';
import IconButton from '../atoms/IconButton';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  className = '' 
}) => {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <IconButton
        icon={<ChevronLeft size={16} />}
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="border-red-600/30 hover:border-red-600/50 hover:bg-red-600/20"
      />
      
      {startPage > 1 && (
        <>
          <Button
            variant={1 === currentPage ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onPageChange(1)}
            className={1 === currentPage ? '' : 'border-red-600/30 hover:border-red-600/50 hover:bg-red-600/20'}
          >
            1
          </Button>
          {startPage > 2 && <span className="px-2 text-gray-500">...</span>}
        </>
      )}
      
      {pages.map(page => (
        <Button
          key={page}
          variant={page === currentPage ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onPageChange(page)}
          className={page === currentPage ? '' : 'border-red-600/30 hover:border-red-600/50 hover:bg-red-600/20'}
        >
          {page}
        </Button>
      ))}
      
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2 text-gray-500">...</span>}
          <Button
            variant={totalPages === currentPage ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onPageChange(totalPages)}
            className={totalPages === currentPage ? '' : 'border-red-600/30 hover:border-red-600/50 hover:bg-red-600/20'}
          >
            {totalPages}
          </Button>
        </>
      )}
      
      <IconButton
        icon={<ChevronRight size={16} />}
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="border-red-600/30 hover:border-red-600/50 hover:bg-red-600/20"
      />
    </div>
  );
};

export default Pagination;