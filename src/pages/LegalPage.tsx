import { useState } from 'react';
import { ShieldCheck, FileText, Lock, MessageSquare } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

interface LegalPageProps {
  initialTab?: 'privacy' | 'terms' | 'sms' | 'compliance';
}

export function LegalPage({ initialTab = 'privacy' }: LegalPageProps) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'sms' | 'compliance'>(initialTab);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-semibold text-[#00A3C4] uppercase tracking-wider">
          Legal & Compliance
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Policies & Regulatory Disclosures
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm">
          HouseCalls Home Care is licensed by the New York State Department of Health and strictly adheres to HIPAA privacy regulations and patient rights.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'privacy', label: 'Privacy Policy & HIPAA', icon: Lock },
          { id: 'terms', label: 'Terms & Conditions', icon: FileText },
          { id: 'sms', label: 'SMS & Messaging Policy', icon: MessageSquare },
          { id: 'compliance', label: 'NYS LHCSA Compliance', icon: ShieldCheck },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 ${
              activeTab === tab.id
                ? 'bg-[#00A3C4] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Notice of Privacy Practices (HIPAA)</h2>
            <p>
              This notice describes how medical information about you may be used and disclosed and how you can get access to this information. Please review it carefully.
            </p>
            <h3 className="text-base font-bold text-slate-800 pt-2">1. Our Commitment to Your Health Information</h3>
            <p>
              HouseCalls Home Care ("Agency") is dedicated to maintaining the confidentiality of your protected health information (PHI). In conducting our healthcare services, we will create records regarding you and the services we provide to you. We are required by law to maintain the confidentiality of health information that identifies you.
            </p>
            <h3 className="text-base font-bold text-slate-800 pt-2">2. Use and Disclosure of Your PHI</h3>
            <p>
              We may use and disclose your PHI for treatment (e.g. sharing care notes with your primary care physician or Managed Long-Term Care plan), payment (billing Medicaid, Medicare, or private insurance plans), and health care operations (quality assurance, clinical competency audits, and infection control tracking).
            </p>
            <h3 className="text-base font-bold text-slate-800 pt-2">3. Your Health Information Rights</h3>
            <p>
              You have the right to inspect and copy your health records, request restrictions on disclosures, receive confidential communications, and request an amendment if you believe your record is incorrect.
            </p>
            <p className="pt-2 text-slate-500 text-xs">
              Privacy Officer Contact: <a href="mailto:compliance@housecallshc.org" className="text-[#00A3C4] underline">compliance@housecallshc.org</a> · (718) 922-9200
            </p>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Terms of Service & Care Agreement</h2>
            <p>
              By accessing the HouseCalls Home Care website, submitting consultation inquiries, or enrolling in our care programs, you agree to comply with the terms set forth herein.
            </p>
            <h3 className="text-base font-bold text-slate-800 pt-2">1. Informational Purposes</h3>
            <p>
              Website content is intended for informational and educational purposes regarding home healthcare and Medicaid benefits. It does not constitute a substitute for acute emergency medical advice. In a life-threatening medical emergency, always call 911 immediately.
            </p>
            <h3 className="text-base font-bold text-slate-800 pt-2">2. Service Initiation</h3>
            <p>
              Formal in-home care delivery commences upon completion of an in-person clinical assessment by a Registered Nurse, physician orders verification, and approval by your insurance carrier or private contract execution.
            </p>
          </div>
        )}

        {activeTab === 'sms' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">SMS & Text Messaging Policy</h2>
            <p>
              HouseCalls Home Care offers text messaging communications to caregivers, patients, and authorized family representatives for appointment confirmations, caregiver shift schedules, and intake updates.
            </p>
            <h3 className="text-base font-bold text-slate-800 pt-2">1. Consent and Opt-In</h3>
            <p>
              By providing your telephone number on our intake or job application forms and submitting your request, you consent to receive informational SMS messages regarding your care coordination or employment status from HouseCalls Home Care. Message and data rates may apply. Message frequency varies.
            </p>
            <h3 className="text-base font-bold text-slate-800 pt-2">2. Opt-Out & Assistance</h3>
            <p>
              You can cancel the SMS service at any time by replying "STOP" to any text message received. For support, reply "HELP" or call our customer service department at (718) 922-9200 EXT: 815.
            </p>
          </div>
        )}

        {activeTab === 'compliance' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Corporate Compliance, Ethics & Non-Discrimination</h2>
            <p>
              HouseCalls Home Care is committed to the highest standards of integrity, ethical conduct, and compliance with all New York State and Federal healthcare laws.
            </p>
            <h3 className="text-base font-bold text-slate-800 pt-2">1. Non-Discrimination Statement</h3>
            <p>
              HouseCalls Home Care does not discriminate on the basis of race, color, national origin, religion, sex, sexual orientation, gender identity, age, or disability in admission, access, treatment, or employment in its programs and activities.
            </p>
            <h3 className="text-base font-bold text-slate-800 pt-2">2. Fraud, Waste, and Abuse Hotline</h3>
            <p>
              Anyone with knowledge of suspected fraud, billing irregularities, or patient rights violations is encouraged to contact our confidential Compliance Hotline at <a href="mailto:compliance@housecallshc.org" className="text-[#00A3C4] underline">compliance@housecallshc.org</a>. Reports may be made anonymously.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
