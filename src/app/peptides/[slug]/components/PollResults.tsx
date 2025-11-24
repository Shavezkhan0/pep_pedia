"use client";

interface PollResultsProps {
  currentCategory: number;
  pollDirection: 'left' | 'right';
  onNavigate: (direction: 'prev' | 'next') => void;
}

export default function PollResults({
  currentCategory,
  pollDirection,
  onNavigate,
}: PollResultsProps) {
  const pollCategories = [
    { title: "Age range", data: [{ label: "18-25", percent: 100, count: 1 }] },
    { title: "Duration of use", data: [{ label: "1-3 months", percent: 100, count: 2 }] },
    { title: "Dosage frequency", data: [{ label: "Not applicable", percent: 50, count: 1 }, { label: "Every other day", percent: 50, count: 1 }] },
    { title: "Effectiveness rating", data: [{ label: "Neutral", percent: 50, count: 1 }, { label: "Very effective", percent: 50, count: 1 }] },
    { title: "Gender", data: [{ label: "Non-binary", percent: 100, count: 2 }] },
    { title: "How discovered", data: [{ label: "Social media", percent: 100, count: 1 }] },
    { title: "Primary goal", data: [{ label: "Cognitive enhancement", percent: 50, count: 1 }, { label: "General wellness", percent: 50, count: 1 }] },
    { title: "Side effects", data: [{ label: "Injection site reaction", percent: 50, count: 1 }, { label: "Nausea", percent: 50, count: 1 }] },
    { title: "Experience with this peptide", data: [{ label: "Used in the past", percent: 50, count: 2 }, { label: "Planning to start", percent: 25, count: 1 }, { label: "Currently using", percent: 25, count: 1 }] },
    { title: "Would recommend", data: [{ label: "Not sure", percent: 100, count: 1 }] },
  ];

  const currentData = pollCategories[currentCategory];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h3 className="text-base font-bold text-gray-900">Poll Results</h3>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      
      <p className="text-xs text-gray-500 mb-6">20 responses</p>

      {/* Poll Data Container with Animation */}
      <div className="overflow-hidden mb-6">
        <div 
          key={currentCategory}
          className={`space-y-4 transition-all duration-300 ${
            pollDirection === 'right' ? 'animate-slide-poll-right' : 'animate-slide-poll-left'
          }`}
        >
          <h4 className="text-sm font-semibold text-gray-900">{currentData.title}</h4>
          {currentData.data.map((item, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">{item.label}</span>
                <span className="text-sm font-medium text-gray-900">{item.percent}% ({item.count})</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${item.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex items-center justify-center gap-2">
        <button 
          onClick={() => onNavigate('prev')}
          disabled={currentCategory === 0}
          className={`p-1 rounded transition-colors ${
            currentCategory === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'
          }`}
        >
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex gap-1.5">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentCategory 
                  ? 'w-8 bg-blue-600' 
                  : 'w-1.5 bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
        <button 
          onClick={() => onNavigate('next')}
          disabled={currentCategory === 9}
          className={`p-1 rounded transition-colors ${
            currentCategory === 9 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'
          }`}
        >
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

