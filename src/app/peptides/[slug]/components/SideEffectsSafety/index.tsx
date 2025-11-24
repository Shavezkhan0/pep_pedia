"use client";

interface SideEffectsSafetyProps {
  sideEffects: string[];
  onEdit: () => void;
}

export default function SideEffectsSafety({
  sideEffects,
  onEdit,
}: SideEffectsSafetyProps) {
  return (
    <>
      {/* Header - Outside the card */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-900">Side Effects & Safety</h2>
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
          {sideEffects.map((effect, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 shrink-0"></div>
              <span className="text-sm text-gray-700 leading-relaxed">{effect}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

