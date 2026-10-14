import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/soundEffects';
import { Nickname } from '../types';
import { Sparkles, Check, Heart, Ticket } from 'lucide-react';

interface CouponsSectionProps {
  nickname: Nickname;
}

interface Coupon {
  id: string;
  title: string;
  description: string;
  icon: string;
  terms: string;
  redeemed: boolean;
}

export const CouponsSection: React.FC<CouponsSectionProps> = ({ nickname }) => {
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: 'c1',
      title: 'Queen Mode: No Cooking & No Chores Pass',
      description: 'Zero kitchen work today. Favorite food will be ordered or prepared for you without asking twice!',
      icon: '👑',
      terms: 'Valid immediately · Unlimited refills',
      redeemed: false,
    },
    {
      id: 'c2',
      title: 'VIP 30-Minute Head Champi & Massage',
      description: 'A soothing oil or gentle scalp massage to wipe out all the tension from mehmaan noise.',
      icon: '💆‍♀️',
      terms: 'Anytime you request · Guaranteed soothing',
      redeemed: false,
    },
    {
      id: 'c3',
      title: 'Late Night Ice Cream & Peaceful Drive',
      description: 'Hop in, roll down the windows, play your favorite songs, and grab your top ice cream flavor.',
      icon: '🍨',
      terms: 'No questions asked · Extra scoops included',
      redeemed: false,
    },
    {
      id: 'c4',
      title: '10-Hour Uninterrupted Deep Sleep Pass',
      description: 'Nobody is allowed to wake you up. Complete silence, dark room, fluffy blankets.',
      icon: '🛌',
      terms: 'Disturbances strictly prohibited',
      redeemed: false,
    },
    {
      id: 'c5',
      title: '"You Are 100% Right All Day" Pass',
      description: 'Win every argument instantly without presenting any evidence. Your wish is my command.',
      icon: '✨',
      terms: 'Valid 24/7 · Highly recommended',
      redeemed: false,
    },
    {
      id: 'c6',
      title: 'Unlimited Hugs & Cuddle Fortress',
      description: 'Endless tight hugs whenever you feel drained or overwhelmed. Forever available.',
      icon: '🤗',
      terms: 'Non-expiring · Warmest cuddles',
      redeemed: false,
    },
  ]);

  const handleRedeem = (id: string) => {
    soundManager.playSweetChime();
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#FF6B8B', '#FFA5B9', '#FFD166'],
    });

    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, redeemed: true } : c))
    );
  };

  const redeemedCount = coupons.filter((c) => c.redeemed).length;

  return (
    <div className="py-8 px-4 max-w-5xl mx-auto">
      {/* Title */}
      <div className="text-center mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C92A57] mb-1 inline-flex items-center gap-1.5">
          <Ticket className="w-3.5 h-3.5" />
          Pampering Passes Just For You
        </span>
        <h1 className="text-3xl font-extrabold text-[#751B35] font-serif-love">
          Love & Care Coupons
        </h1>
        <p className="text-sm text-[#8D6574] mt-1 max-w-md mx-auto">
          Tap "Redeem Voucher" on any pass to claim it directly from your partner, <span className="font-bold text-[#A6274D]">{nickname}</span>!
        </p>

        {redeemedCount > 0 && (
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE5ED] text-[#C92A57] text-xs font-bold border border-[#FCD6E2]">
            <Sparkles className="w-3 h-3" />
            <span>{redeemedCount} of {coupons.length} Vouchers Claimed!</span>
          </div>
        )}
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {coupons.map((coupon) => (
          <motion.div
            key={coupon.id}
            whileHover={{ y: -3 }}
            className={`rounded-2xl p-5 border relative overflow-hidden flex flex-col justify-between transition-all ${
              coupon.redeemed
                ? 'bg-[#FFF7F9] border-pink-300 shadow-xs'
                : 'bg-white border-[#FCD6E2] shadow-sm hover:shadow-md'
            }`}
          >
            {/* Stamp if redeemed */}
            {coupon.redeemed && (
              <div className="absolute top-3 right-3 rotate-12 border-2 border-[#E63956] text-[#E63956] font-bold text-[10px] uppercase px-2 py-0.5 rounded-sm tracking-wider bg-white/90 shadow-xs">
                CLAIMED & OWED ❤️
              </div>
            )}

            <div>
              <div className="w-12 h-12 rounded-xl bg-[#FFEBF1] text-[#C92A57] flex items-center justify-center text-2xl mb-3">
                {coupon.icon}
              </div>

              <h3 className="font-bold text-base text-[#6B1B32] mb-1.5 leading-snug">
                {coupon.title}
              </h3>
              <p className="text-xs text-[#8D6574] leading-relaxed">
                {coupon.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-dashed border-[#FCD6E2] flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#A6274D]">
                {coupon.terms}
              </span>

              <button
                onClick={() => handleRedeem(coupon.id)}
                disabled={coupon.redeemed}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  coupon.redeemed
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                    : 'bg-[#E63956] hover:bg-[#CF2946] text-white shadow-xs'
                }`}
              >
                {coupon.redeemed ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span>Claimed</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-3 h-3 fill-white" />
                    <span>Redeem</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
