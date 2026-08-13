import React, { useState } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { 
  Calculator, 
  DollarSign, 
  ShieldCheck, 
  TrendingUp, 
  PieChart, 
  Layers, 
  Percent,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

interface CalculatorsPageProps {
  onNavigate: (path: string) => void;
}

export const CalculatorsPage: React.FC<CalculatorsPageProps> = ({ onNavigate }) => {
  const { t, direction } = useTranslation();
  const [activeTab, setActiveTab] = useState<'position' | 'pip' | 'margin' | 'compound'>('position');

  // 1. Position Size Calculator State
  const [posAccountCurrency, setPosAccountCurrency] = useState('USD');
  const [posAccountBalance, setPosAccountBalance] = useState<number>(10000);
  const [posRiskPercent, setPosRiskPercent] = useState<number>(1.0);
  const [posStopLossPips, setPosStopLossPips] = useState<number>(25);
  const [posPair, setPosPair] = useState('EUR/USD');

  // 2. Pip Value Calculator State
  const [pipPair, setPipPair] = useState('EUR/USD');
  const [pipLots, setPipLots] = useState<number>(1.0);

  // 3. Margin Calculator State
  const [marginPair, setMarginPair] = useState('EUR/USD');
  const [marginLeverage, setMarginLeverage] = useState<number>(100);
  const [marginLots, setMarginLots] = useState<number>(1.0);
  const [marginPrice, setMarginPrice] = useState<number>(1.0850);

  // 4. Compound Interest State
  const [compPrincipal, setCompPrincipal] = useState<number>(5000);
  const [compMonthlyReturn, setCompMonthlyReturn] = useState<number>(5);
  const [compMonths, setCompMonths] = useState<number>(12);

  // Calculations:
  // Position Sizing:
  const riskAmount = (posAccountBalance * (posRiskPercent / 100));
  const isJpy = posPair.includes('JPY');
  const isGold = posPair.includes('XAU');
  const pipMultiplier = isGold ? 10 : (isJpy ? 1000 : 10); // standard lot 1 pip = $10 on EURUSD, $100 on Gold per dollar, etc.
  const lotSize = posStopLossPips > 0 ? (riskAmount / (posStopLossPips * (isGold ? 100 : 10))) : 0;
  const standardLots = Math.max(0.01, Math.round(lotSize * 100) / 100);

  // Pip Value:
  const pipVal = pipLots * (pipPair.includes('XAU') ? 10 : 10);

  // Margin:
  const contractSize = marginPair.includes('XAU') ? 100 : 100000;
  const requiredMargin = (marginLots * contractSize * marginPrice) / marginLeverage;

  // Compound Growth:
  const finalCompBalance = compPrincipal * Math.pow(1 + (compMonthlyReturn / 100), compMonths);
  const compTotalProfit = finalCompBalance - compPrincipal;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
          <Calculator size={14} /> Mathematical Risk Management
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          Institutional Trading Calculators
        </h1>
        <p className="text-sm text-slate-400">
          Precise position sizing, pip value estimation, and margin requirement modules to safeguard your account.
        </p>
      </div>

      {/* Calculator Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4">
        <button
          onClick={() => setActiveTab('position')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'position'
              ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <ShieldCheck size={14} /> Position Size & Risk
        </button>

        <button
          onClick={() => setActiveTab('pip')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'pip'
              ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <DollarSign size={14} /> Pip Value Calculator
        </button>

        <button
          onClick={() => setActiveTab('margin')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'margin'
              ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Layers size={14} /> Margin Requirement
        </button>

        <button
          onClick={() => setActiveTab('compound')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'compound'
              ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <TrendingUp size={14} /> Compound Growth Matrix
        </button>
      </div>

      {/* 1. POSITION SIZING TAB */}
      {activeTab === 'position' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-slate-100 font-mono">Parameters</h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">Account Currency</label>
                  <select
                    value={posAccountCurrency}
                    onChange={e => setPosAccountCurrency(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">Asset / Instrument</label>
                  <select
                    value={posPair}
                    onChange={e => setPosPair(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100"
                  >
                    <option value="EUR/USD">EUR/USD</option>
                    <option value="GBP/USD">GBP/USD</option>
                    <option value="XAU/USD">Gold (XAU/USD)</option>
                    <option value="USD/JPY">USD/JPY</option>
                    <option value="AUD/USD">AUD/USD</option>
                    <option value="USD/CAD">USD/CAD</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">Account Balance ({posAccountCurrency})</label>
                <input
                  type="number"
                  value={posAccountBalance}
                  onChange={e => setPosAccountBalance(parseFloat(e.target.value) || 0)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>Risk Percentage</span>
                  <span className="text-blue-400 font-bold">{posRiskPercent}%</span>
                </div>
                <input
                  type="range"
                  min="0.25"
                  max="5.0"
                  step="0.25"
                  value={posRiskPercent}
                  onChange={e => setPosRiskPercent(parseFloat(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>0.5% (Conservative)</span>
                  <span>1.0% (Standard)</span>
                  <span>2.0% (Institutional Max)</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">Stop Loss Distance (in Pips / Points)</label>
                <input
                  type="number"
                  value={posStopLossPips}
                  onChange={e => setPosStopLossPips(parseFloat(e.target.value) || 1)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100"
                />
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="lg:col-span-6 bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 border border-blue-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm font-mono flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-400" />
                Execution Output
              </h3>
              <span className="text-xs font-mono text-slate-400">{posPair}</span>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
                <div className="text-slate-400 text-xs font-mono uppercase">Calculated Standard Lot Size</div>
                <div className="text-4xl font-extrabold text-blue-400 font-mono">
                  {standardLots.toFixed(2)} <span className="text-sm font-normal text-slate-400">Lots</span>
                </div>
                <p className="text-[11px] text-slate-500 font-mono">
                  ({(standardLots * 100000).toLocaleString()} Units of Base Currency)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-slate-500 text-[10px] uppercase">Capital At Risk</div>
                  <div className="text-lg font-bold text-rose-400 mt-0.5">
                    ${riskAmount.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">{posRiskPercent}% of Total Equity</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-slate-500 text-[10px] uppercase">Stop Loss Barrier</div>
                  <div className="text-lg font-bold text-slate-200 mt-0.5">
                    {posStopLossPips} Pips
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">Fixed invalidation</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 text-xs text-slate-300 flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  Executing exactly <strong>{standardLots.toFixed(2)} lots</strong> ensures that if price hits your stop loss at {posStopLossPips} pips, your loss will be exactly ${riskAmount.toFixed(2)}.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. PIP VALUE CALCULATOR */}
      {activeTab === 'pip' && (
        <div className="max-w-3xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <h3 className="font-bold text-slate-100 text-base font-mono">Pip Value Calculator</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-400">Currency Pair</label>
              <select
                value={pipPair}
                onChange={e => setPipPair(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100"
              >
                <option value="EUR/USD">EUR/USD</option>
                <option value="GBP/USD">GBP/USD</option>
                <option value="XAU/USD">Gold (XAU/USD)</option>
                <option value="USD/JPY">USD/JPY</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-400">Position Size (Lots)</label>
              <input
                type="number"
                step="0.01"
                value={pipLots}
                onChange={e => setPipLots(parseFloat(e.target.value) || 0.01)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
            <div className="text-slate-400 text-xs font-mono uppercase">Value Per Single Pip Move</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">
              ${pipVal.toFixed(2)} USD
            </div>
          </div>
        </div>
      )}

      {/* 3. MARGIN CALCULATOR */}
      {activeTab === 'margin' && (
        <div className="max-w-3xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <h3 className="font-bold text-slate-100 text-base font-mono">Margin Requirement Calculator</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-400">Asset</label>
              <select
                value={marginPair}
                onChange={e => setMarginPair(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100"
              >
                <option value="EUR/USD">EUR/USD</option>
                <option value="GBP/USD">GBP/USD</option>
                <option value="XAU/USD">Gold (XAU/USD)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-400">Account Leverage</label>
              <select
                value={marginLeverage}
                onChange={e => setMarginLeverage(parseInt(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100"
              >
                <option value="30">1:30 (Tier 1 Regulated)</option>
                <option value="50">1:50</option>
                <option value="100">1:100</option>
                <option value="200">1:200</option>
                <option value="500">1:500 (Pro)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-400">Volume (Lots)</label>
              <input
                type="number"
                step="0.1"
                value={marginLots}
                onChange={e => setMarginLots(parseFloat(e.target.value) || 0.1)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
            <div className="text-slate-400 text-xs font-mono uppercase">Required Initial Margin</div>
            <div className="text-3xl font-extrabold text-blue-400 font-mono">
              ${requiredMargin.toFixed(2)} USD
            </div>
          </div>
        </div>
      )}

      {/* 4. COMPOUND INTEREST CALCULATOR */}
      {activeTab === 'compound' && (
        <div className="max-w-4xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <h3 className="font-bold text-slate-100 text-base font-mono">Statistical Compound Growth Simulator</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-400">Starting Equity ($)</label>
              <input
                type="number"
                value={compPrincipal}
                onChange={e => setCompPrincipal(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-400">Target Monthly Return (%)</label>
              <input
                type="number"
                step="0.5"
                value={compMonthlyReturn}
                onChange={e => setCompMonthlyReturn(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-400">Timeline (Months)</label>
              <input
                type="number"
                value={compMonths}
                onChange={e => setCompMonths(parseInt(e.target.value) || 1)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-slate-500 text-xs font-mono uppercase">Projected Ending Balance</div>
              <div className="text-3xl font-bold text-emerald-400 font-mono">
                ${finalCompBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-slate-500 text-xs font-mono uppercase">Cumulative Net Gain</div>
              <div className="text-3xl font-bold text-blue-400 font-mono">
                +${compTotalProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
