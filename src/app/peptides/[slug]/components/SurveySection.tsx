"use client";

interface SurveySectionProps {
  currentQuestion: number;
  showThankYou: boolean;
  selectedExperience: string;
  selectedDuration: string;
  selectedAge: string;
  selectedGender: string;
  selectedGoal: string;
  selectedEffectiveness: string;
  selectedSideEffects: string[];
  selectedFrequency: string;
  selectedRecommendation: string;
  selectedSource: string;
  onExperienceChange: (value: string) => void;
  onDurationChange: (value: string) => void;
  onAgeChange: (value: string) => void;
  onGenderChange: (value: string) => void;
  onGoalChange: (value: string) => void;
  onEffectivenessChange: (value: string) => void;
  onSideEffectsChange: (effects: string[]) => void;
  onFrequencyChange: (value: string) => void;
  onRecommendationChange: (value: string) => void;
  onSourceChange: (value: string) => void;
  onSubmit: () => void;
}

export default function SurveySection({
  currentQuestion,
  showThankYou,
  selectedExperience,
  selectedDuration,
  selectedAge,
  selectedGender,
  selectedGoal,
  selectedEffectiveness,
  selectedSideEffects,
  selectedFrequency,
  selectedRecommendation,
  selectedSource,
  onExperienceChange,
  onDurationChange,
  onAgeChange,
  onGenderChange,
  onGoalChange,
  onEffectivenessChange,
  onSideEffectsChange,
  onFrequencyChange,
  onRecommendationChange,
  onSourceChange,
  onSubmit,
}: SurveySectionProps) {
  const isAnswered = () => {
    if (currentQuestion === 1) return !!selectedExperience;
    if (currentQuestion === 2) return !!selectedDuration;
    if (currentQuestion === 3) return !!selectedAge;
    if (currentQuestion === 4) return !!selectedGender;
    if (currentQuestion === 5) return !!selectedGoal;
    if (currentQuestion === 6) return !!selectedEffectiveness;
    if (currentQuestion === 7) return selectedSideEffects.length > 0;
    if (currentQuestion === 8) return !!selectedFrequency;
    if (currentQuestion === 9) return !!selectedRecommendation;
    if (currentQuestion === 10) return !!selectedSource;
    return false;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-1">Help Us Gain Real Insights</h3>
      <p className="text-xs text-gray-500 mb-4">Question {currentQuestion} of 10</p>
      
      {showThankYou ? (
        <div className="py-12 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-gray-900">Thank you!</p>
        </div>
      ) : (
        <>
          {/* Question 1 */}
          {currentQuestion === 1 && (
            <>
              <p className="text-sm font-medium text-gray-900 mb-4">What is your experience with this peptide?</p>
              <div className="space-y-3 mb-6">
                {["Currently using", "Used in the past", "Planning to start", "Just researching", "Other (please specify)"].map((option) => (
                  <label key={option} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="experience"
                      value={option}
                      checked={selectedExperience === option}
                      onChange={(e) => onExperienceChange(e.target.value)}
                      className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          {/* Question 2 */}
          {currentQuestion === 2 && (
            <>
              <p className="text-sm font-medium text-gray-900 mb-4">How long have you been using (or did you use) it?</p>
              <div className="space-y-3 mb-6">
                {["Less than 1 month", "1-3 months", "3-6 months", "6-12 months", "Over 1 year", "Not applicable", "Other (please specify)"].map((option) => (
                  <label key={option} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="duration"
                      value={option}
                      checked={selectedDuration === option}
                      onChange={(e) => onDurationChange(e.target.value)}
                      className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          {/* Question 3 */}
          {currentQuestion === 3 && (
            <>
              <p className="text-sm font-medium text-gray-900 mb-4">What is your age range?</p>
              <div className="space-y-3 mb-6">
                {["18-25", "26-35", "36-45", "46-55", "56-65", "65+", "Prefer not to say"].map((option) => (
                  <label key={option} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="age"
                      value={option}
                      checked={selectedAge === option}
                      onChange={(e) => onAgeChange(e.target.value)}
                      className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          {/* Question 4 */}
          {currentQuestion === 4 && (
            <>
              <p className="text-sm font-medium text-gray-900 mb-4">What is your gender?</p>
              <div className="space-y-3 mb-6">
                {["Male", "Female", "Non-binary", "Prefer not to say", "Other (please specify)"].map((option) => (
                  <label key={option} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={selectedGender === option}
                      onChange={(e) => onGenderChange(e.target.value)}
                      className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          {/* Question 5 */}
          {currentQuestion === 5 && (
            <>
              <p className="text-sm font-medium text-gray-900 mb-4">What is your primary goal with this peptide?</p>
              <div className="space-y-3 mb-6">
                {["Muscle growth", "Fat loss", "Recovery/Healing", "Anti-aging", "Cognitive enhancement", "General wellness", "Other (please specify)"].map((option) => (
                  <label key={option} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="goal"
                      value={option}
                      checked={selectedGoal === option}
                      onChange={(e) => onGoalChange(e.target.value)}
                      className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          {/* Question 6 */}
          {currentQuestion === 6 && (
            <>
              <p className="text-sm font-medium text-gray-900 mb-4">How effective has it been for your goals?</p>
              <div className="space-y-3 mb-6">
                {["Very effective", "Somewhat effective", "Neutral", "Not very effective", "Not effective at all", "Too early to tell", "Other (please specify)"].map((option) => (
                  <label key={option} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="effectiveness"
                      value={option}
                      checked={selectedEffectiveness === option}
                      onChange={(e) => onEffectivenessChange(e.target.value)}
                      className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          {/* Question 7 */}
          {currentQuestion === 7 && (
            <>
              <p className="text-sm font-medium text-gray-900 mb-2">Have you experienced any side effects?</p>
              <p className="text-xs text-gray-500 mb-4">(Select all that apply)</p>
              <div className="space-y-3 mb-6">
                {["Headache", "Nausea", "Fatigue", "Injection site reaction", "Dizziness", "Insomnia", "Water retention", "Joint pain", "No side effects", "Other (please specify)"].map((option) => (
                  <label key={option} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      name="sideEffects"
                      value={option}
                      checked={selectedSideEffects.includes(option)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onSideEffectsChange([...selectedSideEffects, option]);
                        } else {
                          onSideEffectsChange(selectedSideEffects.filter(item => item !== option));
                        }
                      }}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          {/* Question 8 */}
          {currentQuestion === 8 && (
            <>
              <p className="text-sm font-medium text-gray-900 mb-4">How often do you dose?</p>
              <div className="space-y-3 mb-6">
                {["Once daily", "Twice daily", "Every other day", "2-3 times per week", "Once per week", "As needed", "Not applicable", "Other (please specify)"].map((option) => (
                  <label key={option} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="frequency"
                      value={option}
                      checked={selectedFrequency === option}
                      onChange={(e) => onFrequencyChange(e.target.value)}
                      className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          {/* Question 9 */}
          {currentQuestion === 9 && (
            <>
              <p className="text-sm font-medium text-gray-900 mb-4">Would you recommend this peptide to others?</p>
              <div className="space-y-3 mb-6">
                {["Definitely yes", "Probably yes", "Not sure", "Probably not", "Definitely not", "Other (please specify)"].map((option) => (
                  <label key={option} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="recommendation"
                      value={option}
                      checked={selectedRecommendation === option}
                      onChange={(e) => onRecommendationChange(e.target.value)}
                      className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          {/* Question 10 */}
          {currentQuestion === 10 && (
            <>
              <p className="text-sm font-medium text-gray-900 mb-4">How did you first learn about this peptide?</p>
              <div className="space-y-3 mb-6">
                {["Social media", "Reddit/Forums", "Healthcare provider", "Friend/Family", "Online research", "YouTube/Podcast", "Other (please specify)"].map((option) => (
                  <label key={option} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="source"
                      value={option}
                      checked={selectedSource === option}
                      onChange={(e) => onSourceChange(e.target.value)}
                      className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          <button
            onClick={onSubmit}
            disabled={!isAnswered()}
            className={`w-full py-3 rounded-xl font-medium transition-colors text-sm ${
              isAnswered()
                ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Submit Answer
          </button>
        </>
      )}
    </div>
  );
}

