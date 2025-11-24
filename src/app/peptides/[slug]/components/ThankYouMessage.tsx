"use client";

export default function ThankYouMessage() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-sm text-gray-600">Your insights help the community make better decisions.</p>
      </div>
    </div>
  );
}

