// ============================================
// src/components/common/Sidebar.jsx
// ============================================
import React from 'react';
import { NavLink } from 'react-router-dom';
import { DashboardIcon, CategoryIcon, BookIcon, UserIcon, CalendarIcon } from './CustomIcons';

const Sidebar = () => {
  const navItems = [
    { to: '/dashboard', icon: DashboardIcon, label: 'Tableau de bord' },
    { to: '/categories', icon: CategoryIcon, label: 'Catégories' },
    { to: '/books', icon: BookIcon, label: 'Livres' },
    { to: '/members', icon: UserIcon, label: 'Membres' },
    { to: '/loans', icon: CalendarIcon, label: 'Prêts' },
  ];

  return (
    <aside className="w-72 bg-gradient-to-b from-white to-blue-50/30 dark:from-gray-800 dark:to-gray-900 shadow-xl h-[calc(100vh-5rem)] sticky top-20 border-r border-blue-100 dark:border-gray-700">
      <nav className="p-6 space-y-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all font-medium group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-2 rounded-xl transition-all ${
                  isActive ? 'bg-white/20' : 'bg-blue-100 dark:bg-gray-600 group-hover:bg-blue-200 dark:group-hover:bg-gray-500'
                }`}>
                  <item.icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                </div>
                <span className="font-semibold">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;