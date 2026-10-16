import { Home, ArrowLeft, Phone, Search } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

interface NotFoundPageProps {
  onNavigateHome: () => void;
  onNavigateServices: () => void;
}

export function NotFoundPage({ onNavigateHome, onNavigateServices }: NotFoundPageProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 bg-cyan-50 text-[#00A3C4] rounded-3xl flex items-center justify-center mx-auto border border-cyan-100 shadow-sm">
          <span className="text-3xl font-black">404</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-slate-900">Page Not Found</h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            The healthcare service or page you are looking for may have moved or is temporarily unavailable. Let us help you find the right care.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onNavigateHome}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#00A3C4] hover:bg-[#008ba8] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>

          <button
            onClick={onNavigateServices}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
          >
            <span>Browse Care Programs</span>
          </button>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Need urgent assistance? Call our coordination team at{' '}
            <a href={`tel:${BUSINESS_INFO.phoneClean}`} className="text-[#00A3C4] font-semibold underline">
              {BUSINESS_INFO.phone}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
