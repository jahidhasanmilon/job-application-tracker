import { LayoutDashboard, Briefcase, Kanban, User, Moon, Sun, LogOut, Sprout } from 'lucide-react';

export type PageKey = 'dashboard' | 'applications' | 'tracker' | 'profile';

interface Props {
  active: PageKey;
  onNavigate: (page: PageKey) => void;
  dark: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
}

const NAV_ITEMS: { key: PageKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'applications', label: 'Applications', icon: Briefcase },
  { key: 'tracker', label: 'Tracker', icon: Kanban },
  { key: 'profile', label: 'Profile', icon: User },
];

export function Sidebar({ active, onNavigate, dark, onToggleTheme, onLogout }: Props) {
  return (
    <aside
      className="w-60 shrink-0 h-screen sticky top-0 flex flex-col border-r px-4 py-5"
      style={{ background: 'var(--sidebar-bg)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-center gap-2.5 px-1 mb-1">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
        >
          <Sprout size={18} strokeWidth={2.4} />
        </div>
        <span className="font-bold text-[15px]" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
          Job Trail
        </span>
      </div>
      <p className="text-[11px] px-1 mb-6" style={{ color: 'var(--text-2)' }}>
        Your journey to the right job.
      </p>

      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left"
              style={{
                background: isActive ? 'var(--surface)' : 'transparent',
                color: isActive ? 'var(--accent)' : 'var(--text-2)',
                boxShadow: isActive ? 'var(--shadow)' : 'none',
              }}
            >
              <Icon size={17} strokeWidth={2} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div
        className="rounded-xl p-4 mb-3"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
          style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
        >
          <Sprout size={16} />
        </div>
        <p className="text-xs font-semibold mb-0.5">Stay organized, stay ahead.</p>
        <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-2)' }}>
          Track your progress and land your dream job.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToggleTheme}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium border"
          style={{ borderColor: 'var(--border)', color: 'var(--text-2)', background: 'var(--surface)' }}
        >
          {dark ? <Sun size={14} /> : <Moon size={14} />}
          {dark ? 'Light' : 'Dark'}
        </button>
        <button
          onClick={onLogout}
          title="Sign out"
          className="p-2 rounded-lg border"
          style={{ borderColor: 'var(--border)', color: 'var(--text-2)', background: 'var(--surface)' }}
        >
          <LogOut size={14} />
        </button>
      </div>
    </aside>
  );
}
