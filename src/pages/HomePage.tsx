import { 
  ShieldCheck, Phone, CheckCircle, ArrowRight, Heart, Users, Clock, 
  MapPin, Star, Award, ChevronRight, Sparkles 
} from 'lucide-react';
import { BUSINESS_INFO, SERVICES, TESTIMONIALS, GALLERY_PHOTOS, OFFICE_LOCATIONS } from '../data/businessData';
import { CareFinderQuiz } from '../components/CareFinderQuiz';
import { CDPAPCalculator } from '../components/CDPAPCalculator';

interface HomePageProps {
  onNavigate: (tab: string, param?: string) => void;
  onOpenBooking: () => void;
  onOpenLightbox: (index: number) => void;
}

export function HomePage({ onNavigate, onOpenBooking, onOpenLightbox }: HomePageProps) {
  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-8 pb-16 lg:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-900 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#00A3C4]" />
                <span>NYS Department of Health Licensed LHCSA · Founded 2010</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                Quality Home Care for Your Loved One,{' '}
                <span className="text-[#00A3C4] block sm:inline">Right at Home.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                From certified Home Health Aides and paid family caregiving via <strong className="text-slate-900 font-semibold">CDPAP</strong>, to skilled nursing and NHTD waiver diversion, we provide compassionate, multilingual healthcare across Brooklyn, Queens, Manhattan, and all 5 NYC boroughs.
              </p>

              {/* Primary & Secondary Action Block */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3.5 text-sm font-semibold text-white bg-[#00A3C4] hover:bg-[#008ba8] active:bg-[#00748c] rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Request Free Nursing Assessment</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <a
                  href={`tel:${BUSINESS_INFO.phoneClean}`}
                  className="px-6 py-3.5 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors flex items-center justify-center gap-2.5 shadow-xs"
                >
                  <Phone className="w-4 h-4 text-[#00A3C4]" />
                  <span>Call Intake: {BUSINESS_INFO.phone}</span>
                </a>
              </div>

              {/* Fast Proof Metric Strip */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-left">
                <div>
                  <p className="text-2xl font-bold text-slate-900 tabular-nums">4.8 / 5.0</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>638+ Reviews</span>
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 tabular-nums">48 Hours</p>
                  <p className="text-xs text-slate-500 mt-0.5">Fast Start of Care</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 tabular-nums">$0 Copay</p>
                  <p className="text-xs text-slate-500 mt-0.5">With NY Medicaid / MLTC</p>
                </div>
              </div>
            </div>

            {/* Right Authentic Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <img
                  src="/assets/20762.jpg"
                  alt="HouseCalls Home Care caregiver with senior in Brooklyn home"
                  className="w-full h-[420px] sm:h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                
                {/* Floating Overlay Badge on Authentic Image */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md shadow-lg border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-100 text-[#00A3C4] flex items-center justify-center shrink-0">
                      <Heart className="w-5 h-5 fill-cyan-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Personalized Match Guarantee</p>
                      <p className="text-[11px] text-slate-600">
                        Caregivers matched by language: Spanish, Russian, Creole, Cantonese & English.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accompanying Floating Pill */}
              <div className="hidden sm:flex absolute -top-4 -right-4 bg-[#0A2540] text-white px-4 py-2.5 rounded-xl shadow-xl items-center gap-2 border border-slate-700">
                <Award className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold">BBB Accredited A+ Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Core Programs & Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#00A3C4] uppercase tracking-wider">
            Licensed Services & Medicaid Programs
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
            Comprehensive In-Home Care Solutions
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            Every patient's medical and personal needs are distinct. We tailor care plans in partnership with physicians, MLTC insurance coordinators, and family members.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.slice(0, 6).map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {service.badge && (
                  <span className="absolute top-3 left-3 bg-[#0A2540]/90 text-cyan-300 text-[11px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-xs">
                    {service.badge}
                  </span>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#00A3C4] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Key Inclusions:</p>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {service.keyFeatures.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => onNavigate('services', service.id)}
                    className="text-xs font-semibold text-[#00A3C4] hover:text-[#008ba8] flex items-center gap-1 group-hover:translate-x-1 transition-all"
                  >
                    <span>Program Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={onOpenBooking}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-[#00A3C4] hover:text-white text-slate-700 text-xs font-semibold rounded-lg transition-colors"
                  >
                    Request Care
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            <span>View All Services & Medicaid Programs</span>
            <ArrowRight className="w-4 h-4 text-[#00A3C4]" />
          </button>
        </div>
      </section>

      {/* Interactive Tool 1: Care Program Finder Quiz */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <CareFinderQuiz
          onSelectProgram={(programId) => onNavigate('services', programId)}
          onRequestAssessment={onOpenBooking}
        />
      </section>

      {/* CDPAP Highlight & Interactive Calculator Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <CDPAPCalculator onOpenBooking={onOpenBooking} />
      </section>

      {/* Why Families Choose HouseCalls Section */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold text-[#00A3C4] uppercase tracking-wider">
                The HouseCalls Standard of Care
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                14 Years of Compassionate, Regulated Home Care
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Founded in Brooklyn in 2010, HouseCalls Home Care was established with one mission: to enable seniors and vulnerable individuals to remain safely and comfortably in their homes while preserving their dignity and family connections.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: 'Bilingual & Culturally Competent Caregivers',
                    desc: 'We match caregivers who understand your culture, dietary preferences, and speak your native language (Spanish, Russian, Creole, Chinese, English).',
                  },
                  {
                    title: 'Registered Nurse (RN) Clinical Supervision',
                    desc: 'Every client’s care plan is overseen by a NYS Licensed RN who conducts regular in-home audits and liaises with hospital discharge coordinators.',
                  },
                  {
                    title: '24/7/365 On-Call Emergency Dispatch',
                    desc: 'Our coordination lines are staffed 24 hours a day, ensuring immediate backup aide coverage if your regular caregiver is indisposed.',
                  },
                  {
                    title: 'Zero Paperwork Stress for Families',
                    desc: 'Our intake team navigates Medicaid, MLTC authorizations, physician orders, and fiscal intermediary payroll on your behalf.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-lg bg-cyan-100 text-[#00A3C4] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side Authentic Photos Bento */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div 
                  onClick={() => onOpenLightbox(1)}
                  className="rounded-xl overflow-hidden shadow-sm border border-slate-200 cursor-pointer hover:opacity-95 transition-opacity"
                >
                  <img src="/assets/20662.jpg" alt="Clinical nurse taking vitals" className="w-full h-56 object-cover" />
                </div>
                <div 
                  onClick={() => onOpenLightbox(5)}
                  className="rounded-xl overflow-hidden shadow-sm border border-slate-200 cursor-pointer hover:opacity-95 transition-opacity"
                >
                  <img src="/assets/363498.jpg" alt="Physical rehabilitation at home" className="w-full h-44 object-cover" />
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div 
                  onClick={() => onOpenLightbox(7)}
                  className="rounded-xl overflow-hidden shadow-sm border border-slate-200 cursor-pointer hover:opacity-95 transition-opacity"
                >
                  <img src="/assets/2150494633.jpg" alt="Family care support" className="w-full h-44 object-cover" />
                </div>
                <div 
                  onClick={() => onOpenLightbox(3)}
                  className="rounded-xl overflow-hidden shadow-sm border border-slate-200 cursor-pointer hover:opacity-95 transition-opacity"
                >
                  <img src="/assets/2150321573.jpg" alt="Senior independence at home" className="w-full h-56 object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Google Maps & Family Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-semibold text-[#00A3C4] uppercase tracking-wider">
              Real Stories from Brooklyn & NYC Families
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
              Verified Client Testimonials
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-800">4.8 Rating</span>
            <span className="text-xs text-slate-500">· 638 Reviews on Google & Birdeye</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    ✓ {item.date}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{item.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{item.author}</h4>
                  <p className="text-[11px] text-slate-500">{item.relation} · {item.location}</p>
                </div>
                <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                  {item.serviceReceived}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => onNavigate('reviews')}
            className="text-xs font-semibold text-[#00A3C4] hover:underline"
          >
            Read all 600+ reviews and submit your experience →
          </button>
        </div>
      </section>

      {/* 3 Brooklyn Offices & Embedded Map Snapshot */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-semibold text-[#00A3C4] uppercase tracking-wider">
                Visit or Contact Our Offices
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                Convenient Locations Across Brooklyn
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Walk-ins and scheduled appointments welcome Monday through Friday.
              </p>
            </div>

            <a
              href={BUSINESS_INFO.primaryGoogleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 shrink-0"
            >
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Open in Google Maps</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            {OFFICE_LOCATIONS.map((loc) => (
              <div key={loc.id} className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm">{loc.name}</h4>
                  {loc.isPrimary && (
                    <span className="text-[10px] font-semibold bg-cyan-100 text-[#00A3C4] px-2 py-0.5 rounded-full">
                      Primary LHCSA Hub
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <p className="font-medium text-slate-800">{loc.address}</p>
                  <p>{loc.city}, {loc.state} {loc.zip}</p>
                  <p className="text-slate-500 text-[11px] pt-1">{loc.subway}</p>
                  <p className="text-slate-500 text-[11px]">{loc.hours}</p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <a href={`tel:${BUSINESS_INFO.phoneClean}`} className="text-[#00A3C4] font-semibold hover:underline">
                    {loc.phone}
                  </a>
                  <a
                    href={loc.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 hover:text-slate-900 font-medium"
                  >
                    Directions →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accepted Insurances Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 text-center">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Accepted Insurance Plans & Payment Methods
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            {BUSINESS_INFO.insurances.map((ins, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-white border border-slate-200 text-xs font-medium text-slate-700 rounded-lg shadow-2xs"
              >
                {ins}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 mt-4">
            Don't see your plan? Call our intake team at <strong className="text-slate-700">{BUSINESS_INFO.phone}</strong>. We verify coverage within 1 hour.
          </p>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-[#0A2540] via-[#0F2D59] to-[#00A3C4] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
              Get Started with Confidence
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Speak with a Dedicated Care Coordinator Today
            </h3>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
              We guide you through every step: physician orders, insurance authorizations, CDPAP caregiver enrollment, and home assessment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-6 py-3.5 bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-xl text-sm transition-colors shadow-md text-center"
            >
              Request Free Assessment
            </button>
            <a
              href={`tel:${BUSINESS_INFO.phoneClean}`}
              className="w-full sm:w-auto px-6 py-3.5 bg-black/30 hover:bg-black/40 text-white font-semibold rounded-xl text-sm transition-colors border border-white/20 text-center"
            >
              Call {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
