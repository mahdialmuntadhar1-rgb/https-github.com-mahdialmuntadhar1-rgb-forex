import React from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { HorizontalLogo } from '../brand/HorizontalLogo';
import { 
  Globe, 
  Send, 
  Youtube, 
  Instagram, 
  Twitter, 
  MessageSquare,
  AlertTriangle
} from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t, language, setLanguage } = useTranslation();

  return (
    <footer className="w-full bg-[#0B1C2D] border-t border-[#1E3A57] text-slate-300 pt-12 pb-24 md:pb-12 text-sm select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main 5-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <HorizontalLogo variant="dark" size="md" showTagline={true} tagline="MARKET INTELLIGENCE" />
            </div>
            <p className="text-xs leading-relaxed text-slate-300 max-w-sm">
              Profit Point provides institutional-grade market research, systematic price action levels, disciplined risk framework, and continuous trader education. Helping traders understand the market with precision and clarity.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://t.me/profitpoint_official"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-[#0F2236] hover:bg-[#2163CC] hover:text-white border border-[#1E3A57] transition text-slate-300 shadow-sm"
                title="Profit Point Telegram Channel"
              >
                <Send size={16} />
              </a>
              <a
                href="https://wa.me/447700900077"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-[#0F2236] hover:bg-[#2163CC] hover:text-white border border-[#1E3A57] transition text-slate-300 shadow-sm"
                title="WhatsApp Direct Support"
              >
                <MessageSquare size={16} />
              </a>
              <a
                href="https://youtube.com/@profitpoint_fx"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-[#0F2236] hover:bg-[#2163CC] hover:text-white border border-[#1E3A57] transition text-slate-300 shadow-sm"
                title="YouTube Masterclasses"
              >
                <Youtube size={16} />
              </a>
              <a
                href="https://instagram.com/profitpoint_fx"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-[#0F2236] hover:bg-[#2163CC] hover:text-white border border-[#1E3A57] transition text-slate-300 shadow-sm"
                title="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://x.com/profitpoint_fx"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-[#0F2236] hover:bg-[#2163CC] hover:text-white border border-[#1E3A57] transition text-slate-300 shadow-sm"
                title="X / Twitter"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Markets & Intel */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              {t('nav.markets')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('/markets')} className="text-slate-300 hover:text-[#2163CC] transition cursor-pointer">
                  {t('marketOverview.all')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/forex')} className="text-slate-300 hover:text-[#2163CC] transition cursor-pointer">
                  {t('nav.forex')} Majors & Crosses
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/gold')} className="text-slate-300 hover:text-[#2163CC] transition cursor-pointer">
                  {t('nav.gold')} Intelligence Hub
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/market-analysis')} className="text-slate-300 hover:text-[#2163CC] transition cursor-pointer">
                  {t('nav.analysis')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/signals')} className="text-slate-300 hover:text-[#2163CC] transition cursor-pointer">
                  {t('nav.signals')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Education & Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              {t('nav.education')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('/education')} className="text-slate-300 hover:text-[#2163CC] transition cursor-pointer">
                  {t('academy.title')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/videos')} className="text-slate-300 hover:text-[#2163CC] transition cursor-pointer">
                  {t('videos.title')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/economic-calendar')} className="text-slate-300 hover:text-[#2163CC] transition cursor-pointer">
                  {t('calendar.title')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/news')} className="text-slate-300 hover:text-[#2163CC] transition cursor-pointer">
                  {t('news.title')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/calculators')} className="text-slate-300 hover:text-[#2163CC] transition cursor-pointer">
                  Trading Calculators
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Company & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('/about')} className="text-slate-300 hover:text-[#2163CC] transition cursor-pointer">
                  About Profit Point
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services')} className="text-slate-300 hover:text-[#2163CC] transition cursor-pointer">
                  VIP Services & Mentorship
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="text-slate-300 hover:text-[#2163CC] transition cursor-pointer">
                  Contact Desk
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/app/dashboard')} className="text-slate-300 hover:text-[#2163CC] transition cursor-pointer">
                  Trader Workspace
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/admin/dashboard')} className="text-[#2163CC] hover:underline transition font-mono cursor-pointer">
                  Profit Point Control CMS
                </button>
              </li>
            </ul>

            {/* Quick Language Switch in footer */}
            <div className="pt-2">
              <div className="text-[11px] font-mono text-slate-400 mb-1.5 flex items-center gap-1">
                <Globe size={12} className="text-[#2163CC]" /> Language / زمان
              </div>
              <div className="flex items-center gap-1.5">
                {(['en', 'ar', 'ckb'] as const).map(l => (
                  <button
                    key={l}
                    onClick={() => setLanguage(l)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono border transition ${
                      language === l
                        ? 'bg-[#2163CC] text-white border-[#2163CC]'
                        : 'bg-[#0F2236] text-slate-300 border-[#1E3A57] hover:text-white'
                    }`}
                  >
                    {l === 'en' ? 'EN' : l === 'ar' ? 'عربي' : 'کوردی'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Financial Risk Disclaimer Box */}
        <div className="p-4 rounded-2xl bg-[#0F2236] border border-[#1E3A57] text-xs text-slate-300 space-y-1.5">
          <div className="flex items-center gap-2 text-[#2163CC] font-bold font-mono text-[11px] uppercase tracking-wide">
            <AlertTriangle size={14} className="shrink-0 text-amber-400" />
            Institutional Regulatory & Risk Disclosure
          </div>
          <p className="leading-relaxed text-slate-300 text-[11px]">
            Profit Point is an independent financial education and market research platform. Trading Foreign Exchange (Forex) and Contracts for Difference (CFDs) on margin carries a high level of risk and may not be suitable for all investors. Before deciding to trade, you should carefully consider your objectives, financial situation, and level of experience. Profit Point does not guarantee profits or provide automated financial management.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="pt-6 border-t border-[#1E3A57] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <div>
            © {new Date().getFullYear()} Profit Point. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Profit Point helps people understand the market.</span>
            <span>•</span>
            <span className="text-emerald-400">System Status: 100% Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

