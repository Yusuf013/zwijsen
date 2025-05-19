"use client";

import { useState } from "react";

const klassen = [
  "Groep 1", "Groep 2", "Groep 3", "Groep 4", "Groep 5", "Groep 6", "Groep 7", "Groep 8"
];
const vakken = [
  "Rekenen", "Taal", "Spelling", "Lezen", "Schrijven", "Overig"
];
const methodes = [
  { key: "upload", label: "Uploaden", icon: "📁" },
  { key: "scan", label: "Scannen met camera", icon: "📷" }
];

export interface AssignmentMeta {
  id: string;
  klas: string;
  vak: string;
  methode: string;
  created: string;
}

export default function AssignmentWizard({ onComplete }: { onComplete: (assignment: AssignmentMeta) => void }) {
  const [step, setStep] = useState(0);
  const [klas, setKlas] = useState("");
  const [vak, setVak] = useState("");
  const [methode, setMethode] = useState("");

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  const handleFinish = () => {
    const assignment: AssignmentMeta = {
      id: Date.now().toString(),
      klas,
      vak,
      methode,
      created: new Date().toLocaleString(),
    };
    onComplete(assignment);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-100 to-purple-200 bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border-4 border-blue-200">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-extrabold text-blue-700 mb-2">Nieuwe opdracht starten</h2>
          <div className="flex justify-center gap-2 mb-2">
            {[0,1,2].map((i) => (
              <span key={i} className={`w-3 h-3 rounded-full ${step===i?"bg-blue-600":"bg-blue-200"} inline-block`}></span>
            ))}
          </div>
        </div>
        {step === 0 && (
          <div>
            <label className="block text-lg font-semibold text-blue-900 mb-2">Kies een klas</label>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {klassen.map((k) => (
                <button
                  key={k}
                  className={`rounded-lg px-4 py-2 border-2 ${klas===k?"border-blue-600 bg-blue-100":"border-blue-200 bg-white"} font-medium text-blue-800 hover:bg-blue-50 transition`}
                  onClick={() => setKlas(k)}
                  type="button"
                >
                  {k}
                </button>
              ))}
            </div>
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold mt-2 disabled:opacity-50"
              disabled={!klas}
              onClick={next}
            >
              Volgende
            </button>
          </div>
        )}
        {step === 1 && (
          <div>
            <label className="block text-lg font-semibold text-blue-900 mb-2">Kies een vak</label>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {vakken.map((v) => (
                <button
                  key={v}
                  className={`rounded-lg px-4 py-2 border-2 ${vak===v?"border-purple-600 bg-purple-100":"border-purple-200 bg-white"} font-medium text-purple-800 hover:bg-purple-50 transition`}
                  onClick={() => setVak(v)}
                  type="button"
                >
                  {v}
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              <button className="text-blue-600 font-bold" onClick={prev} type="button">Terug</button>
              <button
                className="bg-purple-600 text-white py-2 px-4 rounded-lg font-bold disabled:opacity-50"
                disabled={!vak}
                onClick={next}
                type="button"
              >
                Volgende
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <label className="block text-lg font-semibold text-blue-900 mb-2">Hoe wil je foto's/documenten toevoegen?</label>
            <div className="flex gap-4 justify-center mb-4">
              {methodes.map((m) => (
                <button
                  key={m.key}
                  className={`flex flex-col items-center gap-1 rounded-xl px-6 py-4 border-2 ${methode===m.key?"border-pink-600 bg-pink-100":"border-pink-200 bg-white"} font-medium text-pink-800 hover:bg-pink-50 transition text-lg`}
                  onClick={() => setMethode(m.key)}
                  type="button"
                >
                  <span className="text-3xl">{m.icon}</span>
                  {m.label}
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              <button className="text-blue-600 font-bold" onClick={prev} type="button">Terug</button>
              <button
                className="bg-pink-600 text-white py-2 px-4 rounded-lg font-bold disabled:opacity-50"
                disabled={!methode}
                onClick={handleFinish}
                type="button"
              >
                Start opdracht
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 