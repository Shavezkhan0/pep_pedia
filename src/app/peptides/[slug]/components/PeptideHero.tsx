"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { FiShare2 } from "react-icons/fi";
import { IoBookmarkOutline, IoBookmark, IoChevronBackOutline } from "react-icons/io5";

interface PeptideHeroProps {
  title: string;
  subtitle: string;
  status: string;
  typicalDose: { value: string; subtitle: string };
  route: { value: string; subtitle: string };
  cycle: { value: string; subtitle: string };
  storage: { value: string; subtitle: string };
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
}

export default function PeptideHero({
  title,
  subtitle,
  status,
  typicalDose,
  route,
  cycle,
  storage,
  isBookmarked,
  onBookmarkToggle,
}: PeptideHeroProps) {
  const [currentCard, setCurrentCard] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const cards = [
    { label: "Typical Dose", value: typicalDose.value, subtitle: typicalDose.subtitle },
    { label: "Route", value: route.value, subtitle: route.subtitle },
    { label: "Cycle", value: cycle.value, subtitle: cycle.subtitle },
    { label: "Storage", value: storage.value, subtitle: storage.subtitle },
  ];

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
    }
    if (isRightSwipe && currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  const goToCard = (index: number) => {
    if (index !== currentCard) {
      setCurrentCard(index);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 pt-4 md:pt-20 pb-16 md:pb-12 lg:pb-16">
      <div className="w-full px-4 md:px-6 lg:px-24 xl:px-32">
        {/* Back Button - Mobile Only */}
        <div className="md:hidden mb-3">
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors cursor-pointer"
          >
            <IoChevronBackOutline className="w-5 h-5" />
            <span className="text-base font-normal">Browse</span>
          </Link>
        </div>

        {/* Header with Title and Icons */}
        <div className="flex items-start justify-between mb-4 md:mb-6 lg:mb-8">
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3 flex-wrap">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">{title}</h1>
              <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-blue-300/30 backdrop-blur-sm border border-white/30 text-white whitespace-nowrap">
                {status}
              </span>
            </div>
            <p className="text-white text-sm md:text-base leading-relaxed">{subtitle}</p>
          </div>
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <button className="p-2 text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer">
              <FiShare2 className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={onBookmarkToggle}
              className="p-2 text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            >
              {isBookmarked ? (
                <IoBookmark className="w-5 h-5 md:w-6 md:h-6 fill-white" />
              ) : (
                <IoBookmarkOutline className="w-5 h-5 md:w-6 md:h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, index) => (
            <div key={index} className="bg-white/25 backdrop-blur-lg rounded-2xl p-5 border border-white/40 shadow-lg">
              <h3 className="text-xs font-normal text-white/80 uppercase tracking-wider mb-3">{card.label}</h3>
              <p className="text-2xl font-bold text-white mb-2 leading-tight">{card.value}</p>
              <p className="text-xs text-white/70 leading-relaxed">{card.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Mobile: Swipeable Card Carousel */}
        <div className="md:hidden">
          <div
            className="relative overflow-hidden -mx-4"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentCard * 100}%)`,
              }}
            >
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="min-w-full px-4"
                >
                  <div className="bg-white/30 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-2xl mx-auto max-w-sm">
                    <h3 className="text-xs font-normal text-white/90 uppercase tracking-wider mb-4">{card.label}</h3>
                    <p className="text-3xl font-bold text-white mb-3 leading-tight">{card.value}</p>
                    <p className="text-xs text-white/70 font-normal">{card.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-2.5 mt-4">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => goToCard(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentCard
                    ? "w-10 h-2.5 bg-white"
                    : "w-2.5 h-2.5 bg-blue-300/60"
                }`}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

