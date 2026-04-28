import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Lock, Loader2, ArrowRight, Leaf, Sprout, MapPin, TrendingUp } from 'lucide-react';
import GoogleAuthModal from '../components/GoogleAuthModal';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    state: '',
    farmSize: '',
    primaryCrop: 'Rice (Dhan)'
  });
  const [loading, setLoading] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSuccess = () => {
    signup({ 
      name: 'Rohit Kumar', 
      email: 'rohit.farm@gmail.com',
      state: 'Punjab',
      farmSize: '5',
      primaryCrop: 'Wheat (Gehun)'
    });
    setShowGoogleModal(false);
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      signup(formData);
      setLoading(false);
      navigate('/');
    }, 1500);
  };

  const crops = ['Rice (Dhan)', 'Wheat (Gehun)', 'Maize (Makka)', 'Cotton (Kapas)', 'Sugarcane (Ganna)', 'Other'];

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex w-16 h-16 rounded-3xl bg-emerald-500/10 items-center justify-center border border-emerald-500/20 mb-6">
            <Leaf className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Account Banayein ✨</h1>
          <p className="text-slate-500 mt-2 font-medium">Digital kheti ki shuruat karein</p>
        </div>

        <div className="card shadow-2xl border-none p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Personal Info */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-50 pb-2">
                 <User className="w-4 h-4 text-emerald-500" />
                 <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Aapki Jankari</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Pura Naam</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                    <input type="text" required placeholder="Naam dalein" className="form-input !pl-12" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Email / Phone</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                    <input type="text" required placeholder="email@example.com" className="form-input !pl-12" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Farm Info */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-50 pb-2">
                 <Sprout className="w-4 h-4 text-emerald-500" />
                 <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Farm ki Jankari</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Rajya (State)</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                    <input type="text" required placeholder="Punjab, UP, etc." className="form-input !pl-12" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Farm Size (Acres)</label>
                  <div className="relative group">
                    <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                    <input type="number" required placeholder="Ex: 5" className="form-input !pl-12" value={formData.farmSize} onChange={(e) => setFormData({...formData, farmSize: e.target.value})} />
                  </div>
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Mukhya Fasal (Main Crop)</label>
                  <select className="form-input" value={formData.primaryCrop} onChange={(e) => setFormData({...formData, primaryCrop: e.target.value})}>
                    {crops.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                <input type="password" required placeholder="••••••••" className="form-input !pl-12" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-4 flex items-center justify-center gap-2 group shadow-lg shadow-emerald-500/20"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    ACCOUNT BANAYEIN
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.2em]"><span className="px-4 bg-white text-slate-400">Ya Phir</span></div>
              </div>

              <button
                type="button"
                onClick={() => setShowGoogleModal(true)}
                className="w-full py-3.5 px-4 flex items-center justify-center gap-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all active:scale-[0.98] shadow-sm font-bold text-slate-700 text-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 6.13l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google se Signup karein
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500 font-medium">
              Pehle se account hai?{' '}
              <Link to="/login" className="text-emerald-600 font-bold hover:underline">
                Login karein
              </Link>
            </p>
          </div>
        </div>
      </div>

      <GoogleAuthModal 
        isOpen={showGoogleModal} 
        onClose={() => setShowGoogleModal(false)} 
        onSuccess={handleGoogleSuccess} 
      />
    </div>
  );
}
