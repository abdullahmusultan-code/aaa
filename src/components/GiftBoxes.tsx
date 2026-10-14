import React from 'react';
import { motion } from 'motion/react';
import { AppView, Nickname } from '../types';
import { soundManager } from '../utils/soundEffects';
import { Sparkles, Heart, Flower2, Music, Mail, SmilePlus, Coffee, Wind } from 'lucide-react';

interface GiftBoxesProps {
  onSelectSurprise: (view: AppView) => void;
  nickname: Nickname;
}

export const GiftBoxes: React.FC<GiftBoxesProps> = ({
  onSelectSurprise,
  nickname,
}) => {
  const surprises = [
    {
      id: 'bouquet' as AppView,
      title: 'Your Bouquet',
      subtitle: 'Fresh blooming roses with sweet notes for you',
      icon: '🌹',
      badge: 'Surprise 1',
    },
    {
      id: 'scrapbook' as AppView,
      title: 'Melody & Memories',
      subtitle: 'Lofi cozy music player & aesthetic scrapbook',
      icon: '🎶',
      badge: 'Surprise 2',
    },
    {
      id: 'letter' as AppView,
      title: 'A Letter From My Heart',
      subtitle: 'Warm words to ease your exhaustion & fatigue',
      icon: '💌',
      badge: 'Surprise 3',
    },
  ];

  const handleBoxClick = (view: AppView) => {
    soundManager.playSweetChime();
    onSelectSurprise(view);
  };

  return (
    <div className="py-10 px-4 max-w-5xl mx-auto text-center">
      {/* Title Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-xs font-semibold uppercase tracking-wider text-[#C92A57] mb-2 block">
          Welcome to your cozy sanctuary
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#751B35] font-serif-love mb-2">
          You passed the love test 💕
        </h1>
        <p className="text-sm md:text-base text-[#8D6574] max-w-lg mx-auto">
          Your special surprises are waiting for you, <span className="font-bold text-[#A6274D]">{nickname}</span>. Tap any gift box below to unwrap!
        </p>
      </motion.div>

      {/* 3 Main Gift Boxes from the video */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-10 mb-14">
        {surprises.map((box, idx) => (
          <motion.div
            key={box.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            onClick={() => handleBoxClick(box.id)}
            className="group cursor-pointer bg-white/80 hover:bg-white rounded-2xl p-6 border border-[#FCD6E2] shadow-sm hover:shadow-md transition-all flex flex-col items-center relative overflow-hidden"
          >
            {/* Soft pink corner gradient accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#FFE3EB]/40 to-transparent rounded-bl-full pointer-events-none" />

            <span className="text-[11px] font-semibold text-[#B34B6B] mb-3 px-2.5 py-0.5 rounded-full bg-[#FFEBF1]">
              {box.badge}
            </span>

            {/* Realistic 2D Gift Box SVG with ribbon */}
            <div className="w-28 h-28 my-2 relative flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
                {/* Box Base (Pastel baby blue like the video) */}
                <rect x="20" y="44" width="60" height="46" rx="4" fill="#D6ECFB" stroke="#90CAF9" strokeWidth="2" />
                {/* Box Lid */}
                <rect x="16" y="36" width="68" height="12" rx="3" fill="#E8F4FD" stroke="#90CAF9" strokeWidth="2" />
                {/* Vertical Ribbon */}
                <rect x="45" y="36" width="10" height="54" fill="#FF8FA3" />
                {/* Horizontal Ribbon */}
                <rect x="20" y="62" width="60" height="8" fill="#FF8FA3" />
                {/* Ribbon Bow Left */}
                <path d="M 50 36 C 36 20, 26 34, 48 36 Z" fill="#FF8FA3" stroke="#FF5C7A" strokeWidth="1" />
                {/* Ribbon Bow Right */}
                <path d="M 50 36 C 64 20, 74 34, 52 36 Z" fill="#FF8FA3" stroke="#FF5C7A" strokeWidth="1" />
                {/* Bow Center knot */}
                <circle cx="50" cy="36" r="4.5" fill="#FF5C7A" />
                {/* Ribbon tails */}
                <path d="M 48 38 L 40 48" stroke="#FF5C7A" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 52 38 L 60 48" stroke="#FF5C7A" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            <h3 className="font-bold text-lg text-[#6B1B32] mt-3 group-hover:text-[#A6274D] transition-colors">
              {box.title}
            </h3>
            <p className="text-xs text-[#8D6574] mt-1 max-w-[220px]">
              {box.subtitle}
            </p>

            <span className="mt-4 text-xs font-semibold text-[#C92A57] flex items-center gap-1 group-hover:underline">
              <span>Unwrap Box</span>
              <span>→</span>
            </span>
          </motion.div>
        ))}
      </div>

      {/* Relax & Mood Refresh Activities (Directly solving the user's stress relief brief) */}
      <div className="mt-12 pt-8 border-t border-[#FCD6E2]/80">
        <div className="flex flex-col items-center mb-6">
          <span className="text-xs font-bold text-[#A6274D] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Funny & Brand New: Mehmaan Revenge & Tantrum Lounge
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-[#5F192E]">
            Make {nickname} Smile & Laugh Instantly 😂
          </h2>
          <p className="text-xs text-[#8D6574] mt-1 max-w-md">
            Subha ke shor aur thakan ka badla lene aur mood 100% fresh karne ke liye new funny activities:
          </p>
        </div>

        {/* 4 Brand New Funny Features Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-6">
          <button
            onClick={() => onSelectSurprise('evict_game')}
            className="p-4 bg-gradient-to-br from-[#FFF0F5] to-white hover:from-white hover:to-[#FFEBF1] rounded-2xl border-2 border-rose-300 text-left transition-all hover:-translate-y-1 hover:shadow-md group cursor-pointer relative overflow-hidden"
          >
            <span className="absolute top-2 right-2 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-rose-500 text-white">
              FUNNY GAME
            </span>
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center text-xl mb-2">
              🚀
            </div>
            <h4 className="text-sm font-bold text-[#6B1B32] group-hover:text-rose-600 transition-colors">
              Evict Mehmaan Cannon
            </h4>
            <p className="text-[11px] text-[#8D6574] mt-0.5">
              Whack annoying guests with a flying chappal!
            </p>
          </button>

          <button
            onClick={() => onSelectSurprise('rage_room')}
            className="p-4 bg-gradient-to-br from-[#FFF5F0] to-white hover:from-white hover:to-[#FFF0EB] rounded-2xl border-2 border-amber-300 text-left transition-all hover:-translate-y-1 hover:shadow-md group cursor-pointer relative overflow-hidden"
          >
            <span className="absolute top-2 right-2 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-500 text-white">
              RAGE ROOM
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl mb-2">
              💥
            </div>
            <h4 className="text-sm font-bold text-[#6B1B32] group-hover:text-amber-700 transition-colors">
              Crockery Smasher
            </h4>
            <p className="text-[11px] text-[#8D6574] mt-0.5">
              Smash 10 dirty tea cups & scream into pillow!
            </p>
          </button>

          <button
            onClick={() => onSelectSurprise('fir_tribunal')}
            className="p-4 bg-gradient-to-br from-[#FFFDF0] to-white hover:from-white hover:to-[#FFFCEB] rounded-2xl border-2 border-yellow-300 text-left transition-all hover:-translate-y-1 hover:shadow-md group cursor-pointer relative overflow-hidden"
          >
            <span className="absolute top-2 right-2 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-600 text-white">
              COURT CASE
            </span>
            <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-800 flex items-center justify-center text-xl mb-2">
              ⚖️
            </div>
            <h4 className="text-sm font-bold text-[#6B1B32] group-hover:text-yellow-800 transition-colors">
              Official FIR Tribunal
            </h4>
            <p className="text-[11px] text-[#8D6574] mt-0.5">
              Official case against kids & stamp them GUILTY!
            </p>
          </button>

          <button
            onClick={() => onSelectSurprise('excuse_slot')}
            className="p-4 bg-gradient-to-br from-[#F5F0FF] to-white hover:from-white hover:to-[#F0EBFF] rounded-2xl border-2 border-purple-300 text-left transition-all hover:-translate-y-1 hover:shadow-md group cursor-pointer relative overflow-hidden"
          >
            <span className="absolute top-2 right-2 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-purple-600 text-white">
              SLOT MACHINE
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl mb-2">
              🎰
            </div>
            <h4 className="text-sm font-bold text-[#6B1B32] group-hover:text-purple-700 transition-colors">
              Desi Excuse Generator
            </h4>
            <p className="text-[11px] text-[#8D6574] mt-0.5">
              Hilarious tactical excuses to escape future visits!
            </p>
          </button>
        </div>

        {/* Extra Comfort Classics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          <button
            onClick={() => onSelectSurprise('bubble_popper')}
            className="p-3 bg-white/70 hover:bg-white rounded-xl border border-[#FCD6E2] text-left transition-all hover:-translate-y-0.5 group cursor-pointer"
          >
            <h4 className="text-xs font-bold text-[#6B1B32] group-hover:text-[#C92A57] flex items-center gap-1.5">
              <span>🫧</span>
              <span>Bubble Popper</span>
            </h4>
            <p className="text-[10px] text-[#8D6574] mt-0.5">24 sound pops</p>
          </button>

          <button
            onClick={() => onSelectSurprise('pamper_bar')}
            className="p-3 bg-white/70 hover:bg-white rounded-xl border border-[#FCD6E2] text-left transition-all hover:-translate-y-0.5 group cursor-pointer"
          >
            <h4 className="text-xs font-bold text-[#6B1B32] group-hover:text-[#C92A57] flex items-center gap-1.5">
              <span>💆‍♀️</span>
              <span>Virtual Champi</span>
            </h4>
            <p className="text-[10px] text-[#8D6574] mt-0.5">Head pats & tea</p>
          </button>

          <button
            onClick={() => onSelectSurprise('breathing')}
            className="p-3 bg-white/70 hover:bg-white rounded-xl border border-[#FCD6E2] text-left transition-all hover:-translate-y-0.5 group cursor-pointer"
          >
            <h4 className="text-xs font-bold text-[#6B1B32] group-hover:text-[#C92A57] flex items-center gap-1.5">
              <span>🫁</span>
              <span>Breathe with Mano</span>
            </h4>
            <p className="text-[10px] text-[#8D6574] mt-0.5">Calming 4-7-8 rhythm</p>
          </button>

          <button
            onClick={() => onSelectSurprise('coupons')}
            className="p-3 bg-white/70 hover:bg-white rounded-xl border border-[#FCD6E2] text-left transition-all hover:-translate-y-0.5 group cursor-pointer"
          >
            <h4 className="text-xs font-bold text-[#6B1B32] group-hover:text-[#C92A57] flex items-center gap-1.5">
              <span>🎟️</span>
              <span>Love Coupons</span>
            </h4>
            <p className="text-[10px] text-[#8D6574] mt-0.5">Redeem treats</p>
          </button>
        </div>
      </div>
    </div>
  );
};
