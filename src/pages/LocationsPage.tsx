import { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, Bus, Car, ExternalLink, ShieldCheck } from 'lucide-react';
import { OFFICE_LOCATIONS, BUSINESS_INFO, OfficeLocation } from '../data/businessData';

interface LocationsPageProps {
  onOpenBooking: () => void;
}

export function LocationsPage({ onOpenBooking }: LocationsPageProps) {
  const [selectedOfficeId, setSelectedOfficeId] = useState<string>('church-ave');

  const selectedOffice = OFFICE_LOCATIONS.find(loc => loc.id === selectedOfficeId) || OFFICE_LOCATIONS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-semibold text-[#00A3C4] uppercase tracking-wider">
          Brooklyn Headquarters & Regional Hubs
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
          Our Locations & Directions
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          HouseCalls operates three full-service administrative and clinical coordination centers across Brooklyn, dispatching caregivers throughout all five boroughs and Long Island.
        </p>
      </div>

      {/* Office Switcher Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {OFFICE_LOCATIONS.map((loc) => {
          const isSelected = selectedOfficeId === loc.id;
          return (
            <button
              key={loc.id}
              onClick={() => setSelectedOfficeId(loc.id)}
              className={`text-left p-6 rounded-2xl border transition-all ${
                isSelected
                  ? 'bg-white border-[#00A3C4] shadow-md ring-2 ring-cyan-100'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                  isSelected ? 'bg-cyan-100 text-[#00A3C4]' : 'bg-slate-100 text-slate-600'
                }`}>
                  {loc.neighborhood}
                </span>
                {loc.isPrimary && (
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Primary LHCSA
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-slate-900">{loc.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{loc.address}, {loc.city}, {loc.state} {loc.zip}</p>
              <p className="text-xs text-[#00A3C4] font-semibold mt-2">{loc.phone}</p>
            </button>
          );
        })}
      </div>

      {/* Selected Location Details & Interactive Map View */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Information Column */}
        <div className="lg:col-span-5 p-8 sm:p-10 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#00A3C4] uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>{selectedOffice.neighborhood}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {selectedOffice.name}
            </h2>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00A3C4] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">Full Address</p>
                  <p>{selectedOffice.address}</p>
                  <p>{selectedOffice.city}, {selectedOffice.state} {selectedOffice.zip}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#00A3C4] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">Operating Hours</p>
                  <p>{selectedOffice.hours}</p>
                  <p className="text-slate-500 text-[11px]">Field caregivers on duty 24/7</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Bus className="w-4 h-4 text-[#00A3C4] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">Public Transit (MTA)</p>
                  <p className="leading-relaxed">{selectedOffice.subway}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Car className="w-4 h-4 text-[#00A3C4] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">Driving & Parking</p>
                  <p className="leading-relaxed">{selectedOffice.parking}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <a
              href={selectedOffice.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4 text-cyan-400" />
              <span>Get Directions in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <button
              onClick={onOpenBooking}
              className="w-full py-3 px-4 bg-[#00A3C4] hover:bg-[#008ba8] text-white font-semibold rounded-xl text-xs transition-colors shadow-xs text-center"
            >
              Book In-Person Office Consultation
            </button>
          </div>
        </div>

        {/* Right Embedded Interactive Map */}
        <div className="lg:col-span-7 bg-slate-100 min-h-[380px] lg:min-h-full relative border-t lg:border-t-0 lg:border-l border-slate-200">
          <iframe
            title={`Map for ${selectedOffice.name}`}
            src={selectedOffice.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ minHeight: '420px', border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Borough Coverage Details */}
      <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-200 space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold text-[#00A3C4] uppercase tracking-wider">
            Broad Regional Service Radius
          </span>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">
            Care Delivered Across the Entire NYC Metro Area
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            You do not need to live adjacent to our offices. Our certified aides and visiting RNs live in and serve all surrounding counties.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {BUSINESS_INFO.serviceAreas.map((area, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
              <p className="font-bold text-slate-900 text-sm">{area.name}</p>
              <p className="text-slate-600 leading-relaxed">{area.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
