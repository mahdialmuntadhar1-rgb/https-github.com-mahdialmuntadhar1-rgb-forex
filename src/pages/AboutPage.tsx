import React from 'react';
import { useTranslation } from '../context/LanguageContext';
import { 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  Target, 
  Send, 
  MessageSquare, 
  Youtube, 
  Twitter, 
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  Flame
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { t, direction } = useTranslation();

  const principles = [
    {
      title: 'Capital Preservation as Primary Objective',
      description: 'Capital is a trader’s oxygen. Every trade must have a mathematically capped risk of 1% - 2% with zero exceptions. Defending capital guarantees surviving through drawdown distributions.'
    },
    {
      title: 'Macro Context Governs Technical Execution',
      description: 'Technical chart patterns only yield statistical edge when aligned with higher-timeframe central bank rate policies, liquidity flows, and currency yield differentials.'
    },
    {
      title: 'Structural Liquidity & Invalidation',
      description: 'Market makers hunt accumulated retail liquidity pools. We trade where the orders exist, maintaining strict, non-negotiable price points where trade premises are proven wrong.'
    },
    {
      title: 'Psychological Discipline & Detachment',
      description: 'Treat every position as a single occurrence in a sequence of 1,000 independent statistical bets. Accept losses calmly as the standard cost of doing business.'
    }
  ];

  const certifications = [
    'Chartered Market Technician (CMT) Level III',
    'Certified Financial Technician (CFTe)',
    '12+ Years Interbank & Spot Metals Execution Experience',
    'Former Senior FX Flow Strategist at London Macro Group'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero Profile Banner */}
      <div className="bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                alt="Karam Al-Rawi"
                className="w-48 h-48 rounded-3xl object-cover ring-4 ring-blue-500/30 shadow-2xl"
              />
              <span className="absolute -bottom-2 bg-blue-600 text-white font-mono text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                12+ Years Pro
              </span>
            </div>

            <div>
              <h1 className="text-2xl font-extrabold text-slate-100">Karam Al-Rawi</h1>
              <p className="text-sm font-mono text-blue-400 mt-0.5">Senior Macro & Gold Strategist</p>
            </div>

            {/* Social Channels */}
            <div className="flex items-center gap-3">
              <a
                href="https://t.me/karam_fx_intelligence"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 hover:text-white border border-slate-800 transition text-slate-300 shadow"
                title="Telegram"
              >
                <Send size={18} />
              </a>
              <a
                href="https://wa.me/447700900077"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 hover:text-white border border-slate-800 transition text-slate-300 shadow"
                title="WhatsApp"
              >
                <MessageSquare size={18} />
              </a>
              <a
                href="https://youtube.com/@karam_fx"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-rose-600 hover:text-white border border-slate-800 transition text-slate-300 shadow"
                title="YouTube"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://x.com/karam_fx"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-700 hover:text-white border border-slate-800 transition text-slate-300 shadow"
                title="X"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Bio statement */}
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
              <ShieldCheck size={14} /> Professional Background & Creed
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight leading-snug">
              Demystifying Institutional Order Flow with Discipline and Transparency
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              With over a decade navigating the London and New York interbank currency markets, my core objective is providing retail and institutional traders with uncompromising clarity. No get-rich-quick illusions, no arbitrary indicators—only mathematical edge, multi-timeframe structural mapping, and rigorous risk control.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-slate-500 text-xs font-mono uppercase">Primary Focus</div>
                <div className="text-slate-100 font-bold text-sm mt-0.5">G8 Forex & Gold (XAU)</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-slate-500 text-xs font-mono uppercase">Avg R:R Ratio</div>
                <div className="text-emerald-400 font-bold text-sm mt-0.5">1 : 2.6 Minimal</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 col-span-2 sm:col-span-1">
                <div className="text-slate-500 text-xs font-mono uppercase">Execution Style</div>
                <div className="text-blue-400 font-bold text-sm mt-0.5">Session Momentum</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Trading Principles */}
      <section className="space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100 font-mono">
            Non-Negotiable Trading Principles
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            The philosophical and mathematical foundations behind every market analysis and trade setup.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principles.map((p, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-lg">
              <div className="flex items-center gap-2.5 text-blue-400 font-bold font-mono text-base">
                <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                  0{idx + 1}
                </span>
                <span>{p.title}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications & Track Record */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl">
        <h3 className="text-xl font-extrabold text-slate-100 font-mono flex items-center gap-2">
          <Award size={22} className="text-amber-400" />
          Credentials & Verified Standards
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certifications.map((c, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3 text-slate-200 text-xs sm:text-sm font-medium">
              <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
              <span>{c}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <div className="bg-gradient-to-r from-blue-900/30 via-slate-900 to-slate-950 border border-blue-500/30 rounded-3xl p-8 text-center space-y-4">
        <h3 className="text-2xl font-bold text-slate-100">
          Ready to elevate your trading execution?
        </h3>
        <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Join our private mentorship community or access active daily market setups and institutional forecasts.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigate('/services')}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold shadow-lg shadow-blue-500/20 transition cursor-pointer"
          >
            Explore Services & Mentorship
          </button>
          <button
            onClick={() => onNavigate('/contact')}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs font-medium transition cursor-pointer"
          >
            Direct Inquiry
          </button>
        </div>
      </div>
    </div>
  );
};
