import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { NewsArticle } from '../types';
import { contentService } from '../services/contentApi';
import { Search, Calendar, ArrowRight, Radio, ExternalLink } from 'lucide-react';

interface NewsPageProps {
  onNavigate: (path: string) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onNavigate }) => {
  const { t, direction } = useTranslation();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  useEffect(() => {
    const load = async () => {
      const list = await contentService.getNewsArticles();
      setNews(list);
    };
    load();
  }, []);

  const categories = ['ALL', 'Central Banks', 'Macroeconomics', 'Forex', 'Gold'];

  const filtered = news.filter(n => {
    const matchesCat = selectedCategory === 'ALL' || n.category === selectedCategory;
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-2">
            <Radio size={14} className="animate-pulse" /> Live Financial Wire
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            {t('news.title')}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Global central bank policy updates, economic releases, and interbank FX flow intelligence.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search news wire..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(article => (
          <div
            key={article.id}
            onClick={() => onNavigate(`/news/${article.slug}`)}
            className="group bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-blue-500/40 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-xs text-blue-400 font-mono text-xs font-bold border border-slate-800">
                  {article.category}
                </span>
              </div>

              <div className="p-5 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                  <Calendar size={12} />
                  <span>{article.publishedAt}</span>
                  <span>•</span>
                  <span>{article.source}</span>
                </div>

                <h3 className="font-bold text-slate-100 text-base group-hover:text-blue-400 transition leading-snug line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </div>
            </div>

            <div className="px-5 py-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-blue-400">
              <span className="group-hover:underline">Read Full Dispatch</span>
              <ArrowRight size={13} className={direction === 'rtl' ? 'rotate-180' : ''} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
