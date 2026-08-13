import React, { useState, useEffect } from 'react';
import { NotificationItem } from '../../types';
import { userService } from '../../services/userApi';
import { Bell, X, CheckCheck, ExternalLink, Zap, AlertTriangle, Radio } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const loadNotifs = async () => {
    const list = await userService.getNotifications();
    setNotifications(list);
  };

  useEffect(() => {
    if (isOpen) {
      loadNotifs();
    }
  }, [isOpen]);

  const handleMarkAllRead = async () => {
    await userService.markAllNotificationsRead();
    loadNotifs();
  };

  const handleItemClick = async (notif: NotificationItem) => {
    await userService.markNotificationRead(notif.id);
    if (notif.link) {
      onNavigate(notif.link);
      onClose();
    }
  };

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Bell size={18} />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">Terminal Alerts</h3>
              <p className="text-xs text-slate-400 font-mono">
                {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All alerts up to date'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                title="Mark all as read"
                className="p-1.5 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-md transition"
              >
                <CheckCheck size={16} />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-md transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-slate-800/40">
          {notifications.length === 0 ? (
            <div className="py-16 text-center text-slate-500">
              <Bell size={32} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">No notification alerts yet</p>
            </div>
          ) : (
            notifications.map(notif => {
              const isSignal = notif.type === 'SIGNAL_ALERT';
              const isEco = notif.type === 'ECONOMIC_ALERT';

              return (
                <div
                  key={notif.id}
                  onClick={() => handleItemClick(notif)}
                  className={`pt-3 first:pt-0 cursor-pointer group p-3 rounded-xl transition border ${
                    notif.read
                      ? 'bg-slate-950/30 border-transparent hover:bg-slate-800/40 hover:border-slate-800'
                      : 'bg-blue-950/20 border-blue-500/30 hover:bg-blue-950/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                        isSignal
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : isEco
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}
                    >
                      {isSignal ? <Zap size={16} /> : isEco ? <AlertTriangle size={16} /> : <Radio size={16} />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-semibold text-slate-200 text-sm group-hover:text-blue-400 transition truncate">
                          {notif.title}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 shrink-0">
                          {notif.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                        {notif.message}
                      </p>
                      {notif.link && (
                        <div className="mt-2 flex items-center gap-1 text-[11px] font-mono text-blue-400 group-hover:underline">
                          View details <ExternalLink size={11} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950 text-center">
          <button
            onClick={() => {
              onNavigate('/app/alerts');
              onClose();
            }}
            className="w-full py-2 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 font-medium transition"
          >
            Manage Alert Subscriptions
          </button>
        </div>
      </div>
    </div>
  );
};
