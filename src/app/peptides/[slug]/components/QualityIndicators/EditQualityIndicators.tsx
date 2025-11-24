"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { toast } from 'sonner';

interface QualityCheck {
  indicator: string;
  type: string;
  description: string;
}

interface EditQualityIndicatorsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditQualityIndicators({
  open,
  onOpenChange,
}: EditQualityIndicatorsProps) {
  const [qualityChecks, setQualityChecks] = useState<QualityCheck[]>([
    {
      indicator: "Clear to slightly opalescent solution",
      type: "Good Sign (Green)",
      description: "Properly reconstituted survodutide should be clear or have slight opalescence without visible particles"
    },
    {
      indicator: "Sealed vial with intact rubber stopper",
      type: "Good Sign (Green)",
      description: "Ensures sterility and proper storage conditions have been maintained"
    },
    {
      indicator: "Within expiration date",
      type: "Good Sign (Green)",
      description: "Check both powder and bacteriostatic water expiration dates before use"
    },
    {
      indicator: "Slight foam after reconstitution",
      type: "Acceptable (Yellow)",
      description: "Normal if disappears within minutes - allow to settle before drawing dose"
    },
    {
      indicator: "Cloudy solution or visible particles",
      type: "Red Flag (Red)",
      description: "Do not use - may indicate contamination or degradation"
    },
    {
      indicator: "Discoloration of powder or solution",
      type: "Red Flag (Red)",
      description: "Should be white to off-white powder and colorless solution when reconstituted"
    },
  ]);
  
  const [reason, setReason] = useState("");
  const [sources, setSources] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ qualityChecks, reason, sources });
    
    toast.success("Your edit has been submitted for review! We'll notify you when it's been reviewed.", {
      duration: 5000,
    });
    
    onOpenChange(false);
  };

  const removeCheck = (index: number) => {
    setQualityChecks(qualityChecks.filter((_, i) => i !== index));
  };

  const addCheck = () => {
    setQualityChecks([...qualityChecks, { indicator: "", type: "", description: "" }]);
  };

  const updateCheck = (index: number, field: keyof QualityCheck, value: string) => {
    const updated = [...qualityChecks];
    updated[index][field] = value;
    setQualityChecks(updated);
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
                  Edit Quality Indicators
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
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Quality Checks List */}
              {qualityChecks.map((check, index) => (
                <div key={index} className="space-y-4 pb-6 border-b border-gray-200 last:border-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Quality Indicator */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quality Indicator
                      </label>
                      <input
                        type="text"
                        value={check.indicator}
                        onChange={(e) => updateCheck(index, 'indicator', e.target.value)}
                        placeholder="e.g., Clear to slightly opalescent solution"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-text"
                      />
                    </div>

                    {/* Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type
                      </label>
                      <select
                        value={check.type}
                        onChange={(e) => updateCheck(index, 'type', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                      >
                        <option value="">Select type...</option>
                        <option value="Good Sign (Green)">Good Sign (Green)</option>
                        <option value="Acceptable (Yellow)">Acceptable (Yellow)</option>
                        <option value="Red Flag (Red)">Red Flag (Red)</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={check.description}
                      onChange={(e) => updateCheck(index, 'description', e.target.value)}
                      placeholder="Describe what to look for..."
                      rows={2}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-text resize-none"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => removeCheck(index)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium transition-colors cursor-pointer"
                  >
                    <IoTrashOutline className="w-4 h-4" />
                    Remove Quality Check
                  </button>
                </div>
              ))}

              {/* Add New Quality Check Button */}
              <button
                type="button"
                onClick={addCheck}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors cursor-pointer text-sm font-medium"
              >
                + Add Quality Check
              </button>

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

