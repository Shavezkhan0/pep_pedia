"use client";

import { IoFlaskOutline } from "react-icons/io5";

interface ResearchProtocol {
  goal: string;
  dose: string;
  frequency: string;
  route: string;
}

interface ResearchProtocolsProps {
  protocols: ResearchProtocol[];
  onEdit: () => void;
}

export default function ResearchProtocols({ protocols, onEdit }: ResearchProtocolsProps) {
  return (
    <>
      {/* Header - Outside the card */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <IoFlaskOutline className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">Research Protocols</h2>
        </div>
        <button 
          onClick={onEdit}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors cursor-pointer"
        >
          Edit
        </button>
      </div>

      {/* Content Card */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 md:px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Goal
                </th>
                <th className="px-4 md:px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Dose
                </th>
                <th className="px-4 md:px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Frequency
                </th>
                <th className="px-4 md:px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Route
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {protocols.map((protocol, index) => (
                <tr key={index}>
                  <td className="px-4 md:px-5 py-4 text-sm text-gray-900">{protocol.goal}</td>
                  <td className="px-4 md:px-5 py-4 text-sm text-gray-700">{protocol.dose}</td>
                  <td className="px-4 md:px-5 py-4 text-sm text-gray-700">{protocol.frequency}</td>
                  <td className="px-4 md:px-5 py-4 text-sm text-gray-700">{protocol.route}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Timing Note - Inside the card at the bottom */}
        <div className="bg-blue-50 border-t border-blue-200 p-4">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">Timing:</span> Administer once weekly on the same day. Can be taken any time of day regardless of meals. If you miss a dose and it&apos;s within 3 days, take it. If more than 3 days, skip and resume regular schedule.
          </p>
        </div>
      </div>
    </>
  );
}

