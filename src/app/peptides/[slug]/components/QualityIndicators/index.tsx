"use client";

interface QualityIndicator {
  title: string;
  description: string;
  type: 'good' | 'acceptable' | 'red-flag';
}

interface QualityIndicatorsProps {
  indicators: QualityIndicator[];
  onEdit: () => void;
}

export default function QualityIndicators({
  indicators,
  onEdit,
}: QualityIndicatorsProps) {
  const getIconAndColor = (type: string) => {
    switch (type) {
      case 'good':
        return {
          icon: (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ),
          bg: 'bg-green-500'
        };
      case 'acceptable':
        return {
          icon: (
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ),
          bg: 'bg-yellow-500'
        };
      case 'red-flag':
        return {
          icon: (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          ),
          bg: 'bg-red-500'
        };
      default:
        return {
          icon: null,
          bg: 'bg-gray-500'
        };
    }
  };

  return (
    <>
      {/* Header - Outside the card */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-900">Quality Indicators</h2>
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
          {indicators.map((indicator, index) => {
            const { icon, bg } = getIconAndColor(indicator.type);
            
            return (
              <div 
                key={index} 
                className={`flex items-start gap-4 py-4 ${
                  index !== indicators.length - 1 ? 'border-b border-gray-200' : ''
                }`}
              >
                <div className={`w-8 h-8 ${bg} rounded-full flex items-center justify-center shrink-0`}>
                  {icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">{indicator.title}</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{indicator.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

