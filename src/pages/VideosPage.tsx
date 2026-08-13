import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { VideoItem } from '../types';
import { contentService } from '../services/contentApi';
import { 
  Play, 
  Search, 
  Clock, 
  Calendar, 
  Eye, 
  Radio, 
  X, 
  TrendingUp, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface VideosPageProps {
  onNavigate: (path: string) => void;
}

export const VideosPage: React.FC<VideosPageProps> = ({ onNavigate }) => {
  const { t, direction } = useTranslation();
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePlayingVideo, setActivePlayingVideo] = useState<VideoItem | null>(null);

  useEffect(() => {
    const load = async () => {
      const all = await contentService.getVideos();
      setVideos(all);
    };
    load();
  }, []);

  const categories = ['ALL', 'Market Analysis', 'Education', 'Forex', 'Gold', 'Trading Psychology', 'Weekly Outlook'];

  const filtered = videos.filter(v => {
    const matchesCat = selectedCategory === 'ALL' || v.category === selectedCategory;
    const matchesQuery = v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono mb-2">
            <Play size={14} className="fill-current" /> Video Briefings & Webinars
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            {t('videos.title')}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Weekly market outlooks, live execution breakdowns, and deep technical structure analysis.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search video analyses..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-rose-500"
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
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(vid => (
          <div
            key={vid.id}
            onClick={() => setActivePlayingVideo(vid)}
            className="group bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-rose-500/40 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Thumbnail with Overlay */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play size={20} className="ml-1 fill-current" />
                  </div>
                </div>

                <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-xs text-[11px] font-mono text-white">
                  {vid.duration}
                </span>

                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-xs text-rose-400 font-mono text-xs font-bold border border-slate-800">
                  {vid.category}
                </span>
              </div>

              {/* Text info */}
              <div className="p-5 space-y-2.5">
                <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {vid.publishedAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={12} /> {vid.views.toLocaleString()} views
                  </span>
                </div>

                <h3 className="font-bold text-slate-100 text-base group-hover:text-rose-400 transition leading-snug line-clamp-2">
                  {vid.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {vid.description}
                </p>
              </div>
            </div>

            <div className="px-5 py-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-rose-400">
              <span>Watch Breakdown</span>
              <ArrowRight size={13} className={direction === 'rtl' ? 'rotate-180' : ''} />
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {activePlayingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            {/* Top Bar */}
            <div className="p-4 bg-slate-950 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
                  {activePlayingVideo.category}
                </span>
                <span>{activePlayingVideo.title}</span>
              </div>
              <button
                onClick={() => setActivePlayingVideo(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            {/* Video Canvas */}
            <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activePlayingVideo.youtubeId || 'dQw4w9WgXcQ'}?autoplay=1`}
                title={activePlayingVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Notes */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
                <span>Strategist: <strong className="text-slate-200">{activePlayingVideo.author}</strong></span>
                <span>Published: {activePlayingVideo.publishedAt}</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {activePlayingVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
