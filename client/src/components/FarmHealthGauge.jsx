import { useFarm } from '../context/FarmContext';

export default function FarmHealthGauge() {
  const { healthScore } = useFarm();

  const score = healthScore?.score ?? 72;
  const status = healthScore?.status ?? 'Good 👍';
  const color = healthScore?.color ?? '#84cc16';
  const tips = healthScore?.tips ?? [];

  // SVG circle gauge
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (score / 100) * circumference;
  const getColor = (s) => s >= 75 ? '#22c55e' : s >= 55 ? '#84cc16' : s >= 35 ? '#f59e0b' : '#ef4444';

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-eco-deeper text-base">Farm Health Score</h3>
        <span className="badge bg-eco-light text-eco-dark">{status}</span>
      </div>

      <div className="flex items-center gap-5">
        {/* Circular gauge */}
        <div className="relative flex-shrink-0">
          <svg width="130" height="130" viewBox="0 0 130 130">
            {/* Background circle */}
            <circle
              cx="65" cy="65" r={radius}
              fill="none"
              stroke="#f0fdf4"
              strokeWidth="12"
            />
            {/* Score arc */}
            <circle
              cx="65" cy="65" r={radius}
              fill="none"
              stroke={getColor(score)}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${strokeDash} ${circumference - strokeDash}`}
              strokeDashoffset={circumference * 0.25}
              style={{ transition: 'stroke-dasharray 1s ease' }}
            />
            {/* Score text */}
            <text x="65" y="61" textAnchor="middle" className="text-3xl font-bold" fill="#1b4332" fontSize="26" fontWeight="bold">
              {score}
            </text>
            <text x="65" y="78" textAnchor="middle" fill="#52b788" fontSize="11">
              / 100
            </text>
          </svg>
        </div>

        {/* Sub-scores */}
        <div className="flex-1 space-y-2">
          <SubScore label="💧 Paani" value={healthScore?.waterScore ?? 28} max={40} />
          <SubScore label="🌡️ Mausam" value={healthScore?.weatherScore ?? 25} max={35} />
          <SubScore label="🌿 Fasal" value={healthScore?.cropScore ?? 19} max={25} />
        </div>
      </div>

      {/* Tips */}
      {tips.length > 0 && (
        <div className="mt-3 pt-3 border-t border-eco-light space-y-1">
          {tips.map((tip, i) => (
            <div key={i} className="text-xs text-eco-dark bg-eco-light/50 rounded-lg px-3 py-1.5">
              {tip}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SubScore({ label, value, max }) {
  const pct = Math.round((value / max) * 100);
  const color = pct >= 70 ? 'bg-green-400' : pct >= 45 ? 'bg-yellow-400' : 'bg-red-400';
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-eco-dark/70">{label}</span>
        <span className="font-semibold text-eco-darker">{value}/{max}</span>
      </div>
      <div className="h-2 bg-eco-light rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
