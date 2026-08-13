import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { MarketAnalysis, SignalSetup } from '../types';
import { contentService } from '../services/contentApi';
import { userService } from '../services/userApi';
import { 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Target, 
  CheckCircle2, 
  TrendingUp, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

interface AnalysisDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const AnalysisDetailPage: React.FC<AnalysisDetailPageProps> = ({ slug, onNavigate }) => {
  const { t, direction } = useTranslation();
  const [analysis, setAnalysis] = useState<MarketAnalysis | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [relatedList, setRelatedList] = useState<MarketAnalysis[]>([]);

  useEffect(() => {
    const load = async () => {
      const item = await contentService.getAnalysisBySlug(slug);
      if (item) {
        setAnalysis(item);
        const saved = await userService.getSavedAnalyses();
        setIsSaved(saved.includes(item.id));

        const all = await contentService.getAnalyses();
        setRelatedList(all.filter(a => a.id !== item.id).slice(0, 2));
      }
    };
    load();
  }, [slug]);

  if (!analysis) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center text-slate-400">
        <p className="font-mono">Loading analysis briefing...</p>
      </div>
    );
  }

  const handleToggleSave = async () => {
    const added = await userService.toggleSaveAnalysis(analysis.id);
    setIsSaved(added);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isBullish = analysis.bias === 'BULLISH';
  const isBearish = analysis.bias === 'BEARISH';

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Back and Toolbar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <button
          onClick={() => onNavigate('/market-analysis')}
          className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 transition cursor-pointer"
        >
          <ArrowLeft size={14} className={direction === 'rtl' ? 'rotate-180' : ''} />
          <span>All Analyses</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 transition cursor-pointer"
          >
            <Share2 size={13} />
            <span>{copied ? 'Link Copied!' : 'Share'}</span>
          </button>
          <button
            onClick={handleToggleSave}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition cursor-pointer ${
              isSaved
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Bookmark size={13} fill={isSaved ? 'currentColor' : 'none'} />
            <span>{isSaved ? 'Saved' : 'Save Analysis'}</span>
          </button>
        </div>
      </div>

      {/* Article Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20">
            {analysis.symbol}
          </span>
          <span
            className={`px-2.5 py-1 rounded-md font-bold ${
              isBullish
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : isBearish
                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                : 'bg-slate-800 text-slate-300'
            }`}
          >
            {analysis.bias} BIAS ({analysis.timeframe})
          </span>
          <span className="text-slate-500">•</span>
          <span className="flex items-center gap-1 text-slate-400">
            <Calendar size={13} /> {analysis.publishedAt}
          </span>
          <span className="text-slate-500">•</span>
          <span className="flex items-center gap-1 text-slate-400">
            <Clock size={13} /> {analysis.readTime}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight">
          {analysis.title}
        </h1>

        <p className="text-base text-slate-300 leading-relaxed font-normal">
          {analysis.subtitle}
        </p>

        {/* Author Byline */}
        <div className="flex items-center gap-3 pt-2">
          <img
            src={analysis.author.avatar}
            alt={analysis.author.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/30"
          />
          <div>
            <div className="font-bold text-slate-100 text-sm">{analysis.author.name}</div>
            <div className="text-xs text-slate-400">{analysis.author.role}</div>
          </div>
        </div>
      </header>

      {/* High-Resolution Chart Image */}
      <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
        <img
          src={analysis.chartImage}
          alt={analysis.title}
          className="w-full object-cover max-h-[500px]"
        />
        <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
          <span>Figure 1: {analysis.symbol} Multi-Timeframe Structural Blueprint</span>
          <span>Timeframe: {analysis.timeframe}</span>
        </div>
      </div>

      {/* Key Institutional Levels Grid */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
        <h3 className="font-mono font-bold text-sm text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Target size={16} className="text-blue-400" />
          Technical Parameters & S/R Map
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-slate-500 text-[10px]">Primary Support (S1)</div>
            <div className="text-emerald-400 font-bold text-base mt-0.5">{analysis.keyLevels.support1}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-slate-500 text-[10px]">Secondary Support (S2)</div>
            <div className="text-emerald-300 font-bold text-base mt-0.5">{analysis.keyLevels.support2}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-slate-500 text-[10px]">Primary Resistance (R1)</div>
            <div className="text-rose-400 font-bold text-base mt-0.5">{analysis.keyLevels.resistance1}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-slate-500 text-[10px]">Secondary Resistance (R2)</div>
            <div className="text-rose-300 font-bold text-base mt-0.5">{analysis.keyLevels.resistance2}</div>
          </div>
        </div>

        {analysis.keyLevels.invalidation && (
          <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs font-mono flex items-center justify-between text-rose-300">
            <span className="flex items-center gap-1.5 font-bold">
              <AlertTriangle size={14} /> Structural Invalidation:
            </span>
            <span className="font-extrabold text-sm">{analysis.keyLevels.invalidation}</span>
          </div>
        )}
      </div>

      {/* Main Analysis Body Text */}
      <div className="space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
        {analysis.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-xl font-bold text-slate-100 font-mono pt-4 border-t border-slate-800/80">
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          if (paragraph.startsWith('- ')) {
            return (
              <ul key={idx} className="space-y-2 pl-4 list-disc marker:text-blue-400">
                {paragraph.split('\n').map((item, i) => (
                  <li key={i}>{item.replace('- ', '')}</li>
                ))}
              </ul>
            );
          }
          return <p key={idx}>{paragraph}</p>;
        })}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800">
        <span className="text-xs font-mono text-slate-500">TAGS:</span>
        {analysis.tags.map(tag => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Author Bio Box */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center gap-4">
          <img
            src={analysis.author.avatar}
            alt={analysis.author.name}
            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-500/40"
          />
          <div>
            <div className="font-bold text-slate-100 text-base">{analysis.author.name}</div>
            <div className="text-xs font-mono text-blue-400">{analysis.author.role}</div>
            <p className="text-xs text-slate-400 mt-1">Specialized in institutional multi-timeframe analysis and precious metals structure.</p>
          </div>
        </div>
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">Questions on this analysis?</span>
          <button
            onClick={() => onNavigate('/contact')}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-mono text-white font-semibold transition"
          >
            Contact Strategist
          </button>
        </div>
      </div>

      {/* Related Analyses */}
      {relatedList.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-slate-800">
          <h3 className="font-bold text-slate-100 font-mono text-lg">Related Market Briefings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedList.map(rel => (
              <div
                key={rel.id}
                onClick={() => onNavigate(`/market-analysis/${rel.slug}`)}
                className="p-4 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-blue-500/40 transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono text-blue-400">{rel.symbol} • {rel.bias}</span>
                  <h4 className="font-bold text-slate-100 text-sm mt-1 line-clamp-2">{rel.title}</h4>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span>{rel.publishedAt}</span>
                  <span className="text-blue-400 flex items-center gap-1">Read <ArrowRight size={11} /></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};
