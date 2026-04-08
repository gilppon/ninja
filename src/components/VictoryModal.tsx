import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAudio } from '../contexts/AudioContext';

interface VictoryModalProps {
  score: number;
  coins: number;
  isLastStage: boolean;
  onNext: () => void;
  onLobby: () => void;
}

const VictoryModal: React.FC<VictoryModalProps> = ({ score, coins, isLastStage, onNext, onLobby }) => {
  const { t } = useLanguage();
  const { playSfx } = useAudio();
  const [displayScore, setDisplayScore] = useState(0);
  const [displayCoins, setDisplayCoins] = useState(0);

  useEffect(() => {
    playSfx('victory');
    
    // Count up animation
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      // Ease out quad
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      
      setDisplayScore(Math.floor(score * easeProgress));
      setDisplayCoins(Math.floor(coins * easeProgress));
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setDisplayScore(score);
        setDisplayCoins(coins);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [score, coins, playSfx]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="relative w-full max-w-md bg-zinc-900 border-2 border-yellow-500/50 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(234,179,8,0.3)]"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 p-6 text-center">
            <motion.h2 
              initial={{ letterSpacing: "0.5em", opacity: 0 }}
              animate={{ letterSpacing: "0.1em", opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-3xl font-black text-black uppercase tracking-widest"
            >
              {t.victory.title}
            </motion.h2>
          </div>

          <div className="p-8 space-y-8">
            <div className="text-center space-y-2">
              <p className="text-yellow-500/70 text-sm font-bold uppercase tracking-widest">{t.victory.missionComplete}</p>
              <h3 className="text-5xl font-black text-white tabular-nums">
                {displayScore.toLocaleString()}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-zinc-800/50 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                <span className="text-zinc-400 font-medium">{t.victory.reward}</span>
                <span className="text-2xl font-bold text-yellow-400">
                  + {displayCoins.toLocaleString()} 🪙
                </span>
              </div>
            </div>

            {isLastStage && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
                className="bg-purple-900/30 border border-purple-500/30 p-4 rounded-xl text-center"
              >
                <p className="text-purple-300 font-medium text-sm leading-relaxed">
                  {t.victory.season2}
                </p>
              </motion.div>
            )}

            <div className="flex flex-col gap-3 pt-4">
              {!isLastStage ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onNext}
                  className="w-full bg-white text-black font-black py-4 rounded-xl uppercase tracking-tighter hover:bg-yellow-400 transition-colors"
                >
                  {t.victory.next}
                </motion.button>
              ) : null}
              
              <button 
                onClick={onLobby}
                className="w-full bg-zinc-800 text-white font-bold py-4 rounded-xl uppercase tracking-tighter hover:bg-zinc-700 transition-colors"
              >
                {t.victory.lobby}
              </button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50" />
        </motion.div>

        {/* Confetti-like particles (Simplified for CSS) */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-500 rounded-full"
              initial={{ 
                x: '50%', 
                y: '50%', 
                opacity: 1 
              }}
              animate={{ 
                x: `${Math.random() * 100}%`, 
                y: `${Math.random() * 100}%`,
                opacity: 0,
                scale: Math.random() * 2
              }}
              transition={{ 
                duration: 2, 
                delay: 0.5, 
                ease: "easeOut" 
              }}
            />
          ))}
        </div>
      </div>
    </AnimatePresence>
  );
};

export default VictoryModal;
