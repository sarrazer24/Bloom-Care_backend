"use client"

import { useState } from "react"
import { Clock, Utensils, MessageSquare } from "lucide-react"

function DailyTracking() {
  const [activeTab, setActiveTab] = useState("attendance")
  const [selectedDate, setSelectedDate] = useState("today")

  // Attendance data
  const attendanceData = {
    status: "present",
    arrivalTime: "8h30",
    departureTime: "17h15",
    totalHours: "8h 45m",
    history: [
      { date: "Lundi, 20 mai", status: "present", arrivalTime: "8h30", departureTime: "17h15" },
      { date: "Mardi, 21 mai", status: "present", arrivalTime: "8h45", departureTime: "17h00" },
      { date: "Mercredi, 22 mai", status: "absent", reason: "Malade - Fièvre" },
      { date: "Jeudi, 23 mai", status: "present", arrivalTime: "8h15", departureTime: "16h45" },
      { date: "Vendredi, 24 mai", status: "present", arrivalTime: "8h30", departureTime: "17h30" },
    ],
  }

  // Meals data
  const mealsData = {
    breakfast: {
      consumed: "All",
      menu: "Yaourt avec fruits et granola",
      time: "9h00",
      notes: "A particulièrement apprécié les fraises",
    },
    lunch: {
      consumed: "Most",
      menu: "Poulet avec légumes et riz",
      time: "12h15",
      notes: "A mangé tout le poulet et le riz, a laissé quelques légumes",
    },
    snack: {
      consumed: "All",
      menu: "Tranches de pomme et crackers",
      time: "15h30",
      notes: "A demandé une deuxième portion",
    },
    weeklyMenu: [
      {
        day: "Lundi",
        breakfast: "Yaourt aux fruits",
        lunch: "Poulet avec légumes et riz",
        snack: "Tranches de pomme et crackers",
      },
      {
        day: "Mardi",
        breakfast: "Porridge à la banane",
        lunch: "Poisson avec pommes de terre et haricots verts",
        snack: "Tranches d'orange et biscuits",
      },
      {
        day: "Mercredi",
        breakfast: "Céréales avec lait",
        lunch: "Pâtes à la sauce tomate et fromage",
        snack: "Raisins et crackers",
      },
      {
        day: "Jeudi",
        breakfast: "Pain grillé avec confiture",
        lunch: "Soupe de légumes avec pain",
        snack: "Banane et yaourt",
      },
      {
        day: "Vendredi",
        breakfast: "Salade de fruits",
        lunch: "Boulettes de viande avec purée et petits pois",
        snack: "Fromage et crackers",
      },
    ],
  }

  // Observations data
  const observationsData = [
    {
      time: "9h30",
      category: "Comportement",
      note: "Emma était de bonne humeur ce matin. Elle s'est bien adaptée après le départ des parents et a rejoint le cercle du matin avec enthousiasme.",
      educator: "Marie Dubois",
    },
    {
      time: "10h45",
      category: "Activités",
      note: "A participé activement à notre séance de musique. Elle a montré un intérêt particulier pour le tambourin et a bien suivi les rythmes.",
      educator: "Marie Dubois",
    },
    {
      time: "13h00",
      category: "Repos",
      note: "A fait la sieste pendant 1h30 avec son éléphant en peluche. S'est réveillée reposée et calme.",
      educator: "Lucas Martin",
    },
    {
      time: "15h15",
      category: "Social",
      note: "A joué de manière coopérative avec Sophie et Thomas pendant le jeu libre. Ils ont construit une tour ensemble et ont pris des tours pour ajouter des blocs.",
      educator: "Marie Dubois",
    },
    {
      time: "16h30",
      category: "Apprentissage",
      note: "A montré de l'intérêt pour le livre d'alphabet. Pouvait reconnaître et nommer plusieurs lettres, notamment E, M, A.",
      educator: "Marie Dubois",
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "present":
        return <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">Présent</span>
      case "absent":
        return <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">Absent</span>
      case "late":
        return (
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">En retard</span>
        )
      default:
        return <span>{status}</span>
    }
  }

  const getConsumptionBadge = (consumed) => {
    switch (consumed) {
      case "All":
        return <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">Tout</span>
      case "Most":
        return (
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">La plupart</span>
        )
      case "Some":
        return <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">Un peu</span>
      case "None":
        return <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">Rien</span>
      default:
        return <span>{consumed}</span>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Suivi quotidien</h1>
          <p className="text-gray-600">Suivez les activités quotidiennes de votre enfant</p>
        </div>
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
        >
          <option value="today">Aujourd'hui</option>
          <option value="yesterday">Hier</option>
          <option value="monday">Lundi, 20 mai</option>
          <option value="tuesday">Mardi, 21 mai</option>
          <option value="wednesday">Mercredi, 22 mai</option>
          <option value="thursday">Jeudi, 23 mai</option>
          <option value="friday">Vendredi, 24 mai</option>
        </select>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("attendance")}
            className={`flex items-center whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
              activeTab === "attendance"
                ? "border-pink-500 text-pink-600"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            <Clock className="mr-2 h-4 w-4" />
            Présence
          </button>
          <button
            onClick={() => setActiveTab("meals")}
            className={`flex items-center whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
              activeTab === "meals"
                ? "border-pink-500 text-pink-600"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            <Utensils className="mr-2 h-4 w-4" />
            Repas
          </button>
          <button
            onClick={() => setActiveTab("observations")}
            className={`flex items-center whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
              activeTab === "observations"
                ? "border-pink-500 text-pink-600"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Observations
          </button>
        </nav>
      </div>

      {/* Attendance Tab */}
      {activeTab === "attendance" && (
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-medium text-gray-800">Registre de présence</h2>
          <div className="space-y-6">
            <div className="rounded-lg bg-pink-50 p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-800">Statut d'aujourd'hui</h3>
                {getStatusBadge(attendanceData.status)}
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-md bg-white p-3 shadow-sm">
                  <p className="text-sm text-gray-600">Heure d'arrivée</p>
                  <p className="text-lg font-medium text-gray-800">{attendanceData.arrivalTime}</p>
                </div>
                <div className="rounded-md bg-white p-3 shadow-sm">
                  <p className="text-sm text-gray-600">Heure de départ</p>
                  <p className="text-lg font-medium text-gray-800">{attendanceData.departureTime}</p>
                </div>
                <div className="rounded-md bg-white p-3 shadow-sm">
                  <p className="text-sm text-gray-600">Heures totales</p>
                  <p className="text-lg font-medium text-gray-800">{attendanceData.totalHours}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-medium text-gray-800">Présence récente</h3>
              <div className="space-y-3">
                {attendanceData.history.map((day, index) => (
                  <div key={index} className="flex items-center justify-between rounded-md border border-gray-200 p-3">
                    <div>
                      <p className="font-medium text-gray-800">{day.date}</p>
                      {day.status === "present" ? (
                        <p className="text-sm text-gray-600">
                          {day.arrivalTime} - {day.departureTime}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-600">Raison: {day.reason}</p>
                      )}
                    </div>
                    {getStatusBadge(day.status)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Meals Tab */}
      {activeTab === "meals" && (
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-medium text-gray-800">Repas & Nutrition</h2>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="rounded-md border border-gray-200 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-800">Petit-déjeuner</h3>
                  {getConsumptionBadge(mealsData.breakfast.consumed)}
                </div>
                <div className="grid gap-2 text-sm">
                  <div className="flex items-start">
                    <p>
                      <span className="font-medium text-gray-800">Menu: </span>
                      <span className="text-gray-600">{mealsData.breakfast.menu}</span>
                    </p>
                  </div>
                  <div className="flex items-start">
                    <p>
                      <span className="font-medium text-gray-800">Heure: </span>
                      <span className="text-gray-600">{mealsData.breakfast.time}</span>
                    </p>
                  </div>
                  <div className="flex items-start">
                    <p>
                      <span className="font-medium text-gray-800">Notes: </span>
                      <span className="text-gray-600">{mealsData.breakfast.notes}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-gray-200 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-800">Déjeuner</h3>
                  {getConsumptionBadge(mealsData.lunch.consumed)}
                </div>
                <div className="grid gap-2 text-sm">
                  <div className="flex items-start">
                    <p>
                      <span className="font-medium text-gray-800">Menu: </span>
                      <span className="text-gray-600">{mealsData.lunch.menu}</span>
                    </p>
                  </div>
                  <div className="flex items-start">
                    <p>
                      <span className="font-medium text-gray-800">Heure: </span>
                      <span className="text-gray-600">{mealsData.lunch.time}</span>
                    </p>
                  </div>
                  <div className="flex items-start">
                    <p>
                      <span className="font-medium text-gray-800">Notes: </span>
                      <span className="text-gray-600">{mealsData.lunch.notes}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-gray-200 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-800">Goûter</h3>
                  {getConsumptionBadge(mealsData.snack.consumed)}
                </div>
                <div className="grid gap-2 text-sm">
                  <div className="flex items-start">
                    <p>
                      <span className="font-medium text-gray-800">Menu: </span>
                      <span className="text-gray-600">{mealsData.snack.menu}</span>
                    </p>
                  </div>
                  <div className="flex items-start">
                    <p>
                      <span className="font-medium text-gray-800">Heure: </span>
                      <span className="text-gray-600">{mealsData.snack.time}</span>
                    </p>
                  </div>
                  <div className="flex items-start">
                    <p>
                      <span className="font-medium text-gray-800">Notes: </span>
                      <span className="text-gray-600">{mealsData.snack.notes}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-medium text-gray-800">Menu hebdomadaire</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="p-2 text-left font-medium text-gray-800">Jour</th>
                      <th className="p-2 text-left font-medium text-gray-800">Petit-déjeuner</th>
                      <th className="p-2 text-left font-medium text-gray-800">Déjeuner</th>
                      <th className="p-2 text-left font-medium text-gray-800">Goûter</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mealsData.weeklyMenu.map((day, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="p-2 font-medium text-gray-800">{day.day}</td>
                        <td className="p-2 text-gray-600">{day.breakfast}</td>
                        <td className="p-2 text-gray-600">{day.lunch}</td>
                        <td className="p-2 text-gray-600">{day.snack}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Observations Tab */}
      {activeTab === "observations" && (
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-medium text-gray-800">Observations des éducateurs</h2>
          <div className="space-y-4">
            {observationsData.map((observation, index) => (
              <div key={index} className="rounded-md border border-gray-200 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded-full border border-gray-300 px-2 py-0.5 text-xs font-medium text-gray-700">
                    {observation.category}
                  </span>
                  <span className="text-sm text-gray-600">{observation.time}</span>
                </div>
                <p className="mb-2 text-sm text-gray-700">{observation.note}</p>
                <p className="text-xs text-gray-600">Noté par: {observation.educator}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DailyTracking
