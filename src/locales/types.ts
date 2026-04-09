export type Language = 'en' | 'ko' | 'ja' | 'zh' | 'es';

export interface Translations {
  nav: {
    lobby: string;
    game: string;
    shop: string;
    gear: string;
  };
  lobby: {
    hotEvent: string;
    premium: string;
    unlock: string;
    individualUnlock: string;
    tactics: string;
    passiveSkillTitle: string;
    standardOperative: string;
    elementAura: string;
    enterDojo: string;
    menuFund: string;
    menuWelfare: string;
    menuExchange: string;
    stats: {
      coin: string;
      combo: string;
      slow: string;
      shield: string;
    };
  };
  shop: {
    title: string;
    subtitle: string;
    gachaTitle: string;
    gachaDesc: string;
    gachaButton: string;
    gachaNoItems: string;
    purchased: string;
    features: string;
    acquire: string;
    newGearUnlocked: string;
    levelUpSuccess: string;
    maxLevel: string;
    continue: string;
    rarity: {
      COMMON: string;
      RARE: string;
      EPIC: string;
      LEGENDARY: string;
    };
    items: {
      [key: string]: {
        name: string;
        desc: string;
        features: string[];
      };
    };
  };
  game: {
    score: string;
    combo: string;
    fever: string;
    ultimate: string;
    bossIncoming: string;
    killsUntilBoss: string;
    usePattern: string;
    tracePath: string;
    swipeCheckpoints: string;
    targetSkill: string;
    patternStrike: string;
    counterAttack: string;
    patterns: {
      [key: string]: string;
    };
  };
  topBar: {
    player: string;
    title: string;
    assets: string;
  };
  login: {
    firewallAccess: string;
    firebaseDeploy: string;
    newIdentity: string;
    encryptedAuth: string;
    email: string;
    password: string;
    authorizing: string;
    deployIdentity: string;
    overrideFirewall: string;
    signInPrompt: string;
    signUpPrompt: string;
    abortAuth: string;
    googleSignIn: string;
    dividerOr: string;
  };
  menu: {
    daoFund: string;
    dailyGift: string;
    claimed24h: string;
    claim50: string;
    premiumPass: string;
    doubleRewards: string;
    activate: string;
    exchangePrompt: string;
    exchangeBtn: string;
    arsenalLogistics: string;
  };
  failModal: {
    header: string;
    title: string;
    desc: string;
    lostIdentity: string;
    revivePrompt: string;
    exclusiveReward: string;
    syncRevive: string;
    buy: string;
    cancel: string;
    legendary: string;
    itemName: string;
    itemDesc: string;
  };
  gear: {
    title: string;
    empty: string;
    equip: string;
    equipped: string;
    noWeapon: string;
    statusReady: string;
    statusAwaiting: string;
    rarityLabel: string;
    bonusLabel: string;
  };
  quest: {
    selectMission: string;
    availableContracts: string;
    back: string;
    levelPrefix: string;
    briefing: string;
    target: string;
    reward: string;
    coins: string;
    launch: string;
    difficulty: {
      Normal: string;
      Hard: string;
      Extreme: string;
      Elite: string;
    };
    missions: {
      [key: string]: {
        title: string;
        description: string;
      };
    };
  };
  characters: {
    [key: string]: {
      role: string;
      description: string;
      passiveDesc: string;
    };
  };
  achievements: {
    unlocked: string;
    combo_10: { title: string; desc: string };
    combo_50: { title: string; desc: string };
    rich_ninja: { title: string; desc: string };
    collector: { title: string; desc: string };
  };
  victory: {
    title: string;
    missionComplete: string;
    reward: string;
    score: string;
    coins: string;
    next: string;
    lobby: string;
    season2: string;
  };
}
