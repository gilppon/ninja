import React, { createContext, useState, useContext, useEffect } from 'react';

interface CurrencyContextType {
  coins: number;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem('ninja_brick_coins');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('ninja_brick_coins', coins.toString());
  }, [coins]);

  const addCoins = (amount: number) => setCoins(prev => prev + amount);
  
  const spendCoins = (amount: number) => {
    let success = false;
    setCoins(prev => {
      if (prev >= amount) {
        success = true;
        return prev - amount;
      }
      return prev;
    });
    return success;
  };

  return (
    <CurrencyContext.Provider value={{ coins, addCoins, spendCoins }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within CurrencyProvider');
  return context;
};
