import { useState, useEffect } from 'react';
import { useFarm } from '../context/FarmContext';
import { useAuth } from '../context/AuthContext';
import { 
  User, MapPin, Sprout, TrendingUp, Droplets, 
  CreditCard, Building, ShieldCheck, Info, Camera,
  Navigation, CheckCircle2, ChevronRight, Save, 
  Lock, Settings, Bell, History, Smartphone, Mail, Leaf, Globe, Moon, Sun
} from 'lucide-react';

const crops = ['Rice (Dhan)', 'Wheat (Gehun)', 'Maize (Makka)', 'Cotton (Kapas)', 'Sugarcane (Ganna)', 'Mustard (Sarson)', 'Bajra (Pearl Millet)', 'Potato (Aloo)', 'Tomato (Tamatar)', 'Other'];

export default function FarmProfile() {
  const { profile, updateProfile, language, setLanguage, theme, setTheme, t } = useFarm();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState(profile || {});
  const [saving, setSaving] = useState(false);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);

  useEffect(() => {
    setFormData(profile || {});
  }, [profile]);

  const handleSave = async () => {
    setSaving(true);
    await updateProfile(formData);
    setIsEditingPersonal(false);
    setTimeout(() => setSaving(false), 1000);
  };

  const tabs = [
    { id: 'personal', labelKey: 'personal_info', icon: User },
    { id: 'farm', labelKey: 'farm_info', icon: Sprout },
    { id: 'financial', labelKey: 'financial_info', icon: CreditCard },
    { id: 'settings', labelKey: 'settings', icon: Settings },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-24 dark:bg-slate-950 transition-colors duration-500">
      {/* ── Profile Header ── */}
      <div className="relative mb-32">
        <div className="h-48 md:h-64 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        </div>

        <div className="absolute -bottom-24 left-8 md:left-12 flex flex-col md:flex-row items-end gap-6 w-full pr-16">
          <div className="relative group">
            <div className="w-40 h-40 rounded-[3rem] bg-slate-100 dark:bg-slate-800 border-[6px] border-white dark:border-slate-900 shadow-2xl overflow-hidden flex items-center justify-center bg-white">
              {formData.photo ? (
                <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-5xl font-black text-slate-200 dark:text-slate-700">{formData.name?.[0] || user?.name?.[0]}</span>
              )}
              <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-all text-white text-[10px] font-bold uppercase tracking-widest gap-2">
                <Camera className="w-6 h-6" />
                {t('change_photo') || 'Change Photo'}
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setFormData(prev => ({ ...prev, photo: reader.result }));
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>
            <div className="absolute bottom-2 right-2 bg-emerald-500 text-white p-2.5 rounded-2xl shadow-lg border-4 border-white dark:border-slate-900">
              <Camera className="w-4 h-4" />
            </div>
          </div>

          <div className="pb-4 space-y-2 text-center md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">{formData.name || user?.name}</h1>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
              <span className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200 dark:border-emerald-500/30">
                {t('verified_farmer') || 'Verified Farmer'}
              </span>
              <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" /> {formData.location || 'Location Not Set'}
              </span>
            </div>
          </div>

          <div className="md:ml-auto pb-4 pr-12 hidden md:block">
             <button 
               onClick={handleSave} 
               disabled={saving}
               className="btn-primary px-10 py-4 shadow-2xl shadow-emerald-500/30 active:scale-95 flex items-center gap-2 group"
             >
               {saving ? '...' : t('save_changes')}
               <Save className={`w-4 h-4 ${saving ? 'animate-spin' : 'group-hover:translate-y-[-2px] transition-transform'}`} />
             </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8 px-4">
        <div className="space-y-2">
           {tabs.map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`w-full flex items-center gap-4 px-6 py-4 rounded-3xl text-sm font-bold transition-all
                 ${activeTab === tab.id 
                   ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-xl translate-x-2' 
                   : 'text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white hover:shadow-lg'}`}
             >
               <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-emerald-400' : 'text-slate-400'}`} />
               {t(tab.labelKey)}
             </button>
           ))}
        </div>

        <div className="lg:col-span-3 space-y-6">
           <div className="card bg-white dark:bg-slate-900 border-none shadow-2xl p-8 rounded-[2.5rem] transition-colors duration-500">
              {activeTab === 'personal' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                   <div className="border-b border-slate-50 dark:border-slate-800 pb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white">{t('personal_info')}</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Identity and contact details</p>
                      </div>
                      {!isEditingPersonal ? (
                        <button 
                          onClick={() => setIsEditingPersonal(true)}
                          className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                        >
                          <Settings className="w-3.5 h-3.5" /> {t('edit_details')}
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                           <button onClick={() => setIsEditingPersonal(false)} className="px-4 py-2 text-slate-400 hover:text-slate-600 text-[10px] font-black uppercase tracking-widest">Cancel</button>
                           <button onClick={handleSave} className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20">{t('save_changes')}</button>
                        </div>
                      )}
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {[
                        { label: 'Full Name', key: 'name', icon: User, val: formData.name || user?.name },
                        { label: 'Aadhar Number', key: 'aadharNumber', icon: ShieldCheck, val: formData.aadharNumber, placeholder: 'XXXX XXXX XXXX' },
                        { label: 'Phone Number', key: 'phone', icon: Smartphone, val: formData.phone },
                        { label: 'Location', key: 'location', icon: MapPin, val: formData.location },
                      ].map((field) => (
                        <div key={field.key} className="space-y-2 text-left">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{field.label}</label>
                          {isEditingPersonal ? (
                            <input 
                              type="text" 
                              className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 font-bold text-slate-900 dark:text-white" 
                              value={field.val} 
                              onChange={(e) => setFormData({...formData, [field.key]: e.target.value})} 
                            />
                          ) : (
                            <div className="flex items-center gap-4 p-4 bg-slate-50/50 dark:bg-slate-800/50 rounded-2xl border border-slate-100/50 dark:border-slate-800/50">
                               <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400"><field.icon className="w-4 h-4" /></div>
                               <div className="font-bold text-slate-900 dark:text-white">{field.val || '---'}</div>
                            </div>
                          )}
                        </div>
                      ))}
                   </div>
                </div>
              )}

              {activeTab === 'farm' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                   <div className="border-b border-slate-50 dark:border-slate-800 pb-4">
                      <h3 className="text-xl font-black text-slate-900 dark:text-white">{t('farm_info')}</h3>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Agricultural details and metrics</p>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t('current_crop')}</label>
                        <select className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 font-bold text-slate-900 dark:text-white" value={formData.currentCrop} onChange={(e) => setFormData({...formData, currentCrop: e.target.value})}>
                          {crops.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Farm Size (Acres)</label>
                        <input type="number" className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 font-bold text-slate-900 dark:text-white" value={formData.farmSize} onChange={(e) => setFormData({...formData, farmSize: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t('water_source')}</label>
                        <input type="text" className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 font-bold text-slate-900 dark:text-white" value={formData.waterSource} onChange={(e) => setFormData({...formData, waterSource: e.target.value})} placeholder="Canal, Borewell, etc." />
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
                   <div className="border-b border-slate-50 dark:border-slate-800 pb-4">
                      <h3 className="text-xl font-black text-slate-900 dark:text-white">{t('settings')}</h3>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Personalize your experience</p>
                   </div>
                   
                   <div className="space-y-6">
                      {/* Language */}
                      <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl group hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-blue-500 shadow-sm"><Globe className="w-6 h-6" /></div>
                            <div>
                               <p className="font-black text-slate-900 dark:text-white">{t('language')}</p>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Choose your preferred language</p>
                            </div>
                         </div>
                         <select 
                            className="text-xs font-black bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 outline-none dark:text-white"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                         >
                            <option value="hi">Hindi (हिन्दी)</option>
                            <option value="en">English</option>
                            <option value="hinglish">Hinglish</option>
                            <option value="ur">Urdu (اردو)</option>
                         </select>
                      </div>

                      {/* Appearance Toggle */}
                      <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl group hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-indigo-500 shadow-sm">
                               {theme === 'dark' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                            </div>
                            <div>
                               <p className="font-black text-slate-900 dark:text-white">Appearance Mode</p>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Switch between Light and Dark theme</p>
                            </div>
                         </div>
                         <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                            <button 
                               onClick={() => setTheme('light')}
                               className={`p-2 rounded-lg transition-all ${theme === 'light' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                               <Sun className="w-4 h-4" />
                            </button>
                            <button 
                               onClick={() => setTheme('dark')}
                               className={`p-2 rounded-lg transition-all ${theme === 'dark' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                               <Moon className="w-4 h-4" />
                            </button>
                         </div>
                      </div>

                      {/* Notifications */}
                      <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl group hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm"><Bell className="w-6 h-6" /></div>
                            <div>
                               <p className="font-black text-slate-900 dark:text-white">WhatsApp Alerts</p>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Get daily crop advice on WhatsApp</p>
                            </div>
                         </div>
                         <div className="w-12 h-6 bg-emerald-500 rounded-full relative p-1 cursor-pointer">
                            <div className="w-4 h-4 bg-white rounded-full absolute right-1" />
                         </div>
                      </div>

                      {/* Security */}
                      <button className="w-full flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl group hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-red-500 shadow-sm"><Lock className="w-6 h-6" /></div>
                            <div>
                               <p className="font-black text-slate-900 dark:text-white">Change Password</p>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Update your login security</p>
                            </div>
                         </div>
                         <ChevronRight className="w-5 h-5 text-slate-300" />
                      </button>
                   </div>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
