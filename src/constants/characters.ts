export interface Character {
  name: string;
  img: string;
  color: string;
  shadow: string; // Tailwind gradient color
  premium: boolean;
  ultimateType: 'none' | 'flame' | 'ice' | 'thunder';
  role: string;
  description: string;
  // --- PASSIVE SKILLS ---
  passiveDescription?: string;
  coinMultiplier?: number;
  comboGracePeriod?: number;   // default is 1500ms
  slowEnemiesFactor?: number;  // 0 to 1, default 1
  hasPeriodicShield?: boolean; // THUNDER specific
}
export const CHARACTERS: Character[] = [
  { 
    name: 'MASTER', 
    img: '/assets/characters/ninja.png', 
    color: 'bg-zinc-800', 
    shadow: 'zinc-500', 
    premium: false,
    ultimateType: 'none',
    role: 'NINJA',
    description: 'TRADITIONAL SHINOBI TECHNIQUES. MASTERS STEALTH AND RAPID CLOSE-QUARTERS ASSASSINATION TO ELIMINATE TARGETS UNSEEN.'
  },
  { 
    name: 'JADE', 
    img: '/assets/characters/jade.png', 
    color: 'bg-emerald-600', 
    shadow: 'emerald-400', 
    premium: false,
    ultimateType: 'none',
    role: 'SCOUT',
    description: 'HIGH MOBILITY AND RECONNAISSANCE. EXCELS AT GATHERING INTEL AND EXECUTING HIT-AND-RUN TACTICS WITH TWIN BLADES.'
  },
  { 
    name: 'FLAME', 
    img: '/assets/characters/flame.png', 
    color: 'bg-pink-600', 
    shadow: 'pink-500', 
    premium: true,
    ultimateType: 'flame',
    role: 'ASSAULT',
    description: 'HEAVY FIREPOWER SPECIALIST. UTILIZES INCENDIARY WEAPONS AND EXPLOSIVES TO BREAK THROUGH HEAVILY ARMORED ENEMY LINES.',
    passiveDescription: '[GREED] COIN YIELD x1.5 / FIERY SLASHES',
    coinMultiplier: 1.5,
  },
  { 
    name: 'ICE', 
    img: '/assets/characters/ice.png', 
    color: 'bg-cyan-500', 
    shadow: 'cyan-400', 
    premium: true,
    ultimateType: 'ice',
    role: 'SNIPER',
    description: 'SPECIAL TRAINING TO MASTER PRECISION SHOOTING, CAMOUFLAGE AND RECONNAISSANCE SKILLS.',
    passiveDescription: '[FROSTBITE] COMBO TIME x2 / SLUGS ENEMIES (-20% SPD)',
    comboGracePeriod: 3000,
    slowEnemiesFactor: 0.8,
  },
  { 
    name: 'THUNDER', 
    img: '/assets/characters/thunder.png', 
    color: 'bg-yellow-400', 
    shadow: 'yellow-300', 
    premium: true,
    ultimateType: 'thunder',
    role: 'SUPPORT',
    description: 'TACTICAL SUPPORT OPERATIVE. DEPLOYS SHIELDS AND EMP GADGETS TO DISRUPT ENEMY FORMATIONS AND PROTECT ALLIES.',
    passiveDescription: '[STATIC WARD] 1 DAMAGE SHIELD EVERY 20s / CHAIN SHOCK',
    hasPeriodicShield: true,
  }
];
