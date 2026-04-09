import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { t } = useLanguage();
  const { user, signIn, signUp, signInWithGoogle, loading, error } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 성공 시 자동 닫기
  useEffect(() => {
    if (user && isOpen) {
      onClose();
    }
  }, [user, isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      await signUp(email, password);
    } else {
      await signIn(email, password);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[100] pointer-events-auto">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md bg-[#1a1a1a] border-2 border-cyan-500/30 rounded-[2rem] shadow-[0_0_50px_rgba(34,211,238,0.2)] overflow-hidden"
        >
          {/* Top Industrial Header */}
          <div className="bg-cyan-500/10 border-b border-cyan-500/20 px-8 py-5 flex items-center justify-between">
            <h1 className="font-headline font-black text-white text-2xl md:text-3xl uppercase italic tracking-tighter">
              {t.login.firewallAccess}
            </h1>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-cyan-400 animate-pulse" />
              <div className="w-2 h-2 bg-cyan-400 opacity-50" />
              <div className="w-2 h-2 bg-cyan-400 opacity-20" />
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-5">
            {/* ===== Google Sign-In Button ===== */}
            <button
              type="button"
              onClick={signInWithGoogle}
              disabled={loading}
              className="group relative w-full bg-white hover:bg-zinc-100 py-4 rounded-2xl shadow-[0_6px_0_0_#d1d5db] active:translate-y-1 active:shadow-[0_3px_0_0_#d1d5db] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-3"
            >
              {/* Google "G" logo inline SVG */}
              <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="font-headline font-black text-zinc-800 text-lg uppercase tracking-tight">
                {t.login.googleSignIn}
              </span>
            </button>

            {/* ===== OR Divider ===== */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-zinc-700" />
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">
                {t.login.dividerOr}
              </span>
              <div className="flex-1 h-px bg-zinc-700" />
            </div>

            {/* ===== Email/Password Form ===== */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between px-2">
                  <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-[0.2em]">
                    {loading ? t.login.firebaseDeploy : t.login.newIdentity}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono tracking-tighter">
                    {t.login.encryptedAuth}
                  </span>
                </div>
                
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.login.email}
                    className="w-full bg-black/40 border-2 border-zinc-800 focus:border-cyan-400 text-white px-5 py-3.5 rounded-xl outline-none transition-all font-mono placeholder:text-zinc-600 text-sm"
                    required
                  />
                </div>

                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.login.password}
                    className="w-full bg-black/40 border-2 border-zinc-800 focus:border-cyan-400 text-white px-5 py-3.5 rounded-xl outline-none transition-all font-mono placeholder:text-zinc-600 text-sm"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="bg-red-500/10 border border-red-500/30 p-3 rounded-xl text-red-500 text-xs font-bold text-center"
                >
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full bg-cyan-500 py-4 rounded-2xl shadow-[0_6px_0_0_#0891b2] active:translate-y-1 active:shadow-[0_3px_0_0_#0891b2] transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                <span className="font-headline font-black text-black text-xl uppercase tracking-tighter">
                  {loading ? t.login.authorizing : (isSignUp ? t.login.deployIdentity : t.login.overrideFirewall)}
                </span>
              </button>

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-xs font-bold text-zinc-500 hover:text-cyan-400 transition-colors uppercase tracking-widest text-center"
                >
                  {isSignUp ? t.login.signInPrompt : t.login.signUpPrompt}
                </button>
                
                <button
                  type="button"
                  onClick={onClose}
                  className="text-[10px] font-black text-zinc-700 hover:text-red-400 transition-colors uppercase tracking-[0.3em] text-center"
                >
                  {t.login.abortAuth}
                </button>
              </div>
            </form>
          </div>

          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rotate-45 translate-x-16 -translate-y-16 pointer-events-none" />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
