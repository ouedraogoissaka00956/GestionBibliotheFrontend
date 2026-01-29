// ============================================
// src/components/common/Navbar.jsx
// ============================================
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { LogoIcon, UserIcon } from './CustomIcons';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-lg border-b border-blue-100 dark:border-gray-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/dashboard" className="flex items-center space-x-3 group">
            <div className="p-2 rounded-2xl shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110">
              <LogoIcon className="w-10 h-10" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                BiblioTech
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Système moderne</p>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <Link 
              to="/profile"
              className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 px-5 py-3 rounded-2xl border border-blue-100 dark:border-gray-600 hover:shadow-lg transition-all group"
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white dark:border-gray-700 shadow-md group-hover:scale-110 transition-transform">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30">
                    <UserIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{user?.username}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium uppercase">{user?.role}</p>
              </div>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-5 py-3 rounded-2xl hover:bg-red-100 dark:hover:bg-red-900/50 transition-all font-medium border border-red-100 dark:border-red-800 hover:shadow-md"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
