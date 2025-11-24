"use client";

interface StickyHeaderProps {
  title: string;
  subtitle: string;
  status: string;
  isVisible: boolean;
}

export default function StickyHeader({
  title,
  subtitle,
  status,
  isVisible,
}: StickyHeaderProps) {
  if (!isVisible) return null;

  return (
    <>
      <div className="fixed top-0 md:top-16 left-0 right-0 z-40 shadow-sm bg-white border-b border-gray-200 transition-all duration-300">
        <div className="w-full px-4 md:px-8 lg:px-24 xl:px-32 py-3">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-sm md:text-xl font-normal text-gray-900 truncate">{title}</h1>
            <span className="px-2 py-0.5 md:px-2.5 md:py-1 rounded-sm text-xs md:text-sm font-normal bg-green-100 text-green-700 whitespace-nowrap shrink-0">
              {status}
            </span>
          </div>
          <p className="text-xs md:text-sm text-gray-600 truncate">{subtitle}</p>
        </div>
      </div>
      {/* Spacer for sticky header */}
      <div className="h-20 md:h-24"></div>
    </>
  );
}

