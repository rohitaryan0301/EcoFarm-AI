import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const sections = [
  {
    id: 'soil',
    title: '🌍 Mitti ke Prakar (Soil Types)',
    color: 'from-amber-50 to-orange-50 border-amber-200',
    items: [
      { emoji: '🏜️', name: 'Sandy (Balui Mitti)', desc: 'Paani jaldi absorb karti hai. Cotton, Bajra ke liye sahi. Zyada fertilizer chahiye.', crops: 'Cotton, Bajra, Moongfali' },
      { emoji: '🌱', name: 'Loamy (Domat Mitti)', desc: 'Sabse best farming mitti. Paani aur nutrients dono retain karti hai.', crops: 'Wheat, Maize, Vegetables, Fruits' },
      { emoji: '🏺', name: 'Clay (Chikni Mitti)', desc: 'Paani zyada time tak retain karti hai. Rice ke liye perfect.', crops: 'Rice, Sugarcane' },
      { emoji: '💧', name: 'Silt (Silty Mitti)', desc: 'Nadi kinare milti hai, bahut fertile hoti hai.', crops: 'Almost all crops' },
      { emoji: '🔴', name: 'Red (Lal Mitti)', desc: 'Iron rich, kuch crops ke liye sahi. Acidic hoti hai.', crops: 'Groundnut, Pulses, Millets' },
    ]
  },
  {
    id: 'seasons',
    title: '📅 Fasal Rituen (Crop Seasons)',
    color: 'from-green-50 to-eco-light border-eco-light',
    items: [
      { emoji: '☀️', name: 'Kharif (Barishaati – June to Nov)', desc: 'Baarish ke mausam mein boi jaane wali fasalein.', crops: 'Rice, Maize, Cotton, Sugarcane, Bajra' },
      { emoji: '❄️', name: 'Rabi (Sardi – Nov to March)', desc: 'Sardi mein boi jaane wali fasalein, achhi nami chahiye.', crops: 'Wheat, Mustard, Peas, Potato, Barley' },
      { emoji: '🌸', name: 'Zaid (Garmi – March to June)', desc: 'Garmi mein thodi kam fasalein, paani zyada chahiye.', crops: 'Watermelon, Cucumber, Gourd, Sunflower' },
    ]
  },
  {
    id: 'watering',
    title: '💧 Paani Dene ke Tips (Watering Tips)',
    color: 'from-blue-50 to-cyan-50 border-blue-200',
    items: [
      { emoji: '🌅', name: 'Timing', desc: 'Hamesha subah 6-9 baje ya shaam 4-7 baje paani dein. Dhoop mein paani dene se plants ko nuksan hota hai.' },
      { emoji: '📏', name: 'Kitna Paani?', desc: 'Mitti ko 6 inch (15 cm) tak geela karein. Zyada paani se roots sad jaate hain (waterlogging).' },
      { emoji: '🌧️', name: 'Baarish ke Baad', desc: 'Baarish ke 2-3 din baad tak paani mat dein. Mitti ka moisture check karein – hath se dabake dekho.' },
      { emoji: '💡', name: 'Drip Irrigation', desc: 'Drip system sabse achha hai – 40-60% paani bachta hai aur directly roots tak jaata hai.' },
    ]
  },
  {
    id: 'fertilizer',
    title: '🌿 Fertilizer Guide (Khad)',
    color: 'from-green-50 to-lime-50 border-green-200',
    items: [
      { emoji: '🟡', name: 'Urea (Nitrogen – N)', desc: 'Patte hare aur bade karta hai. Excessive use se mitti kharab hoti hai. Use: 50-65 kg/acre.' },
      { emoji: '🟤', name: 'DAP (Phosphorus – P)', desc: 'Roots aur flowers ke liye. Transplanting ke time best. Use: 50 kg/acre.' },
      { emoji: '🔵', name: 'MOP/Potash (K)', desc: 'Fruits aur grains ko bada karta hai. Fruiting stage mein dein. Use: 33 kg/acre.' },
      { emoji: '🟢', name: 'Organic / Gobar Khad', desc: 'Best choice! Mitti ki quality sudharta hai. Koi side effect nahi. 4-6 tonne/acre use karein.' },
      { emoji: '⚠️', name: 'Dhyan rakhein!', desc: 'Kabhi bhi zyada fertilizer mat daalein. Soil test karwaaiye pehle – FREE service Krishi Kendra pe milti hai!' },
    ]
  },
  {
    id: 'pests',
    title: '🐛 Keet aur Bimari (Pests & Diseases)',
    color: 'from-red-50 to-rose-50 border-red-200',
    items: [
      { emoji: '🐛', name: 'Caterpillar / Sundi', desc: 'Raat mein patte khate hain. Fix: Chlorpyrifos 20 EC spray karein.' },
      { emoji: '🟡', name: 'Yellow Leaves (Pile Patte)', desc: 'Nitrogen ki kami ya fungus. Fix: Urea daalein ya Mancozeb fungicide spray karein.' },
      { emoji: '⚫', name: 'Black Spots (Kale Dabbe)', desc: 'Fungal infection. Fix: Carbendazim spray karein, plants ke beech jagah rakhein.' },
      { emoji: '🌿', name: 'Neem Oil (Organic)', desc: 'Sabse safe solution – kisi bhi keet ke liye. 5ml per liter paani mein milakar spray karein.' },
      { emoji: '👨‍⚕️', name: 'Krishi Officer', desc: 'Koi bhi bimari samajh na aaye toh turant Krishi Vigyan Kendra (KVK) se FREE salah lein.' },
    ]
  },
  {
    id: 'profit',
    title: '💰 Profit Badhane ke Tips',
    color: 'from-yellow-50 to-amber-50 border-amber-200',
    items: [
      { emoji: '📊', name: 'Mandi Price Track Karein', desc: 'Apne zile ki mandi me daily price check karein. eNAM app use karein – online sale bhi ho sakti hai.' },
      { emoji: '🤝', name: 'FPO Join Karein', desc: 'Farmer Producer Organization join karne se input cost kam hoti hai aur better price milta hai.' },
      { emoji: '🏦', name: 'Kisan Credit Card', desc: 'KCC se kam interest (4%) pe loan milta hai. Nearest bank mein apply karein.' },
      { emoji: '🌿', name: 'Organic Farming', desc: 'Organic vegetables 2-3x zyada price pe bikti hain cities mein. Switch karein gradually.' },
      { emoji: '📱', name: 'Direct Selling', desc: 'WhatsApp groups, local markets, ya apps jaise Agrimarket se directly consumers ko bechein.' },
    ]
  },
];

export default function FarmingGuide() {
  const [open, setOpen] = useState(null);

  return (
    <div className="p-4 lg:p-6 pb-24 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold gradient-text">📚 Farming Guide</h1>
        <p className="text-eco-dark/60 text-sm mt-1">Farming ke baare mein aasaan bhasha mein jaankari</p>
      </div>

      {/* Quick Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { emoji: '🌱', label: 'Soil Types', count: 5 },
          { emoji: '📅', label: 'Seasons', count: 3 },
          { emoji: '💡', label: 'Tips', count: '20+' },
        ].map((c, i) => (
          <div key={i} className="card text-center bg-gradient-to-br from-eco-light to-white border border-eco-light py-4">
            <div className="text-3xl mb-1">{c.emoji}</div>
            <div className="font-bold text-eco-deeper text-sm">{c.label}</div>
            <div className="text-xs text-eco-dark/50 mt-0.5">{c.count} topics</div>
          </div>
        ))}
      </div>

      {/* Accordion Sections */}
      <div className="space-y-3">
        {sections.map(sec => (
          <div key={sec.id} className={`rounded-2xl border bg-gradient-to-br ${sec.color} overflow-hidden`}>
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left"
              onClick={() => setOpen(open === sec.id ? null : sec.id)}
              id={`guide-${sec.id}`}
            >
              <span className="font-bold text-eco-deeper text-base">{sec.title}</span>
              {open === sec.id
                ? <ChevronUp className="w-5 h-5 text-eco-dark flex-shrink-0" />
                : <ChevronDown className="w-5 h-5 text-eco-dark flex-shrink-0" />}
            </button>

            {open === sec.id && (
              <div className="px-5 pb-5 space-y-3">
                {sec.items.map((item, i) => (
                  <div key={i} className="bg-white/70 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{item.emoji}</span>
                      <span className="font-semibold text-eco-deeper text-sm">{item.name}</span>
                    </div>
                    <p className="text-sm text-eco-dark/70 leading-relaxed">{item.desc}</p>
                    {item.crops && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {item.crops.split(', ').map((c, ci) => (
                          <span key={ci} className="badge bg-eco-light text-eco-dark">🌱 {c}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Helpline */}
      <div className="mt-6 card bg-gradient-to-br from-green-50 to-eco-light border border-eco-base">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">📞</span>
          <div>
            <div className="font-bold text-eco-deeper">Kisan Helpline</div>
            <div className="text-sm text-eco-dark/70">FREE government farming help</div>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 bg-white/60 rounded-xl px-3 py-2">
            <span>🌾</span> <strong>Kisan Call Center:</strong> <span className="text-eco-dark font-bold ml-auto">1800-180-1551</span>
          </div>
          <div className="flex items-center gap-2 bg-white/60 rounded-xl px-3 py-2">
            <span>☁️</span> <strong>PM Kisan Helpline:</strong> <span className="text-eco-dark font-bold ml-auto">155261</span>
          </div>
          <div className="flex items-center gap-2 bg-white/60 rounded-xl px-3 py-2">
            <span>🏦</span> <strong>Soil Testing:</strong> <span className="text-eco-dark font-medium ml-auto">Nearest KVK (Free)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
