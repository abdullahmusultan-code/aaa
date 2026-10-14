import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CuteCat } from './CuteCat';
import { soundManager } from '../utils/soundEffects';
import { Nickname } from '../types';
import { Sparkles, Heart, Coffee, Moon, Flame } from 'lucide-react';
import kittenImg from '../assets/images/cozy_sleeping_kitten_1791993878475.jpg';

interface PamperSalonProps {
  nickname: Nickname;
}

type PamperItem = 'champi' | 'tea' | 'blanket' | 'chocolate' | 'sleep';

export const PamperSalon: React.FC<PamperSalonProps> = ({ nickname }) => {
  const [activeTreatment, setActiveTreatment] = useState<PamperItem>('champi');
  const [champiCount, setChampiCount] = useState<number>(0);
  const [servedTreat, setServedTreat] = useState<string | null>(null);

  const handleGiveChampi = () => {
    setChampiCount((c) => c + 1);
    soundManager.playPurr();
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(60);
    }
  };

  const handleSelectTreatment = (type: PamperItem, message: string) => {
    setActiveTreatment(type);
    setServedTreat(message);
    soundManager.playSweetChime();
  };

  return (
    <div className="py-8 px-4 max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C92A57] mb-1 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          VIP Rest & Recovery Spa
        </span>
        <h1 className="text-3xl font-extrabold text-[#751B35] font-serif-love">
          Virtual Champi & Pamper Bar
        </h1>
        <p className="text-sm text-[#8D6574] mt-1 max-w-md mx-auto">
          Mehmaan chale gaye, ab sirf aapki khidmat ka waqt hai. Tap treatments to spoil {nickname}!
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="bg-white/85 border border-[#FCD6E2] rounded-3xl p-6 md:p-8 shadow-sm max-w-2xl mx-auto mb-8">
        {/* Cat Avatar with dynamic animation */}
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          {activeTreatment === 'blanket' || activeTreatment === 'sleep' ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-52 h-52 rounded-2xl overflow-hidden shadow-md border-2 border-pink-200"
            >
              <img
                src={kittenImg}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/cozy_sleeping_kitten.jpg';
                }}
                alt="Cozy sleeping baby kitten wrapped in blanket"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-xs text-[11px] font-bold text-[#6B1B32] text-center py-1 rounded-lg">
                Sleeping peacefully under warm blanket 💤
              </div>
            </motion.div>
          ) : activeTreatment === 'champi' ? (
            <div className="relative cursor-pointer select-none" onClick={handleGiveChampi}>
              <CuteCat mood="massage" size={170} />
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-2xl animate-bounce">
                💆‍♀️
              </div>
            </div>
          ) : (
            <CuteCat mood="excited" size={160} />
          )}

          {/* Treatment Status Tag */}
          <div className="mt-4 text-center">
            {activeTreatment === 'champi' && (
              <div>
                <p className="text-sm font-bold text-[#6B1B32]">
                  💆‍♀️ Giving Champi to {nickname}...
                </p>
                <p className="text-xs text-[#8D6574]">
                  Tap anywhere on the cat for soft head pats & gentle champi! ({champiCount} taps)
                </p>
                <button
                  onClick={handleGiveChampi}
                  className="mt-3 px-5 py-2 rounded-full bg-[#E63956] text-white text-xs font-bold hover:bg-[#CF2946] shadow-sm transition-all cursor-pointer"
                >
                  Give Champi (Purr Sound) 🐾
                </button>
              </div>
            )}

            {activeTreatment === 'tea' && (
              <div>
                <p className="text-sm font-bold text-[#6B1B32]">
                  ☕ Garam Elaichi Chai Served!
                </p>
                <p className="text-xs text-[#8D6574]">
                  Subha se sabko chai pilayi, ab yeh cup sirf aapke sukoon ke liye hai.
                </p>
              </div>
            )}

            {activeTreatment === 'blanket' && (
              <div>
                <p className="text-sm font-bold text-[#6B1B32]">
                  🛌 Soft Fluffy Blanket Wrapped!
                </p>
                <p className="text-xs text-[#8D6574]">
                  Total warmth, zero disturbance. Soni Mano Shona is in dreamland.
                </p>
              </div>
            )}

            {activeTreatment === 'chocolate' && (
              <div>
                <p className="text-sm font-bold text-[#6B1B32]">
                  🍫 Favorite Chocolates & Sweets!
                </p>
                <p className="text-xs text-[#8D6574]">
                  A sweet dose of dopamine to instantly fix today’s grumpy mood!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pamper Menu Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
        <button
          onClick={() => handleSelectTreatment('champi', 'Head Champi in progress!')}
          className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
            activeTreatment === 'champi'
              ? 'bg-[#FFE6ED] border-[#FF8DA7] shadow-sm'
              : 'bg-white/80 border-[#FCD6E2] hover:bg-white'
          }`}
        >
          <span className="text-2xl block mb-1">💆‍♀️</span>
          <h4 className="text-xs font-bold text-[#6B1B32]">Head Champi</h4>
          <span className="text-[10px] text-[#8D6574]">Releases tension</span>
        </button>

        <button
          onClick={() => handleSelectTreatment('tea', 'Hot tea served for Mano!')}
          className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
            activeTreatment === 'tea'
              ? 'bg-[#FFF2DE] border-[#FFD166] shadow-sm'
              : 'bg-white/80 border-[#FCD6E2] hover:bg-white'
          }`}
        >
          <span className="text-2xl block mb-1">☕</span>
          <h4 className="text-xs font-bold text-[#6B1B32]">Karak Chai</h4>
          <span className="text-[10px] text-[#8D6574]">Warm & soothing</span>
        </button>

        <button
          onClick={() => handleSelectTreatment('blanket', 'Cozy warm blanket wrapped!')}
          className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
            activeTreatment === 'blanket'
              ? 'bg-[#EBF6FF] border-[#90CAF9] shadow-sm'
              : 'bg-white/80 border-[#FCD6E2] hover:bg-white'
          }`}
        >
          <span className="text-2xl block mb-1">🛌</span>
          <h4 className="text-xs font-bold text-[#6B1B32]">Warm Blanket</h4>
          <span className="text-[10px] text-[#8D6574]">Pure peace</span>
        </button>

        <button
          onClick={() => handleSelectTreatment('chocolate', 'Sweet chocolate delivery!')}
          className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
            activeTreatment === 'chocolate'
              ? 'bg-[#F2EBFF] border-[#D1B3FF] shadow-sm'
              : 'bg-white/80 border-[#FCD6E2] hover:bg-white'
          }`}
        >
          <span className="text-2xl block mb-1">🍫</span>
          <h4 className="text-xs font-bold text-[#6B1B32]">Chocolates</h4>
          <span className="text-[10px] text-[#8D6574]">Instant smile</span>
        </button>
      </div>
    </div>
  );
};
