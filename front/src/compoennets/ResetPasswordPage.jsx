import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!token) {
      setError("Lien de réinitialisation invalide ou expiré.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch(
        "https://bloom-care-backend.onrender.com/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            token: token,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (
        response.ok &&
        data.message === "Mot de passe réinitialisé avec succès."
      ) {
        setMessage("Mot de passe réinitialisé avec succès !");
        navigate("/login"); // Redirige immédiatement
      } else {
        setError(data.message || "Une erreur est survenue.");
      }
    } catch {
      setError("Erreur réseau. Veuillez réessayer.");
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-100 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-pink-500">
          Nouveau mot de passe
        </h1>

        {message ? (
          <p className="text-green-600 text-center font-medium">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                className="h-12 px-4 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                className="h-12 px-4 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-pink-400 hover:bg-pink-500 text-white text-lg p-3 rounded-xl font-semibold transition duration-200"
            >
              Réinitialiser
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
