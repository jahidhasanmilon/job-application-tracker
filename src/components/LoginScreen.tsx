import { Sprout, LayoutDashboard, Bookmark, Bell, TrendingUp } from 'lucide-react';

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg)' }}>
      <div
        className="hidden lg:flex w-[46%] flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'var(--sidebar-bg)' }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
          >
            <Sprout size={19} strokeWidth={2.4} />
          </div>
          <span className="font-bold text-lg" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
            Job Trail
          </span>
        </div>

        <div className="max-w-md">
          <h1 className="text-4xl font-bold leading-tight mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Track every opportunity clearly.
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-2)' }}>
            Manage applications, interviews, and follow-ups in one organized workspace that never forgets.
          </p>
        </div>

        <div
          className="rounded-2xl p-5 border animate-rise"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: 'Applications', value: '24', icon: LayoutDashboard, color: 'var(--blue)' },
              { label: 'Interviews', value: '6', icon: TrendingUp, color: 'var(--orange)' },
              { label: 'Offers', value: '2', icon: Bookmark, color: 'var(--accent)' },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center mb-2"
                  style={{ background: 'var(--surface-2)', color: s.color }}
                >
                  <s.icon size={13} />
                </div>
                <p className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)' }}>{s.value}</p>
                <p className="text-[11px]" style={{ color: 'var(--text-2)' }}>{s.label}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs pt-3 border-t" style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}>
            <Bell size={13} style={{ color: 'var(--accent)' }} />
            Never miss a follow-up again.
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-sm w-full text-center animate-rise">
          <div className="lg:hidden flex items-center justify-center gap-2.5 mb-8">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
            >
              <Sprout size={19} strokeWidth={2.4} />
            </div>
            <span className="font-bold text-lg" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
              Job Trail
            </span>
          </div>

          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            Welcome back
          </h2>
          <p className="text-sm mb-8" style={{ color: 'var(--text-2)' }}>
            Sign in to continue tracking your applications.
          </p>

          <button
            onClick={onLogin}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm border transition-transform hover:scale-[1.01] active:scale-[0.99]"
            style={{ borderColor: 'var(--border)', background: 'var(--surface)', color: 'var(--text)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.6 5.6 0 0 1-2.4 3.68v3h3.87c2.27-2.09 3.55-5.17 3.55-8.92z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.87-3c-1.08.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.09A12 12 0 0 0 12 24z"/>
              <path fill="#FBBC05" d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28V6.63H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.37z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.63l4 3.09C6.22 6.86 8.87 4.75 12 4.75z"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-xs mt-6" style={{ color: 'var(--ghost)' }}>
            Your data is private to your account and backed up automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
