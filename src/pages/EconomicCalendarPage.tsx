import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { EconomicEvent, EventImpact } from '../types';
import { contentService } from '../services/contentApi';
import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  Filter, 
  Search, 
  Info, 
  X, 
  TrendingUp, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface EconomicCalendarPageProps {
  onNavigate: (path: string) => void;
}

export const EconomicCalendarPage: React.FC<EconomicCalendarPageProps> = ({ onNavigate }) => {
  const { t, direction } = useTranslation();
  const [events, setEvents] = useState<EconomicEvent[]>([]);
  const [selectedImpact, setSelectedImpact] = useState<string>('ALL');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('ALL');
  const [selectedEvent, setSelectedEvent] = useState<EconomicEvent | null>(null);

  useEffect(() => {
    const load = async () => {
      const list = await contentService.getEconomicEvents();
      setEvents(list);
    };
    load();
  }, []);

  const currencies = ['ALL', 'USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];

  const filtered = events.filter(e => {
    const matchesImpact = selectedImpact === 'ALL' || e.impact === selectedImpact;
    const matchesCurrency = selectedCurrency === 'ALL' || e.currency === selectedCurrency;
    return matchesImpact && matchesCurrency;
  });

  const getImpactBadge = (impact: EventImpact) => {
    switch (impact) {
      case 'HIGH':
        return (
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/40">
            HIGH
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40">
            MEDIUM
          </span>
        );
      case 'LOW':
        return (
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">
            LOW
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-2">
            <Calendar size={14} /> Macro Schedule
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            {t('calendar.title')}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time consensus forecasts, historical revisions, and event-driven volatility forecasts.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 text-slate-300">
          <Clock size={14} className="text-blue-400" />
          <span>All times displayed in UTC</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Impact Filter */}
        <div className="flex items-center gap-2">
          {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map(imp => (
            <button
              key={imp}
              onClick={() => setSelectedImpact(imp)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition cursor-pointer ${
                selectedImpact === imp
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {imp === 'ALL' ? 'All Impacts' : imp}
            </button>
          ))}
        </div>

        {/* Currency Filter */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {currencies.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCurrency(c)}
              className={`px-2.5 py-1 rounded-md text-xs font-mono transition cursor-pointer ${
                selectedCurrency === c
                  ? 'bg-slate-800 text-blue-400 font-bold border border-blue-500/30'
                  : 'bg-slate-950 text-slate-500 hover:text-slate-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Table */}
      <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-xs font-mono text-slate-400">
                <th className="py-3.5 px-4 w-28">Time (UTC)</th>
                <th className="py-3.5 px-4 w-20">Currency</th>
                <th className="py-3.5 px-4 w-24">Impact</th>
                <th className="py-3.5 px-4">Economic Release Event</th>
                <th className="py-3.5 px-4 text-right w-24">Actual</th>
                <th className="py-3.5 px-4 text-right w-24">Forecast</th>
                <th className="py-3.5 px-4 text-right w-24">Previous</th>
                <th className="py-3.5 px-4 text-right w-20">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs font-mono">
              {filtered.map(item => {
                const hasActual = item.actual !== undefined && item.actual !== '-';

                return (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedEvent(item)}
                    className="hover:bg-slate-850/80 transition cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 text-slate-400">
                      {item.time}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-200">
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700/80">
                        {item.currency}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {getImpactBadge(item.impact)}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-100 font-sans group-hover:text-blue-400 transition">
                      {item.event}
                    </td>

                    <td className="py-3.5 px-4 text-right font-bold">
                      <span className={hasActual ? 'text-emerald-400' : 'text-slate-500'}>
                        {item.actual || '—'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right text-slate-300">
                      {item.forecast}
                    </td>

                    <td className="py-3.5 px-4 text-right text-slate-400">
                      {item.previous}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <span className="p-1 rounded-md text-slate-400 group-hover:text-blue-400 inline-block">
                        <Info size={15} />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-200">
                    {selectedEvent.currency}
                  </span>
                  {getImpactBadge(selectedEvent.impact)}
                  <span className="text-xs font-mono text-slate-400">{selectedEvent.time} UTC</span>
                </div>
                <h3 className="font-bold text-slate-100 text-lg">
                  {selectedEvent.event}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1 text-slate-400 hover:text-slate-200"
              >
                <X size={18} />
              </button>
            </div>

            {/* Figures Grid */}
            <div className="grid grid-cols-3 gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs font-mono text-center">
              <div>
                <div className="text-slate-500 text-[10px]">Actual</div>
                <div className="font-bold text-slate-100 text-base mt-0.5">{selectedEvent.actual || 'Pending'}</div>
              </div>
              <div>
                <div className="text-slate-500 text-[10px]">Consensus Forecast</div>
                <div className="font-bold text-blue-400 text-base mt-0.5">{selectedEvent.forecast}</div>
              </div>
              <div>
                <div className="text-slate-500 text-[10px]">Previous Release</div>
                <div className="font-bold text-slate-400 text-base mt-0.5">{selectedEvent.previous}</div>
              </div>
            </div>

            {/* Why It Matters */}
            <div className="space-y-2">
              <h4 className="font-mono font-bold text-xs text-amber-400 uppercase flex items-center gap-1.5">
                <ShieldAlert size={14} /> Institutional Significance & Strategy
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
                {selectedEvent.whyItMatters || 'This macroeconomic release represents a top-tier indicator directly factored into central bank monetary policy forecasts and currency yield expectations.'}
              </p>
            </div>

            {/* Affected Pairs */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs font-mono">
              <span className="text-slate-400">Primary Pairs Affected:</span>
              <div className="flex items-center gap-2">
                {selectedEvent.currency === 'USD' ? (
                  <>
                    <button onClick={() => { onNavigate('/markets/EUR-USD'); setSelectedEvent(null); }} className="text-blue-400 hover:underline">EUR/USD</button>
                    <button onClick={() => { onNavigate('/markets/XAU-USD'); setSelectedEvent(null); }} className="text-amber-400 hover:underline">XAU/USD</button>
                  </>
                ) : (
                  <button onClick={() => { onNavigate('/markets'); setSelectedEvent(null); }} className="text-blue-400 hover:underline">{selectedEvent.currency} Crosses</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
