import { ShieldCheck, Heart, Users, Award, MapPin, CheckCircle, Phone } from 'lucide-react';
import { BUSINESS_INFO, OFFICE_LOCATIONS } from '../data/businessData';

interface AboutPageProps {
  onOpenBooking: () => void;
  onNavigate: (tab: string) => void;
}

export function AboutPage({ onOpenBooking, onNavigate }: AboutPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-semibold text-[#00A3C4] uppercase tracking-wider">
          Founded in Brooklyn in 2010
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          Over 14 Years of Trusted In-Home Care Across New York
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          HouseCalls Home Care is a New York State Department of Health Licensed Home Care Services Agency (LHCSA). We empower seniors and medically fragile individuals to age with dignity in their own homes.
        </p>
      </div>

      {/* Story & Mission Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-5">
          <span className="text-xs font-semibold text-[#00A3C4] uppercase tracking-wider">
            Our Founding Mission
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Dignity, Independence & Compassion at Every Stage
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            In 2010, HouseCalls Home Care was established in Brooklyn, NY, with a clear focus: addressing the urgent need for dependable, multilingual home health support that treats patients not as case numbers, but as valued community members.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Over the past decade and a half, we have expanded from our East Flatbush headquarters on Church Avenue to multiple office locations across Brooklyn, serving thousands of families in Brooklyn, Queens, Manhattan, The Bronx, Staten Island, and Long Island.
          </p>

          <div className="pt-2 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-cyan-50/60 border border-cyan-100">
              <p className="text-2xl font-extrabold text-slate-900 tabular-nums">14+ Years</p>
              <p className="text-xs text-slate-600 mt-1">Dedicated Service in NYC</p>
            </div>
            <div className="p-4 rounded-xl bg-cyan-50/60 border border-cyan-100">
              <p className="text-2xl font-extrabold text-slate-900 tabular-nums">600+ Reviews</p>
              <p className="text-xs text-slate-600 mt-1">BBB A+ Rated Agency</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-100">
            <img
              src="/assets/2150321573.jpg"
              alt="Elderly couple at home with care support"
              className="w-full h-80 sm:h-96 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-[#00A3C4] uppercase tracking-wider">
            Our Guiding Pillars
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            The Principles That Shape Our Care
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-[#00A3C4] flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Patient-Centered Compassion</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              We preserve each client’s daily routines, food preferences, and emotional comfort, treating every individual with the warmth and respect we would demand for our own parents.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-[#00A3C4] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Clinical Excellence & Oversight</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Care plans are designed and supervised by New York State Licensed Registered Nurses (RNs) in strict accordance with Department of Health regulations and physician protocols.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-[#00A3C4] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Cultural & Linguistic Competence</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Language is vital to health. We match aides fluent in Spanish, Russian, Haitian Creole, Cantonese, Mandarin, Bengali, Uzbek, and English to eliminate anxiety and confusion.
            </p>
          </div>
        </div>
      </div>

      {/* Leadership & Staff Representation */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-[#00A3C4] uppercase tracking-wider">
            Our Leadership & Care Coordination Team
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Experienced Healthcare Professionals
          </h3>
          <p className="text-xs text-slate-500 mt-2">
            Our dedicated team coordinates intake, nursing assessments, and MLTC authorizations with precision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center space-y-3 shadow-xs">
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto bg-slate-100 border-2 border-cyan-400">
              <img src="/assets/blancho.png" alt="Blancho - Leadership" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Blancho</h4>
              <p className="text-xs text-[#00A3C4] font-medium">Operations & Intake Director</p>
              <p className="text-[11px] text-slate-500 mt-1">Leading agency compliance, MLTC partnerships, and patient advocacy.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center space-y-3 shadow-xs">
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto bg-slate-100 border-2 border-cyan-400">
              <img src="/assets/ema-sanders.png" alt="Ema Sanders - Clinical Supervisor" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Ema Sanders</h4>
              <p className="text-xs text-[#00A3C4] font-medium">Director of Patient Services (RN)</p>
              <p className="text-[11px] text-slate-500 mt-1">Supervising clinical care plans, field nurses, and HHA continuing education.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center space-y-3 shadow-xs">
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto bg-slate-100 border-2 border-cyan-400">
              <img src="/assets/hr-min.png" alt="Caregiver HR & Recruitment" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Caregiver Support & HR</h4>
              <p className="text-xs text-[#00A3C4] font-medium">HHA & CDPAP Coordination</p>
              <p className="text-[11px] text-slate-500 mt-1">Managing background clearance, multilingual matches, and weekly payroll.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Multilingual Support Banner */}
      <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            Multilingual Coordination
          </span>
          <h3 className="text-2xl font-bold">We Speak Your Language</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Our office staff and home caregivers are fluent in English, Spanish, Russian, Haitian Creole, Cantonese, Mandarin, Bengali, and Uzbek. Feel free to call us in your native language.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <a
            href={`tel:${BUSINESS_INFO.phoneClean}`}
            className="px-5 py-3 bg-[#00A3C4] hover:bg-[#008ba8] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Call {BUSINESS_INFO.phone}</span>
          </a>
          <button
            onClick={onOpenBooking}
            className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors"
          >
            Request Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
