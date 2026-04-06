import React from 'react';
import { Home, Swords, ShoppingBag, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { Screen } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

import { useAudio } from '../contexts/AudioContext';

export default function BottomNav({ currentScreen, setCurrentScreen }: { currentScreen: Screen, setCurrentScreen: (s: Screen) => void }) {
  const { t } = useLanguage();
  const { playSfx } = useAudio();


  const navItems = [
    { id: 'lobby', icon: Home, label: t.nav.lobby, color: 'text-yellow-400', glow: 'shadow-yellow-500/50' },
    { id: 'quest', icon: Swords, label: t.nav.game, color: 'text-red-500', glow: 'shadow-red-500/50' },
    { id: 'shop', icon: ShoppingBag, label: t.nav.shop, color: 'text-cyan-400', glow: 'shadow-cyan-500/50' },
    { id: 'gear', icon: Shield, label: t.nav.gear, color: 'text-purple-400', glow: 'shadow-purple-500/50' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full z-50">
      {/* Top Neon Border Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
      
      <div className="bg-zinc-950/90 backdrop-blur-xl border-t border-white/5 h-20 md:h-24 px-4 flex justify-around items-center max-w-5xl mx-auto relative overflow-hidden">
        {/* Subtle Scanline Effect on BG */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none" />

        {navItems.map(item => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                playSfx('nav');
                setCurrentScreen(item.id as Screen);
              }}
              className="relative flex flex-col items-center justify-center w-20 md:w-24 h-full group outline-none"
            >
              {/* Active Highlight Bracket Design */}
              {isActive && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute inset-0 z-0 flex items-center justify-center"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className={`w-16 h-16 md:w-20 md:h-20 bg-white/5 border border-white/10 relative transform -skew-x-12`}>
                     {/* Corner Accents */}
                     <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${item.color}`} />
                     <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${item.color}`} />
                     {/* Bottom Glow Beam */}
                     <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] ${item.color} ${item.glow} shadow-[0_0_10px_currentColor]`} />
                  </div>
                </motion.div>
              )}

              <div className={`relative z-10 flex flex-col items-center transition-all duration-300 ${isActive ? 'scale-110' : 'opacity-60 scale-90 group-hover:opacity-100 group-hover:scale-100'}`}>
                <item.icon 
                  size={isActive ? 28 : 24} 
                  className={isActive ? item.color : 'text-white'} 
                  strokeWidth={isActive ? 2.5 : 2}
                  fill={isActive ? 'currentColor' : 'none'}
                />
                <span className={`font-black italic text-[9px] md:text-[11px] uppercase mt-1.5 tracking-tighter transition-colors ${isActive ? item.color : 'text-white'}`}>
                  {item.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
