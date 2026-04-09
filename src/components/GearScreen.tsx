import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useInventory } from '../contexts/InventoryContext';
import { useItems, Item } from '../hooks/useItems';
import { Character } from '../constants/characters';
import { Sparkles, Shield, Sword, Zap } from 'lucide-react';

export default function GearScreen({ selectedChar }: { selectedChar: Character }) {
  const { t } = useLanguage();
  const { purchasedItems, itemCounts, equippedItem, equipItem } = useInventory();
  const items = useItems();

  const myGear = items.filter(item => purchasedItems.includes(item.id));
  const activeItem = items.find(i => i.id === equippedItem);
  const activeLevel = activeItem ? (itemCounts[activeItem.id] || 0) : 0;

  const charStyles: Record<string, { color: string; shadow: string }> = {
    MASTER: { color: 'bg-purple-500', shadow: 'from-purple-900 to-purple-600' },
    JADE:   { color: 'bg-emerald-500', shadow: 'from-emerald-900 to-emerald-600' },
    FLAME:  { color: 'bg-orange-500', shadow: 'from-orange-900 to-orange-600' },
    ICE:    { color: 'bg-cyan-500', shadow: 'from-cyan-900 to-cyan-600' },
    THUNDER:{ color: 'bg-yellow-500', shadow: 'from-yellow-900 to-yellow-600' },
  };
  const style = charStyles[selectedChar.name] ?? { color: 'bg-slate-500', shadow: 'from-slate-900 to-slate-600' };

  return (
    <div className="pt-24 pb-32 px-6 max-w-4xl mx-auto h-[100dvh] overflow-y-auto bg-transparent">
      <div className="mb-8 relative">
        <div className="inline-block bg-gradient-to-r from-[#bb152c] to-orange-500 px-6 py-2 rounded-lg transform -rotate-1 shadow-[4px_4px_0_0_#92001c] mb-8">
          <h2 className="text-white font-black text-2xl tracking-tight uppercase italic">{t.gear.title}</h2>
        </div>

        {/* Fitting Room Preview Section */}
        <div className="relative mb-12 bg-white/5 backdrop-blur-3xl rounded-[2rem] p-8 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            {/* Character Side */}
            <div className="relative group">
              <div className={`absolute inset-0 rounded-full blur-3xl opacity-20 ${style.color}`} />
              <div className={`w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-b ${style.shadow} border-4 border-white/20 p-4 relative overflow-hidden shadow-2xl`}>
                <motion.img 
                  src={selectedChar.img} 
                  alt={`${selectedChar.name} - Character Gear Setup`}
                  className="w-full h-full object-contain drop-shadow-2xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-xl">
                 <span className="text-zinc-900 font-black text-sm uppercase italic tracking-wider">{selectedChar.name}</span>
              </div>
            </div>

            {/* Link Icon */}
            <div className="hidden md:flex flex-col items-center gap-2 text-white/20">
               <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}><Zap className="w-8 h-8 fill-current" /></motion.div>
            </div>

            {/* Equipped Item Side */}
            <div className="flex-1 w-full">
              <div className="flex items-center gap-4 mb-4">
                 <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                    <Sword className="text-white w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-white font-black text-2xl uppercase italic leading-tight">
                      {activeItem ? `${activeItem.title} Lv.${activeLevel}` : t.gear.noWeapon}
                    </h3>
                    <div className="flex items-center gap-2">
                       <span className={`w-2 h-2 rounded-full ${activeItem ? 'bg-green-400 animate-pulse' : 'bg-zinc-500'}`} />
                       <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{activeItem ? t.gear.statusReady : t.gear.statusAwaiting}</span>
                    </div>
                 </div>
              </div>

              {activeItem && (
                 <motion.div 
                   key={activeItem.id}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="mt-6 grid grid-cols-2 gap-4"
                 >
                    <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
                       <p className="text-white/30 text-[10px] font-black uppercase mb-1">{t.gear.rarityLabel}</p>
                       <p className={`font-black text-xs uppercase ${activeItem.color.replace('bg-', 'text-')}`}>{activeItem.rarity}</p>
                    </div>
                    <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
                       <p className="text-white/30 text-[10px] font-black uppercase mb-1">{t.gear.bonusLabel}</p>
                       <p className="text-blue-400 font-black text-xs">+{Math.round((activeLevel - 1))}%</p>
                    </div>
                 </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {myGear.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-500 font-bold text-lg">{t.gear.empty}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ perspective: '1000px' }}>
          {myGear.map(item => (
            <GearItem 
              key={item.id}
              item={item}
              level={itemCounts[item.id] || 0}
              isEquipped={equippedItem === item.id}
              onEquip={() => equipItem(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface GearItemProps {
  key?: React.Key;
  item: Item;
  level: number;
  isEquipped: boolean;
  onEquip: () => void;
}

function GearItem({ item, level, isEquipped, onEquip }: GearItemProps) {
  const { t } = useLanguage();
  const isSpecial = item.rarity === t.shop.rarity.LEGENDARY || item.rarity === t.shop.rarity.EPIC;

  return (
    <motion.div 
      className={`group relative bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300 overflow-visible ${isEquipped ? 'ring-4 ring-blue-500/50 ring-offset-2 ring-offset-transparent' : ''}`}
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
          <img src={item.img} alt={item.title} className="w-full h-full object-contain drop-shadow-2xl" referrerPolicy="no-referrer" />
        </motion.div>
        <div className="absolute top-4 left-4">
          <span className={`${item.color} text-white font-black px-3 py-1 rounded-full text-xs uppercase tracking-widest ${item.shadowColor}`}>{item.rarity}</span>
        </div>
        {isEquipped && (
          <div className="absolute top-4 right-4 bg-blue-500 text-white font-black px-3 py-1 rounded-full text-xs uppercase tracking-widest shadow-[0_2px_0_0_#1d4ed8]">
            {t.gear.equipped}
          </div>
        )}
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-headline font-black text-2xl text-white uppercase drop-shadow-sm flex items-center gap-3">
              {item.title}
              <span className="text-blue-400 text-sm">Lv.{level}</span>
            </h3>
            <p className="text-white/60 font-bold text-sm mb-2">{item.desc}</p>
            <div className="mt-3 bg-white/5 backdrop-blur-sm p-3 rounded-lg border border-white/10">
              <h4 className="text-xs font-black text-white/40 uppercase tracking-wider mb-2">{t.shop.features}</h4>
              <ul className="space-y-1">
                {item.features.map((feature, idx) => (
                  <li key={idx} className="text-sm font-bold text-white/90 flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${isEquipped ? 'bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-white/20'}`}></span>
                    {feature}
                  </li>
                ))}
              </ul>
              {level > 1 && (
                <div className="mt-3 pt-3 border-t border-white/5">
                  <p className="text-[10px] font-black text-blue-400/60 uppercase tracking-widest">{t.gear.bonusLabel}</p>
                  <p className="text-blue-400 font-black text-sm">ALL STATS +{Math.round((level - 1))}%</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="relative mt-auto pt-2">
          {isSpecial && !isEquipped && (
            <motion.div
              className={`absolute inset-0 rounded-xl blur-md ${item.color}`}
              animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <button 
            onClick={onEquip}
            disabled={isEquipped}
            className={`relative w-full font-black py-4 rounded-xl transition-all text-lg uppercase tracking-wider ${
              isEquipped 
                ? 'bg-zinc-200 text-zinc-400 shadow-[0_6px_0_0_#e4e4e7] cursor-not-allowed translate-y-[6px] shadow-none' 
                : 'bg-[#bb152c] text-white shadow-[0_6px_0_0_#92001c] active:shadow-none active:translate-y-[6px]'
            }`}
          >
            {isEquipped ? t.gear.equipped : t.gear.equip}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
