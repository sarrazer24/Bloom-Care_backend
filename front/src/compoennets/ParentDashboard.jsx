"use client"

import { useState } from "react"
import { Clock, CalendarCheck, Utensils, SmilePlus, Palette, Music, Trees, Book, ArrowRight, Plus } from "lucide-react"
import { Link } from "react-router-dom"

function Dashboard() {
  const [showSuccess, setShowSuccess] = useState(false)

  // Simulate checking URL parameters
  useState(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get("registration") === "success") {
      setShowSuccess(true)
      // Clear the URL parameter after 5 seconds
      setTimeout(() => {
        window.history.replaceState({}, document.title, window.location.pathname)
        setShowSuccess(false)
      }, 5000)
    }
  }, [])

  const cards = [
    {
      title: "Présence",
      icon: Clock,
      value: "Présent",
      description: "Arrivée à 8h30",
      color: "text-green-600",
      iconBg: "bg-green-100",
    },
    {
      title: "Activités",
      icon: CalendarCheck,
      value: "3 Aujourd'hui",
      description: "Art, Musique, Extérieur",
      color: "text-pink-600",
      iconBg: "bg-pink-100",
    },
    {
      title: "Repas",
      icon: Utensils,
      value: "2 Terminés",
      description: "Petit-déjeuner, Déjeuner",
      color: "text-amber-600",
      iconBg: "bg-amber-100",
    },
    {
      title: "Humeur",
      icon: SmilePlus,
      value: "Joyeux",
      description: "Apprécie les activités",
      color: "text-pink-600",
      iconBg: "bg-pink-100",
    },
  ]

  const activities = [
    {
      time: "9h30",
      title: "Art & Bricolage",
      description: "A créé une peinture avec les doigts",
      icon: Palette,
      color: "text-pink-600",
      bg: "bg-pink-100",
    },
    {
      time: "10h45",
      title: "Session de musique",
      description: "A participé au chant de groupe",
      icon: Music,
      color: "text-pink-600",
      bg: "bg-pink-100",
    },
    {
      time: "11h30",
      title: "Jeu en extérieur",
      description: "A profité des activités dans la cour",
      icon: Trees,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      time: "14h15",
      title: "Heure du conte",
      description: "A écouté 'La chenille qui fait des trous'",
      icon: Book,
      color: "text-pink-600",
      bg: "bg-pink-100",
    },
  ]

  const children = [
    {
      id: "1",
      name: "Emma Martin",
      age: "3 ans",
      initials: "EM",
      status: "present",
      group: "Papillons",
      educator: "Marie Dubois",
    },
    {
      id: "2",
      name: "Lucas Martin",
      age: "5 ans",
      initials: "LM",
      status: "absent",
      group: "Lions",
      educator: "Jean Petit",
    },
    {
      id: "3",
      name: "Sophie Martin",
      age: "1 an",
      initials: "SM",
      status: "pending",
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "present":
        return <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">Présent</span>
      case "absent":
        return <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">Absent</span>
      case "pending":
        return (
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">En attente</span>
        )
      default:
        return null
    }
  }

  return (
    <div className="mx-auto max-w-6xl">
      {/* Success Alert */}
      {showSuccess && (
        <div className="mb-6 rounded-md border border-green-200 bg-green-50 p-4 text-green-800">
          <div className="flex">
            <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div className="ml-3">
              <h3 className="font-medium">Inscription réussie</h3>
              <p className="mt-1 text-sm">
                Votre enfant a été inscrit avec succès. Notre équipe examinera les informations et vous contactera
                bientôt.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex flex-col items-start justify-between space-y-4 border-b border-gray-200 pb-6 md:flex-row md:items-center md:space-y-0">
        <div className="flex items-center">
          <div className="mr-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-xl font-medium">
            EM
          </div>
          <div>
            <h1 className="text-2xl font-medium text-gray-800">Bienvenue, Sophie!</h1>
            <p className="text-gray-600">Voici ce qui se passe avec vos enfants aujourd'hui</p>
          </div>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.title} className="rounded-lg bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-gray-700">{card.title}</h3>
              <div className={`rounded-full ${card.iconBg} p-2`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </div>
            <div>
              <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
              <p className="text-xs text-gray-500">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <h3 className="mb-4 text-lg font-medium text-gray-800">Activités d'aujourd'hui</h3>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start">
                <div className={`mr-4 rounded-full ${activity.bg} p-2`}>
                  <activity.icon className={`h-4 w-4 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-800">{activity.title}</h4>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Children Overview */}
      <div className="mt-6">
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-800">Vos enfants</h3>
            <p className="text-sm text-gray-600">Aperçu de tous vos enfants inscrits</p>
          </div>
          <div className="space-y-4">
            {children.map((child) => (
              <div
                key={child.id}
                className="flex flex-col justify-between rounded-md bg-pink-50 p-4 sm:flex-row sm:items-center"
              >
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-medium">
                    {child.initials}
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      <h4 className="font-medium text-gray-800">{child.name}</h4>
                      <div className="ml-2">{getStatusBadge(child.status)}</div>
                    </div>
                    <p className="text-sm text-gray-600">{child.age}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between sm:mt-0">
                  {child.status !== "pending" ? (
                    <div className="mr-4 text-right">
                      <p className="text-sm font-medium text-gray-800">{child.group}</p>
                      <p className="text-xs text-gray-600">Éducateur: {child.educator}</p>
                    </div>
                  ) : (
                    <div className="mr-4 text-right">
                      <p className="text-sm text-amber-600">Inscription en cours d'examen</p>
                      <p className="text-xs text-gray-600">Nous vous contacterons bientôt</p>
                    </div>
                  )}
                  <Link
                    to={`/profile?child=${child.id}`}
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <span className="mr-1">Voir</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}

            <Link
              to="/register-child"
              className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Plus className="mr-2 h-4 w-4" />
              Inscrire un autre enfant
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
