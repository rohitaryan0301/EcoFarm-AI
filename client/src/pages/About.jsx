export default function About() {
  const techStack = [
    { icon: '⚛️', name: 'React.js', desc: 'Frontend UI' },
    { icon: '🎨', name: 'Tailwind CSS', desc: 'Styling' },
    { icon: '🌿', name: 'Node.js + Express', desc: 'Backend API' },
    { icon: '🍃', name: 'MongoDB', desc: 'Database' },
    { icon: '📊', name: 'Recharts', desc: 'Charts & Graphs' },
    { icon: '🌤️', name: 'OpenWeatherMap', desc: 'Weather Data' },
  ];

  const stats = [
    { value: '9+', label: 'Crops Covered' },
    { value: '7', label: 'App Pages' },
    { value: '6', label: 'API Routes' },
    { value: '5', label: 'Soil Types' },
  ];

  const features = [
    { icon: '🌾', title: 'Smart Crop Prediction', desc: 'Rule-based AI engine that recommends best crops based on soil, temperature, rainfall, and humidity.' },
    { icon: '💡', title: 'Daily Farming Advisor', desc: 'Personalized irrigation, fertilizer, and weather-based advice updated daily.' },
    { icon: '🤖', title: 'Hindi/Hinglish Chatbot', desc: 'Conversational assistant that understands Hindi farming queries and gives contextual advice.' },
    { icon: '🌡️', title: 'Real-time Weather', desc: 'Live weather integration with automatic alerts for rain, high temperature, and storms.' },
    { icon: '📊', title: 'Farm Health Score', desc: 'Comprehensive 0-100 score calculated from water usage, weather suitability, and crop condition.' },
    { icon: '📚', title: 'Farming Guide', desc: 'Complete guide covering soil types, crop seasons, watering techniques, and pest control.' },
  ];

  return (
    <div className="p-4 lg:p-6 pb-24 max-w-3xl mx-auto">
      {/* Hero */}
      <div className="mb-8 bg-gradient-to-br from-eco-deeper to-eco-dark rounded-2xl p-6 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 text-[120px] leading-none opacity-5 flex items-center justify-center pointer-events-none">🌾</div>
        <div className="text-5xl mb-3">🌱</div>
        <h1 className="text-3xl font-bold mb-2">Eco Farm AI</h1>
        <p className="text-eco-base text-sm">Digital Kisan Saathi – India ke Kisan ka Smart Farming Partner</p>
        <div className="mt-4 inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm">
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          Version 1.0 – Made with ❤️ for Indian Farmers
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {stats.map((s, i) => (
          <div key={i} className="card text-center py-4">
            <div className="text-3xl font-bold gradient-text">{s.value}</div>
            <div className="text-xs text-eco-dark/60 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Problem → Solution */}
      <div className="card mb-5">
        <h2 className="font-bold text-eco-deeper text-lg mb-4">🤔 Problem & Solution</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <h3 className="font-bold text-red-700 mb-2">❌ Problem</h3>
            <ul className="text-sm text-red-800 space-y-1.5">
              <li>• Indian farmers manually decide crops – mostly guess work</li>
              <li>• No personalized irrigation or fertilizer schedule</li>
              <li>• Language barrier – most apps are English only</li>
              <li>• No affordable digital farming tool available</li>
              <li>• Farmers miss crucial weather alerts</li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h3 className="font-bold text-green-700 mb-2">✅ Solution</h3>
            <ul className="text-sm text-green-800 space-y-1.5">
              <li>• AI-powered crop recommendation engine</li>
              <li>• Personalized daily advisor based on farm data</li>
              <li>• Full Hindi/Hinglish chatbot support</li>
              <li>• FREE to use, mobile-first design</li>
              <li>• Real-time weather alerts and suggestions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="card mb-5">
        <h2 className="font-bold text-eco-deeper text-lg mb-4">✨ Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-eco-light/40 rounded-xl">
              <span className="text-2xl flex-shrink-0">{f.icon}</span>
              <div>
                <div className="font-semibold text-eco-deeper text-sm">{f.title}</div>
                <div className="text-xs text-eco-dark/70 leading-relaxed mt-0.5">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="card mb-5">
        <h2 className="font-bold text-eco-deeper text-lg mb-4">⚙️ Tech Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {techStack.map((t, i) => (
            <div key={i} className="flex items-center gap-3 bg-eco-light/40 rounded-xl p-3">
              <span className="text-2xl">{t.icon}</span>
              <div>
                <div className="font-semibold text-eco-deeper text-sm">{t.name}</div>
                <div className="text-xs text-eco-dark/50">{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture */}
      <div className="card mb-5 bg-gradient-to-br from-eco-light to-white border border-eco-light">
        <h2 className="font-bold text-eco-deeper text-lg mb-3">🏗️ Architecture</h2>
        <div className="space-y-3 text-sm">
          {[
            { from: 'Farmer', icon: '👨‍🌾', to: 'React Frontend' },
            { from: 'React Frontend', icon: '⚛️', to: 'Express REST API' },
            { from: 'Express API', icon: '🔀', to: 'Crop Engine / Advisor / Chatbot' },
            { from: 'Express API', icon: '🗄️', to: 'MongoDB (Profile & History)' },
            { from: 'Express API', icon: '🌤️', to: 'OpenWeatherMap API' },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-2 bg-white/60 rounded-xl px-4 py-2.5">
              <span className="text-base">{a.icon}</span>
              <span className="text-eco-dark/60">{a.from}</span>
              <span className="text-eco-base mx-1">→</span>
              <span className="font-medium text-eco-darker">{a.to}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer credit */}
      <div className="text-center text-sm text-eco-dark/40 py-4">
        🌱 Eco Farm AI – Built for Bharat's Farmers<br />
        Made with React + Node.js + MongoDB
      </div>
    </div>
  );
}
