import React from 'react';
import { MoonIcon, SunIcon } from './CustomIcons';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-16 h-8 bg-gradient-to-r from-blue-200 to-cyan-200 dark:from-slate-700 dark:to-slate-600 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md hover:shadow-lg"
      aria-label="Toggle dark mode"
    >
      <div
        className={`absolute top-1 left-1 w-6 h-6 bg-white dark:bg-slate-900 rounded-full shadow-md transform transition-all duration-300 flex items-center justify-center ${
          isDark ? 'translate-x-8' : 'translate-x-0'
        }`}
      >
        {isDark ? (
          <MoonIcon className="w-4 h-4" />
        ) : (
          <SunIcon className="w-4 h-4" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;