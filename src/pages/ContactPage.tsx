import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { userService } from '../services/userApi';
import { 
  Mail, 
  MessageSquare, 
  Send, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (path: string) => void;
  defaultSubject?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, defaultSubject }) => {
  const { t, direction } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredChannel: 'WHATSAPP' as 'WHATSAPP' | 'TELEGRAM' | 'EMAIL' | 'PHONE',
    serviceInterest: defaultSubject || '1-on-1 Mentorship',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (defaultSubject) {
      setFormData(prev => ({ ...prev, serviceInterest: defaultSubject }));
    }
  }, [defaultSubject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setLoading(true);
    await userService.submitLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      preferredChannel: formData.preferredChannel,
      serviceInterest: formData.serviceInterest,
      message: formData.message
    });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
          <MessageSquare size={14} /> Direct Strategist Desk
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          {t('contact.title')}
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          {t('contact.subtitle')}. Inquire about 1-on-1 mentorship, VIP intelligence feeds, or institutional consultation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          {submitted ? (
            <div className="text-center py-12 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-100">Message Received</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Our senior desk will review your inquiry and reach out via {formData.preferredChannel} within 4 to 8 business hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    preferredChannel: 'WHATSAPP',
                    serviceInterest: '1-on-1 Mentorship',
                    message: ''
                  });
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">
                    {t('contact.fullName')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100 focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">
                    {t('contact.email')} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100 focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">
                    {t('contact.phone')} (WhatsApp/Telegram)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+44 7700 900077"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100 focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">
                    {t('contact.preferredChannel')}
                  </label>
                  <select
                    value={formData.preferredChannel}
                    onChange={e => setFormData({ ...formData, preferredChannel: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100 focus:outline-hidden focus:border-blue-500"
                  >
                    <option value="WHATSAPP">WhatsApp</option>
                    <option value="TELEGRAM">Telegram</option>
                    <option value="EMAIL">Email</option>
                    <option value="PHONE">Direct Call</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">
                  {t('contact.serviceInterest')}
                </label>
                <select
                  value={formData.serviceInterest}
                  onChange={e => setFormData({ ...formData, serviceInterest: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100 focus:outline-hidden focus:border-blue-500"
                >
                  <option value="1-on-1 Mentorship">1-on-1 Private Mentorship</option>
                  <option value="VIP Signals Membership">VIP Signals & Trade Alerts</option>
                  <option value="Institutional Account Consulting">Institutional Account Consulting</option>
                  <option value="Corporate Workshop / Speaking">Corporate Workshop / Speaking</option>
                  <option value="General Inquiry">General Technical Question</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">
                  {t('contact.message')}
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details on your trading background, account tier, and primary objective..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100 focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold shadow-lg shadow-blue-500/25 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? 'Submitting...' : t('contact.submit')}
                <ArrowRight size={14} className={direction === 'rtl' ? 'rotate-180' : ''} />
              </button>
            </form>
          )}
        </div>

        {/* Right Info & Direct Channels */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Connect Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
            <h3 className="font-bold text-slate-100 text-base font-mono">
              Instant Direct Channels
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Prefer direct encrypted messaging? Reach out to our operational strategist line directly:
            </p>

            <div className="space-y-3">
              <a
                href="https://wa.me/447700900077"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 hover:border-emerald-500/60 transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-100">WhatsApp Strategist Desk</div>
                    <div className="text-[11px] font-mono text-emerald-400">+44 7700 900077</div>
                  </div>
                </div>
                <ArrowRight size={14} className="text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://t.me/profitpoint_official"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-[#0F2236] border border-[#1E3A57] hover:border-[#2163CC] transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#2163CC]/20 text-[#2163CC] flex items-center justify-center">
                    <Send size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Official Telegram Channel</div>
                    <div className="text-[11px] font-mono text-[#2163CC]">@profitpoint_official</div>
                  </div>
                </div>
                <ArrowRight size={14} className="text-[#2163CC] group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="mailto:contact@profitpoint.pro"
                className="p-3.5 rounded-xl bg-[#0F2236] border border-[#1E3A57] hover:border-[#2163CC] transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#2163CC]/20 text-[#2163CC] flex items-center justify-center">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Institutional Email Inquiries</div>
                    <div className="text-[11px] font-mono text-slate-300">contact@profitpoint.pro</div>
                  </div>
                </div>
                <ArrowRight size={14} className="text-[#2163CC] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Operating Hours & Compliance */}
          <div className="p-6 rounded-3xl bg-slate-950/60 border border-slate-800 space-y-3 text-xs text-slate-400">
            <div className="flex items-center gap-2 font-mono text-slate-200 font-bold">
              <Clock size={15} className="text-blue-400" />
              Desk Coverage Hours
            </div>
            <p className="leading-relaxed">
              London Session (07:00 – 16:00 UTC) & New York Overlap. Inquiries submitted over weekends will be addressed prior to Asian market open Sunday evening.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
