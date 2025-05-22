import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      nom: lastName.trim(),
      email: email.trim(),
      motDePasse: password,
      role: "PARENT",
      telephone: phone.trim()
    };

    console.log("Payload envoyé :", payload); // Debug

    try {
      const response = await fetch("https://bloom-care-backend.onrender.com/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert("Inscription réussie !");
        navigate('/dashboard'); // Redirection vers le dashboard
      } else {
        const errorData = await response.json();
        console.error("Erreur backend :", errorData);
        alert(`Erreur: ${errorData.message || "Inscription échouée"}`);
      }
    } catch (error) {
      alert("Erreur réseau: " + error.message);
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-100 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-pink-500">Créer un compte Parent</h1>

        <form onSubmit={handleSubmit} className="space-y-5 text-lg">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Nom</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="h-12 px-4 w-full border rounded-xl"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Téléphone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-12 px-4 w-full border rounded-xl"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 px-4 w-full border rounded-xl"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 px-4 w-full border rounded-xl"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-xl font-semibold transition"
          >
            S'inscrire
          </button>
        </form>

        <p className="mt-6 text-center text-base text-gray-600">
          Déjà un compte ?{' '}
          <Link to="/login" className="text-pink-500 font-medium hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
