"use client";

import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

interface Interaction {
  name: string;
  recommendation: string;
  color: string;
  detail?: string;
}

interface PeptideInteractionsProps {
  interactions: Interaction[];
  onEdit: () => void;
}

export default function PeptideInteractions({
  interactions,
  onEdit,
}: PeptideInteractionsProps) {
  const [expandedInteractions, setExpandedInteractions] = useState<Set<string>>(new Set());

  const toggleInteraction = (name: string) => {
    const newExpanded = new Set(expandedInteractions);
    if (newExpanded.has(name)) {
      newExpanded.delete(name);
    } else {
      newExpanded.add(name);
    }
    setExpandedInteractions(newExpanded);
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'red':
        return { dot: 'bg-red-500', badge: 'bg-red-50 text-red-700' };
      case 'orange':
        return { dot: 'bg-orange-500', badge: 'bg-orange-50 text-orange-700' };
      case 'yellow':
        return { dot: 'bg-yellow-500', badge: 'bg-yellow-50 text-yellow-700' };
      case 'purple':
        return { dot: 'bg-purple-500', badge: 'bg-purple-50 text-purple-700' };
      case 'blue':
        return { dot: 'bg-blue-500', badge: 'bg-blue-50 text-blue-700' };
      default:
        return { dot: 'bg-gray-500', badge: 'bg-gray-100 text-gray-700' };
    }
  };

  return (
    <>
      {/* Header - Outside the card */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-900">Peptide Interactions</h2>
        </div>
        <button 
          onClick={onEdit}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors cursor-pointer"
        >
          Edit
        </button>
      </div>

      {/* Content Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="space-y-0">
          {interactions.map((interaction, index) => {
            const isExpanded = expandedInteractions.has(interaction.name);
            const colors = getColorClasses(interaction.color);
            
            return (
              <div key={interaction.name} className={index !== 0 ? "border-t border-gray-200" : ""}>
                <button
                  onClick={() => interaction.detail && toggleInteraction(interaction.name)}
                  className="w-full flex items-center justify-between py-4 bg-white transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${colors.dot}`}></div>
                    <span className="text-sm font-medium text-gray-900">{interaction.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1.5 rounded-md text-xs font-medium ${colors.badge}`}>
                      {interaction.recommendation}
                    </span>
                    {interaction.detail && (
                      <IoChevronDownOutline 
                        className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`} 
                      />
                    )}
                  </div>
                </button>

                {interaction.detail && (
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-4 pt-2 bg-white">
                      <p className="text-sm text-gray-700 leading-relaxed">{interaction.detail}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

