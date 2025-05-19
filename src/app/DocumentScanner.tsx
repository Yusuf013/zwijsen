"use client";

import React, { useRef, useState, useEffect } from "react";

interface SavedDoc {
  id: string;
  dataUrl: string;
  date: string;
}

export default function DocumentScanner() {
  const [image, setImage] = useState<string | null>(null);
  const [savedDocs, setSavedDocs] = useState<SavedDoc[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Laad opgeslagen documenten bij het laden van het component
  useEffect(() => {
    const docs = localStorage.getItem("scannedDocs");
    if (docs) {
      setSavedDocs(JSON.parse(docs));
    }
  }, []);

  // Sla een nieuwe afbeelding op
  const saveDoc = (dataUrl: string) => {
    const newDoc: SavedDoc = {
      id: Date.now().toString(),
      dataUrl,
      date: new Date().toLocaleString(),
    };
    const updatedDocs = [newDoc, ...savedDocs];
    setSavedDocs(updatedDocs);
    localStorage.setItem("scannedDocs", JSON.stringify(updatedDocs));
  };

  // Start camera
  const startCamera = async () => {
    setError(null);
    setScanning(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      setError("Kan camera niet openen. Geef toestemming of probeer een andere browser.");
      setScanning(false);
    }
  };

  // Maak foto van video
  const takePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      setImage(dataUrl);
      saveDoc(dataUrl);
    }
    // Stop camera
    const stream = video.srcObject as MediaStream;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setScanning(false);
  };

  // Stop camera als component unmount
  React.useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Upload bestand
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        setImage(dataUrl);
        saveDoc(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full max-w-md">
      <div className="flex gap-2">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => fileInputRef.current?.click()}
        >
          Upload document/foto
        </button>
        <input
          type="file"
          accept="image/*,application/pdf"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={startCamera}
          disabled={scanning}
        >
          Scan met camera
        </button>
      </div>
      {error && <div className="text-red-600">{error}</div>}
      {scanning && (
        <div className="flex flex-col items-center gap-2">
          <video ref={videoRef} className="w-full max-w-xs rounded shadow" autoPlay playsInline />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={takePhoto}
          >
            Maak foto
          </button>
        </div>
      )}
      {image && (
        <div className="flex flex-col items-center gap-2">
          <div className="font-semibold">Preview:</div>
          <img src={image} alt="Preview" className="max-w-xs rounded shadow" />
        </div>
      )}
      {savedDocs.length > 0 && (
        <div className="w-full mt-6">
          <h3 className="font-bold mb-2 text-lg">Opgeslagen documenten/afbeeldingen</h3>
          <div className="grid grid-cols-2 gap-4">
            {savedDocs.map((doc) => (
              <div key={doc.id} className="flex flex-col items-center bg-gray-100 rounded p-2 shadow">
                <img src={doc.dataUrl} alt="Document" className="max-h-32 rounded mb-1" />
                <span className="text-xs text-gray-500">{doc.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 