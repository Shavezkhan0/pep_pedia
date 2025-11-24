"use client";

import { IoThumbsUpOutline, IoThumbsDownOutline } from "react-icons/io5";

export default function HelpfulnessFeedback() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <h3 className="text-base font-bold text-gray-900 mb-4">Was this helpful?</h3>
      <div className="flex gap-3 mb-3">
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-700 hover:bg-green-100 transition-colors cursor-pointer">
          <IoThumbsUpOutline className="w-5 h-5" />
          <span className="font-medium text-sm">Yes</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 hover:bg-red-100 transition-colors cursor-pointer">
          <IoThumbsDownOutline className="w-5 h-5" />
          <span className="font-medium text-sm">No</span>
        </button>
      </div>
      <p className="text-xs text-gray-500 text-center">Your feedback helps us improve PepPedia</p>
    </div>
  );
}

