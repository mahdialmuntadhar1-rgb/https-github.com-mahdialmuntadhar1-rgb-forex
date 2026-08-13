import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { NewsArticle } from '../types';
import { contentService } from '../services/contentApi';
import { ArrowLeft, Calendar, Clock, Share2, Radio, ArrowRight, ExternalLink } from 'lucide-react';

interface NewsDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const NewsDetailPage: React.FC<NewsDetailPageProps> = ({ slug, onNavigate }) => {
  const { t, direction } = useTranslation();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [copied, setCopied] = useState(false);
  const [recentNews, setRecentNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const load = async () => {
      const all = await contentService.getNewsArticles();
      const current = all.find(n => n.slug === slug || n.id === slug);
      if (current) {
        setArticle(current);
        setRecentNews(all.filter(n => n.id !== current.id).slice(0, 3));
      }
    };
    load();
  }, [slug]);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center text-slate-400">
        <p className="font-mono">Loading dispatch wire...</p>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Back and Toolbar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <button
          onClick={() => onNavigate('/news')}
          className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 transition cursor-pointer"
        >
          <ArrowLeft size={14} className={direction === 'rtl' ? 'rotate-180' : ''} />
          <span>All News Dispatches</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 transition cursor-pointer"
        >
          <Share2 size={13} />
          <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
        </button>
      </div>

      {/* Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20">
            {article.category}
          </span>
          <span className="text-slate-500">•</span>
          <span className="flex items-center gap-1 text-slate-400">
            <Calendar size={13} /> {article.publishedAt}
          </span>
          <span className="text-slate-500">•</span>
          <span className="flex items-center gap-1 text-slate-400">
            <Clock size={13} /> {article.readTime}
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">{article.source}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
          {article.summary}
        </p>
      </header>

      {/* Article Image */}
      <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl max-h-[460px]">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Related Symbols Banner */}
      {article.relatedSymbols && article.relatedSymbols.length > 0 && (
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
          <span className="text-slate-400">Related Symbols:</span>
          <div className="flex items-center gap-2">
            {article.relatedSymbols.map(sym => (
              <button
                key={sym}
                onClick={() => onNavigate(`/markets/${sym.replace('/', '-')}`)}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-blue-400 font-bold border border-slate-700 transition"
              >
                {sym}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Body Content */}
      <div className="space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
        {article.content ? (
          article.content.split('\n\n').map((para, i) => <p key={i}>{para}</p>)
        ) : (
          <p>{article.summary}</p>
        )}
      </div>

      {/* Recent Dispatches */}
      {recentNews.length > 0 && (
        <div className="space-y-4 pt-8 border-t border-slate-800">
          <h3 className="font-bold text-slate-100 font-mono text-lg flex items-center gap-2">
            <Radio size={18} className="text-blue-400" /> Recent Market Dispatches
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recentNews.map(item => (
              <div
                key={item.id}
                onClick={() => onNavigate(`/news/${item.slug}`)}
                className="p-4 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-blue-500/40 transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-blue-400 uppercase">{item.category}</span>
                  <h4 className="font-bold text-slate-100 text-xs mt-1 line-clamp-2">{item.title}</h4>
                </div>
                <div className="pt-2 mt-2 border-t border-slate-800/60 text-[10px] font-mono text-slate-500 flex justify-between">
                  <span>{item.publishedAt}</span>
                  <span className="text-blue-400">Read &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};
