"use client";

import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

interface ResearchIndicationsProps {
  indications: Array<{
    name: string;
    effectiveness: string;
    color: string;
  }>;
  onEdit: () => void;
}

export default function ResearchIndications({ indications, onEdit }: ResearchIndicationsProps) {
  const [expandedIndications, setExpandedIndications] = useState<Set<string>>(new Set());

  const toggleIndication = (name: string) => {
    const newExpanded = new Set(expandedIndications);
    if (newExpanded.has(name)) {
      newExpanded.delete(name);
    } else {
      newExpanded.add(name);
    }
    setExpandedIndications(newExpanded);
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return { dot: 'bg-green-500', badge: 'bg-green-50 text-green-700' };
      case 'blue':
        return { dot: 'bg-blue-500', badge: 'bg-blue-50 text-blue-700' };
      case 'gray':
        return { dot: 'bg-gray-500', badge: 'bg-gray-100 text-gray-700' };
      default:
        return { dot: 'bg-gray-500', badge: 'bg-gray-100 text-gray-700' };
    }
  };

  // Mock detailed data - in real app, this would come from props or API
  const detailedData: Record<string, Array<{ title: string; content: string }>> = {
    "Weight Loss": [
      {
        title: "Obesity Management Without Diabetes",
        content: "ATTAIN-1 Phase 3 trial demonstrated 12.4% weight loss (27.3 lbs) at 72 weeks with 36mg dose in non-diabetic obese individuals. 59.6% achieved ≥10% weight loss, 39.6% achieved ≥15% weight loss. Superior to all existing oral obesity medications."
      },
      {
        title: "Obesity Management With Type 2 Diabetes",
        content: "ATTAIN-2 Phase 3 trial achieved 10.5% weight loss in patients with both obesity and diabetes. 72.8% achieved clinically meaningful ≥5% weight loss, demonstrating efficacy maintained in metabolically complicated patients."
      },
      {
        title: "Cardiometabolic Risk Factor Improvement",
        content: "Significant improvements in waist circumference, systolic blood pressure (8-12 mmHg reductions), triglycerides (-20-30%), and non-HDL cholesterol across Phase 3 trials. Comprehensive metabolic syndrome reversal."
      },
      {
        title: "Prediabetes Prevention",
        content: "Among 1,127 ATTAIN-1 participants with prediabetes at baseline, up to 91% achieved near-normal blood sugar levels vs 42% with placebo, demonstrating diabetes prevention potential."
      }
    ],
    "Diabetes": [
      {
        title: "Early Type 2 Diabetes Management",
        content: "ACHIEVE-1 Phase 3 trial showed HbA1c reductions of 1.3-1.6% from 8.0% baseline over 40 weeks. 76.2% of patients achieved HbA1c <7%, 66.0% achieved ≤6.5%, positioning orforglipron as potential first-line oral therapy."
      },
      {
        title: "Insulin Resistance Improvement",
        content: "Significant improvements in insulin sensitivity indices and fasting glucose reduction observed within 4 weeks of therapy initiation. Glucose-dependent mechanism prevents hypoglycemia risk in non-diabetic patients."
      },
      {
        title: "Beta Cell Function Preservation",
        content: "GLP-1R agonism protects pancreatic beta cell function through multiple mechanisms including reduced glucotoxicity, enhanced glucose-responsive insulin secretion, and potential anti-apoptotic effects."
      },
      {
        title: "Long-term Glycemic Durability",
        content: "Biased agonism profile favoring G protein over β-arrestin may reduce receptor desensitization, potentially improving sustained glycemic control compared to peptide GLP-1 agonists. Long-term studies ongoing."
      }
    ],
    "Cardiovascular": [
      {
        title: "Cardiovascular Risk Marker Reduction",
        content: "Significant improvements in blood pressure (systolic reductions 8-12 mmHg), triglycerides (-20-30%), HDL cholesterol increases, and reductions in small dense LDL particles observed across Phase 3 trials."
      },
      {
        title: "Obesity-Related Comorbidity Management",
        content: "Being investigated for obstructive sleep apnea and hypertension in adults with obesity. GLP-1 class effects suggest potential benefits for cardiovascular event reduction, pending dedicated outcomes trials."
      },
      {
        title: "Metabolic Syndrome Reversal",
        content: "Comprehensive improvements in all five metabolic syndrome criteria (waist circumference, blood pressure, triglycerides, HDL cholesterol, fasting glucose) demonstrated in clinical trials."
      }
    ]
  };

  return (
    <>
      {/* Header - Outside the card */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-900">Research Indications</h2>
        </div>
        <button 
          onClick={onEdit}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors cursor-pointer"
        >
          Edit
        </button>
      </div>

      {/* Content Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="space-y-0">
        {indications.map((indication, index) => {
          const isExpanded = expandedIndications.has(indication.name);
          const colors = getColorClasses(indication.color);
          
          return (
            <div key={indication.name} className={index !== 0 ? "border-t border-gray-200" : ""}>
              <button
                onClick={() => toggleIndication(indication.name)}
                className="w-full flex items-center justify-between py-4 bg-white transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${colors.dot}`}></div>
                  <span className="text-sm font-medium text-gray-900">{indication.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1.5 rounded-md text-xs font-medium ${colors.badge}`}>
                    {indication.effectiveness}
                  </span>
                  <IoChevronDownOutline 
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : ''
                    }`} 
                  />
                </div>
              </button>

              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {detailedData[indication.name] && (
                  <div className="px-6 pb-4 pt-2 space-y-4 bg-white">
                    {detailedData[indication.name].map((detail, idx) => (
                      <div key={idx}>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">{detail.title}</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">{detail.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </>
  );
}

