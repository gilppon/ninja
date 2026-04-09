import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LEGAL_DATA } from '../constants/legal';

type PolicyType = 'terms' | 'privacy' | 'refund' | 'tokushoho';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: PolicyType;
}

export default function PolicyModal({ isOpen, onClose, type }: PolicyModalProps) {
  const { lang } = useLanguage();
  const data = type === 'tokushoho' ? null : LEGAL_DATA[lang][type];
  const tokushoho = LEGAL_DATA[lang].tokushoho;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl max-h-[80vh] bg-slate-900/90 border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-950/50">
              <div>
                <h2 className="text-xl md:text-2xl font-black italic text-white tracking-widest uppercase">
                  {type === 'tokushoho' ? 'Legal Notice' : data?.title}
                </h2>
                <p className="text-[10px] text-zinc-400 mt-1 uppercase tracking-[0.2em]">
                  {type === 'tokushoho' ? '特定商取引法に基づく表記' : `Last Updated: ${data?.lastUpdated}`}
                </p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-thin scrollbar-thumb-white/10">
              {type === 'tokushoho' ? (
                <div className="space-y-6">
                  {tokushoho.map((row, idx) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 border-b border-white/5 pb-4">
                      <div className="text-xs md:text-sm font-bold text-cyan-400 uppercase tracking-wider">
                        {row.label}
                      </div>
                      <div className="md:col-span-2 text-sm text-zinc-200 font-medium">
                        {row.value}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                data?.sections.map((section, idx) => (
                  <section key={idx} className="space-y-3">
                    <h3 className="text-lg font-bold text-yellow-400 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 bg-yellow-400 rotate-45" />
                       {section.title}
                    </h3>
                    <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-medium">
                      {section.content}
                    </p>
                  </section>
                ))
              )}

              <div className="pt-8 border-t border-white/10 text-center">
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">
                  © 2026 NEXT HARU. ALL RIGHTS RESERVED.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
