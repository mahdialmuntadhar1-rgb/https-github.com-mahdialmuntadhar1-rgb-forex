import React, { useState } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { authService } from '../services/authApi';
import { Language } from '../types';
import { VerticalLogo } from '../components/brand/VerticalLogo';
import { User, Mail, Phone, Globe, Lock, ArrowRight, CheckCircle2, Shield } from 'lucide-react';

interface RegisterPageProps {
  onNavigate: (path: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const { language, setLanguage, t, direction } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'Iraq / Kurdistan',
    password: '',
    confirmPassword: '',
    preferredLanguage: language as Language
  });
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.password) {
      setError('Please fill in all mandatory fields.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }
    if (!agreeTerms) {
      setError('Please accept the Terms of Service & Risk Disclosure.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await authService.register({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        preferredLanguage: formData.preferredLanguage
      });
      onNavigate('/app/dashboard');
    } catch {
      setError('Registration failed. Please try again or use another email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0B1C2D] flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8 relative">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#2163CC 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Language Switcher & Navigation Header */}
      <div className="w-full max-w-lg flex items-center justify-between mb-6 z-10">
        <button
          onClick={() => onNavigate('/')}
          className="text-xs text-slate-400 hover:text-white transition flex items-center gap-1 font-mono cursor-pointer"
        >
          &larr; Back to Platform
        </button>

        <div className="flex items-center gap-1.5 bg-[#0F2236] border border-[#1E3A57] px-2.5 py-1 rounded-full text-xs font-mono text-slate-300">
          <Globe size={13} className="text-[#2163CC]" />
          <button
            onClick={() => { setLanguage('en'); setFormData({ ...formData, preferredLanguage: 'en' }); }}
            className={`px-1.5 py-0.5 rounded transition ${language === 'en' ? 'text-[#2163CC] font-bold bg-[#2163CC]/10' : 'text-slate-400 hover:text-white'}`}
          >
            EN
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => { setLanguage('ar'); setFormData({ ...formData, preferredLanguage: 'ar' }); }}
            className={`px-1.5 py-0.5 rounded transition ${language === 'ar' ? 'text-[#2163CC] font-bold bg-[#2163CC]/10' : 'text-slate-400 hover:text-white'}`}
          >
            العربية
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => { setLanguage('ckb'); setFormData({ ...formData, preferredLanguage: 'ckb' }); }}
            className={`px-1.5 py-0.5 rounded transition ${language === 'ckb' ? 'text-[#2163CC] font-bold bg-[#2163CC]/10' : 'text-slate-400 hover:text-white'}`}
          >
            کوردی
          </button>
        </div>
      </div>

      {/* Registration Card */}
      <div className="w-full max-w-lg bg-[#0F2236] border border-[#1E3A57] rounded-3xl p-8 sm:p-10 shadow-2xl z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <VerticalLogo variant="dark" size="md" showTagline={true} tagline="FINANCIAL INTELLIGENCE" />
          </div>
          <div className="pt-2">
            <h1 className="text-xl font-bold text-white tracking-tight">
              Create Your Profit Point Account
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Join institutional traders receiving daily Forex research & setups
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
            {error}
          </div>
        )}

        {/* Registration Form with White/Light Inputs and Charcoal Text */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">Full Name *</label>
            <div className="relative">
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Sardar Bakir"
                className="w-full px-4 py-3 rounded-xl bg-white text-[#333333] placeholder-slate-400 font-medium text-sm border-2 border-transparent focus:border-[#2163CC] focus:outline-none shadow-inner transition"
              />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <User size={16} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">Email Address *</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="trader@gmail.com"
                  className="w-full px-4 py-3 rounded-xl bg-white text-[#333333] placeholder-slate-400 font-medium text-sm border-2 border-transparent focus:border-[#2163CC] focus:outline-none shadow-inner transition"
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Mail size={16} />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">Phone (WhatsApp/SMS)</label>
              <div className="relative">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+964 750 123 4567"
                  className="w-full px-4 py-3 rounded-xl bg-white text-[#333333] placeholder-slate-400 font-medium text-sm border-2 border-transparent focus:border-[#2163CC] focus:outline-none shadow-inner transition"
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Phone size={16} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">Country / Region</label>
              <select
                value={formData.country}
                onChange={e => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white text-[#333333] font-medium text-sm border-2 border-transparent focus:border-[#2163CC] focus:outline-none shadow-inner transition"
              >
                <option value="Iraq / Kurdistan">Iraq / Kurdistan</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="Germany">Germany</option>
                <option value="Turkey">Turkey</option>
                <option value="Other">Other Global</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">Preferred Language</label>
              <select
                value={formData.preferredLanguage}
                onChange={e => setFormData({ ...formData, preferredLanguage: e.target.value as Language })}
                className="w-full px-4 py-3 rounded-xl bg-white text-[#333333] font-medium text-sm border-2 border-transparent focus:border-[#2163CC] focus:outline-none shadow-inner transition"
              >
                <option value="en">English (US/UK)</option>
                <option value="ar">العربية (Arabic)</option>
                <option value="ckb">کوردی سۆرانی (Sorani Kurdish)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">Password *</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Min 8 characters"
                  className="w-full px-4 py-3 rounded-xl bg-white text-[#333333] placeholder-slate-400 font-medium text-sm border-2 border-transparent focus:border-[#2163CC] focus:outline-none shadow-inner transition"
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Lock size={16} />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">Confirm Password *</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Re-enter password"
                  className="w-full px-4 py-3 rounded-xl bg-white text-[#333333] placeholder-slate-400 font-medium text-sm border-2 border-transparent focus:border-[#2163CC] focus:outline-none shadow-inner transition"
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Lock size={16} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-1">
            <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={e => setAgreeTerms(e.target.checked)}
                className="mt-0.5 rounded border-[#1E3A57] bg-[#0B1C2D] text-[#2163CC] focus:ring-[#2163CC]"
              />
              <span>
                I agree to the{' '}
                <button type="button" onClick={() => alert('Profit Point Terms & Risk Disclosure')} className="text-[#2163CC] underline">
                  Terms of Service
                </button>{' '}
                and understand that Forex and CFD trading involve financial risk.
              </span>
            </label>
          </div>

          {/* Primary Button in #2163CC */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-[#2163CC] hover:bg-[#1A52AB] active:scale-[0.99] text-white font-bold text-sm transition shadow-lg shadow-[#2163CC]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Create Profit Point Account</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Existing Member Redirection */}
        <div className="text-center text-xs text-slate-400 pt-1 border-t border-[#1E3A57]/80">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => onNavigate('/login')}
            className="text-[#2163CC] font-bold hover:underline cursor-pointer"
          >
            Sign In Here &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
