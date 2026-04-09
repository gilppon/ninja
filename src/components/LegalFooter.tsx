import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { LEGAL_DATA } from '../constants/legal';
import PolicyModal from './PolicyModal';

type PolicyType = 'terms' | 'privacy' | 'refund' | 'tokushoho';

export default function LegalFooter() {
  const { lang, t } = useLanguage();
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null);

  const handleOpen = (type: PolicyType) => {
    setActivePolicy(type);
  };

  const currentLegal = LEGAL_DATA[lang];

  return (
    <>
      <footer className="relative z-40 w-full px-6 py-8 md:py-10 bg-transparent flex flex-col items-center gap-6">
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-[10px] md:text-sm font-bold tracking-widest uppercase">
          <button 
            onClick={() => handleOpen('terms')}
            className="text-white/70 hover:text-white transition-colors duration-300"
          >
            {t.footer.terms}
          </button>
          <span className="text-white/20 select-none">|</span>
          <button 
            onClick={() => handleOpen('privacy')}
            className="text-white/70 hover:text-white transition-colors duration-300"
          >
            {t.footer.privacy}
          </button>
          <span className="text-white/20 select-none">|</span>
          <button 
            onClick={() => handleOpen('refund')}
            className="text-white/70 hover:text-white transition-colors duration-300"
          >
            {t.footer.refund}
          </button>
          {lang === 'ja' && (
            <>
              <span className="text-white/20 select-none">|</span>
              <button 
                onClick={() => handleOpen('tokushoho')}
                className="text-white/70 hover:text-white transition-colors duration-300"
              >
                {t.footer.legal}
              </button>
            </>
          )}
        </div>

        <div className="flex flex-col items-center gap-1 text-center">
          <p className="text-[9px] md:text-[11px] text-white/40 font-black tracking-[0.3em] uppercase">
            &copy; 2026 NEXT HARU. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[8px] md:text-[9px] text-white/20 font-medium tracking-widest uppercase">
            Crafted for Premium Gaming Experience
          </p>
        </div>

        {/* PWA Safe Area Spacer - Ensures content isn't cut off by gesture bars */}
        <div className="h-[env(safe-area-inset-bottom)] w-full" />
      </footer>

      <PolicyModal 
        isOpen={!!activePolicy} 
        onClose={() => setActivePolicy(null)} 
        type={activePolicy || 'terms'} 
      />
    </>
  );
}
