"use client"

import { useState } from "react"
import { Home, MessageSquare, Moon, Menu, X, CalendarCheck, Heart } from "lucide-react"

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { id: "dashboard", name: "Accueil", icon: Home },
    { id: "attendance", name: "Présences", icon: CalendarCheck },
    { id: "remarks", name: "Remarques", icon: MessageSquare },
    { id: "naps", name: "Siestes", icon: Moon },
  ]

  return (
    <div className="flex h-screen bg-pink-50">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-white shadow-lg transition-all duration-300 flex flex-col hidden md:flex`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-pink-200 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-pink-500" />
              <h1 className="text-xl font-bold text-pink-600">Crèche</h1>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md hover:bg-pink-100 text-pink-600"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? "bg-pink-100 text-pink-600 border-r-4 border-pink-500"
                        : "hover:bg-pink-50 text-gray-600 hover:text-pink-600"
                    }`}
                    title={!sidebarOpen ? item.name : ""}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {sidebarOpen && <span className="ml-3 font-medium">{item.name}</span>}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        {sidebarOpen && (
          <div className="p-4 border-t border-pink-200">
            <div className="text-xs text-gray-500 text-center">Crèche Management v1.0</div>
          </div>
        )}
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
            {/* Mobile Sidebar Header */}
            <div className="p-4 border-b border-pink-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-pink-500" />
                <h1 className="text-xl font-bold text-pink-600">Tiny Tots</h1>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-md hover:bg-pink-100 text-pink-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="p-4">
              <ul className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setActiveTab(item.id)
                          setMobileMenuOpen(false)
                        }}
                        className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                          activeTab === item.id
                            ? "bg-pink-100 text-pink-600"
                            : "hover:bg-pink-50 text-gray-600 hover:text-pink-600"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="ml-3 font-medium">{item.name}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header for Mobile */}
        <header className="md:hidden bg-white border-b border-pink-200 p-4 flex items-center justify-between">
          <button onClick={() => setMobileMenuOpen(true)} className="p-2 rounded-md hover:bg-pink-100 text-pink-600">
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-500" />
            <span className="font-semibold text-pink-600">Tiny Tots</span>
          </div>
          <div></div>
        </header>

        {/* Page Header */}
        <header className="bg-white border-b border-pink-200 p-4 hidden md:block">
          <h1 className="text-xl font-semibold text-pink-600">
            {activeTab === "dashboard" && "Tableau de Bord"}
            {activeTab === "attendance" && "Gestion des Présences"}
            {activeTab === "remarks" && "Remarques Quotidiennes"}
            {activeTab === "naps" && "Suivi des Siestes"}
          </h1>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-0 md:p-6 w-full">

          {activeTab === "dashboard" && <EducatorDashboard setActiveTab={setActiveTab} />}
          {activeTab === "attendance" && <AttendanceManagement />}
          {activeTab === "remarks" && <RemarksForm />}
          {activeTab === "naps" && <NapTracking />}
        </main>
      </div>
    </div>
  )
}

function EducatorDashboard({ setActiveTab }) {
  const stats = {
    present: 15,
    absent: 3,
    remarks: 8,
    naps: 12,
  }

  const quickActions = [
    { id: "attendance", name: "Présences", icon: CalendarCheck, description: "Marquer les présences" },
    { id: "remarks", name: "Remarques", icon: MessageSquare, description: "Ajouter des observations" },
    { id: "naps", name: "Siestes", icon: Moon, description: "Suivre les siestes" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bienvenue !</h1>
        <p className="text-gray-600">Voici un aperçu de votre journée</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="bg-white rounded-xl border border-pink-200 p-6 shadow-sm">
          <div className="text-3xl font-bold text-pink-600 mb-1">{stats.present}</div>
          <p className="text-sm text-gray-600">Enfants Présents</p>
        </div>
        <div className="bg-white rounded-xl border border-pink-200 p-6 shadow-sm">
          <div className="text-3xl font-bold text-pink-600 mb-1">{stats.absent}</div>
          <p className="text-sm text-gray-600">Enfants Absents</p>
        </div>
        <div className="bg-white rounded-xl border border-pink-200 p-6 shadow-sm">
          <div className="text-3xl font-bold text-pink-600 mb-1">{stats.remarks}</div>
          <p className="text-sm text-gray-600">Remarques Ajoutées</p>
        </div>
        <div className="bg-white rounded-xl border border-pink-200 p-6 shadow-sm">
          <div className="text-3xl font-bold text-pink-600 mb-1">{stats.naps}</div>
          <p className="text-sm text-gray-600">Siestes Enregistrées</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <button
                key={action.id}
                onClick={() => setActiveTab(action.id)}
                className="bg-white border border-pink-200 rounded-xl p-6 text-left hover:bg-pink-50 hover:border-pink-300 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-pink-100 rounded-lg">
                    <Icon className="h-6 w-6 text-pink-600" />
                  </div>
                  <span className="font-semibold text-gray-900">{action.name}</span>
                </div>
                <p className="text-sm text-gray-600">{action.description}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-xl border border-pink-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Programme du Jour</h3>
        <div className="space-y-3">
          {[
            { time: "09:00", activity: "Accueil et jeux libres" },
            { time: "10:30", activity: "Collation du matin" },
            { time: "11:00", activity: "Activités dirigées" },
            { time: "12:00", activity: "Déjeuner" },
            { time: "13:00", activity: "Sieste" },
            { time: "15:00", activity: "Réveil et goûter" },
            { time: "16:00", activity: "Jeux extérieurs" },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-pink-50">
              <div className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium">{item.time}</div>
              <span className="text-gray-700">{item.activity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AttendanceManagement() {
  const [children, setChildren] = useState([
    { id: 1, name: "Emma Johnson", present: true, time: "08:30" },
    { id: 2, name: "Lucas Martin", present: true, time: "08:45" },
    { id: 3, name: "Chloé Dubois", present: false, time: "" },
    { id: 4, name: "Noah Leroy", present: true, time: "09:00" },
    { id: 5, name: "Jade Moreau", present: true, time: "08:15" },
    { id: 6, name: "Louis Bernard", present: false, time: "" },
    { id: 7, name: "Alice Petit", present: true, time: "08:50" },
    { id: 8, name: "Gabriel Simon", present: true, time: "09:10" },
  ])

  const handleToggle = (id) => {
    setChildren(
      children.map((child) =>
        child.id === id
          ? {
              ...child,
              present: !child.present,
              time: !child.present
                ? new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
                : "",
            }
          : child,
      ),
    )
  }

  const handleTimeChange = (id, value) => {
    setChildren(children.map((child) => (child.id === id ? { ...child, time: value } : child)))
  }

  const handleSave = () => {
    alert("Présences enregistrées avec succès !")
  }

  const presentCount = children.filter((child) => child.present).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Présences du Jour</h1>
          <p className="text-gray-600">Marquez les présences des enfants</p>
        </div>
        <div className="bg-pink-100 text-pink-700 px-4 py-2 rounded-lg">
          <span className="font-semibold">
            {presentCount}/{children.length}
          </span>{" "}
          présents
        </div>
      </div>

      <div className="bg-white rounded-xl border border-pink-200 shadow-sm">
        <div className="p-6">
          <div className="space-y-3">
            {children.map((child) => (
              <div
                key={child.id}
                className="flex items-center justify-between p-4 rounded-lg bg-pink-50 border border-pink-100"
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={child.present}
                    onChange={() => handleToggle(child.id)}
                    className="h-5 w-5 text-pink-600 border-pink-300 rounded focus:ring-pink-500"
                  />
                  <span className="font-medium text-gray-900">{child.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Arrivée:</span>
                  <input
                    type="time"
                    value={child.time}
                    onChange={(e) => handleTimeChange(child.id, e.target.value)}
                    disabled={!child.present}
                    className="px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 disabled:bg-gray-100 disabled:text-gray-400"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 font-medium"
            >
              Enregistrer les Présences
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function RemarksForm() {
  const [selectedChild, setSelectedChild] = useState("")
  const [category, setCategory] = useState("general")
  const [content, setContent] = useState("")
  const [remarks, setRemarks] = useState([
    {
      id: 1,
      childName: "Emma Johnson",
      category: "health",
      content: "Emma a eu un peu de fièvre ce matin, mais elle va mieux maintenant.",
      time: "10:30",
    },
    {
      id: 2,
      childName: "Noah Leroy",
      category: "social",
      content: "Noah a bien participé aux activités de groupe et a aidé ses camarades.",
      time: "14:15",
    },
  ])

  const children = [
    "Emma Johnson",
    "Lucas Martin",
    "Chloé Dubois",
    "Noah Leroy",
    "Jade Moreau",
    "Louis Bernard",
    "Alice Petit",
    "Gabriel Simon",
  ]

  const categories = [
    { value: "general", label: "Général", color: "bg-gray-100 text-gray-700" },
    { value: "health", label: "Santé", color: "bg-red-100 text-red-700" },
    { value: "social", label: "Social", color: "bg-blue-100 text-blue-700" },
    { value: "emotional", label: "Émotionnel", color: "bg-purple-100 text-purple-700" },
    { value: "learning", label: "Apprentissage", color: "bg-green-100 text-green-700" },
  ]

  const handleSubmit = () => {
    if (!selectedChild || !content.trim()) {
      alert("Veuillez sélectionner un enfant et saisir une remarque")
      return
    }

    const newRemark = {
      id: remarks.length + 1,
      childName: selectedChild,
      category,
      content: content.trim(),
      time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
    }

    setRemarks([newRemark, ...remarks])
    alert("Remarque ajoutée avec succès !")
    setContent("")
  }

  const getCategoryInfo = (cat) => categories.find((c) => c.value === cat) || categories[0]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Remarques Quotidiennes</h1>
        <p className="text-gray-600">Ajoutez des observations sur les enfants</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form */}
        <div className="bg-white rounded-xl border border-pink-200 shadow-sm p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Nouvelle Remarque</h3>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Enfant</label>
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="w-full px-3 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="">Sélectionner un enfant</option>
              {children.map((child) => (
                <option key={child} value={child}>
                  {child}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Catégorie</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Remarque</label>
            <textarea
              placeholder="Saisissez votre observation..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full px-4 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 font-medium"
          >
            Ajouter la Remarque
          </button>
        </div>

        {/* Remarks List */}
        <div className="bg-white rounded-xl border border-pink-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Remarques du Jour</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {remarks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">Aucune remarque pour aujourd'hui</div>
            ) : (
              remarks.map((remark) => {
                const categoryInfo = getCategoryInfo(remark.category)
                return (
                  <div key={remark.id} className="p-4 rounded-lg bg-pink-50 border border-pink-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{remark.childName}</span>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryInfo.color}`}>
                          {categoryInfo.label}
                        </span>
                        <span className="text-xs text-gray-500">{remark.time}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{remark.content}</p>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function NapTracking() {
  const [children, setChildren] = useState([
    { id: 1, name: "Emma Johnson", startTime: "13:00", endTime: "14:30" },
    { id: 2, name: "Lucas Martin", startTime: "12:45", endTime: "14:15" },
    { id: 3, name: "Chloé Dubois", startTime: "", endTime: "" },
    { id: 4, name: "Noah Leroy", startTime: "13:15", endTime: "15:00" },
    { id: 5, name: "Jade Moreau", startTime: "12:30", endTime: "14:00" },
    { id: 6, name: "Louis Bernard", startTime: "", endTime: "" },
    { id: 7, name: "Alice Petit", startTime: "13:00", endTime: "14:45" },
    { id: 8, name: "Gabriel Simon", startTime: "13:10", endTime: "14:20" },
  ])

  const handleTimeChange = (id, field, value) => {
    setChildren(children.map((child) => (child.id === id ? { ...child, [field]: value } : child)))
  }

  const calculateDuration = (start, end) => {
    if (!start || !end) return "-"
    const [startH, startM] = start.split(":").map(Number)
    const [endH, endM] = end.split(":").map(Number)
    const duration = endH * 60 + endM - (startH * 60 + startM)
    if (duration < 0) return "-"
    const hours = Math.floor(duration / 60)
    const minutes = duration % 60
    return `${hours}h${minutes.toString().padStart(2, "0")}`
  }

  const handleSave = () => {
    alert("Siestes enregistrées avec succès !")
  }

  const completedNaps = children.filter((child) => child.startTime && child.endTime).length
  const averageDuration = () => {
    const durations = children
      .filter((child) => child.startTime && child.endTime)
      .map((child) => {
        const [startH, startM] = child.startTime.split(":").map(Number)
        const [endH, endM] = child.endTime.split(":").map(Number)
        return endH * 60 + endM - (startH * 60 + startM)
      })

    if (durations.length === 0) return "-"
    const avg = durations.reduce((a, b) => a + b, 0) / durations.length
    const hours = Math.floor(avg / 60)
    const minutes = Math.round(avg % 60)
    return `${hours}h${minutes.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Suivi des Siestes</h1>
          <p className="text-gray-600">Enregistrez les heures de sieste des enfants</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-pink-100 text-pink-700 px-4 py-2 rounded-lg text-center">
            <div className="font-semibold">{completedNaps}</div>
            <div className="text-xs">Siestes terminées</div>
          </div>
          <div className="bg-pink-100 text-pink-700 px-4 py-2 rounded-lg text-center">
            <div className="font-semibold">{averageDuration()}</div>
            <div className="text-xs">Durée moyenne</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-pink-200 shadow-sm">
        <div className="p-6">
          <div className="space-y-4">
            {children.map((child) => (
              <div key={child.id} className="p-4 rounded-lg bg-pink-50 border border-pink-100">
                <div className="font-medium mb-3 text-gray-900">{child.name}</div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Début de sieste</label>
                    <input
                      type="time"
                      value={child.startTime}
                      onChange={(e) => handleTimeChange(child.id, "startTime", e.target.value)}
                      className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Fin de sieste</label>
                    <input
                      type="time"
                      value={child.endTime}
                      onChange={(e) => handleTimeChange(child.id, "endTime", e.target.value)}
                      className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Durée</label>
                    <div className="h-10 flex items-center font-medium text-pink-600 bg-white border border-pink-200 rounded-md px-3">
                      {calculateDuration(child.startTime, child.endTime)}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Statut</label>
                    <div className="h-10 flex items-center">
                      {child.startTime && child.endTime ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          Terminée
                        </span>
                      ) : child.startTime ? (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                          En cours
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                          Non commencée
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 font-medium"
            >
              Enregistrer les Siestes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
