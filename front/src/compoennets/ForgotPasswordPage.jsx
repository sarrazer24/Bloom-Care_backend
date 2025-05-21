import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
    e.preventDefault();

    console.log(`Lien simulé : http://localhost:5173/reset-password?token=simu123`);
    alert('Lien de réinitialisation envoyé (simulation). Vérifiez la console.');

    // Redirection simulée après "envoi"
    setTimeout(() => navigate('/reset-password?token=simu123'), 1500);
  };


  return (
   <div className="w-screen h-screen bg-gradient-to-br from-blue-100 to-pink-100 flex items-center justify-center p-4">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-pink-500">Mot de passe oublié ?</h1>

        <p className="text-center text-gray-600 mb-6">
          Entrez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 text-lg">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 px-4 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="exemple@email.com"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-400 hover:bg-pink-500 text-white text-lg p-3 rounded-xl font-semibold"
          >
            Envoyer le lien
          </button>
        </form>

        <p className="mt-6 text-center text-base text-gray-600">
          <Link to="/login" className="text-pink-500 hover:underline">
            Retour à la connexion
          </Link>
        </p>
      </div>
    </div>
  );
}
