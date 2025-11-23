"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { IoShareOutline, IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoFlaskOutline } from "react-icons/io5";
import { IoRadioButtonOnOutline } from "react-icons/io5";
import { IoStatsChartOutline } from "react-icons/io5";
import { IoCubeOutline } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoRefreshOutline } from "react-icons/io5";
import { IoPauseOutline } from "react-icons/io5";
import { IoThumbsUpOutline, IoThumbsDownOutline } from "react-icons/io5";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoChevronDownOutline } from "react-icons/io5";
import { IoPencilOutline } from "react-icons/io5";
import { IoLinkOutline } from "react-icons/io5";
import { useUser } from "@clerk/nextjs";

// Types for peptide data
interface ResearchIndication {
  name: string;
  effectiveness: string;
  color: string;
}

interface ResearchProtocol {
  goal: string;
  dose: string;
  frequency: string;
  route: string;
}

interface PeptideData {
  icon: string;
  title: string;
  subtitle: string;
  status: string;
  tags: string[];
  overview: string;
  keyBenefits: string[];
  mechanismOfAction: string;
  molecularInfo: {
    weight: string;
    length: string;
    type: string;
    sequence: string;
    note: string;
  };
  typicalDose: { value: string; subtitle: string };
  route: { value: string; subtitle: string };
  cycle: { value: string; subtitle: string };
  storage: { value: string; subtitle: string };
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
  cycleLength: string;
  breakBetween: string;
  researchIndications: ResearchIndication[];
  researchProtocols: ResearchProtocol[];
}

// Sample data - in a real app, this would come from an API
const peptideData: Record<string, PeptideData> = {
  "orforglipron": {
    icon: "ORF",
    title: "Orforglipron",
    subtitle: "Oral Small-Molecule GLP-1 Receptor Agonist | Weight Loss & Diabetes",
    status: "Extensively Studied",
    tags: ["Weight Loss", "Diabetes", "Cardiovascular"],
    overview: "Orforglipron (LY-3502970) is a groundbreaking oral, non-peptide, small-molecule glucagon-like peptide-1 (GLP-1) receptor agonist representing a paradigm shift in metabolic medicine. As the first oral small-molecule GLP-1 agonist to successfully complete Phase 3 clinical trials, orforglipron eliminates the need for injections, refrigeration, and food/water restrictions that limit current GLP-1 therapies. Its unique small-molecule structure allows for convenient once-daily oral administration with efficacy comparable to injectable peptide GLP-1 agonists. Orforglipron exhibits biased agonism, preferentially activating G protein/cAMP pathways over β-arrestin recruitment, potentially reducing receptor desensitization and improving sustained efficacy. Clinical trials demonstrate substantial weight loss (up to 12.4% at 72 weeks) and robust glycemic control (HbA1c reductions of 1.3-1.6%) with a safety profile consistent with the GLP-1 class. Developed by Chugai Pharmaceutical and licensed to Eli Lilly in 2018, orforglipron is poised to transform obesity and diabetes treatment.",
    keyBenefits: [
      "Significant weight loss (up to 12.4% at 72 weeks)",
      "Robust diabetes control (HbA1c reduction 1.3-1.6%)",
      "Convenient once-daily oral administration",
      "No injection required",
      "No refrigeration needed",
      "No food or water restrictions",
      "Scalable manufacturing",
      "Improved patient adherence",
      "Reduced cardiovascular risk markers",
      "Preserved muscle mass during weight loss",
    ],
    mechanismOfAction: "Small-molecule partial agonist of GLP-1 receptor with biased signaling profile. Preferentially activates G protein/cAMP pathways (enhancing glucose-dependent insulin secretion, suppressing glucagon, delaying gastric emptying, reducing appetite) while minimizing β-arrestin recruitment (reducing receptor desensitization). Binds within upper helical bundle of GLP-1R at distinct site from peptide agonists. 79.1% oral bioavailability with 29-49 hour half-life supporting once-daily dosing.",
    molecularInfo: {
      weight: "882.974 Da",
      length: "Non-peptide small molecule",
      type: "Small-molecule GLP-1R agonist",
      sequence: "Not applicable - synthetic small molecule compound",
      note: "Chemical synthesis with biased agonism profile favoring G protein activation over β-arrestin recruitment",
    },
    typicalDose: {
      value: "3-36mg daily",
      subtitle: "Once daily",
    },
    route: {
      value: "Oral",
      subtitle: "Not applicable - oral tablet administration",
    },
    cycle: {
      value: "Long-term continuous therapy",
      subtitle: "Typical duration",
    },
    storage: {
      value: "Room temperature (15-30°C)",
      subtitle: "Refrigerated",
    },
    quickStart: {
      typicalDose: "Start 3-6mg daily, escalate every 4 weeks as tolerated",
      howOften: "Once daily, same time each day preferred",
      howToTake: "Not applicable - oral tablet administration",
      bestTiming: "Any time of day, with or without food, with or without water",
    },
    effectsTimeline: {
      appetite: "1-3 days",
      glucose: "1-4 weeks",
      weight: "2-4 weeks",
      peak: "16-36 weeks",
    },
    cycleLength: "Long-term continuous therapy (72+ weeks studied)",
    breakBetween: "Consult prescriber before discontinuation to manage potential rebound effects",
    researchIndications: [
      { name: "Weight Loss", effectiveness: "Most Effective", color: "green" },
      { name: "Diabetes", effectiveness: "Effective", color: "blue" },
      { name: "Cardiovascular", effectiveness: "Moderate", color: "gray" },
    ],
    researchProtocols: [
      {
        goal: "Type 2 diabetes initiation",
        dose: "3mg daily",
        frequency: "Once daily, any time",
        route: "Oral tablet",
      },
      {
        goal: "Type 2 diabetes moderate control",
        dose: "12mg daily",
        frequency: "Once daily, any time",
        route: "Oral tablet",
      },
      {
        goal: "Type 2 diabetes optimal control",
        dose: "36mg daily",
        frequency: "Once daily, any time",
        route: "Oral tablet",
      },
      {
        goal: "Weight loss initiation (obesity without diabetes)",
        dose: "6mg daily",
        frequency: "Once daily, any time",
        route: "Oral tablet",
      },
    ],
  },
};

export default function PeptideDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { isSignedIn } = useUser();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);

  const peptide = peptideData[slug] || peptideData["orforglipron"];

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const contentTop = contentRef.current.getBoundingClientRect().top;
        // Show sticky header when white content section reaches top (64px for navbar height)
        setIsSticky(contentTop <= 64);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getStatusColor = () => {
    switch (peptide.status) {
      case "Extensively Studied":
      case "FDA Approved":
        return "bg-green-50 text-green-700 border-green-300";
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

  const getEffectivenessColor = (color: string) => {
    switch (color) {
      case "green":
        return "bg-green-100 text-green-700 border-green-200";
      case "blue":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "gray":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Header and Info Cards */}
      <div className="bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 pt-20 pb-16">
        <div className="w-full px-6 md:px-8 lg:px-24 xl:px-32">
          {/* Header with Title and Icons */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">{peptide.title}</h1>
                <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-white border border-gray-200 whitespace-nowrap">
                  {peptide.status}
                </span>
              </div>
              <p className="text-white text-base md:text-lg">{peptide.subtitle}</p>
            </div>
            <div className="flex items-center gap-3 ml-6">
              <button className="p-2 text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer">
                <IoShareOutline className="w-6 h-6" />
              </button>
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="p-2 text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                {isBookmarked ? (
                  <IoBookmark className="w-6 h-6 fill-white" />
                ) : (
                  <IoBookmarkOutline className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Typical Dose Card */}
            <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-6 border border-white/40 shadow-lg">
              <h3 className="text-xs font-semibold text-white/90 uppercase tracking-wider mb-3">Typical Dose</h3>
              <p className="text-2xl md:text-3xl font-bold text-white mb-2">{peptide.typicalDose.value}</p>
              <p className="text-sm text-white/80">{peptide.typicalDose.subtitle}</p>
            </div>

            {/* Route Card */}
            <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-6 border border-white/40 shadow-lg">
              <h3 className="text-xs font-semibold text-white/90 uppercase tracking-wider mb-3">Route</h3>
              <p className="text-2xl md:text-3xl font-bold text-white mb-2">{peptide.route.value}</p>
              <p className="text-sm text-white/80">{peptide.route.subtitle}</p>
            </div>

            {/* Cycle Card */}
            <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-6 border border-white/40 shadow-lg">
              <h3 className="text-xs font-semibold text-white/90 uppercase tracking-wider mb-3">Cycle</h3>
              <p className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">{peptide.cycle.value}</p>
              <p className="text-sm text-white/80">{peptide.cycle.subtitle}</p>
            </div>

            {/* Storage Card */}
            <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-6 border border-white/40 shadow-lg">
              <h3 className="text-xs font-semibold text-white/90 uppercase tracking-wider mb-3">Storage</h3>
              <p className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">{peptide.storage.value}</p>
              <p className="text-sm text-white/80">{peptide.storage.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Header (appears when white content reaches top, below navbar) */}
      {isSticky && (
        <div className="fixed top-16 left-0 right-0 z-30 shadow-sm bg-white border-b border-gray-200 transition-all duration-300">
          <div className="w-full px-6 md:px-8 lg:px-24 xl:px-32 py-3">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">{peptide.title}</h1>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200 whitespace-nowrap">
                {peptide.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">{peptide.subtitle}</p>
          </div>
        </div>
      )}

      {/* Spacer for sticky header (below navbar) */}
      {isSticky && <div className="h-24"></div>}

      {/* Main Content - White Card Container */}
      <div ref={contentRef} className="w-full  md:rounded-t-[2rem] lg:rounded-t-[2rem] -mt-12 bg-gray-50">
        <div className="bg-white rounded-t-[5rem] md:rounded-t-[6rem] lg:rounded-t-[8rem] shadow-xl overflow-hidden">
          <div className="px-6 md:px-8 lg:px-24 xl:px-32 py-8 md:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Left Column - Main Content (2/3 width) */}
              <div className="lg:col-span-2 space-y-8">
                {/* Top Block - Overview Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shadow-sm">
                        <IoInformationCircleOutline className="w-6 h-6 text-blue-600" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">Overview</h2>
                    </div>
                    {isSignedIn && (
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors cursor-pointer">
                        Edit
                      </button>
                    )}
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <h3 className="text-base font-semibold text-gray-900 mb-3">What is {peptide.title}?</h3>
                    <p className="text-gray-700 leading-relaxed text-[15px]">{peptide.overview}</p>
                  </div>
                </div>

              {/* Middle Blocks - Key Benefits & Mechanism Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Key Benefits Section */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-gray-900">Key Benefits</h3>
                    {isSignedIn && (
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors cursor-pointer">
                        Edit
                      </button>
                    )}
                  </div>
                  <ul className="space-y-2.5">
                    {peptide.keyBenefits.slice(0, 6).map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <span className="text-gray-400 mt-0.5">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mechanism of Action Section */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-gray-900">Mechanism of Action</h3>
                    {isSignedIn && (
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors cursor-pointer">
                        Edit
                      </button>
                    )}
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm">{peptide.mechanismOfAction}</p>
                </div>
              </div>

              {/* Bottom Block - Research Protocols Section */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                      <IoFlaskOutline className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Research Protocols</h2>
                  </div>
                  {isSignedIn && (
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 transition-colors cursor-pointer">
                      Edit
                    </button>
                  )}
                </div>
                <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-100 border-b border-gray-200">
                        <tr>
                          <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Goal
                          </th>
                          <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Dose
                          </th>
                          <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Frequency
                          </th>
                          <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Route
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {peptide.researchProtocols.map((protocol: ResearchProtocol, index: number) => (
                          <tr key={index} className="hover:bg-gray-50 transition-colors">
                            <td className="px-5 py-4 text-sm text-gray-900">{protocol.goal}</td>
                            <td className="px-5 py-4 text-sm text-gray-700">{protocol.dose}</td>
                            <td className="px-5 py-4 text-sm text-gray-700">{protocol.frequency}</td>
                            <td className="px-5 py-4 text-sm text-gray-700">{protocol.route}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* Timing Note - Below the table */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
                  <p className="text-sm text-blue-900">
                    <span className="font-semibold">Timing:</span> Orforglipron can be taken at any time of day, with or without food or water. Choose a consistent time daily for optimal compliance. No fasting period or timing restrictions required.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar (1/3 width) */}
            <div className="lg:col-span-1 space-y-6">
              {/* Top Block - Quick Start Guide (Tall Vertical) */}
              <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-5">Quick Start Guide</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <IoLinkOutline className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Typical Dose</p>
                      <p className="text-sm text-gray-900">{peptide.quickStart.typicalDose}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <IoLinkOutline className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">How Often</p>
                      <p className="text-sm text-gray-900">{peptide.quickStart.howOften}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <IoLinkOutline className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">How to Take</p>
                      <p className="text-sm text-gray-900">{peptide.quickStart.howToTake}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <IoLinkOutline className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Best Timing</p>
                      <p className="text-sm text-gray-900">{peptide.quickStart.bestTiming}</p>
                    </div>
                  </div>
                </div>

                {/* Effects Timeline */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <IoStatsChartOutline className="w-5 h-5 text-gray-500" />
                    <h4 className="text-sm font-semibold text-gray-900">Effects Timeline</h4>
                  </div>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Appetite reduction</span>
                      <span className="font-medium text-gray-900">{peptide.effectsTimeline.appetite}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Glucose improvements</span>
                      <span className="font-medium text-gray-900">{peptide.effectsTimeline.glucose}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weight loss</span>
                      <span className="font-medium text-gray-900">{peptide.effectsTimeline.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Peak effects</span>
                      <span className="font-medium text-gray-900">{peptide.effectsTimeline.peak}</span>
                    </div>
                  </div>
                </div>

                {/* Storage */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <IoCubeOutline className="w-5 h-5 text-gray-500" />
                    <h4 className="text-sm font-semibold text-gray-900">Storage</h4>
                  </div>
                  <p className="text-sm text-gray-700">{peptide.storage.value}, no refrigeration required</p>
                </div>

                {/* Cycle Length */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <IoRefreshOutline className="w-5 h-5 text-gray-500" />
                    <h4 className="text-sm font-semibold text-gray-900">Cycle Length</h4>
                  </div>
                  <p className="text-sm text-gray-700">{peptide.cycleLength}</p>
                </div>

                {/* Break Between */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <IoPauseOutline className="w-5 h-5 text-gray-500" />
                    <h4 className="text-sm font-semibold text-gray-900">Break Between</h4>
                  </div>
                  <p className="text-sm text-gray-700">{peptide.breakBetween}</p>
                </div>
              </div>

              {/* Bottom Block - Survey Section (Shorter Horizontal) */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-base font-bold text-gray-900 mb-1">Help Us Gain Real Insights</h3>
                <p className="text-xs text-gray-500 mb-4">Question 1 of 10</p>
                <p className="text-sm font-medium text-gray-900 mb-4">What is your experience with this peptide?</p>
                <div className="space-y-2 mb-4">
                  {["Currently using", "Used in the past", "Planning to start", "Just researching", "Other (please specify)"].map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <input
                        type="radio"
                        name="experience"
                        value={option}
                        checked={selectedExperience === option}
                        onChange={(e) => setSelectedExperience(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                      />
                      <span className="text-sm text-gray-900">{option}</span>
                    </label>
                  ))}
                </div>
                <button
                  disabled={!selectedExperience}
                  className={`w-full py-2.5 rounded-lg font-medium transition-colors text-sm ${
                    selectedExperience
                      ? "bg-gray-900 text-white hover:bg-gray-800 cursor-pointer"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Submit Answer
                </button>
              </div>

              {/* Bottom Block - Helpfulness Feedback */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-base font-bold text-gray-900 mb-4">Was this helpful?</h3>
                <div className="flex gap-3 mb-3">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-green-700 hover:bg-green-100 transition-colors cursor-pointer">
                    <IoThumbsUpOutline className="w-5 h-5" />
                    <span className="font-medium text-sm">Yes</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 hover:bg-red-100 transition-colors cursor-pointer">
                    <IoThumbsDownOutline className="w-5 h-5" />
                    <span className="font-medium text-sm">No</span>
                  </button>
                </div>
                <p className="text-xs text-gray-500 text-center">Your feedback helps us improve PepPedia</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}