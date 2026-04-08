export interface Character {
  name: string;
  price: number;
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
    price: 0,
    unlocked: true,
    img: '/assets/characters/ninja.png',
    ultimateType: 'none'
  },
  {
    name: 'JADE',
    price: 0,
    unlocked: true,
    img: '/assets/characters/jade.png',
    ultimateType: 'none'
  },
  {
    name: 'FLAME',
    price: 30000,
    unlocked: false,
    img: '/assets/characters/flame.png',
    coinMultiplier: 1.5,
    ultimateType: 'flame'
  },
  {
    name: 'ICE',
    price: 50000,
    unlocked: false,
    img: '/assets/characters/ice.png',
    ultimateType: 'ice'
  },
  {
    name: 'THUNDER',
    price: 80000,
    unlocked: false,
    img: '/assets/characters/thunder.png',
    ultimateType: 'thunder'
  }
];
