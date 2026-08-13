import React from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { 
  Home, 
  TrendingUp, 
  FileText, 
  Target, 
  Calendar, 
  User as UserIcon 
} from 'lucide-react';

interface MobileNavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentPath, onNavigate }) => {
  const { t } = useTranslation();

  const items = [
    { label: t('nav.home'), path: '/', icon: Home },
    { label: t('nav.markets'), path: '/markets', icon: TrendingUp },
    { label: t('nav.analysis'), path: '/market-analysis', icon: FileText },
    { label: t('nav.signals'), path: '/signals', icon: Target },
    { label: t('nav.calendar'), path: '/economic-calendar', icon: Calendar },
    { label: t('nav.dashboard'), path: '/app/dashboard', icon: UserIcon }
  ];

  return (
    <nav className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B1C2D]/95 backdrop-blur-md border-t border-[#1E3A57] py-1.5 px-3 select-none">
      <div className="flex items-center justify-around">
        {items.map(item => {
          const Icon = item.icon;
          const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));

          return (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors cursor-pointer ${
                isActive
                  ? 'text-[#2163CC] font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-[#2163CC]' : 'text-slate-400'} />
              <span className="text-[10px] font-mono mt-0.5 tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

