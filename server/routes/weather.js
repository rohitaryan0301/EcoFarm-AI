import express from 'express';
import axios from 'axios';

const router = express.Router();

// Mock weather data for when API key is not available
function getMockWeather(city) {
  const weathers = [
    { temp: 28, feels_like: 31, description: 'Partly cloudy', icon: '⛅', humidity: 65, wind: 12, rainfall: 0 },
    { temp: 32, feels_like: 36, description: 'Clear sky', icon: '☀️', humidity: 45, wind: 8, rainfall: 0 },
    { temp: 22, feels_like: 22, description: 'Light rain', icon: '🌧️', humidity: 82, wind: 15, rainfall: 8 },
    { temp: 18, feels_like: 16, description: 'Cloudy', icon: '☁️', humidity: 72, wind: 20, rainfall: 0 },
    { temp: 35, feels_like: 40, description: 'Hot and sunny', icon: '🌞', humidity: 38, wind: 6, rainfall: 0 },
  ];
  const idx = city.charCodeAt(0) % weathers.length;
  return {
    city: city,
    ...weathers[idx],
    forecast: [
      { day: 'Aaj', icon: weathers[idx].icon, temp: weathers[idx].temp, desc: weathers[idx].description },
      { day: 'Kal', icon: '⛅', temp: weathers[idx].temp - 2, desc: 'Partly cloudy' },
      { day: '2 Din Baad', icon: '🌧️', temp: weathers[idx].temp - 5, desc: 'Light rain' },
    ],
    alerts: generateAlerts(weathers[idx].temp, weathers[idx].rainfall, weathers[idx].description),
    isMock: true,
  };
}

function generateAlerts(temp, rainfall, desc) {
  const alerts = [];
  if (temp > 38) alerts.push({ type: 'warning', message: '🌡️ Bahut garmi – seedlings protect karein' });
  if (temp < 8) alerts.push({ type: 'warning', message: '❄️ Thand – fasal ko dhakein' });
  if (rainfall > 20) alerts.push({ type: 'info', message: '🌧️ Baarish – aaj irrigation mat karein' });
  if (desc.toLowerCase().includes('storm')) alerts.push({ type: 'danger', message: '⛈️ Aandhi-toofan – khet mein mat jayein' });
  return alerts;
}

// GET /api/weather/coords/:lat/:lon
router.get('/coords/:lat/:lon', async (req, res) => {
  const { lat, lon } = req.params;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey || apiKey === 'your_key_here') {
    return res.json({ success: true, data: getMockWeather(`Lat:${lat}, Lon:${lon}`) });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const { data } = await axios.get(url);
    const result = {
      city: data.name || 'Unknown Location',
      temp: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      icon: getEmoji(data.weather[0].main),
      humidity: data.main.humidity,
      wind: Math.round(data.wind.speed * 3.6),
      rainfall: data.rain?.['1h'] || 0,
      forecast: [
        { day: 'Aaj', icon: getEmoji(data.weather[0].main), temp: Math.round(data.main.temp), desc: data.weather[0].description },
        { day: 'Kal', icon: '⛅', temp: Math.round(data.main.temp) - 2, desc: 'Partly cloudy' },
        { day: '2 Din Baad', icon: '🌧️', temp: Math.round(data.main.temp) - 5, desc: 'Light rain' },
      ],
      alerts: generateAlerts(data.main.temp, data.rain?.['1h'] || 0, data.weather[0].description),
      isMock: false,
    };
    res.json({ success: true, data: result });
  } catch (err) {
    res.json({ success: true, data: getMockWeather(`Lat:${lat}, Lon:${lon}`), message: 'Using mock data' });
  }
});

// GET /api/weather/:city
router.get('/:city', async (req, res) => {
  const { city } = req.params;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey || apiKey === 'your_key_here') {
    return res.json({ success: true, data: getMockWeather(city) });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const { data } = await axios.get(url);
    const result = {
      city: data.name,
      temp: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      icon: getEmoji(data.weather[0].main),
      humidity: data.main.humidity,
      wind: Math.round(data.wind.speed * 3.6),
      rainfall: data.rain?.['1h'] || 0,
      forecast: [
        { day: 'Aaj', icon: getEmoji(data.weather[0].main), temp: Math.round(data.main.temp), desc: data.weather[0].description },
        { day: 'Kal', icon: '⛅', temp: Math.round(data.main.temp) - 2, desc: 'Partly cloudy' },
        { day: '2 Din Baad', icon: '🌧️', temp: Math.round(data.main.temp) - 5, desc: 'Light rain' },
      ],
      alerts: generateAlerts(data.main.temp, data.rain?.['1h'] || 0, data.weather[0].description),
      isMock: false,
    };
    res.json({ success: true, data: result });
  } catch (err) {
    res.json({ success: true, data: getMockWeather(city), message: 'Using mock data' });
  }
});

function getEmoji(main) {
  const map = { Clear: '☀️', Clouds: '☁️', Rain: '🌧️', Thunderstorm: '⛈️', Snow: '❄️', Mist: '🌫️', Fog: '🌫️', Haze: '🌤️', Drizzle: '🌦️' };
  return map[main] || '🌤️';
}

export default router;
