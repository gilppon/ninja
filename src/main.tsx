import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './contexts/LanguageContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import { InventoryProvider } from './contexts/InventoryContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <CurrencyProvider>
        <InventoryProvider>
          <App />
        </InventoryProvider>
      </CurrencyProvider>
    </LanguageProvider>
  </StrictMode>,
);
