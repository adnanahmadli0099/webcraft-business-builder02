import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { LightboxModal } from './components/LightboxModal';
import { AdminPanel } from './components/AdminPanel';
import { ExportCodeModal } from './components/ExportCodeModal';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { LocationsPage } from './pages/LocationsPage';
import { CareersPage } from './pages/CareersPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { GALLERY_PHOTOS, BUSINESS_INFO } from './data/businessData';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedServiceParam, setSelectedServiceParam] = useState<string | undefined>(undefined);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingDefaultService, setBookingDefaultService] = useState<string | undefined>(undefined);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isExportCodeOpen, setIsExportCodeOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (tab: string, param?: string) => {
    if (tab === 'cdpap') {
      setCurrentTab('services');
      setSelectedServiceParam('cdpap');
    } else {
      setCurrentTab(tab);
      setSelectedServiceParam(param);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (serviceName?: string) => {
    setBookingDefaultService(serviceName);
    setIsBookingOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 antialiased selection:bg-[#00A3C4] selection:text-white font-sans">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        isAdminOpen={isAdminOpen}
        onToggleAdmin={() => setIsAdminOpen(!isAdminOpen)}
        onOpenExportCode={() => setIsExportCodeOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenBooking={() => handleOpenBooking()}
            onOpenLightbox={(idx) => setLightboxIndex(idx)}
          />
        )}

        {currentTab === 'services' && (
          <ServicesPage
            onOpenBooking={handleOpenBooking}
            selectedServiceId={selectedServiceParam}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage
            onOpenBooking={() => handleOpenBooking()}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'gallery' && (
          <GalleryPage
            onOpenLightbox={(idx) => setLightboxIndex(idx)}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {currentTab === 'reviews' && (
          <ReviewsPage
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {currentTab === 'faq' && (
          <FaqPage
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {currentTab === 'contact' && (
          <ContactPage />
        )}

        {currentTab === 'locations' && (
          <LocationsPage
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {currentTab === 'careers' && (
          <CareersPage />
        )}

        {currentTab === 'privacy' && (
          <LegalPage initialTab="privacy" />
        )}

        {currentTab === 'terms' && (
          <LegalPage initialTab="terms" />
        )}

        {currentTab === 'sms-policy' && (
          <LegalPage initialTab="sms" />
        )}

        {currentTab === 'compliance' && (
          <LegalPage initialTab="compliance" />
        )}

        {currentTab === '404' && (
          <NotFoundPage
            onNavigateHome={() => handleNavigate('home')}
            onNavigateServices={() => handleNavigate('services')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Booking / Assessment Modal */}
      <ConsultationModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultService={bookingDefaultService}
      />

      {/* Photo Lightbox Modal */}
      <LightboxModal
        photos={GALLERY_PHOTOS}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />

      {/* Staff Admin Panel */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Export Pure HTML, CSS & JavaScript Modal */}
      <ExportCodeModal
        isOpen={isExportCodeOpen}
        onClose={() => setIsExportCodeOpen(false)}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3 pointer-events-none">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="pointer-events-auto p-2.5 rounded-full bg-white text-slate-700 shadow-md border border-slate-200 hover:bg-slate-50 transition-all hover:scale-105"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* WhatsApp Floating Conversion Pill */}
        <a
          href={BUSINESS_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 text-xs font-bold"
          title="Chat with Care Intake on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span className="hidden sm:inline">WhatsApp Care Intake</span>
        </a>
      </div>
    </div>
  );
}
