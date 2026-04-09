import React, { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, X } from 'lucide-react';

interface PayPalCheckoutProps {
  amount: string;       // "3.99" or "9.99"
  description: string;  // 구매 설명 텍스트
  customId: string;     // 유저 ID와 구매 아이템 식별자 (예: "uid_pass" 또는 "uid_charName")
  onSuccess: () => void;
  onCancel?: () => void;
}

export default function PayPalCheckout({ amount, description, customId, onSuccess, onCancel }: PayPalCheckoutProps) {
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {/* 결제 정보 표시 */}
      <div className="bg-black/30 rounded-xl p-3 border border-amber-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Secure Payment</span>
          </div>
          <span className="text-lg font-black text-amber-400">${amount}</span>
        </div>
        <p className="text-xs text-zinc-500 mt-1 truncate">{description}</p>
      </div>

      {/* PayPal 버튼 */}
      <div className="paypal-button-container rounded-xl overflow-hidden">
        <PayPalButtons
          style={{
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'paypal',
            height: 45,
          }}
          createOrder={(_data, actions) => {
            setError(null);
            setIsPaying(true);
            return actions.order.create({
              intent: 'CAPTURE',
              purchase_units: [{
                amount: {
                  currency_code: 'USD',
                  value: amount,
                },
                description: description,
                custom_id: customId,
              }],
            });
          }}
          onApprove={async (_data, actions) => {
            try {
              const details = await actions.order!.capture();
              if (details.status === 'COMPLETED') {
                setIsPaying(false);
                onSuccess();
              }
            } catch (err) {
              setError('Payment capture failed. Please try again.');
              setIsPaying(false);
            }
          }}
          onCancel={() => {
            setIsPaying(false);
            onCancel?.();
          }}
          onError={(err) => {
            console.error('PayPal error:', err);
            setError('Payment failed. Please try again.');
            setIsPaying(false);
          }}
        />
      </div>

      {/* 에러 표시 */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-red-500/10 border border-red-500/30 p-3 rounded-xl text-red-400 text-xs font-bold text-center"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 로딩 오버레이 */}
      {isPaying && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold">
            <div className="w-3 h-3 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            Processing...
          </div>
        </div>
      )}
    </div>
  );
}
