"use client";

import { useState } from "react";

const steps = [
  {
    title: "Welkom bij de Document Scanner",
    description: "Scan en beheer al je documenten en foto's op één plek.",
    icon: "👋"
  },
  {
    title: "Upload of Scan",
    description: "Kies tussen het uploaden van bestaande bestanden of scan direct met je camera.",
    icon: "📸"
  },
  {
    title: "Bekijk en Beheer",
    description: "Bekijk je gescande documenten en foto's en beheer ze gemakkelijk.",
    icon: "📁"
  }
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsVisible(false);
    }
  };

  const skipOnboarding = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <span className="text-4xl mb-4 block">{steps[currentStep].icon}</span>
          <h2 className="text-2xl font-bold mb-2">{steps[currentStep].title}</h2>
          <p className="text-gray-600">{steps[currentStep].description}</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={skipOnboarding}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Overslaan
            </button>
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {currentStep === steps.length - 1 ? "Start" : "Volgende"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 