import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function DashboardAdmin() {
  const [page, setPage] = useState("dashboard");
  const [medicalForm, setMedicalForm] = useState({
    childId: "",
    allergies: "",
    notes: "",
  });
  const [userForm, setUserForm] = useState({
    name: "",
    prenom: "",
    phone: "",
    email: "",
    password: "",
    role: "",
  });

  const handleUserChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleMedicalChange = (e) => {
    setMedicalForm({ ...medicalForm, [e.target.name]: e.target.value });
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();

    if (userForm.password.length < 6) {
      alert("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (userForm.phone.length < 10) {
      alert("Le numéro de téléphone doit contenir au moins 10 chiffres.");
      return;
    }

    const adminToken = localStorage.getItem("token");

    const payload = {
      nom: userForm.name,
      email: userForm.email,
      motDePasse: userForm.password,
      role: userForm.role, // Already uppercase from select
      telephone: userForm.phone,
    };

    try {
      const response = await fetch(
        "https://bloom-care-backend.onrender.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        let errorMsg = response.statusText;
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch {
          // No JSON body
        }
        alert("Erreur: " + errorMsg);
        return;
      }

      // Success: backend returns plain text, not JSON
      const text = await response.text();
      alert(text);

      setUserForm({
        name: "",
        prenom: "",
        phone: "",
        email: "",
        password: "",
        role: "",
      });
    } catch (error) {
      alert("Erreur lors de l'ajout de l'utilisateur");
      console.error(error);
    }
  };

  const handleMedicalSubmit = (e) => {
    e.preventDefault();
    console.log("Ajouter dossier médical:", medicalForm);
    alert(`Dossier médical ajouté pour l'enfant ID: ${medicalForm.childId}`);
    setMedicalForm({ childId: "", allergies: "", notes: "" });
  };

  const data = [
    { name: "Enfants", value: 120 },
    { name: "Dossiers médicaux", value: 85 },
    { name: "Utilisateurs", value: 40 },
  ];

  return (
    <div className="flex w-screen h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
        <h2
          className="text-2xl font-bold text-pink-500 mb-8 cursor-pointer"
          onClick={() => setPage("dashboard")}
        >
          Admin
        </h2>
        <nav className="flex flex-col space-y-4 text-gray-700">
          <button
            onClick={() => setPage("dashboard")}
            className={`text-left ${
              page === "dashboard" ? "text-pink-500 font-semibold" : ""
            }`}
          >
            🏠 Tableau de bord
          </button>
          <button
            onClick={() => setPage("addUser")}
            className={`text-left ${
              page === "addUser" ? "text-pink-500 font-semibold" : ""
            }`}
          >
            👤 Ajouter utilisateur
          </button>
          <button
            onClick={() => setPage("addMedicalFile")}
            className={`text-left ${
              page === "addMedicalFile" ? "text-pink-500 font-semibold" : ""
            }`}
          >
            🩺 Dossier médical
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto w-full h-full">
        {page === "dashboard" && (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-3xl font-bold text-pink-500 mb-6">
              Tableau de bord
            </h1>
            <div className="bg-white p-6 rounded-xl shadow w-full max-w-6xl h-[500px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#ec4899" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        {page === "addUser" && (
          <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-100 to-white px-4">
            <form
              onSubmit={handleUserSubmit}
              className="w-full max-w-4xl bg-white p-10 rounded-2xl shadow-2xl border border-pink-200"
            >
              <h2 className="text-3xl font-semibold text-center text-pink-600 mb-10">
                Ajouter un utilisateur
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  name="name"
                  type="text"
                  placeholder="Nom"
                  value={userForm.name}
                  onChange={handleUserChange}
                  required
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <input
                  name="prenom"
                  type="text"
                  placeholder="Prénom"
                  value={userForm.prenom || ""}
                  onChange={handleUserChange}
                  required
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Numéro de téléphone"
                  value={userForm.phone || ""}
                  onChange={handleUserChange}
                  required
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={userForm.email}
                  onChange={handleUserChange}
                  required
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Mot de passe"
                  value={userForm.password || ""}
                  onChange={handleUserChange}
                  required
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <select
                  name="role"
                  value={userForm.role}
                  onChange={handleUserChange}
                  required
                  className="w-full p-4 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                >
                  <option value="">Sélectionner un rôle</option>
                  <option value="EDUCATEUR">Éducateur</option>
                  <option value="CUISINIER">Personnel de cuisine</option>
                  <option value="ADMIN">Administrateur</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-8 bg-pink-500 text-white text-lg font-semibold py-4 rounded-xl hover:bg-pink-600 transition-all duration-300"
              >
                Ajouter
              </button>
            </form>
          </div>
        )}

        {page === "addMedicalFile" && (
          <>
            <h2 className="text-2xl font-bold text-pink-500 mb-6">
              Ajouter un dossier médical
            </h2>
            <form
              onSubmit={handleMedicalSubmit}
              className="space-y-6 bg-white p-6 rounded-xl shadow w-full max-w-xl"
            >
              <input
                name="childId"
                type="text"
                placeholder="ID de l'enfant"
                value={medicalForm.childId}
                onChange={handleMedicalChange}
                required
                className="w-full p-3 border rounded-xl"
              />
              <input
                name="allergies"
                type="text"
                placeholder="Allergies"
                value={medicalForm.allergies}
                onChange={handleMedicalChange}
                className="w-full p-3 border rounded-xl"
              />
              <textarea
                name="notes"
                placeholder="Notes supplémentaires"
                value={medicalForm.notes}
                onChange={handleMedicalChange}
                className="w-full p-3 border rounded-xl resize-y"
                rows={4}
              />
              <button
                type="submit"
                className="bg-pink-500 text-white px-6 py-3 rounded-xl hover:bg-pink-600 transition"
              >
                Ajouter dossier
              </button>
            </form>
          </>
        )}
      </main>
    </div>
  );
}
