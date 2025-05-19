"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import AssignmentWizard, { AssignmentMeta } from "./AssignmentWizard";
import DocumentScanner from "./DocumentScanner";

function AssignmentTabs({ assignments, activeId, onSelect, onNew }: {
  assignments: AssignmentMeta[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
}) {
  return (
    <div className="flex gap-2 mb-6 overflow-x-auto">
      {assignments.map((a: AssignmentMeta) => (
        <button
          key={a.id}
          className={`px-4 py-2 rounded-full font-semibold border-2 transition-all whitespace-nowrap ${activeId===a.id ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-blue-600 shadow-lg" : "bg-white border-blue-200 text-blue-700 hover:bg-blue-50"}`}
          onClick={() => onSelect(a.id)}
        >
          {a.klas} - {a.vak}
        </button>
      ))}
      <button
        className="px-4 py-2 rounded-full font-semibold border-2 border-dashed border-pink-400 text-pink-600 bg-pink-50 hover:bg-pink-100 transition-all"
        onClick={onNew}
      >
        + Nieuwe opdracht
      </button>
    </div>
  );
}

export default function Home() {
  const [showWizard, setShowWizard] = useState(false);
  const [assignments, setAssignments] = useState<AssignmentMeta[]>([]);
  const [activeAssignmentId, setActiveAssignmentId] = useState<string | null>(null);

  // Laad opdrachten uit localStorage
  useEffect(() => {
    const stored = localStorage.getItem("assignments");
    if (stored) {
      const parsed = JSON.parse(stored);
      setAssignments(parsed);
      if (parsed.length > 0) setActiveAssignmentId(parsed[0].id);
    }
  }, []);

  // Sla opdrachten op bij wijziging
  useEffect(() => {
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }, [assignments]);

  const handleNewAssignment = (meta: AssignmentMeta) => {
    const newAssignments = [meta, ...assignments];
    setAssignments(newAssignments);
    setActiveAssignmentId(meta.id);
    setShowWizard(false);
  };

  const activeAssignment = assignments.find(a => a.id === activeAssignmentId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-0 sm:p-8">
      <header className="w-full py-8 px-4 sm:px-0 flex flex-col items-center bg-gradient-to-r from-blue-500 to-purple-500 mb-8 shadow-lg rounded-b-3xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow mb-2 tracking-tight">Document Scanner voor Basisschool</h1>
        <p className="text-white/90 text-lg mb-4">Start een nieuwe opdracht en scan of upload het werk van je leerlingen</p>
      </header>
      <main className="max-w-2xl mx-auto flex flex-col items-center">
        <AssignmentTabs
          assignments={assignments}
          activeId={activeAssignmentId}
          onSelect={setActiveAssignmentId}
          onNew={() => setShowWizard(true)}
        />
        {showWizard && (
          <AssignmentWizard onComplete={handleNewAssignment} />
        )}
        {activeAssignment ? (
          <div className="w-full mt-4">
            <div className="mb-4 flex items-center gap-4">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-200 text-blue-800 font-semibold text-sm">{activeAssignment.klas}</span>
              <span className="inline-block px-3 py-1 rounded-full bg-purple-200 text-purple-800 font-semibold text-sm">{activeAssignment.vak}</span>
              <span className="inline-block px-3 py-1 rounded-full bg-pink-200 text-pink-800 font-semibold text-sm">{activeAssignment.methode === "upload" ? "Uploaden" : "Scannen"}</span>
            </div>
            {/* Hier komt de DocumentScanner, later per opdracht */}
            <DocumentScanner />
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-12 text-lg">Start een nieuwe opdracht om te beginnen!</div>
        )}
      </main>
    </div>
  );
}
