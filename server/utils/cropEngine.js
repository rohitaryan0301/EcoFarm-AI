/**
 * Rule-based Crop Prediction Engine
 * Returns best crop recommendation based on environmental inputs
 */

const crops = [
  {
    name: 'Rice (Dhan)',
    emoji: '🌾',
    conditions: {
      soils: ['clay', 'loamy', 'silt'],
      minTemp: 20, maxTemp: 35,
      minRainfall: 150, maxRainfall: 1000,
      minHumidity: 70,
    },
    waterReq: '1200–2000 mm per season',
    yieldPerAcre: '20–25 quintal',
    profitPerAcre: '₹30,000–40,000',
    reason: 'Clay/loamy soil with high rainfall and humidity makes this ideal for paddy cultivation.',
    season: 'Kharif (June–November)',
  },
  {
    name: 'Wheat (Gehun)',
    emoji: '🌿',
    conditions: {
      soils: ['loamy', 'sandy', 'clay'],
      minTemp: 10, maxTemp: 25,
      minRainfall: 30, maxRainfall: 100,
      minHumidity: 0,
    },
    waterReq: '450–650 mm per season',
    yieldPerAcre: '15–20 quintal',
    profitPerAcre: '₹18,000–28,000',
    reason: 'Cool temperature and moderate rainfall suit wheat perfectly.',
    season: 'Rabi (November–March)',
  },
  {
    name: 'Maize (Makka)',
    emoji: '🌽',
    conditions: {
      soils: ['loamy', 'sandy', 'red'],
      minTemp: 21, maxTemp: 35,
      minRainfall: 60, maxRainfall: 110,
      minHumidity: 40,
    },
    waterReq: '500–800 mm per season',
    yieldPerAcre: '20–30 quintal',
    profitPerAcre: '₹22,000–35,000',
    reason: 'Warm climate and well-drained soil are perfect for maize growth.',
    season: 'Kharif (June–September)',
  },
  {
    name: 'Cotton (Kapas)',
    emoji: '🌸',
    conditions: {
      soils: ['sandy', 'loamy', 'red'],
      minTemp: 25, maxTemp: 40,
      minRainfall: 50, maxRainfall: 100,
      minHumidity: 30,
    },
    waterReq: '700–1200 mm per season',
    yieldPerAcre: '8–12 quintal',
    profitPerAcre: '₹40,000–60,000',
    reason: 'Hot and dry conditions with sandy soil are ideal for cotton cultivation.',
    season: 'Kharif (May–November)',
  },
  {
    name: 'Sugarcane (Ganna)',
    emoji: '🎋',
    conditions: {
      soils: ['loamy', 'clay', 'silt'],
      minTemp: 25, maxTemp: 38,
      minRainfall: 100, maxRainfall: 200,
      minHumidity: 65,
    },
    waterReq: '1500–2500 mm per season',
    yieldPerAcre: '250–350 quintal',
    profitPerAcre: '₹60,000–90,000',
    reason: 'High humidity and warm temperature favor sugarcane growth in loamy soils.',
    season: 'Annual (planted Feb–March)',
  },
  {
    name: 'Mustard (Sarson)',
    emoji: '🌼',
    conditions: {
      soils: ['sandy', 'loamy', 'red'],
      minTemp: 5, maxTemp: 20,
      minRainfall: 25, maxRainfall: 70,
      minHumidity: 0,
    },
    waterReq: '250–400 mm per season',
    yieldPerAcre: '6–10 quintal',
    profitPerAcre: '₹15,000–25,000',
    reason: 'Cold temperature and low rainfall suit mustard as a winter oilseed crop.',
    season: 'Rabi (October–February)',
  },
  {
    name: 'Bajra (Pearl Millet)',
    emoji: '🌾',
    conditions: {
      soils: ['sandy', 'red'],
      minTemp: 27, maxTemp: 42,
      minRainfall: 20, maxRainfall: 70,
      minHumidity: 20,
    },
    waterReq: '200–350 mm per season',
    yieldPerAcre: '10–15 quintal',
    profitPerAcre: '₹10,000–18,000',
    reason: 'Bajra thrives in hot, dry conditions on sandy soils with minimal rainfall.',
    season: 'Kharif (June–September)',
  },
  {
    name: 'Potato (Aloo)',
    emoji: '🥔',
    conditions: {
      soils: ['loamy', 'sandy', 'silt'],
      minTemp: 10, maxTemp: 22,
      minRainfall: 50, maxRainfall: 120,
      minHumidity: 50,
    },
    waterReq: '500–700 mm per season',
    yieldPerAcre: '80–120 quintal',
    profitPerAcre: '₹40,000–70,000',
    reason: 'Cool climate, well-drained loamy soil, and moderate moisture are ideal for potatoes.',
    season: 'Rabi (October–March)',
  },
  {
    name: 'Tomato (Tamatar)',
    emoji: '🍅',
    conditions: {
      soils: ['loamy', 'silt', 'red'],
      minTemp: 18, maxTemp: 30,
      minRainfall: 60, maxRainfall: 120,
      minHumidity: 50,
    },
    waterReq: '400–600 mm per season',
    yieldPerAcre: '100–150 quintal',
    profitPerAcre: '₹50,000–90,000',
    reason: 'Mild temperature and good drainage support healthy tomato production.',
    season: 'Year-round (best: Oct–Feb)',
  },
];

export function predictCrop({ soilType, temperature, rainfall, humidity }) {
  const temp = parseFloat(temperature);
  const rain = parseFloat(rainfall);
  const humid = parseFloat(humidity);

  const scored = crops.map(crop => {
    const c = crop.conditions;
    let score = 0;
    if (c.soils.includes(soilType)) score += 30;
    if (temp >= c.minTemp && temp <= c.maxTemp) score += 30;
    else score -= Math.min(20, Math.abs(temp - (c.minTemp + c.maxTemp) / 2));
    if (rain >= c.minRainfall && rain <= c.maxRainfall) score += 25;
    else score -= Math.min(15, Math.abs(rain - (c.minRainfall + c.maxRainfall) / 2) / 10);
    if (humid >= c.minHumidity) score += 15;
    return { ...crop, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const best = scored[0];
  const alternatives = scored.slice(1, 3).map(c => ({ name: c.name, emoji: c.emoji }));

  return {
    crop: best.name,
    emoji: best.emoji,
    reason: best.reason,
    waterReq: best.waterReq,
    yieldEstimate: best.yieldPerAcre,
    profitEstimate: best.profitPerAcre,
    season: best.season,
    alternatives,
    score: Math.max(0, Math.min(100, Math.round(best.score))),
  };
}
