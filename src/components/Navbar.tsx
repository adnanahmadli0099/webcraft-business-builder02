import { useState } from 'react';
import { Phone, Menu, X, ShieldCheck, HeartHandshake, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenBooking: () => void;
  isAdminOpen: boolean;
  onToggleAdmin: () => void;
  onOpenExportCode: () => void;
}

export function Navbar({ currentTab, onNavigate, onOpenBooking, isAdminOpen, onToggleAdmin, onOpenExportCode }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About Us' },
    { id: 'cdpap', label: 'CDPAP Program' },
    { id: 'gallery', label: 'Care Stories' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'locations', label: 'Locations' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tabId: string) => {
    onNavigate(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Clinical Utility Strip */}
      <div className="bg-[#0A2540] text-slate-200 text-xs py-2 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              NYS Licensed Home Care Agency (LHCSA)
            </span>
            <span className="hidden md:inline text-slate-500">·</span>
            <span className="hidden md:inline text-slate-300">
              Serving Brooklyn, Queens, Manhattan, Bronx & Staten Island
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs">
            <a 
              href={`tel:${BUSINESS_INFO.phoneClean}`} 
              className="flex items-center gap-1.5 font-semibold text-white hover:text-cyan-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Call: {BUSINESS_INFO.phone}</span>
            </a>
            <span className="text-slate-600">|</span>
            <button
              onClick={onOpenExportCode}
              className="font-bold text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1"
              title="Get pure HTML, CSS and JavaScript code"
            >
              <span>HTML, CSS & JS Code</span>
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => handleNavClick('careers')}
              className="hover:text-cyan-300 transition-colors hidden sm:inline"
            >
              Careers / HHA Jobs
            </button>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <button
              onClick={onToggleAdmin}
              className={`hover:text-cyan-300 transition-colors ${isAdminOpen ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
              title="Staff Portal"
            >
              Staff Portal
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark & Authentic Logo */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 cursor-pointer select-none shrink-0"
          >
            <img 
              src="/assets/logo-housecalls.svg" 
              alt="HouseCalls Home Care Logo" 
              className="h-11 w-auto object-contain"
              onError={(e) => {
                // Fallback to local PNG if SVG renderer hiccups
                (e.currentTarget as HTMLImageElement).src = '/assets/logo-250px.png';
              }}
            />
          </div>

          {/* Zone 2: Single-line Primary Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                    isActive 
                      ? 'text-[#0A2540] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#00A3C4]' 
                      : 'hover:text-[#0A2540]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action CTA Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200"
            >
              <span>WhatsApp Us</span>
            </a>
            <button
              onClick={onOpenBooking}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-[#00A3C4] hover:bg-[#008ba8] active:bg-[#00748c] rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0"
            >
              Request Free Assessment
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="sm:hidden px-3 py-1.5 text-xs font-semibold text-white bg-[#00A3C4] rounded-lg"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    currentTab === link.id
                      ? 'bg-cyan-50 text-[#00A3C4] font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('careers')}
                className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Careers / Join Our Team
              </button>
              <button
                onClick={() => {
                  onToggleAdmin();
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50"
              >
                Staff Portal
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={`tel:${BUSINESS_INFO.phoneClean}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-slate-900 text-white rounded-lg text-sm font-medium"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-2.5 px-4 bg-[#00A3C4] text-white rounded-lg text-sm font-semibold shadow-xs"
              >
                Request Free Assessment
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
