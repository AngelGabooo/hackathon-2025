import React from 'react';

const IconButton = ({ 
  icon, 
  onClick, 
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'rounded-xl flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 hover:scale-105 active:scale-95';
  
  const variants = {
    primary: 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/25',
    secondary: 'bg-black hover:bg-gray-900 text-white border border-gray-800 hover:border-gray-700 shadow-lg',
    outline: 'bg-transparent border border-red-600/30 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600',
    ghost: 'bg-transparent hover:bg-red-600/10 text-gray-400 hover:text-white border border-transparent hover:border-red-600/20',
  };
  
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  return (
    <button className={classes} onClick={onClick} disabled={disabled} {...props}>
      {icon}
    </button>
  );
};

export default IconButton;