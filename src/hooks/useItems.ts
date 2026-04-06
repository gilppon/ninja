import { useLanguage } from '../contexts/LanguageContext';

export interface Item {
  id: string;
  title: string;
  desc: string;
  features: string[];
  price: number;
  rarity: string;
  color: string;
  shadowColor: string;
  img: string;
}

export const useItems = (): Item[] => {
  const { t } = useLanguage();

  return [
    {
      id: 'aegis',
      title: t.shop.items.aegis.name,
      desc: t.shop.items.aegis.desc,
      features: t.shop.items.aegis.features,
      price: 2000,
      rarity: t.shop.rarity.LEGENDARY,
      color: "bg-red-600",
      shadowColor: "shadow-[0_2px_0_0_#991b1b]",
      img: "/assets/weapons/oni.png" // Temporary reuse of oni asset
    },
    {
      id: 'time_shuriken',
      title: t.shop.items.time_shuriken.name,
      desc: t.shop.items.time_shuriken.desc,
      features: t.shop.items.time_shuriken.features,
      price: 2500,
      rarity: t.shop.rarity.LEGENDARY,
      color: "bg-blue-600",
      shadowColor: "shadow-[0_2px_0_0_#1e3a8a]",
      img: "/assets/weapons/starfall.png" // Temporary reuse of starfall asset
    },
    {
      id: 'dragon_slayer',
      title: t.shop.items.dragon_slayer.name,
      desc: t.shop.items.dragon_slayer.desc,
      features: t.shop.items.dragon_slayer.features,
      price: 3000,
      rarity: t.shop.rarity.LEGENDARY,
      color: "bg-purple-600",
      shadowColor: "shadow-[0_2px_0_0_#581c87]",
      img: "/assets/weapons/void.png" // Temporary reuse of void asset
    },
    {
      id: 'golden_jitte',
      title: t.shop.items.golden_jitte.name,
      desc: t.shop.items.golden_jitte.desc,
      features: t.shop.items.golden_jitte.features,
      price: 5000,
      rarity: t.shop.rarity.LEGENDARY,
      color: "bg-amber-400",
      shadowColor: "shadow-[0_2px_0_0_#92400e]",
      img: "/assets/weapons/golden.png" // Temporary reuse of golden asset
    }
  ];
};
