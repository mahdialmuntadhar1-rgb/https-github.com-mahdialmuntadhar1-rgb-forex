import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { authService } from '../../services/authApi';
import { userService } from '../../services/userApi';
import { User, Language } from '../../types';
import { HorizontalLogo } from '../brand/HorizontalLogo';
import { 
  Search, 
  Bell, 
  Globe, 
  ShieldCheck, 
  Menu, 
  X, 
  LogOut, 
  LayoutDashboard,
  Zap,
  Layers,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch,
  onOpenNotifications
}) => {
  const { language, setLanguage, t, direction } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [unreadNotifCount, setUnreadNotifCount] = useState(2);

  useEffect(() => {
    const unsub = authService.subscribe(u => setUser(u));
    const loadNotifs = async () => {
      const notifs = await userService.getNotifications();
      setUnreadNotifCount(notifs.filter(n => !n.read).length);
    };
    loadNotifs();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      unsub();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { label: t('nav.markets'), path: '/markets' },
    { label: t('nav.analysis'), path: '/market-analysis' },
    { label: t('nav.signals'), path: '/signals', badge: 'Active' },
    { label: t('nav.calendar'), path: '/economic-calendar' },
    { label: t('nav.education'), path: '/education' },
    { label: t('nav.videos'), path: '/videos' },
    { label: t('nav.news'), path: '/news' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.services'), path: '/services' },
    { label: t('nav.contact'), path: '/contact' }
  ];

  const handleLangChange = (lang: Language) => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  };

  const handleLogout = async () => {
    await authService.logout();
    setUserDropdownOpen(false);
    onNavigate('/');
  };

  const toggleAdminMode = async () => {
    if (user?.role === 'admin') {
      await authService.switchRole('user');
    } else {
      await authService.switchRole('admin');
      onNavigate('/admin/dashboard');
    }
    setUserDropdownOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B1C2D]/95 backdrop-blur-md border-b border-[#1E3A57] shadow-xl'
          : 'bg-[#0B1C2D]/90 backdrop-blur-xs border-b border-[#1E3A57]/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Left: Official Profit Point Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center group cursor-pointer focus:outline-none shrink-0"
            aria-label="Profit Point Home"
          >
            {/* Desktop: 44px height */}
            <div className="hidden sm:block">
              <HorizontalLogo variant="dark" size={46} alt="Profit Point" />
            </div>
            {/* Mobile: 36px height */}
            <div className="sm:hidden block">
              <HorizontalLogo variant="dark" size={36} alt="Profit Point" />
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map(link => {
              const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => onNavigate(link.path)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors relative cursor-pointer ${
                    isActive
                      ? 'text-white bg-[#2163CC] shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-[#0F2236]'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="ms-1.5 px-1.5 py-0.2 rounded-full text-[9px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Search, Language, Notifications, Auth / Profile */}
        <div className="flex items-center gap-2.5">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#0F2236] hover:bg-[#132A42] border border-[#1E3A57] text-xs font-mono text-slate-300 hover:text-white transition cursor-pointer"
            title="Search Platform (Cmd+K)"
          >
            <Search size={14} className="text-[#2163CC]" />
            <span className="hidden md:inline">{t('common.search')}</span>
            <kbd className="hidden md:inline text-[10px] px-1.5 py-0.5 rounded bg-[#0B1C2D] border border-[#1E3A57] text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg bg-[#0F2236] hover:bg-[#132A42] border border-[#1E3A57] text-slate-300 hover:text-white transition cursor-pointer"
            title="Notifications"
          >
            <Bell size={16} />
            {unreadNotifCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#2163CC] ring-2 ring-[#0B1C2D] animate-pulse" />
            )}
          </button>

          {/* Multilingual Switcher: EN | ع | کوردی */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0F2236] hover:bg-[#132A42] border border-[#1E3A57] text-xs font-mono text-slate-200 transition cursor-pointer"
            >
              <Globe size={14} className="text-[#2163CC]" />
              <span>
                {language === 'en' ? 'EN' : language === 'ar' ? 'عربي' : 'کوردی'}
              </span>
              <ChevronDown size={12} className="text-slate-400" />
            </button>

            {langDropdownOpen && (
              <div
                className={`absolute ${direction === 'rtl' ? 'left-0' : 'right-0'} mt-2 w-36 bg-[#0F2236] border border-[#1E3A57] rounded-xl shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150`}
              >
                <button
                  onClick={() => handleLangChange('en')}
                  className={`w-full px-3 py-2 text-start text-xs font-medium transition flex items-center justify-between ${
                    language === 'en' ? 'text-[#2163CC] bg-[#2163CC]/10 font-bold' : 'text-slate-200 hover:bg-[#132A42]'
                  }`}
                >
                  <span>English</span>
                  <span className="font-mono text-[10px] text-slate-400">LTR</span>
                </button>
                <button
                  onClick={() => handleLangChange('ar')}
                  className={`w-full px-3 py-2 text-start text-xs font-medium transition flex items-center justify-between ${
                    language === 'ar' ? 'text-[#2163CC] bg-[#2163CC]/10 font-bold' : 'text-slate-200 hover:bg-[#132A42]'
                  }`}
                >
                  <span>العربية</span>
                  <span className="font-mono text-[10px] text-slate-400">RTL</span>
                </button>
                <button
                  onClick={() => handleLangChange('ckb')}
                  className={`w-full px-3 py-2 text-start text-xs font-medium transition flex items-center justify-between ${
                    language === 'ckb' ? 'text-[#2163CC] bg-[#2163CC]/10 font-bold' : 'text-slate-200 hover:bg-[#132A42]'
                  }`}
                >
                  <span>کوردی سۆرانی</span>
                  <span className="font-mono text-[10px] text-slate-400">RTL</span>
                </button>
              </div>
            )}
          </div>

          {/* User Auth or Profile Menu */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#0F2236] transition cursor-pointer border border-transparent hover:border-[#1E3A57]"
              >
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-[#2163CC]"
                />
                <span className="hidden lg:inline text-xs font-medium text-white truncate max-w-[100px]">
                  {user.name.split(' ')[0]}
                </span>
                {user.role === 'admin' && (
                  <span className="hidden lg:inline text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#2163CC]/20 text-[#2163CC] border border-[#2163CC]/40 font-bold">
                    ADMIN
                  </span>
                )}
              </button>

              {userDropdownOpen && (
                <div
                  className={`absolute ${direction === 'rtl' ? 'left-0' : 'right-0'} mt-2 w-56 bg-[#0F2236] border border-[#1E3A57] rounded-xl shadow-2xl py-1.5 z-50 divide-y divide-[#1E3A57] animate-in fade-in zoom-in-95 duration-150`}
                >
                  <div className="px-3.5 py-2">
                    <p className="text-xs font-bold text-white truncate">{user.name}</p>
                    <p className="text-[11px] font-mono text-slate-400 truncate">{user.email}</p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        onNavigate('/app/dashboard');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-3.5 py-2 text-start text-xs text-slate-200 hover:text-white hover:bg-[#132A42] flex items-center gap-2"
                    >
                      <LayoutDashboard size={14} className="text-[#2163CC]" />
                      {t('nav.dashboard')}
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('/app/watchlist');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-3.5 py-2 text-start text-xs text-slate-200 hover:text-white hover:bg-[#132A42] flex items-center gap-2"
                    >
                      <Layers size={14} className="text-emerald-400" />
                      {t('nav.watchlist')}
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('/app/alerts');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-3.5 py-2 text-start text-xs text-slate-200 hover:text-white hover:bg-[#132A42] flex items-center gap-2"
                    >
                      <Zap size={14} className="text-amber-400" />
                      {t('nav.alerts')}
                    </button>
                  </div>

                  {/* Admin CMS Access */}
                  <div className="py-1">
                    <button
                      onClick={() => {
                        onNavigate('/admin/dashboard');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-3.5 py-2 text-start text-xs font-semibold text-[#2163CC] hover:bg-[#2163CC]/10 flex items-center gap-2"
                    >
                      <ShieldCheck size={14} />
                      Profit Point Control CMS
                    </button>
                    <button
                      onClick={toggleAdminMode}
                      className="w-full px-3.5 py-1.5 text-start text-[11px] font-mono text-slate-400 hover:text-slate-200 hover:bg-[#132A42]"
                    >
                      Role: {user.role === 'admin' ? 'Switch to User' : 'Switch to Admin'}
                    </button>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="w-full px-3.5 py-2 text-start text-xs text-rose-400 hover:bg-rose-950/20 flex items-center gap-2"
                    >
                      <LogOut size={14} />
                      {t('nav.logout')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('/login')}
                className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer"
              >
                {t('nav.login')}
              </button>
              <button
                onClick={() => onNavigate('/register')}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#2163CC] hover:bg-[#1855B5] text-white shadow-md shadow-[#2163CC]/20 transition cursor-pointer"
              >
                {t('nav.register')}
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg bg-[#0F2236] border border-[#1E3A57] text-slate-200 hover:text-white"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0B1C2D] border-b border-[#1E3A57] px-4 pt-2 pb-6 space-y-2 max-h-[85vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2 pt-2 pb-3 border-b border-[#1E3A57]">
            {navLinks.map(link => (
              <button
                key={link.path}
                onClick={() => {
                  onNavigate(link.path);
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-lg text-start text-xs font-semibold transition ${
                  currentPath === link.path ? 'bg-[#2163CC] text-white' : 'bg-[#0F2236] text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
            <span>Role Mode</span>
            <button
              onClick={toggleAdminMode}
              className="font-mono text-[#2163CC] bg-[#2163CC]/10 px-2 py-1 rounded border border-[#2163CC]/30 font-bold"
            >
              {user?.role === 'admin' ? 'Role: Admin (Active)' : 'Role: Trader User'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
