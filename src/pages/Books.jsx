import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, BookOpen, Package, Sparkles } from 'lucide-react';
import { bookApi } from '../api/bookApi';
import {  CategoryApi } from '../api/ CategoryApi';
import Modal from '../components/common/Modal';
import SearchBar from '../components/common/SearchBar';
import Loading from '../components/common/Loading';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    publisher: '',
    publicationYear: '',
    quantity: 1,
    description: '',
  });

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await bookApi.getAll();
      setBooks(response.data.data);
    } catch (error) {
      console.error('Erreur lors du chargement des livres:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await  CategoryApi.getAll();
      setCategories(response.data.data);
    } catch (error) {
      console.error('Erreur lors du chargement des catégories:', error);
    }
  };

  const openModal = (book = null) => {
    if (book) {
      setEditingBook(book);
      setFormData({
        title: book.title,
        author: book.author,
        category: book.category?._id || '',
        publisher: book.publisher || '',
        publicationYear: book.publicationYear || '',
        quantity: book.quantity,
        description: book.description || '',
      });
    } else {
      setEditingBook(null);
      setFormData({
        title: '',
        author: '',
        category: '',
        publisher: '',
        publicationYear: '',
        quantity: 1,
        description: '',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingBook(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBook) {
        await bookApi.update(editingBook._id, formData);
      } else {
        await bookApi.create(formData);
      }
      fetchBooks();
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du livre:', error);
      alert(error.response?.data?.message || 'Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
      try {
        await bookApi.delete(id);
        fetchBooks();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert(error.response?.data?.message || 'Erreur lors de la suppression');
      }
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loading message="Chargement des livres..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="header-gradient">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <BookOpen className="w-10 h-10" />
              Catalogue de livres
            </h1>
            <p className="text-blue-100 text-lg">Gérez votre collection de livres</p>
          </div>
          <button onClick={() => openModal()} className="bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 px-6 py-4 rounded-2xl hover:shadow-2xl transition-all font-bold flex items-center space-x-2 hover:scale-105">
            <Plus className="w-6 h-6" />
            <span>Ajouter un livre</span>
          </button>
        </div>
      </div>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
         placeholder=" Rechercher par titre ou auteur..."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <div key={book._id} className="card overflow-hidden group hover:scale-105 transition-transform">
            <div className="h-3 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 p-3 rounded-2xl">
                  <BookOpen className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                    book.available > 0
                      ? 'badge-green'
                      : 'badge-red'
                  }`}
                >
                  {book.available > 0 ? ' Disponible' : ' Indisponible'}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {book.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-1 font-medium">  {book.author}</p>
              
              <div className="flex items-center justify-between mb-5">
                <span className="badge-blue">
                  {book.category?.name || 'Sans catégorie'}
                </span>
                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full">
                  <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    {book.available}/{book.quantity}
                  </span>
                </div>
              </div>
              
              {book.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 italic">
                  "{book.description}"
                </p>
              )}
              
              <div className="flex space-x-2 pt-4 border-t border-gray-100 dark:border-slate-700">
                <button
                  onClick={() => openModal(book)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-3 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all font-semibold"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Modifier</span>
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="flex items-center justify-center bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/50 transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-20">
          <div className="bg-gradient-to-br from-blue-100 to-cyan-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-12 h-12 text-blue-600" />
          </div>
          <p className="text-gray-500 text-lg font-medium">Aucun livre trouvé</p>
          <p className="text-gray-400 text-sm mt-2">Commencez par ajouter votre premier livre</p>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title={editingBook ? '  Modifier le livre' : ' Ajouter un livre'}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Titre *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input-field"
                placeholder="Nom du livre"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Auteur *</label>
              <input
                type="text"
                required
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="input-field"
                placeholder="Nom de l'auteur"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Catégorie *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="input-field"
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Éditeur</label>
              <input
                type="text"
                value={formData.publisher}
                onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                className="input-field"
                placeholder="Editeur du livre"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Année de publication
              </label>
              <input
                type="number"
                value={formData.publicationYear}
                onChange={(e) => setFormData({ ...formData, publicationYear: e.target.value })}
                className="input-field"
                min="1000"
                max={new Date().getFullYear()}
                placeholder="Année de publication"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Quantité *</label>
            <input
              type="number"
              required
              min="1"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="input-field"
              placeholder="5"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
            <textarea
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field"
              placeholder="Une brève description du livre..."
            ></textarea>
          </div>

          <div className="flex space-x-3 pt-6">
            <button type="submit" className="btn-primary flex-1 py-4 text-lg">
              {editingBook ? '  Mettre à jour' : ' Ajouter'}
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

export default Books;