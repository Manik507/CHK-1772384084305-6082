import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Home, Search, Camera, Bell, Clock, User, Settings, LogOut, Moon, Sun, Pill, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const navItems = [
  { to: '/dashboard', icon: Home, label: 'Dashboard' },
  { to: '/search', icon: Search, label: 'Search' },
  { to: '/scanner', icon: Camera, label: 'Scanner' },
  { to: '/reminders', icon: Bell, label: 'Reminders' },
  { to: '/history', icon: Clock, label: 'History' },
  { to: '/profile', icon: User, label: 'Profile' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function MainLayout() {
  const { logout, currentUser, isAdmin } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
      toast.success('Logged out successfully');
    } catch {
      toast.error('Failed to log out');
    }
  }

  return (
    <div className="flex h-screen w-full bg-transparent overflow-hidden">
      {/* Sidebar */}
      <aside className={`w-72 flex flex-col m-4 mr-0 rounded-2xl premium-glass z-10 transition-all duration-300`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-[var(--border-color)]">
          <div className="p-2.5 bg-gradient-to-br from-brand-light to-brand-dark rounded-xl shadow-lg shadow-brand/30">
            <Pill className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gradient">MediHelper</span>
        </div>

        {/* User Info */}
        <div className="px-6 py-5 border-b border-[var(--border-color)]">
          <p className="text-sm font-semibold truncate text-[var(--text-primary)]">{currentUser?.displayName || 'User'}</p>
          <p className="text-xs text-[var(--text-secondary)] truncate mt-1">{currentUser?.email}</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 text-sm font-medium ${
                  isActive
                    ? 'bg-gradient-to-r from-brand to-brand-dark text-white shadow-lg shadow-brand/20 translate-x-1'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--glass-border)] hover:text-[var(--text-primary)] hover:translate-x-1'
                }`
              }
            >
              <Icon className={`w-5 h-5 ${darkMode ? 'opacity-80' : ''}`} />
              {label}
            </NavLink>
          ))}
          {isAdmin && (
            <div className="pt-4 mt-4 border-t border-[var(--border-color)]">
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 text-sm font-medium ${
                    isActive
                      ? 'bg-gradient-to-r from-accent to-accent-dark text-white shadow-lg shadow-accent/20 translate-x-1'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--glass-border)] hover:text-accent hover:translate-x-1'
                  }`
                }
              >
                <Shield className="w-5 h-5" />
                Admin Dashboard
              </NavLink>
            </div>
          )}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--border-color)] space-y-2 flex-shrink-0">
          <button
            onClick={toggleDarkMode}
            className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 text-[var(--text-secondary)] hover:bg-[var(--glass-border)] hover:text-[var(--text-primary)]`}
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-indigo-500" />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 z-0">
        <div className="max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
