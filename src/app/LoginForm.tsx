"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface LoginFormData {
  email: string;
  wachtwoord: string;
}

export default function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    wachtwoord: ""
  });
  const [error, setError] = useState<string | null>(null);

  // Check of gebruiker al is ingelogd
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      onLogin();
    }
  }, [onLogin]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Simpele validatie
    if (!formData.email || !formData.wachtwoord) {
      setError("Vul alle velden in");
      return;
    }

    // Email validatie
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Vul een geldig e-mailadres in");
      return;
    }

    // Accepteer elke geldige e-mail en wachtwoord combinatie
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", formData.email);
    onLogin();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border-4 border-blue-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-blue-800 mb-2">Welkom terug!</h2>
          <p className="text-gray-800">Log in om door te gaan</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-1">
              E-mailadres
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              placeholder="jouw@email.nl"
            />
          </div>

          <div>
            <label htmlFor="wachtwoord" className="block text-sm font-semibold text-gray-900 mb-1">
              Wachtwoord
            </label>
            <input
              type="password"
              id="wachtwoord"
              name="wachtwoord"
              value={formData.wachtwoord}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="text-red-700 text-sm bg-red-50 p-3 rounded-lg border border-red-200">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-700 to-purple-700 text-white py-3 px-4 rounded-lg font-bold hover:from-blue-800 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md"
          >
            Inloggen
          </button>
        </form>

        <div className="mt-6 text-center">
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-800 mb-2">Nog geen account?</p>
            <Link
              href="/register"
              className="inline-block bg-gray-100 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all border border-gray-300"
            >
              Registreren als docent
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 