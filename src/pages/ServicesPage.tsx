import { useState, useEffect } from 'react';
import { 
  CheckCircle, ArrowRight, ShieldCheck, Heart, UserCheck, 
  Sparkles, FileText, Clock, HelpCircle, Phone 
} from 'lucide-react';
import { SERVICES, ServiceItem, BUSINESS_INFO } from '../data/businessData';

interface ServicesPageProps {
  onOpenBooking: (serviceName?: string) => void;
  selectedServiceId?: string;
}

export function ServicesPage({ onOpenBooking, selectedServiceId }: ServicesPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(selectedServiceId || null);

  useEffect(() => {
    if (selectedServiceId) {
      setExpandedServiceId(selectedServiceId);
      const target = SERVICES.find(s => s.id === selectedServiceId);
      if (target && activeCategory !== 'all' && target.category !== activeCategory) {
        setActiveCategory('all');
      }
      setTimeout(() => {
        const el = document.getElementById(`service-${selectedServiceId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [selectedServiceId]);

  const categories = [
    { id: 'all', label: 'All Services & Programs' },
    { id: 'programs', label: 'Medicaid & CDPAP Programs' },
    { id: 'personal-care', label: 'Personal Care & HHA' },
    { id: 'nursing', label: 'Skilled Nursing (RN / LPN)' },
    { id: 'specialty', label: 'Dementia & Memory Care' },
  ];

  const filteredServices = SERVICES.filter(service => {
    if (activeCategory === 'all') return true;
    return service.category === activeCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-semibold text-[#00A3C4] uppercase tracking-wider">
          Licensed Clinical & Personal Care
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
          Our Services & Care Programs
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          From 24/7 certified home health aides and skilled RN visits to specialized CDPAP fiscal intermediary payroll for family caregivers, HouseCalls delivers personalized care throughout NYC.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
              activeCategory === cat.id
                ? 'bg-[#00A3C4] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Services Grid & Deep Dive */}
      <div className="grid grid-cols-1 gap-10">
        {filteredServices.map((service) => {
          const isExpanded = expandedServiceId === service.id;
          return (
            <div
              key={service.id}
              id={`service-${service.id}`}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8">
                {/* Image Col */}
                <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-64 sm:h-80 bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  {service.badge && (
                    <span className="absolute top-4 left-4 bg-[#0A2540]/90 text-cyan-300 text-xs font-semibold px-3 py-1 rounded-lg backdrop-blur-xs">
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Content Col */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2 text-xs text-[#00A3C4] font-semibold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>NYS Department of Health Regulated</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {service.title}
                  </h2>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {service.fullDesc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {service.keyFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle className="w-4 h-4 text-[#00A3C4] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions & Expand Details */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onOpenBooking(service.title)}
                      className="px-5 py-2.5 bg-[#00A3C4] hover:bg-[#008ba8] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <span>Request This Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                    >
                      {isExpanded ? 'Hide Eligibility & Tasks' : 'View Eligibility & Covered Tasks'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expandable Accordion with Eligibility & Tasks */}
              {isExpanded && (
                <div className="border-t border-slate-100 bg-slate-50/70 p-6 sm:p-8 space-y-6 animate-in slide-in-from-top-2 duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                      <p className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                        <UserCheck className="w-4 h-4 text-[#00A3C4]" />
                        <span>Who Is Eligible?</span>
                      </p>
                      <p className="text-slate-600 leading-relaxed">{service.eligibleWho}</p>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                      <p className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                        <FileText className="w-4 h-4 text-[#00A3C4]" />
                        <span>Tasks Covered Daily</span>
                      </p>
                      <ul className="text-slate-600 space-y-1">
                        {service.coveredTasks.map((t, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                      <p className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                        <Clock className="w-4 h-4 text-[#00A3C4]" />
                        <span>Insurances Accepted</span>
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {service.insuranceAccepted.map((ins, idx) => (
                          <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">
                            {ins}
                          </span>
                        ))}
                      </div>
                      <p className="text-[11px] text-slate-500 pt-1">
                        Call {BUSINESS_INFO.phone} for 1-hour fast eligibility verification.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Agency Transfer Callout */}
      <div className="bg-gradient-to-r from-cyan-900 to-[#0A2540] rounded-3xl p-8 sm:p-10 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
            Transfer to HouseCalls
          </span>
          <h3 className="text-2xl font-bold">Unsatisfied with Your Current Home Care Agency?</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Switching your HHA or CDPAP care coordinator to HouseCalls is seamless. There is no disruption to your daily care hours or family caregiver paycheck. We handle 100% of the paperwork with your MLTC plan.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onOpenBooking('Transfer to HouseCalls')}
            className="px-6 py-3 bg-[#00A3C4] hover:bg-[#008ba8] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
          >
            Start Free Agency Transfer
          </button>
        </div>
      </div>
    </div>
  );
}
