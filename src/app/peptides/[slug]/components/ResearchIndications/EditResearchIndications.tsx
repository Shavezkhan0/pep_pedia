"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { toast } from 'sonner';

interface Indication {
  name: string;
  effectiveness: string;
  color: string;
}

interface EditResearchIndicationsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  indications: Indication[];
}

export default function EditResearchIndications({
  open,
  onOpenChange,
  indications,
}: EditResearchIndicationsProps) {
  const [reason, setReason] = useState("");
  const [sources, setSources] = useState("");

  // Sample benefits data - in real app would come from props
  const [benefits, setBenefits] = useState({
    "Weight Loss": [
      { title: "Obesity Without Diabetes", content: "Phase 2 trial showed 14.9% mean weight loss at 46 weeks with 4.8mg dose, 55% achieving ≥15% weight loss" },
      { title: "Obesity With Type 2 Diabetes", content: "Superior weight loss vs semaglutide (-8.7% vs -5.3%) at 16 weeks in head-to-head trial" },
      { title: "Sustained Weight Management", content: "Dual mechanism addresses both energy intake and expenditure, potentially reducing weight regain" },
    ],
    "Metabolic": [
      { title: "Metabolic Dysfunction-Associated Steatohepatitis (MASH)", content: "Phase 2 trial: 62% achieved MASH improvement without fibrosis worsening at 4.8mg dose" },
      { title: "Liver Fat Reduction", content: "63-67% achieved ≥30% liver fat reduction in MASH trial, maintained in cirrhosis patients" },
      { title: "Type 2 Diabetes Control", content: "Dose-dependent HbA1c reduction up to -1.6% in Phase 2 trial on metformin background" },
    ],
    "Cardiovascular": [
      { title: "Blood Pressure Reduction", content: "Secondary endpoint in Phase 3 trials based on expected cardiovascular benefits from weight loss" },
      { title: "Cardiovascular Risk Factors", content: "SYNCHRONIZE-CVOT trial evaluating MACE outcomes in 4,935 high-risk participants" },
      { title: "Metabolic Syndrome Components", content: "Improvements in multiple parameters including waist circumference and glycemic control" },
    ],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ benefits, reason, sources });
    
    toast.success("Your edit has been submitted for review! We'll notify you when it's been reviewed.", {
      duration: 5000,
    });
    
    onOpenChange(false);
  };

  const removeBenefit = (category: string, index: number) => {
    setBenefits({
      ...benefits,
      [category]: benefits[category as keyof typeof benefits].filter((_, i) => i !== index)
    });
  };

  const addBenefit = (category: string) => {
    setBenefits({
      ...benefits,
      [category]: [...benefits[category as keyof typeof benefits], { title: "", content: "" }]
    });
  };

  const resetForm = () => {
    setReason("");
    setSources("");
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetForm();
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-0 bottom-0 left-auto right-0 w-full md:w-1/2 h-full bg-white shadow-2xl z-50 flex flex-col overflow-hidden md:rounded-tl-3xl md:rounded-bl-3xl animate-slide-in-right">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <Dialog.Title className="text-2xl font-bold text-gray-900">
                  Edit Research Indications
                </Dialog.Title>
                <p className="text-sm text-gray-600 mt-1">
                  Making changes below require a review and may take 1-4 days to update.
                </p>
              </div>
              <Dialog.Close asChild>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                  <IoClose className="w-6 h-6 text-gray-600" />
                </button>
              </Dialog.Close>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Weight Loss Benefits */}
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-4">Weight Loss</h3>
                <div className="space-y-4">
                  {benefits["Weight Loss"].map((benefit, index) => (
                    <div key={index} className="space-y-3 pb-4 border-b border-gray-100 last:border-0">
                      <input
                        type="text"
                        value={benefit.title}
                        onChange={(e) => {
                          const updated = [...benefits["Weight Loss"]];
                          updated[index].title = e.target.value;
                          setBenefits({ ...benefits, "Weight Loss": updated });
                        }}
                        placeholder="Benefit title"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-text"
                      />
                      <textarea
                        value={benefit.content}
                        onChange={(e) => {
                          const updated = [...benefits["Weight Loss"]];
                          updated[index].content = e.target.value;
                          setBenefits({ ...benefits, "Weight Loss": updated });
                        }}
                        placeholder="Benefit description"
                        rows={2}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-text resize-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeBenefit("Weight Loss", index)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium transition-colors cursor-pointer"
                      >
                        <IoTrashOutline className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addBenefit("Weight Loss")}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors cursor-pointer text-sm font-medium"
                  >
                    + Add New Benefit
                  </button>
                </div>
              </div>

              {/* Metabolic Benefits */}
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-4">Metabolic</h3>
                <div className="space-y-4">
                  {benefits["Metabolic"].map((benefit, index) => (
                    <div key={index} className="space-y-3 pb-4 border-b border-gray-100 last:border-0">
                      <input
                        type="text"
                        value={benefit.title}
                        onChange={(e) => {
                          const updated = [...benefits["Metabolic"]];
                          updated[index].title = e.target.value;
                          setBenefits({ ...benefits, "Metabolic": updated });
                        }}
                        placeholder="Benefit title"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-text"
                      />
                      <textarea
                        value={benefit.content}
                        onChange={(e) => {
                          const updated = [...benefits["Metabolic"]];
                          updated[index].content = e.target.value;
                          setBenefits({ ...benefits, "Metabolic": updated });
                        }}
                        placeholder="Benefit description"
                        rows={2}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-text resize-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeBenefit("Metabolic", index)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium transition-colors cursor-pointer"
                      >
                        <IoTrashOutline className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addBenefit("Metabolic")}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors cursor-pointer text-sm font-medium"
                  >
                    + Add New Benefit
                  </button>
                </div>
              </div>

              {/* Cardiovascular Benefits */}
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-4">Cardiovascular</h3>
                <div className="space-y-4">
                  {benefits["Cardiovascular"].map((benefit, index) => (
                    <div key={index} className="space-y-3 pb-4 border-b border-gray-100 last:border-0">
                      <input
                        type="text"
                        value={benefit.title}
                        onChange={(e) => {
                          const updated = [...benefits["Cardiovascular"]];
                          updated[index].title = e.target.value;
                          setBenefits({ ...benefits, "Cardiovascular": updated });
                        }}
                        placeholder="Benefit title"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-text"
                      />
                      <textarea
                        value={benefit.content}
                        onChange={(e) => {
                          const updated = [...benefits["Cardiovascular"]];
                          updated[index].content = e.target.value;
                          setBenefits({ ...benefits, "Cardiovascular": updated });
                        }}
                        placeholder="Benefit description"
                        rows={2}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-text resize-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeBenefit("Cardiovascular", index)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium transition-colors cursor-pointer"
                      >
                        <IoTrashOutline className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addBenefit("Cardiovascular")}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors cursor-pointer text-sm font-medium"
                  >
                    + Add New Benefit
                  </button>
                </div>
              </div>

              {/* Why are you making this change? */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Why are you making this change? <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g., Adding more recent research findings, correcting dosage information, improving clarity..."
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-text resize-none"
                />
              </div>

              {/* Sources */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Sources (Highly Recommended)
                </label>
                <textarea
                  value={sources}
                  onChange={(e) => setSources(e.target.value)}
                  placeholder="Add any research papers, studies, or reliable sources that support your changes..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-text resize-none"
                />
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex gap-3">
                  <IoInformationCircleOutline className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700 space-y-2">
                    <p>
                      <span className="font-semibold text-blue-700">Review Process:</span> Your changes will be reviewed by community experts before going live. This ensures high-quality, evidence-based content.
                    </p>
                    <p>
                      <span className="font-semibold text-blue-700">New Contributor:</span> Your first few edits require additional review. Build reputation by making quality contributions!
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Footer with Buttons */}
          <div className="px-6 py-4 border-t border-gray-200 shrink-0 bg-gray-50">
            <div className="flex justify-end gap-3">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </Dialog.Close>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={!reason.trim()}
                className={`px-6 py-2.5 rounded-xl transition-colors font-medium flex items-center gap-2 ${
                  reason.trim()
                    ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Submit Changes
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

