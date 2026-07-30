import { Bell } from 'lucide-react';
import type { ReactNode } from 'react';

interface Props {
  title: string;
  subtitle: string;
  userEmail?: string | null;
  action?: ReactNode;
}

export function PageHeader({ title, subtitle, userEmail, action }: Props) {
  const initial = (userEmail || 'U').charAt(0).toUpperCase();
  return (
    <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
      <div>
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
          {title}
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        {action}
        <button
          className="p-2 rounded-lg border"
          style={{ borderColor: 'var(--border)', color: 'var(--text-2)', background: 'var(--surface)' }}
        >
          <Bell size={16} />
        </button>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
          style={{ background: 'var(--accent)', color: 'var(--surface)' }}
        >
          {initial}
        </div>
      </div>
    </div>
  );
}
