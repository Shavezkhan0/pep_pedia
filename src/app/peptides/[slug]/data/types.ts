export interface ResearchIndication {
  name: string;
  effectiveness: string;
  color: string;
}

export interface ResearchProtocol {
  goal: string;
  dose: string;
  frequency: string;
  route: string;
}

export interface PeptideInteraction {
  name: string;
  recommendation: string;
  color: string;
  detail?: string;
}

export interface PeptideData {
  icon: string;
  title: string;
  subtitle: string;
  status: string;
  tags: string[];
  overview: string;
  keyBenefits: string[];
  mechanismOfAction: string;
  molecularInfo: {
    weight: string;
    length: string;
    type: string;
    sequence: string;
    note: string;
  };
  typicalDose: { value: string; subtitle: string };
  route: { value: string; subtitle: string };
  cycle: { value: string; subtitle: string };
  storage: { value: string; subtitle: string };
  quickStart: {
    typicalDose: string;
    howOften: string;
    howToTake: string;
    bestTiming: string;
  };
  effectsTimeline: {
    appetite: string;
    glucose: string;
    weight: string;
    peak: string;
  };
  cycleLength: string;
  breakBetween: string;
  researchIndications: ResearchIndication[];
  researchProtocols: ResearchProtocol[];
  peptideInteractions: PeptideInteraction[];
  reconstitutionSteps: string[];
  qualityIndicators: Array<{
    title: string;
    description: string;
    type: 'good' | 'acceptable' | 'red-flag';
  }>;
  whatToExpect: string[];
  sideEffectsSafety: string[];
  references: {
    researchStudies: Array<{
      title: string;
      details: string;
      description: string;
      link?: string;
    }>;
    recentPublications: Array<{
      title: string;
      source: string;
      date: string;
      summary: string;
      link?: string;
    }>;
  };
}

