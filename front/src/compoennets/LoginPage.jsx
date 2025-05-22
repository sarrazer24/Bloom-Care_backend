import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: email,
      motDePasse: password,
    };

    try {
      const response = await fetch(
        "https://bloom-care-backend.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json();

        // Check if token is present
        if (!data.token) {
          alert("Erreur: Token manquant dans la réponse du serveur.");
          return;
        }

        // Sauvegarder dans le localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("nom", data.nom);

        // ✅ Redirection immédiate sans alert bloquant
        if (data.role === "PARENT") {
          navigate("/dashboard");
        } else if (data.role === "ADMIN") {
          navigate("/dashboardAdmin");
        } else {
          alert("Rôle inconnu, contactez l’administrateur.");
        }
      } else {
        // Essayez de lire le message d'erreur du backend
        let errorMsg = "Échec de la connexion";
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch {
          // Peut-être une réponse texte brute
          errorMsg = await response.text();
        }
        alert(`Erreur: ${errorMsg}`);
      }
    } catch (error) {
      alert("Erreur réseau: " + error.message);
    }
  };
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-100 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center text-pink-500">
          Connexion
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 text-lg">
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 px-4 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="exemple@email.com"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 px-4 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="********"
              required
            />
            <p className="text-right text-sm text-pink-500 hover:underline mt-1">
              <Link to="/forgot-password">Mot de passe oublié ?</Link>
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-400 hover:bg-pink-500 text-white text-lg p-3 rounded-xl font-semibold transition duration-200"
          >
            Se connecter
          </button>
        </form>

        <p className="mt-6 text-center text-base text-gray-600">
          Pas encore de compte ?{" "}
          <Link
            to="/register"
            className="text-pink-500 font-medium hover:underline"
          >
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}
