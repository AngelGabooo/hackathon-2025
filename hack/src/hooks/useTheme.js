import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return {
    isDarkMode,
    toggleTheme
  };
};