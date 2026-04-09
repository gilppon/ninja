import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAudio } from '../contexts/AudioContext';
import { Quest } from '../types';
import { Lock } from 'lucide-react';

interface QuestScreenProps {
  onBack: () => void;
  onLaunch: (questId: string) => void;
  clearedQuests: string[];
}

export const QUESTS: Quest[] = [
  {
    id: 'q1',
    level: 1,
    title: 'Neon Outskirts',
    description: 'Eliminate rogue drones passing through the outer neon sector.',
    difficulty: 'Normal',
    bossId: 'shogun',
    bgKey: 'MASTER',
    reward: 100,
    thumbnail: '/assets/background/bg_master.jpeg'
  },
  {
    id: 'q2',
    level: 2,
    title: 'Frozen Facilities',
    description: 'A cyber-facility frozen in time. Defeat the Neon Oni guarding the core.',
    difficulty: 'Hard',
    bossId: 'oni',
    bgKey: 'ICE',
    reward: 250,
    thumbnail: '/assets/background/bg_ice.jpeg'
  },
  {
    id: 'q3',
    level: 3,
    title: 'Dragon\'s Peak',
    description: 'Ascend the peak and slay the Cyber Dragon causing electronic storms.',
    difficulty: 'Extreme',
    bossId: 'dragon',
    bgKey: 'THUNDER',
    reward: 500,
    thumbnail: '/assets/background/bg_thunder.jpeg'
  },
  {
    id: 'q4',
    level: 4,
    title: 'Void Anomaly',
    description: 'Venture into the void anomaly and survive against the corrupted Void Ninja.',
    difficulty: 'Elite',
    bossId: 'void',
    bgKey: 'FLAME', // Reusing flame effect for a more dramatic void feel
    reward: 1000,
    thumbnail: '/assets/background/bg-flame.jpeg'
  }
];

const DifficultyTag = ({ difficulty }: { difficulty: Quest['difficulty'] }) => {
  const { t } = useLanguage();
  const colors = {
    'Normal': 'bg-green-500/20 text-green-400 border-green-500',
    'Hard': 'bg-yellow-500/20 text-yellow-400 border-yellow-500',
    'Extreme': 'bg-orange-500/20 text-orange-400 border-orange-500',
    'Elite': 'bg-red-500/20 text-red-500 border-red-600 animate-pulse'
  };
  return (
    <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-widest border border-dashed rounded-sm ${colors[difficulty]}`}>
      {t.quest.difficulty[difficulty]}
    </span>
  );
};

export default function QuestScreen({ onBack, onLaunch, clearedQuests }: QuestScreenProps) {
  const { t } = useLanguage();
  const { playSfx } = useAudio();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [showBriefing, setShowBriefing] = useState(false);

  const selectedQuest = QUESTS[selectedIdx];

  return (
    <div className="absolute inset-0 z-40 bg-slate-950 flex flex-col font-sans">
      {/* Background with subtle animation */}
      <motion.div 
        key={selectedQuest.id}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${selectedQuest.thumbnail})`, filter: 'grayscale(0.5) blur(4px)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 pt-16 px-6 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black italic text-white tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] uppercase">
            {t.quest.selectMission}
          </h2>
          <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mt-1">{t.quest.availableContracts}</p>
        </div>
        <button 
          onClick={() => { playSfx('fail'); onBack(); }}
          className="text-white/50 hover:text-white font-black text-xl px-4 py-2 bg-black/40 border border-white/10 rounded-lg hover:border-white/50 transition-colors"
        >
          {t.quest.back}
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col overflow-hidden pb-24">
        {/* Quest List */}
        <div className="w-full max-w-3xl mx-auto flex-1 min-h-0 overflow-y-auto px-4 md:px-6 py-2 md:py-4 space-y-3 md:space-y-5 custom-scrollbar touch-pan-y">
          {QUESTS.map((quest, idx) => {
            const isSelected = selectedIdx === idx;
            const isLocked = idx > 0 && !clearedQuests.includes(QUESTS[idx - 1].id);

            return (
              <motion.div
                key={quest.id}
                onClick={() => { 
                  if (isLocked) {
                    playSfx('fail');
                    return;
                  }
                  playSfx('select'); 
                  setSelectedIdx(idx); 
                  setShowBriefing(true); 
                }}
                className={`relative p-4 md:p-6 rounded-xl cursor-pointer overflow-hidden border-2 transition-all ${
                  isLocked
                    ? 'bg-slate-900/60 border-white/5 grayscale opacity-60'
                    : isSelected 
                      ? 'bg-cyan-900/40 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]' 
                      : 'bg-black/40 border-white/10 md:hover:border-white/30'
                }`}
                whileTap={isLocked ? {} : { scale: 0.98 }}
              >
                {isSelected && (
                   <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-transparent pointer-events-none" />
                )}
                
                <div className="flex justify-between items-start relative z-10">
                   <div className="flex items-center gap-3">
                     {isLocked && (
                       <div className="bg-black/60 p-2 rounded-full border border-white/10 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                          <Lock size={16} className="text-white/40" />
                       </div>
                     )}
                     <div>
                       <div className="text-white/40 text-[10px] font-bold tracking-widest mb-1">
                         {isLocked ? t.quest.locked : `${t.quest.levelPrefix} ${quest.level}`}
                       </div>
                       <h3 className={`text-lg md:text-xl font-black italic ${isSelected && !isLocked ? 'text-cyan-300' : 'text-white'}`}>
                         {t.quest.missions[quest.id]?.title ?? quest.title}
                       </h3>
                       {isLocked && (
                         <div className="text-[9px] font-bold text-red-400/80 mt-0.5 uppercase tracking-tighter">
                           {t.quest.clearPrevious}
                         </div>
                       )}
                     </div>
                   </div>
                   {!isLocked && <DifficultyTag difficulty={quest.difficulty} />}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Selected Quest Details Modal */}
      <AnimatePresence>
        {showBriefing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md bg-black/80 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-cyan-500/30 shadow-[0_0_40px_rgba(34,211,238,0.15)] relative overflow-hidden"
            >
              {/* Close Button */}
              <button 
                onClick={() => setShowBriefing(false)}
                className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-white/50 hover:text-white transition-colors"
              >
                ✕
              </button>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-500/20 to-transparent pointer-events-none" />
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-l-[40px] border-t-cyan-400 border-l-transparent pointer-events-none" />

              <h4 className="text-xs md:text-sm font-bold text-cyan-400 mt-2 mb-2 md:mb-3 uppercase tracking-widest">{t.quest.briefing}</h4>
              <h2 className="text-2xl md:text-3xl font-black text-white italic mb-3 md:mb-5">{t.quest.missions[selectedQuest.id]?.title ?? selectedQuest.title}</h2>
              <p className="text-white/70 text-sm leading-relaxed mb-6 md:mb-8 min-h-[60px]">
                {t.quest.missions[selectedQuest.id]?.description ?? selectedQuest.description}
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex justify-between items-center bg-white/5 px-4 py-2.5 rounded-lg border border-white/5">
                  <span className="text-white/50 text-xs font-bold font-mono">{t.quest.target}</span>
                  <span className="text-red-400 text-sm font-black italic uppercase tracking-wider">{selectedQuest.bossId}</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 px-4 py-2.5 rounded-lg border border-white/5">
                  <span className="text-white/50 text-xs font-bold font-mono">{t.quest.reward}</span>
                  <span className="text-yellow-400 text-sm font-black flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_5px_yellow]" /> 
                    {selectedQuest.reward} {t.quest.coins}
                  </span>
                </div>
              </div>

              <button 
                onClick={() => { playSfx('powerup'); onLaunch(selectedQuest.id); }}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black italic text-xl px-4 py-4 rounded-xl shadow-[0_0_25px_rgba(34,211,238,0.4)] transform transition-transform active:scale-95 flex justify-center items-center gap-2 group"
              >
                <span>{t.quest.launch}</span>
                <span className="group-hover:translate-x-2 transition-transform">➜</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
