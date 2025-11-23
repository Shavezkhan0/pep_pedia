"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";
import { IoChevronForwardOutline, IoChevronDownOutline } from "react-icons/io5";
import { FaSyringe } from "react-icons/fa";
import { IoWaterOutline } from "react-icons/io5";
import { IoMedicalOutline } from "react-icons/io5";
import { IoBodyOutline } from "react-icons/io5";

interface FilterCategoriesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  totalCount: number;
}

const FilterCategories: React.FC<FilterCategoriesProps> = ({
  open,
  onOpenChange,
  selectedFilter,
  onFilterChange,
  totalCount,
}) => {
  const administrationMethods = [
    { name: "Injectable", icon: FaSyringe, count: 44 },
    { name: "Nasal", icon: IoWaterOutline, count: 14 },
    { name: "Oral", icon: IoMedicalOutline, count: 13 },
    { name: "Topical", icon: IoBodyOutline, count: 10 },
  ];

  const researchLevels = [
    { name: "FDA Approved", color: "green", count: 5 },
    { name: "Limited Research", color: "gray", count: 6 },
    { name: "Well Researched", color: "blue", count: 19 },
  ];

  const applications = [
    {
      name: "Health & Wellness",
      count: 5,
      subCategories: [
        { name: "Anti-Inflammatory", count: 4 },
        { name: "Cellular Health", count: 2 },
        { name: "Energy & Metabolism", count: 2 },
        { name: "Immune Support", count: 4 },
        { name: "Longevity & Life Extension", count: 1 },
      ],
    },
    {
      name: "Performance & Recovery",
      count: 5,
      subCategories: [
        { name: "Growth Hormone", count: 3 },
        { name: "Muscle Growth", count: 4 },
        { name: "Recovery", count: 5 },
        { name: "Tissue Repair", count: 5 },
        { name: "Wound Healing", count: 3 },
      ],
    },
    {
      name: "Beauty & Anti-Aging",
      count: 4,
      subCategories: [
        { name: "Anti-Aging", count: 12 },
        { name: "Hair Growth", count: 1 },
        { name: "Skin Health", count: 4 },
        { name: "Skin Regeneration", count: 1 },
      ],
    },
    {
      name: "Brain & Mood",
      count: 6,
      subCategories: [
        { name: "Anxiety Relief", count: 2 },
        { name: "Cognitive Enhancement", count: 8 },
        { name: "Memory Enhancement", count: 1 },
        { name: "Mood Support", count: 3 },
        { name: "Neurological Support", count: 13 },
        { name: "Sleep Quality", count: 2 },
      ],
    },
    {
      name: "Metabolic & Weight",
      count: 5,
      subCategories: [
        { name: "Cardiovascular", count: 7 },
        { name: "Gastrointestinal", count: 1 },
        { name: "Gut Health", count: 1 },
        { name: "Metabolism Support", count: 13 },
        { name: "Weight Loss", count: 9 },
      ],
    },
  ];

  const [expandedApps, setExpandedApps] = useState<Set<string>>(new Set());

  const toggleApp = (appName: string) => {
    const newExpanded = new Set(expandedApps);
    if (newExpanded.has(appName)) {
      newExpanded.delete(appName);
    } else {
      newExpanded.add(appName);
    }
    setExpandedApps(newExpanded);
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case "yellow":
        return "bg-yellow-500";
      case "green":
        return "bg-green-500";
      case "blue":
        return "bg-blue-500";
      case "gray":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed bottom-0 left-0 right-0 md:top-4 md:bottom-4 md:left-4 md:right-auto w-full md:max-w-sm h-[90vh] md:h-auto bg-white shadow-2xl z-50 flex flex-col overflow-hidden rounded-t-3xl md:rounded-2xl animate-filter-slide">
          {/* Drag Handle - Mobile Only */}
          <div className="md:hidden flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
          </div>
          
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-5 border-b border-gray-200 shrink-0">
            <Dialog.Title className="text-xl font-bold text-gray-900">
              Filter Categories
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                <IoClose className="w-5 h-5 text-gray-600" />
              </button>
            </Dialog.Close>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-5 py-5">
            <div className="space-y-6">
              {/* All Peptides */}
              <div>
                <button
                  onClick={() => onFilterChange("All Peptides")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                    selectedFilter === "All Peptides"
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <span className={`text-sm font-medium ${
                    selectedFilter === "All Peptides" ? "text-blue-600" : "text-gray-900"
                  }`}>
                    All Peptides
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    selectedFilter === "All Peptides"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-200 text-gray-700"
                  }`}>
                    {totalCount}
                  </span>
                </button>
              </div>

              {/* Administration Method */}
              <div>
                <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
                  ADMINISTRATION METHOD
                </h3>
                <div className="space-y-1">
                  {administrationMethods.map((method, index) => {
                    const IconComponent = method.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => onFilterChange(method.name)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                          selectedFilter === method.name
                            ? "bg-blue-50 text-blue-600"
                            : "hover:bg-gray-50 text-gray-900"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <IconComponent className={`w-4 h-4 ${
                            selectedFilter === method.name ? "text-blue-600" : "text-gray-600"
                          }`} />
                          <span className={`text-sm font-medium ${
                            selectedFilter === method.name ? "text-blue-600" : "text-gray-900"
                          }`}>
                            {method.name}
                          </span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          selectedFilter === method.name
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-200 text-gray-700"
                        }`}>
                          {method.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Research Level */}
              <div>
                <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
                  RESEARCH LEVEL
                </h3>
                <div className="space-y-1">
                  {researchLevels.map((level, index) => (
                    <button
                      key={index}
                      onClick={() => onFilterChange(level.name)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                        selectedFilter === level.name
                          ? "bg-blue-50 text-blue-600"
                          : "hover:bg-gray-50 text-gray-900"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${getColorClass(
                            level.color
                          )}`}
                        />
                        <span className={`text-sm font-medium ${
                          selectedFilter === level.name ? "text-blue-600" : "text-gray-900"
                        }`}>
                          {level.name}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        selectedFilter === level.name
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-200 text-gray-700"
                      }`}>
                        {level.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Applications */}
              <div>
                <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
                  APPLICATIONS
                </h3>
                <div className="space-y-1">
                  {applications.map((app, index) => {
                    const isExpanded = expandedApps.has(app.name);
                    return (
                      <div key={index}>
                        <button
                          onClick={() => toggleApp(app.name)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                            selectedFilter === app.name
                              ? "bg-blue-50 text-blue-600"
                              : "hover:bg-gray-50 text-gray-900"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            {isExpanded ? (
                              <IoChevronDownOutline className="w-4 h-4 text-gray-600" />
                            ) : (
                              <IoChevronForwardOutline className="w-4 h-4 text-gray-600" />
                            )}
                            <span className={`text-sm font-medium ${
                              selectedFilter === app.name ? "text-blue-600" : "text-gray-900"
                            }`}>
                              {app.name}
                            </span>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            selectedFilter === app.name
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-200 text-gray-700"
                          }`}>
                            {app.count}
                          </span>
                        </button>
                        {isExpanded && (
                          <div className="ml-7 mt-1 space-y-1 border-l border-gray-200 pl-3">
                            {app.subCategories.map((subCat, subIndex) => (
                              <button
                                key={subIndex}
                                onClick={() => onFilterChange(`${app.name} - ${subCat.name}`)}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                                  selectedFilter === `${app.name} - ${subCat.name}`
                                    ? "bg-blue-50 text-blue-600"
                                    : "hover:bg-gray-50 text-gray-700"
                                }`}
                              >
                                <span className={`text-sm font-medium ${
                                  selectedFilter === `${app.name} - ${subCat.name}` ? "text-blue-600" : "text-gray-700"
                                }`}>
                                  {subCat.name}
                                </span>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                  selectedFilter === `${app.name} - ${subCat.name}`
                                    ? "bg-blue-100 text-blue-600"
                                    : "bg-gray-200 text-gray-700"
                                }`}>
                                  {subCat.count}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default FilterCategories;

