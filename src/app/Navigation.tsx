"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Sluit menu bij resize naar desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <>
      {/* Desktop zijbalk */}
      <nav className="hidden md:fixed md:top-0 md:left-0 md:h-full md:w-64 md:bg-gradient-to-b md:from-blue-50 md:to-white md:border-r-2 md:border-gray-100 md:flex md:flex-col md:shadow-lg md:z-40">
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

      {/* Mobiel hamburger menu */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b-2 border-gray-100 shadow z-50">
        <Link href="/" className="flex items-center space-x-2">
          <span className="bg-white rounded-lg shadow p-2">
            <span className="text-xl font-extrabold text-[#f15a24]">z</span>
            <span className="text-xl font-extrabold text-[#009fe3]">w</span>
            <span className="text-xl font-extrabold text-[#fbbd16]">i</span>
            <span className="text-xl font-extrabold text-[#8dc63f]">j</span>
            <span className="text-xl font-extrabold text-[#ed1e79]">s</span>
            <span className="text-xl font-extrabold text-[#00a99d]">e</span>
          </span>
        </Link>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-md text-gray-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {/* Mobiel overlay menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex">
          <nav className="w-64 bg-gradient-to-b from-blue-50 to-white h-full shadow-lg flex flex-col p-8">
            <div className="mb-8">
              <Link href="/" className="flex items-center space-x-2">
                <span className="bg-white rounded-lg shadow p-2">
                  <span className="text-3xl font-extrabold text-[#f15a24]">z</span>
                  <span className="text-3xl font-extrabold text-[#009fe3]">w</span>
                  <span className="text-3xl font-extrabold text-[#fbbd16]">i</span>
                  <span className="text-3xl font-extrabold text-[#8dc63f]">j</span>
                  <span className="text-3xl font-extrabold text-[#ed1e79]">s</span>
                  <span className="text-3xl font-extrabold text-[#00a99d]">e</span>
                </span>
              </Link>
            </div>
            <div className="flex flex-col w-full space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`w-full px-6 py-4 rounded-xl text-lg font-semibold text-left transition-all ${
                    pathname === item.href
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-auto w-full pt-8">
              <button
                onClick={handleLogout}
                className="w-full px-6 py-4 rounded-xl text-lg font-semibold text-white bg-red-600 hover:bg-red-700 shadow-md transition-all"
              >
                Uitloggen
              </button>
            </div>
          </nav>
          <div className="flex-1" onClick={() => setIsMenuOpen(false)} />
        </div>
      )}
    </>
  );
} 