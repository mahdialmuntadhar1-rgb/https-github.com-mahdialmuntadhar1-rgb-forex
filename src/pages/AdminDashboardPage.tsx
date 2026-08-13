import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { contentService } from '../services/contentApi';
import { userService } from '../services/userApi';
import { MarketAnalysis, SignalSetup, LeadInquiry } from '../types';
import { 
  ShieldCheck, 
  TrendingUp, 
  Target, 
  Users, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Edit3, 
  FileText, 
  Radio,
  Settings,
  Sparkles,
  Zap,
  Clock,
  Eye
} from 'lucide-react';

interface AdminDashboardPageProps {
  onNavigate: (path: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  const { t, direction } = useTranslation();
  const [activeTab, setActiveTab] = useState<'overview' | 'analyses' | 'signals' | 'leads' | 'settings'>('overview');

  const [analyses, setAnalyses] = useState<MarketAnalysis[]>([]);
  const [signals, setSignals] = useState<SignalSetup[]>([]);
  const [leads, setLeads] = useState<LeadInquiry[]>([]);

  // New Analysis Form State
  const [newAnalysisModal, setNewAnalysisModal] = useState(false);
  const [analysisForm, setAnalysisForm] = useState({
    title: '',
    symbol: 'EUR/USD',
    bias: 'BULLISH' as 'BULLISH' | 'BEARISH' | 'NEUTRAL',
    timeframe: '4H',
    subtitle: '',
    support1: 1.0800,
    resistance1: 1.0950,
    content: ''
  });

  // New Signal Form State
  const [newSignalModal, setNewSignalModal] = useState(false);
  const [signalForm, setSignalForm] = useState({
    symbol: 'XAU/USD',
    type: 'BUY' as 'BUY' | 'SELL',
    timeframe: '1H',
    entryMin: 2380.0,
    entryMax: 2385.0,
    target1: 2410.0,
    target2: 2435.0,
    stopLoss: 2365.0,
    reasoning: '',
    riskRewardRatio: '1:2.8'
  });

  useEffect(() => {
    const load = async () => {
      const an = await contentService.getAnalyses();
      setAnalyses(an);

      const sig = await contentService.getSignals();
      setSignals(sig);

      const ld = await userService.getLeads();
      setLeads(ld);
    };
    load();
  }, []);

  const handleCreateAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    const created = await contentService.createAnalysis({
      title: analysisForm.title,
      slug: analysisForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      symbol: analysisForm.symbol,
      bias: analysisForm.bias,
      timeframe: analysisForm.timeframe,
      subtitle: analysisForm.subtitle,
      author: 'Karam Al-Rawi',
      authorTitle: 'Senior Strategist',
      publishedAt: new Date().toISOString().split('T')[0],
      readTime: '4 min',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
      keyLevels: {
        support1: analysisForm.support1,
        support2: analysisForm.support1 - 0.0050,
        resistance1: analysisForm.resistance1,
        resistance2: analysisForm.resistance1 + 0.0050
      },
      content: analysisForm.content || 'Comprehensive multi-timeframe structural analysis.',
      status: 'PUBLISHED',
      views: 1,
      likes: 0
    });

    setAnalyses([created, ...analyses]);
    setNewAnalysisModal(false);
  };

  const handleCreateSignal = async (e: React.FormEvent) => {
    e.preventDefault();
    const created = await contentService.createSignal({
      symbol: signalForm.symbol,
      type: signalForm.type,
      timeframe: signalForm.timeframe,
      entryZone: [signalForm.entryMin, signalForm.entryMax],
      target1: signalForm.target1,
      target2: signalForm.target2,
      stopLoss: signalForm.stopLoss,
      riskRewardRatio: signalForm.riskRewardRatio,
      confidenceScore: 88,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      reasoning: signalForm.reasoning
    });

    setSignals([created, ...signals]);
    setNewSignalModal(false);
  };

  const handleUpdateSignalStatus = async (sigId: string, newStatus: any, pips?: number) => {
    await contentService.updateSignalStatus(sigId, newStatus, pips);
    setSignals(prev => prev.map(s => s.id === sigId ? { ...s, status: newStatus, resultPips: pips } : s));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Header */}
      <div className="bg-[#0F2236] border border-[#1E3A57] rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2163CC]/15 border border-[#2163CC]/30 text-[#2163CC] text-xs font-mono font-bold mb-2">
            <ShieldCheck size={14} /> Profit Point Control CMS
          </div>
          <h1 className="text-2xl font-extrabold text-white font-mono">
            Trader Desk & Publishing Backoffice
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish research, broadcast trade setups, and manage incoming institutional inquiries.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition cursor-pointer ${
              activeTab === 'overview' ? 'bg-[#2163CC] text-white shadow-md' : 'bg-[#0B1C2D] text-slate-300 hover:text-white border border-[#1E3A57]'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('analyses')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition cursor-pointer ${
              activeTab === 'analyses' ? 'bg-[#2163CC] text-white shadow-md' : 'bg-[#0B1C2D] text-slate-300 hover:text-white border border-[#1E3A57]'
            }`}
          >
            Analyses ({analyses.length})
          </button>
          <button
            onClick={() => setActiveTab('signals')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition cursor-pointer ${
              activeTab === 'signals' ? 'bg-[#2163CC] text-white shadow-md' : 'bg-[#0B1C2D] text-slate-300 hover:text-white border border-[#1E3A57]'
            }`}
          >
            Signals ({signals.length})
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition cursor-pointer ${
              activeTab === 'leads' ? 'bg-[#2163CC] text-white shadow-md' : 'bg-[#0B1C2D] text-slate-300 hover:text-white border border-[#1E3A57]'
            }`}
          >
            Leads ({leads.length})
          </button>
        </div>
      </div>

      {/* 1. OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="text-slate-500 text-xs font-mono uppercase">Total Analyses</div>
              <div className="text-3xl font-extrabold text-blue-400 font-mono">{analyses.length}</div>
              <div className="text-[11px] text-slate-400">Published across 3 languages</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="text-slate-500 text-xs font-mono uppercase">Active Signals</div>
              <div className="text-3xl font-extrabold text-amber-400 font-mono">
                {signals.filter(s => s.status === 'ACTIVE').length}
              </div>
              <div className="text-[11px] text-slate-400">Live interbank setups</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="text-slate-500 text-xs font-mono uppercase">Total Leads Captured</div>
              <div className="text-3xl font-extrabold text-emerald-400 font-mono">{leads.length}</div>
              <div className="text-[11px] text-slate-400">Mentorship & VIP applicants</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="text-slate-500 text-xs font-mono uppercase">VIP Signals Win Rate</div>
              <div className="text-3xl font-extrabold text-[#2163CC] font-mono">78.4%</div>
              <div className="text-[11px] text-slate-400">Avg R:R 1:2.4 over 120 setups</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-100 font-mono text-sm">Recent Analyses</h3>
                <button
                  onClick={() => setNewAnalysisModal(true)}
                  className="px-3 py-1 rounded-lg bg-blue-600 text-white font-mono text-xs flex items-center gap-1"
                >
                  <Plus size={12} /> New Analysis
                </button>
              </div>
              <div className="space-y-2">
                {analyses.slice(0, 4).map(a => (
                  <div key={a.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-mono font-bold text-blue-400">{a.symbol}</span> - {a.title}
                    </div>
                    <span className="font-mono text-slate-500">{a.publishedAt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-100 font-mono text-sm">Recent Inquiries</h3>
                <button
                  onClick={() => setActiveTab('leads')}
                  className="text-xs font-mono text-blue-400"
                >
                  View All &rarr;
                </button>
              </div>
              <div className="space-y-2">
                {leads.slice(0, 4).map(l => (
                  <div key={l.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-200">{l.name}</span> ({l.serviceInterest})
                    </div>
                    <span className="font-mono text-emerald-400">{l.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ANALYSES MANAGEMENT */}
      {activeTab === 'analyses' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-100 font-mono text-base">Published Market Analyses</h3>
            <button
              onClick={() => setNewAnalysisModal(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Plus size={14} /> Publish New Analysis
            </button>
          </div>

          <div className="space-y-3">
            {analyses.map(a => (
              <div
                key={a.id}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="font-bold text-blue-400 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">{a.symbol}</span>
                    <span className="text-slate-400">{a.bias} ({a.timeframe})</span>
                    <span className="text-slate-500">• {a.publishedAt}</span>
                  </div>
                  <h4 className="font-bold text-slate-100 text-base">{a.title}</h4>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onNavigate(`/market-analysis/${a.slug}`)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1"
                  >
                    <Eye size={13} /> View Live
                  </button>
                  <button
                    onClick={() => setAnalyses(prev => prev.filter(x => x.id !== a.id))}
                    className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. SIGNALS MANAGEMENT */}
      {activeTab === 'signals' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-100 font-mono text-base">Trade Setups / Signals</h3>
            <button
              onClick={() => setNewSignalModal(true)}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Plus size={14} /> Broadcast Trade Setup
            </button>
          </div>

          <div className="space-y-3">
            {signals.map(s => (
              <div
                key={s.id}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-100 text-base">{s.symbol}</span>
                    <span className={`px-2 py-0.5 rounded font-mono text-xs font-bold ${
                      s.type === 'BUY' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {s.type}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {s.status}
                    </span>
                    {s.resultPips && (
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        +{s.resultPips} Pips
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                    <span>Entry: {s.entryZone.join(' - ')}</span>
                    <span>TP: {s.target1}</span>
                    <span>SL: {s.stopLoss}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {s.status === 'ACTIVE' && (
                    <>
                      <button
                        onClick={() => handleUpdateSignalStatus(s.id, 'CLOSED_PROFIT', 45)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono hover:bg-emerald-600/30"
                      >
                        Mark TP Hit (+45p)
                      </button>
                      <button
                        onClick={() => handleUpdateSignalStatus(s.id, 'CLOSED_LOSS', -20)}
                        className="px-3 py-1.5 rounded-lg bg-rose-600/20 text-rose-300 border border-rose-500/40 text-xs font-mono hover:bg-rose-600/30"
                      >
                        Mark SL Hit (-20p)
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setSignals(prev => prev.filter(x => x.id !== s.id))}
                    className="p-2 text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. LEADS MANAGEMENT */}
      {activeTab === 'leads' && (
        <div className="space-y-4">
          <h3 className="font-bold text-slate-100 font-mono text-base">Inquiries & Mentorship Leads</h3>

          <div className="space-y-3">
            {leads.map(ld => (
              <div
                key={ld.id}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-100 text-sm">{ld.name}</span>
                    <span className="text-xs font-mono text-blue-400 px-2 py-0.5 rounded bg-blue-500/10">
                      {ld.serviceInterest}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{ld.preferredChannel}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">{ld.createdAt}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-300">
                  <div>Email: <strong className="text-slate-100">{ld.email}</strong></div>
                  <div>Phone: <strong className="text-slate-100">{ld.phone || 'N/A'}</strong></div>
                </div>

                {ld.message && (
                  <p className="text-xs text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    "{ld.message}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: New Analysis */}
      {newAnalysisModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-slate-100 text-lg font-mono">Publish Market Analysis</h3>

            <form onSubmit={handleCreateAnalysis} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">Headline Title *</label>
                <input
                  type="text"
                  required
                  value={analysisForm.title}
                  onChange={e => setAnalysisForm({ ...analysisForm, title: e.target.value })}
                  placeholder="e.g. Gold Structural Rebound: 2380 Invalidation Level"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">Symbol</label>
                  <select
                    value={analysisForm.symbol}
                    onChange={e => setAnalysisForm({ ...analysisForm, symbol: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100"
                  >
                    <option value="EUR/USD">EUR/USD</option>
                    <option value="XAU/USD">Gold (XAU/USD)</option>
                    <option value="GBP/USD">GBP/USD</option>
                    <option value="USD/JPY">USD/JPY</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">Bias</label>
                  <select
                    value={analysisForm.bias}
                    onChange={e => setAnalysisForm({ ...analysisForm, bias: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100"
                  >
                    <option value="BULLISH">BULLISH</option>
                    <option value="BEARISH">BEARISH</option>
                    <option value="NEUTRAL">NEUTRAL</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">Timeframe</label>
                  <select
                    value={analysisForm.timeframe}
                    onChange={e => setAnalysisForm({ ...analysisForm, timeframe: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100"
                  >
                    <option value="1H">1H</option>
                    <option value="4H">4H</option>
                    <option value="DAILY">DAILY</option>
                    <option value="WEEKLY">WEEKLY</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">Executive Summary</label>
                <input
                  type="text"
                  value={analysisForm.subtitle}
                  onChange={e => setAnalysisForm({ ...analysisForm, subtitle: e.target.value })}
                  placeholder="Key macro driver and core setup thesis"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">Key Support Level (S1)</label>
                  <input
                    type="number"
                    step="any"
                    value={analysisForm.support1}
                    onChange={e => setAnalysisForm({ ...analysisForm, support1: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">Key Resistance Level (R1)</label>
                  <input
                    type="number"
                    step="any"
                    value={analysisForm.resistance1}
                    onChange={e => setAnalysisForm({ ...analysisForm, resistance1: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">Full Structural Thesis Content</label>
                <textarea
                  rows={5}
                  value={analysisForm.content}
                  onChange={e => setAnalysisForm({ ...analysisForm, content: e.target.value })}
                  placeholder="Detail liquidity sweeps, order block zones, Fibonacci confluence..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setNewAnalysisModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold"
                >
                  Publish Analysis
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: New Signal */}
      {newSignalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <h3 className="font-bold text-slate-100 text-lg font-mono">Broadcast VIP Trade Setup</h3>

            <form onSubmit={handleCreateSignal} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">Symbol</label>
                  <select
                    value={signalForm.symbol}
                    onChange={e => setSignalForm({ ...signalForm, symbol: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100"
                  >
                    <option value="XAU/USD">Gold (XAU/USD)</option>
                    <option value="EUR/USD">EUR/USD</option>
                    <option value="GBP/USD">GBP/USD</option>
                    <option value="USD/JPY">USD/JPY</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">Order Direction</label>
                  <select
                    value={signalForm.type}
                    onChange={e => setSignalForm({ ...signalForm, type: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100"
                  >
                    <option value="BUY">BUY / LONG</option>
                    <option value="SELL">SELL / SHORT</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">Entry Low</label>
                  <input
                    type="number"
                    step="any"
                    value={signalForm.entryMin}
                    onChange={e => setSignalForm({ ...signalForm, entryMin: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">Entry High</label>
                  <input
                    type="number"
                    step="any"
                    value={signalForm.entryMax}
                    onChange={e => setSignalForm({ ...signalForm, entryMax: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">Target 1 (TP1)</label>
                  <input
                    type="number"
                    step="any"
                    value={signalForm.target1}
                    onChange={e => setSignalForm({ ...signalForm, target1: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">Target 2 (TP2)</label>
                  <input
                    type="number"
                    step="any"
                    value={signalForm.target2}
                    onChange={e => setSignalForm({ ...signalForm, target2: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">Stop Loss (SL)</label>
                  <input
                    type="number"
                    step="any"
                    value={signalForm.stopLoss}
                    onChange={e => setSignalForm({ ...signalForm, stopLoss: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">Execution Thesis & Invalidation</label>
                <textarea
                  rows={3}
                  value={signalForm.reasoning}
                  onChange={e => setSignalForm({ ...signalForm, reasoning: e.target.value })}
                  placeholder="Explain structural setup reason..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setNewSignalModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-mono font-bold"
                >
                  Broadcast Setup
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
