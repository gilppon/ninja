import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { t } = useLanguage();
  const { signIn, signUp, loading, error } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          <div className="bg-cyan-500/10 border-b border-cyan-500/20 px-8 py-6 flex items-center justify-between">
            <h1 className="font-headline font-black text-white text-3xl uppercase italic tracking-tighter">
              {t.login.firewallAccess}
            </h1>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-cyan-400 animate-pulse" />
              <div className="w-2 h-2 bg-cyan-400 opacity-50" />
              <div className="w-2 h-2 bg-cyan-400 opacity-20" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-4">
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
                  className="w-full bg-black/40 border-2 border-zinc-800 focus:border-cyan-400 text-white px-6 py-4 rounded-xl outline-none transition-all font-mono placeholder:text-zinc-600"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.login.password}
                  className="w-full bg-black/40 border-2 border-zinc-800 focus:border-cyan-400 text-white px-6 py-4 rounded-xl outline-none transition-all font-mono placeholder:text-zinc-600"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl text-red-500 text-xs font-bold text-center"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full bg-cyan-500 py-5 rounded-2xl shadow-[0_8px_0_0_#0891b2] active:translate-y-1 active:shadow-[0_4px_0_0_#0891b2] transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              <span className="font-headline font-black text-black text-2xl uppercase tracking-tighter">
                {loading ? t.login.authorizing : (isSignUp ? t.login.deployIdentity : t.login.overrideFirewall)}
              </span>
            </button>

            <div className="flex flex-col gap-4">
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

          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rotate-45 translate-x-16 -translate-y-16 pointer-events-none" />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
