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

// Dummy data voor toetsen per dag
const toetsenData = [
  { datum: '2024-06-24', titel: 'Spellingtoets', vak: 'Spelling', groep: 'Groep 5', status: 'te_nakijken' },
  { datum: '2024-06-24', titel: 'Rekentoets', vak: 'Rekenen', groep: 'Groep 6', status: 'te_afnemen' },
  { datum: '2024-06-25', titel: 'Taaltoets', vak: 'Taal', groep: 'Groep 4', status: 'te_afnemen' },
  { datum: '2024-06-26', titel: 'Leestoets', vak: 'Lezen', groep: 'Groep 7', status: 'te_nakijken' },
  { datum: '2024-06-27', titel: 'Schrijfopdracht', vak: 'Schrijven', groep: 'Groep 8', status: 'te_afnemen' },
  { datum: '2024-06-28', titel: 'Engelstoets', vak: 'Engels', groep: 'Groep 5', status: 'te_nakijken' },
];

function getWeekDays(startDate = new Date()) {
  // Vind maandag van deze week
  const monday = new Date(startDate);
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [toetsen, setToetsen] = useState<Toets[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraState, setCameraState] = useState('idle'); // idle, camera, review
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setHours(0,0,0,0);
    return today;
  });
  const weekDays = getWeekDays(selectedDate);
  const selectedDateStr = selectedDate.toISOString().split('T')[0];
  const toetsenOpDag = toetsenData.filter(t => t.datum === selectedDateStr);
  const toetsenAfnemen = toetsenOpDag.filter(t => t.status === 'te_afnemen');
  const toetsenNakijken = toetsenOpDag.filter(t => t.status === 'te_nakijken');

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
    setCameraState('camera');
    setShowCamera(true);
    setCapturedImage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      streamRef.current = stream;
    } catch (err) {
      setShowCamera(false);
      setCameraState('idle');
      alert("Camera openen mislukt of geweigerd.");
    }
  };

  const closeCamera = () => {
    setShowCamera(false);
    setCameraState('idle');
    setCapturedImage(null);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      setCapturedImage(dataUrl);
      setCameraState('review');
      // Stop camera stream after taking photo
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    }
  };

  const processAndSavePhoto = async () => {
    if (!canvasRef.current || !capturedImage) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      const img = new window.Image();

      img.onload = async () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Apply basic image processing (grayscale and increased contrast)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const contrast = 50; // Adjust contrast level (0-100)
        const factor = (255 + contrast) / (255.01 - contrast);

        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = factor * (avg - 128) + 128;
          data[i + 1] = factor * (avg - 128) + 128;
          data[i + 2] = factor * (avg - 128) + 128;
          data[i] = Math.min(255, Math.max(0, data[i]));
          data[i + 1] = Math.min(255, Math.max(0, data[i + 1]));
          data[i + 2] = Math.min(255, Math.max(0, data[i + 2]));
        }
        ctx.putImageData(imageData, 0, 0);

        const processedDataUrl = canvas.toDataURL("image/png");

        // Sla op in localStorage (voor nu, Geschiedenis pagina leest hier nog uit)
        const fotos = JSON.parse(localStorage.getItem("geschiedenisFotos") || "[]");
        fotos.unshift({ url: processedDataUrl, tijd: new Date().toISOString() });
        localStorage.setItem("geschiedenisFotos", JSON.stringify(fotos));

        // --- Upload naar Azure Blob Storage --- //
        try {
          const response = await fetch('/api/upload-photo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageDataUrl: processedDataUrl }),
          });

          if (response.ok) {
            const result = await response.json();
            console.log("Afbeelding succesvol geupload naar Azure:", result);
            alert("Afbeelding succesvol geupload!"); // Optionele melding
          } else {
            const error = await response.json();
            console.error("Fout bij uploaden afbeelding naar Azure:", error);
            alert(`Fout bij uploaden afbeelding: ${error.message}`); // Optionele melding
          }
        } catch (error) {
          console.error("Netwerkfout bij uploaden afbeelding:", error);
          alert(`Netwerkfout bij uploaden afbeelding: ${error.message}`); // Optionele melding
        }
        // --- Einde Azure Upload --- //

        // Sluit de overlay na opslaan en uploaden
        closeCamera();
      };
      img.src = capturedImage;
    }
  };

  const retryPhoto = () => {
    setCapturedImage(null);
    openCamera(); // Go back to camera view
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col justify-between relative overflow-x-hidden">
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

      {/* Kalenderbalk */}
      <div className="w-full flex flex-col items-center mt-2 mb-4">
        <div className="flex gap-2 justify-center w-full overflow-x-auto pb-2">
          {weekDays.map((d, i) => {
            const isSelected = d.toDateString() === selectedDate.toDateString();
            return (
              <button
                key={i}
                onClick={() => setSelectedDate(new Date(d))}
                className={`flex flex-col items-center px-3 py-2 rounded-2xl min-w-[48px] shadow-sm transition-all ${isSelected ? 'bg-blue-700 text-white' : 'bg-white text-gray-800'}`}
                style={{ boxShadow: isSelected ? '0 2px 8px #2563eb33' : undefined }}
              >
                <span className="font-bold text-sm">{['M','T','W','T','F','S','S'][d.getDay()]}</span>
                <span className={`mt-1 w-7 h-7 flex items-center justify-center rounded-full text-base font-semibold ${isSelected ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700'}`}>{d.getDate()}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Toetsen overzicht voor geselecteerde dag */}
      <div className="w-full max-w-md mx-auto mb-4">
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-bold text-blue-800 mb-2">Toetsen op deze dag</h2>
          {toetsenOpDag.length === 0 && (
            <div className="text-gray-400 text-center py-6">Geen toetsen gepland</div>
          )}
          {toetsenAfnemen.length > 0 && (
            <div className="mb-2">
              <div className="text-sm font-semibold text-green-700 mb-1">Te afnemen</div>
              {toetsenAfnemen.map((t, i) => (
                <div key={i} className="bg-green-50 rounded-xl p-3 mb-2 flex flex-col">
                  <span className="font-semibold text-green-900">{t.titel}</span>
                  <span className="text-green-700 text-xs">{t.vak} - {t.groep}</span>
                </div>
              ))}
            </div>
          )}
          {toetsenNakijken.length > 0 && (
            <div>
              <div className="text-sm font-semibold text-yellow-700 mb-1">Te nakijken</div>
              {toetsenNakijken.map((t, i) => (
                <div key={i} className="bg-yellow-50 rounded-xl p-3 mb-2 flex flex-col">
                  <span className="font-semibold text-yellow-900">{t.titel}</span>
                  <span className="text-yellow-700 text-xs">{t.vak} - {t.groep}</span>
                </div>
              ))}
            </div>
          )}
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
          {cameraState === 'camera' && (
            <>
              <button onClick={closeCamera} className="absolute top-4 right-4 bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center text-3xl font-bold text-gray-700 shadow hover:bg-gray-300 transition-all">&times;</button>
              <video ref={videoRef} autoPlay playsInline className="rounded-2xl shadow-lg w-11/12 max-w-xs h-auto" />
              <canvas ref={canvasRef} className="hidden" />
              <button
                onClick={takePhoto}
                className="mt-6 bg-[#92278f] text-white rounded-full px-8 py-3 text-lg font-bold shadow hover:bg-[#7a1e6c] transition-colors"
              >
                Maak foto
              </button>
              <p className="mt-4 text-gray-700">Achtercamera actief</p>
            </>
          )}
          {cameraState === 'review' && capturedImage && (
            <div className="flex flex-col items-center justify-center">
              <button onClick={closeCamera} className="absolute top-4 right-4 bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center text-3xl font-bold text-gray-700 shadow hover:bg-gray-300 transition-all">&times;</button>
              <img src={capturedImage} alt="Gemaakte foto" className="rounded-2xl shadow-lg w-full max-w-xs h-auto object-contain mb-4" />
              <canvas ref={canvasRef} className="hidden" /> {/* Hidden canvas for processing */}
              <div className="flex space-x-4">
                <button
                  onClick={processAndSavePhoto}
                  className="bg-green-600 text-white rounded-full px-6 py-2 text-base font-bold shadow hover:bg-green-700 transition-colors"
                >
                  Verwerk & Opslaan
                </button>
                <button
                  onClick={retryPhoto}
                  className="bg-gray-300 text-gray-800 rounded-full px-6 py-2 text-base font-bold shadow hover:bg-gray-400 transition-colors"
                >
                  Opnieuw
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
