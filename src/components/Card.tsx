import React from "react";
import Link from "next/link";
import { IoBookmarkOutline } from "react-icons/io5";

interface CardProps {
  icon: string;
  title: string;
  subtitle: string;
  tags: string[];
  researchUses: string[];
  status:
    | "Extensively Studied"
    | "Well Researched"
    | "Limited Research"
    | "FDA Approved"
    | "Emerging Research";
  link: string;
}

const Card: React.FC<CardProps> = ({
  icon,
  title,
  subtitle,
  tags,
  researchUses,
  status,
  link,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case "Extensively Studied":
        return "bg-green-100 text-green-700 border-green-200";
      case "FDA Approved":
        return "bg-green-100 text-green-700 border-green-200";
      case "Well Researched":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Emerging Research":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Limited Research":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col hover:shadow-lg hover:scale-[1.02] hover:border-gray-300 transition-all duration-300 ease-out cursor-pointer relative group h-full">
      {/* Bookmark Icon */}
      <button className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer z-10">
        <IoBookmarkOutline className="w-5 h-5" />
      </button>

      {/* Icon */}
      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shrink-0 mb-3">
        <span className="text-white font-bold text-base">{icon}</span>
      </div>

      {/* Title & Subtitle */}
      <div className="mb-3 pr-8">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-xs text-gray-600 line-clamp-2">{subtitle}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Common Research Uses */}
      <div className="mb-5 flex-1">
        <h4 className="text-xs font-semibold text-gray-900 mb-2">
          Common Research Uses
        </h4>
        <p className="text-xs text-gray-600 leading-relaxed">
          {researchUses.join(", ")}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor()}`}
        >
          {status}
        </span>
        <Link
          href={link}
          className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
        >
          Learn More
          <span>→</span>
        </Link>
      </div>
    </div>
  );
};

export default Card;
