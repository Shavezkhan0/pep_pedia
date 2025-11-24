"use client";

import { IoInformationCircleOutline } from "react-icons/io5";

interface OverviewSectionProps {
  peptideTitle: string;
  overview: string;
  onEdit: () => void;
}

export default function OverviewSection({
  peptideTitle,
  overview,
  onEdit,
}: OverviewSectionProps) {
  return (
    <>
      {/* Overview Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <IoInformationCircleOutline className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Overview</h2>
        </div>
        <button 
          onClick={onEdit}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors cursor-pointer"
        >
          Edit
        </button>
      </div>
      
      {/* Overview Content */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-base font-semibold text-gray-900 mb-3">What is {peptideTitle}?</h3>
        <p className="text-gray-700 leading-relaxed text-sm">{overview}</p>
      </div>
    </>
  );
}

