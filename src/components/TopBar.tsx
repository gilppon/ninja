import React from 'react';
import { Menu, Star, Hexagon } from 'lucide-react';
import { Screen } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { useAuth } from '../contexts/AuthContext';
import { LogOut } from 'lucide-react';

export default function TopBar({ screen }: { screen: Screen }) {
  const { lang, setLang, t } = useLanguage();
  const { coins } = useCurrency(); 
  const { user, signOut } = useAuth();

  // Hide TopBar completely in the active game screen for maximum visibility
  if (screen === 'game') {
    return null;
  }

  // Lobby TopBar showing HUD-style resource meters
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="flex justify-between items-start w-full px-4 py-3 md:px-6 md:py-4 max-w-7xl mx-auto pointer-events-auto">
        {/* Left Side: Avatar and Player Info */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-br-2xl rounded-tl-2xl overflow-hidden border-2 border-cyan-400 p-0.5 shadow-[0_0_15px_rgba(34,211,238,0.5)] bg-slate-900 flex-shrink-0 relative">
             <div className="w-full h-full overflow-hidden bg-slate-800 flex items-center justify-center rounded-br-xl rounded-tl-xl">
                <img 
                  src="/assets/characters/ninja.png" 
                  alt="Profile" 
                  className="w-[150%] h-[150%] object-cover object-top -translate-y-2 pointer-events-none"
                  referrerPolicy="no-referrer"
                />
             </div>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-xs md:text-sm font-black text-cyan-400 tracking-widest uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,1)] flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-400 transform rotate-45" />
              {t.topBar.player}
            </h1>
            <div className="text-lg md:text-xl text-white font-black italic tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,1)] uppercase">
              {user?.isAnonymous ? 'GHOST_NINJA' : (user?.email?.split('@')[0] || t.topBar.title)}
            </div>
          </div>
        </div>

        {/* Right Side: Real Resources (Coins) and Settings */}
        <div className="flex items-center gap-3 md:gap-5 mt-1">
           {/* COINS - The only real currency we have for now */}
           <div className="flex items-center bg-cyan-950/60 border border-cyan-400/40 rounded-l-full rounded-r-md pl-1 pr-3 py-1 md:py-1.5 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
             <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-yellow-400 flex items-center justify-center mr-2 shadow-[0_0_10px_rgba(250,204,21,0.5)]">
               <Star size={16} fill="black" className="text-black" />
             </div>
             <div className="flex flex-col">
               <span className="text-[10px] text-cyan-400 font-bold uppercase leading-none">{t.topBar.assets}</span>
               <span className="font-black font-mono text-white text-sm md:text-lg leading-none mt-0.5">{coins.toLocaleString()}</span>
             </div>
           </div>

            {/* Logout Button */}
            {user && (
              <button
                 onClick={() => signOut()}
                 className="relative w-10 h-10 rounded-lg flex items-center justify-center bg-red-900/20 border border-red-500/40 text-red-500 hover:bg-red-500/30 transition-colors shadow-[0_0_10px_rgba(239,68,68,0.2)] transform -skew-x-[15deg]"
                 title="LOGOUT"
              >
                 <div className="transform skew-x-[15deg]">
                   <LogOut size={20} />
                 </div>
              </button>
            )}

           {/* Language Selector (Hidden behind transparent select) */}
           <div className="relative w-10 h-10 rounded-lg flex items-center justify-center bg-zinc-900 border border-cyan-400/40 text-cyan-400 hover:bg-cyan-900/50 transition-colors shadow-[0_0_10px_rgba(34,211,238,0.2)] transform -skew-x-[15deg]">
              <div className="transform skew-x-[15deg]">
                <Menu size={20} />
              </div>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as any)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                aria-label="Select Language"
              >
                <option value="en">EN</option>
                <option value="ko">KO</option>
                <option value="ja">JA</option>
                <option value="zh">ZH</option>
                <option value="es">ES</option>
              </select>
           </div>
        </div>
      </div>
    </header>
  );
}
