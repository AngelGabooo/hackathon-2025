import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false,
  type = 'button',
  className = '',
  icon,
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-300 focus:outline-none focus-neon transform hover:scale-105 active:scale-95';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-neon-purple hover:from-primary-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 hover:border-gray-500 shadow-lg',
    ghost: 'bg-transparent hover:bg-white/10 text-gray-700 dark:text-gray-300 border border-transparent hover:border-white/20',
    neon: 'bg-transparent border border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white shadow-lg hover:neon-glow',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {icon && <span className="text-lg">{icon}</span>}
        {children}
      </div>
    </button>
  );
};

export default Button;