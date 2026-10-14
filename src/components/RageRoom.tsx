import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/soundEffects';
import { Nickname } from '../types';
import { Flame, Sparkles, RotateCcw, Volume2, Shield } from 'lucide-react';

interface RageRoomProps {
  nickname: Nickname;
}

interface CrockeryItem {
  id: string;
  name: string;
  label: string;
  icon: string;
  smashed: boolean;
}

export const RageRoom: React.FC<RageRoomProps> = ({ nickname }) => {
  const initialItems: CrockeryItem[] = [
    { id: '1', name: '4th Round Chai Cup', label: '“Beta thodi cheeni kam wali chai la do”', icon: '☕', smashed: false },
    { id: '2', name: 'Rooh Afza Glass', label: '“Bache ne sofa pe gira diya”', icon: '🥤', smashed: false },
    { id: '3', name: 'Biscuit Ki Thali', label: '“Kharab karke adha chhor diya”', icon: '🍪', smashed: false },
    { id: '4', name: 'Royal Tea Pot', label: '“Subha se 6 dafa garam karwayi”', icon: '🫖', smashed: false },
    { id: '5', name: 'Samosa Plate', label: '“Khana khate waqt chutney carpet pe”', icon: '🥟', smashed: false },
    { id: '6', name: 'Hotspot Phone', label: '“Baji password kya hai game khelna hai”', icon: '📱', smashed: false },
    { id: '7', name: 'Drawing Room Cushion', label: '“Bacho ne cricket ball bana liya”', icon: '🛋️', smashed: false },
    { id: '8', name: 'Guest Bell Door', label: '“Ting Tong continuously at 10 AM”', icon: '🔔', smashed: false },
  ];

  const [items, setItems] = useState<CrockeryItem[]>(initialItems);
  const [screaming, setScreaming] = useState<boolean>(false);
  const [rageLevel, setRageLevel] = useState<number>(100);
  const [smashedCount, setSmashedCount] = useState<number>(0);

  const handleSmash = (id: string) => {
    soundManager.playPlateSmash();

    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, smashed: true } : item))
    );

    setSmashedCount((c) => c + 1);
    setRageLevel((prev) => Math.max(0, prev - 12));

    if (rageLevel - 12 <= 10) {
      soundManager.playSweetChime();
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6B8B', '#FFA5B9', '#FFD166'],
      });
    }
  };

  const handleScream = () => {
    soundManager.playBoing();
    setScreaming(true);
    setRageLevel((prev) => Math.max(0, prev - 20));
    setTimeout(() => setScreaming(false), 800);
  };

  const handleReset = () => {
    soundManager.playSweetChime();
    setItems(initialItems);
    setRageLevel(100);
    setSmashedCount(0);
  };

  return (
    <div className="py-8 px-4 max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C92A57] mb-1 inline-flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-rose-500" />
          Zero Guilt · Zero Real Broken Cups
        </span>
        <h1 className="text-3xl font-extrabold text-[#751B35] font-serif-love">
          {nickname}’s Secret Rage Room 💥
        </h1>
        <p className="text-sm text-[#8D6574] mt-1 max-w-md mx-auto">
          Mehmaan ne jo jo cup dirty kia aur jo jo tang kia, sab yahan tod phod ke apna dil halka karein!
        </p>
      </div>

      {/* Rage Meter */}
      <div className="bg-white/85 border border-[#FCD6E2] rounded-2xl p-5 mb-8 shadow-xs max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-[#6B1B32] uppercase tracking-wider">
            Frustration / Gussa Level:
          </span>
          <span className="text-xs font-mono font-bold text-[#C92A57]">
            {rageLevel}% {rageLevel > 60 ? '🔥 Angry Mano' : rageLevel > 20 ? '⚡ Cooling Down' : '🌸 100% Zen Goddess'}
          </span>
        </div>

        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden p-0.5 border border-pink-100">
          <motion.div
            className={`h-full rounded-full transition-all duration-300 ${
              rageLevel > 60
                ? 'bg-gradient-to-r from-amber-500 to-rose-600'
                : rageLevel > 20
                ? 'bg-gradient-to-r from-amber-400 to-pink-500'
                : 'bg-gradient-to-r from-teal-400 to-emerald-500'
            }`}
            style={{ width: `${rageLevel}%` }}
          />
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 pt-3 border-t border-pink-100">
          <button
            onClick={handleScream}
            className={`px-4 py-2 rounded-full font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
              screaming
                ? 'bg-rose-600 text-white scale-105'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
            }`}
          >
            <span>😱</span>
            <span>{screaming ? 'AHHHHHHHH!' : 'Scream Into Pillow'}</span>
          </button>

          <button
            onClick={handleReset}
            className="px-3.5 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Refill Breakables</span>
          </button>
        </div>
      </div>

      {/* Breakable Crockery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
        {items.map((item) => (
          <motion.div
            key={item.id}
            whileHover={!item.smashed ? { scale: 1.04 } : {}}
            whileTap={!item.smashed ? { scale: 0.92 } : {}}
            onClick={() => !item.smashed && handleSmash(item.id)}
            className={`rounded-2xl p-4 border text-center relative select-none transition-all ${
              item.smashed
                ? 'bg-gray-50 border-gray-200 opacity-50 cursor-default'
                : 'bg-white border-[#FCD6E2] shadow-sm hover:shadow-md hover:border-rose-400 cursor-pointer'
            }`}
          >
            {/* Smashed tag */}
            {item.smashed && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center">
                <span className="text-2xl">💥</span>
                <span className="text-[10px] font-extrabold text-rose-600 uppercase tracking-wider">
                  SMASHED TO BITS!
                </span>
              </div>
            )}

            <div className="text-4xl mb-2">
              {item.smashed ? '💢' : item.icon}
            </div>

            <h3 className="font-bold text-xs text-[#6B1B32] mb-1">
              {item.name}
            </h3>

            <p className="text-[10px] text-gray-500 italic leading-snug">
              {item.label}
            </p>

            <span className="mt-3 block text-[10px] font-bold text-rose-500 uppercase tracking-wider">
              {item.smashed ? 'Done' : 'Tap to Smash 🔨'}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Post-Smash Zen message */}
      {smashedCount >= 6 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 p-5 bg-[#FFF0F5] border border-pink-200 rounded-2xl text-center max-w-lg mx-auto shadow-sm"
        >
          <span className="text-3xl block mb-1">🧘‍♀️</span>
          <h4 className="font-bold text-sm text-[#751B35]">
            Mano is officially calm and unbothered!
          </h4>
          <p className="text-xs text-[#8D6574] mt-1">
            Sara gussa crockery pe nikal gaya. Now Abdullah will make you hot chocolate and treat you like a pampered princess.
          </p>
        </motion.div>
      )}
    </div>
  );
};
