import React, { useState, useEffect } from 'react';
import { FolderTree, Check } from 'lucide-react';
import { categoryApi } from '../api/categoryApi';
import Loading from '../components/common/Loading';

// Liste fixe de catégories disponibles
const AVAILABLE_CATEGORIES = [
  { name: 'Fiction', description: 'Romans et œuvres de fiction',  },
  { name: 'Science', description: 'Livres scientifiques et techniques', },
  { name: 'Histoire', description: 'Livres d\'histoire et biographies',  },
  { name: 'Philosophie', description: 'Ouvrages philosophiques',   },
  { name: 'Classique', description: 'Classiques de la littérature',   },
  { name: 'Jeunesse', description: 'Livres pour enfants et adolescents',  },
  { name: 'Développement personnel', description: 'Livres de développement personnel',   },
  { name: 'Technologie', description: 'Informatique et nouvelles technologies',},
  { name: 'Art', description: 'Livres sur l\'art et la créativité',  },
  { name: 'Cuisine', description: 'Livres de recettes et gastronomie',  },
  { name: 'Sport', description: 'Livres sur le sport et le fitness',   },
  { name: 'Voyage', description: 'Guides de voyage et récits',   },
  { name: 'Religion', description: 'Livres religieux et spirituels',   },
  { name: 'Économie', description: 'Livres d\'économie et finance',  },
  { name: 'Politique', description: 'Livres politiques',   },
  { name: 'Psychologie', description: 'Livres de psychologie',  },
];

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState(new Set());

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryApi.getAll();
      const userCategories = response.data.data;
      setCategories(userCategories);
      
      // Marquer les catégories déjà ajoutées
      const selected = new Set(userCategories.map(cat => cat.name));
      setSelectedCategories(selected);
    } catch (error) {
      console.error('Erreur lors du chargement des catégories:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = async (category) => {
    try {
      if (selectedCategories.has(category.name)) {
        // Supprimer la catégorie
        const catToDelete = categories.find(c => c.name === category.name);
        if (catToDelete) {
          await categoryApi.delete(catToDelete._id);
          const newSelected = new Set(selectedCategories);
          newSelected.delete(category.name);
          setSelectedCategories(newSelected);
          setCategories(categories.filter(c => c._id !== catToDelete._id));
        }
      } else {
        // Ajouter la catégorie
        const response = await categoryApi.create({
          name: category.name,
          description: category.description
        });
        const newSelected = new Set(selectedCategories);
        newSelected.add(category.name);
        setSelectedCategories(newSelected);
        setCategories([...categories, response.data.data]);
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert(error.response?.data?.message || 'Erreur lors de l\'opération');
    }
  };

  if (loading) {
    return <Loading message="Chargement des catégories..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex items-center gap-6">
          <div className="bg-white/20 backdrop-blur-lg p-4 rounded-2xl">
            <FolderTree className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">Catégories</h1>
            <p className="text-purple-100 text-lg">
              Sélectionnez les catégories pour votre bibliothèque ({selectedCategories.size} sélectionnées)
            </p>
          </div>
        </div>
      </div>

      {/* Liste des catégories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {AVAILABLE_CATEGORIES.map((category) => {
          const isSelected = selectedCategories.has(category.name);
          
          return (
            <button
              key={category.name}
              onClick={() => toggleCategory(category)}
              className={`p-6 rounded-2xl border-2 transition-all text-left ${
                isSelected
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-4xl">{category.icon}</span>
                {isSelected && (
                  <div className="bg-blue-600 text-white rounded-full p-1">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {category.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 rounded-xl">
        <p className="text-blue-800 dark:text-blue-200 font-medium">
           Cliquez sur une catégorie pour l'ajouter ou la retirer de votre bibliothèque. 
          Seules les catégories sélectionnées apparaîtront lors de l'ajout d'un livre.
        </p>
      </div>
    </div>
  );
};

export default Categories;