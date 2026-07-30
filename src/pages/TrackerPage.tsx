import { PageHeader } from '../components/PageHeader';
import type { JobApplication, ApplicationStatus } from '../types';
import { STATUS_LIST, STATUS_COLOR, PRIORITY_COLOR } from '../types';

interface Props {
  applications: JobApplication[];
  userEmail?: string | null;
  onAddWithStatus: (status: ApplicationStatus) => void;
  onEdit: (app: JobApplication) => void;
}

export function TrackerPage({ applications, userEmail, onAddWithStatus, onEdit }: Props) {
  return (
    <div>
      <PageHeader title="Tracker" subtitle="Track and organize your applications visually." userEmail={userEmail} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {STATUS_LIST.map((status) => {
          const items = applications.filter((a) => a.status === status);
          return (
            <div key={status} className="rounded-xl border p-3" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: STATUS_COLOR[status] }} />
                  <p className="text-sm font-semibold">{status}</p>
                </div>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: 'var(--surface)', color: 'var(--text-2)' }}
                >
                  {items.length}
                </span>
              </div>

              <div className="space-y-2 mb-2">
                {items.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => onEdit(a)}
                    className="w-full text-left rounded-lg p-3 border animate-rise"
                    style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div
                        className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0"
                        style={{ background: 'var(--surface-2)', color: 'var(--text-2)' }}
                      >
                        {a.company.charAt(0).toUpperCase()}
                      </div>
                      <p className="text-sm font-semibold truncate">{a.company}</p>
                    </div>
                    <p className="text-xs truncate mb-2" style={{ color: 'var(--text-2)' }}>{a.role}</p>
                    <div className="flex items-center justify-between">
                      {a.priority ? (
                        <span className="text-[11px] font-medium" style={{ color: PRIORITY_COLOR[a.priority] }}>
                          {a.priority}
                        </span>
                      ) : <span />}
                      <span className="text-[11px]" style={{ color: 'var(--ghost)' }}>
                        {new Date(a.dateApplied).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => onAddWithStatus(status)}
                className="w-full text-xs font-semibold py-2 rounded-lg border border-dashed"
                style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}
              >
                + Add Application
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
