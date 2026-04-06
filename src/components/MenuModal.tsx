import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { useAudio } from '../contexts/AudioContext';

type TabType = 'fund' | 'welfare' | 'exchange';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab: TabType;
}

const TabButton = ({ active, text, onClick }: { active: boolean, text: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 md:px-6 md:py-3 font-black italic text-sm md:text-lg transition-all transform -skew-x-12 ${
      active 
        ? 'bg-yellow-400 text-black border-b-4 border-yellow-600' 
        : 'text-white/40 hover:text-white hover:bg-white/5 grayscale'
    }`}
  >
    <span className="transform skew-x-12 block">{text}</span>
  </button>
);



export default function MenuModal({ isOpen, onClose, initialTab }: MenuModalProps) {
  const { t } = useLanguage();
  const { playSfx } = useAudio();
  const { addCoins, addGems } = useCurrency();
  const [activeTab, setActiveTab] = React.useState<TabType>(initialTab);

  React.useEffect(() => {
    if (isOpen) setActiveTab(initialTab);
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const handleBuy = (gems: number, coins: number) => {
    addGems(gems);
    addCoins(coins);
    playSfx('powerup');
  };

  const renderContent = () => {
    switch (activeTab) {

      case 'fund':
        return (
          <div className="flex flex-col items-center justify-center h-48 space-y-4 opacity-50">
            <div className="w-16 h-16 border-4 border-dashed border-indigo-400 rounded-full animate-spin-slow"></div>
            <p className="font-black italic text-indigo-200">DAO LEVEL FUND IN PROGRESS...</p>
          </div>
        );
      case 'welfare':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-gradient-to-br from-emerald-600 to-teal-400 p-4 rounded-2xl border-2 border-emerald-300 shadow-lg relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="font-black italic text-white text-lg">DAILY GIFT</h4>
                  <p className="text-white/80 text-xs mb-4">Claimed every 24h</p>
                  <button onClick={() => handleBuy(0, 50)} className="bg-white text-emerald-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-emerald-50 transition-colors">CLAIM 50 🪙</button>
                </div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 -rotate-45 translate-x-12 -translate-y-8 group-hover:scale-110 transition-transform"></div>
             </div>
             <div className="bg-gradient-to-br from-yellow-500 to-orange-400 p-4 rounded-2xl border-2 border-yellow-300 shadow-lg relative overflow-hidden group">
                <div className="relative z-10">
                   <h4 className="font-black italic text-white text-lg italic">PREMIUM PASS</h4>
                   <p className="text-white/80 text-xs mb-4">Double rewards for 30d</p>
                   <button className="bg-white text-orange-600 px-4 py-2 rounded-xl font-bold text-sm">ACTIVATE</button>
                </div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 -rotate-45 translate-x-12 -translate-y-8 group-hover:scale-110 transition-transform"></div>
             </div>
          </div>
        );
      case 'exchange':
        return (
          <div className="bg-indigo-950/50 p-6 rounded-2xl border-2 border-dashed border-indigo-500/50 text-center space-y-6">
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-red-500 rotate-45 border-2 border-white shadow-[0_0_10px_red]"></div>
              <div className="text-2xl text-white">➜</div>
              <div className="w-12 h-12 bg-yellow-400 rounded-full border-2 border-white shadow-[0_0_10px_yellow]"></div>
            </div>
            <p className="text-indigo-300 text-sm font-medium">10 GEMS = 100 COINS</p>
            <button className="w-full bg-indigo-600 py-3 rounded-xl font-black italic text-white border-b-4 border-indigo-900 active:translate-y-1 active:border-none">EXCHANGE RESOURCES</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-auto">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />
      
      <motion.div
        initial={{ scale: 0.9, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 50, opacity: 0 }}
        className="relative w-full max-w-2xl bg-white/10 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/20 overflow-hidden"
      >
        <div className="bg-white/5 p-6 border-b border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-white/5"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-black italic text-white tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] uppercase">
                {t.lobby.enterDojo}
              </h2>
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-1">NINJA ARSENAL & LOGISTICS</p>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 md:w-12 md:h-12 bg-red-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center hover:scale-110 active:scale-90 transition-all group"
            >
              <span className="text-white font-black text-xl md:text-2xl transform group-hover:rotate-90 transition-transform">✕</span>
            </button>
          </div>
          
          {/* Decorative Studs */}
          <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-white/10 shadow-inner"></div>
          <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-white/5 shadow-inner"></div>
        </div>

        <div className="flex overflow-x-auto no-scrollbar bg-white/5 backdrop-blur-sm border-b border-white/10">

          <TabButton active={activeTab === 'fund'} text={t.lobby.menuFund} onClick={() => setActiveTab('fund')} />
          <TabButton active={activeTab === 'welfare'} text={t.lobby.menuWelfare} onClick={() => setActiveTab('welfare')} />
          <TabButton active={activeTab === 'exchange'} text={t.lobby.menuExchange} onClick={() => setActiveTab('exchange')} />
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-10 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="bg-black/20 px-8 py-4 flex justify-between items-center border-t border-white/5">
          <div className="flex gap-2">
             <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse"></div>
             <div className="w-2 h-2 rounded-full bg-white/10"></div>
             <div className="w-2 h-2 rounded-full bg-white/5"></div>
          </div>
          <span className="text-[10px] text-white/20 font-black tracking-widest uppercase italic">NINJA-BRICK SUPREME EDITION</span>
        </div>
      </motion.div>
    </div>
  );
}
