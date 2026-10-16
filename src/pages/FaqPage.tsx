import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, Phone, ArrowRight } from 'lucide-react';
import { FAQS, FaqItem, BUSINESS_INFO } from '../data/businessData';

interface FaqPageProps {
  onOpenBooking: () => void;
}

export function FaqPage({ onOpenBooking }: FaqPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(FAQS[0]?.id || null);

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'general', label: 'Starting Home Care' },
    { id: 'cdpap', label: 'CDPAP Paid Family Care' },
    { id: 'insurance', label: 'Medicaid & Insurance' },
    { id: 'caregivers', label: 'Caregivers & Staff' },
  ];

  const filteredFaqs = FAQS.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-semibold text-[#00A3C4] uppercase tracking-wider">
          Clear Answers for Families
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Find answers about New York Medicaid coverage, CDPAP eligibility, caregiver qualifications, and how we coordinate with hospitals and physicians.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="relative max-w-xl mx-auto">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search e.g. CDPAP pay, Medicaid, language, hours..."
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00A3C4] shadow-xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-semibold"
          >
            Clear
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              activeCategory === c.id
                ? 'bg-[#00A3C4] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Accordion FAQ List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <HelpCircle className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-800">No questions matched your search query.</p>
            <p className="text-xs text-slate-500">
              Please try different keywords or speak directly to our intake team at {BUSINESS_INFO.phone}.
            </p>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = expandedFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-shadow"
              >
                <button
                  onClick={() => setExpandedFaqId(isOpen ? null : faq.id)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  <span className="font-bold text-slate-900 text-sm sm:text-base pr-2">
                    {faq.question}
                  </span>
                  <div className="p-1 rounded-full bg-slate-100 text-slate-600 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 animate-in slide-in-from-top-1 duration-150">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still Have Questions Box */}
      <div className="bg-gradient-to-r from-slate-900 to-[#0A2540] rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h4 className="text-xl font-bold">Have a specific case or hospital discharge?</h4>
          <p className="text-xs sm:text-sm text-slate-300">
            Our Licensed Registered Nurse coordinators are available Monday to Friday 9 AM – 5 PM for immediate case consultations.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`tel:${BUSINESS_INFO.phoneClean}`}
            className="px-5 py-2.5 bg-white text-slate-900 font-semibold rounded-xl text-xs hover:bg-slate-100 transition-colors flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-[#00A3C4]" />
            <span>{BUSINESS_INFO.phone}</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 bg-[#00A3C4] hover:bg-[#008ba8] text-white font-semibold rounded-xl text-xs transition-colors shadow-xs"
          >
            Request Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
