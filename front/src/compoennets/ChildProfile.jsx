"use client"

import { useState } from "react"
import { useLocation } from "react-router-dom"

function ChildProfile() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState("profile")

  // Get child ID from URL query parameter
  const searchParams = new URLSearchParams(location.search)
  const childId = searchParams.get("child") || "1"

  // Child data (in a real app, this would be fetched based on childId)
  const child = {
    id: childId,
    name: "Emma Martin",
    dateOfBirth: "12 mai 2020",
    age: "3 ans, 2 mois",
    group: "Papillons (3-4 ans)",
    enrollmentDate: "1 septembre 2022",
    primaryLanguage: "Français",
    secondaryLanguage: "Anglais",
    allergies: "Arachides, Fraises",
    specialNotes:
      "Emma préfère dormir avec son éléphant en peluche. Elle peut avoir besoin d'encouragements supplémentaires pendant les activités de groupe.",
    medicalHistory: [
      {
        name: "DTaP (Diphtérie, Tétanos, Coqueluche)",
        date: "15 juin 2020",
        status: "Terminé",
      },
      {
        name: "Polio",
        date: "15 juin 2020",
        status: "Terminé",
      },
      {
        name: "ROR (Rougeole, Oreillons, Rubéole)",
        date: "20 mai 2021",
        status: "Terminé",
      },
      {
        name: "Varicelle",
        date: "20 mai 2021",
        status: "Terminé",
      },
      {
        name: "Hépatite B",
        date: "10 août 2021",
        status: "Terminé",
      },
      {
        name: "Vaccin antigrippal annuel",
        date: "5 octobre 2022",
        status: "Terminé",
      },
      {
        name: "Vaccin antigrippal annuel",
        date: "Prévu octobre 2023",
        status: "À venir",
      },
    ],
    medicalEvents: [
      {
        date: "12 novembre 2022",
        description: "Légère fièvre (38,2°C)",
        action: "Parents informés, surveillance tout au long de la journée",
      },
      {
        date: "8 janvier 2023",
        description: "Petite égratignure au genou pendant le jeu en extérieur",
        action: "Nettoyée et bandée, rapport d'incident rempli",
      },
      {
        date: "15 mars 2023",
        description: "Réaction allergique aux fraises (légère éruption cutanée)",
        action: "Parents immédiatement informés, aucun médicament nécessaire",
      },
    ],
    dietaryRestrictions: {
      allergies: [
        {
          name: "Arachides",
          severity: "Élevée",
          reaction: "Urticaire, gonflement",
          instructions:
            "Éviter tous les produits contenant des arachides. EpiPen disponible dans la trousse d'urgence.",
        },
        {
          name: "Fraises",
          severity: "Moyenne",
          reaction: "Éruption cutanée, démangeaisons",
          instructions: "Éviter les fraises et les aliments aromatisés aux fraises.",
        },
      ],
      preferences: [
        {
          category: "Aime",
          items: ["Pommes", "Pâtes", "Yaourt", "Carottes", "Poulet"],
        },
        {
          category: "N'aime pas",
          items: ["Brocoli", "Poisson", "Champignons"],
        },
      ],
    },
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Profil de l'enfant</h1>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("profile")}
            className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
              activeTab === "profile"
                ? "border-pink-500 text-pink-600"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            Profil
          </button>
          <button
            onClick={() => setActiveTab("medical")}
            className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
              activeTab === "medical"
                ? "border-pink-500 text-pink-600"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            Médical
          </button>
          <button
            onClick={() => setActiveTab("dietary")}
            className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
              activeTab === "dietary"
                ? "border-pink-500 text-pink-600"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            Alimentaire
          </button>
        </nav>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center space-y-4 md:flex-row md:items-start md:space-x-6 md:space-y-0">
            <div className="relative">
              <div className="flex h-48 w-48 items-center justify-center rounded-lg border border-gray-200 bg-gray-100 text-4xl font-medium text-gray-400">
                {child.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <button className="absolute bottom-2 right-2 rounded-full bg-white p-2 shadow-md hover:bg-gray-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                <span className="sr-only">Modifier la photo</span>
              </button>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">{child.name}</h2>
                <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Modifier le profil
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date de naissance</h3>
                  <p className="text-gray-800">{child.dateOfBirth}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Âge</h3>
                  <p className="text-gray-800">{child.age}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Groupe</h3>
                  <p className="text-gray-800">{child.group}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date d'inscription</h3>
                  <p className="text-gray-800">{child.enrollmentDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Langue principale</h3>
                  <p className="text-gray-800">{child.primaryLanguage}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Langue secondaire</h3>
                  <p className="text-gray-800">{child.secondaryLanguage}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">Allergies</h3>
                  <p className="text-gray-800">{child.allergies}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">Notes spéciales</h3>
                  <p className="text-gray-800">{child.specialNotes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Medical Tab */}
      {activeTab === "medical" && (
        <div className="space-y-6">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-gray-800">Vaccinations</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="p-2 text-left font-medium text-gray-800">Vaccination</th>
                    <th className="p-2 text-left font-medium text-gray-800">Date</th>
                    <th className="p-2 text-left font-medium text-gray-800">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {child.medicalHistory.map((vaccination, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="p-2 text-gray-700">{vaccination.name}</td>
                      <td className="p-2 text-gray-700">{vaccination.date}</td>
                      <td className="p-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            vaccination.status === "Terminé"
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {vaccination.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-gray-800">Événements médicaux</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="p-2 text-left font-medium text-gray-800">Date</th>
                    <th className="p-2 text-left font-medium text-gray-800">Description</th>
                    <th className="p-2 text-left font-medium text-gray-800">Action prise</th>
                  </tr>
                </thead>
                <tbody>
                  {child.medicalEvents.map((event, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="p-2 text-gray-700">{event.date}</td>
                      <td className="p-2 text-gray-700">{event.description}</td>
                      <td className="p-2 text-gray-700">{event.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Dietary Tab */}
      {activeTab === "dietary" && (
        <div className="space-y-6">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-800">Allergies & Restrictions</h3>
            </div>

            <div className="space-y-4">
              {child.dietaryRestrictions.allergies.map((allergy, index) => (
                <div key={index} className="rounded-md border border-gray-200 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-medium text-gray-800">{allergy.name}</h4>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        allergy.severity === "Élevée"
                          ? "bg-red-100 text-red-800"
                          : allergy.severity === "Moyenne"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      Sévérité {allergy.severity}
                    </span>
                  </div>
                  <div className="grid gap-2 text-sm">
                    <div className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 mt-0.5 h-4 w-4 text-gray-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-800">Réaction: </span>
                        <span className="text-gray-700">{allergy.reaction}</span>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 mt-0.5 h-4 w-4 text-gray-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-800">Instructions: </span>
                        <span className="text-gray-700">{allergy.instructions}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-gray-800">Préférences alimentaires</h3>

            <div className="grid gap-6 md:grid-cols-2">
              {child.dietaryRestrictions.preferences.map((preference) => (
                <div key={preference.category} className="rounded-md border border-gray-200 p-4">
                  <div className="mb-3 flex items-center">
                    {preference.category === "Aime" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-5 w-5 text-green-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-5 w-5 text-amber-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                      </svg>
                    )}
                    <h4 className="font-medium text-gray-800">{preference.category}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {preference.items.map((item, index) => (
                      <span key={index} className="rounded-full border border-gray-200 px-2 py-1 text-xs text-gray-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChildProfile
