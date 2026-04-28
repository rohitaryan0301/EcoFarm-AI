import express from 'express';

const router = express.Router();

// Simple rule-based chatbot with Hindi/Hinglish support
const responses = [
  // Irrigation queries
  {
    keywords: ['paani', 'pani', 'irrigation', 'water', 'sinchai', 'seench'],
    response: (profile, weather) => {
      if (weather?.rainfall > 10) return `🌧️ Aaj baarish ho rahi hai (${weather.rainfall}mm), isliye aaj paani dene ki zaroorat nahi! Kal assess karein.`;
      if (profile?.currentCrop) return `💧 ${profile.currentCrop} ke liye har 7-10 din mein ek baar paani dein. Subah ya shaam mein sinchai karein, dhoop mein nahi.`;
      return '💧 Sinchai ke liye seedling ka dhyan rakhein – mitti ki upar ki parat sukh jaane par paani dein.';
    }
  },
  // Today what to do
  {
    keywords: ['aaj kya', 'kya karu', 'kya karun', 'today', 'abhi kya', 'kya karein'],
    response: (profile, weather) => {
      const temp = weather?.temp || 25;
      const crop = profile?.currentCrop || 'apni fasal';
      if (temp > 35) return `☀️ Aaj bahut garmi hai (${temp}°C). ${crop} ko extra paani dein aur seedlings ko shade karein. Khud bhi dhoop se bachein!`;
      return `✅ Aaj ${crop} ki regular dekhbhal karein – patton ko check karein, weeds hataayein, aur paani ka level dekhen. Mausam accha hai!`;
    }
  },
  // Weather queries
  {
    keywords: ['mausam', 'weather', 'temperature', 'baarish', 'rain', 'barish'],
    response: (profile, weather) => {
      if (weather) return `🌤️ Aaj ka mausam: ${weather.description}, Temp: ${weather.temp}°C, Humidity: ${weather.humidity}%. ${weather.rainfall > 0 ? `Baarish: ${weather.rainfall}mm` : 'Koi baarish nahi.'}`;
      return '🌤️ Mausam jaankari abhi uplabdh nahi. Farm Profile mein apna location daalen.';
    }
  },
  // Fertilizer
  {
    keywords: ['fertilizer', 'khad', 'urea', 'dap', 'nutrients', 'poshan'],
    response: (profile, weather) => {
      const crop = profile?.currentCrop || 'fasal';
      return `🌿 ${crop} ke liye: Pehle Urea (Nitrogen) use karein agar patte pale hain. DAP transplanting ke time use karein. Potash (MOP) fruiting stage mein dein. Hamesha subah ya shaam mein daalein, garmi mein nahi.`;
    }
  },
  // Pest/disease
  {
    keywords: ['keet', 'rog', 'beemari', 'pest', 'disease', 'insects', 'fungus', 'kitaanu'],
    response: () => '🐛 Agar patte mein hole dikhe toh Chlorpyrifos spray karein. Agar patte pile hon toh fungicide use karein. Neem oil ek achha organic option hai. Doctor (Agricultural Officer) se salah zaroor lein!',
  },
  // Profit/money
  {
    keywords: ['profit', 'paisa', 'income', 'kamai', 'paise', 'labh', 'nuksan'],
    response: (profile) => {
      const crop = profile?.currentCrop || 'apni fasal';
      return `💰 ${crop} ki kheti mein achi kamai ho sakti hai. Mandi price daily check karein. Seedlings, fertilizer, aur pesticide ka kharch minus karke net profit nikalein. FPO ya Cooperative join karein best rates ke liye.`;
    }
  },
  // Soil
  {
    keywords: ['mitti', 'soil', 'bhumi', 'zameen', 'dharti'],
    response: (profile) => {
      const soil = profile?.soilType || 'aapki mitti';
      return `🌱 ${soil} mitti ke liye: Organic matter (gobar ki khad) se mitti ki quality sudhare. pH 6-7 achha hota hai. Soil test har 2 saal mein karwayein – Krishi Vigyan Kendra se FREE milta hai!`;
    }
  },
  // Health / score
  {
    keywords: ['health', 'score', 'condition', 'haalat', 'theek', 'achha'],
    response: () => 'Farm health score dekhe Dashboard pe! 🌟 Agar score 75+ hai toh excellent. Score badhane ke liye regular paani, fertilizer, aur pest control karein.',
  },
  // Help
  {
    keywords: ['help', 'madad', 'kya', 'batao', 'bolo', 'samjhao'],
    response: () => `🤖 Main aapki madad kar sakta hoon:\n• 💧 "Paani dena hai kya?" – sinchai advice\n• 🌿 "Khad kab daalein?" – fertilizer timing\n• 🌡️ "Mausam kaisa hai?" – weather info\n• 💰 "Profit kitna hoga?" – income estimate\n• 🐛 "Keet lag gaye!" – pest control\n\nKoi bhi sawaal poochein!`,
  },
  // Greeting
  {
    keywords: ['hello', 'hi', 'namaste', 'jai', 'helo', 'namaskar', 'namskar'],
    response: (profile) => `🙏 Namaste ${profile?.name || 'Kisan Bhai'}! Main aapka Eco Farm AI assistant hoon. Aaj khet mein kya jaankari chahiye? Kisi bhi sawaal ke liye likhen!`,
  },
];

function getBotResponse(message, profile, weather) {
  const lower = message.toLowerCase();
  for (const rule of responses) {
    if (rule.keywords.some(kw => lower.includes(kw))) {
      return rule.response(profile, weather);
    }
  }
  // Default response
  return `🤖 Samajh nahi aaya. Kripya in topics mein se kuch poochein:\n• Paani / Irrigation\n• Fertilizer / Khad\n• Mausam / Weather\n• Keet / Pest\n• Profit / Kamai\n\nYa "help" type karein!`;
}

// POST /api/chatbot
router.post('/', (req, res) => {
  try {
    const { message, profile, weather } = req.body;
    if (!message) return res.status(400).json({ error: 'Message required' });
    const response = getBotResponse(message, profile, weather);
    res.json({ success: true, response, timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
