import { useState } from 'react';
import { X } from 'lucide-react';
import type { JobApplication, ApplicationStatus } from '../types';
import { STATUS_LIST } from '../types';

interface Props {
  initial?: JobApplication | null;
  onClose: () => void;
  onSave: (data: Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export function ApplicationForm({ initial, onClose, onSave }: Props) {
  const [company, setCompany] = useState(initial?.company ?? '');
  const [role, setRole] = useState(initial?.role ?? '');
  const [jobUrl, setJobUrl] = useState(initial?.jobUrl ?? '');
  const [location, setLocation] = useState(initial?.location ?? '');
  const [dateApplied, setDateApplied] = useState(initial?.dateApplied ?? new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState<ApplicationStatus>(initial?.status ?? 'Applied');
  const [followUpDate, setFollowUpDate] = useState(initial?.followUpDate ?? '');
  const [salary, setSalary] = useState(initial?.salary ?? '');
  const [contactPerson, setContactPerson] = useState(initial?.contactPerson ?? '');
  const [notes, setNotes] = useState(initial?.notes ?? '');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!company.trim() || !role.trim()) return;
    onSave({
      ownerId: (initial as any)?.ownerId,
      company: company.trim(),
      role: role.trim(),
      jobUrl: jobUrl.trim() || undefined,
      location: location.trim() || undefined,
      dateApplied,
      status,
      followUpDate: followUpDate || undefined,
      salary: salary.trim() || undefined,
      contactPerson: contactPerson.trim() || undefined,
      notes: notes.trim() || undefined,
    } as any);
  }

  const inputClass =
    'w-full px-3 py-2 rounded-lg border text-sm outline-none focus:ring-2 transition-shadow';
  const inputStyle = {
    background: 'var(--surface-2)',
    borderColor: 'var(--border)',
    color: 'var(--text)',
  } as React.CSSProperties;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <form
        onSubmit={submit}
        className="w-full max-w-lg rounded-2xl p-6 border animate-rise max-h-[90vh] overflow-y-auto"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>
            {initial ? 'Edit application' : 'New application'}
          </h2>
          <button type="button" onClick={onClose} style={{ color: 'var(--text-2)' }}>
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-2)' }}>Company *</label>
            <input required className={inputClass} style={inputStyle} value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. Delivery Hero" />
          </div>
          <div className="col-span-2">
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-2)' }}>Role *</label>
            <input required className={inputClass} style={inputStyle} value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Junior Frontend Developer" />
          </div>
          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-2)' }}>Date applied</label>
            <input type="date" className={inputClass} style={inputStyle} value={dateApplied} onChange={(e) => setDateApplied(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-2)' }}>Status</label>
            <select className={inputClass} style={inputStyle} value={status} onChange={(e) => setStatus(e.target.value as ApplicationStatus)}>
              {STATUS_LIST.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-2)' }}>Location</label>
            <input className={inputClass} style={inputStyle} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Berlin, Remote..." />
          </div>
          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-2)' }}>Follow-up date</label>
            <input type="date" className={inputClass} style={inputStyle} value={followUpDate} onChange={(e) => setFollowUpDate(e.target.value)} />
          </div>
          <div className="col-span-2">
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-2)' }}>Job posting URL</label>
            <input className={inputClass} style={inputStyle} value={jobUrl} onChange={(e) => setJobUrl(e.target.value)} placeholder="https://..." />
          </div>
          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-2)' }}>Contact person</label>
            <input className={inputClass} style={inputStyle} value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-2)' }}>Salary discussed</label>
            <input className={inputClass} style={inputStyle} value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="€45,000" />
          </div>
          <div className="col-span-2">
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-2)' }}>Notes</label>
            <textarea className={inputClass} style={inputStyle} rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Interview feedback, prep notes..." />
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          <button
            type="submit"
            className="flex-1 py-2.5 rounded-lg font-semibold text-sm"
            style={{ background: 'var(--accent)', color: 'var(--surface)' }}
          >
            {initial ? 'Save changes' : 'Add application'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg font-semibold text-sm border"
            style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
