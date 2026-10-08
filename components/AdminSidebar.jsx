"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const [loggingOut, setLoggingOut] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      });

      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
      setLoggingOut(false);
    }
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-slate-950 text-white h-16 flex items-center justify-between px-5">
        <h2 className="font-bold">🔐 Admin Panel</h2>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-2xl"
        >
          {sidebarOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          w-64
          h-screen
          bg-slate-950
          text-white
          transform
          transition-transform
          duration-300
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="px-6 py-7 border-b border-slate-800">
          <h2 className="text-xl font-bold">🔐 Admin Panel</h2>

          <p className="mt-1 text-sm text-slate-400">Website Management</p>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {/* Dashboard */}
          <button
            onClick={() => {
              router.push("/admin");
              closeSidebar();
            }}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
              pathname === "/admin"
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            🏠 Dashboard
          </button>

          {/* Messages */}
          <button
            onClick={() => {
              router.push("/admin/message");
              closeSidebar();
            }}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
              pathname.startsWith("/admin/message")
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            💬 Messages
          </button>
          {/* Products */}
          <button
            onClick={() => {
              router.push("/admin/products");
              closeSidebar();
            }}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
              pathname.startsWith("/admin/products")
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            📦 Products
          </button>

          {/* Website */}
          <button
            onClick={() => {
              router.push("/");
              closeSidebar();
            }}
            className="w-full text-left px-4 py-3 rounded-lg font-medium text-slate-300 hover:bg-slate-800 transition"
          >
            🌐 Visit Website
          </button>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full text-left px-4 py-3 rounded-lg font-medium text-red-400 hover:bg-red-500/10 transition disabled:opacity-50"
          >
            {loggingOut ? "Logging out..." : "🚪 Logout"}
          </button>
        </div>
      </aside>
    </>
  );
}
