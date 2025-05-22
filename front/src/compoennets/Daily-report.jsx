"use client"

import { useState } from "react"
import { format, addDays, subDays } from "date-fns"
import { fr } from "date-fns/locale"

function DailyReports() {
  const [date, setDate] = useState(new Date())
  const [selectedTab, setSelectedTab] = useState("timeline")

  // Format date for display
  const formatDate = (date) => {
    return format(date, "EEEE d MMMM yyyy", { locale: fr })
  }

  // Navigate to previous day
  const previousDay = () => {
    setDate(subDays(date, 1))
  }

  // Navigate to next day
  const nextDay = () => {
    setDate(addDays(date, 1))
  }

  return (
    <div className="min-h-screen bg-pink-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-pink-700">Suivi Quotidien</h1>
          <p className="text-gray-600">Rapport journalier des activités de Sophie</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Calendar Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 border-b border-pink-100">
              <h2 className="text-lg font-semibold text-pink-700">Calendrier</h2>
              <p className="text-sm text-gray-500">Sélectionnez une date</p>
            </div>
            <div className="p-4">
              {/* Simple Calendar Navigation */}
              <div className="flex justify-between items-center mb-4">
                <button onClick={previousDay} className="p-2 rounded-full hover:bg-pink-100 text-pink-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div className="text-center">
                  <div className="text-lg font-medium text-pink-800">{format(date, "d", { locale: fr })}</div>
                  <div className="text-sm text-gray-500">{format(date, "MMMM yyyy", { locale: fr })}</div>
                </div>
                <button onClick={nextDay} className="p-2 rounded-full hover:bg-pink-100 text-pink-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {["L", "M", "M", "J", "V", "S", "D"].map((day, index) => (
                  <div key={index} className="text-center text-xs text-gray-500">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const dayDate = new Date(date.getFullYear(), date.getMonth(), i - (date.getDate() % 7) + 1)
                  const isCurrentMonth = dayDate.getMonth() === date.getMonth()
                  const isToday = dayDate.toDateString() === new Date().toDateString()
                  const isSelected = dayDate.toDateString() === date.toDateString()

                  return (
                    <button
                      key={i}
                      onClick={() => setDate(dayDate)}
                      className={`
                        text-center text-sm p-1 rounded-full
                        ${!isCurrentMonth ? "text-gray-300" : "text-gray-700"}
                        ${isToday ? "bg-pink-200" : ""}
                        ${isSelected ? "bg-pink-500 text-white" : ""}
                        ${isCurrentMonth && !isSelected && !isToday ? "hover:bg-pink-100" : ""}
                      `}
                    >
                      {dayDate.getDate()}
                    </button>
                  )
                })}
              </div>

              {/* Download Button */}
              <button className="w-full mt-4 py-2 px-4 bg-white border border-pink-300 rounded-md text-pink-700 hover:bg-pink-50 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Télécharger le rapport
              </button>
            </div>
          </div>

          {/* Daily Report Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden md:col-span-2">
            <div className="p-4 border-b border-pink-100">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-pink-700">Rapport du {formatDate(date)}</h2>
                <span className="px-2 py-1 bg-pink-100 text-pink-700 text-xs font-medium rounded-full">Présente</span>
              </div>
              <p className="text-sm text-gray-500">Arrivée: 08:30 - Départ: 17:30</p>

              {/* Tabs */}
              <div className="flex mt-4 border-b border-gray-200">
                <button
                  onClick={() => setSelectedTab("timeline")}
                  className={`px-4 py-2 text-sm font-medium ${
                    selectedTab === "timeline"
                      ? "text-pink-700 border-b-2 border-pink-500"
                      : "text-gray-500 hover:text-pink-700"
                  }`}
                >
                  Chronologie
                </button>
                <button
                  onClick={() => setSelectedTab("meals")}
                  className={`px-4 py-2 text-sm font-medium ${
                    selectedTab === "meals"
                      ? "text-pink-700 border-b-2 border-pink-500"
                      : "text-gray-500 hover:text-pink-700"
                  }`}
                >
                  Repas
                </button>
                <button
                  onClick={() => setSelectedTab("naps")}
                  className={`px-4 py-2 text-sm font-medium ${
                    selectedTab === "naps"
                      ? "text-pink-700 border-b-2 border-pink-500"
                      : "text-gray-500 hover:text-pink-700"
                  }`}
                >
                  Siestes
                </button>
                <button
                  onClick={() => setSelectedTab("activities")}
                  className={`px-4 py-2 text-sm font-medium ${
                    selectedTab === "activities"
                      ? "text-pink-700 border-b-2 border-pink-500"
                      : "text-gray-500 hover:text-pink-700"
                  }`}
                >
                  Activités
                </button>
              </div>
            </div>

            <div className="p-4">
              {/* Timeline Tab Content */}
              {selectedTab === "timeline" && (
                <div className="space-y-6">
                  {/* Arrival */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-pink-600 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Arrivée</p>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                          08:30
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Sophie est arrivée avec son père. Elle était de bonne humeur et a facilement dit au revoir.
                      </p>
                    </div>
                  </div>

                  {/* Morning Snack */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Collation du matin</p>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                          10:00
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Sophie a mangé une compote de pomme et quelques morceaux de banane.
                      </p>
                    </div>
                  </div>

                  {/* Morning Activity */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Activité du matin</p>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                          10:30
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Sophie a participé à l'activité de motricité fine. Elle a manipulé des perles et des blocs avec
                        beaucoup d'intérêt.
                      </p>
                    </div>
                  </div>

                  {/* Lunch */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Déjeuner</p>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                          12:00
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Menu: Poulet, purée de carottes, yaourt nature
                        <br />
                        Sophie a bien mangé aujourd'hui, elle a particulièrement apprécié la purée de carottes.
                      </p>
                    </div>
                  </div>

                  {/* Nap */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Sieste</p>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                          13:00 - 15:00
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Sophie a dormi pendant 2 heures. Elle s'est réveillée calme et reposée.
                      </p>
                    </div>
                  </div>

                  {/* Afternoon Activity */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Activité de l'après-midi</p>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                          15:30
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Sophie a participé à l'atelier peinture. Elle a créé une belle œuvre avec des empreintes de
                        mains. Elle était très concentrée et a pris beaucoup de plaisir.
                      </p>
                    </div>
                  </div>

                  {/* Snack */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Goûter</p>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                          16:00
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Sophie a mangé un petit pain au lait et bu un verre de jus de pomme.
                      </p>
                    </div>
                  </div>

                  {/* Departure */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-pink-600 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Départ</p>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                          17:30
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Sophie est partie avec sa mère. Elle était contente de la voir et lui a montré son dessin.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Meals Tab Content */}
              {selectedTab === "meals" && (
                <div className="space-y-4">
                  <div className="rounded-lg border border-pink-100 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <h3 className="font-medium text-gray-900">Collation du matin (10:00)</h3>
                    </div>
                    <div className="ml-10 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Mangé
                        </span>
                        <span className="text-sm text-gray-700">Compote de pomme</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Mangé
                        </span>
                        <span className="text-sm text-gray-700">Morceaux de banane</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Bu
                        </span>
                        <span className="text-sm text-gray-700">Eau (100ml)</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-pink-100 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                      </div>
                      <h3 className="font-medium text-gray-900">Déjeuner (12:00)</h3>
                    </div>
                    <div className="ml-10 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Mangé
                        </span>
                        <span className="text-sm text-gray-700">Poulet</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Mangé
                        </span>
                        <span className="text-sm text-gray-700">Purée de carottes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                          Partiellement
                        </span>
                        <span className="text-sm text-gray-700">Yaourt nature</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Bu
                        </span>
                        <span className="text-sm text-gray-700">Eau (150ml)</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Note: Sophie a particulièrement apprécié la purée de carottes aujourd'hui.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-pink-100 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <h3 className="font-medium text-gray-900">Goûter (16:00)</h3>
                    </div>
                    <div className="ml-10 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Mangé
                        </span>
                        <span className="text-sm text-gray-700">Petit pain au lait</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Bu
                        </span>
                        <span className="text-sm text-gray-700">Jus de pomme (100ml)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Naps Tab Content */}
              {selectedTab === "naps" && (
                <div className="rounded-lg border border-pink-100 p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-900">Sieste de l'après-midi</h3>
                  </div>
                  <div className="ml-10 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Début</p>
                        <p className="text-sm font-medium text-gray-900">13:00</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Fin</p>
                        <p className="text-sm font-medium text-gray-900">15:00</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Durée</p>
                        <p className="text-sm font-medium text-gray-900">2 heures</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Qualité</p>
                        <p className="text-sm font-medium text-gray-900">Bonne</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Observations</p>
                      <p className="text-sm text-gray-700">
                        Sophie s'est endormie rapidement. Elle a dormi profondément et s'est réveillée calme et reposée.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Activities Tab Content */}
              {selectedTab === "activities" && (
                <div className="space-y-4">
                  <div className="rounded-lg border border-pink-100 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <h3 className="font-medium text-gray-900">Activité du matin (10:30)</h3>
                    </div>
                    <div className="ml-10 space-y-2">
                      <p className="text-sm font-medium text-gray-900">Motricité fine</p>
                      <p className="text-sm text-gray-500">
                        Sophie a manipulé des perles et des blocs avec beaucoup d'intérêt. Elle a réussi à empiler 5
                        blocs et à enfiler plusieurs perles sur un fil.
                      </p>
                      <div className="mt-2">
                        <p className="text-xs text-gray-500">Compétences travaillées:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                            Coordination
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                            Précision
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                            Patience
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-pink-100 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                        </svg>
                      </div>
                      <h3 className="font-medium text-gray-900">Activité de l'après-midi (15:30)</h3>
                    </div>
                    <div className="ml-10 space-y-2">
                      <p className="text-sm font-medium text-gray-900">Atelier peinture</p>
                      <p className="text-sm text-gray-500">
                        Sophie a participé à l'atelier peinture. Elle a créé une belle œuvre avec des empreintes de
                        mains. Elle était très concentrée et a pris beaucoup de plaisir.
                      </p>
                      <div className="mt-2">
                        <p className="text-xs text-gray-500">Compétences travaillées:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                            Créativité
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                            Expression
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                            Motricité
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <div className="w-16 h-16 rounded-md bg-gray-100 overflow-hidden">
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="w-16 h-16 rounded-md bg-gray-100 overflow-hidden">
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DailyReports
