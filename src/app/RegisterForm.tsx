"use client";

import { useState } from "react";
import Link from "next/link";
import NextImage from "next/image";

interface RegisterFormData {
  voornaam: string;
  achternaam: string;
  docentId: string;
  email: string;
  wachtwoord: string;
  wachtwoordBevestigen: string;
  schoolNaam: string;
  schoolType: string;
  vakken: string[];
  groepen: string[];
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    voornaam: "",
    achternaam: "",
    docentId: "",
    email: "",
    wachtwoord: "",
    wachtwoordBevestigen: "",
    schoolNaam: "",
    schoolType: "",
    vakken: [],
    groepen: []
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const vakkenOpties = [
    "Rekenen",
    "Taal",
    "Spelling",
    "Lezen",
    "Schrijven",
    "Aardrijkskunde",
    "Geschiedenis",
    "Natuur & Techniek",
    "Engels",
    "Kunst & Cultuur"
  ];

  const groepenOpties = [
    "Groep 1",
    "Groep 2",
    "Groep 3",
    "Groep 4",
    "Groep 5",
    "Groep 6",
    "Groep 7",
    "Groep 8"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validatie
    if (!formData.voornaam || !formData.achternaam || !formData.docentId || 
        !formData.email || !formData.wachtwoord || !formData.wachtwoordBevestigen || 
        !formData.schoolNaam || !formData.schoolType || 
        formData.vakken.length === 0 || formData.groepen.length === 0) {
      setError("Vul alle verplichte velden in");
      return;
    }

    // Email validatie
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Vul een geldig e-mailadres in");
      return;
    }

    // Wachtwoord validatie
    if (formData.wachtwoord.length < 8) {
      setError("Wachtwoord moet minimaal 8 tekens lang zijn");
      return;
    }

    if (formData.wachtwoord !== formData.wachtwoordBevestigen) {
      setError("Wachtwoorden komen niet overeen");
      return;
    }

    // In productie zou je hier een API call doen om de gebruiker te registreren
    // Voor nu simuleren we een succesvolle registratie
    setSuccess(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked 
        ? [...prev[name as keyof typeof prev], value]
        : (prev[name as keyof typeof prev] as string[]).filter(item => item !== value)
    }));
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border-4 border-green-300">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-green-700 mb-4">Registratie Succesvol!</h2>
            <p className="text-gray-800 mb-6">Je account is aangemaakt. Je kunt nu inloggen met je e-mailadres en wachtwoord.</p>
            <Link 
              href="/"
              className="inline-block bg-gradient-to-r from-blue-700 to-purple-700 text-white py-3 px-6 rounded-lg font-bold hover:from-blue-800 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md"
            >
              Ga naar inlogscherm
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-4 border-4 border-blue-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-blue-800 mb-2">Registreren als Docent</h2>
          <p className="text-gray-800">Vul je gegevens in om een account aan te maken</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="voornaam" className="block text-sm font-semibold text-gray-900 mb-1">
                Voornaam *
              </label>
              <input
                type="text"
                id="voornaam"
                name="voornaam"
                value={formData.voornaam}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="Jouw voornaam"
              />
            </div>

            <div>
              <label htmlFor="achternaam" className="block text-sm font-semibold text-gray-900 mb-1">
                Achternaam *
              </label>
              <input
                type="text"
                id="achternaam"
                name="achternaam"
                value={formData.achternaam}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="Jouw achternaam"
              />
            </div>

            <div>
              <label htmlFor="docentId" className="block text-sm font-semibold text-gray-900 mb-1">
                Docent ID *
              </label>
              <input
                type="text"
                id="docentId"
                name="docentId"
                value={formData.docentId}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="Bijv. DOC12345"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-1">
                E-mailadres *
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
                Wachtwoord *
              </label>
              <input
                type="password"
                id="wachtwoord"
                name="wachtwoord"
                value={formData.wachtwoord}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="Minimaal 8 tekens"
              />
            </div>

            <div>
              <label htmlFor="wachtwoordBevestigen" className="block text-sm font-semibold text-gray-900 mb-1">
                Bevestig wachtwoord *
              </label>
              <input
                type="password"
                id="wachtwoordBevestigen"
                name="wachtwoordBevestigen"
                value={formData.wachtwoordBevestigen}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="Herhaal je wachtwoord"
              />
            </div>

            <div>
              <label htmlFor="schoolNaam" className="block text-sm font-semibold text-gray-900 mb-1">
                Naam school *
              </label>
              <input
                type="text"
                id="schoolNaam"
                name="schoolNaam"
                value={formData.schoolNaam}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="Naam van je school"
              />
            </div>

            <div>
              <label htmlFor="schoolType" className="block text-sm font-semibold text-gray-900 mb-1">
                Type school *
              </label>
              <select
                id="schoolType"
                name="schoolType"
                value={formData.schoolType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="">Selecteer type school</option>
                <option value="basisschool">Basisschool</option>
                <option value="speciaal onderwijs">Speciaal Onderwijs</option>
                <option value="sbo">SBO</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Vakken die je geeft *
              </label>
              <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {vakkenOpties.map(vak => (
                    <label key={vak} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="vakken"
                        value={vak}
                        checked={formData.vakken.includes(vak)}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-blue-700 focus:ring-blue-500 border-gray-400 rounded"
                      />
                      <span className="text-gray-900">{vak}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Groepen waar je les aan geeft *
              </label>
              <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {groepenOpties.map(groep => (
                    <label key={groep} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="groepen"
                        value={groep}
                        checked={formData.groepen.includes(groep)}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-blue-700 focus:ring-blue-500 border-gray-400 rounded"
                      />
                      <span className="text-gray-900">{groep}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-700 text-sm bg-red-50 p-3 rounded-lg border border-red-200">{error}</div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-700 to-purple-700 text-white py-3 px-4 rounded-lg font-bold hover:from-blue-800 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md"
            >
              Registreren
            </button>
            <Link
              href="/"
              className="flex-1 text-center bg-gray-100 text-gray-800 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all border border-gray-300"
            >
              Terug naar inloggen
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 