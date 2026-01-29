import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { authApi } from '../api/authApi';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authApi.forgotPassword(email);
      setSuccess(true);
      setResetToken(response.data.resetToken); // Pour le développement
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'envoi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-300/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-blue-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-white/20 backdrop-blur-lg p-5 rounded-3xl mb-6 shadow-2xl border border-white/30">
            <BookOpen className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">Mot de passe oublié</h1>
          <p className="text-blue-100 text-lg">Réinitialisez votre mot de passe</p>
        </div>

        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
          {!success ? (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Pas de problème !</h2>
                <p className="text-gray-600">Entrez votre email et nous vous enverrons un lien de réinitialisation</p>
              </div>

              {error && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Adresse email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-field pl-12 text-gray-800 placeholder-gray-400"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed py-4 text-lg font-semibold"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Envoi...
                    </span>
                  ) : (
                    'Envoyer le lien'
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Email envoyé !</h3>
              <p className="text-gray-600 mb-6">
                Vérifiez votre boîte email pour réinitialiser votre mot de passe.
              </p>
              
              {/* Mode développement - Afficher le token */}
              {resetToken && (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 text-left">
                  <p className="text-sm font-semibold text-yellow-800 mb-2">Mode Développement</p>
                  <p className="text-xs text-yellow-700 mb-2">Utilisez ce lien :</p>
                  <Link 
                    to={`/reset-password/${resetToken}`}
                    className="text-xs text-blue-600 hover:underline break-all"
                  >
                    /reset-password/{resetToken}
                  </Link>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 text-center">
            <Link 
              to="/login" 
              className="text-sm text-blue-600 hover:text-blue-800 font-semibold hover:underline inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;