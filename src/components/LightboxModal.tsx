import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryPhoto } from '../data/businessData';

interface LightboxModalProps {
  photos: GalleryPhoto[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function LightboxModal({ photos, currentIndex, onClose, onNavigate }: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % photos.length);
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, photos, onClose, onNavigate]);

  if (currentIndex === null) return null;

  const currentPhoto = photos[currentIndex];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls */}
        <div className="absolute top-0 right-0 p-4 z-10 flex items-center gap-3 text-white">
          <span className="text-xs font-mono bg-black/50 px-3 py-1 rounded-full border border-white/20">
            {currentIndex + 1} / {photos.length}
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors border border-white/20"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prev Button */}
        <button
          onClick={() => onNavigate((currentIndex - 1 + photos.length) % photos.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors border border-white/20 z-10"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={() => onNavigate((currentIndex + 1) % photos.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors border border-white/20 z-10"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Image Container */}
        <div className="w-full flex items-center justify-center p-2">
          <img
            src={currentPhoto.url}
            alt={currentPhoto.caption}
            className="max-h-[75vh] w-auto max-w-full rounded-lg shadow-2xl object-contain"
          />
        </div>

        {/* Caption */}
        <div className="mt-3 text-center px-4 max-w-2xl">
          <p className="text-white text-sm font-medium">{currentPhoto.caption}</p>
          <p className="text-cyan-400 text-xs mt-1 capitalize">Category: {currentPhoto.category} · Authentic HouseCalls Imagery</p>
        </div>
      </div>
    </div>
  );
}
