import React from 'react';

const IconButton = ({ 
  icon, 
  onClick, 
  variant = 'primary',
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseClasses = 'rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2';
  
  const variants = {
    primary: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500',
    ghost: 'hover:bg-gray-100 text-gray-600 focus:ring-gray-500',
  };
  
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={classes} onClick={onClick} {...props}>
      {icon}
    </button>
  );
};

export default IconButton;