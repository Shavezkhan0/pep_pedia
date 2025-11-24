"use client";

interface HowToReconstituteProps {
  steps: string[];
  onEdit: () => void;
  onCalculatorClick: () => void;
}

export default function HowToReconstitute({
  steps,
  onEdit,
  onCalculatorClick,
}: HowToReconstituteProps) {
  return (
    <>
      {/* Header - Outside the card */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-900">How to Reconstitute</h2>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={onCalculatorClick}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Calculator
          </button>
        </div>
      </div>

      {/* Content Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        {/* Important Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-yellow-900">
            <span className="font-semibold">Important:</span> Always use bacteriostatic water (BAC). Sterile technique is essential.
          </p>
        </div>

        {/* Steps List */}
        <div className="space-y-0">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex items-start gap-4 py-4 ${
                index !== steps.length - 1 ? 'border-b border-gray-200' : ''
              }`}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                <span className="text-white text-sm font-semibold">{index + 1}</span>
              </div>
              <p className="text-sm text-gray-900 pt-1">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

