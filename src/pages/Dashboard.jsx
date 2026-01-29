import React, { useState, useEffect } from 'react';
import { bookApi } from '../api/bookApi';
import { memberApi } from '../api/memberApi';
import { loanApi } from '../api/loanApi';
import { CategoryApi } from '../api/CategoryApi';
import { BookIcon, UserIcon, CalendarIcon, AlertIcon, TrendingIcon, CategoryIcon } from '../components/common/CustomIcons';
import Loading from '../components/common/Loading';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalMembers: 0,
    activeLoans: 0,
    overdueLoans: 0,
  });
  const [recentLoans, setRecentLoans] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [booksRes, membersRes, loansRes, categoriesRes] = await Promise.all([
        bookApi.getAll(),
        memberApi.getAll(),
        loanApi.getAll(),
        CategoryApi.getAll(),
      ]);

      const books = booksRes.data.data;
      const members = membersRes.data.data;
      const loans = loansRes.data.data;
      const categories = categoriesRes.data.data;

      const activeLoans = loans.filter((loan) => loan.status === 'active');
      const overdueLoans = loans.filter((loan) => loan.status === 'overdue');

      setStats({
        totalBooks: books.length,
        totalMembers: members.length,
        activeLoans: activeLoans.length,
        overdueLoans: overdueLoans.length,
      });

      setRecentLoans(loans.slice(0, 5));

      // Calculer l'activité récente basée sur les vraies données
      const activity = [];
      
      // Livres ajoutés récemment (derniers 7 jours)
      const recentBooks = books.filter(book => {
        const bookDate = new Date(book.createdAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return bookDate > weekAgo;
      });
      
      if (recentBooks.length > 0) {
        activity.push({
          type: 'books',
          message: `${recentBooks.length} nouveau${recentBooks.length > 1 ? 'x' : ''} livre${recentBooks.length > 1 ? 's' : ''} ajouté${recentBooks.length > 1 ? 's' : ''}`,
          time: 'Cette semaine',
          color: 'green'
        });
      }

      // Membres inscrits récemment (dernier mois)
      const recentMembers = members.filter(member => {
        const memberDate = new Date(member.createdAt);
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return memberDate > monthAgo;
      });
      
      if (recentMembers.length > 0) {
        activity.push({
          type: 'members',
          message: `${recentMembers.length} membre${recentMembers.length > 1 ? 's' : ''} inscrit${recentMembers.length > 1 ? 's' : ''}`,
          time: 'Ce mois-ci',
          color: 'blue'
        });
      }

      // Prêts effectués récemment
      const monthLoans = loans.filter(loan => {
        const loanDate = new Date(loan.createdAt);
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return loanDate > monthAgo;
      });
      
      if (monthLoans.length > 0) {
        activity.push({
          type: 'loans',
          message: `${monthLoans.length} prêt${monthLoans.length > 1 ? 's' : ''} effectué${monthLoans.length > 1 ? 's' : ''}`,
          time: 'Ce mois-ci',
          color: 'purple'
        });
      }

      setRecentActivity(activity.length > 0 ? activity : [
        { type: 'info', message: 'Aucune activité récente', time: 'Commencez par ajouter des livres', color: 'gray' }
      ]);

      // Calculer les statistiques de catégories
      if (categories.length > 0 && books.length > 0) {
        const categoryCount = {};
        books.forEach(book => {
          const catId = book.category?._id || book.category;
          if (catId) {
            categoryCount[catId] = (categoryCount[catId] || 0) + 1;
          }
        });

        const catStats = categories
          .map(cat => ({
            name: cat.name,
            count: categoryCount[cat._id] || 0,
            percentage: books.length > 0 ? Math.round((categoryCount[cat._id] || 0) / books.length * 100) : 0
          }))
          .filter(cat => cat.count > 0)
          .sort((a, b) => b.count - a.count)
          .slice(0, 3);

        setCategoryStats(catStats.length > 0 ? catStats : [
          { name: 'Aucune catégorie', count: 0, percentage: 0 }
        ]);
      } else {
        setCategoryStats([
          { name: 'Aucune donnée', count: 0, percentage: 0 }
        ]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement du tableau de bord:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Chargement du tableau de bord..." />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Tableau de bord</h1>
            <p className="text-blue-100 text-lg">Vue d'ensemble de votre bibliothèque personnelle</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl px-6 py-3 border border-white/30">
              <p className="text-sm text-blue-100">Aujourd'hui</p>
              <p className="text-xl font-bold">{new Date().toLocaleDateString('fr-FR')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card bg-gradient-to-br from-blue-500 to-blue-600 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-lg">
                <BookIcon className="w-8 h-8 text-white" />
              </div>
              <TrendingIcon className="w-6 h-6 text-blue-200" />
            </div>
            <p className="text-blue-100 text-sm font-semibold mb-1">Total Livres</p>
            <p className="text-5xl font-bold">{stats.totalBooks}</p>
            <p className="text-blue-200 text-xs mt-2">  Votre collection</p>
          </div>
        </div>

        <div className="stat-card bg-gradient-to-br from-cyan-500 to-cyan-600 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-lg">
                <UserIcon className="w-8 h-8 text-white" />
              </div>
              <TrendingIcon className="w-6 h-6 text-cyan-200" />
            </div>
            <p className="text-cyan-100 text-sm font-semibold mb-1">Membres Actifs</p>
            <p className="text-5xl font-bold">{stats.totalMembers}</p>
            <p className="text-cyan-200 text-xs mt-2">  Vos membres</p>
          </div>
        </div>

        <div className="stat-card bg-gradient-to-br from-green-500 to-green-600 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-lg">
                <CalendarIcon className="w-8 h-8 text-white" />
              </div>
              <TrendingIcon className="w-6 h-6 text-green-200" />
            </div>
            <p className="text-green-100 text-sm font-semibold mb-1">Prêts en cours</p>
            <p className="text-5xl font-bold">{stats.activeLoans}</p>
            <p className="text-green-200 text-xs mt-2">  En circulation</p>
          </div>
        </div>

        <div className="stat-card bg-gradient-to-br from-red-500 to-red-600 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-lg">
                <AlertIcon className="w-8 h-8 text-white" />
              </div>
              <AlertIcon className="w-6 h-6 text-red-200" />
            </div>
            <p className="text-red-100 text-sm font-semibold mb-1">Retards</p>
            <p className="text-5xl font-bold">{stats.overdueLoans}</p>
            <p className="text-red-200 text-xs mt-2"> Attention requise</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Prêts récents */}
        <div className="lg:col-span-2 card-gradient p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-xl">
                <CalendarIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              Prêts récents
            </h2>
            <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full">
              {recentLoans.length} prêt{recentLoans.length > 1 ? 's' : ''}
            </span>
          </div>
          {recentLoans.length === 0 ? (
            <div className="text-center py-12">
              <BookIcon className="w-16 h-16 text-gray-300 dark:text-slate-700 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 font-medium">Aucun prêt enregistré</p>
              <p className="text-gray-400 dark:text-gray-600 text-sm mt-1">Créez votre premier prêt dans l'onglet Prêts</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentLoans.map((loan) => (
                <div
                  key={loan._id}
                  className="flex items-center justify-between p-5 bg-white dark:bg-slate-800 rounded-2xl hover:shadow-lg dark:hover:shadow-slate-900/50 transition-all border border-blue-50 dark:border-slate-700 group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-xl shadow-md group-hover:scale-110 transition-transform bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30">
                      <BookIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-gray-100 text-lg">
                        {loan.book?.title || 'Livre inconnu'}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <UserIcon className="w-4 h-4 text-gray-500 dark:text-gray-500" />
                        {loan.member?.name || 'Membre inconnu'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Retour prévu</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {new Date(loan.returnDate).toLocaleDateString('fr-FR')}
                    </p>
                    <span
                      className={`text-xs px-3 py-1.5 rounded-full font-semibold ${
                        loan.status === 'active'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                          : loan.status === 'overdue'
                          ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                      }`}
                    >
                      {loan.status === 'active'
                        ? '✓ En cours'
                        : loan.status === 'overdue'
                        ? '⚠ En retard'
                        : '✓ Retourné'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Activité & Stats */}
        <div className="space-y-6">
          <div className="card-gradient p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <TrendingIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              Activité récente
            </h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 bg-${activity.color}-500 dark:bg-${activity.color}-400 rounded-full mt-2 shadow-lg`}></div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-bold text-gray-900 dark:text-gray-100">{activity.message}</span>
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-gradient p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-5 flex items-center gap-2">
              <CategoryIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              Catégories populaires
            </h3>
            <div className="space-y-4">
              {categoryStats.map((cat, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{cat.name}</span>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{cat.percentage}%</span>
                  </div>
                  <div className="w-full h-3 bg-blue-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-md transition-all duration-500" 
                      style={{ width: `${cat.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{cat.count} livre{cat.count > 1 ? 's' : ''}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;