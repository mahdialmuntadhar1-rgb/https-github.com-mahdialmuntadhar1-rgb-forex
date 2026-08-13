import React, { useState, useEffect } from 'react';
import { LanguageProvider, useTranslation } from './context/LanguageContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { SearchModal } from './components/common/SearchModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';

// Pages
import { HomePage } from './pages/HomePage';
import { ForexPage } from './pages/ForexPage';
import { GoldPage } from './pages/GoldPage';
import { AssetDetailPage } from './pages/AssetDetailPage';
import { MarketAnalysisPage } from './pages/MarketAnalysisPage';
import { AnalysisDetailPage } from './pages/AnalysisDetailPage';
import { SignalsPage } from './pages/SignalsPage';
import { EconomicCalendarPage } from './pages/EconomicCalendarPage';
import { NewsPage } from './pages/NewsPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { EducationPage } from './pages/EducationPage';
import { VideosPage } from './pages/VideosPage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { CalculatorsPage } from './pages/CalculatorsPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

const AppContent: React.FC = () => {
  const { direction, language } = useTranslation();
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [notifDrawerOpen, setNotifDrawerOpen] = useState(false);

  // Initialize from browser hash or default
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      setCurrentPath(hash);
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route Dispatcher
  const renderCurrentPage = () => {
    const path = currentPath.split('?')[0];
    const queryString = currentPath.includes('?') ? currentPath.split('?')[1] : '';
    const params = new URLSearchParams(queryString);

    if (path === '/' || path === '/home') {
      return <HomePage onNavigate={navigate} />;
    }

    if (path === '/forex') {
      return <ForexPage onNavigate={navigate} />;
    }

    if (path === '/gold') {
      return <GoldPage onNavigate={navigate} />;
    }

    if (path === '/markets') {
      return <ForexPage onNavigate={navigate} />;
    }

    if (path.startsWith('/markets/')) {
      const assetId = path.replace('/markets/', '');
      return <AssetDetailPage assetId={assetId} onNavigate={navigate} />;
    }

    if (path === '/market-analysis') {
      return <MarketAnalysisPage onNavigate={navigate} />;
    }

    if (path.startsWith('/market-analysis/')) {
      const slug = path.replace('/market-analysis/', '');
      return <AnalysisDetailPage slug={slug} onNavigate={navigate} />;
    }

    if (path === '/signals') {
      return <SignalsPage onNavigate={navigate} />;
    }

    if (path === '/economic-calendar') {
      return <EconomicCalendarPage onNavigate={navigate} />;
    }

    if (path === '/news') {
      return <NewsPage onNavigate={navigate} />;
    }

    if (path.startsWith('/news/')) {
      const slug = path.replace('/news/', '');
      return <NewsDetailPage slug={slug} onNavigate={navigate} />;
    }

    if (path === '/education' || path === '/academy') {
      return <EducationPage onNavigate={navigate} />;
    }

    if (path.startsWith('/education/')) {
      const courseId = path.replace('/education/', '');
      return <EducationPage onNavigate={navigate} selectedCourseId={courseId} />;
    }

    if (path === '/videos') {
      return <VideosPage onNavigate={navigate} />;
    }

    if (path === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }

    if (path === '/services') {
      return <ServicesPage onNavigate={navigate} />;
    }

    if (path === '/contact') {
      return <ContactPage onNavigate={navigate} defaultSubject={params.get('subject') || undefined} />;
    }

    if (path === '/calculators') {
      return <CalculatorsPage onNavigate={navigate} />;
    }

    if (path === '/login') {
      return <LoginPage onNavigate={navigate} />;
    }

    if (path === '/register') {
      return <RegisterPage onNavigate={navigate} />;
    }

    if (path.startsWith('/app/')) {
      return <UserDashboardPage onNavigate={navigate} />;
    }

    if (path.startsWith('/admin')) {
      return <AdminDashboardPage onNavigate={navigate} />;
    }

    // Default fallback to Home
    return <HomePage onNavigate={navigate} />;
  };

  return (
    <div
      dir={direction}
      className={`min-h-screen bg-[#0B1C2D] text-slate-100 flex flex-col font-sans selection:bg-[#2163CC] selection:text-white ${
        language === 'ckb' || language === 'ar' ? 'font-[sans-serif]' : ''
      }`}
    >
      {/* Platform Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenNotifications={() => setNotifDrawerOpen(true)}
      />

      {/* Main Routed Page Container */}
      <main className="flex-1 w-full">
        {renderCurrentPage()}
      </main>

      {/* Global Modals & Drawers */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigate={navigate}
      />

      <NotificationDrawer
        isOpen={notifDrawerOpen}
        onClose={() => setNotifDrawerOpen(false)}
        onNavigate={navigate}
      />

      {/* Bottom Sticky Mobile Navigation for handheld devices */}
      <MobileNav
        currentPath={currentPath}
        onNavigate={navigate}
      />

      {/* Global Institutional Footer */}
      <Footer onNavigate={navigate} />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
