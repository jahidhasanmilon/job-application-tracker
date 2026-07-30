import { useMemo, useState } from 'react';
import { Pencil, Trash2, ExternalLink, Search } from 'lucide-react';
import type { JobApplication, ApplicationStatus } from '../types';
import { STATUS_LIST } from '../types';
import { StatusBadge } from './StatusBadge';

interface Props {
  applications: JobApplication[];
  onEdit: (app: JobApplication) => void;
  onDelete: (id: string) => void;
}

function isFollowUpDue(date?: string) {
  if (!date) return false;
  return new Date(date).getTime() <= Date.now();
}

export function ApplicationTable({ applications, onEdit, onDelete }: Props) {
  const [q, setQ] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'All'>('All');

  const filtered = useMemo(() => {
    return applications.filter((a) => {
      const matchesQ =
        !q ||
        a.company.toLowerCase().includes(q.toLowerCase()) ||
        a.role.toLowerCase().includes(q.toLowerCase());
      const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
      return matchesQ && matchesStatus;
    });
  }, [applications, q, statusFilter]);

  if (applications.length === 0) {
    return (
      <div
        className="rounded-xl border border-dashed p-12 text-center"
        style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}
      >
        <p className="font-semibold mb-1">No applications yet</p>
        <p className="text-sm">Click "Add" to log the first one you send out.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--ghost)' }} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search company or role..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border text-sm outline-none"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="px-3 py-2 rounded-lg border text-sm outline-none"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
        >
          <option value="All">All statuses</option>
          {STATUS_LIST.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        {filtered.map((a) => {
          const due = isFollowUpDue(a.followUpDate) && a.status !== 'Offer' && a.status !== 'Rejected';
          return (
            <div
              key={a.id}
              className="rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center gap-3 animate-rise"
              style={{
                background: 'var(--surface)',
                borderColor: due ? 'var(--warn)' : 'var(--border)',
              }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold">{a.company}</p>
                  <StatusBadge status={a.status} />
                  {due && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: '#b5762a1a', color: 'var(--warn)' }}>
                      Follow up due
                    </span>
                  )}
                </div>
                <p className="text-sm" style={{ color: 'var(--text-2)' }}>{a.role}{a.location ? ` · ${a.location}` : ''}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--ghost)' }}>
                  Applied {new Date(a.dateApplied).toLocaleDateString()}
                  {a.followUpDate ? ` · Follow up ${new Date(a.followUpDate).toLocaleDateString()}` : ''}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {a.jobUrl && (
                  <a href={a.jobUrl} target="_blank" rel="noreferrer" className="p-2 rounded-lg border" style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}>
                    <ExternalLink size={14} />
                  </a>
                )}
                <button onClick={() => onEdit(a)} className="p-2 rounded-lg border" style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}>
                  <Pencil size={14} />
                </button>
                <button onClick={() => onDelete(a.id)} className="p-2 rounded-lg border" style={{ borderColor: 'var(--border)', color: 'var(--danger)' }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
