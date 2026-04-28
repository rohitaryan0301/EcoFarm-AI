/**
 * Daily Advisor Engine
 * Generates irrigation, fertilizer, and weather-based advice
 */

const cropData = {
  'Rice (Dhan)': { irrigDays: 3, fertDays: 21, waterNeed: 'high' },
  'Wheat (Gehun)': { irrigDays: 10, fertDays: 25, waterNeed: 'medium' },
  'Maize (Makka)': { irrigDays: 7, fertDays: 20, waterNeed: 'medium' },
  'Cotton (Kapas)': { irrigDays: 10, fertDays: 30, waterNeed: 'low' },
  'Sugarcane (Ganna)': { irrigDays: 5, fertDays: 45, waterNeed: 'high' },
  'Mustard (Sarson)': { irrigDays: 14, fertDays: 28, waterNeed: 'low' },
  'Bajra (Pearl Millet)': { irrigDays: 12, fertDays: 25, waterNeed: 'low' },
  'Potato (Aloo)': { irrigDays: 6, fertDays: 20, waterNeed: 'medium' },
  'Tomato (Tamatar)': { irrigDays: 4, fertDays: 15, waterNeed: 'medium' },
};

export function generateAdvice({ profile, weather }) {
  const crop = profile?.currentCrop || 'general';
  const data = cropData[crop] || { irrigDays: 7, fertDays: 21, waterNeed: 'medium' };
  const temp = weather?.temp || 25;
  const desc = (weather?.description || 'clear').toLowerCase();
  const rain = weather?.rainfall || 0;
  const now = new Date();

  // Irrigation advice
  let irrigation = {};
  const daysSinceWater = profile?.lastIrrigated
    ? Math.floor((now - new Date(profile.lastIrrigated)) / 86400000)
    : data.irrigDays;

  if (rain > 10) {
    irrigation = {
      urgency: 'none',
      title: '🌧️ Aaj paani mat dijiye',
      message: `Baarish ho rahi hai (${rain}mm). Aaj irrigation ki zarurat nahi. Kal check karein.`,
      nextIn: 'Kal assess karein',
    };
  } else if (daysSinceWater >= data.irrigDays) {
    irrigation = {
      urgency: 'high',
      title: '💧 Aaj paani dena zaroori hai!',
      message: `${crop} ko ${data.irrigDays} din mein ek baar paani chahiye. Aaj ${daysSinceWater} din ho gaye hain.`,
      nextIn: `${data.irrigDays} din baad`,
    };
  } else {
    const remaining = data.irrigDays - daysSinceWater;
    irrigation = {
      urgency: 'low',
      title: '✅ Paani theek hai abhi',
      message: `${crop} ko ${remaining} din baad paani dijiye. Abhi moisture level sahi hai.`,
      nextIn: `${remaining} din baad`,
    };
  }

  // Fertilizer advice
  let fertilizer = {};
  const daysSinceFert = profile?.lastFertilized
    ? Math.floor((now - new Date(profile.lastFertilized)) / 86400000)
    : 0;

  if (daysSinceFert >= data.fertDays) {
    fertilizer = {
      urgency: 'high',
      title: '🌿 Fertilizer dene ka samay!',
      message: `${crop} ko ${data.fertDays} din mein fertilizer chahiye. Urea ya DAP use karein.`,
      tip: temp > 30 ? 'Subah ya shaam mein fertilizer daalein – garmi mein evaporation zyada hoti hai' : 'Dopahar mein bhi de sakte hain',
    };
  } else {
    const remaining = data.fertDays - daysSinceFert;
    fertilizer = {
      urgency: 'low',
      title: '✅ Fertilizer abhi mat dijiye',
      message: `Agle ${remaining} din baad fertilizer dena hoga.`,
      tip: 'Mitti ki namkeen taste check karte rahe',
    };
  }

  // Weather-based advice
  const weatherAdvice = [];
  if (temp > 38) weatherAdvice.push({ icon: '🌡️', text: 'Bahut garmi hai – seedlings ko shade dein aur extra paani dein' });
  if (temp < 10) weatherAdvice.push({ icon: '❄️', text: 'Thand zyada hai – fasal ko plastic sheet se dhakein' });
  if (desc.includes('storm')) weatherAdvice.push({ icon: '⛈️', text: 'Toofan aa sakta hai – support structures check karein' });
  if (desc.includes('fog')) weatherAdvice.push({ icon: '🌫️', text: 'Kohra hai – fungus ho sakta hai, fungicide spray karein' });
  if (desc.includes('clear') && temp >= 22 && temp <= 32)
    weatherAdvice.push({ icon: '☀️', text: 'Aaj ka mausam bahut accha hai khet ke liye!' });
  if (weatherAdvice.length === 0)
    weatherAdvice.push({ icon: '🌤️', text: 'Mausam theek hai – routine farming karein' });

  return { irrigation, fertilizer, weatherAdvice };
}
