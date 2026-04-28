import { useState, useEffect } from 'react';
import { Loader2, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function GoogleAuthModal({ isOpen, onClose, onSuccess }) {
  const [step, setStep] = useState(0); // 0: Email Input, 1: Select Account, 2: Verifying, 3: Success
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setError('');
    }
  }, [isOpen]);

  const handleNext = () => {
    if (!email) {
      setError('Email enter karein');
      return;
    }
    if (!email.includes('@gmail.com')) {
      setError('Kripya valid @gmail.com address dalein');
      return;
    }
    setError('');
    setStep(2); // Go straight to verifying for "Direct" feel
    setTimeout(() => {
      setStep(3);
      setTimeout(() => {
        onSuccess(email);
      }, 1500);
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Google Header */}
        <div className="p-8 pb-4 text-center border-b border-slate-50">
           <svg className="w-8 h-8 mx-auto mb-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 6.13l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
           </svg>
           <h2 className="text-xl font-black text-slate-900 tracking-tight">Sign in with Google</h2>
           <p className="text-xs font-medium text-slate-500 mt-1">to continue to Eco Farm AI</p>
        </div>

        <div className="p-8">
           {step === 0 && (
             <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500">
                <div>
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Email or Phone</label>
                   <input 
                     type="email" 
                     className={`w-full px-4 py-3.5 bg-slate-50 border-2 ${error ? 'border-red-100 ring-red-50' : 'border-transparent focus:border-blue-500'} rounded-2xl font-bold text-slate-900 transition-all outline-none`}
                     placeholder="Enter your Gmail"
                     value={email}
                     onChange={(e) => {
                       setEmail(e.target.value);
                       setError('');
                     }}
                     onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                   />
                   {error && <p className="text-[10px] text-red-500 font-bold mt-2 px-1 uppercase tracking-tight">{error}</p>}
                </div>
                <div className="flex items-center justify-between">
                   <button onClick={onClose} className="text-xs font-black text-blue-600 uppercase tracking-widest hover:bg-blue-50 px-3 py-2 rounded-lg transition-all">Cancel</button>
                   <button 
                     onClick={handleNext}
                     className="px-8 py-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
                   >
                     Next
                   </button>
                </div>
             </div>
           )}

           {step === 2 && (
             <div className="py-12 text-center space-y-6 animate-in fade-in duration-500">
                <div className="relative inline-block">
                   <Loader2 className="w-16 h-16 text-emerald-500 animate-spin" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-emerald-600" />
                   </div>
                </div>
                <div>
                   <p className="text-sm font-black text-slate-900 tracking-tight">Google Verification</p>
                   <p className="text-xs text-slate-500 font-medium mt-1">Verifying your account details safely...</p>
                </div>
             </div>
           )}

           {step === 3 && (
             <div className="py-12 text-center space-y-6 animate-in zoom-in-90 duration-500">
                <div className="w-20 h-20 bg-emerald-500 rounded-full mx-auto flex items-center justify-center shadow-2xl shadow-emerald-500/40">
                   <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <div>
                   <p className="text-lg font-black text-slate-900 tracking-tight">Verified Successfully!</p>
                   <p className="text-xs text-emerald-600 font-bold uppercase tracking-widest mt-1">Welcome back, Rohit</p>
                </div>
             </div>
           )}
        </div>

        <div className="bg-slate-50 px-8 py-4 text-center">
           <p className="text-[9px] text-slate-400 font-medium leading-relaxed uppercase tracking-tighter">
              By continuing, Google will share your name, email, and profile picture with Eco Farm.
           </p>
        </div>
      </div>
    </div>
  );
}

function ChevronRight({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
    </svg>
  );
}
