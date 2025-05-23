"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface GeschiedenisFoto {
  url: string;
  tijd: string;
}

export default function GeschiedenisPage() {
  const [fotos, setFotos] = useState<GeschiedenisFoto[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("geschiedenisFotos");
    if (data) {
      try {
        setFotos(JSON.parse(data));
      } catch (e) {
        console.error("Fout bij het laden van foto's uit localStorage:", e);
        setFotos([]); // Leeg de lijst bij fout
      }
    }
  }, []);

  const handleClearHistory = () => {
    if (window.confirm("Weet je zeker dat je alle opgeslagen foto's wilt verwijderen?")) {
      localStorage.removeItem("geschiedenisFotos");
      setFotos([]); // Leeg de state
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-blue-800">Geschiedenis</h1>
          <button
            onClick={handleClearHistory}
            className="text-red-600 font-semibold hover:underline text-sm"
          >
            Geschiedenis wissen
          </button>
          {/* <Link href="/" className="text-blue-600 font-semibold hover:underline">Home</Link> */}
           {/* Optioneel: terug naar home knop */}
        </div>
        {fotos.length === 0 ? (
          <div className="bg-blue-50 rounded-xl p-8 text-center text-gray-500 text-lg shadow">
            Nog geen foto's gemaakt.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fotos.map((foto, i) => (
              <div key={i} className="bg-[#eaf6fa] rounded-xl p-3 flex flex-col items-center shadow">
                <img src={foto.url} alt={`Scan ${i+1}`} className="rounded-lg w-full h-auto object-contain mb-2" />
                <span className="text-xs text-gray-500 mt-1">
                  {new Date(foto.tijd).toLocaleString("nl-NL", { dateStyle: "short", timeStyle: "short" })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 