import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { FileText, Users, Award, TrendingUp, Bookmark, Bell } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import type { JobApplication } from '../types';
import { STATUS_COLOR, STATUS_LIST } from '../types';

interface Props {
  applications: JobApplication[];
  userEmail?: string | null;
  onAdd: () => void;
  onMenuClick?: () => void;
}

export function DashboardPage({ applications, userEmail, onAdd, onMenuClick }: Props) {
  const total = applications.length;
  const interviews = applications.filter((a) => a.status === 'Interview').length;
  const offers = applications.filter((a) => a.status === 'Offer').length;
  const responded = applications.filter((a) => a.status !== 'Applied' && a.status !== 'Saved').length;
  const responseRate = total ? Math.round((responded / total) * 100) : 0;

  const chartData = STATUS_LIST.map((s) => ({
    name: s,
    value: applications.filter((a) => a.status === s).length,
  })).filter((d) => d.value > 0);

  const stats = [
    { label: 'Applications', value: total, icon: FileText, tint: 'var(--blue-light)', color: 'var(--blue)' },
    { label: 'Interviews', value: interviews, icon: Users, tint: 'var(--orange-light)', color: 'var(--orange)' },
    { label: 'Offers', value: offers, icon: Award, tint: 'var(--accent-light)', color: 'var(--accent)' },
    { label: 'Response Rate', value: `${responseRate}%`, icon: TrendingUp, tint: 'var(--yellow-light)', color: 'var(--yellow)' },
  ];

  const recent = [...applications].sort((a, b) => b.createdAt - a.createdAt).slice(0, 5);
  const reminders = applications
    .filter((a) => a.followUpDate)
    .sort((a, b) => new Date(a.followUpDate!).getTime() - new Date(b.followUpDate!).getTime())
    .slice(0, 4);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle={`Welcome back${userEmail ? ', ' + userEmail.split('@')[0] : ''}! Here's your job search overview.`}
        userEmail={userEmail}
        onMenuClick={onMenuClick}
        action={
          <button
            onClick={onAdd}
            className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap"
            style={{ background: 'var(--accent)', color: 'var(--surface)' }}
          >
            + Add
          </button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-4 border animate-rise"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium" style={{ color: 'var(--text-2)' }}>{s.label}</span>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: s.tint, color: s.color }}
              >
                <s.icon size={15} />
              </div>
            </div>
            <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        <div className="lg:col-span-2 rounded-xl p-5 border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <p className="text-sm font-semibold mb-4">Recent Applications</p>
          {recent.length === 0 ? (
            <p className="text-sm py-8 text-center" style={{ color: 'var(--ghost)' }}>No applications yet — add your first one.</p>
          ) : (
            <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
              {recent.map((a) => (
                <div key={a.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ background: 'var(--surface-2)', color: 'var(--text-2)' }}
                    >
                      {a.company.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate">{a.role}</p>
                      <p className="text-xs truncate" style={{ color: 'var(--text-2)' }}>{a.company}{a.location ? ` · ${a.location}` : ''}</p>
                    </div>
                  </div>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0"
                    style={{ background: 'var(--surface-2)', color: STATUS_COLOR[a.status] }}
                  >
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl p-5 border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <p className="text-sm font-semibold mb-4">Applications by Status</p>
          {chartData.length > 0 ? (
            <div className="flex flex-col items-center">
              <div style={{ width: 140, height: 140 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={chartData} dataKey="value" innerRadius={40} outerRadius={65} strokeWidth={0}>
                      {chartData.map((d) => (
                        <Cell key={d.name} fill={STATUS_COLOR[d.name as keyof typeof STATUS_COLOR]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full mt-3 space-y-1.5">
                {chartData.map((d) => (
                  <div key={d.name} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5" style={{ color: 'var(--text-2)' }}>
                      <span className="w-2 h-2 rounded-full" style={{ background: STATUS_COLOR[d.name as keyof typeof STATUS_COLOR] }} />
                      {d.name}
                    </span>
                    <span className="font-semibold">{d.value} ({total ? Math.round((d.value / total) * 100) : 0}%)</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm py-8 text-center" style={{ color: 'var(--ghost)' }}>Add an application to see your breakdown.</p>
          )}
        </div>
      </div>

      <div className="rounded-xl p-5 border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 mb-4">
          <Bell size={15} style={{ color: 'var(--accent)' }} />
          <p className="text-sm font-semibold">Upcoming Follow-ups</p>
        </div>
        {reminders.length === 0 ? (
          <p className="text-sm py-4 text-center" style={{ color: 'var(--ghost)' }}>No follow-ups scheduled.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {reminders.map((a) => (
              <div key={a.id} className="rounded-lg p-3 border" style={{ borderColor: 'var(--border)', background: 'var(--surface-2)' }}>
                <div className="flex items-center gap-1.5 mb-1" style={{ color: 'var(--accent)' }}>
                  <Bookmark size={12} />
                  <span className="text-xs font-semibold">Follow-up</span>
                </div>
                <p className="text-sm font-semibold truncate">{a.company}</p>
                <p className="text-xs" style={{ color: 'var(--text-2)' }}>{new Date(a.followUpDate!).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
