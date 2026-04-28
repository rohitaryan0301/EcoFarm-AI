import { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { ChevronRight, Loader2 } from 'lucide-react';

const soilTypes = [
  { value: 'sandy', label: 'Sandy (Balui)', emoji: '🏜️' },
  { value: 'loamy', label: 'Loamy (Domat)', emoji: '🌱' },
  { value: 'clay', label: 'Clay (Chikni)', emoji: '🏺' },
  { value: 'silt', label: 'Silt (Silty)', emoji: '💧' },
  { value: 'red', label: 'Red (Lal Mitti)', emoji: '🔴' },
];

export default function CropPrediction() {
  const { predictCrop } = useFarm();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ soilType: '', temperature: '', rainfall: '', humidity: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handlePredict = async () => {
    if (!form.soilType || !form.temperature || !form.rainfall || !form.humidity) {
      setError('Kripya sabhi fields bharein');
      return;
    }
    setLoading(true); setError('');
    try {
      const data = await predictCrop(form);
      if (data.success) {
        setResult(data.data);
        setHistory(h => [{ ...form, ...data.data, time: new Date() }, ...h.slice(0, 4)]);
        setStep(3);
      }
    } catch (e) {
      setError('Server se connect nahi ho pa raha. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setStep(1); setResult(null); setForm({ soilType: '', temperature: '', rainfall: '', humidity: '' }); };

  return (
    <div className="p-4 lg:p-6 pb-24 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold gradient-text">🌾 Fasal Prediction</h1>
        <p className="text-eco-dark/60 text-sm mt-1">Apni mitti aur mausam ki jaankari dein – hum best fasal suggest karenge</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-0 mb-8">
        {['Mitti', 'Mausam', 'Result'].map((s, i) => (
          <div key={i} className="flex items-center flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0
              ${step > i + 1 ? 'bg-eco-dark text-white' : step === i + 1 ? 'bg-eco-base text-white' : 'bg-eco-light text-eco-dark/40'}`}>
              {step > i + 1 ? '✓' : i + 1}
            </div>
            <div className="flex-1 text-center text-xs font-medium text-eco-dark/60 px-1 hidden sm:block">{s}</div>
            {i < 2 && <div className={`h-0.5 flex-1 ${step > i + 1 ? 'bg-eco-dark' : 'bg-eco-light'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Soil */}
      {step === 1 && (
        <div className="card slide-up">
          <h2 className="font-bold text-eco-deeper text-lg mb-1">Mitti ka Prakar</h2>
          <p className="text-sm text-eco-dark/60 mb-5">Apne khet ki mitti ka type chunein</p>
          <div className="grid grid-cols-1 gap-3">
            {soilTypes.map(s => (
              <button
                key={s.value}
                onClick={() => set('soilType', s.value)}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left
                  ${form.soilType === s.value
                    ? 'border-eco-dark bg-eco-light shadow-card-hover'
                    : 'border-eco-light hover:border-eco-base'}`}
              >
                <span className="text-3xl">{s.emoji}</span>
                <div>
                  <div className="font-semibold text-eco-deeper">{s.label}</div>
                </div>
                {form.soilType === s.value && <span className="ml-auto text-eco-dark text-xl">✓</span>}
              </button>
            ))}
          </div>
          <button
            onClick={() => form.soilType ? setStep(2) : setError('Mitti type chunein')}
            className="btn-primary w-full mt-5 flex items-center justify-center gap-2"
          >
            Aage Badho <ChevronRight className="w-4 h-4" />
          </button>
          {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        </div>
      )}

      {/* Step 2: Climate */}
      {step === 2 && (
        <div className="card slide-up">
          <h2 className="font-bold text-eco-deeper text-lg mb-1">Mausam ki Jaankari</h2>
          <p className="text-sm text-eco-dark/60 mb-5">Apne ilake ka mausam data bharein</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-eco-darker mb-2">🌡️ Temperature (°C)</label>
              <input
                type="number" min="0" max="50"
                value={form.temperature}
                onChange={e => set('temperature', e.target.value)}
                placeholder="jaise: 28"
                className="form-input"
                id="temperature-input"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-eco-darker mb-2">🌧️ Rainfall (mm per month)</label>
              <input
                type="number" min="0" max="1000"
                value={form.rainfall}
                onChange={e => set('rainfall', e.target.value)}
                placeholder="jaise: 80"
                className="form-input"
                id="rainfall-input"
              />
              <p className="text-xs text-eco-dark/50 mt-1">Agar pata nahi toh apne zile ka average daalein</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-eco-darker mb-2">💦 Humidity (%)</label>
              <input
                type="number" min="0" max="100"
                value={form.humidity}
                onChange={e => set('humidity', e.target.value)}
                placeholder="jaise: 65"
                className="form-input"
                id="humidity-input"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="flex gap-3 mt-5">
            <button onClick={() => setStep(1)} className="btn-secondary flex-1">← Wapas</button>
            <button
              onClick={handlePredict}
              disabled={loading}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Predict ho raha hai...</> : '🔍 Fasal Predict Karein'}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Result */}
      {step === 3 && result && (
        <div className="slide-up space-y-4">
          {/* Main Result */}
          <div className="card bg-gradient-to-br from-eco-light to-white border-2 border-eco-base">
            <div className="text-center mb-4">
              <div className="text-6xl mb-2">{result.emoji}</div>
              <h2 className="text-2xl font-bold text-eco-deeper">Best Fasal: {result.crop}</h2>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="h-2 bg-eco-light rounded-full flex-1 max-w-32">
                  <div className="h-2 bg-eco-dark rounded-full" style={{ width: `${result.score}%` }} />
                </div>
                <span className="text-sm font-bold text-eco-dark">{result.score}% match</span>
              </div>
            </div>

            <div className="bg-white/70 rounded-xl p-3 mb-4 text-sm text-eco-dark/80">
              💡 <strong>Kyon?</strong> {result.reason}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <InfoBox icon="💧" label="Paani ki zaroorat" value={result.waterReq} />
              <InfoBox icon="📦" label="Expected Yield" value={result.yieldEstimate} />
              <InfoBox icon="💰" label="Profit Estimate" value={result.profitEstimate} />
              <InfoBox icon="📅" label="Season" value={result.season} />
            </div>
          </div>

          {/* Alternatives */}
          {result.alternatives?.length > 0 && (
            <div className="card">
              <h3 className="font-semibold text-eco-deeper mb-3">Aur Options</h3>
              <div className="flex gap-3">
                {result.alternatives.map((a, i) => (
                  <div key={i} className="flex items-center gap-2 bg-eco-light/50 rounded-xl px-3 py-2">
                    <span className="text-xl">{a.emoji}</span>
                    <span className="text-sm font-medium text-eco-dark">{a.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button onClick={reset} className="btn-secondary w-full">🔄 Naya Prediction Karein</button>
        </div>
      )}

      {/* History */}
      {history.length > 0 && step !== 3 && (
        <div className="mt-6 card">
          <h3 className="font-semibold text-eco-deeper mb-3">📋 Purani Predictions</h3>
          <div className="space-y-2">
            {history.map((h, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-eco-light/40 rounded-xl text-sm">
                <span className="text-xl">{h.emoji}</span>
                <div className="flex-1">
                  <div className="font-medium text-eco-darker">{h.crop}</div>
                  <div className="text-xs text-eco-dark/50">{h.soilType} | {h.temperature}°C | {h.rainfall}mm</div>
                </div>
                <span className="text-xs text-eco-dark/40">{new Date(h.time).toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoBox({ icon, label, value }) {
  return (
    <div className="bg-white/70 rounded-xl p-3">
      <div className="text-lg mb-1">{icon}</div>
      <div className="text-xs text-eco-dark/60">{label}</div>
      <div className="font-bold text-eco-darker text-sm">{value}</div>
    </div>
  );
}
