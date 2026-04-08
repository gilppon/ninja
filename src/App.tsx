import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import TopBar from './components/TopBar';
import BottomNav from './components/BottomNav';
import LobbyScreen from './components/LobbyScreen';
import QuestScreen from './components/QuestScreen';
import GameScreen from './components/GameScreen';
import ShopScreen from './components/ShopScreen';
import GearScreen from './components/GearScreen';
import FailOfferModal from './components/FailOfferModal';
import VictoryModal from './components/VictoryModal';
import { QUESTS } from './components/QuestScreen';
import { Screen } from './types';
import { useLanguage } from './contexts/LanguageContext';
import { AudioProvider } from './contexts/AudioContext';
import { CurrencyProvider, useCurrency } from './contexts/CurrencyContext';
import { InventoryProvider, useInventory } from './contexts/InventoryContext';
import { AchievementProvider } from './contexts/AchievementContext';
import { CHARACTERS } from './constants/characters';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginModal from './components/LoginModal';

const CherryBlossoms = () => {
  const petals = Array.from({ length: 15 });
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: -20, 
            opacity: 0,
            rotate: 0 
          }}
          animate={{ 
            x: [null, (Math.random() - 0.5) * 200 + 'px'],
            y: [null, window.innerHeight + 20],
            opacity: [0, 1, 0.4, 0],
            rotate: [0, 360, 720]
          }}
          transition={{ 
            duration: 10 + Math.random() * 15, 
            repeat: Infinity, 
            delay: Math.random() * 20,
            ease: "linear"
          }}
          className="absolute w-4 h-5 bg-pink-200/40 rounded-full shadow-[0_0_10px_rgba(244,114,182,0.3)]"
          style={{ width: 8 + Math.random() * 12, height: 10 + Math.random() * 15 }}
        />
      ))}
    </div>
  );
};

function GameApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('lobby');
  const [selectedChar, setSelectedChar] = useState(0);
  const [selectedQuestId, setSelectedQuestId] = useState<string>('q1');
  const [showFailOffer, setShowFailOffer] = useState(false);
  const [gameKey, setGameKey] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [showDailyReward, setShowDailyReward] = useState(false);
  const [showVictory, setShowVictory] = useState(false);
  const [victoryData, setVictoryData] = useState({ score: 0, coins: 0, isLastStage: false });
  const [reviveUsed, setReviveUsed] = useState(false);
  const [reviveTrigger, setReviveTrigger] = useState(0);

  const isPremiumChar = CHARACTERS[selectedChar].price > 0;
  const { t } = useLanguage();
  const { user, loading } = useAuth();
  const { addCoins } = useCurrency();
  const { itemCounts, consumeItem } = useInventory();

  React.useEffect(() => {
    if (user && !loading) {
      const today = new Date().toISOString().split('T')[0];
      const lastReward = localStorage.getItem('last_premium_reward_date');
      if (lastReward !== today) {
        addCoins(200);
        localStorage.setItem('last_premium_reward_date', today);
        setShowDailyReward(true);
        setTimeout(() => setShowDailyReward(false), 4000);
      }
    }
  }, [user, loading, addCoins]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleGameSuccess = (finalScore: number) => {
    const calculatedCoins = 500 + Math.floor(finalScore / 100);
    addCoins(calculatedCoins);
    
    const currentIndex = QUESTS.findIndex(q => q.id === selectedQuestId);
    const isLast = currentIndex === QUESTS.length - 1 || currentIndex === -1;
    
    setVictoryData({
      score: finalScore,
      coins: calculatedCoins,
      isLastStage: isLast
    });
    setShowVictory(true);
  };

  const handleNextStage = () => {
    const currentIndex = QUESTS.findIndex(q => q.id === selectedQuestId);
    if (currentIndex !== -1 && currentIndex < QUESTS.length - 1) {
      const nextQuest = QUESTS[currentIndex + 1];
      setSelectedQuestId(nextQuest.id);
      setShowVictory(false);
      setGameKey(k => k + 1);
      setCurrentScreen('game');
    } else {
      setShowVictory(false);
      setCurrentScreen('lobby');
    }
  };

  return (
    <div className="relative w-full h-[100dvh] bg-gradient-to-br from-[#2e0854] via-[#7e22ce] to-[#d946ef] font-sans text-zinc-900 selection:bg-[#bb152c] selection:text-white overflow-hidden">
      <AnimatePresence>
        {showLogin && <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />}
        {showDailyReward && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 text-white px-6 py-3 rounded-2xl shadow-[0_10px_40px_rgba(250,204,21,0.5)] flex items-center gap-4 border-[3px] border-yellow-200"
          >
            <div className="text-4xl animate-bounce drop-shadow-md">💎</div>
            <div className="flex flex-col">
              <div className="text-[10px] md:text-xs text-yellow-100 font-extrabold tracking-widest uppercase indent-1">PREMIUM DAILY REWARD</div>
              <div className="text-xl md:text-2xl font-black italic tracking-wider drop-shadow-sm">+200 COINS</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CherryBlossoms />
      <div className="absolute inset-0 bg-black/20 pointer-events-none z-0" />
      
      <div className="relative z-10 w-full h-full">
        <TopBar screen={currentScreen} />
        
        <main className="w-full h-full">
          {currentScreen === 'lobby' && (
            <LobbyScreen 
              selectedChar={selectedChar} 
              setSelectedChar={setSelectedChar} 
              onPlay={() => setCurrentScreen('quest')} 
              onPlayDirect={(questId) => {
                setSelectedQuestId(questId);
                setCurrentScreen('game');
              }}
              onShowLogin={() => setShowLogin(true)}
            />
          )}
          {currentScreen === 'quest' && (
            <QuestScreen 
              onBack={() => setCurrentScreen('lobby')}
              onLaunch={(questId) => {
                setSelectedQuestId(questId);
                setCurrentScreen('game');
              }}
            />
          )}
          {currentScreen === 'game' && (
            <GameScreen 
              key={gameKey}
              character={CHARACTERS[selectedChar]} 
              questId={selectedQuestId}
              onFail={() => setShowFailOffer(true)} 
              onSuccess={handleGameSuccess}
              reviveTrigger={reviveTrigger}
            />
          )}
          {currentScreen === 'shop' && <ShopScreen />}
          {currentScreen === 'gear' && (
            <GearScreen 
              selectedChar={CHARACTERS[selectedChar]} 
            />
          )}
        </main>

        {currentScreen !== 'game' && (
          <BottomNav currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
        )}
      </div>

      <AnimatePresence>
        {showFailOffer && <FailOfferModal
          isOpen={showFailOffer}
          isPremium={isPremiumChar}
          canRevive={isPremiumChar && !reviveUsed}
          scrollCount={itemCounts['revival_scroll'] || 0}
          onClose={() => {
            setShowFailOffer(false);
            setReviveUsed(false);
            setCurrentScreen('lobby');
          }} 
          onRevive={() => {
            if (isPremiumChar && !reviveUsed) {
              // 프리미엄 전용 즉시 이어하기 (1회 한정)
              setReviveUsed(true);
              setShowFailOffer(false);
              setReviveTrigger(t => t + 1);
            }
          }}
          onUseScroll={() => {
            if (itemCounts['revival_scroll'] > 0) {
              consumeItem('revival_scroll');
              setShowFailOffer(false);
              setReviveTrigger(t => t + 1);
            }
          }}
          onShowLogin={() => {
            setShowFailOffer(false);
            setShowLogin(true);
          }}
        />}
        
        {showVictory && (
          <VictoryModal 
            score={victoryData.score}
            coins={victoryData.coins}
            isLastStage={victoryData.isLastStage}
            onNext={handleNextStage}
            onLobby={() => {
              setShowVictory(false);
              setCurrentScreen('lobby');
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <AudioProvider>
      <CurrencyProvider>
        <InventoryProvider>
          <AchievementProvider>
            <AuthProvider>
              <GameApp />
            </AuthProvider>
          </AchievementProvider>
        </InventoryProvider>
      </CurrencyProvider>
    </AudioProvider>
  );
}
