import { useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { JobApplication } from '../types';

export function useApplications(uid: string | undefined) {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setApplications([]);
      setLoading(false);
      return;
    }
    const q = query(collection(db, 'applications'), where('ownerId', '==', uid));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() } as JobApplication));
        rows.sort((a, b) => b.updatedAt - a.updatedAt);
        setApplications(rows);
        setLoading(false);
      },
      () => setLoading(false)
    );
    return unsub;
  }, [uid]);

  async function addApplication(data: Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = Date.now();
    await addDoc(collection(db, 'applications'), { ...data, createdAt: now, updatedAt: now });
  }

  async function updateApplication(id: string, data: Partial<JobApplication>) {
    await updateDoc(doc(db, 'applications', id), { ...data, updatedAt: Date.now() });
  }

  async function deleteApplication(id: string) {
    await deleteDoc(doc(db, 'applications', id));
  }

  function exportBackup() {
    const blob = new Blob([JSON.stringify(applications, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `job-applications-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function importBackup(file: File, ownerId: string) {
    const text = await file.text();
    const rows = JSON.parse(text) as JobApplication[];
    for (const row of rows) {
      const { id: _drop, createdAt: _c, updatedAt: _u, ...rest } = row;
      await addApplication({ ...rest, ownerId });
    }
  }

  return {
    applications,
    loading,
    addApplication,
    updateApplication,
    deleteApplication,
    exportBackup,
    importBackup,
  };
}
