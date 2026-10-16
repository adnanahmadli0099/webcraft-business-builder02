import { useState } from 'react';
import { Maximize2, ShieldCheck, Heart, Camera } from 'lucide-react';
import { GALLERY_PHOTOS, GalleryPhoto } from '../data/businessData';

interface GalleryPageProps {
  onOpenLightbox: (index: number) => void;
  onOpenBooking: () => void;
}

export function GalleryPage({ onOpenLightbox, onOpenBooking }: GalleryPageProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: 'All Photographs' },
    { id: 'care', label: 'Daily Care & Companionship' },
    { id: 'team', label: 'Clinical Intake & Nursing' },
    { id: 'nhtd', label: 'NHTD Waiver Programs' },
  ];

  const filteredPhotos = GALLERY_PHOTOS.filter(photo => {
    if (activeFilter === 'all') return true;
    return photo.category === activeFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-semibold text-[#00A3C4] uppercase tracking-wider">
          Real Moments of Care
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
          Care Stories & Gallery
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Authentic photography highlighting our dedicated home health aides, clinical registered nurses, and the New York seniors and families we are proud to serve every day.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              activeFilter === f.id
                ? 'bg-[#00A3C4] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => {
          const originalIndex = GALLERY_PHOTOS.findIndex(p => p.id === photo.id);
          return (
            <div
              key={photo.id}
              onClick={() => onOpenLightbox(originalIndex)}
              className="group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs hover:shadow-lg transition-all cursor-pointer aspect-4/3"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-white">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-slate-100 leading-snug">{photo.caption}</p>
                  <div className="p-2 rounded-lg bg-white/20 backdrop-blur-xs text-white shrink-0 ml-2">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
                <span className="text-[10px] text-cyan-300 mt-1 capitalize">{photo.category}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Proof Note */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center max-w-2xl mx-auto space-y-3">
        <p className="text-xs font-semibold text-slate-800">
          Every photo reflects authentic care routines coordinated by HouseCalls Home Care.
        </p>
        <p className="text-xs text-slate-500">
          Interested in giving your loved one the same high standard of clinical and personal care?
        </p>
        <div>
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 bg-[#00A3C4] hover:bg-[#008ba8] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
          >
            Schedule a Free In-Home Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
