import { PeptideData } from "./types";

export const peptideData: Record<string, PeptideData> = {
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
    peptideInteractions: [
      {
        name: "Semaglutide/Tirzepatide",
        recommendation: "Use Caution",
        color: "orange",
        detail: "Both are GLP-1 receptor agonists - combining may lead to excessive GLP-1 activation and increased gastrointestinal side effects. Not recommended without medical supervision."
      },
      {
        name: "Metformin",
        recommendation: "Compatible",
        color: "blue",
        detail: "No direct interaction. Can be used together as demonstrated in Phase 2 trials with type 2 diabetes patients on metformin background therapy."
      },
      {
        name: "SGLT2 Inhibitors",
        recommendation: "Compatible",
        color: "blue",
        detail: "No known interactions. Phase 3 trials allow concurrent use of SGLT2 inhibitors with appropriate monitoring of glycemic control."
      },
      {
        name: "Sulfonylureas",
        recommendation: "Monitor Combination",
        color: "purple",
        detail: "Risk of hypoglycemia when combined. Monitor blood glucose closely and consider sulfonylurea dose reduction if needed."
      },
      {
        name: "Insulin",
        recommendation: "Dose Dependent",
        color: "purple",
        detail: "May require insulin dose adjustment due to improved glycemic control. Start with lower insulin doses and titrate based on glucose monitoring."
      },
      {
        name: "Oral Contraceptives",
        recommendation: "Requires Timing",
        color: "yellow",
        detail: "Delayed gastric emptying may affect absorption. Take oral contraceptives at least 1 hour before survodutide injection."
      },
      {
        name: "Warfarin",
        recommendation: "Monitor Combination",
        color: "purple",
        detail: "May affect warfarin absorption due to delayed gastric emptying. Monitor INR more frequently when initiating or changing survodutide dose."
      },
      {
        name: "Other Glucagon Agonists",
        recommendation: "Avoid Combination",
        color: "red",
        detail: "Risk of excessive glucagon receptor activation. Do not combine with other glucagon receptor agonists."
      },
    ],
    reconstitutionSteps: [
      "Remove survodutide vial from refrigerator and allow to reach room temperature (15-30 minutes)",
      "Clean rubber stoppers of both vials with alcohol swabs",
      "Draw prescribed amount of bacteriostatic water into syringe",
      "Insert needle into survodutide vial at 45-degree angle",
      "Slowly inject BAC water down the side of vial to minimize foaming",
      "Gently swirl vial - do not shake vigorously",
      "Allow to sit for 2-3 minutes for complete dissolution",
      "Solution should be clear to slightly opalescent without particles",
      "Store reconstituted solution in refrigerator immediately",
    ],
    qualityIndicators: [
      {
        title: "Clear to slightly opalescent solution",
        description: "Properly reconstituted survodutide should be clear or have slight opalescence without visible particles",
        type: "good"
      },
      {
        title: "Sealed vial with intact rubber stopper",
        description: "Ensures sterility and proper storage conditions have been maintained",
        type: "good"
      },
      {
        title: "Within expiration date",
        description: "Check both powder and bacteriostatic water expiration dates before use",
        type: "good"
      },
      {
        title: "Slight foam after reconstitution",
        description: "Normal if disappears within minutes - allow to settle before drawing dose",
        type: "acceptable"
      },
      {
        title: "Cloudy solution or visible particles",
        description: "Do not use - may indicate contamination or degradation",
        type: "red-flag"
      },
      {
        title: "Discoloration of powder or solution",
        description: "Should be white to off-white powder and colorless solution when reconstituted",
        type: "red-flag"
      },
    ],
    whatToExpect: [
      "**Week 1-4:** Possible nausea, reduced appetite - most common during dose escalation",
      "**Week 4-8:** Initial weight loss begins, improved satiety between meals",
      "**Week 8-16:** Progressive weight loss, potential improvement in energy levels",
      "**Week 16-24:** Approaching steady-state levels, more consistent effects",
      "**Week 24+:** Sustained weight loss, metabolic improvements become more apparent",
      "**Long-term:** Average 15-19% weight loss at higher doses by week 46",
    ],
    sideEffectsSafety: [
      "Common GI side effects: nausea (40-66%), diarrhea (25-49%), vomiting (15-41%)",
      "Most GI effects occur during dose escalation - use flexible dosing if needed",
      "Heart rate may increase slightly (mean 2-5 bpm) - monitor if cardiac conditions",
      "Not recommended in pregnancy or breastfeeding - use contraception",
      "No dose adjustment needed for hepatic impairment including cirrhosis",
      "Monitor blood glucose if on diabetes medications - may need adjustment",
    ],
    references: {
      researchStudies: [
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
      ],
      recentPublications: [
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
      ],
    },
  },
};

