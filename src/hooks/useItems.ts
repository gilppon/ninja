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
      id: 'flame',
      title: t.shop.items.flame.name,
      desc: t.shop.items.flame.desc,
      features: t.shop.items.flame.features,
      price: 850,
      rarity: t.shop.rarity.LEGENDARY,
      color: "bg-orange-500",
      shadowColor: "shadow-[0_2px_0_0_#c2410c]",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFqYs9Swqhq8v-iV05z8xc5yCQn2OJn2SM0GT9_ptjErl5GZ4dLPq2ciPo7ofAghET6kyNax9kWdK_DmbYamOHBqO1EJPBwlG71zfiT7Z3LjVjQ2-Uq4aBhYh6yLJbbevCDEnz9vlZ5LDiu4YXxXNud9rqVTpnNke_OOINGIc14ZCMDoK-7Y0vhOagBiwos4lC5YDXDHJj0wJaCYBNWZ_FhJ85B6SByKNHjBL14vrVYiVq-qVZVu2jyarxy_ZRFwec9j74T0I3plI"
    },
    {
      id: 'ice',
      title: t.shop.items.ice.name,
      desc: t.shop.items.ice.desc,
      features: t.shop.items.ice.features,
      price: 400,
      rarity: t.shop.rarity.EPIC,
      color: "bg-blue-500",
      shadowColor: "shadow-[0_2px_0_0_#1d4ed8]",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYm33cZDWi6xFUM1FSWwr5eauWE1YSRCA9dOcxzQqxEb-AQ_TSgbEM4jTKrgzyz2bZTUxxNaDXWsyTC_RCm72ZBSXowam1xnPHBnr7zjTFFLHHVxCMNhdQFkdeGvnM2SchZIyQwmijYPHEbmNw7jRHlm55OBkI-mDveMALZzIF8qcgnrvJ-bIKJU2t1Obmz127rsq6V40-Xs2nkhxP3khhYh-R4BOsRkgTnuQCTJ1WdTmIuri5z56JSLxrVSroDTRlP-fjLYB2A-4"
    },
    {
      id: 'jade',
      title: t.shop.items.jade.name,
      desc: t.shop.items.jade.desc,
      features: t.shop.items.jade.features,
      price: 700,
      rarity: t.shop.rarity.EPIC,
      color: "bg-emerald-400",
      shadowColor: "shadow-[0_2px_0_0_#065f46]",
      img: "/assets/weapons/jade.png"
    },
    {
      id: 'thunder',
      title: t.shop.items.thunder.name,
      desc: t.shop.items.thunder.desc,
      features: t.shop.items.thunder.features,
      price: 750,
      rarity: t.shop.rarity.LEGENDARY,
      color: "bg-yellow-500",
      shadowColor: "shadow-[0_2px_0_0_#ca8a04]",
      img: "/assets/weapons/thunder.png"
    },
    {
      id: 'storm',
      title: t.shop.items.storm.name,
      desc: t.shop.items.storm.desc,
      features: t.shop.items.storm.features,
      price: 950,
      rarity: t.shop.rarity.LEGENDARY,
      color: "bg-yellow-400",
      shadowColor: "shadow-[0_2px_0_0_#a16207]",
      img: "/assets/weapons/storm.png"
    },
    {
      id: 'void',
      title: t.shop.items.void.name,
      desc: t.shop.items.void.desc,
      features: t.shop.items.void.features,
      price: 1000,
      rarity: t.shop.rarity.LEGENDARY,
      color: "bg-purple-600",
      shadowColor: "shadow-[0_2px_0_0_#7e22ce]",
      img: "/assets/weapons/void.png"
    },
    {
      id: 'solar',
      title: t.shop.items.solar.name,
      desc: t.shop.items.solar.desc,
      features: t.shop.items.solar.features,
      price: 750,
      rarity: t.shop.rarity.EPIC,
      color: "bg-orange-600",
      shadowColor: "shadow-[0_2px_0_0_#c2410c]",
      img: "/assets/weapons/solar.png"
    },
    {
      id: 'midnight',
      title: t.shop.items.midnight.name,
      desc: t.shop.items.midnight.desc,
      features: t.shop.items.midnight.features,
      price: 450,
      rarity: t.shop.rarity.RARE,
      color: "bg-slate-700",
      shadowColor: "shadow-[0_2px_0_0_#334155]",
      img: "/assets/weapons/midnight.png"
    },
    {
      id: 'emerald_sai',
      title: t.shop.items.emerald_sai.name,
      desc: t.shop.items.emerald_sai.desc,
      features: t.shop.items.emerald_sai.features,
      price: 500,
      rarity: t.shop.rarity.RARE,
      color: "bg-emerald-500",
      shadowColor: "shadow-[0_2px_0_0_#059669]",
      img: "/assets/weapons/emerald_sai.png"
    },
    {
      id: 'glacier',
      title: t.shop.items.glacier.name,
      desc: t.shop.items.glacier.desc,
      features: t.shop.items.glacier.features,
      price: 700,
      rarity: t.shop.rarity.EPIC,
      color: "bg-cyan-500",
      shadowColor: "shadow-[0_2px_0_0_#0891b2]",
      img: "/assets/weapons/glacier.png"
    },
    {
      id: 'starfall',
      title: t.shop.items.starfall.name,
      desc: t.shop.items.starfall.desc,
      features: t.shop.items.starfall.features,
      price: 250,
      rarity: t.shop.rarity.COMMON,
      color: "bg-sky-400",
      shadowColor: "shadow-[0_2px_0_0_#0369a1]",
      img: "/assets/weapons/starfall.png"
    },
    {
      id: 'golden',
      title: t.shop.items.golden.name,
      desc: t.shop.items.golden.desc,
      features: t.shop.items.golden.features,
      price: 800,
      rarity: t.shop.rarity.EPIC,
      color: "bg-amber-400",
      shadowColor: "shadow-[0_2px_0_0_#b45309]",
      img: "/assets/weapons/golden.png"
    },
    {
      id: 'oni',
      title: t.shop.items.oni.name,
      desc: t.shop.items.oni.desc,
      features: t.shop.items.oni.features,
      price: 550,
      rarity: t.shop.rarity.RARE,
      color: "bg-red-700",
      shadowColor: "shadow-[0_2px_0_0_#991b1b]",
      img: "/assets/weapons/oni.png"
    },
    {
      id: 'phantom',
      title: t.shop.items.phantom.name,
      desc: t.shop.items.phantom.desc,
      features: t.shop.items.phantom.features,
      price: 720,
      rarity: t.shop.rarity.EPIC,
      color: "bg-indigo-600",
      shadowColor: "shadow-[0_2px_0_0_#4338ca]",
      img: "/assets/weapons/phantom.png"
    }
  ];
};
