import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { useAudio } from '../contexts/AudioContext';
import { motion, AnimatePresence } from 'motion/react';
import { CHARACTERS } from '../constants/characters';
import { useAuth } from '../contexts/AuthContext';
import { Star } from 'lucide-react';
import PayPalCheckout from './PayPalCheckout';

const CyberMenuButton = ({ text, highlight, onClick, delay, hotEventText }: { text: string, highlight?: boolean, onClick: () => void, delay: number, hotEventText?: string }) => (
  <motion.button 
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, type: "spring", stiffness: 200, damping: 20 }}
    onClick={onClick}
    className="group relative flex items-center justify-start pointer-events-auto outline-none"
  >
    <div className={`absolute inset-0 transform -skew-x-[20deg] border-2 transition-all ${
      highlight 
        ? 'bg-yellow-400/20 border-yellow-400 group-hover:bg-yellow-400/40 shadow-[0_0_15px_rgba(250,204,21,0.3)]' 
        : 'bg-cyan-950/40 border-cyan-500/30 group-hover:bg-cyan-800/60 group-hover:border-cyan-400'
    }`} />
    
    {/* Deco block on left */}
    <div className={`w-3 h-8 md:h-12 ml-4 relative z-10 transform -skew-x-[20deg] ${highlight ? 'bg-yellow-400' : 'bg-cyan-500/50 group-hover:bg-cyan-400'}`} />
    
    <div className="py-2 md:py-3 px-4 md:px-6 relative z-10 flex flex-col items-start pr-12">
      <span className={`font-black italic text-sm md:text-lg tracking-[0.2em] uppercase ${highlight ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]' : 'text-white group-hover:text-cyan-200'}`}>
        {text}
      </span>
      {highlight && (
        <span className="text-[8px] md:text-[10px] text-white bg-black px-1.5 py-0.5 transform -skew-x-[10deg] absolute -top-3 right-0 border border-yellow-400">{hotEventText}</span>
      )}
    </div>
  </motion.button>
);

interface LobbyProps {
  onPlay: () => void;
  onPlayDirect: (questId: string) => void;
  onShowLogin: () => void;
  onShowMenu: () => void;
  selectedChar: number;
  setSelectedChar: (index: number) => void;
  ownedChars: string[];
  onUnlockChar: (name: string) => void;
}

export default function LobbyScreen({ onPlay, onPlayDirect, onShowLogin, onShowMenu, selectedChar, setSelectedChar, ownedChars, onUnlockChar }: LobbyProps) {
  const { t } = useLanguage();
  const { addCoins } = useCurrency();
  const { playSfx } = useAudio();
  const { user } = useAuth();
  const [showPayPal, setShowPayPal] = useState(false);
  const [waitingForLogin, setWaitingForLogin] = useState(false);

  React.useEffect(() => {
    if (user && waitingForLogin) {
      setShowPayPal(true);
      setWaitingForLogin(false);
    }
  }, [user, waitingForLogin]);

  const characters = CHARACTERS;
  const activeChar = characters[selectedChar];

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-slate-950 font-sans pb-24">
      {/* Background Starscape & Nebula */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)] z-10" />
        <div className="absolute top-1/4 left-1/4 w-[60vw] h-[60vh] bg-purple-600/30 blur-[140px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[60vw] h-[60vh] bg-blue-600/30 blur-[140px] rounded-full mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-cyan-400/20 blur-sm shadow-[0_0_50px_rgba(34,211,238,0.5)] z-0" />
      </div>
      
      {/* Stars */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-white rounded-full opacity-50 shadow-[0_0_6px_white] animate-pulse" 
            style={{ 
              left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, 
              transform: `scale(${Math.random()})`, animationDuration: `${2 + Math.random() * 3}s`
            }} 
          />
        ))}
      </div>

      {/* Central Character Carousel */}
      <div className="absolute top-[45%] md:top-1/2 left-0 right-0 -translate-y-1/2 flex items-center justify-start md:justify-center gap-6 md:gap-6 overflow-x-auto md:overflow-visible px-[25vw] md:px-4 pointer-events-auto h-[450px] md:h-[550px] z-30 ml-0 md:ml-40 snap-x snap-mandatory scrollbar-hide touch-pan-x">
        {characters.map((char, i) => {
          const isActive = selectedChar === i;
          const charLang = t.characters[char.name as keyof typeof t.characters];
          return (
            <motion.div
              key={char.name}
              onClick={() => { 
                playSfx('select'); 
                if (!isActive) {
                  setSelectedChar(i);
                } else {
                  onPlayDirect('q1');
                }
              }}
              animate={{ scale: isActive ? 1.05 : 0.85, opacity: isActive ? 1 : 0.6, y: isActive ? -15 : 0 }}
              className={`relative cursor-pointer transition-all ${isActive ? 'z-40' : 'z-10'} w-32 md:w-64 h-72 md:h-[28rem] flex-shrink-0 group snap-center`}
            >
              <div className={`w-full h-full transform -skew-x-[10deg] overflow-hidden border-[3px] ${isActive ? 'border-yellow-300 shadow-[0_0_30px_rgba(250,204,21,0.5)]' : 'border-cyan-400/20 md:group-hover:border-cyan-400/50'} flex flex-col justify-end relative bg-slate-900`}>
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                 <img src={char.img} className="absolute inset-0 w-[140%] h-[140%] md:w-[180%] md:h-[180%] object-cover object-top -translate-y-2 -translate-x-[15%] md:-translate-x-[20%]" alt={`${char.name} - Ninja Action Character`} referrerPolicy="no-referrer" />
                 
                 <div className={`absolute bottom-0 w-full z-20 py-3 flex flex-col items-center justify-center border-t-2 ${isActive ? 'bg-zinc-950 border-yellow-400' : 'bg-black/80 border-cyan-400/30'}`}>
                    {char.isPremium && (
                      <div className={`absolute -top-6 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.6)] flex items-center gap-1 border border-white/20 ${ownedChars.includes(char.name) ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 animate-premium-glow'}`}>
                         <Star size={8} fill="black" className="text-black" />
                         <span className="text-[9px] font-black text-black tracking-widest leading-none">
                           {ownedChars.includes(char.name) ? 'CERTIFIED' : 'PREMIUM'}
                         </span>
                         <Star size={8} fill="black" className="text-black" />
                      </div>
                    )}
                    <span className={`font-black italic tracking-widest text-base ${isActive ? 'text-white' : 'text-cyan-200'}`}>
                      {charLang?.role || char.name}
                    </span>
                 </div>
              </div>
              {isActive && (
                <>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-[4px] border-r-[4px] border-yellow-400 translate-x-2 -translate-y-2" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[4px] border-l-[4px] border-yellow-400 -translate-x-2 translate-y-2" />
                </>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Info Display */}
      <div className="absolute bottom-40 md:bottom-32 left-6 md:left-12 flex flex-col gap-2 font-mono pointer-events-none drop-shadow-md z-40 max-w-[300px] md:max-w-md">
         <motion.div key={`tactics-${activeChar.name}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="text-yellow-400 font-bold uppercase tracking-widest text-xs md:text-sm flex items-center">
                <div className="w-2 h-2 bg-yellow-400 mr-2 transform rotate-45" />
                {t.characters[activeChar.name as keyof typeof t.characters]?.role} {t.lobby.tactics}
              </div>
            </div>

            <div className="text-cyan-50 text-[10px] md:text-xs leading-relaxed uppercase bg-cyan-900/40 p-3 border-l-4 border-cyan-400 backdrop-blur-sm shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
              {t.characters[activeChar.name as keyof typeof t.characters]?.description}
            </div>

            {/* Passive Skill Section */}
            <motion.div 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.15, duration: 0.3 }}
              className="mt-2"
            >
              <div className="relative p-2.5 md:p-3 border rounded-sm backdrop-blur-sm bg-zinc-950/50 border-cyan-400/40 shadow-[0_0_12px_rgba(34,211,238,0.15)]">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-[9px] md:text-[10px] font-black tracking-[0.2em] text-yellow-400">
                    ◆ {t.lobby.passiveSkillTitle}
                  </span>
                </div>
                <div className="text-xs md:text-sm font-black italic tracking-wider text-cyan-200">
                  {t.characters[activeChar.name as keyof typeof t.characters]?.passiveDesc}
                </div>
              </div>
            </motion.div>
            {/* Unlock Button → PayPal Checkout */}
            {activeChar.isPremium && !ownedChars.includes(activeChar.name) && (
              <>
                {!showPayPal ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (!user) { 
                        setWaitingForLogin(true);
                        onShowLogin(); 
                        return; 
                      }
                      setShowPayPal(true);
                    }}
                    className="mt-4 w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-xl shadow-[0_0_20px_rgba(251,191,36,0.5)] border-2 border-white/20 flex items-center justify-center gap-2 group overflow-hidden relative pointer-events-auto"
                  >
                    <Star className="text-black group-hover:rotate-180 transition-transform" size={16} fill="black" />
                    <span className="font-headline font-black text-black uppercase tracking-widest italic text-sm">{t.lobby.individualUnlock}</span>
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 pointer-events-auto"
                  >
                    <PayPalCheckout
                      amount="3.99"
                      description={`Unlock ${activeChar.name} Character`}
                      customId={`${user?.uid}_char_${activeChar.name}`}
                      onSuccess={() => {
                        onUnlockChar(activeChar.name);
                        setShowPayPal(false);
                      }}
                      onCancel={() => setShowPayPal(false)}
                    />
                    <button
                      onClick={() => setShowPayPal(false)}
                      className="mt-2 w-full text-center text-[10px] text-zinc-500 hover:text-red-400 font-bold uppercase tracking-widest transition-colors"
                    >
                      Cancel
                    </button>
                  </motion.div>
                )}
              </>
            )}
         </motion.div>
      </div>

      {/* Side Menu */}
      <div className="absolute right-0 top-32 flex flex-col gap-4 z-50 pr-4">
        <CyberMenuButton 
          text={t.menu.premiumPass.split(' (')[0]} 
          highlight 
          onClick={onShowMenu} 
          delay={0.5} 
          hotEventText={t.lobby.hotEvent} 
        />
      </div>
    </div>
  );
}
