import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { initialAssets, initialAnalyses, initialSignals, initialNewsArticles, initialVideos, initialCourses } from '../../data/mockData';
import { Search, X, TrendingUp, FileText, Video, BookOpen, Target, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchedAssets = initialAssets.filter(
    a => a.symbol.toLowerCase().includes(q) || a.name.toLowerCase().includes(q)
  );
  const matchedAnalyses = initialAnalyses.filter(
    a => a.title.toLowerCase().includes(q) || a.symbol.toLowerCase().includes(q) || a.tags.some(tag => tag.toLowerCase().includes(q))
  );
  const matchedSignals = initialSignals.filter(
    s => s.symbol.toLowerCase().includes(q) || s.reasoning.toLowerCase().includes(q)
  );
  const matchedNews = initialNewsArticles.filter(
    n => n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q)
  );
  const matchedVideos = initialVideos.filter(
    v => v.title.toLowerCase().includes(q) || v.category.toLowerCase().includes(q)
  );
  const matchedCourses = initialCourses.filter(
    c => c.title.toLowerCase().includes(q) || c.level.toLowerCase().includes(q)
  );

  const hasResults =
    matchedAssets.length > 0 ||
    matchedAnalyses.length > 0 ||
    matchedSignals.length > 0 ||
    matchedNews.length > 0 ||
    matchedVideos.length > 0 ||
    matchedCourses.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800 bg-slate-950/60">
          <Search size={20} className="text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t('common.searchPlaceholder')}
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-base focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-500 hover:text-slate-300 p-1 rounded-md"
            >
              <X size={16} />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-mono bg-slate-800 text-slate-400 hover:text-slate-200 px-2 py-1 rounded-md border border-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-4 space-y-6 flex-1 divide-y divide-slate-800/60">
          {!query && (
            <div className="py-8 text-center text-slate-500 text-sm">
              <p>Type an asset symbol (e.g. <strong className="text-slate-300">EUR/USD</strong>, <strong className="text-amber-300">XAU/USD</strong>) or search analyses, setups, news & masterclasses.</p>
            </div>
          )}

          {query && !hasResults && (
            <div className="py-10 text-center text-slate-400 text-sm">
              <p>No results matching "<span className="text-slate-200">{query}</span>"</p>
            </div>
          )}

          {/* Matched Assets */}
          {matchedAssets.length > 0 && (
            <div className="pt-2 first:pt-0">
              <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <TrendingUp size={14} /> Market Assets ({matchedAssets.length})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchedAssets.map(asset => (
                  <button
                    key={asset.id}
                    onClick={() => {
                      onNavigate(`/markets/${asset.id}`);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/50 hover:bg-slate-800/80 border border-slate-800/80 transition text-left"
                  >
                    <div>
                      <div className="font-mono font-bold text-slate-100 text-sm">{asset.symbol}</div>
                      <div className="text-xs text-slate-400">{asset.name}</div>
                    </div>
                    <ArrowRight size={14} className="text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Analyses */}
          {matchedAnalyses.length > 0 && (
            <div className="pt-4">
              <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText size={14} /> Trader Analyses ({matchedAnalyses.length})
              </div>
              <div className="space-y-2">
                {matchedAnalyses.map(analysis => (
                  <button
                    key={analysis.id}
                    onClick={() => {
                      onNavigate(`/market-analysis/${analysis.slug}`);
                      onClose();
                    }}
                    className="w-full flex items-start justify-between p-2.5 rounded-lg bg-slate-950/50 hover:bg-slate-800/80 border border-slate-800/80 transition text-left"
                  >
                    <div>
                      <div className="text-xs font-mono font-semibold text-blue-400 mb-0.5">{analysis.symbol} • {analysis.bias}</div>
                      <div className="font-medium text-slate-200 text-sm line-clamp-1">{analysis.title}</div>
                    </div>
                    <ArrowRight size={14} className="text-slate-500 shrink-0 mt-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Signals */}
          {matchedSignals.length > 0 && (
            <div className="pt-4">
              <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Target size={14} /> Market Setups ({matchedSignals.length})
              </div>
              <div className="space-y-2">
                {matchedSignals.map(signal => (
                  <button
                    key={signal.id}
                    onClick={() => {
                      onNavigate('/signals');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-950/50 hover:bg-slate-800/80 border border-slate-800/80 transition text-left"
                  >
                    <div>
                      <div className="font-mono font-bold text-slate-200 text-sm">
                        {signal.symbol} <span className={signal.type === 'BUY' ? 'text-emerald-400' : 'text-rose-400'}>[{signal.type}]</span>
                      </div>
                      <div className="text-xs text-slate-400 line-clamp-1">{signal.reasoning}</div>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                      {signal.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Academy Courses */}
          {matchedCourses.length > 0 && (
            <div className="pt-4">
              <div className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen size={14} /> Academy Lessons ({matchedCourses.length})
              </div>
              <div className="space-y-2">
                {matchedCourses.map(course => (
                  <button
                    key={course.id}
                    onClick={() => {
                      onNavigate(`/education/${course.id}`);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-950/50 hover:bg-slate-800/80 border border-slate-800/80 transition text-left"
                  >
                    <div>
                      <div className="font-semibold text-slate-200 text-sm">{course.title}</div>
                      <div className="text-xs text-slate-400">{course.level} Level • {course.lessonsCount} lessons</div>
                    </div>
                    <ArrowRight size={14} className="text-slate-500 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
