import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useApplications } from './hooks/useApplications';
import { useNotifications } from './hooks/useNotifications';
import { useTheme } from './hooks/useTheme';
import { LoginScreen } from './components/LoginScreen';
import { Sidebar, type PageKey } from './components/Sidebar';
import { ApplicationForm } from './components/ApplicationForm';
import { NotificationPanel } from './components/NotificationPanel';
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
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications(user?.uid, user, applications);

  const [page, setPage] = useState<PageKey>('dashboard');
  const [prevPage, setPrevPage] = useState<PageKey>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState<boolean>(() => window.localStorage?.getItem('sidebar-collapsed') === 'true');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<JobApplication | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<ApplicationStatus | undefined>(undefined);
  const [notifOpen, setNotifOpen] = useState(false);

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

  function navigate(next: PageKey) {
    setPrevPage(page);
    setPage(next);
  }

  function handleAvatarClick() {
    if (page === 'profile') {
      navigate(prevPage);
    } else {
      navigate('profile');
    }
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
        onNavigate={navigate}
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

<div
  className="hidden lg:block shrink-0 transition-all duration-200"
  style={{ width: collapsed ? '76px' : '256px' }}
/>

      <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        {page === 'dashboard' && (
          <DashboardPage
            applications={applications}
            user={user}
            onAdd={() => openAdd()}
            onMenuClick={() => setSidebarOpen(true)}
            unreadCount={unreadCount}
            onBellClick={() => setNotifOpen(true)}
            onAvatarClick={handleAvatarClick}
          />
        )}
        {page === 'applications' && (
          <ApplicationsPage
            applications={applications}
            user={user}
            onAdd={() => openAdd()}
            onEdit={openEdit}
            onDelete={deleteApplication}
            onMenuClick={() => setSidebarOpen(true)}
            unreadCount={unreadCount}
            onBellClick={() => setNotifOpen(true)}
            onAvatarClick={handleAvatarClick}
          />
        )}
        {page === 'tracker' && (
          <TrackerPage
            applications={applications}
            user={user}
            onAddWithStatus={(status) => openAdd(status)}
            onEdit={openEdit}
            onMenuClick={() => setSidebarOpen(true)}
            unreadCount={unreadCount}
            onBellClick={() => setNotifOpen(true)}
            onAvatarClick={handleAvatarClick}
          />
        )}
        {page === 'profile' && (
          <ProfilePage
            user={user}
            applications={applications}
            onExport={exportBackup}
            onImport={(file) => importBackup(file, user.uid)}
            onMenuClick={() => setSidebarOpen(true)}
            unreadCount={unreadCount}
            onBellClick={() => setNotifOpen(true)}
            onAvatarClick={handleAvatarClick}
          />
        )}
      </main>

      <NotificationPanel
        open={notifOpen}
        onClose={() => setNotifOpen(false)}
        notifications={notifications}
        onMarkRead={markAsRead}
        onMarkAllRead={markAllAsRead}
      />

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
