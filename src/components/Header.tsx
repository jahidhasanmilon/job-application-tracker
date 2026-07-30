import { Moon, Sun, Download, Upload, LogOut, Plus } from 'lucide-react';
import { useRef } from 'react';

interface Props {
  dark: boolean;
  onToggleTheme: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
  onLogout: () => void;
  onAdd: () => void;
  userEmail?: string | null;
}

export function Header({ dark, onToggleTheme, onExport, onImport, onLogout, onAdd, userEmail }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <header
      className="sticky top-0 z-30 border-b backdrop-blur"
      style={{ borderColor: 'var(--border)', background: 'color-mix(in srgb, var(--bg) 85%, transparent)' }}
    >
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm"
            style={{ background: 'var(--accent)', color: 'var(--surface)' }}
          >
            JT
          </div>
          <div>
            <h1 className="font-bold leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Job Trail
            </h1>
            <p className="text-xs" style={{ color: 'var(--text-2)' }}>{userEmail}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onAdd}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-transform hover:scale-[1.03]"
            style={{ background: 'var(--accent)', color: 'var(--surface)' }}
          >
            <Plus size={16} /> Add
          </button>
          <button
            title="Export backup (JSON)"
            onClick={onExport}
            className="p-2 rounded-lg border transition-colors"
            style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}
          >
            <Download size={16} />
          </button>
          <button
            title="Import backup (JSON)"
            onClick={() => fileRef.current?.click()}
            className="p-2 rounded-lg border transition-colors"
            style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}
          >
            <Upload size={16} />
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onImport(f);
              e.target.value = '';
            }}
          />
          <button
            title="Toggle theme"
            onClick={onToggleTheme}
            className="p-2 rounded-lg border transition-colors"
            style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            title="Sign out"
            onClick={onLogout}
            className="p-2 rounded-lg border transition-colors"
            style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
