"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import PeptideHero from "./components/PeptideHero";
import StickyHeader from "./components/StickyHeader";
import OverviewSection from "./components/OverviewSection";
import EditOverview from "./components/OverviewSection/EditOverview";
import MolecularInformation from "./components/MolecularInformation";
import EditMolecularInfo from "./components/MolecularInformation/EditMolecularInfo";
import KeyBenefitsMechanism from "./components/KeyBenefitsMechanism";
import ResearchIndications from "./components/ResearchIndications";
import EditResearchIndications from "./components/ResearchIndications/EditResearchIndications";
import ResearchProtocols from "./components/ResearchProtocols";
import EditResearchProtocols from "./components/ResearchProtocols/EditResearchProtocols";
import PeptideInteractions from "./components/PeptideInteractions";
import EditPeptideInteractions from "./components/PeptideInteractions/EditPeptideInteractions";
import HowToReconstitute from "./components/HowToReconstitute";
import EditReconstitute from "./components/HowToReconstitute/EditReconstitute";
import QualityIndicators from "./components/QualityIndicators";
import EditQualityIndicators from "./components/QualityIndicators/EditQualityIndicators";
import WhatToExpect from "./components/WhatToExpect";
import EditWhatToExpect from "./components/WhatToExpect/EditWhatToExpect";
import SideEffectsSafety from "./components/SideEffectsSafety";
import EditSideEffectsSafety from "./components/SideEffectsSafety/EditSideEffectsSafety";
import References from "./components/References";
import EditReferences from "./components/References/EditReferences";
import Supporters from "@/components/cards/Supporters";
import QuickStartGuide from "./components/QuickStartGuide";
import SurveySection from "./components/SurveySection";
import PollResults from "./components/PollResults";
import HelpfulnessFeedback from "./components/HelpfulnessFeedback";
import ThankYouMessage from "./components/ThankYouMessage";
import Calculator from "@/components/modals/Calculator";
import { peptideData } from "./data/peptideData";

export default function PeptideDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  // Get peptide data
  const peptide = peptideData[slug as keyof typeof peptideData] || peptideData["orforglipron"];
  
  // Set page title dynamically
  useEffect(() => {
    if (peptide) {
      document.title = `${peptide.title} - ${peptide.subtitle} | PepPedia`;
    } else {
      document.title = "Peptide Not Found | PepPedia";
    }
  }, [peptide]);
  
  // UI State
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Survey State
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showThankYou, setShowThankYou] = useState(false);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedEffectiveness, setSelectedEffectiveness] = useState("");
  const [selectedSideEffects, setSelectedSideEffects] = useState<string[]>([]);
  const [selectedFrequency, setSelectedFrequency] = useState("");
  const [selectedRecommendation, setSelectedRecommendation] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  
  // Poll State
  const [currentPollCategory, setCurrentPollCategory] = useState(0);
  const [pollDirection, setPollDirection] = useState<'left' | 'right'>('right');
  
  // Modal State
  const [editOverviewOpen, setEditOverviewOpen] = useState(false);
  const [editMolecularInfoOpen, setEditMolecularInfoOpen] = useState(false);
  const [editResearchIndicationsOpen, setEditResearchIndicationsOpen] = useState(false);
  const [editResearchProtocolsOpen, setEditResearchProtocolsOpen] = useState(false);
  const [editPeptideInteractionsOpen, setEditPeptideInteractionsOpen] = useState(false);
  const [editReconstituteOpen, setEditReconstituteOpen] = useState(false);
  const [editQualityIndicatorsOpen, setEditQualityIndicatorsOpen] = useState(false);
  const [editWhatToExpectOpen, setEditWhatToExpectOpen] = useState(false);
  const [editSideEffectsSafetyOpen, setEditSideEffectsSafetyOpen] = useState(false);
  const [editReferencesOpen, setEditReferencesOpen] = useState(false);
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  // Sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const contentTop = contentRef.current.getBoundingClientRect().top;
        setIsSticky(contentTop <= 64);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Survey submit handler
  const handleSurveySubmit = () => {
    setShowThankYou(true);
    setTimeout(() => {
      setShowThankYou(false);
      if (currentQuestion < 10) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setSurveyCompleted(true);
      }
    }, 1000);
  };

  // Poll navigation handler
  const handlePollNavigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPollCategory > 0) {
      setPollDirection('left');
      setCurrentPollCategory(currentPollCategory - 1);
    } else if (direction === 'next' && currentPollCategory < 9) {
      setPollDirection('right');
      setCurrentPollCategory(currentPollCategory + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <PeptideHero
        title={peptide.title}
        subtitle={peptide.subtitle}
        status={peptide.status}
        typicalDose={peptide.typicalDose}
        route={peptide.route}
        cycle={peptide.cycle}
        storage={peptide.storage}
        isBookmarked={isBookmarked}
        onBookmarkToggle={() => setIsBookmarked(!isBookmarked)}
      />

      {/* Sticky Header */}
      <StickyHeader
        title={peptide.title}
        subtitle={peptide.subtitle}
        status={peptide.status}
        isVisible={isSticky}
      />

      {/* Main Content */}
      <div ref={contentRef} className="w-full rounded-t-4xl -mt-12 bg-gray-50 overflow-hidden">
        <div className="bg-gray-50 rounded-t-4xl md:rounded-t-[6rem] lg:rounded-t-[8rem] shadow-xl">
          <div className="px-6 md:px-8 lg:px-24 xl:px-32 py-8 md:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              
              {/* Left Column - Main Content (2/3 width) */}
              <div className="lg:col-span-2 space-y-8">
                <OverviewSection
                  peptideTitle={peptide.title}
                  overview={peptide.overview}
                  onEdit={() => setEditOverviewOpen(true)}
                />

                <KeyBenefitsMechanism
                  keyBenefits={peptide.keyBenefits}
                  mechanismOfAction={peptide.mechanismOfAction}
                />

                <MolecularInformation
                  molecularInfo={peptide.molecularInfo}
                  onEdit={() => setEditMolecularInfoOpen(true)}
                />

                <ResearchIndications 
                  indications={peptide.researchIndications}
                  onEdit={() => setEditResearchIndicationsOpen(true)}
                />

                <ResearchProtocols 
                  protocols={peptide.researchProtocols}
                  onEdit={() => setEditResearchProtocolsOpen(true)}
                />

                <PeptideInteractions
                  interactions={peptide.peptideInteractions}
                  onEdit={() => setEditPeptideInteractionsOpen(true)}
                />

                <HowToReconstitute
                  steps={peptide.reconstitutionSteps}
                  onEdit={() => setEditReconstituteOpen(true)}
                  onCalculatorClick={() => setCalculatorOpen(true)}
                />

                <QualityIndicators
                  indicators={peptide.qualityIndicators}
                  onEdit={() => setEditQualityIndicatorsOpen(true)}
                />

                <WhatToExpect
                  expectations={peptide.whatToExpect}
                  onEdit={() => setEditWhatToExpectOpen(true)}
                />

                <SideEffectsSafety
                  sideEffects={peptide.sideEffectsSafety}
                  onEdit={() => setEditSideEffectsSafetyOpen(true)}
                />

                <References
                  researchStudies={peptide.references.researchStudies}
                  recentPublications={peptide.references.recentPublications}
                  onEdit={() => setEditReferencesOpen(true)}
                />
              </div>

              {/* Right Column - Sidebar (1/3 width) */}
              <div className="lg:col-span-1 space-y-6">
                <QuickStartGuide
                  quickStart={peptide.quickStart}
                  effectsTimeline={peptide.effectsTimeline}
                  storage={peptide.storage}
                  cycleLength={peptide.cycleLength}
                  breakBetween={peptide.breakBetween}
                />

                <SurveySection
                  currentQuestion={currentQuestion}
                  showThankYou={showThankYou}
                  selectedExperience={selectedExperience}
                  selectedDuration={selectedDuration}
                  selectedAge={selectedAge}
                  selectedGender={selectedGender}
                  selectedGoal={selectedGoal}
                  selectedEffectiveness={selectedEffectiveness}
                  selectedSideEffects={selectedSideEffects}
                  selectedFrequency={selectedFrequency}
                  selectedRecommendation={selectedRecommendation}
                  selectedSource={selectedSource}
                  onExperienceChange={setSelectedExperience}
                  onDurationChange={setSelectedDuration}
                  onAgeChange={setSelectedAge}
                  onGenderChange={setSelectedGender}
                  onGoalChange={setSelectedGoal}
                  onEffectivenessChange={setSelectedEffectiveness}
                  onSideEffectsChange={setSelectedSideEffects}
                  onFrequencyChange={setSelectedFrequency}
                  onRecommendationChange={setSelectedRecommendation}
                  onSourceChange={setSelectedSource}
                  onSubmit={handleSurveySubmit}
                />

                {surveyCompleted && currentQuestion > 10 && <ThankYouMessage />}
                
                {currentQuestion > 1 && (
                  <PollResults
                    currentCategory={currentPollCategory}
                    pollDirection={pollDirection}
                    onNavigate={handlePollNavigate}
                  />
                )}

                {currentQuestion > 1 && <HelpfulnessFeedback />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Supporters Section */}
      <Supporters />

      {/* Edit Modals */}
      <EditOverview
        open={editOverviewOpen}
        onOpenChange={setEditOverviewOpen}
        peptideTitle={peptide.title}
        overview={peptide.overview}
        keyBenefits={peptide.keyBenefits}
        mechanism={peptide.mechanismOfAction}
      />

      <EditMolecularInfo
        open={editMolecularInfoOpen}
        onOpenChange={setEditMolecularInfoOpen}
        molecularInfo={peptide.molecularInfo}
      />

      <EditResearchIndications
        open={editResearchIndicationsOpen}
        onOpenChange={setEditResearchIndicationsOpen}
        indications={peptide.researchIndications}
      />

      <EditResearchProtocols
        open={editResearchProtocolsOpen}
        onOpenChange={setEditResearchProtocolsOpen}
        protocols={peptide.researchProtocols}
      />

      <EditPeptideInteractions
        open={editPeptideInteractionsOpen}
        onOpenChange={setEditPeptideInteractionsOpen}
      />

      <EditReconstitute
        open={editReconstituteOpen}
        onOpenChange={setEditReconstituteOpen}
      />

      <EditQualityIndicators
        open={editQualityIndicatorsOpen}
        onOpenChange={setEditQualityIndicatorsOpen}
      />

      <EditWhatToExpect
        open={editWhatToExpectOpen}
        onOpenChange={setEditWhatToExpectOpen}
      />

      <EditSideEffectsSafety
        open={editSideEffectsSafetyOpen}
        onOpenChange={setEditSideEffectsSafetyOpen}
      />

      <EditReferences
        open={editReferencesOpen}
        onOpenChange={setEditReferencesOpen}
      />

      <Calculator
        open={calculatorOpen}
        onOpenChange={setCalculatorOpen}
      />
    </div>
  );
}
