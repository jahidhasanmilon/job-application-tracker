import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { JobApplication } from '../types';
import { STATUS_COLOR, STATUS_LIST } from '../types';

export function Dashboard({ applications }: { applications: JobApplication[] }) {
  const total = applications.length;
  const interviews = applications.filter((a) => a.status === 'Interview').length;
  const offers = applications.filter((a) => a.status === 'Offer').length;
  const responseRate = total
    ? Math.round(((total - applications.filter((a) => a.status === 'Applied' || a.status === 'Ghosted').length) / total) * 100)
    : 0;

  const chartData = STATUS_LIST.map((s) => ({
    name: s,
    value: applications.filter((a) => a.status === s).length,
  })).filter((d) => d.value > 0);

  const stats = [
    { label: 'Total applications', value: total },
    { label: 'Interviews', value: interviews },
    { label: 'Offers', value: offers },
    { label: 'Response rate', value: `${responseRate}%` },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-4 border animate-rise"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>{s.value}</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-2)' }}>{s.label}</p>
          </div>
        ))}
      </div>
      <div
        className="rounded-xl p-4 border flex items-center gap-4"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        {chartData.length > 0 ? (
          <>
            <div style={{ width: 80, height: 80 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={chartData} dataKey="value" innerRadius={22} outerRadius={38} strokeWidth={0}>
                    {chartData.map((d) => (
                      <Cell key={d.name} fill={STATUS_COLOR[d.name as keyof typeof STATUS_COLOR]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-1">
              {chartData.map((d) => (
                <div key={d.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5" style={{ color: 'var(--text-2)' }}>
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: STATUS_COLOR[d.name as keyof typeof STATUS_COLOR] }}
                    />
                    {d.name}
                  </span>
                  <span className="font-semibold">{d.value}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-xs" style={{ color: 'var(--ghost)' }}>Add an application to see your breakdown.</p>
        )}
      </div>
    </div>
  );
}
