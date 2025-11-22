import Image from "next/image";
import { IoSearchOutline } from "react-icons/io5";

export default function Home() {
  return (
    <div className="h-90 bg-white flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="mb-8">
        <Image
          src="/logo-peppedia.svg"
          alt="PepPedia"
          width={400}
          height={100}
          className="w-auto h-auto"
          priority
        />
      </div>

      {/* Tagline */}
      <p className="text-gray-700 text-lg mb-12 text-center">
        Research platform for peptide information and protocols
      </p>

      {/* Search Bar */}
      <div className="w-full max-w-2xl">
        <div className="relative flex items-center">
          <IoSearchOutline className="absolute left-4 w-6 h-6 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search peptides (BPC-157, Selank, etc.)"
            className="w-full pl-12 pr-4 py-4 bg-gray-100 border border-gray-200 rounded-full text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 cursor-text"
          />
        </div>
      </div>
    </div>
  );
}
