"use client";

import React from "react";
import Link from "next/link";
import Card from "./Card";

const featuredPeptides = [
  {
    icon: "ORF",
    title: "Orforglipron",
    subtitle: "Oral Small-Molecule GLP-1 Receptor Agonist",
    tags: ["Weight Loss", "Diabetes", "Heart Health"],
    researchUses: [
      "Obesity Management Without Diabetes",
      "Obesity Management With Type 2 Diabetes",
      "Cardiometabolic Risk Factor Improvement",
      "Prediabetes Prevention",
      "Early Type 2 Diabetes Management",
    ],
    status: "Extensively Studied" as const,
    link: "/peptides/orforglipron",
  },
  {
    icon: "SUR",
    title: "Survodutide",
    subtitle: "Dual GLP-1/Glucagon Receptor Agonist",
    tags: ["Weight Loss", "Metabolism", "Heart Health"],
    researchUses: [
      "Obesity Without Diabetes",
      "Obesity With Type 2 Diabetes",
      "Sustained Weight Management",
      "Metabolic Dysfunction-Associated Steatohepatitis (MASH)",
      "Liver Fat Reduction",
    ],
    status: "Extensively Studied" as const,
    link: "/peptides/survodutide",
  },
  {
    icon: "BPC",
    title: "BPC-157",
    subtitle: "Body Protection Compound-157 Synthetic Peptide",
    tags: ["Gastrointestinal", "Wound Healing", "Neurological Support"],
    researchUses: [
      "Ulcer Protection",
      "Intestinal Repair",
      "Mucosal Healing",
      "Tendon Healing",
      "Muscle Recovery",
    ],
    status: "Extensively Studied" as const,
    link: "/peptides/bpc-157",
  },
  {
    icon: "THY",
    title: "Thymosin Beta-4",
    subtitle: "43-Amino Acid Regenerative Peptide",
    tags: ["Tissue Repair", "Heart Health", "Neuroprotection"],
    researchUses: [
      "Wound Healing Acceleration",
      "Post-Surgical Recovery",
      "Soft Tissue Injury Repair",
      "Cardiac Protection Post-MI",
      "Coronary Artery Disease",
    ],
    status: "Well Researched" as const,
    link: "/peptides/thymosin-beta-4",
  },
  {
    icon: "RET",
    title: "Retatrutide",
    subtitle: "Triple GLP-1/GIP/Glucagon Receptor Agonist",
    tags: ["Weight Loss", "Diabetes", "Heart Health"],
    researchUses: [
      "Superior Weight Reduction",
      "Sustained Weight Management",
      "Triple Mechanism Obesity Treatment",
      "Superior Glycemic Control",
      "Glucose-Dependent Regulation",
    ],
    status: "Extensively Studied" as const,
    link: "/peptides/retatrutide",
  },
  {
    icon: "NAD",
    title: "NAD+",
    subtitle: "Essential Cellular Coenzyme | Nicotinamide Adenine Dinucleotide",
    tags: ["Energy & Metabolism", "Anti-Aging", "Neurological Support"],
    researchUses: [
      "Cellular Energy Production",
      "Metabolic Optimization",
      "Exercise Performance",
      "DNA Repair Enhancement",
      "Sirtuin Activation",
    ],
    status: "Extensively Studied" as const,
    link: "/peptides/nad-plus",
  },
  {
    icon: "TB",
    title: "TB-500",
    subtitle: "Ac-LKKTETQ | Synthetic Fragment of Thymosin Beta-4",
    tags: ["Tissue Repair", "Athletic Recovery", "Neurological Support"],
    researchUses: [
      "Muscle Regeneration",
      "Tendon & Ligament Healing",
      "Wound Healing",
      "Exercise Recovery",
      "Injury Prevention",
    ],
    status: "Well Researched" as const,
    link: "/peptides/tb-500",
  },
  {
    icon: "IPA",
    title: "Ipamorelin",
    subtitle: "Growth Hormone Secretagogue Receptor Agonist",
    tags: ["Growth Hormone", "Body Recomposition", "Recovery"],
    researchUses: [
      "Natural GH Stimulation",
      "IGF-1 Enhancement",
      "Anti-Aging Benefits",
      "Lean Muscle Development",
      "Fat Loss Support",
    ],
    status: "Well Researched" as const,
    link: "/peptides/ipamorelin",
  },
  {
    icon: "GPL",
    title: "Glow Protocol",
    subtitle: "Multi-Peptide Skin Rejuvenation Protocol",
    tags: ["Skin Rejuvenation", "Wound Healing", "Dosing Concerns"],
    researchUses: [
      "Theoretical Synergistic Effects",
      "Convenience Factor",
      "Variable Response",
      "BPC-157 Component Effects",
      "TB-500 Tissue Regeneration",
    ],
    status: "Limited Research" as const,
    link: "/protocols/glow-protocol",
  },
];

const HomeFeatures: React.FC = () => {
  return (
    <section className="w-full bg-gray-50 max-w-7xl mx-auto px-6 md:px-8 lg:px-24 xl:px-32 py-16 mt-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Featured</h2>
        <Link
          href="/browse"
          className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 transition-colors cursor-pointer"
        >
          Browse All
          <span>→</span>
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredPeptides.map((peptide, index) => (
          <Card key={index} {...peptide} />
        ))}
      </div>
    </section>
  );
};

export default HomeFeatures;
