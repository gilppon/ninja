import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, Shield, Zap } from 'lucide-react';
import { useCurrency } from './CurrencyContext';
import { useInventory } from './InventoryContext';

interface Achievement {
  id: string;
  title: { en: string; ko: string };
  desc: { en: string; ko: string };
  icon: React.ReactNode;
  condition: (stats: any) => boolean;
  reward: number;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'combo_10',
    title: { en: 'Combo Novice', ko: '콤보 입문자' },
    desc: { en: 'Reach 10 combos', ko: '10 콤보 달성' },
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    condition: (s) => s.maxCombo >= 10,
    reward: 50
  },
  {
    id: 'combo_50',
    title: { en: 'Combo Master', ko: '콤보 마스터' },
    desc: { en: 'Reach 50 combos', ko: '50 콤보 달성' },
    icon: <Zap className="w-6 h-6 text-red-500" />,
    condition: (s) => s.maxCombo >= 50,
    reward: 200
  },
  {
    id: 'rich_ninja',
    title: { en: 'Rich Ninja', ko: '부유한 닌자' },
    desc: { en: 'Hold 500 coins', ko: '500 코인 보유' },
    icon: <Shield className="w-6 h-6 text-indigo-400" />,
    condition: (s) => s.coins >= 500,
    reward: 100
  },
  {
    id: 'collector',
    title: { en: 'Collector', ko: '수집가' },
    desc: { en: 'Own 3 items', ko: '아이템 3개 보유' },
    icon: <Trophy className="w-6 h-6 text-amber-500" />,
    condition: (s) => s.itemCount >= 3,
    reward: 150
  }
];

interface AchievementContextType {
  unlockedIds: string[];
  checkAchievements: (stats: any) => void;
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export function AchievementProvider({ children }: { children: React.ReactNode }) {
  const [unlockedIds, setUnlockedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('ninja_achievements');
    return saved ? JSON.parse(saved) : [];
  });
  const [toast, setToast] = useState<Achievement | null>(null);
  const { addCoins } = useCurrency();

  useEffect(() => {
    localStorage.setItem('ninja_achievements', JSON.stringify(unlockedIds));
  }, [unlockedIds]);

  const checkAchievements = (stats: any) => {
    ACHIEVEMENTS.forEach(ach => {
      if (!unlockedIds.includes(ach.id) && ach.condition(stats)) {
        setUnlockedIds(prev => [...prev, ach.id]);
        addCoins(ach.reward);
        setToast(ach);
        setTimeout(() => setToast(null), 4000);
      }
    });
  };

  return (
    <AchievementContext.Provider value={{ unlockedIds, checkAchievements }}>
      {children}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-sm"
          >
            <div className="bg-zinc-900 border-2 border-zinc-700 p-4 rounded-2xl flex items-center gap-4 shadow-2xl">
              <div className="bg-zinc-800 p-3 rounded-xl">
                {toast.icon}
              </div>
              <div className="flex-1">
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Achievement Unlocked!</p>
                <h4 className="text-white font-black text-lg italic uppercase">{toast.title.ko}</h4>
                <p className="text-zinc-400 text-xs font-bold">{toast.desc.ko}</p>
              </div>
              <div className="text-yellow-400 font-black text-lg">+{toast.reward}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AchievementContext.Provider>
  );
}

export function useAchievements() {
  const context = useContext(AchievementContext);
  if (!context) throw new Error('useAchievements must be used within AchievementProvider');
  return context;
}
