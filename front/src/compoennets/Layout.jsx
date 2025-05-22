"use client"

import { useState } from "react"
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import { Home, User, ClipboardList, LogOut, Menu, X, Plus, ChevronDown, Check } from "lucide-react"

function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedChild, setSelectedChild] = useState({
    id: "1",
    name: "Emma Martin",
    age: "3 ans",
    avatar: null,
    initials: "EM",
    status: "present",
  })
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const navItems = [
    { name: "Tableau de bord", href: "/dashboard", icon: Home },
    { name: "Profil de l'enfant", href: "/profile", icon: User },
    { name: "Suivi quotidien", href: "/daily-tracking", icon: ClipboardList },
  ]

  const children = [
    {
      id: "1",
      name: "Emma Martin",
      age: "3 ans",
      avatar: null,
      initials: "EM",
      status: "present",
    },
    {
      id: "2",
      name: "Lucas Martin",
      age: "5 ans",
      avatar: null,
      initials: "LM",
      status: "absent",
    },
    {
      id: "3",
      name: "Sophie Martin",
      age: "1 an",
      avatar: null,
      initials: "SM",
      status: "pending",
    },
  ]

  const handleSelectChild = (child) => {
    setSelectedChild(child)
    setIsDropdownOpen(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "present":
        return "bg-green-500"
      case "absent":
        return "bg-red-500"
      case "pending":
        return "bg-amber-500"
      default:
        return "bg-gray-500"
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div className="flex min-h-screen bg-pink-50">
      {/* Mobile menu button */}
      <button
        className="fixed left-4 top-4 z-50 rounded-md p-2 text-gray-700 hover:bg-pink-100 md:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden" onClick={closeSidebar} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white p-6 shadow-lg transition-transform duration-200 md:static md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button (mobile only) */}
        <button
          className="absolute right-4 top-4 rounded-md p-2 text-gray-700 hover:bg-pink-100 md:hidden"
          onClick={closeSidebar}
        >
          <X className="h-6 w-6" />
        </button>

        {/* Logo and title */}
        <div className="mb-8 flex items-center">
          <div className="mr-2 rounded-md bg-pink-500 p-1">
            <span className="text-xl font-bold text-white">C</span>
          </div>
          <span className="text-xl font-bold text-gray-800">Crèche</span>
        </div>

        {/* Children selector */}
        <div className="mb-6 space-y-2">
          <h3 className="px-3 text-sm font-medium text-gray-500">VOS ENFANTS</h3>
          <div className="space-y-1">
            {children.map((child) => (
              <div
                key={child.id}
                className={`flex cursor-pointer items-center rounded-md px-3 py-2 text-sm font-medium ${
                  selectedChild.id === child.id ? "bg-pink-100 text-pink-600" : "hover:bg-gray-100"
                }`}
                onClick={() => handleSelectChild(child)}
              >
                <div className="relative mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-medium">
                  {child.initials}
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full ${getStatusColor(child.status)} ring-1 ring-white`}
                  />
                </div>
                <span>{child.name}</span>
                {child.status === "pending" && (
                  <span className="ml-auto rounded-full bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-800">
                    En attente
                  </span>
                )}
              </div>
            ))}
            <button
              className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => navigate("/register-child")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Inscrire un enfant
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === item.href ? "bg-pink-100 text-pink-600" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => {
                if (window.innerWidth < 768) {
                  closeSidebar()
                }
              }}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Logout button */}
        <div className="absolute bottom-6 left-6 right-6">
          <button
            className="flex w-full items-center justify-start rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            onClick={() => navigate("/login")}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Déconnexion
          </button>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="relative">
          {/* Child selector dropdown (mobile) */}
          <div className="mb-6 flex items-center justify-end md:hidden">
            <div className="relative">
              <button
                className="flex items-center gap-2 rounded-md border border-gray-300 pl-3 pr-2 py-1.5"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-medium">
                    {selectedChild.initials}
                  </div>
                  <span className="max-w-[150px] truncate font-medium">{selectedChild.name}</span>
                  <div className={`h-2 w-2 rounded-full ${getStatusColor(selectedChild.status)}`} />
                </div>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-1 w-[220px] rounded-md border border-gray-200 bg-white shadow-lg z-10">
                  {children.map((child) => (
                    <div
                      key={child.id}
                      className="flex cursor-pointer items-center justify-between p-2 hover:bg-gray-100"
                      onClick={() => handleSelectChild(child)}
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium">
                          {child.initials}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{child.name}</p>
                          <p className="text-xs text-gray-500">{child.age}</p>
                        </div>
                      </div>
                      {selectedChild.id === child.id && <Check className="h-4 w-4" />}
                    </div>
                  ))}
                  <div className="border-t border-gray-200"></div>
                  <div
                    className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100"
                    onClick={() => navigate("/register-child")}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100">
                      <Plus className="h-4 w-4 text-pink-600" />
                    </div>
                    <p className="text-sm font-medium">Inscrire un enfant</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout
