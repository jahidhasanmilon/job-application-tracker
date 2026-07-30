import type { ApplicationStatus } from '../types';
import { STATUS_COLOR, STATUS_BG } from '../types';

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
      style={{ backgroundColor: STATUS_BG[status], color: STATUS_COLOR[status] }}
    >
      {status}
    </span>
  );
}
