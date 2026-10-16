import { useState } from 'react';
import { DollarSign, Clock, ArrowRight, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

interface CDPAPCalculatorProps {
  onOpenBooking: () => void;
}

export function CDPAPCalculator({ onOpenBooking }: CDPAPCalculatorProps) {
  const [weeklyHours, setWeeklyHours] = useState(30);
  const hourlyRateEstimate = 21.09; // NYC standard home care wage parity benchmark

  const estimatedWeekly = (weeklyHours * hourlyRateEstimate).toFixed(2);
  const estimatedMonthly = (weeklyHours * hourlyRateEstimate * 4.33).toFixed(2);
  const estimatedAnnual = (weeklyHours * hourlyRateEstimate * 52).toFixed(2);

  return (
    <div className="bg-gradient-to-br from-[#0A2540] to-[#0F2D59] rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-cyan-900/40">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-700/60">
        <div>
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            NYS CDPAP Medicaid Benefit
          </span>
          <h3 className="text-2xl font-bold mt-1 text-white">
            CDPAP Caregiver Pay Calculator
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Under New York’s Consumer Directed Personal Assistance Program, children, relatives, and friends can be hired and paid directly to care for Medicaid-eligible family members.
          </p>
        </div>
        <div className="bg-cyan-500/10 border border-cyan-400/30 rounded-xl px-4 py-2 shrink-0">
          <p className="text-xs text-cyan-300 font-medium">NYC Wage Parity Rate</p>
          <p className="text-xl font-bold text-white tabular-nums">${hourlyRateEstimate.toFixed(2)} <span className="text-xs text-slate-400 font-normal">/ hour</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Left Slider Column */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Approved Care Hours Per Week:</span>
              </label>
              <span className="text-2xl font-bold text-cyan-400 tabular-nums">
                {weeklyHours} hrs/wk
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="56"
              step="1"
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#00A3C4]"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1.5 font-mono">
              <span>10 hrs (Part-time)</span>
              <span>25 hrs</span>
              <span>40 hrs (Full-time)</span>
              <span>56 hrs (Split/Overtime)</span>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Weekly payroll with direct deposit and W-2 withholdings handled by HouseCalls</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>No special certificate or license required for family caregivers</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Paid time off (PTO) and overtime opportunities when approved by MLTC</span>
            </div>
          </div>
        </div>

        {/* Right Calculation Display Card */}
        <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-white/10 pb-3">
              <p className="text-xs text-slate-400">Estimated Weekly Paycheck</p>
              <p className="text-3xl font-extrabold text-white tabular-nums tracking-tight">
                ${Number(estimatedWeekly).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-slate-400">Estimated Monthly</p>
                <p className="text-base font-bold text-slate-200 tabular-nums">
                  ${Number(estimatedMonthly).toLocaleString('en-US', { minimumFractionDigits: 0 })}
                </p>
              </div>
              <div>
                <p className="text-slate-400">Estimated Annual</p>
                <p className="text-base font-bold text-slate-200 tabular-nums">
                  ${Number(estimatedAnnual).toLocaleString('en-US', { minimumFractionDigits: 0 })}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
            <button
              onClick={onOpenBooking}
              className="w-full py-2.5 px-4 bg-[#00A3C4] hover:bg-[#008ba8] text-white font-semibold rounded-lg text-xs transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <span>Enroll in CDPAP Today</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-slate-400 text-center">
              Questions? Call CDPAP Coordinator directly at {BUSINESS_INFO.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
