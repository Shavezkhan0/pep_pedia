"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";

export default function RequestPeptide({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [peptideName, setPeptideName] = useState("");
  const [links, setLinks] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ peptideName, links, file });
    onOpenChange(false);
  };

  const isFormValid = peptideName.trim() !== "" && links.trim() !== "";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg max-h-[90vh] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 shrink-0 border-b border-gray-200 flex items-center justify-between">
            <Dialog.Title className="text-2xl font-bold text-gray-900">
              Request a Peptide Addition
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer">
                <IoClose className="w-5 h-5 text-gray-600" />
              </button>
            </Dialog.Close>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Peptide Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Peptide Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={peptideName}
                  onChange={(e) => setPeptideName(e.target.value)}
                  placeholder="e.g., Epithalon, MOTS-c, etc."
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-text"
                />
              </div>

              {/* Links to Sources */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Links to Sources <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={links}
                  onChange={(e) => setLinks(e.target.value)}
                  placeholder="Please provide links to research papers, clinical trials, or reputable sources (one per line)"
                  required
                  rows={5}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-text resize-none"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Include multiple links separated by new lines
                </p>
              </div>

              {/* Upload PDF */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload PDF <span className="text-gray-500">(Optional)</span>
                </label>
                <label className="block">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
                    <FiUpload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                    <p className="text-blue-600 font-medium mb-1">Upload a file</p>
                    <p className="text-sm text-gray-500">PDF up to 10MB</p>
                    {file && (
                      <p className="mt-2 text-sm text-gray-700">{file.name}</p>
                    )}
                  </div>
                </label>
              </div>

              {/* Our Process Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-blue-700">Our process:</span>{" "}
                  We combine your submission with data from established research databases, using AI to synthesize comprehensive guides. But we don&apos;t stop there - ongoing community feedback helps us maintain accuracy and catch any issues. New pages typically publish within 1-4 days.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`px-6 py-2.5 rounded-xl transition-colors font-medium ${
                    isFormValid
                      ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

