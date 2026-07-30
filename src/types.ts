export type ApplicationStatus =
  | 'Applied'
  | 'Interview'
  | 'Offer'
  | 'Rejected'
  | 'Ghosted';

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
  createdAt: number;
  updatedAt: number;
}

export const STATUS_LIST: ApplicationStatus[] = [
  'Applied',
  'Interview',
  'Offer',
  'Rejected',
  'Ghosted',
];

export const STATUS_COLOR: Record<ApplicationStatus, string> = {
  Applied: '#2f6f5e',
  Interview: '#b5762a',
  Offer: '#2f6f5e',
  Rejected: '#b3432f',
  Ghosted: '#8a8578',
};
