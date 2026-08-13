import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { MarketTicker } from '../components/common/MarketTicker';
import { MarketOverviewGrid } from '../components/market/MarketOverviewGrid';
import { MarketHeatmap } from '../components/market/MarketHeatmap';
import { CurrencyStrengthMeter } from '../components/market/CurrencyStrengthMeter';
import { TradingSessionsClock } from '../components/market/TradingSessionsClock';
import { InteractiveChart } from '../components/common/InteractiveChart';
import { contentService } from '../services/contentApi';
import { marketApi } from '../services/marketApi';
import { MarketAnalysis, SignalSetup, EconomicEvent, VideoItem, Course } from '../types';
import { 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Target, 
  Calendar, 
  BookOpen, 
  Play, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles,
  Zap,
  Clock,
  Send,
  Award
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { t, direction } = useTranslation();
  const [featuredAnalyses, setFeaturedAnalyses] = useState<MarketAnalysis[]>([]);
  const [activeSignals, setActiveSignals] = useState<SignalSetup[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<EconomicEvent[]>([]);
  const [featuredVideos, setFeaturedVideos] = useState<VideoItem[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedHeroAsset, setSelectedHeroAsset] = useState<string>('EUR/USD');

  useEffect(() => {
    const loadContent = async () => {
      const allAnalyses = await contentService.getAnalyses();
      setFeaturedAnalyses(allAnalyses.slice(0, 3));

      const allSignals = await contentService.getSignals();
      setActiveSignals(allSignals.filter(s => s.status === 'ACTIVE').slice(0, 2));

      const events = await contentService.getEconomicEvents();
      setUpcomingEvents(events.slice(0, 4));

      const vids = await contentService.getVideos();
      setFeaturedVideos(vids.slice(0, 2));

      const crs = await contentService.getCourses();
      setCourses(crs.slice(0, 3));
    };

    loadContent();
  }, []);

  return (
    <div className="w-full space-y-12 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-6 pb-12 lg:pt-10 lg:pb-16 border-b border-[#1E3A57] bg-gradient-to-b from-[#0B1C2D] via-[#0F2236] to-[#0B1C2D]">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none" 
          style={{
            backgroundImage: `radial-gradient(#2163CC 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Hero Left: Statement & Direct Actions */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2163CC]/15 border border-[#2163CC]/30 text-[#2163CC] text-xs font-mono font-bold">
                <ShieldCheck size={14} className="text-[#2163CC]" />
                <span>PROFIT POINT — FINANCIAL INTELLIGENCE</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                {t('hero.title')}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                Profit Point helps people understand the market. Professional Forex & Gold intelligence, institutional technical levels, and disciplined execution frameworks.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={() => onNavigate('/markets')}
                  className="px-6 py-3.5 rounded-xl bg-[#2163CC] hover:bg-[#1A52AB] active:scale-[0.99] text-white font-bold text-sm shadow-lg shadow-[#2163CC]/25 transition flex items-center gap-2 cursor-pointer"
                >
                  <span>{t('hero.primaryCta')}</span>
                  <ArrowRight size={16} className={direction === 'rtl' ? 'rotate-180' : ''} />
                </button>

                <button
                  onClick={() => onNavigate('/contact')}
                  className="px-5 py-3.5 rounded-xl bg-[#0F2236] hover:bg-[#132A42] text-white border border-[#1E3A57] font-semibold text-sm transition flex items-center gap-2 cursor-pointer"
                >
                  <MessageSquare size={16} className="text-[#2163CC]" />
                  <span>{t('hero.secondaryCta')}</span>
                </button>
              </div>

              {/* Transparency Notice */}
              <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span>{t('hero.disclaimerNote')}</span>
              </div>
            </div>

            {/* Hero Right: Live Interactive Terminal Chart Preview */}
            <div className="lg:col-span-6 space-y-2">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  {['EUR/USD', 'XAU/USD', 'GBP/USD', 'USD/JPY'].map(sym => (
                    <button
                      key={sym}
                      onClick={() => setSelectedHeroAsset(sym)}
                      className={`px-3 py-1 text-xs font-mono rounded-lg transition cursor-pointer ${
                        selectedHeroAsset === sym
                          ? 'bg-[#2163CC] text-white font-bold shadow'
                          : 'bg-[#0F2236] text-slate-300 hover:text-white border border-[#1E3A57]'
                      }`}
                    >
                      {sym}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => onNavigate(`/markets/${selectedHeroAsset.replace('/', '-')}`)}
                  className="text-xs font-mono text-[#2163CC] hover:underline flex items-center gap-1 cursor-pointer font-bold"
                >
                  Full Terminal <ArrowRight size={12} className={direction === 'rtl' ? 'rotate-180' : ''} />
                </button>
              </div>

              <InteractiveChart
                symbol={selectedHeroAsset}
                height={350}
                supportLevel={selectedHeroAsset === 'EUR/USD' ? 1.1640 : 3390.0}
                resistanceLevel={selectedHeroAsset === 'EUR/USD' ? 1.1715 : 3438.0}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE MARKET TICKER */}
      <MarketTicker onSelectSymbol={sym => onNavigate(`/markets/${sym.replace('/', '-')}`)} />

      {/* 3. TODAY'S MARKET OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800/80 pb-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight">
              {t('marketOverview.title')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              {t('marketOverview.subtitle')}
            </p>
          </div>
          <button
            onClick={() => onNavigate('/markets')}
            className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <span>{t('common.viewAll')}</span>
            <ArrowRight size={14} className={direction === 'rtl' ? 'rotate-180' : ''} />
          </button>
        </div>

        <MarketOverviewGrid
          featuredOnly={true}
          onSelectAsset={id => onNavigate(`/markets/${id}`)}
        />
      </section>

      {/* 4. MARKET HEATMAP & CURRENCY STRENGTH (SIDE BY SIDE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <MarketHeatmap />
          </div>
          <div className="lg:col-span-5">
            <CurrencyStrengthMeter />
          </div>
        </div>
      </section>

      {/* 5. GLOBAL TRADING SESSIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TradingSessionsClock />
      </section>

      {/* 6. FEATURED TRADER ANALYSIS & ACTIVE SETUPS (2-COLUMNS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Latest Analysis */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-lg flex items-center gap-2">
                  <TrendingUp size={18} className="text-blue-400" />
                  {t('analysis.title')}
                </h3>
                <p className="text-xs text-slate-400">{t('analysis.subtitle')}</p>
              </div>
              <button
                onClick={() => onNavigate('/market-analysis')}
                className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
              >
                <span>{t('common.viewAll')}</span>
                <ArrowRight size={14} className={direction === 'rtl' ? 'rotate-180' : ''} />
              </button>
            </div>

            <div className="space-y-4">
              {featuredAnalyses.map(analysis => (
                <div
                  key={analysis.id}
                  onClick={() => onNavigate(`/market-analysis/${analysis.slug}`)}
                  className="group bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-5 transition-all shadow-lg cursor-pointer space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20">
                        {analysis.symbol}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-md font-bold ${
                          analysis.bias === 'BULLISH'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : analysis.bias === 'BEARISH'
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {analysis.bias} ({analysis.timeframe})
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">{analysis.publishedAt}</span>
                  </div>

                  <h4 className="font-bold text-slate-100 text-base group-hover:text-blue-400 transition leading-snug">
                    {analysis.title}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {analysis.subtitle}
                  </p>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-3">
                      <span>Sup: <strong className="text-emerald-400">{analysis.keyLevels.support1}</strong></span>
                      <span>Res: <strong className="text-rose-400">{analysis.keyLevels.resistance1}</strong></span>
                    </div>
                    <span className="text-blue-400 font-semibold group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform flex items-center gap-1">
                      {t('analysis.readAnalysis')} <ArrowRight size={13} className={direction === 'rtl' ? 'rotate-180' : ''} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Active Market Setups */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-lg flex items-center gap-2">
                  <Target size={18} className="text-amber-400" />
                  {t('signals.activeSetups')}
                </h3>
                <p className="text-xs text-slate-400">{t('signals.subtitle')}</p>
              </div>
              <button
                onClick={() => onNavigate('/signals')}
                className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
              >
                <span>{t('common.viewAll')}</span>
                <ArrowRight size={14} className={direction === 'rtl' ? 'rotate-180' : ''} />
              </button>
            </div>

            <div className="space-y-4">
              {activeSignals.map(sig => (
                <div
                  key={sig.id}
                  onClick={() => onNavigate('/signals')}
                  className="bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 transition-all shadow-lg cursor-pointer space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-100 text-base">{sig.symbol}</span>
                      <span
                        className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md ${
                          sig.type === 'BUY'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        }`}
                      >
                        {sig.type}
                      </span>
                    </div>

                    <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                      <Zap size={12} className="animate-pulse" /> ACTIVE
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-xs font-mono">
                    <div>
                      <div className="text-slate-500 text-[10px]">Entry Zone</div>
                      <div className="font-bold text-slate-200">{sig.entryZone.join(' - ')}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-[10px]">Target 1</div>
                      <div className="font-bold text-emerald-400">{sig.target1}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-[10px]">Invalidation (SL)</div>
                      <div className="font-bold text-rose-400">{sig.stopLoss}</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {sig.reasoning}
                  </p>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Confidence: <strong>{sig.confidenceScore}%</strong></span>
                    <span>R:R <strong>{sig.riskRewardRatio}</strong></span>
                  </div>
                </div>
              ))}

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
                <ShieldCheck size={16} className="text-blue-400 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  {t('signals.notice')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. UPCOMING ECONOMIC CALENDAR SNAPSHOT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="font-bold text-slate-100 text-lg flex items-center gap-2">
              <Calendar size={18} className="text-blue-400" />
              {t('calendar.title')}
            </h3>
            <p className="text-xs text-slate-400">{t('calendar.subtitle')}</p>
          </div>
          <button
            onClick={() => onNavigate('/economic-calendar')}
            className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
          >
            <span>{t('common.viewAll')}</span>
            <ArrowRight size={14} className={direction === 'rtl' ? 'rotate-180' : ''} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {upcomingEvents.map(event => {
            const isHigh = event.impact === 'HIGH';
            return (
              <div
                key={event.id}
                onClick={() => onNavigate('/economic-calendar')}
                className="p-4 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition cursor-pointer flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="font-bold text-slate-200 bg-slate-800 px-2 py-0.5 rounded-md">
                      {event.currency}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                        isHigh
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      {event.impact}
                    </span>
                  </div>
                  <h5 className="font-semibold text-slate-200 text-sm line-clamp-2">
                    {event.event}
                  </h5>
                </div>

                <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span>{event.time}</span>
                  <span>Fcst: <strong className="text-slate-300">{event.forecast}</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. FOREX ACADEMY & VIDEO CENTER TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Academy Left */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#1E3A57] pb-3">
              <div>
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                  <BookOpen size={18} className="text-[#2163CC]" />
                  {t('academy.title')}
                </h3>
                <p className="text-xs text-slate-400">{t('academy.subtitle')}</p>
              </div>
              <button
                onClick={() => onNavigate('/education')}
                className="text-xs font-mono text-[#2163CC] hover:underline flex items-center gap-1 cursor-pointer font-bold"
              >
                <span>{t('common.viewAll')}</span>
                <ArrowRight size={14} className={direction === 'rtl' ? 'rotate-180' : ''} />
              </button>
            </div>

            <div className="space-y-3">
              {courses.map(crs => (
                <div
                  key={crs.id}
                  onClick={() => onNavigate(`/education/${crs.id}`)}
                  className="p-4 rounded-xl bg-[#0F2236] hover:bg-[#132A42] border border-[#1E3A57] hover:border-[#2163CC]/50 transition cursor-pointer flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="text-[11px] font-mono font-bold text-[#2163CC] uppercase">
                      {crs.level} Level
                    </div>
                    <h5 className="font-bold text-white text-sm">
                      {crs.title}
                    </h5>
                    <p className="text-xs text-slate-300 line-clamp-1">{crs.description}</p>
                  </div>
                  <div className="text-end shrink-0 text-xs font-mono text-slate-400">
                    <div>{crs.lessonsCount} lessons</div>
                    <div className="text-slate-400">{crs.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Video Center Right */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-lg flex items-center gap-2">
                  <Play size={18} className="text-rose-400" />
                  {t('videos.title')}
                </h3>
                <p className="text-xs text-slate-400">{t('videos.subtitle')}</p>
              </div>
              <button
                onClick={() => onNavigate('/videos')}
                className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
              >
                <span>{t('common.viewAll')}</span>
                <ArrowRight size={14} className={direction === 'rtl' ? 'rotate-180' : ''} />
              </button>
            </div>

            <div className="space-y-3">
              {featuredVideos.map(vid => (
                <div
                  key={vid.id}
                  onClick={() => onNavigate('/videos')}
                  className="p-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-rose-500/40 transition cursor-pointer flex items-center gap-4"
                >
                  <div className="relative w-28 h-18 rounded-lg overflow-hidden shrink-0 bg-slate-950">
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow">
                        <Play size={12} className="ms-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-1 end-1 px-1 py-0.2 rounded bg-black/80 text-[10px] font-mono text-white">
                      {vid.duration}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="text-[10px] font-mono text-rose-400 font-bold uppercase">
                      {vid.category}
                    </span>
                    <h5 className="font-semibold text-slate-100 text-sm line-clamp-2 leading-snug">
                      {vid.title}
                    </h5>
                    <div className="text-[11px] font-mono text-slate-500">
                      {vid.publishedAt} • {vid.views.toLocaleString()} views
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. ABOUT TRADER & CORE METHODOLOGY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F2236] border border-[#1E3A57] rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-start space-y-4">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                  alt="Karam Al-Rawi"
                  className="w-36 h-36 rounded-2xl object-cover ring-2 ring-[#2163CC] shadow-xl"
                />
                <span className="absolute -bottom-2 -end-2 px-2 py-0.5 rounded-md bg-[#2163CC] text-[10px] font-mono font-bold text-white shadow">
                  CMT Level III
                </span>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-white">Karam Al-Rawi</h3>
                <p className="text-xs font-mono text-[#2163CC] font-bold mt-0.5">Head Analyst & Founder, Profit Point</p>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed max-w-xs">
                  12+ years of institutional flow & Gold analysis. Dedicated to discipline, mathematics, and transparency.
                </p>
              </div>

              <button
                onClick={() => onNavigate('/about')}
                className="px-4 py-2 rounded-xl bg-[#0B1C2D] hover:bg-[#132A42] text-slate-200 text-xs font-mono font-medium border border-[#1E3A57] transition flex items-center gap-2 cursor-pointer"
              >
                <span>Read Full Philosophy</span>
                <ArrowRight size={14} className={direction === 'rtl' ? 'rotate-180' : ''} />
              </button>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#0B1C2D] border border-[#1E3A57] space-y-1.5">
                <div className="font-mono text-xs font-bold text-[#2163CC] flex items-center gap-1.5">
                  <ShieldCheck size={15} /> Capital Preservation First
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Defending downside is paramount. Profit is a byproduct of non-negotiable risk-reward discipline.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B1C2D] border border-[#1E3A57] space-y-1.5">
                <div className="font-mono text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <TrendingUp size={15} /> Macro Context Rules
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Technical levels only produce edge when synchronized with central bank rate paths and liquidity flows.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B1C2D] border border-[#1E3A57] space-y-1.5">
                <div className="font-mono text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Target size={15} /> Fixed Invalidation
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every setup is a probabilistic hypothesis. When invalidated, cut quickly with zero emotional attachment.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B1C2D] border border-[#1E3A57] space-y-1.5">
                <div className="font-mono text-xs font-bold text-[#2163CC] flex items-center gap-1.5">
                  <Award size={15} /> Peak Session Focus
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Execute exclusively during London and New York overlaps to avoid low-liquidity whipsaws.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
