import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFarm } from '../context/FarmContext';
import { useAuth } from '../context/AuthContext';
import WeatherCard from '../components/WeatherCard';
import FarmHealthGauge from '../components/FarmHealthGauge';
import { MapPin, Loader2, Sprout, Droplets, TrendingUp, Building, ShieldCheck, Leaf, CheckCircle2, ChevronRight, X, ArrowRight } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend
} from 'recharts';

const yieldData = [
  { month: 'Oct', yield: 12, target: 15 },
  { month: 'Nov', yield: 14, target: 15 },
  { month: 'Dec', yield: 16, target: 18 },
  { month: 'Jan', yield: 18, target: 18 },
  { month: 'Feb', yield: 22, target: 20 },
  { month: 'Mar', yield: 20, target: 22 },
  { month: 'Apr', yield: 25, target: 22 },
];

const waterData = [
  { day: 'Mon', liters: 400, avg: 350 },
  { day: 'Tue', liters: 300, avg: 350 },
  { day: 'Wed', liters: 500, avg: 350 },
  { day: 'Thu', liters: 200, avg: 350 },
  { day: 'Fri', liters: 450, avg: 350 },
  { day: 'Sat', liters: 380, avg: 350 },
  { day: 'Sun', liters: 150, avg: 350 },
];

const costData = [
  { name: 'Seeds', value: 2500, color: '#059669' }, // emerald-600
  { name: 'Fertilizer', value: 3800, color: '#10b981' }, // emerald-500
  { name: 'Pesticide', value: 1500, color: '#34d399' }, // emerald-400
  { name: 'Labour', value: 4200, color: '#94a3b8' }, // slate-400
];

const activities = [
  { time: '2 din pahle', icon: '💧', text: 'Sinchai ki gayi', color: 'text-blue-600 bg-blue-50' },
  { time: '5 din pahle', icon: '🌿', text: 'Urea fertilizer daala', color: 'text-emerald-600 bg-emerald-50' },
  { time: '8 din pahle', icon: '🐛', text: 'Pesticide spray kiya', color: 'text-amber-600 bg-amber-50' },
  { time: '12 din pahle', icon: '🌱', text: 'Beej boya', color: 'text-slate-600 bg-slate-100' },
];

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="font-mono text-white/80 text-xs">
      {time.toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </span>
  );
}

function StatCard({ icon, label, value, sub, color, to }) {
  const inner = (
    <div className={`card border-l-4 ${color} hover:shadow-card-hover group cursor-pointer active:scale-95 transition-all`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">{label}</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</p>
          {sub && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{sub}</p>}
        </div>
        <div className="text-3xl group-hover:scale-110 transition-transform">{icon}</div>
      </div>
    </div>
  );
  return to ? <Link to={to}>{inner}</Link> : inner;
}

function IrrigationCountdown({ profile }) {
  const lastDate = profile?.lastIrrigated ? new Date(profile.lastIrrigated) : new Date(Date.now() - 5 * 86400000);
  const days = profile?.irrigationDays || 10;
  const elapsed = Math.floor((Date.now() - lastDate) / 86400000);
  const remaining = Math.max(0, days - elapsed);
  const pct = Math.min(100, Math.round((elapsed / days) * 100));
  const urgent = remaining <= 1;

  return (
    <div className={`card border ${urgent ? 'border-red-200 bg-red-50' : 'border-slate-100'}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">💧</span>
          <span className="font-bold text-slate-900 dark:text-white text-sm">Sinchai Countdown</span>
        </div>
        <span className={`badge ${urgent ? 'bg-red-100 text-red-700' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400'}`}>
          {urgent ? '🚨 Urgent' : `${remaining} din baaki`}
        </span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
        <div
          className={`h-full rounded-full transition-all duration-700 ${pct >= 90 ? 'bg-red-500' : pct >= 70 ? 'bg-amber-500' : 'bg-emerald-500'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between text-[10px] font-medium text-slate-500">
        <span>Aakhri: {elapsed} din pahle</span>
        <span>Cycle: {days} din</span>
      </div>
    </div>
  );
}

function WeatherForecast({ weather }) {
  if (!weather?.forecast) return null;
  return (
    <div className="card">
      <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-3">🗓️ 3-Din Ka Mausam</h3>
      <div className="grid grid-cols-3 gap-2">
        {weather.forecast.map((f, i) => (
          <div key={i} className="text-center bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 rounded-xl p-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-default">
            <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">{f.day}</div>
            <div className="text-2xl mb-1">{f.icon}</div>
            <div className="text-base font-bold text-slate-900 dark:text-white">{f.temp}°</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityFeed() {
  return (
    <div className="card">
      <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-3">📋 Haal ki Gatividhi</h3>
      <div className="space-y-3">
        {activities.map((a, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 ${a.color} shadow-sm`}>{a.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold">{a.text}</p>
            </div>
            <span className="text-[10px] text-slate-400 font-bold uppercase flex-shrink-0">{a.time}</span>
          </div>
        ))}
      </div>
      <button className="mt-4 w-full text-xs text-slate-400 font-bold hover:text-slate-600 dark:hover:text-slate-200 py-1 text-center transition-colors">
        POORI HISTORY DEKHEN →
      </button>
    </div>
  );
}

function FarmerIdentity() {
  const { user } = useAuth();
  const { profile } = useFarm();
  const [showDetails, setShowDetails] = useState(false);

  if (!user) return null;

  return (
    <div className={`transition-all duration-700 ease-in-out ${showDetails ? 'col-span-full' : 'col-span-1'}`}>
      <div className={`card relative overflow-hidden transition-all duration-500 ${
        showDetails ? 'bg-slate-900 text-white p-10 rounded-[3rem]' : 'bg-white p-6 rounded-[2.5rem] hover:shadow-2xl cursor-pointer border-none shadow-xl'
      }`}
      onClick={() => !showDetails && setShowDetails(true)}
      >
        {!showDetails ? (
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500 flex items-center justify-center text-2xl font-black shadow-lg shadow-emerald-500/40 overflow-hidden border-2 border-white/20">
              {profile.photo ? (
                <img src={profile.photo} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                user.name[0]
              )}
            </div>
            <div>
              <div className="text-lg font-black text-slate-900 tracking-tight">{user.name}</div>
              <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> View Kisan ID
              </div>
            </div>
            <div className="ml-auto p-3 bg-slate-50 rounded-2xl text-slate-400">
               <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in-95 duration-500">
             <div className="flex items-start justify-between mb-10">
                <div className="flex items-center gap-6">
                   <div className="w-24 h-24 rounded-[2rem] bg-white/10 border-2 border-white/20 overflow-hidden shadow-2xl flex items-center justify-center">
                      {profile.photo ? (
                        <img src={profile.photo} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-4xl font-black">{user.name[0]}</span>
                      )}
                   </div>
                   <div>
                      <h2 className="text-3xl font-black tracking-tight">{user.name}</h2>
                      <p className="text-emerald-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Verified Digital Kisan Identity</p>
                   </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetails(false);
                  }}
                  className="p-4 bg-white/10 hover:bg-white/20 rounded-3xl transition-all"
                >
                   <X className="w-6 h-6" />
                </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Aadhar Number</p>
                   <p className="font-bold text-lg">XXXX XXXX {profile.aadharNumber?.slice(-4) || '0000'}</p>
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Location</p>
                   <p className="font-bold text-lg">{profile.location || 'Not Set'}</p>
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Current Crop</p>
                   <p className="font-bold text-lg text-emerald-400">{profile.currentCrop || '---'}</p>
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Farm Size</p>
                   <p className="font-bold text-lg">{profile.farmSize || 0} Acres</p>
                </div>
             </div>

             <div className="mt-10 pt-8 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-emerald-500 flex items-center justify-center text-[10px] font-black">
                           <ShieldCheck className="w-4 h-4" />
                        </div>
                      ))}
                   </div>
                   <p className="text-xs font-bold text-white/60">Profile 94% Verified by Govt. Data</p>
                </div>
                <Link to="/profile" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors">
                   Edit Full Profile <ArrowRight className="w-4 h-4" />
                </Link>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { profile, advice, alerts, weather, healthScore, detectLocation, t } = useFarm();
  const { user } = useAuth();
  const [showAllAlerts, setShowAllAlerts] = useState(false);
  const [detecting, setDetecting] = useState(false);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return t('greeting_morning');
    if (h < 17) return t('greeting_afternoon');
    return t('greeting_evening');
  };

  const handleDetect = () => {
    setDetecting(true);
    detectLocation();
    setTimeout(() => setDetecting(false), 2000);
  };

  const profitEst = Math.round(18 * 2200 * (profile?.farmSize || 2));
  const visibleAlerts = showAllAlerts ? alerts : alerts.slice(0, 2);

  return (
    <div className="p-4 lg:p-6 pb-24 max-w-6xl mx-auto space-y-5">

      {/* ── Hero Banner ── */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-emerald-500/20 to-transparent pointer-events-none" />
        <div className="absolute right-4 top-0 text-[120px] opacity-10 pointer-events-none select-none leading-none rotate-12">🌾</div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]">
              {new Date().toLocaleDateString('hi-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            <LiveClock />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">{greeting()}, {user?.name || 'Kisan Bhai'}!</h1>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-slate-300">
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <span>📍 {profile?.location || 'Location set karein'}</span>
              <button 
                onClick={handleDetect}
                disabled={detecting}
                className="p-1 hover:bg-white/10 rounded-full transition-colors text-emerald-400"
                title="Detect Location"
              >
                {detecting ? <Loader2 className="w-3 h-3 animate-spin" /> : <MapPin className="w-3 h-3" />}
              </button>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <span>🌱 {profile?.currentCrop || 'Fasal chunein'}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <span>🏡 {profile?.farmSize || '—'} Acres</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Farmer Identity Section (Toggleable) ── */}
      <FarmerIdentity />

      {/* ── Alerts ── */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {visibleAlerts.map((a, i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold shadow-sm animate-pulse-once border
              ${a.type === 'danger' ? 'bg-red-50 border-red-100 text-red-700'
                : a.type === 'warning' ? 'bg-amber-50 border-amber-100 text-amber-700'
                : 'bg-emerald-50 border-emerald-100 text-emerald-700'}`}>
              <span className="text-lg">⚠️</span>
              <span className="flex-1 uppercase tracking-wide">{a.message}</span>
              <span className="opacity-50">ABHI</span>
            </div>
          ))}
          {alerts.length > 2 && (
            <button onClick={() => setShowAllAlerts(v => !v)} className="text-[10px] font-bold text-slate-400 hover:text-slate-600 px-1 uppercase tracking-widest">
              {showAllAlerts ? '▲ Kam dikhayein' : `▼ ${alerts.length - 2} aur alerts`}
            </button>
          )}
        </div>
      )}

      {/* ── Stat Cards Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="🌿" label={t('farm_health')} value={`${healthScore?.score ?? 72}/100`} sub={healthScore?.status ?? 'Excellent'} color="border-emerald-500" />
        <StatCard icon="💰" label={t('est_profit')} value={`₹${(profitEst / 1000).toFixed(0)}K`} sub="Current Season" color="border-emerald-400" />
        <StatCard icon="🌾" label={t('current_crop')} value={profile?.currentCrop?.split(' ')[0] || '—'} sub={profile?.soilType || 'Loamy mitti'} color="border-emerald-600" to="/profile" />
        <StatCard icon="💧" label={t('water_source')} value={profile?.waterSource || 'Set karein'} sub="Irrigation Source" color="border-emerald-300" to="/profile" />
      </div>

      {/* ── Today's Advice ── */}
      {advice && (
        <div className="card !p-0 overflow-hidden border-none shadow-xl">
          <div className="bg-slate-900 px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">💡</span>
              <h2 className="font-bold text-white text-sm">{t('advisor')}</h2>
            </div>
            <span className="badge bg-emerald-500 text-white">LIVE</span>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <AdviceChip
              urgency={advice.irrigation?.urgency}
              icon={advice.irrigation?.urgency === 'high' ? '💧' : '✅'}
              title={advice.irrigation?.title}
              desc={advice.irrigation?.message}
              next={advice.irrigation?.nextIn}
            />
            <AdviceChip
              urgency={advice.fertilizer?.urgency}
              icon="🌿"
              title={advice.fertilizer?.title}
              desc={advice.fertilizer?.message}
              next={advice.fertilizer?.tip}
            />
            {advice.weatherAdvice?.[0] && (
              <AdviceChip
                urgency="none"
                icon={advice.weatherAdvice[0].icon}
                title="Mausam Salah"
                desc={advice.weatherAdvice[0].text}
              />
            )}
          </div>
          <div className="bg-slate-50 px-5 py-2 border-t border-slate-100 flex justify-end">
            <Link to="/advisor" className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-widest">
              Poori salah dekhen →
            </Link>
          </div>
        </div>
      )}

      {/* ── Irrigation Countdown + Forecast Row ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <IrrigationCountdown profile={profile} />
        <WeatherForecast weather={weather} />
      </div>

      {/* ── Weather + Health + Quick Actions ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <WeatherCard />
        <FarmHealthGauge />
        <div className="card">
          <h3 className="font-bold text-slate-900 text-sm mb-4">⚡ Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { to: '/crop', icon: '🌱', label: 'Crop Predict', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
              { to: '/advisor', icon: '💡', label: 'Advisor', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
              { to: '/chatbot', icon: '🤖', label: 'Assistant', color: 'bg-slate-50 text-slate-700 border-slate-100' },
              { to: '/guide', icon: '📚', label: 'Guide', color: 'bg-slate-50 text-slate-700 border-slate-100' },
              { to: '/profile', icon: '👨‍🌾', label: 'Profile', color: 'bg-slate-50 text-slate-700 border-slate-100' },
              { to: '/about', icon: 'ℹ️', label: 'About', color: 'bg-slate-50 text-slate-700 border-slate-100' },
            ].map(({ to, icon, label, color }) => (
              <Link key={to} to={to}
                className={`flex flex-col items-center gap-2 p-3 ${color} border rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-sm`}>
                <span className="text-2xl">{icon}</span>
                <span className="text-[10px] font-bold uppercase tracking-wide">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900 text-sm">📈 Yield Trend (Q/Acre)</h3>
            <span className="badge bg-slate-900 text-white">6 Months</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={yieldData}>
              <defs>
                <linearGradient id="yieldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
              <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '10px' }} />
              <Area type="monotone" dataKey="target" stroke="#cbd5e1" strokeDasharray="4 4" fill="none" strokeWidth={1} name="Target" />
              <Area type="monotone" dataKey="yield" stroke="#059669" fill="url(#yieldGrad)" strokeWidth={3} name="Actual" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900 text-sm">💧 Water Usage (L) – Weekly</h3>
            <span className="badge bg-emerald-500 text-white">Weekly</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={waterData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
              <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '10px' }} />
              <Bar dataKey="liters" fill="#10b981" radius={[4, 4, 0, 0]} name="Paani (L)" />
              <Bar dataKey="avg" fill="#e2e8f0" radius={[4, 4, 0, 0]} name="Average" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Cost Breakdown + Activity Feed ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-bold text-slate-900 text-sm mb-4">💸 Lagat Breakdown (Cost)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={costData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={5} dataKey="value">
                {costData.map((c, i) => <Cell key={i} fill={c.color} />)}
              </Pie>
              <Tooltip formatter={(v) => [`₹${v.toLocaleString('en-IN')}`, '']} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '10px' }} />
              <Legend formatter={(v) => <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 'bold' }}>{v.toUpperCase()}</span>} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 text-center text-xs text-slate-400 font-bold">
            TOTAL LAGAT: ₹{costData.reduce((a, b) => a + b.value, 0).toLocaleString('en-IN')}
          </div>
        </div>

        <ActivityFeed />
      </div>

    </div>
  );
}

function AdviceChip({ icon, title, desc, urgency, next }) {
  const style = urgency === 'high'
    ? 'border-red-100 bg-red-50 text-red-900'
    : urgency === 'low'
    ? 'border-emerald-100 bg-emerald-50 text-emerald-900'
    : 'border-slate-100 bg-slate-50 text-slate-900';
  return (
    <div className={`border rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-default ${style}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{icon}</span>
        <span className="text-[11px] font-extrabold uppercase tracking-wider leading-tight">{title}</span>
      </div>
      <p className="text-xs font-medium leading-relaxed opacity-80">{desc}</p>
      {next && (
        <div className="mt-3 pt-3 border-t border-current/10 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase opacity-60">Agli karwayi</span>
          <span className="text-[10px] font-extrabold uppercase tracking-wider">{next}</span>
        </div>
      )}
    </div>
  );
}
