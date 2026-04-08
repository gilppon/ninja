import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { Shield, Zap, Skull, Award, RefreshCcw } from 'lucide-react';

interface FailOfferModalProps {
  isOpen: boolean;
  isPremium: boolean;
  canRevive: boolean;
  scrollCount: number;
  onClose: () => void;
  onRevive: () => void;
  onUseScroll: () => void;
  onShowLogin: () => void;
}

export default function FailOfferModal({ isOpen, isPremium, canRevive, scrollCount, onClose, onRevive, onUseScroll }: FailOfferModalProps) {
  const { t } = useLanguage();
  const { coins } = useCurrency();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-8 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          onClick={onClose}
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0a0a0a] border-2 border-red-500/30 rounded-[2.5rem] shadow-[0_0_100px_rgba(239,68,68,0.2)] overflow-hidden flex flex-col md:flex-row"
        >
          {/* Left Decorative Image Section */}
          <div className="relative w-full md:w-2/5 h-48 md:h-auto bg-zinc-900 border-b-2 md:border-b-0 md:border-r-2 border-red-500/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <img 
              src="/assets/characters/ninja.png" 
              className="absolute inset-0 w-full h-full object-cover object-top opacity-60 mix-blend-overlay"
              alt="Defeated Hero"
            />
            {/* Mission status tag */}
            <div className="absolute top-6 left-6 z-20 flex flex-col gap-1">
              <span className="text-[10px] font-black tracking-[0.3em] text-red-500 uppercase">{t.failModal.header}</span>
              <div className="h-1 w-12 bg-red-500" />
            </div>
            
            <div className="absolute bottom-6 left-6 z-20">
               <Skull className="w-12 h-12 text-red-500 opacity-80" />
            </div>
          </div>

          {/* Right Content Section */}
          <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex gap-1">
                  {[1, 2, 3].map(i => <div key={i} className="w-3 h-1 bg-red-500" />)}
                </div>
                <span className="text-zinc-600 font-mono text-[10px] tracking-widest uppercase">System Recovery Needed</span>
              </div>
              
              <h1 className="font-headline font-black text-white text-5xl md:text-6xl uppercase italic tracking-tighter mb-4 leading-none">
                {t.failModal.title}
              </h1>
              
              <p className="text-zinc-400 font-bold text-sm md:text-base leading-relaxed mb-8 border-l-2 border-zinc-800 pl-4">
                {t.failModal.desc}
              </p>

              {/* Special Revive Offer */}
              <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-3xl p-6 mb-8 relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Award className="w-12 h-12 text-yellow-400" />
                </div>
                
              {canRevive ? (
                <>
                  <h3 className="text-emerald-400 font-black italic uppercase tracking-wider text-sm mb-3 flex items-center gap-2">
                     <div className="w-2 h-2 bg-emerald-400 transform rotate-45" />
                     {t.failModal.lostIdentity}
                  </h3>
                  
                  <p className="text-white font-bold text-xs md:text-sm mb-4 leading-snug">
                    {t.failModal.revivePrompt}
                  </p>

                  <ul className="space-y-2 mb-6">
                     <li className="flex items-center gap-3 text-[10px] md:text-xs text-zinc-400 font-bold uppercase">
                        <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                        HP 100% 즉시 회복
                     </li>
                     <li className="flex items-center gap-3 text-[10px] md:text-xs text-zinc-400 font-bold uppercase">
                        <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                        점수 & 진행 상황 유지
                     </li>
                     <li className="flex items-center gap-3 text-[10px] md:text-xs text-zinc-400 font-bold uppercase">
                        <div className="w-1 h-1 bg-amber-500 rounded-full" />
                        프리미엄 전용 (1회 한정)
                     </li>
                  </ul>

                  <button 
                     onClick={onRevive}
                     className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 py-4 rounded-xl shadow-[0_8px_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-3 active:scale-95 group/btn"
                  >
                     <RefreshCcw className="w-5 h-5 text-white animate-spin-slow" />
                     <span className="font-headline font-black text-white text-lg uppercase italic tracking-tighter">
                        즉시 부활 (1/1)
                     </span>
                  </button>
                </>
              ) : scrollCount > 0 ? (
                <>
                  <h3 className="text-blue-400 font-black italic uppercase tracking-wider text-sm mb-3 flex items-center gap-2">
                     <div className="w-2 h-2 bg-blue-400 transform rotate-45" />
                     부활서 사용 가능
                  </h3>
                  
                  <p className="text-white font-bold text-xs md:text-sm mb-4 leading-snug">
                    보관 중인 부활서를 사용하여 다시 일어설 수 있습니다. (잔여: {scrollCount}개)
                  </p>

                  <button 
                     onClick={onUseScroll}
                     className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 py-4 rounded-xl shadow-[0_8px_20px_rgba(37,99,235,0.3)] transition-all flex items-center justify-center gap-3 active:scale-95 group/btn"
                  >
                     <Zap className="w-5 h-5 text-white" />
                     <span className="font-headline font-black text-white text-lg uppercase italic tracking-tighter">
                        부활서 사용하여 복귀
                     </span>
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-zinc-500 font-black italic uppercase tracking-wider text-sm mb-3 flex items-center gap-2">
                     <div className="w-2 h-2 bg-zinc-500 transform rotate-45" />
                     MISSION FAILED
                  </h3>
                  
                  <p className="text-zinc-400 font-bold text-xs md:text-sm mb-4 leading-snug">
                    {isPremium 
                      ? '이미 부활 기회와 아이템을 모두 소진했습니다.' 
                      : '부활서가 없습니다. 상점에서 미리 준비하세요!'}
                  </p>

                  <div className="text-center py-2">
                    <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                      부활 불가 — 자원 부족
                    </span>
                  </div>
                </>
              )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {canRevive ? (
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={onRevive}
                    className="flex-1 py-3 rounded-xl border bg-emerald-900/50 hover:bg-emerald-800/50 border-emerald-700/50 transition-colors"
                  >
                    <span className="text-white font-black text-[10px] md:text-xs uppercase tracking-[0.2em]">
                      ⚡ 전장 복귀
                    </span>
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 bg-transparent hover:bg-white/5 py-3 rounded-xl border border-zinc-900 transition-colors"
                  >
                    <span className="text-zinc-600 font-black text-[10px] md:text-xs uppercase tracking-[0.2em]">
                      {t.failModal.cancel}
                    </span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={onClose}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 py-3 rounded-xl border border-zinc-700 transition-colors"
                >
                  <span className="text-zinc-300 font-black text-[10px] md:text-xs uppercase tracking-[0.2em]">
                    🏠 로비로 돌아가기
                  </span>
                </button>
              )}
              
              <div className="flex items-center justify-center gap-8">
                 <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full" />
                    <span className="text-[8px] font-black text-zinc-800 uppercase tracking-widest italic">Signal Lost</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full" />
                    <span className="text-[8px] font-black text-zinc-800 uppercase tracking-widest italic">Core Damaged</span>
                 </div>
              </div>
            </div>
          </div>
          
          {/* Industrial Corner Decals */}
          <div className="absolute top-0 right-0 w-8 h-8 md:w-12 md:h-12 border-t-2 border-r-2 border-red-500/20 translate-x-4 -translate-y-4" />
          <div className="absolute bottom-0 left-0 w-8 h-8 md:w-12 md:h-12 border-b-2 border-l-2 border-red-500/20 -translate-x-4 translate-y-4" />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
