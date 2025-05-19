"use client";

import { useState } from "react";

interface FormData {
  naam: string;
  email: string;
  school: string;
  klas: string;
  vak: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    naam: "",
    email: "",
    school: "",
    klas: "",
    vak: ""
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Simpele validatie
    if (!formData.naam || !formData.email || !formData.school || !formData.klas || !formData.vak) {
      setError("Vul alle velden in");
      return;
    }

    // Email validatie
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Vul een geldig e-mailadres in");
      return;
    }

    // Sla de gegevens op in localStorage
    localStorage.setItem("userData", JSON.stringify(formData));
    setIsLoggedIn(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isLoggedIn) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-gray-900 text-2xl font-bold mb-2">Welkom bij de Document Scanner</h2>
          <p className="text-gray-600">Vul je gegevens in om te beginnen</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="naam" className="block text-sm font-medium text-gray-900 mb-1">
              Naam
            </label>
            <input
              type="text"
              id="naam"
              name="naam"
              value={formData.naam}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-500"
              placeholder="Jouw naam"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">
              E-mailadres
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-500"
              placeholder="jouw@email.nl"
            />
          </div>

          <div>
            <label htmlFor="school" className="block text-sm font-medium text-gray-900 mb-1">
              School
            </label>
            <input
              type="text"
              id="school"
              name="school"
              value={formData.school}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-500"
              placeholder="Naam van je school"
            />
          </div>

          <div>
            <label htmlFor="klas" className="block text-sm font-medium text-gray-900 mb-1">
              Klas
            </label>
            <select
              id="klas"
              name="klas"
              value={formData.klas}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-500"
            >
              <option value="">Selecteer een klas</option>
              <option value="groep 1">Groep 1</option>
              <option value="groep 2">Groep 2</option>
              <option value="groep 3">Groep 3</option>
              <option value="groep 4">Groep 4</option>
              <option value="groep 5">Groep 5</option>
              <option value="groep 6">Groep 6</option>
              <option value="groep 7">Groep 7</option>
              <option value="groep 8">Groep 8</option>
            </select>
          </div>

          <div>
            <label htmlFor="vak" className="block text-sm font-medium text-gray-900 mb-1">
              Vak
            </label>
            <select
              id="vak"
              name="vak"
              value={formData.vak}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-500"
            >
              <option value="">Selecteer een vak</option>
              <option value="rekenen">Rekenen</option>
              <option value="taal">Taal</option>
              <option value="spelling">Spelling</option>
              <option value="lezen">Lezen</option>
              <option value="schrijven">Schrijven</option>
              <option value="overig">Overig</option>
            </select>
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Start met Scannen
          </button>
        </form>
      </div>
    </div>
  );
} 