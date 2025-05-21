"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    window.location.href = "/";
  };

  const menuItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/scannen", label: "Scannen" },
    { href: "/documenten", label: "Documenten" },
    { href: "/instellingen", label: "Instellingen" },
  ];

  return (
    <nav className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-50 to-white border-r-2 border-gray-100 flex flex-col shadow-lg z-40">
      <div className="flex flex-col items-center py-8 px-4">
        <div className="mb-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="bg-white rounded-lg shadow p-2">
              <span className="text-3xl font-extrabold text-[#f15a24]">z</span>
              <span className="text-3xl font-extrabold text-[#009fe3]">w</span>
              <span className="text-3xl font-extrabold text-[#fbbd16]">i</span>
              <span className="text-3xl font-extrabold text-[#8dc63f]">j</span>
              <span className="text-3xl font-extrabold text-[#ed1e79]">s</span>
              <span className="text-3xl font-extrabold text-[#00a99d]">e</span>
              <span className="text-xs block text-gray-500 font-normal">Breng leren tot leven</span>
            </span>
          </Link>
        </div>
        <div className="flex flex-col w-full space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full px-6 py-3 rounded-xl text-lg font-semibold text-left transition-all ${
                pathname === item.href
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="mt-auto w-full pt-8">
          <button
            onClick={handleLogout}
            className="w-full px-6 py-3 rounded-xl text-lg font-semibold text-white bg-red-600 hover:bg-red-700 shadow-md transition-all"
          >
            Uitloggen
          </button>
        </div>
      </div>
    </nav>
  );
} 