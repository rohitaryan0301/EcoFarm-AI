import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFarm } from '../context/FarmContext';
import { 
  LayoutDashboard, Sprout, CalendarCheck, User, 
  MessageCircle, BookOpen, Info, Menu, X, Leaf, LogOut, ArrowRight, Lock
} from 'lucide-react';

const navItems = [
  { to: '/', labelKey: 'dashboard', emoji: '🏠' },
  { to: '/crop', labelKey: 'cropPrediction', emoji: '🌾' },
  { to: '/advisor', labelKey: 'advisor', emoji: '💡' },
  { to: '/chatbot', labelKey: 'assistant', emoji: '🤖' },
  { to: '/guide', labelKey: 'guide', emoji: '📚' },
  { to: '/about', labelKey: 'about', emoji: 'ℹ️' },
];

const adminItems = [
  { to: '/admin', labelKey: 'admin', emoji: '🔐' },
];

const publicItems = [];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const { profile, t } = useFarm();

  const activeNavItems = user 
    ? (user.role === 'admin' ? [...navItems, ...adminItems] : navItems)
    : publicItems;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-md py-2 border-b border-slate-200 dark:border-white/5' 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          <Link to="/" className="flex items-center gap-3 group">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border transition-all ${
              scrolled ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-white/10 border-white/20'
            }`}>
              <Leaf className={`w-6 h-6 ${scrolled ? 'text-emerald-600' : 'text-white'}`} />
            </div>
            <div className="hidden sm:block">
              <div className={`font-black text-lg tracking-tight transition-colors ${
                scrolled ? 'text-slate-900 dark:text-white' : 'text-white'
              }`}>
                Eco Farm <span className="text-emerald-500">AI</span>
              </div>
              <div className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                scrolled ? 'text-slate-400 dark:text-slate-500' : 'text-white/60'
              }`}>
                {t('tagline') || 'Digital Kisan Saathi'}
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-2">
            {activeNavItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold tracking-tight transition-all duration-300
                  ${pathname === item.to 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                    : scrolled ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' : 'text-slate-400 hover:bg-white/10 hover:text-white'}`}
              >
                <span>{item.emoji}</span>
                <span className="uppercase tracking-widest">{t(item.labelKey)}</span>
              </Link>
            ))}

            <div className="h-6 w-px bg-slate-200 mx-2" />

            {user ? (
              <div className="relative group ml-2">
                <Link to="/profile" className={`flex items-center justify-center p-1 rounded-full transition-all border ${
                  scrolled ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
                }`}>
                  <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-md overflow-hidden border-2 border-emerald-500/20">
                    {profile?.photo ? (
                      <img src={profile.photo} alt="P" className="w-full h-full object-cover" />
                    ) : (
                      user.name[0]
                    )}
                  </div>
                </Link>
                
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-3xl shadow-2xl border border-slate-100 py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right group-hover:translate-y-0 translate-y-2 z-50 overflow-hidden">
                   <div className="px-5 py-3 border-b border-slate-50 mb-2 bg-slate-50/50">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{t('logged_in_as') || 'Logged in as'}</p>
                      <p className="text-xs font-black text-slate-900 truncate">{user.email || user.name}</p>
                   </div>
                   <div className="mx-5 my-2 h-px bg-slate-50" />
                   <button 
                     onClick={logout}
                     className="w-full flex items-center gap-3 px-5 py-3 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors"
                   >
                      <span className="text-lg">🚪</span> {t('logout')}
                   </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <Link 
                  to="/login" 
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-xs font-black shadow-lg shadow-emerald-500/20 transition-all active:scale-95 flex items-center gap-2 group"
                >
                  {t('join_now') || 'JOIN NOW'}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-[600px] border-t border-slate-100 bg-white shadow-xl' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 pt-4 pb-6 space-y-2">
          {user && (
             <div className="bg-slate-50 rounded-2xl p-4 mb-4">
               <div className="flex items-center gap-3 mb-4">
                 <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-black text-xl shadow-lg">
                   {user.name[0]}
                 </div>
                 <div>
                   <div className="text-sm font-black text-slate-900 uppercase tracking-tight">{user.name}</div>
                   <div className="text-[10px] text-slate-500 font-bold">{user.email}</div>
                 </div>
               </div>
               <div className="grid grid-cols-1 gap-2">
                  <Link to="/profile" className="flex flex-col items-center gap-1 p-3 bg-white border border-slate-100 rounded-xl text-[10px] font-bold text-slate-600 hover:text-emerald-600 transition-colors">
                     <span className="text-xl">👨‍🌾</span> {t('profile')}
                  </Link>
               </div>
             </div>
          )}
          {activeNavItems.map(({ to, labelKey, emoji }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-2xl text-[14px] font-bold transition-all
                ${isActive 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                  : 'text-slate-600 hover:bg-slate-50'
                }
              `}
            >
              <span className="text-xl">{emoji}</span>
              {t(labelKey)}
            </NavLink>
          ))}
          {!user && (
            <div className="pt-4 border-t border-slate-100">
              <Link to="/login" className="btn-primary w-full !py-3.5 text-center text-xs font-black shadow-none flex items-center justify-center gap-2">
                {t('join_now') || 'JOIN NOW'}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
          {user && (
            <button onClick={logout} className="w-full flex items-center justify-center gap-2 py-3.5 text-red-600 font-bold text-xs uppercase tracking-widest bg-red-50 rounded-2xl mt-4">
              <LogOut className="w-4 h-4" /> {t('logout')}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
