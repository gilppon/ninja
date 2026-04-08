import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gift, Crown, Wallet, Globe, Shield, Zap, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuModal({ isOpen, onClose }: MenuModalProps) {
  const { t } = useLanguage();
  const { coins, addCoins } = useCurrency();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-[100] pointer-events-auto">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-lg bg-[#edeeef] rounded-[2rem] shadow-2xl overflow-hidden"
        >
          {/* Top Bar Navigation */}
          <div className="bg-white px-8 py-6 flex items-center justify-between border-b-2 border-zinc-200">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#bb152c] rounded-xl flex items-center justify-center shadow-[0_4px_0_0_#92001c]">
                <Shield className="text-white w-6 h-6" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[10px] font-black text-[#bb152c] tracking-widest uppercase mb-0.5 opacity-60">
                  {t.menu.daoFund}
                </span>
                <h2 className="font-headline font-black text-zinc-900 text-xl uppercase tracking-tighter">
                  {t.menu.arsenalLogistics}
                </h2>
              </div>
            </div>
            <button onClick={onClose} className="p-3 bg-zinc-100 hover:bg-zinc-200 rounded-full transition-colors">
              <X className="w-6 h-6 text-zinc-400" />
            </button>
          </div>

          <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto scrollbar-hide">
            {/* Daily Gift Card */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_8px_0_0_#d1d5db] border-2 border-transparent hover:border-[#bb152c] transition-all group">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Gift className="w-10 h-10 text-emerald-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-headline font-black text-xl text-zinc-900 uppercase">{t.menu.dailyGift}</h3>
                  <p className="text-sm font-bold text-zinc-400">{t.menu.claimed24h}</p>
                </div>
              </div>
              <button 
                onClick={() => { addCoins(50); onClose(); }}
                className="w-full mt-6 bg-[#bb152c] py-4 rounded-xl shadow-[0_4px_0_0_#92001c] active:translate-y-1 active:shadow-none transition-all"
              >
                <span className="font-headline font-black text-white text-lg uppercase tracking-widest">{t.menu.claim50}</span>
              </button>
            </div>

            {/* Premium Pass Card */}
            <div className="relative group overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-black rounded-3xl p-6 shadow-[0_12px_40px_rgba(0,0,0,0.6)] border-2 border-amber-400/50 hover:border-amber-400 transition-all duration-500 animate-premium-glow">
              {/* Animated sparkle particles */}
              <div className="absolute inset-0 pointer-events-none opacity-50">
                <motion.div animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="absolute top-4 left-10 text-amber-400"><Star size={12} fill="currentColor" /></motion.div>
                <motion.div animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} className="absolute bottom-10 right-10 text-amber-400"><Star size={8} fill="currentColor" /></motion.div>
                <motion.div animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }} transition={{ duration: 2.5, repeat: Infinity }} className="absolute top-1/2 left-1/4 text-white"><Star size={6} fill="currentColor" /></motion.div>
              </div>

              <div className="relative z-10 flex items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-300 to-amber-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.4)] group-hover:scale-110 transition-transform duration-500">
                  <Crown className="w-12 h-12 text-black drop-shadow-lg" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-headline font-black text-2xl text-amber-400 uppercase tracking-tight drop-shadow-sm">{t.menu.premiumPass}</h3>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="text-amber-400"><Star size={14} /></motion.div>
                  </div>
                  <p className="text-sm font-bold text-zinc-300 leading-tight">{t.menu.doubleRewards}</p>
                </div>
              </div>

              <button className="shimmer-effect relative w-full mt-6 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 py-4 rounded-xl shadow-[0_6px_0_0_#b45309] active:translate-y-1 active:shadow-none hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] transition-all duration-300 overflow-hidden">
                <span className="relative z-10 font-headline font-black text-black text-lg uppercase tracking-widest">{t.menu.activate}</span>
              </button>
            </div>

            {/* Resource Exchange */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_8px_0_0_#d1d5db]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-500 w-5 h-5 fill-yellow-500" />
                  <span className="font-black text-zinc-900">{t.menu.exchangePrompt}</span>
                </div>
              </div>
              <button className="w-full bg-zinc-100 py-4 rounded-xl border-2 border-zinc-200 hover:bg-zinc-200 transition-colors">
                <span className="font-headline font-black text-zinc-500 text-sm uppercase tracking-widest">
                  {t.menu.exchangeBtn}
                </span>
              </button>
            </div>
          </div>
          
          {/* Stud Details */}
          <div className="absolute top-10 left-6 w-4 h-4 rounded-full bg-black/5 shadow-inner" />
          <div className="absolute top-10 right-6 w-4 h-4 rounded-full bg-black/5 shadow-inner" />
          <div className="absolute bottom-6 left-6 w-4 h-4 rounded-full bg-black/5 shadow-inner" />
          <div className="absolute bottom-6 right-6 w-4 h-4 rounded-full bg-black/5 shadow-inner" />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
