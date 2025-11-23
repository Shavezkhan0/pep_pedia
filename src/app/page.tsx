"use client";

import { useState } from "react";
import Image from "next/image";
import { IoSearchOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import HomeFeatures from "@/components/HomeFeatures";
import Supporters from "@/components/Supporters";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");

  const handleClear = () => {
    setSearchValue("");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-4 py-12 md:py-16">
        {/* Logo */}
        <div className="mb-6">
          <Image
            src="/logo-peppedia.svg"
            alt="PepPedia"
            width={240}
            height={60}
            className="w-60 h-auto"
            priority
          />
        </div>

        {/* Tagline */}
        <p className="text-gray-600 text-base mb-10 text-center">
          Research platform for peptide information and protocols
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-xl">
          <div className="relative flex items-center">
            <IoSearchOutline className="absolute left-5 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search peptides (BPC-157, Selank, etc.)"
              className="w-full pl-14 pr-10 py-3.5 bg-gray-50 border border-gray-200 rounded-full text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent cursor-text text-sm"
            />
            {searchValue && (
              <button
                onClick={handleClear}
                className="absolute right-4 w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <IoCloseOutline className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <HomeFeatures />

      {/* Supporters Section */}
      <Supporters />
    </div>
  );
}