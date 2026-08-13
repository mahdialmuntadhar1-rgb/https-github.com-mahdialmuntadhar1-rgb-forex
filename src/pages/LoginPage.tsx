import React, { useState } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { authService } from '../services/authApi';
import { Language } from '../types';
import { VerticalLogo } from '../components/brand/VerticalLogo';
import { Mail, Phone, Lock, ArrowRight, Globe, Shield, CheckCircle } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { language, setLanguage, t, direction } = useTranslation();
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await authService.login(identifier, password);
      onNavigate('/app/dashboard');
    } catch {
      setError('Invalid login credentials. Please verify your details.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAdmin = () => {
    setIdentifier('admin@profitpoint.com');
    setPassword('ProfitPoint2026!');
    setLoginMethod('email');
  };

  const fillDemoTrader = () => {
    setIdentifier('trader@profitpoint.com');
    setPassword('TraderPass2026!');
    setLoginMethod('email');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0B1C2D] flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8 relative">
      {/* Background Subtle Grid Texture */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#2163CC 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Language Switcher Bar at top */}
      <div className="w-full max-w-md flex items-center justify-between mb-6 z-10">
        <button
          onClick={() => onNavigate('/')}
          className="text-xs text-slate-400 hover:text-white transition flex items-center gap-1 font-mono cursor-pointer"
        >
          &larr; Back to Platform
        </button>

        <div className="flex items-center gap-1.5 bg-[#0F2236] border border-[#1E3A57] px-2.5 py-1 rounded-full text-xs font-mono text-slate-300">
          <Globe size={13} className="text-[#2163CC]" />
          <button
            onClick={() => setLanguage('en')}
            className={`px-1.5 py-0.5 rounded transition ${language === 'en' ? 'text-[#2163CC] font-bold bg-[#2163CC]/10' : 'text-slate-400 hover:text-white'}`}
          >
            EN
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => setLanguage('ar')}
            className={`px-1.5 py-0.5 rounded transition ${language === 'ar' ? 'text-[#2163CC] font-bold bg-[#2163CC]/10' : 'text-slate-400 hover:text-white'}`}
          >
            العربية
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => setLanguage('ckb')}
            className={`px-1.5 py-0.5 rounded transition ${language === 'ckb' ? 'text-[#2163CC] font-bold bg-[#2163CC]/10' : 'text-slate-400 hover:text-white'}`}
          >
            کوردی
          </button>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-[#0F2236] border border-[#1E3A57] rounded-3xl p-8 sm:p-10 shadow-2xl z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <VerticalLogo variant="dark" size="md" showTagline={true} tagline="FINANCIAL INTELLIGENCE" />
          </div>
          <div className="pt-2">
            <h1 className="text-xl font-bold text-white tracking-tight">
              Sign In to Your Terminal
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Access real-time interbank research, VIP setups & academy
            </p>
          </div>
        </div>

        {/* Tab Toggle: Email vs Phone */}
        <div className="flex bg-[#0B1C2D] p-1 rounded-xl border border-[#1E3A57]">
          <button
            type="button"
            onClick={() => { setLoginMethod('email'); setIdentifier(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
              loginMethod === 'email' ? 'bg-[#2163CC] text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail size={14} /> Email Address
          </button>
          <button
            type="button"
            onClick={() => { setLoginMethod('phone'); setIdentifier(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
              loginMethod === 'phone' ? 'bg-[#2163CC] text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Phone size={14} /> Phone Number
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
            {error}
          </div>
        )}

        {/* Login Form with White/Light Inputs & Charcoal Text as specified */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              {loginMethod === 'email' ? 'Institutional / Personal Email' : 'Phone Number (with Country Code)'}
            </label>
            <div className="relative">
              <input
                type={loginMethod === 'email' ? 'email' : 'tel'}
                required
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                placeholder={loginMethod === 'email' ? 'trader@profitpoint.com' : '+964 750 000 0000'}
                className="w-full px-4 py-3 rounded-xl bg-white text-[#333333] placeholder-slate-400 font-medium text-sm border-2 border-transparent focus:border-[#2163CC] focus:outline-none shadow-inner transition"
              />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                {loginMethod === 'email' ? <Mail size={16} /> : <Phone size={16} />}
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-300">Password</label>
              <button
                type="button"
                onClick={() => alert('Password reset link sent to your registered email.')}
                className="text-xs text-[#2163CC] hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white text-[#333333] placeholder-slate-400 font-medium text-sm border-2 border-transparent focus:border-[#2163CC] focus:outline-none shadow-inner transition"
              />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Lock size={16} />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="rounded border-[#1E3A57] bg-[#0B1C2D] text-[#2163CC] focus:ring-[#2163CC]"
              />
              Keep me signed in
            </label>
            <span className="text-slate-400 flex items-center gap-1">
              <Shield size={12} className="text-[#2163CC]" /> 256-bit SSL
            </span>
          </div>

          {/* Primary CTA Button in #2163CC */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-[#2163CC] hover:bg-[#1A52AB] active:scale-[0.99] text-white font-bold text-sm transition shadow-lg shadow-[#2163CC]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In to Profit Point</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Access Buttons for seamless testing */}
        <div className="pt-2 border-t border-[#1E3A57]/80">
          <div className="text-[11px] text-slate-400 font-mono text-center mb-2">
            Instant Demo Credentials:
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={fillDemoTrader}
              className="py-1.5 px-2 bg-[#0B1C2D] hover:bg-[#132A42] border border-[#1E3A57] rounded-lg text-xs font-mono text-slate-300 hover:text-white transition text-center cursor-pointer"
            >
              👤 Trader Demo
            </button>
            <button
              type="button"
              onClick={fillDemoAdmin}
              className="py-1.5 px-2 bg-[#0B1C2D] hover:bg-[#132A42] border border-[#1E3A57] rounded-lg text-xs font-mono text-slate-300 hover:text-white transition text-center cursor-pointer"
            >
              🛡️ Admin Backoffice
            </button>
          </div>
        </div>

        {/* Register Redirection */}
        <div className="text-center text-xs text-slate-400 pt-1">
          Don't have a Profit Point account?{' '}
          <button
            type="button"
            onClick={() => onNavigate('/register')}
            className="text-[#2163CC] font-bold hover:underline cursor-pointer"
          >
            Register Here &rarr;
          </button>
        </div>
      </div>

      {/* Trust & Brand Assurance Footer */}
      <div className="mt-8 text-center text-xs text-slate-500 max-w-sm space-y-1">
        <p>Profit Point Institutional Market Research & Academy</p>
        <p className="text-[11px]">Helping traders understand global markets with precision & clarity.</p>
      </div>
    </div>
  );
};
