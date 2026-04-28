import { useFarm } from '../context/FarmContext';

const urgencyConfig = {
  high: { bg: 'bg-red-50 border-red-300', badge: 'bg-red-100 text-red-700', label: '🚨 Urgent' },
  low: { bg: 'bg-green-50 border-green-200', badge: 'bg-green-100 text-green-700', label: '✅ OK' },
  none: { bg: 'bg-blue-50 border-blue-200', badge: 'bg-blue-100 text-blue-700', label: '🌤️ Info' },
};

export default function DailyAdvisor() {
  const { advice, weather, profile, t } = useFarm();
  const now = new Date();

  if (!advice) {
    return (
      <div className="p-6 text-center text-eco-dark/60">
        <div className="text-5xl mb-4">⏳</div>
        <p>{t('loading_advice') || 'Advice load ho rahi hai...'}</p>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 pb-24 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold gradient-text">💡 {t('advisor')}</h1>
        <p className="text-eco-dark/60 text-sm mt-1">
          {now.toLocaleDateString('hi-IN', { weekday: 'long', day: 'numeric', month: 'long' })} | {profile?.currentCrop}
        </p>
      </div>

      {/* Weather Summary */}
      {weather && (
        <div className="card mb-5 flex items-center gap-4 bg-gradient-to-r from-blue-50 to-eco-light border border-eco-light">
          <div className="text-5xl">{weather.icon}</div>
          <div>
            <div className="font-bold text-eco-deeper">{weather.description} | {weather.temp}°C</div>
            <div className="text-sm text-eco-dark/60">Humidity: {weather.humidity}% | Wind: {weather.wind} km/h</div>
          </div>
        </div>
      )}

      {/* Section 1: Irrigation */}
      <Section
        title="💧 Sinchai (Irrigation)"
        urgency={advice.irrigation?.urgency}
        content={
          <div>
            <h3 className="font-bold text-lg text-eco-deeper mb-1">{advice.irrigation?.title}</h3>
            <p className="text-eco-dark/80 text-sm leading-relaxed">{advice.irrigation?.message}</p>
            {advice.irrigation?.nextIn && (
              <div className="mt-3 inline-flex items-center gap-2 bg-eco-light px-3 py-1.5 rounded-full text-sm text-eco-dark font-medium">
                🗓️ Agla Paani: {advice.irrigation.nextIn}
              </div>
            )}
          </div>
        }
      />

      {/* Section 2: Fertilizer */}
      <Section
        title="🌿 Fertilizer / Khad"
        urgency={advice.fertilizer?.urgency}
        content={
          <div>
            <h3 className="font-bold text-lg text-eco-deeper mb-1">{advice.fertilizer?.title}</h3>
            <p className="text-eco-dark/80 text-sm leading-relaxed">{advice.fertilizer?.message}</p>
            {advice.fertilizer?.tip && (
              <div className="mt-3 flex items-start gap-2 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                <span>💡</span> {advice.fertilizer.tip}
              </div>
            )}
          </div>
        }
      />

      {/* Section 3: Weather Advice */}
      <div className="card mb-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🌤️</span>
          <h2 className="font-bold text-eco-deeper text-base">Mausam ke Hisab se Salah</h2>
        </div>
        <div className="space-y-3">
          {advice.weatherAdvice?.map((w, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-eco-light/40 rounded-xl">
              <span className="text-2xl flex-shrink-0">{w.icon}</span>
              <p className="text-sm text-eco-dark/80 leading-relaxed">{w.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* General Tips */}
      <div className="card bg-gradient-to-br from-eco-light to-white border border-eco-light">
        <h2 className="font-bold text-eco-deeper mb-3">📌 Hamesha Yaad Rakhein</h2>
        <div className="space-y-2 text-sm text-eco-dark/80">
          {[
            '🌅 Subah ya shaam mein hi khet mein kaam karein – garmi se bachein',
            '📱 Mandi price daily check karein apni fasal ke liye',
            '🩺 Ek baar mahine mein Krishi Officer se milein',
            '📝 Apni farming history record karein – isse agli fasal acchi hogi',
            '🤝 FPO ya farmer group join karein – saath mein fayda zyada hoga',
          ].map((t, i) => (
            <div key={i} className="flex items-start gap-2 py-1">
              <span className="flex-shrink-0 mt-0.5">{t.slice(0, 2)}</span>
              <span>{t.slice(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Section({ title, urgency, content }) {
  const cfg = urgencyConfig[urgency || 'low'];
  return (
    <div className={`card mb-4 border ${cfg.bg}`}>
      <div className="flex items-center gap-2 mb-4">
        <h2 className="font-bold text-eco-deeper text-base">{title}</h2>
        <span className={`ml-auto badge ${cfg.badge}`}>{cfg.label}</span>
      </div>
      {content}
    </div>
  );
}
