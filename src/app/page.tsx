"use client";

import { useState, useEffect, useRef } from "react";
import LoginForm from "./LoginForm";
import Navigation from "./Navigation";
import Image from "next/image";
import Link from "next/link";

interface Toets {
  id: number;
  titel: string;
  vak: string;
  groep: string;
  datum: string;
  status: "te_nakijken" | "te_afnemen";
}

const tiles = [
  {
    label: "Scan",
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><path d="M12 20v-2a8 8 0 0 1 8-8h8a8 8 0 0 1 8 8v2" stroke="#92278f" strokeWidth="2.5" strokeLinecap="round"/><rect x="16" y="24" width="16" height="10" rx="3" stroke="#92278f" strokeWidth="2.5"/><circle cx="24" cy="29" r="2" fill="#92278f"/></svg>
    ),
    color: "#92278f",
    action: "scan"
  },
  {
    label: "Geschiedenis",
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><path d="M24 8a16 16 0 1 0 16 16" stroke="#8dc63f" strokeWidth="2.5" strokeLinecap="round"/><path d="M24 16v8l6 3" stroke="#8dc63f" strokeWidth="2.5" strokeLinecap="round"/><path d="M8 8v8h8" stroke="#8dc63f" strokeWidth="2.5" strokeLinecap="round"/></svg>
    ),
    color: "#8dc63f",
    href: "/geschiedenis"
  },
  {
    label: "Edit",
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><path d="M32.5 13.5l2 2a2.828 2.828 0 0 1 0 4l-14 14a2 2 0 0 1-1.414.586H12v-5.086a2 2 0 0 1 .586-1.414l14-14a2.828 2.828 0 0 1 4 0z" stroke="#f15a24" strokeWidth="2.5"/><path d="M28 16l4 4" stroke="#f15a24" strokeWidth="2.5"/></svg>
    ),
    color: "#f15a24",
    href: "/edit"
  },
  {
    label: "Ask AI",
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><path d="M24 8v4" stroke="#fbbd16" strokeWidth="2.5" strokeLinecap="round"/><path d="M24 36v4" stroke="#fbbd16" strokeWidth="2.5" strokeLinecap="round"/><path d="M8 24h4" stroke="#fbbd16" strokeWidth="2.5" strokeLinecap="round"/><path d="M36 24h4" stroke="#fbbd16" strokeWidth="2.5" strokeLinecap="round"/><circle cx="24" cy="24" r="8" stroke="#fbbd16" strokeWidth="2.5"/><circle cx="24" cy="24" r="2" fill="#fbbd16"/></svg>
    ),
    color: "#fbbd16",
    href: "/ai"
  }
];

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [toetsen, setToetsen] = useState<Toets[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

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

  const openCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      streamRef.current = stream;
    } catch (err) {
      setShowCamera(false);
      alert("Camera openen mislukt of geweigerd.");
    }
  };

  const closeCamera = () => {
    setShowCamera(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const toetsenVandaag = toetsen.filter(toets => toets.datum === new Date().toISOString().split("T")[0]);
  const toetsenTeNakijken = toetsen.filter(toets => toets.status === "te_nakijken");
  const toetsenTeAfnemen = toetsen.filter(toets => toets.status === "te_afnemen");

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <div className="flex flex-col items-center pt-8 pb-4">
        <Image src="/zwijsenlog.png" alt="Nokijk logo" width={220} height={80} priority className="mb-6 w-56 h-auto" />
        <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
          {tiles.map(tile => tile.action === "scan" ? (
            <button
              key={tile.label}
              className="bg-[#eaf6fa] rounded-2xl flex flex-col items-center justify-center py-7 px-2 shadow hover:scale-105 transition-transform"
              onClick={openCamera}
              type="button"
            >
              <span>{tile.icon}</span>
              <span className="mt-2 text-lg font-bold text-black" style={{color: tile.color}}>{tile.label}</span>
            </button>
          ) : (
            <Link href={tile.href!} key={tile.label} className="bg-[#eaf6fa] rounded-2xl flex flex-col items-center justify-center py-7 px-2 shadow hover:scale-105 transition-transform">
              <span>{tile.icon}</span>
              <span className="mt-2 text-lg font-bold text-black" style={{color: tile.color}}>{tile.label}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="relative w-full mt-8 flex-1">
        <div className="absolute bottom-0 left-0 w-full h-48 bg-[#eaf6fa] rounded-t-3xl" />
        <button className="fixed bottom-8 right-8 z-10 bg-[#92278f] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg text-4xl hover:bg-[#7a1e6c] transition-colors">
          +
        </button>
      </div>
      {showCamera && (
        <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex flex-col items-center justify-center">
          <button onClick={closeCamera} className="absolute top-4 right-4 bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center text-3xl font-bold text-gray-700 shadow hover:bg-gray-300 transition-all">&times;</button>
          <video ref={videoRef} autoPlay playsInline className="rounded-2xl shadow-lg w-11/12 max-w-xs h-auto" />
          <p className="mt-4 text-gray-700">Voorcamera actief</p>
        </div>
      )}
    </div>
  );
}
