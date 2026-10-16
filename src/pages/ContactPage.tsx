import { useState } from 'react';
import { 
  Phone, Mail, MapPin, Clock, MessageSquare, Send, 
  CheckCircle2, AlertCircle, ShieldCheck, HeartHandshake 
} from 'lucide-react';
import { BUSINESS_INFO, OFFICE_LOCATIONS } from '../data/businessData';
import { saveMessage } from '../data/inquiryStore';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    office: '4920 Church Ave (East Flatbush)',
    subject: 'General In-Home Care Inquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || formData.name.length < 2) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!formData.message.trim() || formData.message.length < 5) {
      setErrorMsg('Please write a message describing your inquiry or care requirements.');
      return;
    }

    setIsSubmitting(true);

    try {
      saveMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        office: formData.office,
        subject: formData.subject,
        message: formData.message,
      });

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch {
      setIsSubmitting(false);
      setErrorMsg('Unable to submit your message right now. Please call us directly at ' + BUSINESS_INFO.phone);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-semibold text-[#00A3C4] uppercase tracking-wider">
          We Are Here For You
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
          Contact HouseCalls Home Care
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Speak directly with our bilingual care coordinators, schedule a clinical intake assessment, or visit any of our Brooklyn office locations.
        </p>
      </div>

      {/* Main Grid: Form on Left, Contact Details & Directory on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Send an Inquiry</h2>
          <p className="text-xs text-slate-500 mb-6">
            Fill out the form below and an intake specialist will reach out within 2 hours during normal business hours.
          </p>

          {isSuccess ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Message Delivered Successfully!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-800">{formData.name}</strong>. Your message has been routed to our care coordination desk at <strong className="text-slate-800">{formData.office}</strong>. We will get back to you promptly at <strong className="text-slate-800">{formData.phone}</strong>.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      office: '4920 Church Ave (East Flatbush)',
                      subject: 'General In-Home Care Inquiry',
                      message: '',
                    });
                  }}
                  className="px-5 py-2 bg-[#00A3C4] text-white text-xs font-semibold rounded-lg hover:bg-[#008ba8] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Robert Smith"
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
                    placeholder="robert@example.com"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A3C4]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Office / Borough</label>
                  <select
                    value={formData.office}
                    onChange={(e) => setFormData({ ...formData, office: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3C4]"
                  >
                    <option value="4920 Church Ave (East Flatbush)">4920 Church Ave (East Flatbush Main)</option>
                    <option value="1950 Fulton St (Bed-Stuy / East NY)">1950 Fulton St (Bed-Stuy / East NY)</option>
                    <option value="5803 8th Ave (Sunset Park)">5803 8th Ave (Sunset Park Hub)</option>
                    <option value="Queens / Long Island Coordination">Queens / Long Island Coordination</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Inquiry Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3C4]"
                >
                  <option value="General In-Home Care Inquiry">General In-Home Care Inquiry</option>
                  <option value="CDPAP Enrollment & Payroll">CDPAP Enrollment & Payroll</option>
                  <option value="Hospital Discharge / Urgent Start of Care">Hospital Discharge / Urgent Start of Care</option>
                  <option value="NHTD / TBI Waiver Consultation">NHTD / TBI Waiver Consultation</option>
                  <option value="Agency Transfer Request">Agency Transfer Request</option>
                  <option value="Caregiver Job Application">Caregiver Job Application</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Message *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help? Please provide details such as patient location, Medicaid plan (if known), or specific scheduling preferences..."
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A3C4]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-[#00A3C4] hover:bg-[#008ba8] text-white font-semibold rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Intake Team</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Contact Directory & Fast Channels */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Call & WhatsApp Box */}
          <div className="bg-[#0A2540] text-white rounded-3xl p-8 space-y-4 shadow-lg">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              Immediate Assistance
            </span>
            <h3 className="text-2xl font-bold">Call or Text Directly</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              For urgent hospital discharges or emergency caregiver questions, call our 24/7 on-call coordinator.
            </p>

            <div className="space-y-3 pt-2">
              <a
                href={`tel:${BUSINESS_INFO.phoneClean}`}
                className="w-full py-3 px-4 bg-white text-slate-900 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#00A3C4]" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>

              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Department Directory */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide border-b border-slate-100 pb-2">
              Department Email Directory
            </h4>

            <div className="space-y-3 text-xs">
              <div>
                <p className="font-semibold text-slate-900">General Information & Intake:</p>
                <a href={`mailto:${BUSINESS_INFO.emails.general}`} className="text-[#00A3C4] hover:underline">
                  {BUSINESS_INFO.emails.general}
                </a>
              </div>

              <div>
                <p className="font-semibold text-slate-900">Existing Clients & Customer Service:</p>
                <a href={`mailto:${BUSINESS_INFO.emails.customerService}`} className="text-[#00A3C4] hover:underline">
                  {BUSINESS_INFO.emails.customerService}
                </a>
                <p className="text-slate-500 text-[11px]">(718) 922-9200 EXT: 815</p>
              </div>

              <div>
                <p className="font-semibold text-slate-900">Careers & Human Resources:</p>
                <a href={`mailto:${BUSINESS_INFO.emails.careers}`} className="text-[#00A3C4] hover:underline">
                  {BUSINESS_INFO.emails.careers}
                </a>
              </div>

              <div>
                <p className="font-semibold text-slate-900">Compliance & Regulatory Hotline:</p>
                <a href={`mailto:${BUSINESS_INFO.emails.compliance}`} className="text-[#00A3C4] hover:underline">
                  {BUSINESS_INFO.emails.compliance}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
