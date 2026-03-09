import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserReminders, deleteReminder as deleteReminderFS } from '../../firebase/firestoreService';
import { Bell, Plus, Trash2, Clock, Loader, Calendar, Droplets } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RemindersPage() {
  const { currentUser } = useAuth();
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    getUserReminders(currentUser.uid)
      .then(setReminders)
      .catch(() => toast.error('Failed to load reminders'))
      .finally(() => setLoading(false));
  }, [currentUser]);

  async function handleDelete(id) {
    try {
      await deleteReminderFS(id);
      setReminders((prev) => prev.filter((r) => r.id !== id));
      toast.success('Reminder deleted');
    } catch {
      toast.error('Failed to delete reminder');
    }
  }

  return (
    <div className="space-y-8 animate-fade-in pb-10 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl shadow-lg shadow-emerald-500/20">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">Reminders</h1>
            <p className="text-[var(--text-secondary)] text-sm mt-1 font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-500" />
              Manage your medication schedule
            </p>
          </div>
        </div>
        
        <Link to="/reminders/add"
          className="btn-premium py-3 px-6 flex items-center justify-center gap-2 text-sm whitespace-nowrap group">
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" /> 
          <span>Add Reminder</span>
        </Link>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-brand/30 blur-xl rounded-full"></div>
            <Loader className="w-10 h-10 animate-spin text-brand relative z-10" />
          </div>
          <p className="text-[var(--text-secondary)] font-medium animate-pulse">Loading schedule...</p>
        </div>
      )}

      {!loading && reminders.length === 0 && (
        <div className="premium-glass rounded-3xl p-12 text-center flex flex-col items-center justify-center border-dashed border-2 border-[var(--glass-border)] hover:border-brand/30 transition-colors group">
          <div className="p-5 bg-[var(--bg-secondary)] rounded-full mb-5 ring-1 ring-[var(--border-color)] shadow-inner group-hover:scale-110 transition-transform duration-500">
            <Bell className="w-10 h-10 text-[var(--text-secondary)] opacity-40 group-hover:text-emerald-500/60 transition-colors" />
          </div>
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">No active reminders</h3>
          <p className="text-[var(--text-secondary)] font-medium max-w-sm mb-6">Stay on top of your health by setting up your first medication reminder.</p>
          <Link to="/reminders/add" className="text-brand font-bold flex items-center gap-1 hover:text-brand-dark transition-colors group/link p-2 bg-brand/5 rounded-lg px-4 hover:bg-brand/10">
            <Plus className="w-4 h-4 group-hover/link:rotate-90 transition-transform" /> Add your first reminder
          </Link>
        </div>
      )}

      {!loading && reminders.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
          {reminders.map((r, idx) => (
            <div 
              key={r.id} 
              className="premium-glass p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-emerald-500/30 transition-colors relative overflow-hidden"
              style={{ animationDelay: `${idx * 100}ms`, animation: 'fade-in 0.5s ease-out forwards' }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-l-2xl"></div>
              
              <div className="flex items-start sm:items-center gap-4 pl-2">
                <div className="p-3 bg-emerald-500/10 rounded-xl group-hover:bg-emerald-500 group-hover:shadow-lg group-hover:shadow-emerald-500/20 transition-all duration-300 ring-1 ring-emerald-500/20 flex-shrink-0">
                  <Droplets className="w-6 h-6 text-emerald-600 dark:text-emerald-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--text-primary)] text-lg mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{r.medicineName}</h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-[var(--text-secondary)]">
                    <span className="flex items-center gap-1.5 text-brand dark:text-brand-light bg-brand/10 px-2 py-0.5 rounded-md">
                      <Clock className="w-3.5 h-3.5" />
                      {r.time}
                    </span>
                    <span className="flex items-center gap-1">
                       <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                       {r.frequency}
                    </span>
                    {r.dosage && (
                      <span className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        {r.dosage}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pl-2 sm:pl-0 border-t border-[var(--border-color)] sm:border-t-0 pt-3 sm:pt-0 mt-2 sm:mt-0">
                {r.startDate && (
                  <div className="text-xs font-semibold text-[var(--text-secondary)] bg-[var(--bg-secondary)] px-3 py-1.5 rounded-lg border border-[var(--border-color)]">
                    {r.startDate} → {r.endDate || 'Ongoing'}
                  </div>
                )}
                
                <button 
                  onClick={() => handleDelete(r.id)} 
                  className="p-2.5 text-red-400 hover:text-white hover:bg-red-500 rounded-xl transition-all shadow-sm ring-1 ring-red-400/20 hover:shadow-red-500/20 hover:shadow-lg focus:outline-none"
                  title="Delete Reminder"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
