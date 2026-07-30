export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--bg)' }}>
      <div className="max-w-sm w-full text-center animate-rise">
        <div
          className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center font-display font-bold text-xl"
          style={{ background: 'var(--accent)', color: 'var(--surface)' }}
        >
          JT
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          Job Trail
        </h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-2)' }}>
          Track every application, every follow-up, every offer — in one place that never forgets.
        </p>
        <button
          onClick={onLogin}
          className="w-full py-3 rounded-xl font-semibold text-sm transition-transform hover:scale-[1.02] active:scale-[0.99]"
          style={{ background: 'var(--accent)', color: 'var(--surface)' }}
        >
          Continue with Google
        </button>
        <p className="text-xs mt-6" style={{ color: 'var(--ghost)' }}>
          Your data is private to your account and backed up automatically.
        </p>
      </div>
    </div>
  );
}
