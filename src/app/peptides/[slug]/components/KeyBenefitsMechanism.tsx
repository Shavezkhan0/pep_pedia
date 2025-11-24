"use client";

interface KeyBenefitsMechanismProps {
  keyBenefits: string[];
  mechanismOfAction: string;
}

export default function KeyBenefitsMechanism({
  keyBenefits,
  mechanismOfAction,
}: KeyBenefitsMechanismProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Key Benefits Section */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-base font-bold text-gray-900 mb-4">Key Benefits</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          {keyBenefits.join(", ")}
        </p>
      </div>

      {/* Mechanism of Action Section */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-base font-bold text-gray-900 mb-4">Mechanism of Action</h3>
        <p className="text-gray-700 leading-relaxed text-sm">{mechanismOfAction}</p>
      </div>
    </div>
  );
}

