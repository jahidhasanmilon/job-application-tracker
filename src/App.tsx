import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useApplications } from './hooks/useApplications';
import { useTheme } from './hooks/useTheme';
import { LoginScreen } from './components/LoginScreen';
import { Sidebar, type PageKey } from './components/Sidebar';
import { ApplicationForm } from './components/ApplicationForm';
import { DashboardPage } from './pages/DashboardPage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { TrackerPage } from './pages/TrackerPage';
import { ProfilePage } from './pages/ProfilePage';
import type { JobApplication, ApplicationStatus } from './types';

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

  const [page, setPage] = useState<PageKey>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState<boolean>(() => window.localStorage?.getItem('sidebar-collapsed') === 'true');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<JobApplication | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<ApplicationStatus | undefined>(undefined);

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

  function openAdd(status?: ApplicationStatus) {
    setEditing(null);
    setDefaultStatus(status);
    setFormOpen(true);
  }

  function openEdit(app: JobApplication) {
    setEditing(app);
    setDefaultStatus(undefined);
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
    setDefaultStatus(undefined);
  }

  return (
    <div className="flex" style={{ background: 'var(--bg)' }}>
      <Sidebar
        active={page}
        onNavigate={setPage}
        dark={dark}
        onToggleTheme={toggle}
        onLogout={logout}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={collapsed}
        onToggleCollapse={() => {
          setCollapsed((c) => {
            window.localStorage?.setItem('sidebar-collapsed', String(!c));
            return !c;
          });
        }}
      />

      <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-5 sm:py-6 max-w-[1400px]">
        {page === 'dashboard' && (
          <DashboardPage
            applications={applications}
            userEmail={user.email}
            onAdd={() => openAdd()}
            onMenuClick={() => setSidebarOpen(true)}
          />
        )}
        {page === 'applications' && (
          <ApplicationsPage
            applications={applications}
            userEmail={user.email}
            onAdd={() => openAdd()}
            onEdit={openEdit}
            onDelete={deleteApplication}
            onMenuClick={() => setSidebarOpen(true)}
          />
        )}
        {page === 'tracker' && (
          <TrackerPage
            applications={applications}
            userEmail={user.email}
            onAddWithStatus={(status) => openAdd(status)}
            onEdit={openEdit}
            onMenuClick={() => setSidebarOpen(true)}
          />
        )}
        {page === 'profile' && (
          <ProfilePage
            userEmail={user.email}
            applications={applications}
            onExport={exportBackup}
            onImport={(file) => importBackup(file, user.uid)}
            onMenuClick={() => setSidebarOpen(true)}
          />
        )}
      </main>

      {formOpen && (
        <ApplicationForm
          initial={editing}
          defaultStatus={defaultStatus}
          onClose={() => {
            setFormOpen(false);
            setEditing(null);
            setDefaultStatus(undefined);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
