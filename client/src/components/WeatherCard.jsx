import { useFarm } from '../context/FarmContext';

export default function WeatherCard() {
  const { weather, profile } = useFarm();

  if (!weather) {
    return (
      <div className="card shimmer h-32 flex items-center justify-center text-eco-base text-sm">
        🌤️ Mausam load ho raha hai...
      </div>
    );
  }

  return (
    <div className="card bg-gradient-to-br from-slate-50 to-blue-50/30 border border-slate-100 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 transition-transform duration-500 text-6xl">🌤️</div>
      
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div>
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Aaj ka Mausam</div>
          <div className="text-sm font-extrabold text-slate-900 mt-1 flex items-center gap-1">
            <span className="text-emerald-500">📍</span> {weather.city}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6 relative z-10">
        <div className="text-5xl font-black text-slate-900 tracking-tighter">{weather.temp}°</div>
        <div className="w-px h-10 bg-slate-200" />
        <div>
          <div className="text-sm font-bold text-slate-800 capitalize leading-tight">{weather.description}</div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">Feels like {weather.feels_like}°C</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 relative z-10">
        {[
          { label: 'Humidity', val: `${weather.humidity}%`, icon: '💧', color: 'text-blue-500' },
          { label: 'Wind', val: `${weather.wind} km/h`, icon: '💨', color: 'text-slate-500' },
          { label: 'Rain', val: `${weather.rainfall}mm`, icon: '🌧️', color: 'text-indigo-500' },
        ].map((item, i) => (
          <div key={i} className="text-center bg-white border border-slate-100 rounded-2xl p-2.5 shadow-sm">
            <div className={`text-lg mb-0.5 ${item.color}`}>{item.icon}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5">{item.label}</div>
            <div className="text-xs font-black text-slate-900">{item.val}</div>
          </div>
        ))}
      </div>

      {weather.isMock && (
        <div className="mt-3 text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest">
          * LIVE DATA (MOCK)
        </div>
      )}
    </div>
  );
}
