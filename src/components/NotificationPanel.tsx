import { Bell, X, Sparkles, CalendarClock } from 'lucide-react';
import type { AppNotification } from '../types';

interface Props {
  open: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
}

function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}d ago`;
  return new Date(ts).toLocaleDateString();
}

const ICON = { welcome: Sparkles, followup: CalendarClock } as const;

export function NotificationPanel({ open, onClose, notifications, onMarkRead, onMarkAllRead }: Props) {
  const hasUnread = notifications.some((n) => !n.read);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-screen w-[320px] sm:w-[380px] z-50 flex flex-col border-l transition-transform duration-200 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <p className="font-semibold flex items-center gap-2">
            <Bell size={16} style={{ color: 'var(--accent)' }} /> Notifications
          </p>
          <div className="flex items-center gap-3">
            {hasUnread && (
              <button onClick={onMarkAllRead} className="text-xs font-medium" style={{ color: 'var(--accent)' }}>
                Mark all read
              </button>
            )}
            <button onClick={onClose} style={{ color: 'var(--text-2)' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-sm text-center py-12 px-4" style={{ color: 'var(--ghost)' }}>
              No notifications yet.
            </p>
          ) : (
            notifications.map((n) => {
              const Icon = ICON[n.type];
              return (
                <button
                  key={n.id}
                  onClick={() => !n.read && onMarkRead(n.id)}
                  className="w-full text-left px-4 py-3 border-b flex gap-3 items-start"
                  style={{ borderColor: 'var(--border)', background: n.read ? 'transparent' : 'var(--accent-light)' }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'var(--surface-2)', color: 'var(--accent)' }}
                  >
                    <Icon size={14} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm ${n.read ? 'font-medium' : 'font-bold'}`}>{n.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-2)' }}>{n.message}</p>
                    <p className="text-[11px] mt-1" style={{ color: 'var(--ghost)' }}>{timeAgo(n.createdAt)}</p>
                  </div>
                  {!n.read && <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: 'var(--accent)' }} />}
                </button>
              );
            })
          )}
        </div>
      </aside>
    </>
  );
}
