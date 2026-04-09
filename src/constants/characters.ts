export interface Character {
  name: string;
  isPremium: boolean;
  unlocked: boolean;
  img: string;
  hasPeriodicShield?: boolean;
  slowEnemiesFactor?: number;
  comboGracePeriod?: number;
  coinMultiplier?: number;
  ultimateType?: string;
}

export const CHARACTERS: Character[] = [
  {
    name: 'MASTER',
    isPremium: false,
    unlocked: true,
    img: '/assets/characters/ninja.png',
    ultimateType: 'none'
  },
  {
    name: 'JADE',
    isPremium: false,
    unlocked: true,
    img: '/assets/characters/jade.png',
    ultimateType: 'none'
  },
  {
    name: 'FLAME',
    isPremium: true,
    unlocked: false,
    img: '/assets/characters/flame.png',
    coinMultiplier: 1.5,
    ultimateType: 'flame'
  },
  {
    name: 'ICE',
    isPremium: true,
    unlocked: false,
    img: '/assets/characters/ice.png',
    ultimateType: 'ice'
  },
  {
    name: 'THUNDER',
    isPremium: true,
    unlocked: false,
    img: '/assets/characters/thunder.png',
    ultimateType: 'thunder'
  }
];
