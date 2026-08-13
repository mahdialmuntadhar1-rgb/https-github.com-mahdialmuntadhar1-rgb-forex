import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { ServiceItem } from '../types';
import { contentService } from '../services/contentApi';
import { 
  ShieldCheck, 
  Zap, 
  Target, 
  Users, 
  CheckCircle2, 
  Send, 
  MessageSquare, 
  ArrowRight,
  Clock,
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const { t, direction } = useTranslation();
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    const load = async () => {
      const list = await contentService.getServices();
      setServices(list);
    };
    load();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
          <Zap size={14} /> Institutional Mentorship & Intelligence
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          {t('services.title')}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          {t('services.subtitle')}. High-probability setups, one-on-one trade journaling audits, and strategic macro consultation tailored to your capital tier.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((srv, idx) => {
          const isVip = srv.id.includes('vip') || idx === 1;

          return (
            <div
              key={srv.id}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 relative ${
                isVip
                  ? 'bg-gradient-to-b from-blue-950/60 to-slate-900/90 border-2 border-blue-500 shadow-2xl shadow-blue-500/10'
                  : 'bg-slate-900/90 border border-slate-800 shadow-xl'
              }`}
            >
              {srv.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-blue-600 text-white font-mono text-[11px] font-extrabold uppercase shadow-md">
                  {srv.badge}
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold text-blue-400 uppercase">
                    {srv.availability}
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-100">
                    {srv.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {srv.description}
                </p>

                <div className="pt-4 border-t border-slate-800 space-y-2.5">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                    What's Included:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {srv.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 space-y-3">
                <button
                  onClick={() => onNavigate(`/contact?subject=${encodeURIComponent(srv.title)}`)}
                  className={`w-full py-3 rounded-xl font-mono text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                    isVip
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  <span>{srv.ctaText || 'Apply for Access'}</span>
                  <ArrowRight size={14} className={direction === 'rtl' ? 'rotate-180' : ''} />
                </button>

                <div className="flex items-center justify-center gap-4 text-[11px] font-mono text-slate-400">
                  <a
                    href="https://wa.me/447700900077"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-emerald-400 flex items-center gap-1 transition"
                  >
                    <MessageSquare size={13} /> WhatsApp
                  </a>
                  <span>•</span>
                  <a
                    href="https://t.me/profitpoint_official"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#2163CC] flex items-center gap-1 transition"
                  >
                    <Send size={13} /> Telegram
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto space-y-6 pt-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-100 font-mono">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-400">
            Transparent answers on membership, delivery channels, and requirements.
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'How are the VIP setups delivered in real-time?',
              a: 'All trade setups are transmitted concurrently via encrypted VIP Telegram alerts, instant platform push notifications, and detailed chart briefings on the portal with entry zones, target levels, and precise stop-loss parameters.'
            },
            {
              q: 'Is there a minimum capital requirement for 1-on-1 Mentorship?',
              a: 'While educational principles apply to any account size, we recommend traders have a live or funded prop trading account of at least $5,000 to adhere to proper fractional risk management (1% per trade).'
            },
            {
              q: 'Are results guaranteed in financial markets?',
              a: 'No reputable financial professional guarantees profits. Trading involves substantial risk of loss. Our mentorship focuses on building statistical edge, disciplined psychology, and rigorous risk control over hundreds of iterations.'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h4 className="font-bold text-slate-100 text-sm">{item.q}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
