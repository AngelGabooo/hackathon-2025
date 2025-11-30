import React from 'react';
import { Search } from 'lucide-react';

const Input = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  className = '',
  error = false,
  icon,
  size = 'md',
  ...props
}) => {
  const baseClasses = 'w-full rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 bg-white dark:bg-black text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm';
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };
  
  const errorClasses = error 
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
    : 'border-red-600/30 focus:border-red-600 focus:ring-red-600/20';

  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${baseClasses} ${errorClasses} ${sizes[size]} ${className} ${icon ? 'pl-12' : ''}`}
        {...props}
      />
      {icon && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
          {icon}
        </div>
      )}
    </div>
  );
};

export default Input;