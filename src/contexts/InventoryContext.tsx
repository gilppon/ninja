import React, { createContext, useState, useContext, useEffect } from 'react';

interface InventoryContextType {
  purchasedItems: string[];
  itemCounts: Record<string, number>;
  purchaseItem: (id: string, stackable?: boolean) => void;
  consumeItem: (id: string) => void;
  equipItem: (id: string) => void;
  equippedItem: string | null;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [purchasedItems, setPurchasedItems] = useState<string[]>(() => {
    const saved = localStorage.getItem('ninja_brick_inventory');
    return saved ? JSON.parse(saved) : [];
  });

  const [itemCounts, setItemCounts] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('ninja_brick_item_counts');
    return saved ? JSON.parse(saved) : {};
  });

  const [equippedItem, setEquippedItem] = useState<string | null>(() => {
    const saved = localStorage.getItem('ninja_brick_equipped');
    return saved ? saved : null;
  });

  useEffect(() => {
    localStorage.setItem('ninja_brick_inventory', JSON.stringify(purchasedItems));
  }, [purchasedItems]);

  useEffect(() => {
    localStorage.setItem('ninja_brick_item_counts', JSON.stringify(itemCounts));
  }, [itemCounts]);

  useEffect(() => {
    if (equippedItem) {
      localStorage.setItem('ninja_brick_equipped', equippedItem);
    } else {
      localStorage.removeItem('ninja_brick_equipped');
    }
  }, [equippedItem]);

  const MAX_LEVEL = 99;

  const purchaseItem = (id: string, _stackable: boolean = false) => {
    // Always increment count (Level Up for equipment, stack for consumables)
    setItemCounts(prev => ({
      ...prev,
      [id]: Math.min(MAX_LEVEL, (prev[id] || 0) + 1)
    }));

    if (!purchasedItems.includes(id)) {
      setPurchasedItems(prev => [...prev, id]);
    }
  };

  const consumeItem = (id: string) => {
    setItemCounts(prev => {
      const newCount = (prev[id] || 0) - 1;
      if (newCount <= 0) {
        const { [id]: _, ...rest } = prev;
        // If count becomes 0, we can also remove from purchasedItems if we want,
        // but for now let's just keep it in purchasedItems to show it was once owned, 
        // or remove it? Let's remove it to keep UI clean if it's a consumable.
        setPurchasedItems(items => items.filter(item => item !== id));
        return rest;
      }
      return { ...prev, [id]: newCount };
    });
  };

  const equipItem = (id: string) => {
    if (purchasedItems.includes(id)) {
      setEquippedItem(id);
    }
  };

  return (
    <InventoryContext.Provider value={{ purchasedItems, itemCounts, purchaseItem, consumeItem, equipItem, equippedItem }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) throw new Error('useInventory must be used within InventoryProvider');
  return context;
};
