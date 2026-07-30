import { LayoutDashboard, Briefcase, Kanban, User, Moon, Sun, LogOut, X, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Logo } from './Logo';

export type PageKey = 'dashboard' | 'applications' | 'tracker' | 'profile';

interface Props {
  active: PageKey;
  onNavigate: (page: PageKey) => void;
  dark: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
  open: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const NAV_ITEMS: { key: PageKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'applications', label: 'Applications', icon: Briefcase },
  { key: 'tracker', label: 'Tracker', icon: Kanban },
  { key: 'profile', label: 'Profile', icon: User },
];

export function Sidebar({ active, onNavigate, dark, onToggleTheme, onLogout, open, onClose, collapsed, onToggleCollapse }: Props) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={onClose}
        />
      )}

      <aside
        className={`shrink-0 h-screen flex flex-col border-r py-5 fixed top-0 left-0 z-50 transition-all duration-200 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
        style={{
          background: 'var(--sidebar-bg)',
          borderColor: 'var(--border)',
          width: collapsed ? '76px' : '256px',
          paddingLeft: collapsed ? '10px' : '16px',
          paddingRight: collapsed ? '10px' : '16px',
        }}
      >
        <div className={`flex items-center mb-1 ${collapsed ? 'flex-col gap-3' : 'justify-between px-1'}`}>
          <div className={`flex items-center gap-2.5 ${collapsed ? 'flex-col' : ''}`}>
            <Logo size={32} />
            {!collapsed && (
              <span className="font-bold text-[16px]" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
                Trackly
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex p-1.5 rounded-md"
              style={{ color: 'var(--text-2)' }}
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
            </button>
            <button onClick={onClose} className="lg:hidden p-1" style={{ color: 'var(--text-2)' }}>
              <X size={18} />
            </button>
          </div>
        </div>
        {!collapsed && (
          <p className="text-[11px] px-1 mb-6" style={{ color: 'var(--text-2)' }}>
            Your journey to the right job.
          </p>
        )}
        {collapsed && <div className="mb-4" />}

        <nav className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  onNavigate(item.key);
                  onClose();
                }}
                title={collapsed ? item.label : undefined}
                className={`w-full flex items-center rounded-lg text-sm font-medium transition-colors ${
                  collapsed ? 'justify-center px-0 py-2.5' : 'gap-3 px-3 py-2.5 text-left'
                }`}
                style={{
                  background: isActive ? 'var(--accent-light)' : 'transparent',
                  color: isActive ? 'var(--accent)' : 'var(--text-2)',
                }}
              >
                <Icon size={17} strokeWidth={2} />
                {!collapsed && item.label}
              </button>
            );
          })}
        </nav>

        {!collapsed && (
          <div
            className="rounded-xl p-4 mb-3 hidden sm:block"
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
          >
            <div className="mb-2">
              <Logo size={28} />
            </div>
            <p className="text-xs font-semibold mb-0.5">Stay organized, stay ahead.</p>
            <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-2)' }}>
              Track your progress and land your dream job.
            </p>
          </div>
        )}

        <div className={`flex items-center gap-2 ${collapsed ? 'flex-col' : ''}`}>
          <button
            onClick={onToggleTheme}
            title={dark ? 'Switch to light' : 'Switch to dark'}
            className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium border ${collapsed ? 'w-full' : 'flex-1'}`}
            style={{ borderColor: 'var(--border)', color: 'var(--text-2)', background: 'var(--surface)' }}
          >
            {dark ? <Sun size={14} /> : <Moon size={14} />}
            {!collapsed && (dark ? 'Light' : 'Dark')}
          </button>
          <button
            onClick={onLogout}
            title="Sign out"
            className="p-2 rounded-lg border shrink-0"
            style={{ borderColor: 'var(--border)', color: 'var(--text-2)', background: 'var(--surface)' }}
          >
            <LogOut size={14} />
          </button>
        </div>
      </aside>
    </>
  );
}
