import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { translations } from '../utils/translations';

const FarmContext = createContext(null);

const API = 'http://localhost:5000/api';

const defaultProfile = {
  name: 'Kisan Bhai',
  location: 'Delhi',
  soilType: 'loamy',
  currentCrop: 'Wheat (Gehun)',
  farmSize: 2,
  waterSource: 'canal',
  irrigationDays: 10,
  lastIrrigated: new Date(Date.now() - 5 * 86400000).toISOString(),
  lastFertilized: new Date(Date.now() - 20 * 86400000).toISOString(),
};

export function FarmProvider({ children }) {
  const { user } = useAuth();
  const [language, setLanguage] = useState(localStorage.getItem('ecoFarmLang') || 'hi');
  const [theme, setTheme] = useState(localStorage.getItem('ecoFarmTheme') || 'light');
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('farmProfile');
      return saved ? JSON.parse(saved) : defaultProfile;
    } catch { return defaultProfile; }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('ecoFarmTheme', theme);
  }, [theme]);

  const t = (key) => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  useEffect(() => {
    localStorage.setItem('ecoFarmLang', language);
  }, [language]);

  // Sync profile name with logged in user
  useEffect(() => {
    if (user?.name && profile?.name !== user.name) {
      setProfile(prev => ({ ...prev, name: user.name }));
    }
  }, [user]);

  const [weather, setWeather] = useState(null);
  const [healthScore, setHealthScore] = useState(null);
  const [advice, setAdvice] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('farmProfile', JSON.stringify(profile));
  }, [profile]);

  // Fetch weather on location change
  useEffect(() => {
    if (profile?.location) {
      fetchWeather(profile.location);
    } else {
      detectLocation();
    }
  }, [profile?.location]);

  // Fetch health + advice when profile or weather changes
  useEffect(() => {
    if (profile) {
      fetchHealthScore();
      fetchAdvice();
    }
  }, [profile, weather]);

  const fetchWeather = async (city) => {
    try {
      const { data } = await axios.get(`${API}/weather/${encodeURIComponent(city)}`);
      if (data.success) {
        setWeather(data.data);
        setAlerts(data.data.alerts || []);
      }
    } catch (e) {
      console.warn('Weather fetch failed');
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const { data } = await axios.get(`${API}/weather/coords/${lat}/${lon}`);
      if (data.success) {
        setWeather(data.data);
        setAlerts(data.data.alerts || []);
        // Update profile location name if it's currently empty
        if (!profile.location || profile.location === 'Delhi') {
          setProfile(prev => ({ ...prev, location: data.data.city }));
        }
      }
    } catch (e) {
      console.warn('Coords weather fetch failed');
    }
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      console.warn('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      (err) => {
        console.warn('Geolocation failed', err);
        // Fallback to default location
        fetchWeather(profile?.location || 'Delhi');
      }
    );
  };

  const fetchHealthScore = async () => {
    try {
      const { data } = await axios.post(`${API}/health/score`, { profile, weather });
      if (data.success) setHealthScore(data.data);
    } catch (e) {
      // Fallback calculation
      setHealthScore({ score: 72, status: 'Good 👍', color: '#84cc16', tips: ['✅ Farm health decent hai'] });
    }
  };

  const fetchAdvice = async () => {
    try {
      const { data } = await axios.post(`${API}/advisor`, { profile, weather });
      if (data.success) setAdvice(data.data);
    } catch (e) {
      console.warn('Advice fetch failed');
    }
  };

  const updateProfile = async (newProfile) => {
    const merged = { ...profile, ...newProfile };
    setProfile(merged);
    try {
      await axios.post(`${API}/profile`, merged);
    } catch (e) {}
  };

  const predictCrop = async (inputs) => {
    const { data } = await axios.post(`${API}/crop/predict`, inputs);
    return data;
  };

  const sendChatMessage = async (message) => {
    const { data } = await axios.post(`${API}/chatbot`, { message, profile, weather });
    return data;
  };

  return (
    <FarmContext.Provider value={{
      profile, updateProfile,
      weather, fetchWeather, detectLocation,
      healthScore,
      advice,
      alerts,
      loading,
      predictCrop,
      sendChatMessage,
      API,
      language,
      setLanguage,
      theme,
      setTheme,
      t
    }}>
      {children}
    </FarmContext.Provider>
  );
}

export const useFarm = () => {
  const ctx = useContext(FarmContext);
  if (!ctx) throw new Error('useFarm must be used inside FarmProvider');
  return ctx;
};
