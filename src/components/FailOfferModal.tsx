import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface FailOfferProps {
  onClose: () => void;
  onRevive: () => void;
  onShowLogin: () => void;
}

export default function FailOfferModal({ onClose, onRevive, onShowLogin }: FailOfferProps) {
  const { t } = useLanguage();
  const { user } = useAuth();

  const handleAction = () => {
    if (!user) {
      // If not logged in, show login modal to "Sync Identity and Revive"
      onShowLogin();
    } else {
      // If logged in, proceed with normal revive (e.g., using coins/items)
      // For now, let's just revive
      onRevive();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-[100] pointer-events-auto">
      <motion.div 
        initial={{ scale: 0.9, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 50, opacity: 0 }}
        className="relative w-full max-w-lg bg-[#edeeef] rounded-[2rem] shadow-2xl overflow-visible mt-16"
      >
        {/* Top Block Header */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
          <div className="bg-[#bb152c] px-8 py-3 rounded-xl shadow-[0_6px_0_0_#92001c] transform -rotate-2">
            <h2 className="font-headline font-black text-white text-2xl uppercase tracking-tighter">
              {t.failModal.header}
            </h2>
          </div>
        </div>

        {/* Dragon Head Pop-out */}
        <div className="relative h-48 flex justify-center items-end pt-12">
          <div className="absolute -top-24 w-64 h-64 z-10">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWtzABlRXW1IbhipEmxKR62dfAhz0kcAQ_HmN_lr_GBIpNrjZtQefujeGeAPtJ-5tQx4TEAbiWCWx5zm8l2wefRiL_m_M5YWIjuwYf8wWoLJB6xbqjbcDmid10off07kQvfsVF_Rg6GSyKVDGsZihB0QZM2oCMvKrrEUP4ksJ1jYgOm-1Fkq8qpOax6ELa6pfc6taavyz8oSpGdfFpFb7OqRQHG_PpNwg78hWaSATn-NSnuY7nNDo2xOHv1xoXQ9_4bv52hqHtQik" 
              alt="Dragon Head" 
              className="w-full h-full object-contain drop-shadow-[0_12px_0_rgba(112,93,0,0.4)]"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute top-0 w-full h-full bg-gradient-to-t from-[#ffe171]/40 to-transparent rounded-t-[2rem]"></div>
        </div>

        {/* Content Body */}
        <div className="px-8 pb-10 pt-4 text-center">
          <p className="font-headline font-black text-[#bb152c] text-4xl mb-2 italic transform -skew-x-6 tracking-tighter">
            {!user ? 'LOST IDENTITY?' : t.failModal.title}
          </p>
          <p className="font-bold text-slate-600 text-lg mb-8">
            {!user ? 'Sign up now to save your soul and REVIVE instantly! 🥷' : t.failModal.desc}
          </p>

          {/* Legendary Item Display */}
          <div className="bg-[#e1e3e4] rounded-2xl p-6 mb-8 relative border-b-4 border-zinc-300 shadow-inner overflow-hidden">
            <div className="flex items-center gap-6">
              <div className="w-32 h-32 bg-white rounded-xl shadow-[0_4px_0_0_#d1d5db] flex items-center justify-center p-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#ffe171] to-[#705d00] opacity-10"></div>
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRW97Yd4u6dIHCtrK5Qem2FM8sfpmSDGmgJVGEtIasLicnUE9IkC2KJEgDtcsHfj-38zj0-c4e4_O6UBd4cUVH66RYeQRahUMIyicPmeyn0OV-YJixCjjLLEtiuux134-z4CpqgiioFiOLsCrQD0b3arCl5iOrTawZvYOfUKbSNlYD78Q5zhOFCCXpiZ-5fHHTB5k6rPU1DDFEZWLVgYEErSDQO6bPfhAN-DhC-DdPcbSxDa46L4Jv25kjpOM8216aEda06hmFaNg" 
                  alt="Golden Dragon Blade" 
                  className="w-full h-full object-contain relative z-10 transform hover:scale-110 transition-transform"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left flex-1">
                <span className="inline-block bg-[#705d00] text-white font-headline font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-widest mb-2 shadow-[0_2px_0_0_#554600]">
                  {t.failModal.legendary}
                </span>
                <h3 className="font-headline font-extrabold text-2xl text-zinc-900 leading-tight">
                  {t.failModal.itemName}
                </h3>
                <p className="text-sm font-medium text-slate-700 mt-1">
                  {!user ? 'EXCLUSIVE REWARD FOR NEW NINJAS' : t.failModal.itemDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Action Hub */}
          <div className="space-y-4">
            <button 
              onClick={handleAction}
              className="group relative w-full bg-[#bb152c] py-6 rounded-2xl shadow-[0_8px_0_0_#92001c] active:translate-y-1 active:shadow-[0_4px_0_0_#92001c] transition-all"
            >
              <div className="absolute inset-0 plastic-sheen rounded-2xl pointer-events-none"></div>
              <div className="flex flex-col items-center justify-center">
                <span className="font-headline font-black text-white text-3xl uppercase tracking-tighter">
                  {!user ? 'SYNC & REVIVE 🥷' : t.failModal.buy}
                </span>
              </div>
            </button>
            
            <button onClick={onClose} className="w-full py-3 font-headline font-extrabold text-slate-500 hover:text-[#bb152c] transition-colors uppercase tracking-widest text-sm">
              {t.failModal.cancel}
            </button>
          </div>
        </div>

        {/* Stud Details */}
        <div className="absolute top-10 left-6 w-4 h-4 rounded-full bg-white/40 shadow-inner"></div>
        <div className="absolute top-10 right-6 w-4 h-4 rounded-full bg-white/40 shadow-inner"></div>
        <div className="absolute bottom-6 left-6 w-4 h-4 rounded-full bg-black/5 shadow-inner"></div>
        <div className="absolute bottom-6 right-6 w-4 h-4 rounded-full bg-black/5 shadow-inner"></div>
      </motion.div>
    </div>
  );
}
