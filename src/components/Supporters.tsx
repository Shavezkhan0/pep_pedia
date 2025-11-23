"use client";

import React from "react";
import Link from "next/link";
import { IoFlaskOutline } from "react-icons/io5";

const supporters = [
  "JPM",
  "Hero_labz",
  "Kevin",
  "Nulx",
  "Lorna",
  "Elena",
  "Gords",
  "nextgenpeppys",
  "dr.taniav",
  "Bridgette",
  "Mysticalms",
  "Kim",
  "Kae",
  "peppypeepsaus",
];

const Supporters: React.FC = () => {
  return (
    <section className="w-full bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-24 xl:px-32 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Left Section - PepPedia Info */}
            <div>
              <h3 className="text-2xl font-bold text-blue-600 mb-4">PepPedia</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                AI-curated from research and clinical sources, reviewed by the community. Educational content only. Use responsibly and with caution.
              </p>
            </div>

            {/* Right Section - Supporters */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Amazing Supporters
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {supporters.map((supporter, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <IoFlaskOutline className="w-4 h-4 text-blue-500 shrink-0" />
                    <span>{supporter}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/support"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors cursor-pointer"
              >
                Become a supporter
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Supporters;

