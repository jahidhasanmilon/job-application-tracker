import { PageHeader, type HeaderUser } from '../components/PageHeader';
import type { JobApplication } from '../types';
import { Download, Upload, Trash2, Mail, Calendar, Clock, ShieldCheck } from 'lucide-react';
import { useRef } from 'react';

interface ProfileUser extends HeaderUser {
  metadata?: { creationTime?: string; lastSignInTime?: string };
}

interface Props {
  user?: ProfileUser | null;
  applications: JobApplication[];
  onExport: () => void;
  onImport: (file: File) => void;
  onMenuClick?: () => void;
}

function formatDate(value?: string) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

export function ProfilePage({ user, applications, onExport, onImport, onMenuClick }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const initial = (user?.displayName || user?.email || 'U').charAt(0).toUpperCase();

  const details = [
    { label: 'Email', value: user?.email || '—', icon: Mail },
    { label: 'Signed in with', value: 'Google', icon: ShieldCheck },
    { label: 'Member since', value: formatDate(user?.metadata?.creationTime), icon: Calendar },
    { label: 'Last sign-in', value: formatDate(user?.metadata?.lastSignInTime), icon: Clock },
  ];

  return (
    <div>
      <PageHeader title="Profile" subtitle="Manage your account and data." user={user} onMenuClick={onMenuClick} />

      <div className="rounded-xl border p-5 mb-5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-4 mb-5">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || 'User'}
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-full object-cover shrink-0"
              style={{ border: '1px solid var(--border)' }}
            />
          ) : (
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold shrink-0"
              style={{ background: 'var(--accent)', color: 'var(--surface)' }}
            >
              {initial}
            </div>
          )}
          <div>
            <p className="font-semibold">{user?.displayName || 'Unnamed user'}</p>
            <p className="text-xs" style={{ color: 'var(--text-2)' }}>{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
          {details.map((d) => (
            <div key={d.label} className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'var(--surface-2)', color: 'var(--text-2)' }}
              >
                <d.icon size={14} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px]" style={{ color: 'var(--text-2)' }}>{d.label}</p>
                <p className="text-sm font-medium truncate">{d.value}</p>
              </div>
            </div>
          ))}
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
