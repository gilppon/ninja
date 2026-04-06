export type Screen = 'lobby' | 'quest' | 'game' | 'shop' | 'gear';

export interface Quest {
  id: string;
  level: number;
  title: string;
  description: string;
  difficulty: 'Normal' | 'Hard' | 'Extreme' | 'Elite';
  bossId: 'shogun' | 'oni' | 'dragon' | 'void';
  bgKey: string;
  reward: number;
  thumbnail: string;
}
