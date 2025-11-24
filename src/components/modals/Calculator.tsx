"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";

type Mode = "reconstitute" | "mix";

type VialSize = "2" | "3" | "5" | "10";

type DoseUnit = "mg" | "mcg";

type Frequency = "daily" | "twice" | "weekly";

type InputMethod = "concentration" | "vial";

interface Solution {
  method: InputMethod;
  peptideAmount: string;
  bacWater: string;
  volume: string;
  concentration?: string;
  concentrationUnit?: "mg/mL" | "mcg/mL";
}

export default function Calculator({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [mode, setMode] = useState<Mode>("reconstitute");
  const [peptideAmount, setPeptideAmount] = useState("0");
  const [vialSize, setVialSize] = useState<VialSize>("10");
  const [dose, setDose] = useState("0");
  const [doseUnit, setDoseUnit] = useState<DoseUnit>("mg");
  const [frequency, setFrequency] = useState<Frequency>("weekly");
  const [numSolutions, setNumSolutions] = useState<number>(2);
  const [solutions, setSolutions] = useState<Solution[]>([
    { method: "concentration", peptideAmount: "0", bacWater: "0", volume: "0", concentration: "0", concentrationUnit: "mg/mL" },
    { method: "concentration", peptideAmount: "0", bacWater: "0", volume: "0", concentration: "0", concentrationUnit: "mg/mL" },
  ]);

  const handleSolutionChange = (
    index: number,
    field: keyof Solution,
    value: string | InputMethod
  ) => {
    const updated = [...solutions];
    updated[index] = { ...updated[index], [field]: value };
    setSolutions(updated);
  };

  const handleStartOver = () => {
    setPeptideAmount("0");
    setVialSize("10");
    setDose("0");
    setDoseUnit("mg");
    setFrequency("weekly");
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed bottom-0 left-0 right-0 md:top-4 md:bottom-4 md:left-auto md:right-4 md:w-full md:max-w-2xl h-[90vh] md:h-auto bg-gray-50 rounded-t-3xl md:rounded-2xl shadow-2xl z-50 flex flex-col animate-slide-in-up">
          {/* Drag Handle - Mobile Only */}
          <div className="md:hidden flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
          </div>
          
          {/* Fixed Header */}
          <div className="px-4 md:px-6 pt-2 md:pt-6 pb-4 shrink-0 border-b border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <Dialog.Title className="text-2xl font-bold text-gray-900">
                Calculator
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer">
                  <IoClose className="w-5 h-5 text-gray-600" />
                </button>
              </Dialog.Close>
            </div>

            {/* Mode Selection */}
            <div className="relative flex gap-2 bg-gray-100 p-1 rounded-full">
              {/* Sliding Background */}
              <div
                className={`absolute top-1 bottom-1 rounded-full bg-gray-900 transition-all duration-300 ease-in-out ${
                  mode === "reconstitute"
                    ? "left-1 right-1/2"
                    : "left-1/2 right-1"
                }`}
              />
              <button
                onClick={() => setMode("reconstitute")}
                className={`relative z-10 flex-1 py-3 px-4 rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer ${
                  mode === "reconstitute"
                    ? "text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Reconstitute
              </button>
              <button
                onClick={() => setMode("mix")}
                className={`relative z-10 flex-1 py-3 px-4 rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer ${
                  mode === "mix"
                    ? "text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Mix Solutions
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 md:p-6">
            {mode === "reconstitute" ? (
              <div className="space-y-8">
                {/* Section 1: What's in your vial? */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-900 flex items-center justify-center text-sm font-semibold">
                        1
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        What&apos;s in your vial?
                      </h3>
                    </div>
                    <button
                      onClick={handleStartOver}
                      className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
                    >
                      Start Over
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Peptide Amount - Left Side */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Peptide Amount:
                      </label>
                      <div className="relative flex items-center border border-gray-300 rounded-xl bg-white focus-within:ring-1 focus-within:ring-gray-900 focus-within:border-gray-900">
                        <input
                          type="number"
                          value={peptideAmount}
                          onChange={(e) => setPeptideAmount(e.target.value)}
                          className="flex-1 px-4 py-2.5 bg-transparent text-gray-900 focus:outline-none border-0 cursor-text"
                        />
                        <span className="px-3 py-2 mx-2 my-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap">
                          mg
                        </span>
                      </div>
                    </div>

                    {/* Vial Size - Right Side */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vial Size:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {(["2", "3", "5", "10"] as VialSize[]).map((size) => (
                          <button
                            key={size}
                            onClick={() => setVialSize(size)}
                            className={`py-3 px-4 rounded-full border text-sm font-medium transition-all cursor-pointer ${
                              vialSize === size
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                            }`}
                          >
                            {size} mL
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: What's your dose per injection? */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-900 flex items-center justify-center text-sm font-semibold">
                      2
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      What&apos;s your dose per injection?
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your dose:
                      </label>
                      <div className="relative flex items-center border border-gray-300 rounded-xl bg-white focus-within:ring-1 focus-within:ring-gray-900 focus-within:border-gray-900">
                        <input
                          type="number"
                          value={dose}
                          onChange={(e) => setDose(e.target.value)}
                          className="flex-1 px-4 py-4 bg-transparent text-gray-900 focus:outline-none border-0"
                          placeholder="0"
                        />
                        <div className="relative flex bg-gray-100 rounded-full p-1 mx-2 my-1">
                          {/* Sliding Background */}
                          <div
                            className={`absolute top-1 bottom-1 rounded-full bg-gray-900 transition-all duration-300 ease-in-out ${
                              doseUnit === "mg"
                                ? "left-1 right-1/2"
                                : "left-1/2 right-1"
                            }`}
                          />
                          <button
                            onClick={() => setDoseUnit("mg")}
                            className={`relative z-10 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer ${
                              doseUnit === "mg"
                                ? "text-white"
                                : "text-gray-600"
                            }`}
                          >
                            mg
                          </button>
                          <button
                            onClick={() => setDoseUnit("mcg")}
                            className={`relative z-10 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer ${
                              doseUnit === "mcg"
                                ? "text-white"
                                : "text-gray-600"
                            }`}
                          >
                            mcg
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: How often will you inject? */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-900 flex items-center justify-center text-sm font-semibold">
                      3
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      How often will you inject?
                    </h3>
                  </div>

                  <div className="relative flex gap-2 bg-gray-100 p-1 rounded-xl">
                    {/* Sliding Background */}
                    <div
                      className={`absolute top-1 bottom-1 py-4 px-4 rounded-full bg-gray-900 transition-all duration-300 ease-in-out ${
                        frequency === "daily"
                          ? "left-1 right-2/3"
                          : frequency === "twice"
                          ? "left-1/3 right-1/3"
                          : "left-2/3 right-1"
                      }`}
                    />
                    <button
                      onClick={() => setFrequency("daily")}
                      className={`relative z-10 flex-1 py-4 px-4 rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer ${
                        frequency === "daily"
                          ? "text-white"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Daily (1x/day)
                    </button>
                    <button
                      onClick={() => setFrequency("twice")}
                      className={`relative z-10 flex-1 py-4 px-4 rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer ${
                        frequency === "twice"
                          ? "text-white"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Twice (2x/day)
                    </button>
                    <button
                      onClick={() => setFrequency("weekly")}
                      className={`relative z-10 flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-colors duration-300 cursor-pointer ${
                        frequency === "weekly"
                          ? "text-white"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Weekly (1x/wk)
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Step 1: How many solutions? */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-900 flex items-center justify-center text-sm font-semibold">
                      1
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      How many solutions are you mixing?
                    </h3>
                  </div>

                  <div className="flex gap-2">
                    {[2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        onClick={() => {
                          setNumSolutions(num);
                          const newSolutions = Array.from({ length: num }, (_, i) =>
                            solutions[i] || {
                              method: "vial",
                              peptideAmount: "0",
                              bacWater: "0",
                              volume: "0",
                            }
                          );
                          setSolutions(newSolutions);
                        }}
                        className={`flex-1 py-3 px-4 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                          numSolutions === num
                            ? "border border-blue-400 text-blue-600 bg-blue-50"
                            : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Enter details for each solution */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-900 flex items-center justify-center text-sm font-semibold">
                      2
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Enter details for each solution:
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {solutions.slice(0, numSolutions).map((solution, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-xl p-4 space-y-4"
                      >
                        <h4 className="font-semibold text-gray-900">
                          Solution {index + 1}
                        </h4>

                        <div className="relative flex gap-2 bg-gray-100 p-2 rounded-xl">
                          {/* Sliding Background */}
                          <div
                            className={`absolute top-1 bottom-1 rounded-xl bg-gray-900 transition-all duration-300 ease-in-out ${
                              solution.method === "concentration"
                                ? "left-1 right-1/2"
                                : "left-1/2 right-1"
                            }`}
                          />
                          <button
                            onClick={() =>
                              handleSolutionChange(index, "method", "concentration")
                            }
                            className={`relative z-10 flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-colors duration-300 cursor-pointer ${
                              solution.method === "concentration"
                                ? "text-white"
                                : "text-gray-600"
                            }`}
                          >
                            Know concentration
                          </button>
                          <button
                            onClick={() =>
                              handleSolutionChange(index, "method", "vial")
                            }
                            className={`relative z-10 flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-colors duration-300 cursor-pointer ${
                              solution.method === "vial"
                                ? "text-white"
                                : "text-gray-600"
                            }`}
                          >
                            Enter vial details
                          </button>
                        </div>

                        {solution.method === "vial" ? (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Peptide in vial:
                              </label>
                              <div className="relative flex items-center border border-gray-300 rounded-xl bg-white focus-within:ring-1 focus-within:ring-gray-900 focus-within:border-gray-900">
                                <input
                                  type="number"
                                  value={solution.peptideAmount}
                                  onChange={(e) =>
                                    handleSolutionChange(
                                      index,
                                      "peptideAmount",
                                      e.target.value
                                    )
                                  }
                                  className="flex-1 px-4 py-2.5 bg-transparent text-gray-900 focus:outline-none border-0 cursor-text"
                                  placeholder="0"
                                />
                                <span className="px-3 py-2 mx-2 my-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap">
                                  mg
                                </span>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                BAC water added:
                              </label>
                              <div className="relative flex items-center border border-gray-300 rounded-xl bg-white focus-within:ring-1 focus-within:ring-gray-900 focus-within:border-gray-900">
                                <input
                                  type="number"
                                  value={solution.bacWater}
                                  onChange={(e) =>
                                    handleSolutionChange(
                                      index,
                                      "bacWater",
                                      e.target.value
                                    )
                                  }
                                  className="flex-1 px-4 py-2.5 bg-transparent text-gray-900 focus:outline-none border-0 cursor-text"
                                  placeholder="0"
                                />
                                <span className="px-3 py-2 mx-2 my-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap">
                                  mL
                                </span>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Volume to use from this vial:
                              </label>
                              <div className="relative flex items-center border border-gray-300 rounded-xl bg-white focus-within:ring-1 focus-within:ring-gray-900 focus-within:border-gray-900">
                                <input
                                  type="number"
                                  value={solution.volume}
                                  onChange={(e) =>
                                    handleSolutionChange(
                                      index,
                                      "volume",
                                      e.target.value
                                    )
                                  }
                                  className="flex-1 px-4 py-2.5 bg-transparent text-gray-900 focus:outline-none border-0 cursor-text"
                                  placeholder="0"
                                />
                                <span className="px-3 py-2 mx-2 my-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap">
                                  mL
                                </span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Concentration:
                              </label>
                              <div className="relative flex items-center border border-gray-300 rounded-xl bg-white focus-within:ring-1 focus-within:ring-gray-900 focus-within:border-gray-900">
                                <input
                                  type="number"
                                  value={solution.concentration || ""}
                                  onChange={(e) =>
                                    handleSolutionChange(
                                      index,
                                      "concentration",
                                      e.target.value
                                    )
                                  }
                                  className="flex-1 px-4 py-2.5 bg-transparent text-gray-900 focus:outline-none border-0 cursor-text"
                                  placeholder="0"
                                />
                                <div className="relative flex bg-gray-100 rounded-full p-1 mx-2 my-1">
                                  {/* Sliding Background */}
                                  <div
                                    className={`absolute top-1 bottom-1 rounded-full bg-gray-900 transition-all duration-300 ease-in-out ${
                                      (solution.concentrationUnit || "mg/mL") === "mg/mL"
                                        ? "left-1 right-1/2"
                                        : "left-1/2 right-1"
                                    }`}
                                  />
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleSolutionChange(index, "concentrationUnit", "mg/mL")
                                    }
                                    className={`relative z-10 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-300 cursor-pointer ${
                                      (solution.concentrationUnit || "mg/mL") === "mg/mL"
                                        ? "text-white"
                                        : "text-gray-600"
                                    }`}
                                  >
                                    mg/mL
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleSolutionChange(index, "concentrationUnit", "mcg/mL")
                                    }
                                    className={`relative z-10 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-300 cursor-pointer ${
                                      (solution.concentrationUnit || "mg/mL") === "mcg/mL"
                                        ? "text-white"
                                        : "text-gray-600"
                                    }`}
                                  >
                                    mcg/mL
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Volume to use:
                              </label>
                              <div className="relative flex items-center border border-gray-300 rounded-xl bg-white focus-within:ring-1 focus-within:ring-gray-900 focus-within:border-gray-900">
                                <input
                                  type="number"
                                  value={solution.volume}
                                  onChange={(e) =>
                                    handleSolutionChange(
                                      index,
                                      "volume",
                                      e.target.value
                                    )
                                  }
                                  className="flex-1 px-4 py-2.5 bg-transparent text-gray-900 focus:outline-none border-0 cursor-text"
                                  placeholder="0"
                                />
                                <span className="px-3 py-2 mx-2 my-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap">
                                  mL
                                </span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

