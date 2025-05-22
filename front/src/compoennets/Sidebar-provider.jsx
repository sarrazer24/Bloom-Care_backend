"use client";

import { createContext, useContext, useState, useEffect } from "react";

const SidebarContext = createContext(undefined);

export function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [kids, setKids] = useState([]); // <-- Renamed

  // Close sidebar on window resize (for mobile)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Example: fetch all children for the parent (token required)
  useEffect(() => {
    const fetchChildren = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://bloom-care-backend.onrender.com/children/mine/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setKids(data); // <-- Renamed
      }
    };
    fetchChildren();
  }, []);

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, close, kids }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
