// ============================================
// src/components/common/Loading.jsx
// ============================================
import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = ({ message = 'Chargement...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-950 dark:to-slate-900">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-blue-200 dark:border-slate-700 rounded-full"></div>
        <div className="w-20 h-20 border-4 border-blue-600 dark:border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0"></div>
      </div>
      <p className="mt-6 text-blue-700 dark:text-blue-400 font-medium text-lg">{message}</p>
    </div>
  );
};

export default Loading;