import React from 'react';

const Input = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  className = '',
  error = false,
  icon,
  ...props
}) => {
  const baseClasses = 'w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus-neon bg-white/80 dark:bg-dark-700/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400';
  
  const errorClasses = error 
    ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
    : 'border-gray-300 dark:border-dark-600 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20';

  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${baseClasses} ${errorClasses} ${className} ${icon ? 'pl-12' : ''}`}
        {...props}
      />
      {icon && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
    </div>
  );
};

export default Input;