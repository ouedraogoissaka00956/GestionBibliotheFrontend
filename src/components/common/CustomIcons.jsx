import React from 'react';

// Icône Livre
export const BookIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 8h32c2.21 0 4 1.79 4 4v40c0 2.21-1.79 4-4 4H12c-2.21 0-4-1.79-4-4V12c0-2.21 1.79-4 4-4z" fill="url(#book-gradient)" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 16h24v4H16zM16 24h24v2H16zM16 30h16v2H16z" fill="currentColor" opacity="0.3"/>
    <defs>
      <linearGradient id="book-gradient" x1="8" y1="8" x2="48" y2="56">
        <stop offset="0%" stopColor="#3b82f6"/>
        <stop offset="100%" stopColor="#06b6d4"/>
      </linearGradient>
    </defs>
  </svg>
);

// Icône Utilisateur/Membre
export const UserIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="20" r="12" fill="url(#user-gradient)"/>
    <path d="M48 52c0-8.837-7.163-16-16-16s-16 7.163-16 16" stroke="url(#user-gradient2)" strokeWidth="4" strokeLinecap="round"/>
    <defs>
      <linearGradient id="user-gradient" x1="20" y1="8" x2="44" y2="32">
        <stop offset="0%" stopColor="#8b5cf6"/>
        <stop offset="100%" stopColor="#06b6d4"/>
      </linearGradient>
      <linearGradient id="user-gradient2" x1="16" y1="36" x2="48" y2="52">
        <stop offset="0%" stopColor="#8b5cf6"/>
        <stop offset="100%" stopColor="#06b6d4"/>
      </linearGradient>
    </defs>
  </svg>
);

// Icône Calendrier/Prêt
export const CalendarIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="12" width="48" height="44" rx="4" fill="url(#calendar-gradient)" stroke="currentColor" strokeWidth="2"/>
    <rect x="8" y="12" width="48" height="12" fill="currentColor" opacity="0.3"/>
    <circle cx="20" cy="8" r="2" fill="currentColor"/>
    <circle cx="44" cy="8" r="2" fill="currentColor"/>
    <line x1="20" y1="8" x2="20" y2="16" stroke="currentColor" strokeWidth="2"/>
    <line x1="44" y1="8" x2="44" y2="16" stroke="currentColor" strokeWidth="2"/>
    <circle cx="20" cy="32" r="3" fill="currentColor" opacity="0.5"/>
    <circle cx="32" cy="32" r="3" fill="currentColor" opacity="0.5"/>
    <circle cx="44" cy="32" r="3" fill="currentColor" opacity="0.5"/>
    <circle cx="20" cy="44" r="3" fill="currentColor" opacity="0.5"/>
    <circle cx="32" cy="44" r="3" fill="currentColor" opacity="0.5"/>
    <defs>
      <linearGradient id="calendar-gradient" x1="8" y1="12" x2="56" y2="56">
        <stop offset="0%" stopColor="#10b981"/>
        <stop offset="100%" stopColor="#06b6d4"/>
      </linearGradient>
    </defs>
  </svg>
);

// Icône Dashboard/Statistiques
export const DashboardIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="20" height="20" rx="3" fill="url(#dash-gradient1)"/>
    <rect x="36" y="8" width="20" height="20" rx="3" fill="url(#dash-gradient2)"/>
    <rect x="8" y="36" width="20" height="20" rx="3" fill="url(#dash-gradient3)"/>
    <rect x="36" y="36" width="20" height="20" rx="3" fill="url(#dash-gradient4)"/>
    <defs>
      <linearGradient id="dash-gradient1" x1="8" y1="8" x2="28" y2="28">
        <stop offset="0%" stopColor="#3b82f6"/>
        <stop offset="100%" stopColor="#06b6d4"/>
      </linearGradient>
      <linearGradient id="dash-gradient2" x1="36" y1="8" x2="56" y2="28">
        <stop offset="0%" stopColor="#8b5cf6"/>
        <stop offset="100%" stopColor="#ec4899"/>
      </linearGradient>
      <linearGradient id="dash-gradient3" x1="8" y1="36" x2="28" y2="56">
        <stop offset="0%" stopColor="#10b981"/>
        <stop offset="100%" stopColor="#06b6d4"/>
      </linearGradient>
      <linearGradient id="dash-gradient4" x1="36" y1="36" x2="56" y2="56">
        <stop offset="0%" stopColor="#f59e0b"/>
        <stop offset="100%" stopColor="#ef4444"/>
      </linearGradient>
    </defs>
  </svg>
);

// Icône Catégories/Dossier
export const CategoryIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 16c0-2.21 1.79-4 4-4h12l4 4h24c2.21 0 4 1.79 4 4v28c0 2.21-1.79 4-4 4H12c-2.21 0-4-1.79-4-4V16z" fill="url(#folder-gradient)" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 24h48v4H8z" fill="currentColor" opacity="0.2"/>
    <defs>
      <linearGradient id="folder-gradient" x1="8" y1="12" x2="56" y2="52">
        <stop offset="0%" stopColor="#f59e0b"/>
        <stop offset="100%" stopColor="#ef4444"/>
      </linearGradient>
    </defs>
  </svg>
);

// Icône Logo BiblioTech
export const LogoIcon = ({ className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="4" width="48" height="56" rx="4" fill="url(#logo-gradient)"/>
    <rect x="16" y="12" width="32" height="4" rx="1" fill="white" opacity="0.8"/>
    <rect x="16" y="20" width="32" height="2" rx="1" fill="white" opacity="0.6"/>
    <rect x="16" y="26" width="24" height="2" rx="1" fill="white" opacity="0.6"/>
    <rect x="16" y="32" width="28" height="2" rx="1" fill="white" opacity="0.6"/>
    <circle cx="32" cy="44" r="8" fill="white" opacity="0.2"/>
    <path d="M32 40v8M28 44h8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <defs>
      <linearGradient id="logo-gradient" x1="8" y1="4" x2="56" y2="60">
        <stop offset="0%" stopColor="#3b82f6"/>
        <stop offset="50%" stopColor="#8b5cf6"/>
        <stop offset="100%" stopColor="#06b6d4"/>
      </linearGradient>
    </defs>
  </svg>
);

// Icône Statistique/Trending
export const TrendingIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 48L20 36L28 44L40 28L56 16" stroke="url(#trending-gradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M48 16h8v8" stroke="url(#trending-gradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="20" cy="36" r="3" fill="url(#trending-gradient)"/>
    <circle cx="28" cy="44" r="3" fill="url(#trending-gradient)"/>
    <circle cx="40" cy="28" r="3" fill="url(#trending-gradient)"/>
    <defs>
      <linearGradient id="trending-gradient" x1="8" y1="48" x2="56" y2="16">
        <stop offset="0%" stopColor="#10b981"/>
        <stop offset="100%" stopColor="#06b6d4"/>
      </linearGradient>
    </defs>
  </svg>
);

// Icône Alerte
export const AlertIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="28" fill="url(#alert-gradient)"/>
    <path d="M32 16v20M32 44h.01" stroke="white" strokeWidth="4" strokeLinecap="round"/>
    <defs>
      <linearGradient id="alert-gradient" x1="4" y1="4" x2="60" y2="60">
        <stop offset="0%" stopColor="#ef4444"/>
        <stop offset="100%" stopColor="#dc2626"/>
      </linearGradient>
    </defs>
  </svg>
);

// Icône Moon (Mode sombre)
export const MoonIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="url(#moon-gradient)"/>
    <defs>
      <linearGradient id="moon-gradient" x1="3" y1="3" x2="21" y2="21">
        <stop offset="0%" stopColor="#3b82f6"/>
        <stop offset="100%" stopColor="#06b6d4"/>
      </linearGradient>
    </defs>
  </svg>
);

// Icône Sun (Mode clair)
export const SunIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="5" fill="url(#sun-gradient)"/>
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="url(#sun-gradient2)" strokeWidth="2" strokeLinecap="round"/>
    <defs>
      <linearGradient id="sun-gradient" x1="7" y1="7" x2="17" y2="17">
        <stop offset="0%" stopColor="#fbbf24"/>
        <stop offset="100%" stopColor="#f59e0b"/>
      </linearGradient>
      <linearGradient id="sun-gradient2" x1="1" y1="1" x2="23" y2="23">
        <stop offset="0%" stopColor="#fbbf24"/>
        <stop offset="100%" stopColor="#f59e0b"/>
      </linearGradient>
    </defs>
  </svg>
);