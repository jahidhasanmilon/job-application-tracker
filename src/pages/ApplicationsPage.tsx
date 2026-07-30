import { useMemo, useState } from 'react';
import { Search, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { StatusBadge } from '../components/StatusBadge';
import type { JobApplication, ApplicationStatus } from '../types';
import { STATUS_LIST, PRIORITY_COLOR } from '../types';

interface Props {
  applications: JobApplication[];
  userEmail?: string | null;
  onAdd: () => void;
  onEdit: (app: JobApplication) => void;
  onDelete: (id: string) => void;
}

export function ApplicationsPage({ applications, userEmail, onAdd, onEdit, onDelete }: Props) {
  const [q, setQ] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'All'>('All');

  const filtered = useMemo(() => {
    return [...applications]
      .filter((a) => {
        const matchesQ = !q || a.company.toLowerCase().includes(q.toLowerCase()) || a.role.toLowerCase().includes(q.toLowerCase());
        const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
        return matchesQ && matchesStatus;
      })
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }, [applications, q, statusFilter]);

  return (
    <div>
      <PageHeader
        title="Applications"
        subtitle="Manage and track all your job applications."
        userEmail={userEmail}
        action={
          <button
            onClick={onAdd}
            className="px-4 py-2 rounded-lg text-sm font-semibold"
            style={{ background: 'var(--accent)', color: 'var(--surface)' }}
          >
            + Add Application
          </button>
        }
      />

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--ghost)' }} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search company or role..."
            className="w-full pl-9 pr-3 py-2.5 rounded-lg border text-sm outline-none"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="px-3 py-2.5 rounded-lg border text-sm outline-none"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
        >
          <option value="All">All statuses</option>
          {STATUS_LIST.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="rounded-xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <p className="font-semibold mb-1">No applications found</p>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}>Try a different search or add a new application.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'var(--surface-2)' }}>
                  {['Company', 'Role', 'Status', 'Applied Date', 'Priority', 'Actions'].map((h) => (
                    <th key={h} className="text-left font-semibold px-4 py-3" style={{ color: 'var(--text-2)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id} className="border-t" style={{ borderColor: 'var(--border)' }}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                          style={{ background: 'var(--surface-2)', color: 'var(--text-2)' }}
                        >
                          {a.company.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold">{a.company}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3" style={{ color: 'var(--text-2)' }}>{a.role}</td>
                    <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                    <td className="px-4 py-3" style={{ color: 'var(--text-2)' }}>{new Date(a.dateApplied).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      {a.priority && (
                        <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: PRIORITY_COLOR[a.priority] }}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: PRIORITY_COLOR[a.priority] }} />
                          {a.priority}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {a.jobUrl && (
                          <a href={a.jobUrl} target="_blank" rel="noreferrer" className="p-1.5 rounded-md" style={{ color: 'var(--text-2)' }}>
                            <ExternalLink size={14} />
                          </a>
                        )}
                        <button onClick={() => onEdit(a)} className="p-1.5 rounded-md" style={{ color: 'var(--text-2)' }}>
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => onDelete(a.id)} className="p-1.5 rounded-md" style={{ color: 'var(--red)' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
