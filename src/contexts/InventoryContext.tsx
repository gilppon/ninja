import React, { createContext, useState, useContext, useEffect } from 'react';

interface InventoryContextType {
  purchasedItems: string[];
  equippedItem: string | null;
  purchaseItem: (id: string) => void;
  equipItem: (id: string) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [purchasedItems, setPurchasedItems] = useState<string[]>(() => {
    const saved = localStorage.getItem('ninja_brick_inventory');
    return saved ? JSON.parse(saved) : [];
  });

  const [equippedItem, setEquippedItem] = useState<string | null>(() => {
    const saved = localStorage.getItem('ninja_brick_equipped');
    return saved ? saved : null;
  });

  useEffect(() => {
    localStorage.setItem('ninja_brick_inventory', JSON.stringify(purchasedItems));
  }, [purchasedItems]);

  useEffect(() => {
    if (equippedItem) {
      localStorage.setItem('ninja_brick_equipped', equippedItem);
    } else {
      localStorage.removeItem('ninja_brick_equipped');
    }
  }, [equippedItem]);

  const purchaseItem = (id: string) => {
    setPurchasedItems(prev => {
      if (!prev.includes(id)) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const equipItem = (id: string) => {
    if (purchasedItems.includes(id)) {
      setEquippedItem(id);
    }
  };

  return (
    <InventoryContext.Provider value={{ purchasedItems, equippedItem, purchaseItem, equipItem }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) throw new Error('useInventory must be used within InventoryProvider');
  return context;
};
