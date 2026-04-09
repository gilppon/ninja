import React, { useState, useCallback } from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
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
import MenuModal from './components/MenuModal';
import { db } from './lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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
  const [showMenu, setShowMenu] = useState(false);
  const [ownedChars, setOwnedChars] = useState<string[]>(() => {
    const saved = localStorage.getItem('ninja_owned_chars');
    return saved ? JSON.parse(saved) : ['MASTER', 'JADE'];
  });

  // 로그인 후 대기 중인 구매 요청을 자동 처리하기 위한 상태
  const [pendingPurchase, setPendingPurchase] = useState<string | null>(null);
  const [pendingBundlePurchase, setPendingBundlePurchase] = useState(false);

  React.useEffect(() => {
    localStorage.setItem('ninja_owned_chars', JSON.stringify(ownedChars));
  }, [ownedChars]);

  const isPremiumChar = CHARACTERS[selectedChar].isPremium;
  const { t } = useLanguage();
  const { user, loading } = useAuth();
  const { addCoins } = useCurrency();
  const { itemCounts, consumeItem } = useInventory();

  // === Firestore에서 소유 캐릭터 로드 ===
  const loadOwnedCharsFromFirestore = useCallback(async (uid: string) => {
    try {
      const docRef = doc(db, 'users', uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        if (data.ownedChars && Array.isArray(data.ownedChars)) {
          // Firestore 데이터와 로컬 데이터 병합 (둘 다 유지)
          setOwnedChars(prev => {
            const merged = Array.from(new Set([...prev, ...data.ownedChars]));
            return merged;
          });
        }
      }
    } catch (err) {
      console.error('Failed to load owned chars from Firestore:', err);
    }
  }, []);

  // === Firestore에 소유 캐릭터 저장 ===
  const saveOwnedCharsToFirestore = useCallback(async (uid: string, chars: string[]) => {
    try {
      const docRef = doc(db, 'users', uid);
      await setDoc(docRef, { ownedChars: chars }, { merge: true });
    } catch (err) {
      console.error('Failed to save owned chars to Firestore:', err);
    }
  }, []);

  // === 유저 로그인/로그아웃 감지 ===
  React.useEffect(() => {
    if (user) {
      // 로그인 시 Firestore에서 데이터 로드
      loadOwnedCharsFromFirestore(user.uid);
    } else {
      // 로그아웃 시 로컬 상태 초기화
      setOwnedChars(['MASTER', 'JADE']);
      setSelectedChar(0);
    }
  }, [user, loadOwnedCharsFromFirestore]);

  // === 소유 캐릭터 변경 시 Firestore에 동기화 ===
  React.useEffect(() => {
    if (user && ownedChars.length > 2) {
      // 기본 2캐릭 이상일 때만 저장 (프리미엄 구매 발생 시)
      saveOwnedCharsToFirestore(user.uid, ownedChars);
    }
  }, [user, ownedChars, saveOwnedCharsToFirestore]);


  // === 개별 캐릭터 잠금 해제 (로그인 필수) ===
  const unlockChar = (name: string) => {
    if (!user) {
      // 미로그인 → 구매 예약 후 로그인 모달 표시
      setPendingPurchase(name);
      setShowLogin(true);
      return;
    }
    if (!ownedChars.includes(name)) {
      setOwnedChars(prev => [...prev, name]);
    }
  };

  // === 전체 캐릭터 잠금 해제 (로그인 필수) ===
  const unlockAll = () => {
    if (!user) {
      // 미로그인 → 번들 구매 예약 후 로그인 모달 표시
      setPendingBundlePurchase(true);
      setShowLogin(true);
      return;
    }
    setOwnedChars(CHARACTERS.map(c => c.name));
  };

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
        {showLogin && <LoginModal isOpen={showLogin} onClose={() => { setShowLogin(false); setPendingPurchase(null); setPendingBundlePurchase(false); }} />}
        {showMenu && <MenuModal isOpen={showMenu} onClose={() => setShowMenu(false)} onActivatePass={unlockAll} onShowLogin={() => setShowLogin(true)} />}
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
              ownedChars={ownedChars}
              onUnlockChar={unlockChar}
              onShowMenu={() => setShowMenu(true)}
              onPlay={() => setCurrentScreen('quest')} 
              onPlayDirect={(questId) => {
                const char = CHARACTERS[selectedChar];
                if (char.isPremium && !ownedChars.includes(char.name)) {
                  // If locked, just play SFX or show message (handled by button later)
                  return;
                }
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
          <BottomNav 
            currentScreen={currentScreen} 
            setCurrentScreen={setCurrentScreen} 
          />
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
    <PayPalScriptProvider options={{
      clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || 'test',
      currency: 'USD',
    }}>
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
    </PayPalScriptProvider>
  );
}
