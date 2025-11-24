"use client";

interface WhatToExpectProps {
  expectations: string[];
  onEdit: () => void;
}

export default function WhatToExpect({
  expectations,
  onEdit,
}: WhatToExpectProps) {
  return (
    <>
      {/* Header - Outside the card */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-900">What to Expect</h2>
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
        <ul className="space-y-3">
          {expectations.map((expectation, index) => {
            // Parse the expectation string to handle bold text
            const parts = expectation.split(/(\*\*.*?\*\*:)/);
            return (
              <li key={index} className="text-sm text-gray-700 leading-relaxed">
                {parts.map((part, i) => {
                  if (part.startsWith('**') && part.endsWith(':**')) {
                    const boldText = part.replace(/\*\*/g, '');
                    return <strong key={i} className="font-semibold text-gray-900">{boldText}</strong>;
                  }
                  return <span key={i}>{part}</span>;
                })}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

