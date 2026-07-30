import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useApplications } from './hooks/useApplications';
import { useTheme } from './hooks/useTheme';
import { LoginScreen } from './components/LoginScreen';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ApplicationTable } from './components/ApplicationTable';
import { ApplicationForm } from './components/ApplicationForm';
import type { JobApplication } from './types';

export default function App() {
  const { user, loading: authLoading, login, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const {
    applications,
    addApplication,
    updateApplication,
    deleteApplication,
    exportBackup,
    importBackup,
  } = useApplications(user?.uid);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<JobApplication | null>(null);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <p style={{ color: 'var(--text-2)' }}>Loading…</p>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen onLogin={login} />;
  }

  function openAdd() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(app: JobApplication) {
    setEditing(app);
    setFormOpen(true);
  }

  async function handleSave(data: any) {
    if (editing) {
      await updateApplication(editing.id, data);
    } else {
      await addApplication({ ...data, ownerId: user!.uid });
    }
    setFormOpen(false);
    setEditing(null);
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Header
        dark={dark}
        onToggleTheme={toggle}
        onExport={exportBackup}
        onImport={(file) => importBackup(file, user.uid)}
        onLogout={logout}
        onAdd={openAdd}
        userEmail={user.email}
      />
      <main className="max-w-6xl mx-auto px-5 py-6">
        <Dashboard applications={applications} />
        <ApplicationTable applications={applications} onEdit={openEdit} onDelete={deleteApplication} />
      </main>

      {formOpen && (
        <ApplicationForm
          initial={editing}
          onClose={() => {
            setFormOpen(false);
            setEditing(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
