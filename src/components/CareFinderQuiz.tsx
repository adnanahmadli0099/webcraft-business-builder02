import { useState } from 'react';
import { Check, ArrowRight, RotateCcw, ShieldCheck, Heart, UserCheck } from 'lucide-react';

interface CareFinderQuizProps {
  onSelectProgram: (programId: string) => void;
  onRequestAssessment: () => void;
}

export function CareFinderQuiz({ onSelectProgram, onRequestAssessment }: CareFinderQuizProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    medicaidStatus: '',
    caregiverPreference: '',
    careLevel: '',
  });

  const handleAnswer = (key: string, value: string) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);
    if (step < 3) {
      setStep(step + 1);
    } else {
      setStep(4); // Result step
    }
  };

  const resetQuiz = () => {
    setStep(1);
    setAnswers({
      medicaidStatus: '',
      caregiverPreference: '',
      careLevel: '',
    });
  };

  // Program matching logic
  const getRecommendation = () => {
    if (answers.caregiverPreference === 'family' && answers.medicaidStatus !== 'none') {
      return {
        id: 'cdpap',
        name: 'Consumer Directed Personal Assistance Program (CDPAP)',
        tagline: 'Best Match: Get paid to care for your loved one through NY Medicaid',
        desc: 'Because you have a family member or friend ready to care for your loved one and Medicaid eligibility, CDPAP allows your relative to receive hourly pay directly through HouseCalls as their fiscal intermediary.',
        icon: UserCheck,
        badge: 'Recommended Program',
        actionLabel: 'Explore CDPAP & Calculate Earnings',
      };
    }
    if (answers.careLevel === 'nursing' || answers.careLevel === 'waiver') {
      return {
        id: 'nhtd-waiver',
        name: 'NHTD Waiver or Skilled Nursing Services',
        tagline: 'Best Match: Specialized Community Diversion & Clinical Care',
        desc: 'Based on the need for clinical nursing or extensive living assistance, our NYS-approved NHTD waiver and Registered Nurse visit teams provide comprehensive care to keep your loved one safe at home.',
        icon: ShieldCheck,
        badge: 'Comprehensive Clinical Care',
        actionLabel: 'Learn About NHTD Waiver',
      };
    }
    return {
      id: 'personal-care-hha-pca',
      name: 'Certified Home Health Aide (HHA) / Personal Care',
      tagline: 'Best Match: Professional NYS Certified Caregiver',
      desc: 'Our certified HHAs provide compassionate one-on-one assistance with bathing, meals, mobility, and companionship. We match caregivers based on medical needs and cultural/language preferences.',
      icon: Heart,
      badge: 'Certified Caregiver Matching',
      actionLabel: 'Explore Personal Care Services',
    };
  };

  const rec = step === 4 ? getRecommendation() : null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <span className="text-xs font-semibold text-[#00A3C4] uppercase tracking-wider">
            Interactive Guidance Tool
          </span>
          <h3 className="text-lg font-bold text-slate-900">
            Care Program Finder: Find the Right Care in 30 Seconds
          </h3>
        </div>
        {step <= 3 && (
          <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
            Step {step} of 3
          </span>
        )}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <p className="text-sm font-medium text-slate-800">
            1. Does your loved one currently receive New York State Medicaid?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'active', label: 'Yes, Active Medicaid', desc: 'Covered 100% with $0 out of pocket' },
              { id: 'unsure', label: 'Applying / Unsure', desc: 'Our intake team helps you apply' },
              { id: 'none', label: 'No Medicaid / Private Pay', desc: 'Private insurance, LTC, or self-pay' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleAnswer('medicaidStatus', opt.id)}
                className="text-left p-4 rounded-xl border border-slate-200 hover:border-[#00A3C4] hover:bg-cyan-50/30 transition-all group"
              >
                <p className="font-semibold text-slate-900 group-hover:text-[#00A3C4] text-sm">
                  {opt.label}
                </p>
                <p className="text-xs text-slate-500 mt-1">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <p className="text-sm font-medium text-slate-800">
            2. Who would you prefer to provide the day-to-day care?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => handleAnswer('caregiverPreference', 'family')}
              className="text-left p-4 rounded-xl border border-slate-200 hover:border-[#00A3C4] hover:bg-cyan-50/30 transition-all group"
            >
              <div className="flex items-center gap-2 mb-1">
                <UserCheck className="w-4 h-4 text-[#00A3C4]" />
                <p className="font-semibold text-slate-900 group-hover:text-[#00A3C4] text-sm">
                  A Family Member or Friend
                </p>
              </div>
              <p className="text-xs text-slate-500">
                You have an adult child, relative, or friend who wants to be paid to care for the patient (CDPAP).
              </p>
            </button>

            <button
              onClick={() => handleAnswer('caregiverPreference', 'agency')}
              className="text-left p-4 rounded-xl border border-slate-200 hover:border-[#00A3C4] hover:bg-cyan-50/30 transition-all group"
            >
              <div className="flex items-center gap-2 mb-1">
                <Heart className="w-4 h-4 text-[#00A3C4]" />
                <p className="font-semibold text-slate-900 group-hover:text-[#00A3C4] text-sm">
                  A Certified Agency Caregiver (HHA / PCA)
                </p>
              </div>
              <p className="text-xs text-slate-500">
                You want HouseCalls to provide a background-checked, multilingual certified aide.
              </p>
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <p className="text-sm font-medium text-slate-800">
            3. What level of daily care is required?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'personal', label: 'Everyday Assistance', desc: 'Bathing, dressing, meals, errands & companionship' },
              { id: 'nursing', label: 'Skilled Medical Care', desc: 'Wound care, injections, catheter, or vitals monitoring' },
              { id: 'waiver', label: 'Transition From Nursing Home', desc: 'NHTD or TBI waiver to return to private home' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleAnswer('careLevel', opt.id)}
                className="text-left p-4 rounded-xl border border-slate-200 hover:border-[#00A3C4] hover:bg-cyan-50/30 transition-all group"
              >
                <p className="font-semibold text-slate-900 group-hover:text-[#00A3C4] text-sm">
                  {opt.label}
                </p>
                <p className="text-xs text-slate-500 mt-1">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 4 && rec && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-cyan-800 uppercase tracking-wide">
                  {rec.badge}
                </span>
                <h4 className="text-xl font-bold text-slate-900 mt-1">{rec.name}</h4>
                <p className="text-xs font-medium text-[#00A3C4] mt-0.5">{rec.tagline}</p>
              </div>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#00A3C4] shadow-xs shrink-0">
                <rec.icon className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed mt-4">{rec.desc}</p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              onClick={resetQuiz}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onSelectProgram(rec.id)}
                className="px-4 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {rec.actionLabel}
              </button>
              <button
                onClick={onRequestAssessment}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#00A3C4] hover:bg-[#008ba8] rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>Request Free Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
