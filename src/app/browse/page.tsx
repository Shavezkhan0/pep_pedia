"use client";

import { useState } from "react";

// Force dynamic rendering to avoid Clerk validation during build
export const dynamic = 'force-dynamic';
import { IoSearchOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { IoFilterOutline } from "react-icons/io5";
import { IoChevronDownOutline } from "react-icons/io5";
import Card from "@/components/cards/Card";
import RequestPeptide from "@/components/modals/RequestPeptide";
import FilterCategories from "@/components/filters/FilterCategories";
import Supporters from "@/components/cards/Supporters";

// Sample peptides data - in a real app, this would come from an API
const allPeptides = [
  {
    icon: "5",
    title: "5-Amino-1MQ",
    subtitle: "NNMT Inhibitor | Longevity & Metabolism",
    tags: ["Longevity & Life Extension", "Metabolism Support", "Weight Loss"],
    researchUses: [
      "NAD+ Enhancement",
      "Mitochondrial Function",
      "Cellular Repair",
      "Energy Metabolism",
      "Insulin Sensitivity",
    ],
    status: "Limited Research" as const,
    link: "/peptides/5-amino-1mq",
  },
  {
    icon: "ADA",
    title: "Adalank",
    subtitle: "N-Acetyl Selank Amidate | Enhanced Anxiolytic",
    tags: ["Anxiety Relief", "Cognitive Enhancement", "Neurological Support"],
    researchUses: [
      "Generalized Anxiety Disorder (GAD)",
      "Anxiety without Sedation",
      "Stress-Related Anxiety",
      "Cognitive Enhancement",
      "Memory Protection",
    ],
    status: "Well Researched" as const,
    link: "/peptides/adalank",
  },
  {
    icon: "ADA",
    title: "Adamax",
    subtitle: "Next-Generation Semax Derivative | Cognitive Enhancement",
    tags: ["Cognitive Enhancement", "Neurological Support", "Mood Support"],
    researchUses: [
      "Cognitive Enhancement",
      "Neuroplasticity Support",
      "Learning and Memory",
      "Stroke Recovery",
      "Oxidative Stress Protection",
    ],
    status: "Well Researched" as const,
    link: "/peptides/adamax",
  },
  {
    icon: "A(D",
    title: "Adipotide",
    subtitle: "Proapoptotic Peptide | Weight Loss",
    tags: ["Weight Loss", "Metabolism Support", "Appetite Control"],
    researchUses: [
      "Targeted Fat Reduction",
      "Obesity Treatment",
      "Adipose Tissue Reduction",
    ],
    status: "Emerging Research" as const,
    link: "/peptides/adipotide",
  },
  {
    icon: "AOD",
    title: "AOD-9604",
    subtitle: "Modified Growth Hormone Fragment | Weight Management",
    tags: ["Weight Loss", "Metabolism Support", "Body Composition"],
    researchUses: [
      "Fat Loss",
      "Metabolic Enhancement",
      "Lipolysis Stimulation",
      "Body Composition Improvement",
    ],
    status: "Extensively Studied" as const,
    link: "/peptides/aod-9604",
  },
  {
    icon: "A2R",
    title: "Ara 290",
    subtitle: "Erythropoietin Derivative | Tissue Repair",
    tags: ["Tissue Repair", "Neuropathy", "Wound Healing"],
    researchUses: [
      "Diabetic Neuropathy",
      "Tissue Regeneration",
      "Pain Management",
      "Wound Healing",
    ],
    status: "Limited Research" as const,
    link: "/peptides/ara-290",
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
    icon: "CAG",
    title: "Cagrilintide",
    subtitle: "GLP-1/Amylin Dual Agonist | Weight Management",
    tags: ["Weight Loss", "Diabetes", "Cardiovascular"],
    researchUses: [
      "Obesity Treatment",
      "Weight Management",
      "Appetite Control",
      "Glycemic Control",
    ],
    status: "Well Researched" as const,
    link: "/peptides/cagrilintide",
  },
  {
    icon: "CAR",
    title: "Carnosine",
    subtitle: "Dipeptide | Anti-Aging & Cellular Protection",
    tags: ["Anti-Aging", "Muscle Support", "Neurological Support"],
    researchUses: [
      "Muscle Fatigue Reduction",
      "Anti-Aging Effects",
      "Neurological Protection",
      "Oxidative Stress Reduction",
    ],
    status: "Extensively Studied" as const,
    link: "/peptides/carnosine",
  },
  {
    icon: "CER",
    title: "Cerebrolysin",
    subtitle: "Neuropeptide Preparation | Cognitive Enhancement",
    tags: ["Cognitive Enhancement", "Neurological Support", "Recovery"],
    researchUses: [
      "Alzheimer's Disease - Mixed Evidence",
      "Vascular Dementia - Established Efficacy",
      "Post-Stroke Cognitive Recovery",
      "Acute Stroke - Evidence Mixed",
      "Traumatic Brain Injury - Strong Evidence",
    ],
    status: "Well Researched" as const,
    link: "/peptides/cerebrolysin",
  },
  {
    icon: "CJC",
    title: "CJC-1295 (without DAC)",
    subtitle: "Short-Acting Growth Hormone Releasing Hormone",
    tags: ["Growth Hormone", "Anti-Aging", "Recovery"],
    researchUses: [
      "Natural GH Pulse Restoration",
      "IGF-1 Elevation",
      "Pituitary Function Support",
      "Muscle Mass Preservation",
      "Bone Density Support",
    ],
    status: "Well Researched" as const,
    link: "/peptides/cjc-1295",
  },
  {
    icon: "CJC",
    title: "CJC-1295 with DAC",
    subtitle: "Long-Acting Growth Hormone Releasing Hormone",
    tags: ["Growth Hormone", "Body Composition", "Anti-Aging"],
    researchUses: [
      "Sustained GH Elevation",
      "IGF-1 Optimization",
      "Convenience Protocol",
      "Fat Loss Enhancement",
      "Lean Mass Gains",
    ],
    status: "Well Researched" as const,
    link: "/peptides/cjc-1295-dac",
  },
  {
    icon: "CPJ",
    title: "CJC/IPA Protocol",
    subtitle: "GHRH/GHRP Combination | Growth Hormone Optimization",
    tags: ["Muscle Growth", "Metabolic Health", "Anti-Aging"],
    researchUses: [
      "Enhanced protein synthesis",
      "Improved recovery",
      "Lean mass preservation",
      "Body composition support",
      "Metabolic flexibility",
    ],
    status: "Well Researched" as const,
    link: "/protocols/cjc-ipa-protocol",
  },
  {
    icon: "DIH",
    title: "Dihexa",
    subtitle: "Synaptogenic Peptide | Cognitive Enhancement",
    tags: ["Cognitive Enhancement", "Neurological Support"],
    researchUses: [
      "Memory Enhancement",
      "Learning Acceleration",
      "Cognitive Recovery",
      "Alzheimer's Disease",
      "Synaptic Preservation",
    ],
    status: "Emerging Research" as const,
    link: "/peptides/dihexa",
  },
  {
    icon: "DSI",
    title: "DSIP",
    subtitle: "Delta Sleep-Inducing Peptide | Sleep Quality",
    tags: ["Sleep Quality", "Mood Support", "Metabolism Support"],
    researchUses: [
      "Deep Sleep Enhancement",
      "Sleep Efficiency",
      "Natural Sleep Architecture",
      "Stress Response Modulation",
      "Mood Stabilization",
    ],
    status: "Emerging Research" as const,
    link: "/peptides/dsip",
  },
  {
    icon: "EPI",
    title: "Epitalon",
    subtitle: "Synthetic Pineal Tetrapeptide | Longevity",
    tags: ["Anti-Aging", "Neurological Support", "Immune Support"],
    researchUses: [
      "Telomere Extension",
      "Cellular Rejuvenation",
      "Lifespan Extension",
      "Pineal Function Restoration",
      "Neurogenesis Support",
    ],
    status: "Well Researched" as const,
    link: "/peptides/epitalon",
  },
  {
    icon: "GHK",
    title: "GHK-Cu",
    subtitle: "Copper Peptide | Skin Regeneration & Anti-Aging",
    tags: ["Skin Regeneration", "Hair Growth", "Anti-Inflammatory"],
    researchUses: [
      "Collagen Synthesis",
      "Wound Healing",
      "Anti-Aging Effects",
      "Follicle Stimulation",
      "Scalp Health",
    ],
    status: "Limited Research" as const,
    link: "/peptides/ghk-cu",
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
  {
    icon: "IGF",
    title: "IGF-1 LR3",
    subtitle: "Modified Growth Factor Analog | Muscle Growth",
    tags: ["Muscle Growth", "Tissue Repair", "Metabolism Support"],
    researchUses: [
      "Hypertrophy",
      "Anti-Catabolic Effects",
      "Tissue Repair",
      "Metabolic Enhancement",
    ],
    status: "Limited Research" as const,
    link: "/peptides/igf-1-lr3",
  },
  {
    icon: "IPA",
    title: "Ipamorelin",
    subtitle: "Growth Hormone Secretagogue | Natural GH Stimulation",
    tags: ["Growth Hormone", "Body Composition", "Recovery"],
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
    icon: "KIS",
    title: "Kisspeptin",
    subtitle: "KISS1 Gene Product | Reproductive Health",
    tags: ["Reproductive", "Sexual", "Metabolism Support"],
    researchUses: [
      "Hypogonadotropic Hypogonadism",
      "IVF Ovulation Trigger",
      "Hypothalamic Amenorrhea",
      "Reproductive Health",
    ],
    status: "Emerging Research" as const,
    link: "/peptides/kisspeptin",
  },
  {
    icon: "KPL",
    title: "KLOW Protocol",
    subtitle: "Four-Peptide Regenerative Blend",
    tags: ["Theoretical", "Anecdotal", "Concerns"],
    researchUses: [
      "Theoretical Benefits",
      "Limited Evidence",
      "Variable Response",
    ],
    status: "Limited Research" as const,
    link: "/protocols/klow-protocol",
  },
  {
    icon: "KPV",
    title: "KPV",
    subtitle: "Anti-Inflammatory Tripeptide",
    tags: ["Anti-Inflammatory", "Gut Health", "Immune Function"],
    researchUses: [
      "Inflammation Reduction",
      "Gut Health Support",
      "Immune Modulation",
    ],
    status: "Emerging Research" as const,
    link: "/peptides/kpv",
  },
  {
    icon: "LL",
    title: "LL-37",
    subtitle: "Antimicrobial Peptide | Immune Support",
    tags: ["Wound Healing", "Immune Support", "Skin Health"],
    researchUses: [
      "Wound Healing",
      "Antimicrobial Activity",
      "Immune Function",
      "Skin Health",
    ],
    status: "Well Researched" as const,
    link: "/peptides/ll-37",
  },
  {
    icon: "MIE",
    title: "Melanotan I",
    subtitle: "Melanocortin Receptor Agonist | Skin Health",
    tags: ["Skin Health", "Anti-Aging", "Research"],
    researchUses: [
      "Enhanced Tanning Response",
      "Photoprotection",
      "Even Pigmentation",
      "UV Damage Prevention",
      "Antioxidant Effects",
    ],
    status: "FDA Approved" as const,
    link: "/peptides/melanotan-i",
  },
  {
    icon: "MIE",
    title: "Melanotan II",
    subtitle: "Synthetic Melanocortin Peptide | Skin & Libido",
    tags: ["Skin Health", "Hormonal", "Metabolism Support"],
    researchUses: [
      "UV-Free Tanning",
      "Photoprotection",
      "Even Pigmentation",
      "Enhanced Libido",
      "Erectile Function",
    ],
    status: "Well Researched" as const,
    link: "/peptides/melanotan-ii",
  },
  {
    icon: "MK",
    title: "MK-677",
    subtitle: "Growth Hormone Secretagogue | Muscle & Metabolism",
    tags: ["Tissue Repair", "Anti-Aging", "Energy & Metabolism"],
    researchUses: [
      "Muscle Preservation",
      "Body Composition",
      "Bone Health",
      "Growth Hormone Restoration",
      "Sleep Quality",
    ],
    status: "Well Researched" as const,
    link: "/peptides/mk-677",
  },
  {
    icon: "MOT",
    title: "MOTS-c",
    subtitle: "Mitochondrial Open Reading Frame | Metabolism",
    tags: ["Metabolism Support", "Anti-Aging", "Exercise"],
    researchUses: [
      "Insulin Resistance",
      "Type 2 Diabetes",
      "Obesity Prevention",
      "Physical Performance",
      "Mitochondrial Function",
    ],
    status: "Extensively Studied" as const,
    link: "/peptides/mots-c",
  },
  {
    icon: "NSA",
    title: "NA Semax Amidate",
    subtitle: "Enhanced Nootropic Peptide | Cognitive Enhancement",
    tags: ["Cognitive Enhancement", "Neurological Support", "Memory Enhancement"],
    researchUses: [
      "Enhanced Focus and Attention",
      "Memory Formation",
      "Mental Fatigue Resistance",
      "Stroke Recovery Support",
      "Oxidative Stress Protection",
    ],
    status: "Well Researched" as const,
    link: "/peptides/na-semax-amidate",
  },
  {
    icon: "NAD",
    title: "NAD+",
    subtitle: "Essential Cellular Coenzyme | Anti-Aging",
    tags: ["Energy & Metabolism", "Neurological Support", "Anti-Aging"],
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
    icon: "ORF",
    title: "Orforglipron",
    subtitle: "Oral Small-Molecule GLP-1 Receptor Agonist",
    tags: ["Weight Loss", "Diabetes", "Cardiovascular"],
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
    icon: "PIN",
    title: "Pinealon",
    subtitle: "Synthetic Tripeptide | Neuroprotection",
    tags: ["Neurological Support", "Cognitive Enhancement", "Anti-Aging"],
    researchUses: [
      "Traumatic Brain Injury Recovery",
      "Cellular Neuroprotection",
      "Stroke Recovery Support",
      "Memory Enhancement",
      "NMDA Receptor Expression",
    ],
    status: "Well Researched" as const,
    link: "/peptides/pinealon",
  },
  {
    icon: "PT",
    title: "PT-141",
    subtitle: "Melanocortin Receptor Agonist | Sexual Health",
    tags: ["Hormonal", "Mood Support", "Metabolism Support"],
    researchUses: [
      "Hypoactive Sexual Desire Disorder (HSDD)",
      "Erectile Dysfunction",
      "Female Sexual Arousal Disorder",
      "Reduced Sexual Distress",
      "Enhanced Sexual Satisfaction",
    ],
    status: "FDA Approved" as const,
    link: "/peptides/pt-141",
  },
  {
    icon: "RET",
    title: "Retatrutide",
    subtitle: "Triple GLP-1/GIP/Glucagon Agonist | Weight Management",
    tags: ["Weight Loss", "Diabetes", "Cardiovascular"],
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
    icon: "SEL",
    title: "Selank",
    subtitle: "Synthetic Tuftsin Analog | Anxiolytic & Cognitive",
    tags: ["Anxiety Relief", "Cognitive Enhancement", "Immune Support"],
    researchUses: [
      "Anxiety Reduction",
      "Cognitive Enhancement",
      "Memory Improvement",
      "Stress Management",
      "Immune Modulation",
    ],
    status: "Well Researched" as const,
    link: "/peptides/selank",
  },
  {
    icon: "SEM",
    title: "Semaglutide",
    subtitle: "GLP-1 Receptor Agonist | Weight Loss & Diabetes",
    tags: ["Weight Loss", "Diabetes", "Metabolism Support"],
    researchUses: [
      "FDA-Approved Weight Management",
      "Sustained Weight Loss",
      "Type 2 Diabetes Management",
      "Cardiovascular Protection",
    ],
    status: "FDA Approved" as const,
    link: "/peptides/semaglutide",
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
];

export default function BrowsePage() {
  const [searchValue, setSearchValue] = useState("");
  const [requestPeptideOpen, setRequestPeptideOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Name (A-Z)");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All Peptides");

  const handleClear = () => {
    setSearchValue("");
  };

  // Filter peptides based on search and selected filter
  const filteredPeptides = allPeptides.filter((peptide) => {
    // Search filter
    if (searchValue) {
      const search = searchValue.toLowerCase();
      const matchesSearch =
        peptide.title.toLowerCase().includes(search) ||
        peptide.subtitle.toLowerCase().includes(search) ||
        peptide.tags.some((tag) => tag.toLowerCase().includes(search)) ||
        peptide.researchUses.some((use) => use.toLowerCase().includes(search));

      if (!matchesSearch) return false;
    }

    // Category filter
    if (selectedFilter === "All Peptides") return true;
    if (selectedFilter === peptide.status) return true;

    // Administration method filters (simplified - in real app would check actual data)
    const adminMethods: Record<string, string[]> = {
      Injectable: ["Injectable"],
      Nasal: ["Nasal"],
      Oral: ["Oral"],
      Topical: ["Topical"],
    };

    if (adminMethods[selectedFilter]) {
      // This would check the peptide's administration method in real data
      return true; // Placeholder
    }

    // Application filters (simplified - in real app would check actual data)
    const applications: Record<string, string[]> = {
      "Health & Wellness": ["Health & Wellness"],
      "Performance & Recovery": ["Performance & Recovery"],
      "Beauty & Anti-Aging": ["Beauty & Anti-Aging"],
      "Brain & Mood": ["Brain & Mood"],
      "Metabolic & Weight": ["Metabolic & Weight"],
    };

    if (applications[selectedFilter]) {
      // This would check the peptide's application in real data
      return true; // Placeholder
    }

    return false;
  });

  const sortedPeptides = [...filteredPeptides].sort((a, b) => {
    if (sortBy === "Name (A-Z)") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Content */}
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-24 xl:px-32 py-8">
          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Browse</h1>

          {/* Search and Filter Section */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              {/* Filter Button */}
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-full text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer shrink-0"
              >
                <IoFilterOutline className="w-5 h-5" />
                Filter Categories
              </button>

              {/* Search Bar */}
              <div className="flex-1 relative">
                <IoSearchOutline className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search peptides (BPC-157, Selank, etc.)"
                  className="w-full pl-14 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent cursor-text text-sm"
                />
                {searchValue && (
                  <button
                    onClick={handleClear}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    aria-label="Clear search"
                  >
                    <IoCloseOutline className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Request Peptide Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-700">
                Can&apos;t find what you&apos;re looking for?{" "}
                <button
                  onClick={() => setRequestPeptideOpen(true)}
                  className="text-blue-600 hover:text-blue-700 font-medium underline cursor-pointer"
                >
                  Request a peptide
                </button>{" "}
                and we&apos;ll add it to our database.
              </p>
            </div>
          </div>

          {/* Peptide List Header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-600">
              Showing All - {sortedPeptides.length} peptides
            </p>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-full px-4 py-2 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent cursor-pointer"
              >
                <option>Name (A-Z)</option>
                <option>Name (Z-A)</option>
                <option>Status</option>
              </select>
              <IoChevronDownOutline className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Peptide Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {sortedPeptides.map((peptide, index) => (
              <Card key={index} {...peptide} />
            ))}
          </div>
        </div>
      </div>

      {/* Request Peptide Modal */}
      <RequestPeptide
        open={requestPeptideOpen}
        onOpenChange={setRequestPeptideOpen}
      />

      {/* Filter Categories Modal */}
      <FilterCategories
        open={filterOpen}
        onOpenChange={setFilterOpen}
        selectedFilter={selectedFilter}
        onFilterChange={(filter) => {
          setSelectedFilter(filter);
          setFilterOpen(false);
        }}
        totalCount={allPeptides.length}
      />

      {/* Supporters Section */}
      <Supporters />
    </div>
  );
}

