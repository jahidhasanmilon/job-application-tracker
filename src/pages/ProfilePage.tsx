import { PageHeader } from '../components/PageHeader';
import type { JobApplication } from '../types';
import { Download, Upload, Trash2 } from 'lucide-react';
import { useRef } from 'react';

interface Props {
  userEmail?: string | null;
  applications: JobApplication[];
  onExport: () => void;
  onImport: (file: File) => void;
  onMenuClick?: () => void;
}

export function ProfilePage({ userEmail, applications, onExport, onImport, onMenuClick }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const initial = (userEmail || 'U').charAt(0).toUpperCase();

  return (
    <div>
      <PageHeader title="Profile" subtitle="Manage your account and data." userEmail={userEmail} onMenuClick={onMenuClick} />

      <div className="rounded-xl border p-5 mb-5 flex items-center gap-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold shrink-0"
          style={{ background: 'var(--accent)', color: 'var(--surface)' }}
        >
          {initial}
        </div>
        <div>
          <p className="font-semibold">{userEmail}</p>
          <p className="text-xs" style={{ color: 'var(--text-2)' }}>Signed in with Google</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="rounded-xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <p className="text-sm font-semibold mb-1">Your data</p>
          <p className="text-xs mb-4" style={{ color: 'var(--text-2)' }}>
            {applications.length} application{applications.length !== 1 ? 's' : ''} tracked, synced automatically to your account.
          </p>
          <div className="flex gap-2">
            <button
              onClick={onExport}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold border"
              style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
            >
              <Download size={14} /> Export backup
            </button>
            <button
              onClick={() => fileRef.current?.click()}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold border"
              style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
            >
              <Upload size={14} /> Import backup
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
          </div>
        </div>

        <div className="rounded-xl border p-5" style={{ background: 'var(--red-light)', borderColor: 'var(--border)' }}>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--red)' }}>Danger zone</p>
          <p className="text-xs mb-4" style={{ color: 'var(--text-2)' }}>
            Deleting applications is permanent. Export a backup first if you're unsure.
          </p>
          <button
            disabled
            className="flex items-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold border opacity-60 cursor-not-allowed"
            style={{ borderColor: 'var(--red)', color: 'var(--red)' }}
          >
            <Trash2 size={14} /> Delete all data
          </button>
        </div>
      </div>
    </div>
  );
}
