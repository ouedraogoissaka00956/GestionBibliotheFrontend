import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, User, Mail, Phone, MapPin, UserCheck } from 'lucide-react';
import { memberApi } from '../api/memberApi';
import Modal from '../components/common/Modal';
import SearchBar from '../components/common/SearchBar';
import Loading from '../components/common/Loading';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await memberApi.getAll();
      setMembers(response.data.data);
    } catch (error) {
      console.error('Erreur lors du chargement des membres:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (member = null) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        name: member.name,
        email: member.email,
        phone: member.phone,
        address: member.address,
      });
    } else {
      setEditingMember(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingMember(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMember) {
        await memberApi.update(editingMember._id, formData);
      } else {
        await memberApi.create(formData);
      }
      fetchMembers();
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du membre:', error);
      alert(error.response?.data?.message || 'Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) {
      try {
        await memberApi.delete(id);
        fetchMembers();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert(error.response?.data?.message || 'Erreur lors de la suppression');
      }
    }
  };

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loading message="Chargement des membres..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <UserCheck className="w-10 h-10" />
              Membres
            </h1>
            <p className="text-cyan-100 text-lg">Gérez les membres de la bibliothèque</p>
          </div>
          <button onClick={() => openModal()} className="bg-white text-cyan-600 px-6 py-4 rounded-2xl hover:shadow-2xl transition-all font-bold flex items-center space-x-2 hover:scale-105">
            <Plus className="w-6 h-6" />
            <span>Ajouter un membre</span>
          </button>
        </div>
      </div>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder=" Rechercher un membre..."
      />

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-100">
              <tr>
                <th className="px-6 py-5 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">
                  Membre
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">
                  Adresse
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">
                  Date d'adhésion
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-5 text-right text-xs font-bold text-blue-900 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMembers.map((member) => (
                <tr key={member._id} className="hover:bg-blue-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-2xl shadow-md group-hover:scale-110 transition-transform">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg">{member.name}</p>
                        <p className="text-xs text-gray-500">ID: {member._id.slice(-6)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-gray-700">
                        <Mail className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">{member.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-700">
                        <Phone className="w-4 h-4 text-cyan-500" />
                        <span className="text-sm font-medium">{member.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span className="text-sm max-w-xs truncate">{member.address}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="bg-blue-50 px-3 py-2 rounded-xl inline-block">
                      <p className="text-sm font-bold text-blue-700">
                        {new Date(member.joinDate).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-4 py-2 rounded-full text-xs font-bold ${
                        member.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : member.status === 'inactive'
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {member.status === 'active'
                        ? ' Actif'
                        : member.status === 'inactive'
                        ? ' Inactif'
                        : ' Suspendu'}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => openModal(member)}
                        className="text-blue-600 hover:bg-blue-50 p-2 rounded-xl transition-all"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(member._id)}
                        className="text-red-600 hover:bg-red-50 p-2 rounded-xl transition-all"
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

        {filteredMembers.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-gradient-to-br from-cyan-100 to-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-cyan-600" />
            </div>
            <p className="text-gray-500 text-lg font-medium">Aucun membre trouvé</p>
            <p className="text-gray-400 text-sm mt-2">Ajoutez votre premier membre</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title={editingMember ? '  Modifier le membre' : ' Ajouter un membre'}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Nom complet *</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field pl-12"
                placeholder="Nom du membre"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-field pl-12"
                placeholder="Adresse email du membre"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Téléphone *</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="input-field pl-12"
                placeholder="+226 ********"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Adresse *</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-4 text-blue-500 w-5 h-5" />
              <textarea
                required
                rows="3"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="input-field pl-12"
                placeholder="Adresse complète du membre"
              ></textarea>
            </div>
          </div>

          <div className="flex space-x-3 pt-6">
            <button type="submit" className="btn-primary flex-1 py-4 text-lg">
              {editingMember ? '  Mettre à jour' : ' Ajouter'}
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

export default Members;