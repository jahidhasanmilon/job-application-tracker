import { Bell, Menu } from 'lucide-react';
import type { ReactNode } from 'react';

export interface HeaderUser {
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
}

export interface HeaderActions {
  unreadCount?: number;
  onBellClick?: () => void;
  onAvatarClick?: () => void;
}

interface Props extends HeaderActions {
  title: string;
  subtitle: string;
  user?: HeaderUser | null;
  action?: ReactNode;
  onMenuClick?: () => void;
}

export function PageHeader({ title, subtitle, user, action, onMenuClick, unreadCount = 0, onBellClick, onAvatarClick }: Props) {
  const initial = (user?.displayName || user?.email || 'U').charAt(0).toUpperCase();
  return (
    <div className="flex items-start justify-between mb-6 gap-3 flex-wrap">
      <div className="flex items-start gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg border shrink-0 mt-0.5"
          style={{ borderColor: 'var(--border)', color: 'var(--text-2)', background: 'var(--surface)' }}
        >
          <Menu size={18} />
        </button>
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold truncate" style={{ fontFamily: 'var(--font-display)' }}>
            {title}
          </h1>
          <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--text-2)' }}>{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        {action}
        <button
          onClick={onBellClick}
          className="relative p-2 rounded-lg border"
          style={{ borderColor: 'var(--border)', color: 'var(--text-2)', background: 'var(--surface)' }}
        >
          <Bell size={16} />
          {unreadCount > 0 && (
            <span
              className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={{ background: 'var(--red)', color: '#fff' }}
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
        <button onClick={onAvatarClick} className="shrink-0" title="Profile">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || 'User'}
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full object-cover"
              style={{ border: '1px solid var(--border)' }}
            />
          ) : (
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ background: 'var(--accent)', color: 'var(--surface)' }}
            >
              {initial}
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
