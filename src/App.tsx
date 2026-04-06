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
import { Screen } from './types';
import { useLanguage } from './contexts/LanguageContext';
import { AudioProvider } from './contexts/AudioContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import { InventoryProvider } from './contexts/InventoryContext';
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
  const [showLogin, setShowLogin] = useState(false);
  const { t } = useLanguage();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[100dvh] bg-gradient-to-br from-[#2e0854] via-[#7e22ce] to-[#d946ef] font-sans text-zinc-900 selection:bg-[#bb152c] selection:text-white overflow-hidden">
      <AnimatePresence>
        {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
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
              character={CHARACTERS[selectedChar]} 
              questId={selectedQuestId}
              onFail={() => setShowFailOffer(true)} 
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
          onClose={() => {
            setShowFailOffer(false);
            setCurrentScreen('lobby');
          }} 
          onRevive={() => {
            setShowFailOffer(false);
            setCurrentScreen('game');
          }}
          onShowLogin={() => setShowLogin(true)}
        />}
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
