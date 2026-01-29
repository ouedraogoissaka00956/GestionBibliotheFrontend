import React, { useState, useEffect } from 'react';
import { Plus, Check, Trash2, Clock, Calendar as CalendarIcon, BookOpen, User, AlertTriangle } from 'lucide-react';
import { loanApi } from '../api/loanApi';
import { bookApi } from '../api/bookApi';
import { memberApi } from '../api/memberApi';
import Modal from '../components/common/Modal';
import Loading from '../components/common/Loading';

const Loans = () => {
  const [loans, setLoans] = useState([]);
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({
    book: '',
    member: '',
    returnDate: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [loansRes, booksRes, membersRes] = await Promise.all([
        loanApi.getAll(),
        bookApi.getAll({ available: 'true' }),
        memberApi.getAll({ status: 'active' }),
      ]);

      setLoans(loansRes.data.data);
      setBooks(booksRes.data.data);
      setMembers(membersRes.data.data);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    setFormData({
      book: '',
      member: '',
      returnDate: '',
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loanApi.create(formData);
      fetchData();
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la création du prêt:', error);
      alert(error.response?.data?.message || 'Erreur lors de la création du prêt');
    }
  };

  const handleReturn = async (id) => {
    if (window.confirm('Confirmer le retour de ce livre ?')) {
      try {
        await loanApi.returnBook(id);
        fetchData();
      } catch (error) {
        console.error('Erreur lors du retour:', error);
        alert(error.response?.data?.message || 'Erreur lors du retour');
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce prêt ?')) {
      try {
        await loanApi.delete(id);
        fetchData();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert(error.response?.data?.message || 'Erreur lors de la suppression');
      }
    }
  };

  const getMinReturnDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toISOString().split('T')[0];
  };

  const filteredLoans = filterStatus === 'all' 
    ? loans 
    : loans.filter(loan => loan.status === filterStatus);

  if (loading) {
    return <Loading message="Chargement des prêts..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <CalendarIcon className="w-10 h-10" />
              Gestion des prêts
            </h1>
            <p className="text-green-100 text-lg">Suivez tous les prêts de livres</p>
          </div>
          <button onClick={openModal} className="bg-white text-green-600 px-6 py-4 rounded-2xl hover:shadow-2xl transition-all font-bold flex items-center space-x-2 hover:scale-105">
            <Plus className="w-6 h-6" />
            <span>Nouveau prêt</span>
          </button>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-3">
        <button 
          onClick={() => setFilterStatus('all')}
          className={`px-6 py-3 rounded-2xl font-bold transition-all ${
            filterStatus === 'all' 
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg' 
              : 'bg-white text-gray-700 hover:bg-blue-50 border-2 border-blue-100'
          }`}
        >
            Tous ({loans.length})
        </button>
        <button 
          onClick={() => setFilterStatus('active')}
          className={`px-6 py-3 rounded-2xl font-bold transition-all ${
            filterStatus === 'active' 
              ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg' 
              : 'bg-white text-gray-700 hover:bg-green-50 border-2 border-green-100'
          }`}
        >
           En cours ({loans.filter((l) => l.status === 'active').length})
        </button>
        <button 
          onClick={() => setFilterStatus('overdue')}
          className={`px-6 py-3 rounded-2xl font-bold transition-all ${
            filterStatus === 'overdue' 
              ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg' 
              : 'bg-white text-gray-700 hover:bg-red-50 border-2 border-red-100'
          }`}
        >
          En retard ({loans.filter((l) => l.status === 'overdue').length})
        </button>
        <button 
          onClick={() => setFilterStatus('returned')}
          className={`px-6 py-3 rounded-2xl font-bold transition-all ${
            filterStatus === 'returned' 
              ? 'bg-gradient-to-r from-gray-600 to-gray-500 text-white shadow-lg' 
              : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
          }`}
        >
           Retournés ({loans.filter((l) => l.status === 'returned').length})
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-50 to-green-50 border-b-2 border-blue-100">
              <tr>
                <th className="px-6 py-5 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">
                  Livre
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">
                  Membre
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">
                  Date de prêt
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">
                  Date de retour
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">
                  Amende
                </th>
                <th className="px-6 py-5 text-right text-xs font-bold text-blue-900 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLoans.map((loan) => (
                <tr key={loan._id} className="hover:bg-blue-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-2xl shadow-md group-hover:scale-110 transition-transform">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-base">
                          {loan.book?.title || 'Livre inconnu'}
                        </p>
                        <p className="text-sm text-gray-500">{loan.book?.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-2">
                      <div className="bg-gradient-to-br from-green-500 to-blue-500 p-2 rounded-xl">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">
                          {loan.member?.name || 'Membre inconnu'}
                        </p>
                        <p className="text-xs text-gray-500">{loan.member?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="bg-blue-50 px-3 py-2 rounded-xl inline-block">
                      <p className="text-sm font-bold text-blue-700">
                        {new Date(loan.loanDate).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-bold text-gray-700">
                        {new Date(loan.returnDate).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-4 py-2 rounded-full text-xs font-bold shadow-sm ${
                        loan.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : loan.status === 'overdue'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {loan.status === 'active'
                        ? ' En cours'
                        : loan.status === 'overdue'
                        ? ' En retard'
                        : ' Retourné'}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    {loan.fine > 0 ? (
                      <div className="flex items-center space-x-1 text-red-600">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="font-bold">{loan.fine} FCFA</span>
                      </div>
                    ) : (
                      <span className="text-gray-400 font-medium">-</span>
                    )}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {loan.status !== 'returned' && (
                        <button
                          onClick={() => handleReturn(loan._id)}
                          className="text-green-600 hover:bg-green-50 p-2 rounded-xl transition-all"
                          title="Marquer comme retourné"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(loan._id)}
                        className="text-red-600 hover:bg-red-50 p-2 rounded-xl transition-all"
                        title="Supprimer"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLoans.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-gradient-to-br from-blue-100 to-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-12 h-12 text-blue-600" />
            </div>
            <p className="text-gray-500 text-lg font-medium">Aucun prêt trouvé</p>
            <p className="text-gray-400 text-sm mt-2">Créez votre premier prêt</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={closeModal} title="  Créer un nouveau prêt">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Sélectionner un livre *
            </label>
            <div className="relative">
              <BookOpen className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
              <select
                required
                value={formData.book}
                onChange={(e) => setFormData({ ...formData, book: e.target.value })}
                className="input-field pl-12"
              >
                <option value="">Choisir un livre disponible</option>
                {books
                  .filter((book) => book.available > 0)
                  .map((book) => (
                    <option key={book._id} value={book._id}>
                       {book.title} - {book.author} (Disponible: {book.available})
                    </option>
                  ))}
              </select>
            </div>
            {books.filter((b) => b.available > 0).length === 0 && (
              <p className="text-sm text-red-600 mt-2 bg-red-50 px-3 py-2 rounded-lg">
                  Aucun livre disponible pour le moment
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Sélectionner un membre *
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
              <select
                required
                value={formData.member}
                onChange={(e) => setFormData({ ...formData, member: e.target.value })}
                className="input-field pl-12"
              >
                <option value="">Choisir un membre actif</option>
                {members.map((member) => (
                  <option key={member._id} value={member._id}>
                    👤 {member.name} - {member.email}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Date de retour prévue *
            </label>
            <div className="relative">
              <CalendarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
              <input
                type="date"
                required
                min={getMinReturnDate()}
                value={formData.returnDate}
                onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                className="input-field pl-12"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2 bg-blue-50 px-3 py-2 rounded-lg">
               Minimum 7 jours à partir d'aujourd'hui
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-5">
            <p className="text-sm text-blue-800 font-medium flex items-start gap-2">
              <span>
                <strong>Important:</strong> Une amende de 500 FCFA par jour sera appliquée en cas de retard.
              </span>
            </p>
          </div>

          <div className="flex space-x-3 pt-6">
            <button type="submit" className="btn-primary flex-1 py-4 text-lg">
                Créer le prêt
            </button>
            <button type="button" onClick={closeModal} className="btn-secondary flex-1 py-4 text-lg">
              Annuler
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Loans;