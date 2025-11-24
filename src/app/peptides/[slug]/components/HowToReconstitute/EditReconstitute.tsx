"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { toast } from 'sonner';

interface EditReconstituteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditReconstitute({
  open,
  onOpenChange,
}: EditReconstituteProps) {
  const [materials, setMaterials] = useState([
    "Survodutide lyophilized powder vial",
    "Bacteriostatic water (typically 1-2mL)",
    "Insulin syringe (29-31 gauge)",
    "Alcohol swabs",
    "Sterile mixing needle (if separate from injection)"
  ]);

  const [steps, setSteps] = useState([
    "Remove survodutide vial from refrigerator and allow to reach room temperature (15-30 minutes)",
    "Clean rubber stoppers of both vials with alcohol swabs",
    "Draw prescribed amount of bacteriostatic water into syringe",
    "Insert needle into survodutide vial at 45-degree angle",
    "Slowly inject BAC water down the side of vial to minimize foaming",
    "Gently swirl vial - do not shake vigorously",
    "Allow to sit for 2-3 minutes for complete dissolution",
    "Solution should be clear to slightly opalescent without particles",
    "Store reconstituted solution in refrigerator immediately"
  ]);

  const [reason, setReason] = useState("");
  const [sources, setSources] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ materials, steps, reason, sources });
    
    toast.success("Your edit has been submitted for review! We'll notify you when it's been reviewed.", {
      duration: 5000,
    });
    
    onOpenChange(false);
  };

  const removeMaterial = (index: number) => {
    setMaterials(materials.filter((_, i) => i !== index));
  };

  const addMaterial = () => {
    setMaterials([...materials, ""]);
  };

  const updateMaterial = (index: number, value: string) => {
    const updated = [...materials];
    updated[index] = value;
    setMaterials(updated);
  };

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const addStep = () => {
    setSteps([...steps, ""]);
  };

  const updateStep = (index: number, value: string) => {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
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
                  Edit How to Reconstitute
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
              {/* Required Materials */}
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-4">Required Materials</h3>
                <div className="space-y-3">
                  {materials.map((material, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={material}
                        onChange={(e) => updateMaterial(index, e.target.value)}
                        placeholder="Enter required material..."
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-text"
                      />
                      <button
                        type="button"
                        onClick={() => removeMaterial(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <IoTrashOutline className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addMaterial}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors cursor-pointer text-sm font-medium"
                  >
                    + Add Material
                  </button>
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-4">Step-by-Step Instructions</h3>
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shrink-0 mt-2">
                        <span className="text-white text-sm font-semibold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <textarea
                          value={step}
                          onChange={(e) => updateStep(index, e.target.value)}
                          placeholder={`Step ${index + 1}...`}
                          rows={2}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-text resize-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeStep(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer mt-2"
                      >
                        <IoTrashOutline className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addStep}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors cursor-pointer text-sm font-medium"
                  >
                    + Add Step
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
                  rows={4}
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
                  rows={4}
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

