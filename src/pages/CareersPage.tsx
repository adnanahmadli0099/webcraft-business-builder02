import { useState } from 'react';
import { Briefcase, CheckCircle, Heart, DollarSign, Clock, ShieldCheck, AlertCircle, Send } from 'lucide-react';
import { saveApplication } from '../data/inquiryStore';
import { BUSINESS_INFO } from '../data/businessData';

export function CareersPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    position: 'HHA' as 'HHA' | 'PCA' | 'RN' | 'LPN' | 'Care Coordinator',
    experienceYears: '1-3 years',
    languages: ['English'],
    hasCertificate: true,
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const toggleLanguage = (lang: string) => {
    if (formData.languages.includes(lang)) {
      if (formData.languages.length > 1) {
        setFormData({ ...formData, languages: formData.languages.filter(l => l !== lang) });
      }
    } else {
      setFormData({ ...formData, languages: [...formData.languages, lang] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full legal name.');
      return;
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      saveApplication({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        position: formData.position,
        experienceYears: formData.experienceYears,
        languages: formData.languages,
        hasCertificate: formData.hasCertificate,
        notes: formData.notes,
      });

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch {
      setIsSubmitting(false);
      setErrorMsg('Submission error. Please call HR directly at ' + BUSINESS_INFO.phone);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-semibold text-[#00A3C4] uppercase tracking-wider">
          Join the HouseCalls Team
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
          Careers for Caregivers, HHAs, PCAs & Nurses
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Be part of a supportive, respected agency in Brooklyn. We offer competitive NYC Wage Parity pay, weekly direct deposit, flexible shifts, and ongoing professional training.
        </p>
      </div>

      {/* Benefits Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: DollarSign, title: 'Competitive NYC Wages', desc: 'Wage parity rates with overtime & weekly direct deposit' },
          { icon: Clock, title: 'Flexible Scheduling', desc: '4-hour, 8-hour, 12-hour shifts or live-in arrangements' },
          { icon: Heart, title: 'Supportive Coordinators', desc: 'Bilingual staff who respect your schedule and preferences' },
          { icon: ShieldCheck, title: 'Paid Time Off & Benefits', desc: 'Accrued sick pay, transit benefits, and training bonuses' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-[#00A3C4] flex items-center justify-center">
              <item.icon className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Application Form */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm max-w-3xl mx-auto">
        <div className="border-b border-slate-100 pb-4 mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Quick Job Application</h2>
          <p className="text-xs text-slate-500 mt-1">
            Apply online in 2 minutes. Our recruitment coordinator will call you to schedule an in-person orientation.
          </p>
        </div>

        {isSuccess ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Application Received!</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you for applying, <strong className="text-slate-800">{formData.fullName}</strong>. Our HR team at 4920 Church Ave will review your application for the <strong className="text-slate-800">{formData.position}</strong> position and contact you at <strong className="text-slate-800">{formData.phone}</strong> for an intake interview.
            </p>
            <p className="text-[11px] text-slate-500">
              Please have your photo ID, SSN card, NYS HHA certificate, and recent medical physical ready.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Marie Dupont"
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A3C4]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(718) 000-0000"
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A3C4]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="marie@example.com"
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A3C4]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Position Applied For</label>
                <select
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3C4]"
                >
                  <option value="HHA">Home Health Aide (HHA)</option>
                  <option value="PCA">Personal Care Aide (PCA)</option>
                  <option value="RN">Registered Nurse (Field RN)</option>
                  <option value="LPN">Licensed Practical Nurse (LPN)</option>
                  <option value="Care Coordinator">Bilingual Intake Coordinator</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Years of Caregiving Experience</label>
                <select
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3C4]"
                >
                  <option value="Less than 1 year">Less than 1 year / New Graduate</option>
                  <option value="1-3 years">1 - 3 years</option>
                  <option value="3-5 years">3 - 5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">NYS Certificate Status</label>
                <div className="flex items-center gap-4 mt-2">
                  <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="cert"
                      checked={formData.hasCertificate === true}
                      onChange={() => setFormData({ ...formData, hasCertificate: true })}
                      className="text-[#00A3C4]"
                    />
                    <span>Yes, Current Certificate</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="cert"
                      checked={formData.hasCertificate === false}
                      onChange={() => setFormData({ ...formData, hasCertificate: false })}
                      className="text-[#00A3C4]"
                    />
                    <span>Need Training / CDPAP</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Languages You Speak Fluently</label>
              <div className="flex flex-wrap gap-2">
                {['English', 'Spanish', 'Russian', 'Haitian Creole', 'Cantonese', 'Mandarin', 'Bengali', 'Uzbek'].map((lang) => {
                  const isChecked = formData.languages.includes(lang);
                  return (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => toggleLanguage(lang)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        isChecked 
                          ? 'bg-[#00A3C4] text-white shadow-2xs' 
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {isChecked ? '✓ ' : '+ '} {lang}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Availability & Preferred Boroughs</label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="e.g. Available weekdays and weekends in East Flatbush, Crown Heights, or Bed-Stuy. Ready to start immediately..."
                className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A3C4]"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-[#00A3C4] hover:bg-[#008ba8] text-white font-semibold rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Submitting Application...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Application to HR</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
