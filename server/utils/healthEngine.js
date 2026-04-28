/**
 * Farm Health Score Engine
 * Calculates 0-100 score based on water, weather, and crop condition
 */

export function calculateHealthScore({ profile, weather }) {
  const now = new Date();

  // --- Water Score (0-40) ---
  let waterScore = 40;
  if (profile?.lastIrrigated) {
    const daysSinceWater = Math.floor((now - new Date(profile.lastIrrigated)) / 86400000);
    const recommended = profile.irrigationDays || 7;
    if (daysSinceWater <= recommended) waterScore = 40;
    else if (daysSinceWater <= recommended * 1.5) waterScore = 28;
    else if (daysSinceWater <= recommended * 2) waterScore = 15;
    else waterScore = 5;
  }

  // --- Weather Score (0-35) ---
  let weatherScore = 25; // default if no weather
  if (weather) {
    const temp = weather.temp || 25;
    const desc = (weather.description || '').toLowerCase();
    // Ideal temp range
    if (temp >= 18 && temp <= 32) weatherScore = 35;
    else if (temp >= 12 && temp <= 38) weatherScore = 25;
    else if (temp >= 5 && temp <= 42) weatherScore = 15;
    else weatherScore = 5;
    // Bonus for good weather
    if (desc.includes('clear') || desc.includes('partly')) weatherScore = Math.min(35, weatherScore + 5);
    if (desc.includes('storm') || desc.includes('flood')) weatherScore = Math.max(0, weatherScore - 10);
  }

  // --- Crop Score (0-25) ---
  let cropScore = 20;
  if (profile?.lastFertilized) {
    const daysSinceFert = Math.floor((now - new Date(profile.lastFertilized)) / 86400000);
    if (daysSinceFert <= 30) cropScore = 25;
    else if (daysSinceFert <= 60) cropScore = 18;
    else cropScore = 10;
  }

  const total = waterScore + weatherScore + cropScore;
  const status = total >= 75 ? 'Excellent 🌟' : total >= 55 ? 'Good 👍' : total >= 35 ? 'Fair ⚠️' : 'Poor 🚨';
  const color = total >= 75 ? '#22c55e' : total >= 55 ? '#84cc16' : total >= 35 ? '#f59e0b' : '#ef4444';

  return {
    score: total,
    waterScore,
    weatherScore,
    cropScore,
    status,
    color,
    tips: generateTips(waterScore, weatherScore, cropScore),
  };
}

function generateTips(w, we, c) {
  const tips = [];
  if (w < 20) tips.push('💧 Seedling ko paani dijiye – khet sukh raha hai');
  if (we < 20) tips.push('🌡️ Mausam ka dhyan rakhein – temperature theek nahi hai');
  if (c < 15) tips.push('🌿 Fertilizer dene ka samay aa gaya hai');
  if (tips.length === 0) tips.push('✅ Sab theek hai! Farm ka health excellent hai');
  return tips;
}
