import { useState } from 'react';
import { Star, ShieldCheck, CheckCircle2, MessageSquarePlus, ExternalLink, ThumbsUp } from 'lucide-react';
import { TESTIMONIALS, TestimonialItem, BUSINESS_INFO } from '../data/businessData';

interface ReviewsPageProps {
  onOpenBooking: () => void;
}

export function ReviewsPage({ onOpenBooking }: ReviewsPageProps) {
  const [reviewsList, setReviewsList] = useState<TestimonialItem[]>(TESTIMONIALS);
  const [filterService, setFilterService] = useState('all');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    author: '',
    relation: 'Daughter / Son',
    location: 'Brooklyn, NY',
    rating: 5,
    serviceReceived: 'Personal Care & HHA',
    text: '',
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const filteredReviews = reviewsList.filter(r => {
    if (filterService === 'all') return true;
    return r.serviceReceived.toLowerCase().includes(filterService.toLowerCase());
  });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author.trim() || !newReview.text.trim()) return;

    const item: TestimonialItem = {
      id: 'rev-' + Date.now(),
      author: newReview.author,
      relation: newReview.relation,
      location: newReview.location,
      rating: newReview.rating,
      date: 'Submitted Today (Pending Verification)',
      text: newReview.text,
      serviceReceived: newReview.serviceReceived,
      verified: true,
    };

    setReviewsList([item, ...reviewsList]);
    setSubmitSuccess(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* Header & Overall Rating Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-semibold text-[#00A3C4] uppercase tracking-wider">
              Verified Client & Family Feedback
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Trusted by Hundreds of New York Families
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed">
              With over 600+ reviews across Google Maps and Birdeye, HouseCalls Home Care maintains an A+ rating with the Better Business Bureau. Read firsthand experiences from the families we care for every day.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={BUSINESS_INFO.primaryGoogleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs"
              >
                <span>View Google Maps Reviews</span>
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              </a>

              <button
                onClick={() => {
                  setSubmitSuccess(false);
                  setIsSubmitModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#00A3C4] text-white rounded-xl text-xs font-semibold hover:bg-[#008ba8] transition-colors shadow-xs"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                <span>Write a Review</span>
              </button>
            </div>
          </div>

          {/* Rating Breakdown Scoreboard */}
          <div className="lg:col-span-6 bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-6 mb-6">
              <div className="text-center">
                <span className="text-5xl font-black text-slate-900 tabular-nums">4.8</span>
                <div className="flex text-amber-400 justify-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Out of 5.0 Stars</p>
              </div>

              <div className="h-14 w-px bg-slate-200"></div>

              <div>
                <p className="text-sm font-bold text-slate-800">638 Verified Ratings</p>
                <p className="text-xs text-slate-500 mt-0.5">Google Maps & Birdeye Surveys</p>
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold mt-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>BBB A+ Rating</span>
                </div>
              </div>
            </div>

            {/* Bars */}
            <div className="space-y-2 text-xs">
              {[
                { stars: '5 Stars', pct: '88%', count: '561' },
                { stars: '4 Stars', pct: '9%', count: '57' },
                { stars: '3 Stars', pct: '2%', count: '13' },
                { stars: '2 Stars', pct: '1%', count: '5' },
                { stars: '1 Star', pct: '<1%', count: '2' },
              ].map((bar, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-14 text-slate-600 shrink-0 font-medium">{bar.stars}</span>
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: bar.pct }}></div>
                  </div>
                  <span className="w-10 text-right text-slate-500 tabular-nums">{bar.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Reviews List */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <h3 className="text-lg font-bold text-slate-900">
            Client Testimonials ({filteredReviews.length})
          </h3>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Filter Program:</span>
            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3C4]"
            >
              <option value="all">All Programs</option>
              <option value="personal">Personal Care & HHA</option>
              <option value="cdpap">CDPAP Program</option>
              <option value="nursing">Skilled Nursing</option>
              <option value="waiver">NHTD Waiver</option>
              <option value="dementia">Memory & Dementia Care</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{rev.date}</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{rev.author}</h4>
                  <p className="text-[11px] text-slate-500">{rev.relation} · {rev.location}</p>
                </div>
                <span className="text-[10px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium">
                  {rev.serviceReceived}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            {submitSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Thank You for Your Feedback!</h4>
                <p className="text-xs text-slate-600">
                  Your review has been submitted to the HouseCalls patient coordination team. We deeply appreciate your trust in our care.
                </p>
                <button
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-5 py-2 bg-[#00A3C4] text-white rounded-lg text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-900 text-base">Share Your Experience</h3>
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="text-slate-400 hover:text-slate-600 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={newReview.author}
                    onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                    placeholder="e.g. Sandra M."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3C4]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Relationship</label>
                    <select
                      value={newReview.relation}
                      onChange={(e) => setNewReview({ ...newReview, relation: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                    >
                      <option value="Daughter / Son">Daughter / Son</option>
                      <option value="Family Caregiver">Family Caregiver</option>
                      <option value="Patient">Patient</option>
                      <option value="Spouse">Spouse</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Rating</label>
                    <select
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ 5 Stars</option>
                      <option value={4}>⭐⭐⭐⭐ 4 Stars</option>
                      <option value={3}>⭐⭐⭐ 3 Stars</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Service Received</label>
                  <select
                    value={newReview.serviceReceived}
                    onChange={(e) => setNewReview({ ...newReview, serviceReceived: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Personal Care & HHA">Personal Care & HHA</option>
                    <option value="CDPAP Medicaid Program">CDPAP Medicaid Program</option>
                    <option value="Skilled Nursing (RN Visits)">Skilled Nursing (RN Visits)</option>
                    <option value="NHTD Waiver Services">NHTD Waiver Services</option>
                    <option value="Memory & Dementia Care">Memory & Dementia Care</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Review Comments *</label>
                  <textarea
                    required
                    rows={3}
                    value={newReview.text}
                    onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                    placeholder="Tell us about how our caregivers or coordination team helped your family..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3C4]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#00A3C4] hover:bg-[#008ba8] text-white font-semibold rounded-lg text-xs transition-colors shadow-xs"
                >
                  Publish Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
