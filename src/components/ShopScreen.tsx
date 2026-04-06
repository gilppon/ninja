import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Gift } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { useInventory } from '../contexts/InventoryContext';
import { useItems, Item } from '../hooks/useItems';
import { useAchievements } from '../contexts/AchievementContext';

export default function ShopScreen() {
  const { t } = useLanguage();
  const { coins, spendCoins } = useCurrency();
  const { purchasedItems, purchaseItem } = useInventory();
  const { checkAchievements } = useAchievements();
  const items = useItems();
  const [randomizedItems, setRandomizedItems] = React.useState<Item[]>([]);
  const orderRef = React.useRef<number[]>([]);

  const buyItem = (id: string, price: number) => {
    if (!purchasedItems.includes(id)) {
      if (spendCoins(price)) {
        purchaseItem(id);
        checkAchievements({ coins: coins - price, itemCount: purchasedItems.length + 1 });
      }
    }
  };

  const [revealItem, setRevealItem] = React.useState<Item | null>(null);

  const handleGacha = () => {
    if (coins < 100) return;
    
    const unowned = items.filter(i => !purchasedItems.includes(i.id));
    if (unowned.length === 0) return;

    if (spendCoins(100)) {
      const random = unowned[Math.floor(Math.random() * unowned.length)];
      setRevealItem(random);
      setTimeout(() => {
        purchaseItem(random.id);
        checkAchievements({ coins: coins - 100, itemCount: purchasedItems.length + 1 });
      }, 500);
    }
  };

  React.useEffect(() => {
    // Initialize random order only once
    if (orderRef.current.length === 0) {
      orderRef.current = items.map((_, i) => i).sort(() => Math.random() - 0.5);
    }

    // Apply the saved order
    const shuffled = orderRef.current.map(index => items[index]);
    setRandomizedItems(shuffled);
  }, [items]);

  return (
    <div className="pt-24 pb-32 px-6 max-w-4xl mx-auto min-h-[100dvh] bg-transparent">
      <div className="mb-12 relative">
        <div className="inline-block bg-gradient-to-r from-red-600 to-orange-500 px-6 py-2 rounded-lg transform -rotate-2 shadow-[4px_4px_0_0_#92001c] mb-4">
          <h2 className="text-white font-headline font-black text-2xl tracking-tight uppercase">{t.shop.title}</h2>
        </div>
        <p className="text-white/80 font-bold text-lg max-w-md drop-shadow-md">{t.shop.subtitle}</p>
      </div>

      {/* Gacha Section */}
      <div className="mb-12">
        <div 
          onClick={handleGacha}
          className={`relative overflow-hidden rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 border-4 border-dashed transition-all cursor-pointer ${
            coins >= 100 
              ? 'bg-gradient-to-br from-indigo-600 to-purple-600 border-indigo-400 hover:scale-[1.02] active:scale-95 shadow-2xl shadow-indigo-500/20' 
              : 'bg-slate-200 border-slate-300 grayscale opacity-70 cursor-not-allowed'
          }`}
        >
          <div className="flex items-center gap-6">
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
              <Gift className="w-12 h-12 text-white" />
            </div>
            <div>
              <h3 className="text-white font-headline font-black text-3xl italic uppercase tracking-tighter">{t.shop.gachaTitle}</h3>
              <p className="text-indigo-100 font-bold">{t.shop.gachaDesc}</p>
            </div>
          </div>
          
          <div className="bg-yellow-400 px-8 py-4 rounded-2xl shadow-[0_6px_0_0_#b48a00] flex items-center gap-3">
            <span className="text-[#705d00] font-black text-2xl italic tracking-tighter">
              {items.filter(i => !purchasedItems.includes(i.id)).length === 0 ? t.shop.gachaNoItems : t.shop.gachaButton}
            </span>
          </div>

          {/* Decorative Sparks */}
          <div className="absolute -top-4 -right-4 opacity-50">
            <Sparkles className="w-24 h-24 text-white/20 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ perspective: '1000px' }}>
        {randomizedItems.map(item => (
          <ShopCard 
            key={item.id}
            title={item.title} 
            desc={item.desc} 
            features={item.features}
            price={item.price} 
            rarity={item.rarity} 
            color={item.color} 
            shadowColor={item.shadowColor}
            img={item.img} 
            isPurchased={purchasedItems.includes(item.id)}
            onPurchase={() => buyItem(item.id, item.price)}
            canAfford={coins >= item.price}
          />
        ))}
      </div>
      {/* Gacha Reveal Modal */}
      <AnimatePresence>
        {revealItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-6 pointer-events-auto"
            onClick={() => setRevealItem(null)}
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 2, opacity: 0 }}
              className="bg-white rounded-3xl p-12 max-w-md w-full shadow-[0_0_50px_rgba(255,255,255,0.3)] text-center relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className={`absolute inset-0 opacity-10 ${revealItem.color}`} />
              <div className="relative z-10 flex flex-col items-center">
                <div className="text-zinc-400 font-black mb-2 tracking-[0.3em] uppercase italic">NEW GEAR UNLOCKED!</div>
                <div className="w-48 h-48 mx-auto mb-8 relative">
                  <img src={revealItem.img} alt="new item" className="w-full h-full object-contain drop-shadow-2xl" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    <Sparkles className="w-full h-full text-yellow-400/30 scale-150" />
                  </motion.div>
                </div>
                <h4 className="text-4xl font-headline font-black text-zinc-900 uppercase italic mb-2 tracking-tighter">{revealItem.title}</h4>
                <div className={`${revealItem.color} text-white font-black px-4 py-1 rounded-full text-sm uppercase inline-block mb-8`}>
                  {revealItem.rarity}
                </div>
                <button 
                  onClick={() => setRevealItem(null)}
                  className="w-full bg-zinc-900 text-white font-black py-4 rounded-2xl shadow-[0_6px_0_0_#000] active:shadow-none active:translate-y-[6px] transition-all uppercase tracking-widest"
                >
                  CONTINUE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ShopCardProps {
  key?: React.Key;
  title: string;
  desc: string;
  features: string[];
  price: number;
  rarity: string;
  color: string;
  shadowColor: string;
  img: string;
  isPurchased: boolean;
  onPurchase: () => void;
  canAfford: boolean;
}

function ShopCard({ 
  title, 
  desc, 
  features, 
  price, 
  rarity, 
  color, 
  shadowColor, 
  img, 
  isPurchased, 
  onPurchase, 
  canAfford 
}: ShopCardProps) {
  const { t } = useLanguage();
  const isSpecial = rarity === t.shop.rarity.LEGENDARY || rarity === t.shop.rarity.EPIC;

  return (
    <motion.div 
      className={`group relative bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300 overflow-visible ${isPurchased ? 'ring-4 ring-green-500/50 ring-offset-2 ring-offset-transparent' : ''}`}
      whileHover="hover"
    >
      <div className="baseplate-texture bg-white/40 w-full h-64 rounded-xl relative overflow-visible border-b-4 border-white/20">
        <motion.div 
          className="absolute inset-0 flex items-center justify-center p-8"
          variants={{
            hover: {
              y: [0, -15, 0],
              rotate: [0, -5, 5, -5, 0],
              scale: 1.15,
              transition: {
                y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                rotate: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                scale: { duration: 0.3 }
              }
            }
          }}
        >
          <img src={img} alt={title} className="w-full h-full object-contain drop-shadow-2xl" referrerPolicy="no-referrer" />
        </motion.div>
        <div className="absolute top-4 left-4">
          <span className={`${color} text-white font-black px-3 py-1 rounded-full text-xs uppercase tracking-widest ${shadowColor}`}>{rarity}</span>
        </div>
        {isPurchased && (
          <div className="absolute top-4 right-4 bg-green-500 text-white font-black px-3 py-1 rounded-full text-xs uppercase tracking-widest shadow-[0_2px_0_0_#15803d]">
            {t.shop.purchased}
          </div>
        )}
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-headline font-black text-2xl text-white uppercase drop-shadow-sm">{title}</h3>
            <p className="text-white/60 font-bold text-sm mb-2">{desc}</p>
            {isPurchased && (
              <div className="mt-3 bg-white/5 backdrop-blur-sm p-3 rounded-lg border border-white/10">
                <h4 className="text-xs font-black text-white/40 uppercase tracking-wider mb-2">{t.shop.features}</h4>
                <ul className="space-y-1">
                  {features.map((feature, idx) => (
                    <li key={idx} className="text-sm font-bold text-white/90 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="text-right shrink-0">
            <span className="block text-yellow-400 font-headline font-black text-xl drop-shadow-sm">{price} 🪙</span>
          </div>
        </div>
        <div className="relative mt-auto pt-2">
          {isSpecial && !isPurchased && (
            <motion.div
              className={`absolute inset-0 rounded-xl blur-md ${color}`}
              animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <button 
            onClick={onPurchase}
            disabled={isPurchased || (!canAfford && !isPurchased)}
            className={`relative w-full font-black py-4 rounded-xl transition-all text-lg uppercase tracking-wider ${
              isPurchased 
                ? 'bg-zinc-200 text-zinc-400 shadow-[0_6px_0_0_#e4e4e7] cursor-not-allowed translate-y-[6px] shadow-none' 
                : !canAfford
                  ? 'bg-zinc-300 text-zinc-500 shadow-[0_6px_0_0_#d4d4d8] cursor-not-allowed'
                  : 'bg-[#bb152c] text-white shadow-[0_6px_0_0_#92001c] active:shadow-none active:translate-y-[6px]'
            }`}
          >
            {isPurchased ? t.shop.purchased : t.shop.acquire}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
