"use client";

interface MolecularInfoProps {
  molecularInfo: {
    weight: string;
    length: string;
    type: string;
    sequence: string;
    note: string;
  };
  onEdit: () => void;
}

export default function MolecularInformation({
  molecularInfo,
  onEdit,
}: MolecularInfoProps) {
  return (
    <>
      {/* Header - Outside the card */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-900">Molecular Information</h2>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4">
          {/* Weight */}
          <div>
            <p className="text-xs font-normal text-orange-600 mb-1">Weight</p>
            <p className="text-sm text-gray-900">{molecularInfo.weight}</p>
          </div>

          {/* Length */}
          <div>
            <p className="text-xs font-normal text-orange-600 mb-1">Length</p>
            <p className="text-sm text-gray-900">{molecularInfo.length}</p>
          </div>

          {/* Type */}
          <div>
            <p className="text-xs font-normal text-orange-600 mb-1">Type</p>
            <p className="text-sm text-gray-900">{molecularInfo.type}</p>
          </div>
        </div>

        {/* Amino Acid Sequence */}
        <div className="mb-4">
          <p className="text-xs font-normal text-orange-600 mb-2">Amino Acid Sequence:</p>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-700 font-mono break-words">{molecularInfo.sequence}</p>
          </div>
        </div>

        {/* Note */}
        <p className="text-xs text-gray-500 italic">
          * {molecularInfo.note}
        </p>
      </div>
    </>
  );
}

