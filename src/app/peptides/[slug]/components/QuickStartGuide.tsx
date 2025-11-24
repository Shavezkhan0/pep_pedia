"use client";

import { IoLinkOutline, IoCalendarOutline, IoNavigateCircleOutline, IoTimeOutline, IoTrendingUpOutline, IoThermometerOutline, IoRefreshOutline, IoPauseOutline } from "react-icons/io5";

interface QuickStartGuideProps {
  quickStart: {
    typicalDose: string;
    howOften: string;
    howToTake: string;
    bestTiming: string;
  };
  effectsTimeline: {
    appetite: string;
    glucose: string;
    weight: string;
    peak: string;
  };
  storage: { value: string };
  cycleLength: string;
  breakBetween: string;
}

export default function QuickStartGuide({
  quickStart,
  effectsTimeline,
  storage,
  cycleLength,
  breakBetween,
}: QuickStartGuideProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Start Guide</h3>
      <div className="space-y-5">
        {/* Typical Dose */}
        <div className="flex items-start gap-3">
          <IoLinkOutline className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-xs font-normal text-gray-500 mb-1">Typical Dose</p>
            <p className="text-sm text-gray-900">{quickStart.typicalDose}</p>
          </div>
        </div>

        {/* How Often */}
        <div className="flex items-start gap-3">
          <IoCalendarOutline className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-xs font-normal text-gray-500 mb-1">How Often</p>
            <p className="text-sm text-gray-900">{quickStart.howOften}</p>
          </div>
        </div>

        {/* How to Take */}
        <div className="flex items-start gap-3">
          <IoNavigateCircleOutline className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-xs font-normal text-gray-500 mb-1">How to Take</p>
            <p className="text-sm text-gray-900">{quickStart.howToTake}</p>
          </div>
        </div>

        {/* Best Timing */}
        <div className="flex items-start gap-3">
          <IoTimeOutline className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-xs font-normal text-gray-500 mb-1">Best Timing</p>
            <p className="text-sm text-gray-900">{quickStart.bestTiming}</p>
          </div>
        </div>

        {/* Effects Timeline */}
        <div className="flex items-start gap-3">
          <IoTrendingUpOutline className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-xs font-normal text-gray-500 mb-1">Effects Timeline</p>
            <p className="text-sm text-gray-900">
              Appetite reduction {effectsTimeline.appetite}, glucose improvements {effectsTimeline.glucose}, weight loss {effectsTimeline.weight}, peak effects {effectsTimeline.peak}
            </p>
          </div>
        </div>

        {/* Storage */}
        <div className="flex items-start gap-3">
          <IoThermometerOutline className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-xs font-normal text-gray-500 mb-1">Storage</p>
            <p className="text-sm text-gray-900">{storage.value}, no refrigeration required</p>
          </div>
        </div>

        {/* Cycle Length */}
        <div className="flex items-start gap-3">
          <IoRefreshOutline className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-xs font-normal text-gray-500 mb-1">Cycle Length</p>
            <p className="text-sm text-gray-900">{cycleLength}</p>
          </div>
        </div>

        {/* Break Between */}
        <div className="flex items-start gap-3">
          <IoPauseOutline className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-xs font-normal text-gray-500 mb-1">Break Between</p>
            <p className="text-sm text-gray-900">{breakBetween}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

