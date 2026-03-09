import React, { useState, useEffect } from 'react';
import { getAllActivityLogs, getAllUsers, getAllMedicines } from '../../firebase/firestoreService';
import { Shield, Users, Activity, Pill, Loader, Database, Search, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('logs');
  const [search, setSearch] = useState('');

  useEffect(() => {
    Promise.all([getAllActivityLogs(), getAllUsers(), getAllMedicines()])
      .then(([l, u, m]) => { setLogs(l); setUsers(u); setMedicines(m); })
      .catch(() => toast.error('Failed to load admin data'))
      .finally(() => setLoading(false));
  }, []);

  const tabs = [
    { id: 'logs', label: 'Activity Logs', icon: Activity, count: logs.length },
    { id: 'users', label: 'Users', icon: Users, count: users.length },
    { id: 'medicines', label: 'Medicines', icon: Pill, count: medicines.length },
  ];

  const filterData = (data, fields) => {
    if (!search) return data;
    const lowerSearch = search.toLowerCase();
    return data.filter(item => 
      fields.some(field => item[field] && String(item[field]).toLowerCase().includes(lowerSearch))
    );
  };

  const filteredLogs = filterData(logs, ['action', 'email', 'details']);
  const filteredUsers = filterData(users, ['name', 'email']);
  const filteredMedicines = filterData(medicines, ['name', 'dosage', 'barcode']);

  return (
    <div className="space-y-8 animate-fade-in pb-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-2xl shadow-lg shadow-violet-500/20">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">Admin Dashboard</h1>
            <p className="text-[var(--text-secondary)] text-sm mt-1 font-medium flex items-center gap-2">
              <Database className="w-4 h-4 text-fuchsia-500" />
              System Data & User Management
            </p>
          </div>
        </div>

        <div className="relative group w-full md:w-64 lg:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[var(--text-secondary)] group-focus-within:text-fuchsia-500 transition-colors" />
          </div>
          <input
            type="text"
            className="input-premium pl-10 py-2.5 w-full bg-[var(--bg-secondary)] border-[var(--border-color)] placeholder:text-[var(--text-secondary)]"
            placeholder={`Search ${tab}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-fuchsia-500/30 blur-xl rounded-full"></div>
            <Loader className="w-10 h-10 animate-spin text-fuchsia-500 relative z-10" />
          </div>
          <p className="text-[var(--text-secondary)] font-medium animate-pulse">Loading system data...</p>
        </div>
      )}

      {!loading && (
        <>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {tabs.map(({ id, label, icon: Icon, count }, idx) => (
              <div 
                key={id} 
                onClick={() => setTab(id)}
                className={`premium-glass p-6 rounded-3xl flex items-center gap-5 cursor-pointer transition-all duration-300 relative overflow-hidden group ${tab === id ? 'ring-2 ring-fuchsia-500/50 shadow-lg shadow-fuchsia-500/10 scale-[1.02]' : 'hover:border-fuchsia-500/30 hover:-translate-y-1'}`}
                style={{ animationDelay: `${idx * 100}ms`, animation: 'fade-in 0.5s ease-out forwards' }}
              >
                {tab === id && <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-fuchsia-600/5 z-0"></div>}
                <div className={`p-4 rounded-2xl z-10 transition-colors duration-300 ${tab === id ? 'bg-fuchsia-500 shadow-lg shadow-fuchsia-500/30' : 'bg-fuchsia-500/10 group-hover:bg-fuchsia-500/20'}`}>
                  <Icon className={`w-8 h-8 ${tab === id ? 'text-white' : 'text-fuchsia-500'}`} />
                </div>
                <div className="z-10">
                  <p className="text-3xl font-extrabold text-[var(--text-primary)]">{count}</p>
                  <p className="text-sm text-[var(--text-secondary)] font-bold uppercase tracking-wider mt-1">{label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[var(--border-color)] h-px w-full my-8"></div>

          {/* Activity Logs Content */}
          {tab === 'logs' && (
            <div className="space-y-4 animate-fade-in">
              {filteredLogs.length === 0 ? (
                <div className="premium-glass rounded-3xl p-12 text-center border-dashed border-2">
                  <Activity className="w-10 h-10 mx-auto text-[var(--text-secondary)] opacity-40 mb-4" />
                  <p className="text-[var(--text-secondary)] font-medium">No activity logs found matching your search.</p>
                </div>
              ) : (
                <div className="grid gap-3">
                  {filteredLogs.map((log, idx) => (
                    <div key={log.id} className="premium-glass p-4 rounded-2xl flex flex-col md:flex-row md:items-center gap-4 hover:border-fuchsia-500/30 transition-colors" style={{ animationDelay: `${Math.min(idx * 50, 500)}ms`, animation: 'fade-in 0.3s ease-out forwards' }}>
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex-shrink-0 text-center md:w-32 ring-1 ${
                        log.action === 'registration' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20' :
                        log.action === 'login' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-blue-500/20' :
                        log.action === 'logout' ? 'bg-gray-500/10 text-gray-600 dark:text-gray-400 ring-gray-500/20' :
                        'bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/20'
                      }`}>{log.action}</span>
                      
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <p className="text-[var(--text-primary)] font-semibold truncate">{log.email}</p>
                        {log.details && <p className="text-sm text-[var(--text-secondary)] truncate mt-0.5">{log.details}</p>}
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-secondary)] md:w-auto bg-[var(--bg-secondary)] px-3 py-1.5 rounded-lg border border-[var(--border-color)] whitespace-nowrap">
                        <Clock className="w-3.5 h-3.5" />
                        {log.timestamp?.seconds ? new Date(log.timestamp.seconds * 1000).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : 'Unknown time'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Users Content */}
          {tab === 'users' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-fade-in">
              {filteredUsers.length === 0 ? (
                <div className="premium-glass rounded-3xl p-12 text-center border-dashed border-2 col-span-full">
                  <Users className="w-10 h-10 mx-auto text-[var(--text-secondary)] opacity-40 mb-4" />
                  <p className="text-[var(--text-secondary)] font-medium">No users found matching your search.</p>
                </div>
              ) : (
                filteredUsers.map((u, idx) => (
                  <div key={u.id} className="premium-glass p-5 rounded-2xl flex items-center gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group" style={{ animationDelay: `${Math.min(idx * 50, 500)}ms`, animation: 'fade-in 0.3s ease-out forwards' }}>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md ring-2 ring-white/10 group-hover:scale-110 transition-transform">
                      {u.name?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[var(--text-primary)] truncate text-lg">{u.name || 'Anonymous User'}</p>
                      <p className="text-sm text-[var(--text-secondary)] truncate font-medium">{u.email}</p>
                      {u.age && <p className="text-xs text-[var(--text-secondary)] mt-1 font-semibold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span> Age: {u.age}</p>}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Medicines Content */}
          {tab === 'medicines' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-fade-in">
              {filteredMedicines.length === 0 ? (
                <div className="premium-glass rounded-3xl p-12 text-center border-dashed border-2 col-span-full">
                  <Pill className="w-10 h-10 mx-auto text-[var(--text-secondary)] opacity-40 mb-4" />
                  <p className="text-[var(--text-secondary)] font-medium">No medicines found matching your search.</p>
                </div>
              ) : (
                filteredMedicines.map((m, idx) => (
                  <div key={m.id} className="premium-glass p-5 rounded-2xl flex flex-col justify-between hover:border-brand/40 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden" style={{ animationDelay: `${Math.min(idx * 50, 500)}ms`, animation: 'fade-in 0.3s ease-out forwards' }}>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 rounded-full blur-xl -translate-y-1/2 translate-x-1/2"></div>
                    
                    <div className="relative z-10 mb-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="font-bold text-[var(--text-primary)] text-lg leading-tight">{m.name}</p>
                        {m.dosage && <span className="bg-brand/10 text-brand dark:text-brand-light text-xs font-bold px-2 py-1 rounded-md whitespace-nowrap">{m.dosage}</span>}
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] font-medium line-clamp-2">{m.simpleExplanation || 'No description available.'}</p>
                    </div>
                    
                    {m.barcode && (
                      <div className="relative z-10 mt-auto pt-3 border-t border-[var(--border-color)]">
                        <p className="text-xs font-mono text-[var(--text-secondary)] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                          {m.barcode}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
// Need to add Clock icon import since we added it in the UI
// Will use multi_replace to fix the import or just assume it works if we use it inline, but better to import it properly.
// Wait, I can't add Clock because I didn't include it in the replace above. Let me add it in the imports.

