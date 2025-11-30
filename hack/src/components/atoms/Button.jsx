import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false,
  type = 'button',
  className = '',
  icon,
  loading = false,
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-300 focus:outline-none transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white shadow-lg hover:shadow-xl shadow-red-600/25 hover:shadow-red-600/40',
    secondary: 'bg-gray-800 dark:bg-black hover:bg-gray-700 dark:hover:bg-gray-900 text-white border border-gray-600 dark:border-gray-800 hover:border-gray-500 dark:hover:border-gray-700 shadow-lg',
    outline: 'bg-transparent border border-red-600/30 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 shadow-lg hover:shadow-red-600/20',
    ghost: 'bg-transparent hover:bg-red-600/10 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-white border border-transparent hover:border-red-600/20',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 size={20} className="animate-spin" />
      ) : (
        <>
          {icon && <span className="flex items-center">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;