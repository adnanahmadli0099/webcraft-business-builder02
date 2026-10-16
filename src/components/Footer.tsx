import { Phone, Mail, MapPin, ShieldCheck, Heart, Clock, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO, OFFICE_LOCATIONS } from '../data/businessData';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenBooking: () => void;
}

export function Footer({ onNavigate, onOpenBooking }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1E36] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Upper Consultation CTA Strip */}
        <div className="bg-gradient-to-r from-[#0F2D59] to-[#0A2540] rounded-2xl p-8 mb-16 border border-cyan-900/40 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-bold text-white mb-2">
              Need Compassionate Care for a Loved One?
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Our clinical intake team is ready 24/7 to answer your Medicaid, MLTC, CDPAP, or private care questions. Free, no-obligation nursing consultation.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`tel:${BUSINESS_INFO.phoneClean}`}
              className="px-5 py-3 text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#00A3C4]" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
            <button
              onClick={onOpenBooking}
              className="px-5 py-3 text-sm font-semibold text-white bg-[#00A3C4] hover:bg-[#008ba8] rounded-lg transition-colors shadow-sm flex items-center gap-2"
            >
              <span>Book In-Home Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Column 1: Brand & Licensing */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/assets/logo-hc-w.png" 
                alt="HouseCalls Logo White" 
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/logo-housecalls.svg';
                }}
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              New York State Licensed Home Care Services Agency (LHCSA) providing personalized in-home healthcare, CDPAP fiscal intermediary services, and specialized nursing throughout New York City.
            </p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-cyan-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>NYS Dept. of Health Licensed LHCSA</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>BBB A+ Rating · 638+ Verified Reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>24/7/365 On-Call Clinical Support</span>
              </div>
            </div>
          </div>

          {/* Column 2: Brooklyn Office Locations */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-b border-slate-700/60 pb-2">
              Brooklyn Offices
            </h4>
            <div className="space-y-4 text-xs">
              {OFFICE_LOCATIONS.map((loc) => (
                <div key={loc.id} className="border-l-2 border-cyan-500/40 pl-3">
                  <p className="font-semibold text-slate-200">{loc.name}</p>
                  <p className="text-slate-400">{loc.address}, {loc.city}, {loc.state} {loc.zip}</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">{loc.hours}</p>
                  <a 
                    href={loc.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-[11px] mt-1 font-medium"
                  >
                    <MapPin className="w-3 h-3" />
                    <span>Get Directions</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Care Programs & Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-b border-slate-700/60 pb-2">
              Programs & Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('cdpap')} className="hover:text-cyan-400 transition-colors text-left">
                  CDPAP Program (Paid Family Caregivers)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-cyan-400 transition-colors text-left">
                  Personal Care (HHA & PCA)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-cyan-400 transition-colors text-left">
                  NHTD & TBI Medicaid Waiver
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-cyan-400 transition-colors text-left">
                  Skilled Nursing (RN & LPN Visits)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-cyan-400 transition-colors text-left">
                  Alzheimer’s & Dementia Memory Care
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-cyan-400 transition-colors text-left">
                  Respite & Companionship Care
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('careers')} className="hover:text-cyan-400 transition-colors text-left text-cyan-300">
                  HHA / PCA Job Openings (Apply Now)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Contacts & Hours */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-b border-slate-700/60 pb-2">
              Direct Contact
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <p className="text-slate-400">Intake & General Lines:</p>
                <a href={`tel:${BUSINESS_INFO.phoneClean}`} className="text-cyan-400 font-semibold text-sm hover:underline">
                  {BUSINESS_INFO.phone}
                </a>
                <p className="text-slate-500 text-[11px]">Customer Service: {BUSINESS_INFO.customerServiceExt}</p>
              </div>

              <div>
                <p className="text-slate-400">General Inquiries:</p>
                <a href={`mailto:${BUSINESS_INFO.emails.general}`} className="text-slate-200 hover:text-cyan-300">
                  {BUSINESS_INFO.emails.general}
                </a>
              </div>

              <div>
                <p className="text-slate-400">Customer Support:</p>
                <a href={`mailto:${BUSINESS_INFO.emails.customerService}`} className="text-slate-200 hover:text-cyan-300">
                  {BUSINESS_INFO.emails.customerService}
                </a>
              </div>

              <div>
                <p className="text-slate-400">Office Hours:</p>
                <p className="text-slate-300">{BUSINESS_INFO.hours.office}</p>
                <p className="text-emerald-400 text-[11px] font-medium mt-0.5">Caregivers on Duty 24/7/365</p>
              </div>

              <div className="pt-2">
                <a
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 rounded-md text-xs hover:bg-emerald-800/60 transition-colors"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal, Privacy & Copyright */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p>© {currentYear} HouseCalls Home Care Services Inc. All rights reserved.</p>
            <p className="text-[11px] text-slate-600 mt-0.5">
              NYS Department of Health LHCSA Authorized Provider. Equal Opportunity Employer.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button onClick={() => onNavigate('privacy')} className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </button>
            <span>·</span>
            <button onClick={() => onNavigate('terms')} className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </button>
            <span>·</span>
            <button onClick={() => onNavigate('sms-policy')} className="hover:text-slate-300 transition-colors">
              SMS Policy
            </button>
            <span>·</span>
            <button onClick={() => onNavigate('compliance')} className="hover:text-slate-300 transition-colors">
              Compliance & Ethics
            </button>
            <span>·</span>
            <a 
              href="https://maps.app.goo.gl/wEx8WPajNkzemzDg8" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-cyan-400 hover:text-cyan-300"
            >
              Google Maps Listing
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
