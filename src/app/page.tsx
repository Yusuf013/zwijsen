"use client";

import { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import Navigation from "./Navigation";

interface Toets {
  id: number;
  titel: string;
  vak: string;
  groep: string;
  datum: string;
  status: "te_nakijken" | "te_afnemen";
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [toetsen, setToetsen] = useState<Toets[]>([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const email = localStorage.getItem("userEmail");
    if (isLoggedIn === "true") {
      setIsLoggedIn(true);
      setUserEmail(email);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      // Simuleer het ophalen van toetsen (in productie zou dit een API call zijn)
      setToetsen([
        {
          id: 1,
          titel: "Spellingtoets Hoofdstuk 3",
          vak: "Spelling",
          groep: "Groep 5",
          datum: "2024-03-20",
          status: "te_nakijken"
        },
        {
          id: 2,
          titel: "Rekentoets Tafels",
          vak: "Rekenen",
          groep: "Groep 4",
          datum: "2024-03-20",
          status: "te_afnemen"
        },
        {
          id: 3,
          titel: "Taaltoets Werkwoorden",
          vak: "Taal",
          groep: "Groep 6",
          datum: "2024-03-21",
          status: "te_afnemen"
        }
      ]);
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserEmail(localStorage.getItem("userEmail"));
  };

  const getDagVanDeWeek = () => {
    const dagen = [
      "zondag",
      "maandag",
      "dinsdag",
      "woensdag",
      "donderdag",
      "vrijdag",
      "zaterdag"
    ];
    return dagen[new Date().getDay()];
  };

  const formatDatum = (datum: string) => {
    return new Date(datum).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "long"
    });
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const toetsenVandaag = toetsen.filter(toets => toets.datum === new Date().toISOString().split("T")[0]);
  const toetsenTeNakijken = toetsen.filter(toets => toets.status === "te_nakijken");
  const toetsenTeAfnemen = toetsen.filter(toets => toets.status === "te_afnemen");

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex">
      <div className="w-64 flex-shrink-0">
        <Navigation />
      </div>
      <main className="flex-1 px-8 py-10">
        {/* Zoekbalk */}
        <div className="mb-8 flex items-center space-x-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Zoeken"
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white border border-gray-200 shadow focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg placeholder-gray-400"
              disabled
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-2 border-blue-100">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">
            Welkom terug, {userEmail?.split("@")[0]}!
          </h1>
          <p className="text-gray-600">
            Het is vandaag {getDagVanDeWeek()}, {new Date().toLocaleDateString("nl-NL", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Toetsen vandaag */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-100">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Toetsen vandaag</h2>
            {toetsenVandaag.length > 0 ? (
              <div className="space-y-4">
                {toetsenVandaag.map(toets => (
                  <div key={toets.id} className="bg-blue-50 p-4 rounded-full flex items-center justify-between border border-blue-200">
                    <div>
                      <h3 className="font-semibold text-blue-900">{toets.titel}</h3>
                      <p className="text-blue-700">{toets.vak} - {toets.groep}</p>
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      toets.status === "te_nakijken" 
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}>
                      {toets.status === "te_nakijken" ? "Te nakijken" : "Te afnemen"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Geen toetsen vandaag</p>
            )}
          </div>

          {/* Toetsen te nakijken */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-100">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Toetsen te nakijken</h2>
            {toetsenTeNakijken.length > 0 ? (
              <div className="space-y-4">
                {toetsenTeNakijken.map(toets => (
                  <div key={toets.id} className="bg-yellow-50 p-4 rounded-full flex items-center justify-between border border-yellow-200">
                    <div>
                      <h3 className="font-semibold text-yellow-900">{toets.titel}</h3>
                      <p className="text-yellow-700">{toets.vak} - {toets.groep}</p>
                    </div>
                    <p className="text-yellow-600 text-sm mt-1">
                      Afgenomen op {formatDatum(toets.datum)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Geen toetsen te nakijken</p>
            )}
          </div>

          {/* Toetsen te afnemen */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-100">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Toetsen te afnemen</h2>
            {toetsenTeAfnemen.length > 0 ? (
              <div className="space-y-4">
                {toetsenTeAfnemen.map(toets => (
                  <div key={toets.id} className="bg-green-50 p-4 rounded-full flex items-center justify-between border border-green-200">
                    <div>
                      <h3 className="font-semibold text-green-900">{toets.titel}</h3>
                      <p className="text-green-700">{toets.vak} - {toets.groep}</p>
                    </div>
                    <p className="text-green-600 text-sm mt-1">
                      Gepland op {formatDatum(toets.datum)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Geen toetsen te afnemen</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
