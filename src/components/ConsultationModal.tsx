import { useState } from 'react';
import { X, CheckCircle, Calendar, Phone, Clock, AlertCircle } from 'lucide-react';
import { saveConsultation } from '../data/inquiryStore';
import { BUSINESS_INFO } from '../data/businessData';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export function ConsultationModal({ isOpen, onClose, defaultService }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    relationship: 'Daughter / Son',
    careNeededFor: '',
    serviceRequested: defaultService || 'Personal Care & HHA',
    borough: 'Brooklyn',
    hasMedicaid: 'yes' as 'yes' | 'no' | 'unsure',
    preferredDate: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation
    if (!formData.fullName.trim() || formData.fullName.length < 2) {
      setErrorMsg('Please enter a valid full name.');
      return;
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number so our intake nurse can reach you.');
      return;
    }
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      saveConsultation({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        relationship: formData.relationship,
        careNeededFor: formData.careNeededFor || 'Senior relative',
        serviceRequested: formData.serviceRequested,
        borough: formData.borough,
        hasMedicaid: formData.hasMedicaid,
        preferredDate: formData.preferredDate || new Date().toISOString().split('T')[0],
        notes: formData.notes,
      });

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch {
      setIsSubmitting(false);
      setErrorMsg('There was an error saving your request. Please call us directly at ' + BUSINESS_INFO.phone);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden relative max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0A2540] text-white p-6 relative shrink-0">
          <button
            onClick={handleResetAndClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1 rounded-lg"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Clock className="w-4 h-4" />
            <span>Fast 24-48 Hour Clinical Response</span>
          </div>
          <h3 className="text-xl font-bold">Request a Free In-Home Care Assessment</h3>
          <p className="text-xs text-slate-300 mt-1">
            A Licensed Registered Nurse will evaluate care needs, Medicaid/MLTC eligibility, and personalized caregiver matching.
          </p>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900">Assessment Request Received!</h4>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-800">{formData.fullName}</strong>. Your intake coordinator at HouseCalls Home Care has received your details and will call you at <strong className="text-slate-800">{formData.phone}</strong> shortly to confirm your assessment appointment.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 max-w-sm mx-auto text-left space-y-1">
                <p><strong>Program:</strong> {formData.serviceRequested}</p>
                <p><strong>Borough:</strong> {formData.borough}</p>
                <p><strong>Immediate Assistance:</strong> Call {BUSINESS_INFO.phone}</p>
              </div>
              <div className="pt-4">
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 bg-[#00A3C4] text-white font-medium rounded-lg hover:bg-[#008ba8] transition-colors text-sm shadow-xs"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Maria Gonzalez"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3C4]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number (Direct) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(718) 000-0000"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3C4]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="maria@example.com"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3C4]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Relationship to Recipient
                  </label>
                  <select
                    value={formData.relationship}
                    onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3C4] bg-white"
                  >
                    <option value="Daughter / Son">Daughter / Son</option>
                    <option value="Spouse / Partner">Spouse / Partner</option>
                    <option value="Myself (Care Recipient)">Myself (Care Recipient)</option>
                    <option value="Hospital Social Worker / Discharge">Hospital Social Worker / Discharge</option>
                    <option value="Physician / Case Manager">Physician / Case Manager</option>
                    <option value="Friend / Relative">Friend / Relative</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Service Needed
                  </label>
                  <select
                    value={formData.serviceRequested}
                    onChange={(e) => setFormData({ ...formData, serviceRequested: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3C4] bg-white"
                  >
                    <option value="Personal Care & HHA">Personal Care & HHA</option>
                    <option value="CDPAP (Consumer Directed - Paid Family Caregiver)">CDPAP (Paid Family Caregiver)</option>
                    <option value="NHTD Waiver (Nursing Home Diversion)">NHTD Waiver (Nursing Home Diversion)</option>
                    <option value="Skilled Nursing (RN / LPN Visits)">Skilled Nursing (RN / LPN Visits)</option>
                    <option value="Dementia & Alzheimer Memory Care">Dementia & Alzheimer Memory Care</option>
                    <option value="Respite & Companion Care">Respite & Companion Care</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Patient Borough / Location
                  </label>
                  <select
                    value={formData.borough}
                    onChange={(e) => setFormData({ ...formData, borough: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3C4] bg-white"
                  >
                    <option value="Brooklyn">Brooklyn</option>
                    <option value="Queens">Queens</option>
                    <option value="Manhattan">Manhattan</option>
                    <option value="The Bronx">The Bronx</option>
                    <option value="Staten Island">Staten Island</option>
                    <option value="Nassau / Suffolk County">Nassau / Suffolk County</option>
                    <option value="Westchester County">Westchester County</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Does the patient have NYS Medicaid?
                  </label>
                  <div className="flex items-center gap-4 mt-2">
                    <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="medicaid"
                        value="yes"
                        checked={formData.hasMedicaid === 'yes'}
                        onChange={() => setFormData({ ...formData, hasMedicaid: 'yes' })}
                        className="text-[#00A3C4]"
                      />
                      <span>Yes (Active)</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="medicaid"
                        value="no"
                        checked={formData.hasMedicaid === 'no'}
                        onChange={() => setFormData({ ...formData, hasMedicaid: 'no' })}
                        className="text-[#00A3C4]"
                      />
                      <span>No / Private</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="medicaid"
                        value="unsure"
                        checked={formData.hasMedicaid === 'unsure'}
                        onChange={() => setFormData({ ...formData, hasMedicaid: 'unsure' })}
                        className="text-[#00A3C4]"
                      />
                      <span>Need Help Applying</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Assessment Date
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3C4] bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Care Needs / Language Preferences / Specific Notes
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Needs help after hospital discharge, prefers a Spanish or Russian speaking aide, assistance with bathing..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3C4]"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-[#00A3C4] hover:bg-[#008ba8] text-white font-semibold rounded-lg text-sm transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <span>Submit In-Home Assessment Request</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-slate-400 text-center mt-2">
                  🔒 HIPAA Compliant. Your health and contact information is strictly confidential.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
