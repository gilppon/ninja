import { Translations } from './types';

const en: Translations = {
  nav: { lobby: 'LOBBY', game: 'QUEST', shop: 'SHOP', gear: 'GEAR' },
  lobby: {
    hotEvent: 'HOT EVENT',
    premium: 'PREMIUM',
    unlock: 'UNLOCK {price}',
    individualUnlock: 'INDIVIDUAL UNLOCK ($3.99)',
    tactics: 'TACTICS',
    passiveSkillTitle: 'PASSIVE SKILL',
    standardOperative: 'STANDARD OPERATIVE — NO PASSIVE SKILL',
    elementAura: 'ELEMENT AURA',
    enterDojo: 'ENTER DOJO',
    menuFund: 'FUND',
    menuWelfare: 'WELFARE',
    menuExchange: 'EXCHANGE',
    stats: {
      coin: 'COIN ×{val}',
      combo: 'COMBO {val}s',
      slow: 'SLOW -{val}%',
      shield: 'SHIELD / {val}s'
    }
  },
  shop: {
    title: 'CYBER SHOP',
    subtitle: 'UPGRADE YOUR NINJA GEAR',
    gachaTitle: 'LUCKY DRAW',
    gachaDesc: 'GET RANDOM HIGH-TIER GEAR',
    gachaButton: 'DRAW 10000 🪙',
    gachaNoItems: 'SOLD OUT',
    purchased: 'PURCHASED',
    features: 'FEATURES',
    acquire: 'ACQUIRE',
    newGearUnlocked: 'NEW GEAR UNLOCKED!',
    levelUpSuccess: 'Reinforcement Success!',
    maxLevel: 'MAX LEVEL REACHED',
    continue: 'CONTINUE',
    rarity: { COMMON: 'COMMON', RARE: 'RARE', EPIC: 'EPIC', LEGENDARY: 'LEGENDARY' },
    items: {
      aegis: {
        name: 'Aegis of the Soul',
        desc: 'Defies physics to exceed your HP limit and swallow fatal damage. A miraculous piece of defensive gear.',
        features: ['Max HP +50', 'Damage Taken -20%']
      },
      time_shuriken: {
        name: 'Chrono Shuriken',
        desc: 'Enables infinite Fever for everyone. Prevents combo crashes upon hit and overloads your Ultimate Gauge.',
        features: ['Combo Halves on Hit', 'Ultimate Charge x1.5']
      },
      dragon_slayer: {
        name: 'Dragon Slayer',
        desc: 'A vicious colossal blade that severs a boss’s life and empties their pockets with a single swipe.',
        features: ['Coin Yield x1.5', 'Boss Damage x1.5']
      },
      golden_jitte: {
        name: 'Golden Jitte',
        desc: 'The true weapon of a ninja is money. The pinnacle of capitalism that doubles your coins effortlessly.',
        features: ['Coin Yield x2.0']
      },
      revival_scroll: {
        name: 'Revival Scroll',
        desc: 'A mysterious scroll that pulls you back from the brink of death.',
        features: ['Instant Revive', 'Consumable Item', 'Battle Replay']
      }
    }
  },
  game: {
    score: 'SCORE',
    combo: 'COMBO',
    fever: 'FEVER!!',
    ultimate: 'ULTIMATE',
    bossIncoming: 'BOSS INCOMING',
    killsUntilBoss: '{val} KILLS UNTIL BOSS SPAWN',
    usePattern: 'USE PATTERN!',
    tracePath: 'TRACE THE GLOWING PATH',
    swipeCheckpoints: 'SWIPE THROUGH {val} CHECKPOINTS IN ORDER',
    targetSkill: 'TARGET SKILL',
    patternStrike: 'PATTERN STRIKE!',
    counterAttack: 'COUNTER ATTACK! -15 HP',
    patterns: {
      'LIGHTNING SLASH': 'LIGHTNING SLASH',
      'CROSS STRIKE': 'CROSS STRIKE',
      'V STRIKE': 'V STRIKE',
      'RISING DRAGON': 'RISING DRAGON',
      'DEATH SPIRAL': 'DEATH SPIRAL',
      'Z-STRIKE': 'Z-STRIKE',
      'PENTAGRAM': 'PENTAGRAM',
      'HEXAGON SEAL': 'HEXAGON SEAL',
      'CROSS EXECUTION': 'CROSS EXECUTION',
      'INFINITY SLASH': 'INFINITY SLASH'
    }
  },
  topBar: {
    player: 'PLAYER_UNIT',
    title: 'SHINOBI_OS',
    assets: 'ASSETS'
  },
  login: {
    firewallAccess: 'Firewall Access',
    firebaseDeploy: 'Firebase Deploy',
    newIdentity: 'New Firebase Identity',
    encryptedAuth: 'Encrypted Authentication',
    email: 'Secure Email',
    password: 'Access Pass',
    authorizing: 'Authorizing...',
    deployIdentity: 'Deploy Identity',
    overrideFirewall: 'Override Firewall',
    signInPrompt: 'Identified Before? Sign In',
    signUpPrompt: 'New recruit? Register at Firebase',
    abortAuth: '[ ABORT AUTHENTICATION ]',
    googleSignIn: 'SIGN IN WITH GOOGLE',
    dividerOr: 'OR',
  },
  menu: {
    daoFund: 'DAO LEVEL FUND IN PROGRESS...',
    dailyGift: 'DAILY GIFT',
    claimed24h: 'Claimed every 24h',
    claim50: 'CLAIM 50 🪙',
    premiumPass: 'SEASON ALL-PASS ($9.99)',
    doubleRewards: 'Unlock All Agents & 2x Rewards for 30d',
    activate: 'ACTIVATE ($9.99)',
    exchangePrompt: '10 GEMS = 100 COINS',
    exchangeBtn: 'EXCHANGE RESOURCES',
    arsenalLogistics: 'NINJA ARSENAL & LOGISTICS'
  },
  failModal: {
    header: 'MISSION FAILED',
    title: 'DEFEATED',
    desc: 'Your journey ends here... or does it?',
    lostIdentity: 'LOST IDENTITY?',
    revivePrompt: 'Sign up now to save your soul and REVIVE instantly! 🥷',
    exclusiveReward: 'EXCLUSIVE REWARD FOR NEW NINJAS',
    syncRevive: 'SYNC & REVIVE 🥷',
    buy: 'REVIVE',
    cancel: 'GIVE UP',
    legendary: 'LEGENDARY',
    itemName: 'Golden Dragon Blade',
    itemDesc: 'A blade that defies death itself.'
  },
  characters: {
    MASTER: {
      role: 'NINJA',
      description: 'TRADITIONAL SHINOBI TECHNIQUES. MASTERS STEALTH AND RAPID CLOSE-QUARTERS ASSASSINATION.',
      passiveDesc: 'NONE'
    },
    JADE: {
      role: 'SCOUT',
      description: 'HIGH MOBILITY AND RECONNAISSANCE. EXCELS AT GATHERING INTEL AND HIT-AND-RUN TACTICS.',
      passiveDesc: 'NONE'
    },
    FLAME: {
      role: 'ASSAULT',
      description: 'HEAVY FIREPOWER SPECIALIST. UTILIZES INCENDIARY WEAPONS TO BREAK THROUGH ENEMY LINES.',
      passiveDesc: '[GREED] COIN YIELD x1.5 / FIERY SLASHES'
    },
    ICE: {
      role: 'SNIPER',
      description: 'SPECIAL TRAINING TO MASTER PRECISION SHOOTING, CAMOUFLAGE AND RECONNAISSANCE.',
      passiveDesc: '[FROSTBITE] COMBO TIME x2 / SLOWS ENEMIES'
    },
    THUNDER: {
      role: 'SUPPORT',
      description: 'TACTICAL SUPPORT OPERATIVE. DEPLOYS SHIELDS TO PROTECT ALLIES.',
      passiveDesc: '[STATIC WARD] 1 DAMAGE SHIELD EVERY 20s'
    }
  },
  gear: {
    title: 'ARSENAL',
    empty: 'No gear acquired yet. Visit the shop!',
    equip: 'EQUIP',
    equipped: 'EQUIPPED',
    noWeapon: 'NO WEAPON',
    statusReady: 'Equipped & Ready',
    statusAwaiting: 'Awaiting Selection',
    rarityLabel: 'Rarity',
    bonusLabel: 'Reinforcement Bonus'
  },
  quest: {
    selectMission: 'SELECT MISSION',
    availableContracts: 'AVAILABLE CONTRACTS',
    back: 'BACK',
    levelPrefix: 'ST',
    briefing: 'MISSION BRIEFING',
    target: 'TARGET',
    reward: 'REWARD',
    coins: 'COINS',
    launch: 'LAUNCH MISSION',
    difficulty: {
      Normal: 'Normal',
      Hard: 'Hard',
      Extreme: 'Extreme',
      Elite: 'Elite'
    },
    missions: {
      q1: { title: 'Neon Outskirts', description: 'Eliminate rogue drones passing through the outer neon sector.' },
      q2: { title: 'Frozen Facilities', description: 'A cyber-facility frozen in time. Defeat the Neon Oni guarding the core.' },
      q3: { title: "Dragon's Peak", description: 'Ascend the peak and slay the Cyber Dragon causing electronic storms.' },
      q4: { title: 'Void Anomaly', description: 'Venture into the void anomaly and survive against the corrupted Void Ninja.' }
    },
    locked: 'LOCKED',
    clearPrevious: 'Clear previous stage to unlock'
  },
  achievements: {
    combo_10: { title: 'Combo Novice', desc: 'Reach 10 combos' },
    combo_50: { title: 'Combo Master', desc: 'Reach 50 combos' },
    rich_ninja: { title: 'Rich Ninja', desc: 'Hold 500 coins' },
    collector: { title: 'Collector', desc: 'Own 3 items' },
    unlocked: 'Achievement Unlocked!'
  },
  victory: {
    title: 'MISSION COMPLETE',
    missionComplete: 'AREA SECURED',
    reward: 'COMMENDATION',
    score: 'FINAL SCORE',
    coins: 'COINS EARNED',
    next: 'NEXT TARGET',
    lobby: 'RETURN TO BASE',
    season2: 'SEASON 1 COMPLETE. PREPARE FOR SEASON 2!'
  },
  footer: {
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    refund: 'Refund Policy',
    legal: 'Legal Notice'
  }
};


export default en;
