import { useEffect, useRef, useState } from 'react';
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  writeBatch,
} from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { db } from '../firebase';
import type { AppNotification, JobApplication } from '../types';

export function useNotifications(uid: string | undefined, user: User | null, applications: JobApplication[]) {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const welcomeCheckedRef = useRef(false);

  useEffect(() => {
    if (!uid) {
      setNotifications([]);
      setLoading(false);
      welcomeCheckedRef.current = false;
      return;
    }
    const q = query(collection(db, 'notifications'), where('ownerId', '==', uid));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() } as AppNotification));
        rows.sort((a, b) => b.createdAt - a.createdAt);
        setNotifications(rows);
        setLoading(false);

        if (!welcomeCheckedRef.current) {
          welcomeCheckedRef.current = true;
          const created = user?.metadata?.creationTime ? new Date(user.metadata.creationTime).getTime() : 0;
          const lastSignIn = user?.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).getTime() : 0;
          const isBrandNewAccount = created > 0 && lastSignIn > 0 && Math.abs(lastSignIn - created) < 5 * 60 * 1000;
          if (isBrandNewAccount && rows.length === 0) {
            addDoc(collection(db, 'notifications'), {
              ownerId: uid,
              type: 'welcome',
              title: 'Welcome to Trackly!',
              message: `Hey ${user?.displayName?.split(' ')[0] || 'there'}, glad you're here. Add your first job application to get started.`,
              read: false,
              createdAt: Date.now(),
            });
          }
        }
      },
      () => setLoading(false)
    );
    return unsub;
  }, [uid]);

  useEffect(() => {
    if (!uid || loading || applications.length === 0) return;
    const today = new Date().toISOString().slice(0, 10);
    const existingRefs = new Set(
      notifications.filter((n) => n.type === 'followup').map((n) => `${n.refId}_${n.refDate}`)
    );
    applications.forEach((a) => {
      if (!a.followUpDate || a.followUpDate > today) return;
      const key = `${a.id}_${a.followUpDate}`;
      if (existingRefs.has(key)) return;
      addDoc(collection(db, 'notifications'), {
        ownerId: uid,
        type: 'followup',
        title: 'Follow-up due',
        message: `Time to follow up with ${a.company} for the ${a.role} role.`,
        read: false,
        createdAt: Date.now(),
        refId: a.id,
        refDate: a.followUpDate,
      });
    });
  }, [uid, loading, applications, notifications]);

  async function markAsRead(id: string) {
    await updateDoc(doc(db, 'notifications', id), { read: true });
  }

  async function markAllAsRead() {
    const unread = notifications.filter((n) => !n.read);
    if (unread.length === 0) return;
    const batch = writeBatch(db);
    unread.forEach((n) => batch.update(doc(db, 'notifications', n.id), { read: true }));
    await batch.commit();
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return { notifications, loading, unreadCount, markAsRead, markAllAsRead };
}
