import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BookOpen } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-full mb-6">
          <BookOpen className="w-16 h-16 text-white" />
        </div>
        
        <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          404
        </h1>
        
        <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
          Page non trouvée
        </h2>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        
        <Link
          to="/dashboard"
          className="inline-flex items-center space-x-2 btn-primary"
        >
          <Home className="w-5 h-5" />
          <span>Retour au tableau de bord</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;