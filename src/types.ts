export type ApplicationStatus =
  | 'Saved'
  | 'Applied'
  | 'Interview'
  | 'Offer'
  | 'Rejected';

export interface JobApplication {
  id: string;
  ownerId: string;
  company: string;
  role: string;
  jobUrl?: string;
  location?: string;
  dateApplied: string; // ISO date
  status: ApplicationStatus;
  followUpDate?: string; // ISO date
  salary?: string;
  contactPerson?: string;
  notes?: string;
  priority?: 'Low' | 'Medium' | 'High';
  createdAt: number;
  updatedAt: number;
}

export const STATUS_LIST: ApplicationStatus[] = [
  'Saved',
  'Applied',
  'Interview',
  'Offer',
  'Rejected',
];

export const STATUS_COLOR: Record<ApplicationStatus, string> = {
  Saved: 'var(--text-2)',
  Applied: 'var(--blue)',
  Interview: 'var(--orange)',
  Offer: 'var(--accent)',
  Rejected: 'var(--red)',
};

export const STATUS_BG: Record<ApplicationStatus, string> = {
  Saved: 'var(--surface-2)',
  Applied: 'var(--blue-light)',
  Interview: 'var(--orange-light)',
  Offer: 'var(--accent-light)',
  Rejected: 'var(--red-light)',
};

export const PRIORITY_COLOR: Record<string, string> = {
  Low: 'var(--text-2)',
  Medium: 'var(--orange)',
  High: 'var(--red)',
};

export type NotificationType = 'welcome' | 'followup';

export interface AppNotification {
  id: string;
  ownerId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: number;
  refId?: string;
  refDate?: string;
}
