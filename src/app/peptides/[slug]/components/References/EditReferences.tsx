"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { toast } from 'sonner';

interface ResearchStudy {
  title: string;
  details: string;
  description: string;
  link?: string;
}

interface RecentPublication {
  title: string;
  source: string;
  date: string;
  summary: string;
  link?: string;
}

interface EditReferencesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditReferences({
  open,
  onOpenChange,
}: EditReferencesProps) {
  const [researchStudies, setResearchStudies] = useState<ResearchStudy[]>([
    {
      title: "Phase 2 Obesity Trial Without Diabetes (2024)",
      details: "Human | 0.6-4.8mg weekly | 46 weeks | Up to 14.9% weight loss",
      description: "In 387 participants with BMI ≥27 kg/m² without diabetes, survodutide 4.8mg achieved mean 14.9% weight loss vs 2.8% placebo. 83% achieved ≥5% weight loss, 69% achieved ≥10%, and 55% achieved ≥15% weight loss.",
      link: "https://clinicaltrials.gov/..."
    },
    {
      title: "Phase 2 MASH and Fibrosis Trial (2024)",
      details: "Human | 2.4-6.0mg weekly | 48 weeks | 47-62% MASH improvement",
      description: "In 293 participants with biopsy-confirmed MASH and fibrosis F1-F3, survodutide improved MASH without worsening fibrosis in 47% (2.4mg), 62% (4.8mg), and 43% (6.0mg) vs 14% placebo. Liver fat reduction ≥30% occurred in 63-67% of treated patients.",
      link: "https://clinicaltrials.gov/..."
    },
    {
      title: "Phase 2 Type 2 Diabetes Trial (2023)",
      details: "Human | 0.3-2.7mg weekly | 16 weeks | Superior to semaglutide",
      description: "Head-to-head comparison showed survodutide achieved greater weight loss than semaglutide 1.0mg after 16 weeks (-8.7% vs -5.3%). HbA1c reductions were dose-dependent, reaching -1.6% with highest doses.",
      link: "https://clinicaltrials.gov/..."
    },
    {
      title: "Preclinical Pharmacology Study (2022)",
      details: "Animal/In vitro | Various doses | EC50 0.52nM GCGR, 0.33nM GLP-1R",
      description: "Demonstrated balanced dual agonism with ~1:1 potency ratio at glucagon and GLP-1 receptors. Half-life of 44 hours in mice and 140 hours in dogs supported once-weekly dosing development.",
    },
  ]);

  const [recentPublications, setRecentPublications] = useState<RecentPublication[]>([
    {
      title: "SYNCHRONIZE Phase 3 Trials Launch for Obesity",
      source: "Obesity Journal",
      date: "November 2024",
      summary: "Two multinational Phase 3 trials (SYNCHRONIZE-1 and -2) enrolling over 1,400 participants to evaluate survodutide for obesity with and without type 2 diabetes over 76 weeks.",
      link: "https://doi.org/..."
    },
    {
      title: "Survodutide Shows Promise for MASH in Cirrhosis",
      source: "Journal of Hepatology",
      date: "August 2024",
      summary: "Phase 1 trial demonstrates survodutide is well-tolerated in compensated and decompensated cirrhosis with no dose adjustment needed, showing improvements in liver fat and stiffness.",
      link: "https://doi.org/..."
    },
    {
      title: "Cardiovascular Outcomes Trial SYNCHRONIZE-CVOT",
      source: "JACC: Heart Failure",
      date: "October 2024",
      summary: "Event-driven Phase 3 trial enrolling 4,935 participants to evaluate cardiovascular safety and potential benefits of survodutide in high-risk obesity patients.",
      link: "https://doi.org/..."
    },
    {
      title: "Real-World Implications of Dual Agonism in Metabolic Disease",
      source: "Diabetes Research and Clinical Practice",
      date: "December 2024",
      summary: "Review highlights survodutide's unique mechanism targeting both energy intake and expenditure, potentially addressing weight regain issues seen with GLP-1 monotherapy.",
      link: "https://doi.org/..."
    },
  ]);

  const [reason, setReason] = useState("");
  const [sources, setSources] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ researchStudies, recentPublications, reason, sources });
    
    toast.success("Your edit has been submitted for review! We'll notify you when it's been reviewed.", {
      duration: 5000,
    });
    
    onOpenChange(false);
  };

  const removeStudy = (index: number) => {
    setResearchStudies(researchStudies.filter((_, i) => i !== index));
  };

  const addStudy = () => {
    setResearchStudies([...researchStudies, { title: "", details: "", description: "", link: "" }]);
  };

  const updateStudy = (index: number, field: keyof ResearchStudy, value: string) => {
    const updated = [...researchStudies];
    updated[index] = { ...updated[index], [field]: value };
    setResearchStudies(updated);
  };

  const removePublication = (index: number) => {
    setRecentPublications(recentPublications.filter((_, i) => i !== index));
  };

  const addPublication = () => {
    setRecentPublications([...recentPublications, { title: "", source: "", date: "", summary: "", link: "" }]);
  };

  const updatePublication = (index: number, field: keyof RecentPublication, value: string) => {
    const updated = [...recentPublications];
    updated[index] = { ...updated[index], [field]: value };
    setRecentPublications(updated);
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
                  Edit References
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
              {/* Research Studies Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-base font-bold text-gray-900">Research Studies</h3>
                </div>
                
                <div className="space-y-6">
                  {researchStudies.map((study, index) => (
                    <div key={index} className="space-y-4 pb-6 border-b border-gray-200 last:border-0">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Study Title
                        </label>
                        <input
                          type="text"
                          value={study.title}
                          onChange={(e) => updateStudy(index, 'title', e.target.value)}
                          placeholder="e.g., Phase 2 Obesity Trial Without Diabetes (2024)"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-text"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Study Details
                        </label>
                        <input
                          type="text"
                          value={study.details}
                          onChange={(e) => updateStudy(index, 'details', e.target.value)}
                          placeholder="e.g., Human | 0.6-4.8mg weekly | 46 weeks | Up to 14.9% weight loss"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-text"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={study.description}
                          onChange={(e) => updateStudy(index, 'description', e.target.value)}
                          placeholder="Describe the study findings..."
                          rows={3}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-text resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Link (Optional)
                        </label>
                        <input
                          type="url"
                          value={study.link || ""}
                          onChange={(e) => updateStudy(index, 'link', e.target.value)}
                          placeholder="https://clinicaltrials.gov/..."
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-text"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => removeStudy(index)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium transition-colors cursor-pointer"
                      >
                        <IoTrashOutline className="w-4 h-4" />
                        Remove Study
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addStudy}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors cursor-pointer text-sm font-medium"
                  >
                    + Add Research Study
                  </button>
                </div>
              </div>

              {/* Recent Publications Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <h3 className="text-base font-bold text-gray-900">Recent Publications</h3>
                </div>
                
                <div className="space-y-6">
                  {recentPublications.map((publication, index) => (
                    <div key={index} className="space-y-4 pb-6 border-b border-gray-200 last:border-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Publication Title
                          </label>
                          <input
                            type="text"
                            value={publication.title}
                            onChange={(e) => updatePublication(index, 'title', e.target.value)}
                            placeholder="e.g., SYNCHRONIZE Phase 3 Trials Launch"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-text"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Source
                          </label>
                          <input
                            type="text"
                            value={publication.source}
                            onChange={(e) => updatePublication(index, 'source', e.target.value)}
                            placeholder="e.g., Obesity Journal"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-text"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date
                          </label>
                          <input
                            type="text"
                            value={publication.date}
                            onChange={(e) => updatePublication(index, 'date', e.target.value)}
                            placeholder="e.g., November 2024"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-text"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Link (Optional)
                          </label>
                          <input
                            type="url"
                            value={publication.link || ""}
                            onChange={(e) => updatePublication(index, 'link', e.target.value)}
                            placeholder="https://doi.org/..."
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-text"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Summary
                        </label>
                        <textarea
                          value={publication.summary}
                          onChange={(e) => updatePublication(index, 'summary', e.target.value)}
                          placeholder="Brief summary of the publication..."
                          rows={3}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-text resize-none"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => removePublication(index)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium transition-colors cursor-pointer"
                      >
                        <IoTrashOutline className="w-4 h-4" />
                        Remove Publication
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addPublication}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors cursor-pointer text-sm font-medium"
                  >
                    + Add Publication
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

