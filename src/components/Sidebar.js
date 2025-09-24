"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/app/store/auth/auth.slice";

export default function Sidebar({ activePage, setActivePage, sidebarOpen, setSidebarOpen }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "account", label: "Account", icon: "👤" },
    { id: "news", label: "Manage News", icon: "📰" },
    { id: "services", label: "Manage Services", icon: "🛠️" },
    { id: "about", label: "About Settings", icon: "ℹ️" },
    { id: "contact", label: "Contact", icon: "✉️" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];


  const handleLogout = () => {
    return logout(router);
  };
  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-50 bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition duration-300 ease-in-out z-30 w-64 bg-gray-50  text-black min-h-screen p-6 md:relative md:flex md:flex-col shadow-xl`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-black font-bold text-lg">N</span>
            </div>
            <h2 className="text-xl font-bold">Nrs</h2>
          </div>
          <button
            className="md:hidden p-1 rounded hover:bg-gray-700 transition"
            onClick={() => setSidebarOpen(false)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu */}
        <nav className="space-y-1 flex-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
                activePage === item.id
                  ? "bg-[#d97706] text-white shadow-md"
                  : "text-gray-900 hover:bg-gray-700 hover:text-white"
              }`}
              onClick={() => {
                setActivePage(item.id);
                setSidebarOpen(false);
              }}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
              {activePage === item.id && (
                <span className="ml-auto w-2 h-2 bg-[#d97706] rounded-full"></span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="pt-6 mt-6 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full mt-4 py-2 px-4 bg-red-600 hover:bg-red-500 rounded-lg text-sm transition-all flex items-center justify-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
