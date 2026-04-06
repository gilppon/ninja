import React, { useState } from 'react';
import { motion } from 'motion/react';
import { auth } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider
} from 'firebase/auth';
import { LogIn, UserPlus, Shield, Chrome } from 'lucide-react';

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (providerName: 'google') => {
    setLoading(true);
    setError(null);
    let provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden font-sans">
      {/* Background with Glassmorphism & Generated Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/images/login_bg.png" 
          className="w-full h-full object-cover scale-105" 
          alt="Login Background" 
        />
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" />
        
        {/* Animated Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          <div className="w-full h-1 bg-cyan-400/50 shadow-[0_0_20px_cyan] animate-[scan_4s_linear_infinite]" />
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative z-10 w-full max-w-md p-8 sm:p-10 mx-4"
      >
        {/* Cyberpunk Border & Frame */}
        <div className="absolute inset-0 border-2 border-cyan-500/40 rounded-3xl transform -skew-x-2 bg-slate-900/80 shadow-[0_0_40px_rgba(34,211,238,0.2)] backdrop-blur-xl" />
        <div className="absolute -top-1 -right-1 w-12 h-12 border-t-4 border-r-4 border-yellow-400 rounded-tr-3xl pointer-events-none" />
        <div className="absolute -bottom-1 -left-1 w-12 h-12 border-b-4 border-l-4 border-cyan-400 rounded-bl-3xl pointer-events-none" />

        <div className="relative">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mb-4 border border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              <Shield className="text-cyan-400 w-8 h-8" strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-black italic text-white tracking-widest uppercase mb-1 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
              {isSignUp ? 'Firebase Deploy' : 'Firewall Access'}
            </h2>
            <p className="text-cyan-400/70 text-xs font-mono uppercase tracking-[0.3em]">
              {isSignUp ? 'New Firebase Identity' : 'Encrypted Authentication'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] text-cyan-400 font-black uppercase tracking-widest ml-1">Secure Email</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all font-mono placeholder:text-slate-700" 
                  placeholder="NINJA@FIREBASE.SYS"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-cyan-400 font-black uppercase tracking-widest ml-1">Access Pass</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all font-mono placeholder:text-slate-700" 
                placeholder="********"
                required
              />
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                className="text-red-400 text-[10px] font-mono uppercase tracking-widest bg-red-950/30 border-l-2 border-red-500 p-2"
              >
                ⚠ Protocol Error: {error}
              </motion.div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full relative group h-14 mt-4"
            >
              <div className={`absolute inset-0 bg-yellow-400 rounded-xl transform -skew-x-2 transition-transform group-hover:scale-[1.02] active:scale-95 ${loading ? 'opacity-50' : ''}`} />
              <div className="relative flex items-center justify-center h-full text-black font-black italic tracking-widest uppercase gap-2">
                {loading ? (
                  <span className="animate-pulse">Authorizing...</span>
                ) : (
                  <>
                    {isSignUp ? <UserPlus size={18} /> : <LogIn size={18} />}
                    {isSignUp ? 'Deploy Identity' : 'Override Firewall'}
                  </>
                )}
              </div>
            </button>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute inset-0 h-px bg-cyan-500/20" />
              <span className="relative bg-[#1a2233] px-3 text-[10px] text-cyan-400/50 font-mono tracking-widest">FIREBASE CLOUD SYNC</span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {[
                { Icon: Chrome, label: 'Google', id: 'google' }
              ].map(({ Icon, label, id }) => (
                <button 
                  key={label}
                  onClick={() => handleSocialLogin(id as any)}
                  className="flex flex-col items-center justify-center py-3 bg-slate-950/50 border border-cyan-500/20 rounded-xl hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all group"
                >
                  <Icon className="w-6 h-6 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] text-cyan-400/50 font-bold uppercase tracking-widest">{label}</span>
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center gap-4">
              <button 
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-[10px] text-cyan-400 font-bold hover:text-white uppercase tracking-widest transition-colors underline underline-offset-4"
              >
                {isSignUp ? 'Identified Before? Sign In' : 'New recruit? Register at Firebase'}
              </button>



              <button 
                onClick={onClose}
                className="mt-2 text-[8px] text-slate-500 hover:text-slate-300 uppercase tracking-widest transition-colors"
              >
                [ ABORT AUTHENTICATION ]
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Aesthetic Bottom Info */}
      <div className="absolute bottom-6 left-6 font-mono text-[8px] text-cyan-500/30 tracking-[0.5em] uppercase hidden sm:block">
        Ninja Brick Firebase-Auth-Service | Status: STEREOTYPICAL_SECURE
      </div>
    </div>
  );
}
