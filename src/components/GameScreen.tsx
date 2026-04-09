import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Swords, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { useInventory } from '../contexts/InventoryContext';
import { useItems } from '../hooks/useItems';
import { useAudio } from '../contexts/AudioContext';
import { useAchievements } from '../contexts/AchievementContext';
import { Character } from '../constants/characters';
import { QUESTS } from './QuestScreen';

// ===== BOSS PATTERN SYSTEM =====
type PatternNode = { x: number; y: number }; // Percentage-based (0~1)
type BossPattern = {
  name: string;
  nodes: PatternNode[];  // Checkpoint coordinates (percentage of screen)
  icon: string;          // Emoji/icon for the pattern
  dmgOnSuccess: number;  // Damage dealt to boss on success
};

const BOSS_PATTERNS: BossPattern[] = [
  {
    name: 'LIGHTNING SLASH',
    icon: '⚡',
    nodes: [
      { x: 0.3, y: 0.2 },
      { x: 0.7, y: 0.4 },
      { x: 0.3, y: 0.6 },
      { x: 0.7, y: 0.8 },
    ],
    dmgOnSuccess: 10,
  },
  {
    name: 'CROSS STRIKE',
    icon: '✖',
    nodes: [
      { x: 0.2, y: 0.2 },
      { x: 0.5, y: 0.5 },
      { x: 0.8, y: 0.2 },
      { x: 0.5, y: 0.5 },
      { x: 0.5, y: 0.8 },
    ],
    dmgOnSuccess: 12,
  },
  {
    name: 'V STRIKE',
    icon: '✌',
    nodes: [
      { x: 0.2, y: 0.2 },
      { x: 0.5, y: 0.75 },
      { x: 0.8, y: 0.2 },
    ],
    dmgOnSuccess: 8,
  },
  {
    name: 'RISING DRAGON',
    icon: '🐉',
    nodes: [
      { x: 0.5, y: 0.85 },
      { x: 0.35, y: 0.6 },
      { x: 0.6, y: 0.4 },
      { x: 0.4, y: 0.15 },
    ],
    dmgOnSuccess: 10,
  },
  {
    name: 'DEATH SPIRAL',
    icon: '🌀',
    nodes: [
      { x: 0.5, y: 0.2 },
      { x: 0.75, y: 0.5 },
      { x: 0.5, y: 0.8 },
      { x: 0.25, y: 0.5 },
      { x: 0.5, y: 0.35 },
    ],
    dmgOnSuccess: 15,
  },
  {
    name: 'Z-STRIKE',
    icon: '💨',
    nodes: [
      { x: 0.2, y: 0.2 },
      { x: 0.8, y: 0.2 },
      { x: 0.2, y: 0.8 },
      { x: 0.8, y: 0.8 },
    ],
    dmgOnSuccess: 12,
  },
  {
    name: 'PENTAGRAM',
    icon: '⭐',
    nodes: [
      { x: 0.5, y: 0.15 },
      { x: 0.85, y: 0.85 },
      { x: 0.15, y: 0.4 },
      { x: 0.85, y: 0.4 },
      { x: 0.15, y: 0.85 },
      { x: 0.5, y: 0.15 },
    ],
    dmgOnSuccess: 20,
  },
  {
    name: 'HEXAGON SEAL',
    icon: '💠',
    nodes: [
      { x: 0.5, y: 0.1 },
      { x: 0.85, y: 0.3 },
      { x: 0.85, y: 0.7 },
      { x: 0.5, y: 0.9 },
      { x: 0.15, y: 0.7 },
      { x: 0.15, y: 0.3 },
      { x: 0.5, y: 0.1 },
    ],
    dmgOnSuccess: 22,
  },
  {
    name: 'CROSS EXECUTION',
    icon: '⚔️',
    nodes: [
      { x: 0.15, y: 0.15 },
      { x: 0.85, y: 0.85 },
      { x: 0.15, y: 0.85 },
      { x: 0.85, y: 0.15 },
    ],
    dmgOnSuccess: 16,
  },
  {
    name: 'INFINITY SLASH',
    icon: '♾️',
    nodes: [
      { x: 0.5, y: 0.5 },
      { x: 0.8, y: 0.25 },
      { x: 0.9, y: 0.5 },
      { x: 0.8, y: 0.75 },
      { x: 0.5, y: 0.5 },
      { x: 0.2, y: 0.25 },
      { x: 0.1, y: 0.5 },
      { x: 0.2, y: 0.75 },
      { x: 0.5, y: 0.5 },
    ],
    dmgOnSuccess: 25,
  },
];

const BOSS_PATTERN_NODE_RADIUS = 45; // Pixel radius for hitting a boss checkpoint
const MINION_PATTERN_NODE_RADIUS = 65; // Pixel radius for hitting a minion checkpoint (generous!)

// ===== MINION SIMPLE PATTERNS (relative to enemy center, in pixels) =====
type MinionPattern = {
  name: string;
  icon: string;
  nodes: { dx: number; dy: number }[]; // Offset from enemy center in pixels
};

const MINION_PATTERNS: MinionPattern[] = [
  { name: 'SLASH UP', icon: '↗', nodes: [{ dx: -60, dy: 50 }, { dx: 60, dy: -50 }] },
  { name: 'SLASH DOWN', icon: '↘', nodes: [{ dx: -60, dy: -50 }, { dx: 60, dy: 50 }] },
  { name: 'HORIZONTAL', icon: '→', nodes: [{ dx: -70, dy: 0 }, { dx: 70, dy: 0 }] },
  { name: 'VERTICAL', icon: '↓', nodes: [{ dx: 0, dy: -60 }, { dx: 0, dy: 60 }] },
  { name: 'V STRIKE', icon: '∧', nodes: [{ dx: -60, dy: -40 }, { dx: 0, dy: 50 }, { dx: 60, dy: -40 }] },
  { name: 'REVERSE V', icon: '∨', nodes: [{ dx: -60, dy: 40 }, { dx: 0, dy: -50 }, { dx: 60, dy: 40 }] },
];

const BG_MAP: Record<string, string> = {
  'MASTER': '/assets/background/bg_master.jpeg',
  'JADE': '/assets/background/bg_jade.jpeg',
  'FLAME': '/assets/background/bg-flame.jpeg',
  'ICE': '/assets/background/bg_ice.jpeg',
  'THUNDER': '/assets/background/bg_thunder.jpeg'
};

const ENEMY_IMGS = [
  '/assets/enemies/e_drone.png',
  '/assets/enemies/e_hound.png',
  '/assets/enemies/e_thug.png',
  '/assets/enemies/e_shield.png',
  '/assets/enemies/e_crawler.png'
];

const BOSS_DATA: Record<string, { name: string, img: string }> = {
  shogun: { name: "IRON SHOGUN", img: "/assets/enemies/b_shogun.png" },
  oni: { name: "NEON ONI", img: "/assets/enemies/b_oni.png" },
  dragon: { name: "CYBER DRAGON", img: "/assets/enemies/b_dragon.png" },
  void: { name: "VOID NINJA", img: "/assets/enemies/b_void.png" }
};

const ParticleBurst = ({ x, y, charName }: { x?: number, y?: number, key?: string, charName?: string }) => {
  const particles = Array.from({ length: 32 }); // Increased particles
  const isCentered = x === undefined || y === undefined;
  return (
    <div 
      className={`absolute pointer-events-none z-50 ${isCentered ? 'inset-0 flex items-center justify-center' : ''}`}
      style={!isCentered ? { left: x, top: y } : {}}
    >
      {particles.map((_, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const distance = 200 + Math.random() * 300;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        const size = 8 + Math.random() * 16;
        let colors = ['#bb152c', '#ffe171', '#485f84', '#ffffff', '#10b981'];
        if (charName === 'FLAME') colors = ['#f43f5e', '#fb923c', '#ef4444', '#fde047', '#ffffff'];
        else if (charName === 'ICE') colors = ['#22d3ee', '#38bdf8', '#818cf8', '#ffffff', '#c084fc'];
        else if (charName === 'THUNDER') colors = ['#facc15', '#fef08a', '#fbbf24', '#ffffff'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        return (
          <motion.div
            key={i}
            className="absolute rounded-sm shadow-lg"
            style={{ width: size, height: size, backgroundColor: color }}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
            animate={{ 
              x: tx, 
              y: ty, 
              scale: [0, 2, 0], // More explosive
              opacity: [1, 1, 0], 
              rotate: Math.random() * 1080 - 540 
            }}
            transition={{ duration: 0.4 + Math.random() * 0.3, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
};

const UltimateFlame = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 1, 0] }}
    transition={{ duration: 1 }}
    className="absolute inset-0 z-40 flex items-end justify-center pointer-events-none"
  >
    <div className="absolute inset-0 bg-orange-600/30" />
    {Array.from({ length: 10 }).map((_, i) => (
      <motion.div 
        key={i}
        initial={{ y: 200, opacity: 0, scale: 1 }}
        animate={{ y: -800, opacity: [0, 1, 0], scale: 2 }}
        transition={{ duration: 0.8, delay: i * 0.05, repeat: 0 }}
        className="w-24 h-48 bg-orange-500 blur-3xl rounded-full"
        style={{ left: `${i * 10}%` }}
      />
    ))}
  </motion.div>
);

const UltimateIce = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 z-40 bg-cyan-200/30 backdrop-blur-sm pointer-events-none"
  >
    <div className="absolute inset-0 flex items-center justify-center">
       <motion.div 
         initial={{ scale: 3, opacity: 0, rotate: 0 }}
         animate={{ scale: 0.8, opacity: 0.2, rotate: 180 }}
         className="w-[150%] h-[150%] border-[200px] border-white/20 rounded-full"
       />
    </div>
  </motion.div>
);

const UltimateThunder = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 0, 1, 0] }}
    transition={{ duration: 0.5 }}
    className="absolute inset-0 z-40 bg-white/20 pointer-events-none"
  >
    {Array.from({ length: 5 }).map((_, i) => (
      <motion.div 
        key={i}
        initial={{ x: Math.random() * 100 + '%', scaleX: 0, opacity: 0 }}
        animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 0.2, delay: i * 0.1 }}
        className="absolute top-0 bottom-0 w-2 bg-yellow-300 shadow-[0_0_50px_yellow]"
      />
    ))}
  </motion.div>
);

interface GameScreenProps {
  character: Character;
  questId: string;
  onFail: () => void;
  onSuccess: (score: number) => void;
  reviveTrigger?: number;
}

const GameScreen: React.FC<GameScreenProps> = ({ character, questId, onFail, onSuccess, reviveTrigger = 0 }) => {
  const currentQuest = QUESTS.find(q => q.id === questId) || QUESTS[0];
  const { equippedItem, purchasedItems, itemCounts } = useInventory();
  const items = useItems();
  const activeGear = items.find(i => i.id === equippedItem);
  const gearLevel = equippedItem ? (itemCounts[equippedItem] || 1) : 1;
  const statMultiplier = 1 + (gearLevel - 1) * 0.01;

  const [combo, setCombo] = useState(0);
  const [score, setScore] = useState(0);
  const [isVictory, setIsVictory] = useState(false);
  const [timeScale, setTimeScale] = useState(1);
  const [playerHp, setPlayerHp] = useState(activeGear?.id === 'aegis' ? Math.round(150 * statMultiplier) : 100);
  const [ultimateEnergy, setUltimateEnergy] = useState(0);
  const [activeUltimate, setActiveUltimate] = useState<string | null>(null);
  const [isInvincible, setIsInvincible] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const playerHpRef = useRef(playerHp);

  useEffect(() => {
    playerHpRef.current = playerHp;
  }, [playerHp]);

  // === PREMIUM REVIVE HANDLER ===
  useEffect(() => {
    if (reviveTrigger === 0) return; // skip initial mount
    // HP 복구, 적 제거, 무적 3초
    setPlayerHp(activeGear?.id === 'aegis' ? Math.round(150 * statMultiplier) : 100);
    setEnemies([]);
    setCombo(0);
    setIsInvincible(true);
    setActivePattern(null);
    setPatternProgress(0);
    setPatternResult(null);
    setBossShield(false);
    setHasFailed(false);
    setTimeout(() => setIsInvincible(false), 3000);
  }, [reviveTrigger]);

  const [bursts, setBursts] = useState<{id: number, x?: number, y?: number}[]>([]);
  const [showBossWarning, setShowBossWarning] = useState(false);
  const [slashes, setSlashes] = useState<{id: number, x: number, y: number, length: number, angle: number}[]>([]);
  const [enemies, setEnemies] = useState<{id: number, x: number, y: number, size: number, img: string, isBoss?: boolean, hp?: number, maxHp?: number, lastAttackAt?: number, pattern?: MinionPattern, patternProgress?: number}[]>([]);
  const [totalKills, setTotalKills] = useState(0); // Added for boss spawn triggers
  const [defeatedBosses, setDefeatedBosses] = useState(0);
  const [bgImage, setBgImage] = useState('');
  const [shake, setShake] = useState({ x: 0, y: 0 });
  const [isFever, setIsFever] = useState(false);
  const [pendingCoins, setPendingCoins] = useState(0);

  // === BOSS PATTERN STATE ===
  const [activePattern, setActivePattern] = useState<BossPattern | null>(null);
  const [patternProgress, setPatternProgress] = useState(0); // Index of next node to hit
  const [showPatternIntro, setShowPatternIntro] = useState(false); // "USE PATTERN!" message
  const [patternResult, setPatternResult] = useState<'success' | 'fail' | null>(null);
  const [bossShield, setBossShield] = useState(false); // Visual shield effect on boss
  const [patternTimeLeft, setPatternTimeLeft] = useState(1); // 1 = 100%, 0 = 0%
  const patternTrailRef = useRef<{x: number, y: number}[]>([]); // Track swipe trail for pattern
  
  const isSwipingRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const lastPosRef = useRef({ x: 0, y: 0 });
  const hitEnemiesRef = useRef<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const comboRef = useRef(combo);
  const { coins, addCoins } = useCurrency();
  const { playSfx, playMusic, stopMusic } = useAudio();
  const { t } = useLanguage();
  const { checkAchievements } = useAchievements();

  const comboTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // === PASSIVE SKILL STATE ===
  const [thunderShieldActive, setThunderShieldActive] = useState(character.hasPeriodicShield || false);
  const thunderShieldRef = useRef(character.hasPeriodicShield || false);
  const lastShieldBrokenAt = useRef(Date.now());
  const lastSlashTimeRef = useRef(0);
  
  useEffect(() => {
    thunderShieldRef.current = thunderShieldActive;
  }, [thunderShieldActive]);

  useEffect(() => {
    if (!character.hasPeriodicShield) return;
    const interval = setInterval(() => {
      if (!thunderShieldRef.current && Date.now() - lastShieldBrokenAt.current >= 20000) {
        setThunderShieldActive(true);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [character.hasPeriodicShield]);

  const warningShownForMilestone = useRef(0);

  useEffect(() => {
    // Show boss warning briefly when total kills is close to milestone (multiples of 50)
    const nextMilestone = (defeatedBosses + 1) * 50;
    const isClose = totalKills >= nextMilestone - 10 && totalKills < nextMilestone;
    const noBossActive = !enemies.some(e => e.isBoss);
    
    if (isClose && noBossActive && warningShownForMilestone.current !== nextMilestone) {
      warningShownForMilestone.current = nextMilestone;
      setShowBossWarning(true);
      playSfx('warning');
      
      // Hide after 3 seconds instead of keeping it on screen permanently
      setTimeout(() => {
        setShowBossWarning(false);
      }, 3000);
    }
  }, [totalKills, defeatedBosses, enemies, playSfx]);

  const takeDamage = useCallback((amount: number) => {
    if (isInvincible) return; // 부활 후 무적 상태
    
    // 이지스 장착 시 피해 판정 전에 20% (강화 적용) 삭감
    // Lv.1일 때 0.8, Lv.99일 때 1 - (0.2 * 1.98) = 0.604
    const aegisMultiplier = activeGear?.id === 'aegis' ? Math.max(0.5, 1 - (0.2 * statMultiplier)) : 1;
    const finalAmount = amount * aegisMultiplier;

    if (thunderShieldRef.current) {
      setThunderShieldActive(false);
      lastShieldBrokenAt.current = Date.now();
      playSfx('slash'); 
      setShake({ x: 20, y: 20 });
      setTimeout(() => setShake({ x: 0, y: 0 }), 100);
      return;
    }
    setPlayerHp(h => Math.max(0, h - finalAmount));
    
    // 크로노 수리검 보너스: 피격 시 콤보가 리셋되지 않고 절반(강화 적용)만 차감
    setCombo(prev => activeGear?.id === 'time_shuriken' ? Math.floor(prev * (0.5 * statMultiplier)) : 0);

    playSfx('fail');
  }, [playSfx, isInvincible, activeGear?.id]);

  useEffect(() => {
    playMusic('game', questId);
    return () => stopMusic();
  }, [playMusic, stopMusic, questId]);

  useEffect(() => {
    comboRef.current = combo;
    
    // Fever Trigger
    if (combo >= 20) {
      if (!isFever) {
        setIsFever(true);
        playSfx('powerup');
      }
    } else if (combo === 0) {
      setIsFever(false);
    }

    if (combo > 0) {
      checkAchievements({ maxCombo: combo, coins, itemCount: purchasedItems.length });
    }
  }, [combo, isFever, playSfx, checkAchievements, coins, purchasedItems.length]);

  useEffect(() => {
    if (playerHp <= 0 && !isInvincible && !hasFailed) {
      setHasFailed(true);
      playSfx('fail');
      onFail();
    }
  }, [playerHp, onFail, playSfx, isInvincible, hasFailed]);

  // Flush pending coins outside of render callback
  useEffect(() => {
    if (pendingCoins > 0) {
      addCoins(pendingCoins);
      setPendingCoins(0);
    }
  }, [pendingCoins, addCoins]);

  useEffect(() => {
    // Stage-specific background
    const bg = BG_MAP[currentQuest.bgKey] || currentQuest.thumbnail;
    setBgImage(bg);
  }, [currentQuest]);

  // Enemy Asset Constants
  const MINION_ASSETS = [
    '/assets/enemies/e_crawler.png',
    '/assets/enemies/e_drone.png',
    '/assets/enemies/e_hound.png',
    '/assets/enemies/e_shield.png',
    '/assets/enemies/e_thug.png'
  ];

  const BOSS_ASSETS = [
    '/assets/enemies/b_dragon.png',
    '/assets/enemies/b_oni.png',
    '/assets/enemies/b_shogun.png',
    '/assets/enemies/b_void.png'
  ];

  // Integrated Movement & Spawning Engine
  useEffect(() => {
    let spawnTimer: ReturnType<typeof setTimeout>;
    let moveInterval: ReturnType<typeof setInterval>;

    const spawnEnemy = () => {
      if (playerHpRef.current > 0) {
        setEnemies(prev => {
          const hasBoss = prev.some(e => e.isBoss);
          const nextMilestone = (defeatedBosses + 1) * 50;
          const isBossDue = totalKills >= nextMilestone && !hasBoss;
          
          if (isBossDue) {
            const bossImg = BOSS_DATA[currentQuest.bossId]?.img || BOSS_ASSETS[0];
            // Activate pattern system for boss fight
            const randomPattern = BOSS_PATTERNS[Math.floor(Math.random() * BOSS_PATTERNS.length)];
            setActivePattern(randomPattern);
            setPatternProgress(0);
            setPatternResult(null);
            setBossShield(true);
            patternTrailRef.current = [];
            // Show "USE PATTERN!" intro
            setShowPatternIntro(true);
            setTimeout(() => setShowPatternIntro(false), 2500);
            return [{
              id: Date.now(),
              x: (containerRef.current?.clientWidth || 800) / 2,
              y: (containerRef.current?.clientHeight || 600) / 2,
              size: 350,
              img: bossImg,
              isBoss: true,
              hp: 150 + (defeatedBosses * 50) + (currentQuest.level * 100), // Harder based on quest
              maxHp: 150 + (defeatedBosses * 50) + (currentQuest.level * 100),
              createdAt: Date.now(),
              vx: 2,
              vy: 2,
              phase: 0
            }];
          }

          if (hasBoss) return prev;
          // === ONE AT A TIME: only spawn if no minions on field (fever: up to 3) ===
          const minionCount = prev.filter(e => !e.isBoss).length;
          const maxMinions = isFever ? 3 : 1;
          if (minionCount >= maxMinions) return prev;

          const w = containerRef.current?.clientWidth || window.innerWidth;
          const h = containerRef.current?.clientHeight || window.innerHeight;
          const randomMinion = MINION_ASSETS[Math.floor(Math.random() * MINION_ASSETS.length)];

          const randomPattern = MINION_PATTERNS[Math.floor(Math.random() * MINION_PATTERNS.length)];
          return [...prev, {
            id: Date.now() + Math.random(),
            x: w * 0.1 + Math.random() * (w * 0.8),
            y: h * 0.15 + Math.random() * (h * 0.6),
            size: isFever ? 140 : 120,
            img: randomMinion,
            createdAt: Date.now(),
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            pattern: randomPattern,
            patternProgress: 0
          }];
        });
      }

      // Quick re-check: loop continues even if dead so revive works
      const nextRate = (isFever ? 400 : 600) / timeScale;
      spawnTimer = setTimeout(spawnEnemy, nextRate);
    };

    // Movement Loop (60fps approximately)
    moveInterval = setInterval(() => {
        setEnemies(prev => prev.map(e => {
            const w = containerRef.current?.clientWidth || 800;
            const h = containerRef.current?.clientHeight || 600;
            
            if (e.isBoss) {
                // Boss follows a complex sin/cos path
                // Using a ref for accumulated time to allow timeScale to affect it
                if (!e.localTime) e.localTime = Date.now() / 1000;
                e.localTime += (16 / 1000) * timeScale;
                const time = e.localTime;
                return {
                    ...e,
                    x: (w / 2) + Math.cos(time * 1.2) * (w * 0.3),
                    y: (h / 2) + Math.sin(time * 0.8) * (h * 0.2),
                };
            } else {
                // Minions drift and bounce
                let slow = (character.slowEnemiesFactor || 1) * timeScale;
                let nx = e.x + (e.vx || 0) * slow;
                let ny = e.y + (e.vy || 0) * slow;
                let nvx = e.vx || 0;
                let nvy = e.vy || 0;

                if (nx < 50 || nx > w - 50) nvx *= -1;
                if (ny < 50 || ny > h - 50) nvy *= -1;

                return { ...e, x: nx, y: ny, vx: nvx, vy: nvy };
            }
        }));
    }, 16);

    spawnTimer = setTimeout(spawnEnemy, 1000);
    return () => {
        clearTimeout(spawnTimer);
        clearInterval(moveInterval);
    };
  }, [totalKills, isFever, character, defeatedBosses, playSfx]);

  // Damage & Cleanup Tick
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerHpRef.current <= 0) return;
      const now = Date.now();
      const level = Math.min(5, Math.floor(totalKills / 10) + 1);
      const lifetime = Math.max(1500, 4000 - (level * 400));

      setEnemies(prev => {
        let dmg = 0;
        const filtered = prev.filter(e => {
          if (e.isBoss) return true; // Bosses don't time out
          const alive = now - (e as any).createdAt < lifetime;
          if (!alive) dmg += 10;
          return alive;
        });
        
        if (dmg > 0) {
          takeDamage(dmg);
        }
        return filtered;
      });
    }, 500);
    return () => clearInterval(interval);
  }, [totalKills, takeDamage]);

  // Boss Pattern Time Limit
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (activePattern && !showPatternIntro && patternResult === null) {
      setPatternTimeLeft(1); // reset to 100%
      const PATTERN_TIME_MS = 4000; // 4 seconds to complete
      const tickRate = 50;
      const amountPerTick = tickRate / PATTERN_TIME_MS;
      
      timer = setInterval(() => {
        setPatternTimeLeft(prev => {
          if (prev <= amountPerTick) {
            clearInterval(timer);
            // TIME OUT -> FAIL
            setPatternResult('fail');
            takeDamage(20);
            setShake({ x: 30, y: 30 });
            setTimeout(() => setShake({ x: 0, y: 0 }), 200);
            
            setTimeout(() => {
              setPatternResult(null);
              setPatternProgress(0);
              patternTrailRef.current = [];
              const nextPattern = BOSS_PATTERNS[Math.floor(Math.random() * BOSS_PATTERNS.length)];
              setActivePattern(nextPattern);
              setShowPatternIntro(true);
              setTimeout(() => setShowPatternIntro(false), 1500);
            }, 1000);
            return 0;
          }
          return prev - amountPerTick;
        });
      }, tickRate);
    }
    return () => clearInterval(timer);
  }, [activePattern, showPatternIntro, patternResult, takeDamage]);

  const lastWarningMilestoneRef = useRef(-1);

  // Boss Warning Trigger
  useEffect(() => {
    // Immediate dismissal if boss is already on field
    if (enemies.some(e => e.isBoss)) {
      setShowBossWarning(false);
      return;
    }

    const milestone = (defeatedBosses + 1) * 50;
    const killsToBoss = milestone - totalKills;
    
    if (killsToBoss <= 10 && killsToBoss > 0 && lastWarningMilestoneRef.current !== milestone) {
      lastWarningMilestoneRef.current = milestone;
      setShowBossWarning(true);
      playSfx('warning');
      
      const timer = setTimeout(() => {
        setShowBossWarning(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [totalKills, playSfx, enemies]);

  const handleAction = (isBoss?: boolean) => {
    setCombo(prev => {
      const next = prev + 1;
      setScore(s => s + (10 * next));
      return next;
    });
    if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);
    const timeout = (character.comboGracePeriod || 1500) * (activeGear?.id === 'time_shuriken' ? statMultiplier : 1);
    comboTimeoutRef.current = setTimeout(() => setCombo(0), timeout);
  };

  const getDistToSegment = (px: number, py: number, x1: number, y1: number, x2: number, y2: number) => {
    const l2 = (x2 - x1) ** 2 + (y2 - y1) ** 2;
    if (l2 === 0) return Math.sqrt((px - x1) ** 2 + (py - y1) ** 2);
    let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
    t = Math.max(0, Math.min(1, t));
    return Math.sqrt((px - (x1 + t * (x2 - x1))) ** 2 + (py - (y1 + t * (y2 - y1))) ** 2);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isSwipingRef.current = true;
    const pos = { x: e.clientX, y: e.clientY };
    startPosRef.current = pos;
    lastPosRef.current = pos;
    hitEnemiesRef.current.clear();
    
    // No sound on initial click per user request "only on hit"
    lastSlashTimeRef.current = Date.now();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isSwipingRef.current) return;
    
    const currentX = e.clientX;
    const currentY = e.clientY;
    const lastX = lastPosRef.current.x;
    const lastY = lastPosRef.current.y;

    const dx = currentX - lastX;
    const dy = currentY - lastY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Only process if moved enough to define a segment or after small threshold
    if (dist > 2) {
      const angle = Math.atan2(currentY - lastY, currentX - lastX) * 180 / Math.PI;
      
      const triggerSlashEffect = () => {
        const newSlash = { id: Date.now() + Math.random(), x: lastX, y: lastY, length: dist, angle };
        setSlashes(prev => [...prev.slice(-10), newSlash]); // Limit concurrent slashes for performance
        setTimeout(() => setSlashes(prev => prev.filter(s => s.id !== newSlash.id)), 200);
      };

      let hitAny = false;
      const now = Date.now();
      
      // Separate hit detection to avoid double counting in React StrictMode
      const hitList: string[] = [];
      const bossHits: { id: number, newHp: number }[] = [];
      let coinsEarned = 0;
      let localKills = 0;

      // === BOSS PATTERN CHECKPOINT DETECTION ===
      const hasBossOnField = enemies.some(e => e.isBoss);
      if (hasBossOnField && activePattern) {
        // Track trail for pattern matching
        patternTrailRef.current.push({ x: currentX, y: currentY });
        
        const w = containerRef.current?.clientWidth || window.innerWidth;
        const h = containerRef.current?.clientHeight || window.innerHeight;
        const nextNode = activePattern.nodes[patternProgress];
        
        if (nextNode) {
          const nodeScreenX = nextNode.x * w;
          const nodeScreenY = nextNode.y * h;
          const distToNode = Math.sqrt(
            (currentX - nodeScreenX) ** 2 + (currentY - nodeScreenY) ** 2
          );
          
          if (distToNode < BOSS_PATTERN_NODE_RADIUS) {
            // Hit the checkpoint!
            const nextProgress = patternProgress + 1;
            setPatternProgress(nextProgress);
            
            // Add burst at checkpoint
            const bId = Date.now() + Math.random();
            setBursts(b => [...b, { id: bId, x: nodeScreenX, y: nodeScreenY }]);
            setTimeout(() => setBursts(b => b.filter(i => i.id !== bId)), 600);
            
            // Check if pattern is complete
            if (nextProgress >= activePattern.nodes.length) {
              // === PATTERN SUCCESS! ===
              setPatternResult('success');
              setBossShield(false);
              setShake({ x: 40, y: 40 });
              setTimeout(() => setShake({ x: 0, y: 0 }), 300);

              // 💥 Finisher Multi-Slash Effect! 💥
              let slashCount = 0;
              const maxSlashes = 6;
              const slashInterval = setInterval(() => {
                if (slashCount >= maxSlashes) {
                  clearInterval(slashInterval);
                  playSfx('powerup'); // Final massive sound
                  return;
                }
                playSfx('slash');
                
                // Find boss position or default to center
                const bossNode = enemies.find(e => e.isBoss);
                const bx = bossNode ? bossNode.x : w / 2;
                const by = bossNode ? bossNode.y : h / 2;
                
                const angle = Math.random() * 360;
                const newSlash = { 
                  id: Date.now() + Math.random(), 
                  x: bx + (Math.random() - 0.5) * 150, 
                  y: by + (Math.random() - 0.5) * 150, 
                  length: 400 + Math.random() * 300, 
                  angle 
                };
                
                setSlashes(prev => [...prev.slice(-10), newSlash]);
                setTimeout(() => setSlashes(prev => prev.filter(s => s.id !== newSlash.id)), 200);
                
                slashCount++;
              }, 60);
              
              // Deal massive damage to boss
              const dmgMultiplier = activeGear?.id === 'dragon_slayer' ? 1.5 * statMultiplier : 1;
              const dmg = activePattern.dmgOnSuccess * dmgMultiplier;
              setEnemies(prev => {
                const remaining: any[] = [];
                for (const e of prev) {
                  if (e.isBoss) {
                    if (e.hp && e.hp > dmg) {
                      remaining.push({ ...e, hp: e.hp - dmg });
                    } else {
                      // Boss killed!
                      setDefeatedBosses(d => d + 1);
                      
                      const baseBossCoins = 200 + defeatedBosses * 100;
                      let bossMultiplier = character.coinMultiplier || 1;
                      if (activeGear?.id === 'dragon_slayer') bossMultiplier *= 1.5;
                      if (activeGear?.id === 'golden_jitte') bossMultiplier *= 2.0;

                      addCoins(Math.ceil(baseBossCoins * bossMultiplier));
                      
                      const ultEnergyMultiplier = activeGear?.id === 'time_shuriken' ? 1.5 * statMultiplier : 1;
                      const ultEnergyB = 20 * ultEnergyMultiplier;
                      setUltimateEnergy(u => Math.min(100, u + ultEnergyB));
                      const killBId = Date.now() + Math.random();
                      setBursts(b => [...b, { id: killBId, x: e.x, y: e.y }]);
                      setTimeout(() => setBursts(b => b.filter(i => i.id !== killBId)), 1000);
                      
                      // 🎉 Victory Sequence Start 🎉
                      setIsVictory(true);
                      setTimeScale(0.2); // Slow mo
                      setTimeout(() => {
                        onSuccess(score);
                      }, 3000);
                    }
                  } else {
                    remaining.push(e);
                  }
                }
                return remaining;
              });
              
              handleAction(true);
              
              // Generate next pattern after delay
              setTimeout(() => {
                setPatternResult(null);
                // If boss is still alive, give next pattern
                setEnemies(prev => {
                  if (prev.some(e => e.isBoss)) {
                    const nextPattern = BOSS_PATTERNS[Math.floor(Math.random() * BOSS_PATTERNS.length)];
                    setActivePattern(nextPattern);
                    setPatternProgress(0);
                    setBossShield(true);
                    patternTrailRef.current = [];
                    setShowPatternIntro(true);
                    setTimeout(() => setShowPatternIntro(false), 1500);
                  } else {
                    setActivePattern(null);
                    setBossShield(false);
                  }
                  return prev;
                });
              }, 1200);
            }
          }
        }
        
        lastPosRef.current = { x: currentX, y: currentY };
        return; // Skip normal enemy hit detection during boss fight
      }

      // === NORMAL ENEMY PATTERN HIT DETECTION ===
      let anyMinionPatternHit = false;
      setEnemies(prev => {
        let changed = false;
        const updated = prev.map(enemy => {
          if (enemy.isBoss || !enemy.pattern) return enemy;
          const progress = enemy.patternProgress || 0;
          const nextNode = enemy.pattern.nodes[progress];
          if (!nextNode) return enemy;

          // Calculate absolute position of the pattern node
          const nodeAbsX = enemy.x + nextNode.dx;
          const nodeAbsY = enemy.y + nextNode.dy;
          const distToNode = Math.sqrt(
            (currentX - nodeAbsX) ** 2 + (currentY - nodeAbsY) ** 2
          );

          if (distToNode < MINION_PATTERN_NODE_RADIUS) {
            changed = true;
            anyMinionPatternHit = true;
            triggerSlashEffect();
            const nextProgress = progress + 1;
            
            // Burst at checkpoint
            const bId = Date.now() + Math.random();
            setBursts(b => [...b, { id: bId, x: nodeAbsX, y: nodeAbsY }]);
            setTimeout(() => setBursts(b => b.filter(i => i.id !== bId)), 400);
            playSfx('slash');

            // Check if pattern is complete => KILL
            if (nextProgress >= enemy.pattern.nodes.length) {
              // Mark for removal
              hitEnemiesRef.current.add(enemy.id);
              const killBId = Date.now() + Math.random();
              setBursts(b => [...b, { id: killBId, x: enemy.x, y: enemy.y }]);
              setTimeout(() => setBursts(b => b.filter(i => i.id !== killBId)), 800);
              return { ...enemy, patternProgress: nextProgress };
            }
            return { ...enemy, patternProgress: nextProgress };
          }
          return enemy;
        });
        if (!changed) return prev;
        
        // Remove completed enemies & count kills
        const remaining: typeof prev = [];
        let kills = 0;
        let earned = 0;
        for (const e of updated) {
          if (!e.isBoss && e.pattern && (e.patternProgress || 0) >= e.pattern.nodes.length) {
            kills++;
            earned += (character.price > 0 ? 10 : 5);
          } else {
            remaining.push(e);
          }
        }
        if (kills > 0) {
          setTotalKills(prev => prev + kills);
          
          let minionMultiplier = character.coinMultiplier || 1;
          if (activeGear?.id === 'dragon_slayer') minionMultiplier *= 1.5;
          if (activeGear?.id === 'golden_jitte') minionMultiplier *= 2.0;

          const totalCoins = Math.ceil(earned * minionMultiplier);
          setPendingCoins(prev => prev + totalCoins);
          
          const ultEnergyMinionMultiplier = activeGear?.id === 'time_shuriken' ? 1.5 * statMultiplier : 1;
          const ultEnergyM = (2 * kills) * ultEnergyMinionMultiplier;
          setUltimateEnergy(prev => Math.min(100, prev + ultEnergyM));
          handleAction();
          setShake({ x: (Math.random() - 0.5) * 15, y: (Math.random() - 0.5) * 15 });
          setTimeout(() => setShake({ x: 0, y: 0 }), 50);
        }
        return remaining;
      });

      // Removed air-slash sound block per user request "only on hit"
      
      lastPosRef.current = { x: currentX, y: currentY };
    }
  };

  const handlePointerUp = () => {
    // === BOSS PATTERN FAILURE CHECK ===
    const hasBossOnField = enemies.some(e => e.isBoss);
    if (hasBossOnField && activePattern && patternProgress > 0 && patternProgress < activePattern.nodes.length) {
      // Player started pattern but didn't finish - COUNTER ATTACK!
      setPatternResult('fail');
      takeDamage(15);
      setShake({ x: 30, y: 30 });
      setTimeout(() => setShake({ x: 0, y: 0 }), 200);
      
      // Reset pattern after failure
      setTimeout(() => {
        setPatternResult(null);
        setPatternProgress(0);
        patternTrailRef.current = [];
        // Give a new pattern
        const nextPattern = BOSS_PATTERNS[Math.floor(Math.random() * BOSS_PATTERNS.length)];
        setActivePattern(nextPattern);
        setShowPatternIntro(true);
        setTimeout(() => setShowPatternIntro(false), 1500);
      }, 1000);
    }

    // === MINION PATTERN RESET on pointer up (no penalty, just reset progress) ===
    if (!hasBossOnField) {
      setEnemies(prev => prev.map(e => {
        if (!e.isBoss && e.pattern && (e.patternProgress || 0) > 0 && (e.patternProgress || 0) < e.pattern.nodes.length) {
          return { ...e, patternProgress: 0 };
        }
        return e;
      }));
    }
    
    isSwipingRef.current = false;
    hitEnemiesRef.current.clear();
    patternTrailRef.current = [];
  };

  const triggerUltimate = () => {
    if (ultimateEnergy < 100 || character.ultimateType === 'none') return;
    
    setUltimateEnergy(0);
    setActiveUltimate(character.ultimateType);
    playSfx('powerup');
    setShake({ x: 30, y: 30 });
    setTimeout(() => setShake({ x: 0, y: 0 }), 200);

    // Damage all enemies
    setEnemies(prev => {
      let coinsEarned = 0;
      const remaining = [];
      for (const enemy of prev) {
        setBursts(b => [...b, { id: Date.now() + Math.random(), x: enemy.x, y: enemy.y }]);
        if (enemy.isBoss) {
          if (enemy.hp && enemy.hp > 10) {
            remaining.push({ ...enemy, hp: enemy.hp - 10 });
          } else {
            coinsEarned += 200;
          }
        } else {
          coinsEarned += (character.price > 0 ? 20 : 10);
        }
      }
      addCoins(coinsEarned);
      return remaining;
    });

    setTimeout(() => setActiveUltimate(null), 1000);
  };

  const tier = combo >= 50 ? 'godlike' : combo >= 20 ? 'insane' : combo >= 10 ? 'high' : combo >= 5 ? 'medium' : 'low';

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[100dvh] bg-cover bg-center overflow-hidden cursor-crosshair select-none touch-none"
      style={{ backgroundImage: `url(${bgImage})` }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Background Overlay for Fever */}
      <div className={`absolute inset-0 transition-colors duration-300 pointer-events-none z-10 ${isFever ? 'bg-red-600/30' : 'bg-transparent'}`} />
      
      {/* Shaking Container */}
      <motion.div 
        className="absolute inset-0"
        animate={{ 
          x: shake.x, 
          y: shake.y,
          filter: isVictory 
            ? "sepia(1) contrast(1.2) grayscale(0.2)" 
            : isFever 
              ? "contrast(1.2) rotate(1deg)" 
              : "none",
        }}
        transition={{ 
          type: "spring", 
          stiffness: 1000, 
          damping: 10,
          filter: { duration: 1 } 
        }}
      >
        <AnimatePresence>
          {isFever && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="absolute inset-0 bg-red-600/20 pointer-events-none z-10"
            />
          )}
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] pointer-events-none" />

        {/* Boss Warning Overlay - Minimalist for Visibility */}
        <AnimatePresence>
          {showBossWarning && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[60] pointer-events-none flex flex-col items-center justify-center overflow-hidden"
            >
              {/* Pulsing Vignette Border - More subtle */}
              <motion.div
                animate={{ 
                  boxShadow: [
                    "inset 0 0 40px rgba(220, 38, 38, 0.2)",
                    "inset 0 0 80px rgba(220, 38, 38, 0.4)",
                    "inset 0 0 40px rgba(220, 38, 38, 0.2)"
                  ]
                }}
                transition={{ duration: 0.3, repeat: Infinity }}
                className="absolute inset-0 w-full h-full"
              />
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 12 }}
                className="relative z-10"
              >
                <motion.div
                  animate={{ x: [-2, 2, -2] }}
                  transition={{ duration: 0.05, repeat: Infinity }}
                  className="px-10 py-2 bg-black/40 backdrop-blur-sm text-red-500 font-black text-5xl skew-x-[-15deg] border-y-4 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                >
                  <span className="animate-pulse">BOSS APPROACHING</span>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ultimate Effect Overlay */}
        <AnimatePresence>
          {activeUltimate === 'flame' && <UltimateFlame />}
          {activeUltimate === 'ice' && <UltimateIce />}
          {activeUltimate === 'thunder' && <UltimateThunder />}
        </AnimatePresence>

        {bursts.map(b => <ParticleBurst key={`${b.id}`} x={b.x} y={b.y} charName={character.name} />)}

        <AnimatePresence>
          {enemies.map(enemy => (
            <motion.div
              key={enemy.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="absolute flex items-center justify-center z-30"
              style={{ 
                left: enemy.x, 
                top: enemy.y, 
                width: enemy.size, 
                height: enemy.size, 
                marginLeft: -enemy.size/2, 
                marginTop: -enemy.size/2 
              }}
            >
              {/* Enemy Body with Minimal Feedback */}
              <div className={`relative w-full h-full flex items-center justify-center transition-all duration-75 ${hitEnemiesRef.current.has(enemy.id) ? 'scale-125' : ''}`}>
                {/* Glow for Bosses */}
                {enemy.isBoss && (
                  <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full" />
                )}
                
                <img 
                  src={enemy.img} 
                  className={`w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(0,0,0,0.5)] ${hitEnemiesRef.current.has(enemy.id) ? 'sepia(1) saturate(5) hue-rotate(-50deg) brightness(1.2)' : ''}`} 
                  alt="Enemy Unit" 
                />

                {enemy.isBoss && (
                  <div className="absolute -bottom-6 w-full flex flex-col items-center">
                    <div className="bg-purple-600/90 px-3 py-0.5 rounded-sm text-white font-black text-[10px] tracking-widest uppercase mb-1">
                      {bossShield ? '🛡️ SHIELDED' : 'BOSS'}
                    </div>
                    <div className="w-4/5 h-1.5 bg-gray-900/50 rounded-full border border-white/20 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-500 to-purple-600 transition-all duration-300" 
                        style={{ width: `${(enemy.hp! / enemy.maxHp!) * 100}%` }} 
                      />
                    </div>
                  </div>
                )}
                {/* Boss Shield Visual */}
                {enemy.isBoss && bossShield && (
                  <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-[-20px] border-4 border-cyan-400/60 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.4),inset_0_0_30px_rgba(34,211,238,0.2)]"
                  />
                )}
              </div>

              {/* === MINION PATTERN GUIDE === */}
              {!enemy.isBoss && enemy.pattern && (
                <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" style={{ left: 0, top: 0 }}>
                  {/* Connection lines between pattern nodes */}
                  {enemy.pattern.nodes.map((node, i) => {
                    if (i === 0) return null;
                    const prev = enemy.pattern!.nodes[i - 1];
                    const progress = enemy.patternProgress || 0;
                    const isCompleted = i <= progress;
                    return (
                      <line
                        key={`mline-${enemy.id}-${i}`}
                        x1={enemy.size / 2 + prev.dx}
                        y1={enemy.size / 2 + prev.dy}
                        x2={enemy.size / 2 + node.dx}
                        y2={enemy.size / 2 + node.dy}
                        stroke={isCompleted ? '#34d399' : 'rgba(255,255,255,0.35)'}
                        strokeWidth={isCompleted ? '3' : '2'}
                        strokeDasharray={isCompleted ? 'none' : '6 4'}
                        className={isCompleted ? 'drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]' : ''}
                      />
                    );
                  })}
                  {/* Checkpoint nodes */}
                  {enemy.pattern.nodes.map((node, i) => {
                    const progress = enemy.patternProgress || 0;
                    const isCompleted = i < progress;
                    const isNext = i === progress;
                    return (
                      <g key={`mnode-${enemy.id}-${i}`}>
                        {isNext && (
                          <circle
                            cx={enemy.size / 2 + node.dx}
                            cy={enemy.size / 2 + node.dy}
                            r="22"
                            fill="none"
                            stroke="rgba(52,211,153,0.5)"
                            strokeWidth="2"
                            className="animate-ping"
                          />
                        )}
                        <circle
                          cx={enemy.size / 2 + node.dx}
                          cy={enemy.size / 2 + node.dy}
                          r={isNext ? '12' : '8'}
                          fill={isCompleted ? '#34d399' : isNext ? 'rgba(52,211,153,0.7)' : 'rgba(255,255,255,0.2)'}
                          stroke={isCompleted ? '#34d399' : isNext ? '#34d399' : 'rgba(255,255,255,0.4)'}
                          strokeWidth="2"
                          className={isCompleted ? 'drop-shadow-[0_0_8px_rgba(52,211,153,1)]' : ''}
                        />
                        <text
                          x={enemy.size / 2 + node.dx}
                          y={enemy.size / 2 + node.dy}
                          dy="4"
                          textAnchor="middle"
                          fill={isCompleted ? '#000' : '#fff'}
                          fontSize="10"
                          fontWeight="900"
                        >
                          {i + 1}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {slashes.map(s => {
          const glowColor = character.name === 'FLAME' ? 'rgba(239, 68, 68, 0.8)' : character.name === 'ICE' ? 'rgba(34, 211, 238, 0.8)' : character.name === 'THUNDER' ? 'rgba(250, 204, 21, 0.8)' : 'rgba(255, 255, 255, 0.8)';
          return (
          <motion.div
            key={s.id}
            className="absolute h-1.5 bg-white z-50 rounded-full mix-blend-screen"
            style={{ left: s.x, top: s.y, width: s.length, transformOrigin: 'left center', rotate: s.angle, boxShadow: `0 0 20px ${glowColor}, 0 0 10px ${glowColor}` }}
            initial={{ opacity: 1, scaleY: 2 }}
            animate={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.2 }}
          />
        )})}

        {/* Top HUD - Compact & Transparent */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-40 pointer-events-none">
          <div className="flex gap-4">
            {!activePattern && (
              <div className="bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                <p className="text-[8px] font-bold text-white/50 uppercase tracking-widest">{t.game.score}</p>
                <p className="text-xl font-black text-white">{totalKills}</p>
              </div>
            )}
          </div>
          
          <div className="bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10 w-52">
            <div className="flex justify-between mb-1 text-[8px] font-bold text-white/50 uppercase">
              <span>{isInvincible ? '✨ INVINCIBLE' : thunderShieldActive ? '🛡️ STATIC WARD' : 'HEALTH'}</span>
              <span className={playerHp < 30 && !thunderShieldActive ? 'text-red-400 animate-pulse' : isInvincible ? 'text-amber-300 animate-pulse' : 'text-emerald-400'}>{playerHp}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/5 relative">
              <motion.div className={`h-full ${isInvincible ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)]' : playerHp < 30 && !thunderShieldActive ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'}`} animate={{ width: `${playerHp}%` }} />
              {thunderShieldActive && (
                <div className="absolute inset-0 bg-yellow-400/80 shadow-[0_0_15px_yellow] transition-opacity animate-pulse mix-blend-screen" />
              )}
              {isInvincible && (
                <motion.div 
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="absolute inset-0 bg-amber-300/60 shadow-[0_0_20px_rgba(251,191,36,0.5)] mix-blend-screen" 
                />
              )}
            </div>
          </div>
        </div>

        {/* Bottom HUD - Ultimate Button (Premium characters only) */}
        {character.ultimateType !== 'none' && (
          <div className="absolute bottom-24 right-8 z-[60]">
             <button 
               onClick={(e) => {
                 e.stopPropagation();
                 triggerUltimate();
               }}
               disabled={ultimateEnergy < 100}
               className={`w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-white shadow-2xl flex flex-col items-center justify-center transition-all transform active:scale-95 ${
                 ultimateEnergy >= 100
                 ? 'bg-gradient-to-tr from-yellow-400 via-orange-500 to-red-600 animate-pulse scale-110'
                 : 'bg-zinc-800/80 grayscale cursor-not-allowed'
               }`}
             >
                <div className="absolute inset-0 rounded-full overflow-hidden opacity-20">
                   <motion.div 
                     className="absolute bottom-0 w-full bg-white" 
                     initial={{ height: '0%' }}
                     animate={{ height: `${ultimateEnergy}%` }}
                   />
                </div>
                <Sparkles className={`w-8 h-8 md:w-12 md:h-12 ${ultimateEnergy >= 100 ? 'text-white' : 'text-zinc-500'}`} />
                <span className="text-[8px] md:text-[10px] font-black text-white mt-1 uppercase italic tracking-tighter">
                  {t.game.ultimate}
                </span>
             </button>
          </div>
        )}

        {/* Combo & Progress Top Display - Moved from Center for Visibility */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 pointer-events-none z-50 flex flex-col items-center">
          {/* Kills Until Boss Indicator - Only show when 10 or fewer remain */}
          {!enemies.some(e => e.isBoss) && !showBossWarning && ((defeatedBosses + 1) * 50 - totalKills) <= 10 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-2 bg-red-600/20 backdrop-blur-sm px-4 py-1 rounded-full border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
            >
              <p className="text-[10px] font-black text-red-500 tracking-[0.2em] uppercase whitespace-nowrap animate-pulse">
                {t.game.killsUntilBoss.replace('{val}', ((defeatedBosses + 1) * 50 - totalKills).toString())}
              </p>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {!activePattern && combo > 0 && (
              <motion.div
                key={combo}
                initial={{ scale: 0.5, opacity: 0, y: -20 }}
                animate={{ scale: isFever ? [1, 1.2, 1] : 1, opacity: 1, y: 0 }}
                exit={{ scale: 1.5, opacity: 0 }}
                className="flex flex-col items-center"
              >
                <div className="relative">
                  <h2 className={`font-black italic text-5xl md:text-6xl tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] ${isFever ? 'text-yellow-400' : 'text-white'}`}>
                    {combo}
                  </h2>
                </div>
                <p className={`font-black italic text-sm md:text-base uppercase tracking-[0.3em] -mt-2 drop-shadow-md ${isFever ? 'text-yellow-300 animate-pulse' : 'text-red-500'}`}>
                  {isFever ? t.game.fever : t.game.combo}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ===== BOSS PATTERN OVERLAY ===== */}
        {activePattern && enemies.some(e => e.isBoss) && (
          <div className="absolute inset-0 z-[55] pointer-events-none">
            {/* Pattern Guide Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full">
              {/* Connection lines between nodes */}
              {activePattern.nodes.map((node, i) => {
                if (i === 0) return null;
                const prev = activePattern.nodes[i - 1];
                const isCompleted = i <= patternProgress;
                return (
                  <line
                    key={`line-${i}`}
                    x1={`${prev.x * 100}%`}
                    y1={`${prev.y * 100}%`}
                    x2={`${node.x * 100}%`}
                    y2={`${node.y * 100}%`}
                    stroke={isCompleted ? '#22d3ee' : 'rgba(255,255,255,0.25)'}
                    strokeWidth={isCompleted ? '4' : '2'}
                    strokeDasharray={isCompleted ? 'none' : '12 6'}
                    className={isCompleted ? 'drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : ''}
                  />
                );
              })}
              {/* Checkpoint Nodes */}
              {activePattern.nodes.map((node, i) => {
                const isCompleted = i < patternProgress;
                const isNext = i === patternProgress;
                return (
                  <g key={`node-${i}`}>
                    {/* Outer glow for next target */}
                    {isNext && (
                      <circle
                        cx={`${node.x * 100}%`}
                        cy={`${node.y * 100}%`}
                        r="35"
                        fill="none"
                        stroke="rgba(34,211,238,0.4)"
                        strokeWidth="3"
                        className="animate-ping"
                      />
                    )}
                    <circle
                      cx={`${node.x * 100}%`}
                      cy={`${node.y * 100}%`}
                      r={isNext ? '20' : '14'}
                      fill={isCompleted ? '#22d3ee' : isNext ? 'rgba(34,211,238,0.6)' : 'rgba(255,255,255,0.15)'}
                      stroke={isCompleted ? '#22d3ee' : isNext ? '#22d3ee' : 'rgba(255,255,255,0.3)'}
                      strokeWidth="2"
                      className={isCompleted ? 'drop-shadow-[0_0_10px_rgba(34,211,238,1)]' : ''}
                    />
                    {/* Node number */}
                    <text
                      x={`${node.x * 100}%`}
                      y={`${node.y * 100}%`}
                      dy="5"
                      textAnchor="middle"
                      fill={isCompleted ? '#000' : '#fff'}
                      fontSize="14"
                      fontWeight="900"
                    >
                      {i + 1}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Pattern Name & Progress (Guide at bottom) */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full px-4">
              <div className="flex flex-col items-center justify-center">
                <p className="text-cyan-300 font-bold text-sm tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] opacity-90 uppercase">
                  {activePattern.icon} {t.game.targetSkill}: {t.game.patterns[activePattern.name as keyof typeof t.game.patterns] || activePattern.name}
                </p>
                <div className="flex gap-1.5 justify-center mt-2">
                  {activePattern.nodes.map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-1 rounded-full transition-all ${
                        i < patternProgress
                          ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]'
                          : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
                {/* Timer Bar */}
                <div className="w-full max-w-[200px] h-1.5 bg-black/50 overflow-hidden mt-3 shadow-[0_0_10px_rgba(0,0,0,1)] border border-white/10">
                  <div 
                    className={`h-full transition-all duration-75 ${patternTimeLeft < 0.3 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse' : 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]'}`}
                    style={{ width: `${patternTimeLeft * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* "USE PATTERN!" Intro Overlay */}
        <AnimatePresence>
          {showPatternIntro && activePattern && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              className="absolute inset-0 z-[70] pointer-events-none flex flex-col items-center justify-center"
            >
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-center"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Swords className="w-10 h-10 text-cyan-400" />
                  <h2 className="text-cyan-400 font-black text-5xl md:text-6xl italic tracking-wider drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]">
                    {t.game.usePattern}
                  </h2>
                  <Swords className="w-10 h-10 text-cyan-400" />
                </div>
                <p className="text-white/80 text-lg font-bold tracking-widest mb-2">
                  {t.game.tracePath}
                </p>
                <div className="bg-black/40 backdrop-blur-sm px-6 py-3 rounded-xl border border-cyan-400/30 inline-block">
                  <p className="text-cyan-300 text-2xl font-black">
                    {activePattern.icon} {t.game.patterns[activePattern.name as keyof typeof t.game.patterns] || activePattern.name} {activePattern.icon}
                  </p>
                  <p className="text-white/60 text-xs mt-1 font-bold">
                    {t.game.swipeCheckpoints.replace('{val}', activePattern.nodes.length.toString())}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Boss Warning Overlay */}
        <AnimatePresence>
          {showBossWarning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[65] pointer-events-none flex items-center justify-center bg-red-900/10"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-center"
              >
                <div className="flex items-center gap-4 bg-black/60 backdrop-blur-md px-10 py-5 border-y-4 border-red-600 skew-x-[-15deg] shadow-[0_0_40px_rgba(239,68,68,0.4)]">
                  <AlertTriangle className="w-12 h-12 text-red-500 animate-pulse" />
                  <div className="text-left">
                    <h2 className="text-red-500 font-black text-5xl md:text-6xl italic tracking-tighter drop-shadow-[0_0_15px_rgba(239,68,68,0.8)] leading-none">
                      {t.game.bossIncoming}
                    </h2>
                    <p className="text-white font-black text-sm tracking-[0.3em] opacity-90 uppercase mt-2">
                      {t.game.killsUntilBoss.replace('{val}', (50 - (totalKills % 50)).toString())}
                    </p>
                  </div>
                  <AlertTriangle className="w-12 h-12 text-red-500 animate-pulse" />
                </div>
                <motion.div 
                  className="mt-4 h-1 bg-red-600/50 rounded-full overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                >
                  <motion.div 
                    className="h-full bg-red-400"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pattern Result Feedback */}
        <AnimatePresence>
          {patternResult === 'success' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[70] pointer-events-none flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
                className="px-12 py-4 bg-emerald-500/30 backdrop-blur-sm border-y-4 border-emerald-400 skew-x-[-10deg]"
              >
                <h2 className="text-emerald-300 font-black text-5xl italic drop-shadow-[0_0_20px_rgba(16,185,129,0.8)]">
                  ⚔️ {t.game.patternStrike}
                </h2>
              </motion.div>
            </motion.div>
          )}
          {patternResult === 'fail' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[70] pointer-events-none flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1], x: [-10, 10, -10, 0] }}
                transition={{ duration: 0.3 }}
                className="px-12 py-4 bg-red-500/30 backdrop-blur-sm border-y-4 border-red-500 skew-x-[10deg]"
              >
                <h2 className="text-red-400 font-black text-4xl italic drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]">
                  💥 {t.game.counterAttack}
                </h2>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
};

export default GameScreen;
