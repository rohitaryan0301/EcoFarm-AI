import { useState } from 'react';
import { Users, Sprout, TrendingUp, AlertTriangle, Search, Filter, MoreVertical, CheckCircle2, XCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const mockUsers = [
  { id: '1', name: 'Ramesh Kumar', location: 'Punjab', crop: 'Wheat', status: 'Active', health: 85 },
  { id: '2', name: 'Suresh Singh', location: 'Haryana', crop: 'Rice', status: 'Warning', health: 45 },
  { id: '3', name: 'Mahesh Babu', location: 'Andhra', crop: 'Cotton', status: 'Active', health: 92 },
  { id: '4', name: 'Gopal Das', location: 'UP', crop: 'Sugarcane', status: 'Danger', health: 22 },
  { id: '5', name: 'Amit Jha', location: 'Bihar', crop: 'Maize', status: 'Active', health: 78 },
];

const stats = [
  { label: 'Kul Kisan', value: '12,450', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Active Farms', value: '8,210', icon: Sprout, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Yield Growth', value: '+14%', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Alerts Issued', value: '124', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
];

const yieldAnalytics = [
  { region: 'North', yield: 4500 },
  { region: 'South', yield: 3200 },
  { region: 'East', yield: 2100 },
  { region: 'West', yield: 3800 },
  { region: 'Central', yield: 2900 },
];

export default function AdminPanel() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin Dashboard 🔐</h1>
          <p className="text-slate-500 font-medium mt-1">Poore network ki gatividhi aur analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary flex items-center gap-2 !py-2.5">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="btn-primary flex items-center gap-2 !py-2.5">
            Report Download
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="card group hover:scale-[1.02] transition-all cursor-default">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center`}>
                <s.icon className={`w-6 h-6 ${s.color}`} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
                <p className="text-xl font-black text-slate-900">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Table */}
        <div className="lg:col-span-2 card !p-0 overflow-hidden border-none shadow-xl">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Kisan List</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search kisan..." 
                className="bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-1.5 text-xs focus:ring-2 focus:ring-emerald-500/20 outline-none w-48 sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Kisan Naam</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Fasal</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Health</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {mockUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-600">
                          {u.name[0]}
                        </div>
                        <span className="text-sm font-bold text-slate-900">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">{u.location}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">{u.crop}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter
                        ${u.status === 'Active' ? 'bg-emerald-100 text-emerald-700' 
                          : u.status === 'Warning' ? 'bg-amber-100 text-amber-700' 
                          : 'bg-red-100 text-red-700'}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                         <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                           <div className={`h-full rounded-full ${u.health > 80 ? 'bg-emerald-500' : u.health > 40 ? 'bg-amber-500' : 'bg-red-500'}`} style={{width: `${u.health}%`}} />
                         </div>
                         <span className="text-xs font-bold text-slate-500">{u.health}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4 text-slate-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
            <span className="text-xs text-slate-500 font-medium">Showing 5 of 12,450 farmers</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold disabled:opacity-50" disabled>Pahle</button>
              <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold">Agla</button>
            </div>
          </div>
        </div>

        {/* Analytics Chart */}
        <div className="card shadow-xl border-none">
          <h3 className="font-bold text-slate-900 mb-6">Yield Analytics by Region</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={yieldAnalytics}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="region" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
              <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '10px' }} />
              <Bar dataKey="yield" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-6 space-y-3">
             <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-700">Network Health: Excellent</span>
                </div>
                <span className="text-[10px] font-black text-emerald-600">98.2%</span>
             </div>
             <div className="flex items-center justify-between p-3 bg-red-50 rounded-2xl border border-red-100">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span className="text-xs font-bold text-red-700">Critical Alerts Pending</span>
                </div>
                <span className="text-[10px] font-black text-red-600">12</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
