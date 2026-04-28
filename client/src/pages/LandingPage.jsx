import { Link } from 'react-router-dom';
import { Sprout, Sun, CloudRain, Thermometer, ArrowRight, CheckCircle2, Leaf, BookOpen, ShieldCheck } from 'lucide-react';

const seasons = [
  {
    name: 'Kharif (Monsoon)',
    months: 'June - October',
    crops: 'Chawal (Rice), Makka (Maize), Bajra, Jowar, Soyabean, Kapas (Cotton)',
    desc: 'Ye faslein monsoon ki baarish par nirbhar karti hain. Inhe zyada paani aur garmi ki zaroorat hoti hai.',
    icon: CloudRain,
    color: 'emerald'
  },
  {
    name: 'Rabi (Winter)',
    months: 'November - March',
    crops: 'Gehun (Wheat), Jau (Barley), Chana (Gram), Sarson (Mustard), Matar (Peas)',
    desc: 'Inhe thande mausam aur kam paani ki zaroorat hoti hai. Inki buvai sardi ke shuruat mein hoti hai.',
    icon: Thermometer,
    color: 'blue'
  },
  {
    name: 'Zaid (Summer)',
    months: 'March - June',
    crops: 'Tarbuz, Kharbuja, Kheera, Moong, Urad, Chara (Fodder)',
    desc: 'Ye garmiyon ki faslein hain. Inhe tez dhoop aur bar-bar sinchai (irrigation) ki zaroorat hoti hai.',
    icon: Sun,
    color: 'amber'
  }
];

export default function LandingPage() {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-slate-900 rounded-[3rem] mx-4 mt-4 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900 to-slate-900" />
        
        <div className="relative z-10 max-w-4xl px-6 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest animate-bounce">
             🌱 Next-Gen Smart Farming
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            Kheti ko Banayein <br />
            <span className="text-emerald-500 italic">Smart aur Labhdayak</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Eco Farm AI ke saath kheti mein naye yug ki shuruat karein. Sahi samay par sahi salah, mausam ki jaankari aur fasal ki suraksha - sab ek hi jagah.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/signup" className="btn-primary px-10 py-5 text-base font-black shadow-2xl shadow-emerald-500/30 flex items-center gap-3 active:scale-95 transition-all">
              Kheti Shuru Karein <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/login" className="px-10 py-5 text-base font-bold text-white hover:bg-white/10 rounded-2xl transition-all">
              Login Karein
            </Link>
          </div>
        </div>
      </section>

      {/* Farming Seasons Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Kheti ke <span className="text-emerald-600">Seasons</span></h2>
          <p className="text-slate-500 font-medium max-w-xl mx-auto uppercase text-[10px] tracking-[0.3em]">Sahi samay par sahi fasal ka chunaav karein</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {seasons.map((s, i) => (
            <div key={i} className="card group hover:shadow-2xl transition-all duration-500 border-none p-8 relative overflow-hidden bg-white shadow-xl">
              <div className={`absolute top-0 right-0 w-24 h-24 bg-${s.color}-50 rounded-bl-[4rem] flex items-center justify-center transition-all group-hover:w-full group-hover:h-full group-hover:rounded-none group-hover:opacity-10 duration-500`}>
                <s.icon className={`w-8 h-8 text-${s.color}-600`} />
              </div>
              <div className="relative z-10 space-y-6">
                <div>
                  <div className={`text-[10px] font-black text-${s.color}-600 uppercase tracking-widest mb-2`}>{s.months}</div>
                  <h3 className="text-2xl font-black text-slate-900">{s.name}</h3>
                </div>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{s.desc}</p>
                <div className="pt-6 border-t border-slate-50">
                   <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Mukhya Faslein:</div>
                   <div className="text-sm font-bold text-slate-900">{s.crops}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works / What you need */}
      <section className="bg-slate-50 py-24 rounded-[4rem] mx-4">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Achi Paidavaar ke liye <span className="text-emerald-600">Kya Chahiye?</span></h2>
            <div className="space-y-4">
               {[
                 { title: 'Mitti ki Janch', desc: 'Fasal lagane se pahle mitti (soil) ka test zarur karwayein.', icon: Leaf },
                 { title: 'Sahi Beej ka Chunaav', desc: 'Certified aur high-yield wale beej (seeds) hi use karein.', icon: Sprout },
                 { title: 'Sahi Samay par Sinchai', desc: 'Mausam ke hisab se paani ka management karein.', icon: CloudRain },
                 { title: 'Keet aur Rog se Suraksha', desc: 'Fasal ki rozana nigraani karein aur sahi pesticide use karein.', icon: ShieldCheck }
               ].map((item, i) => (
                 <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                       <item.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                       <h4 className="font-bold text-slate-900">{item.title}</h4>
                       <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
          <div className="relative">
             <div className="aspect-square bg-emerald-500 rounded-[3rem] rotate-3 absolute inset-0 -z-10 opacity-10" />
             <img 
               src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80" 
               alt="Smart Farming" 
               className="rounded-[3rem] shadow-2xl"
             />
             <div className="absolute -bottom-8 -left-8 card bg-white p-6 shadow-2xl border-none max-w-xs animate-bounce-slow">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white">🏆</div>
                   <div>
                      <div className="text-xs font-black uppercase text-slate-900">Success Rate</div>
                      <div className="text-xl font-black text-emerald-600">+40% Better Yield</div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-emerald-600 rounded-[3rem] p-12 md:p-24 text-center text-white shadow-2xl shadow-emerald-600/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mt-32 blur-3xl" />
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Aaj hi humare saath judein aur kheti ko digital banayein!</h2>
            <p className="text-emerald-100 text-lg font-medium max-w-2xl mx-auto">
              Dashboard, Crop Prediction, aur Expert Advisor access karne ke liye apna account banayein.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="bg-white text-emerald-600 px-12 py-5 rounded-2xl text-base font-black hover:bg-emerald-50 transition-all shadow-xl">
                Naya Account Banayein
              </Link>
              <Link to="/about" className="flex items-center gap-2 px-8 py-4 text-white hover:bg-white/10 rounded-2xl transition-all">
                <BookOpen className="w-5 h-5" /> Poora Guide Padhein
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
