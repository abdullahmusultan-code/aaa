import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/soundEffects';
import { Nickname } from '../types';
import { Sparkles, RotateCcw, Volume2, ShieldCheck, Heart } from 'lucide-react';

interface BubblePopperProps {
  nickname: Nickname;
}

interface BubbleItem {
  id: number;
  message: string;
  popped: boolean;
  color: string;
}

export const BubblePopper: React.FC<BubblePopperProps> = ({ nickname }) => {
  const initialMessages = [
    'Mehmaan chale gaye! 🎉',
    'Bachon ka shor band 🤫',
    `${nickname} is safe now 🌸`,
    'No more serving tea ☕',
    'Silence & Peace 🌿',
    'Patience Level: 100 👑',
    'Headache vanished 💫',
    'Warm blanket ready 🛌',
    'Champi time unlocked 💆‍♀️',
    'Ice cream on the way 🍨',
    'Deep breath in... 🍃',
    'Queen of my heart 💖',
    'Bache bhag gaye! 🏃‍♂️💨',
    'Exhaustion melting 🫠',
    'You handled it like a pro ✨',
    'Soft lofi vibes only 🎶',
    'Aap meri favorite ho 🌷',
    'No more kitchen duties 🚫',
    'Hugs incoming 🤗',
    'Peace restored 🕊️',
    'Smile please! 😊',
    'My sweetest girl 💕',
    'Relax and stretch 🧘‍♀️',
    '100% Love & Care ❤️',
  ];

  const colors = [
    'from-pink-100 to-pink-200 border-pink-300 text-pink-700',
    'from-rose-100 to-rose-200 border-rose-300 text-rose-700',
    'from-amber-100 to-amber-200 border-amber-300 text-amber-800',
    'from-purple-100 to-purple-200 border-purple-300 text-purple-700',
    'from-teal-100 to-teal-200 border-teal-300 text-teal-800',
  ];

  const [bubbles, setBubbles] = useState<BubbleItem[]>(() =>
    initialMessages.map((msg, idx) => ({
      id: idx,
      message: msg,
      popped: false,
      color: colors[idx % colors.length],
    }))
  );

  const [lastMessage, setLastMessage] = useState<string>(
    'Pop a bubble to crush today’s exhaustion and guest noise!'
  );

  const poppedCount = bubbles.filter((b) => b.popped).length;

  const handlePop = (id: number) => {
    soundManager.playBubblePop();
    const target = bubbles.find((b) => b.id === id);
    if (!target || target.popped) return;

    setLastMessage(target.message);

    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );

    // If this is the last bubble popped
    if (poppedCount + 1 === bubbles.length) {
      soundManager.playSweetChime();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF6B8B', '#FFA5B9', '#FFD166', '#A0E7E5'],
      });
      setLastMessage(`🎉 ALL FATIGUE CRUSHED! ${nickname} is fully recharged and pampered!`);
    }
  };

  const handleReset = () => {
    soundManager.playSweetChime();
    setBubbles((prev) => prev.map((b) => ({ ...b, popped: false })));
    setLastMessage('Fresh sheet ready! Pop as much as you like.');
  };

  return (
    <div className="py-8 px-4 max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C92A57] mb-1 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Anti-Mehmaan & Kids Stress Buster
        </span>
        <h1 className="text-3xl font-extrabold text-[#751B35] font-serif-love">
          De-Stress Bubble Wrap
        </h1>
        <p className="text-sm text-[#8D6574] mt-1 max-w-md mx-auto">
          Subha se shor sun sun kar thak gayi hain? Har bubble ko pop karein aur apna mood refresh karein!
        </p>
      </div>

      {/* Progress & Live Feed */}
      <div className="bg-white/80 border border-[#FCD6E2] rounded-2xl p-4 mb-6 shadow-xs max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#6B1B32]">
              Stress Relief Progress:
            </span>
            <span className="text-xs font-mono font-bold text-[#C92A57]">
              {poppedCount}/{bubbles.length} Popped
            </span>
          </div>
          <p className="text-xs text-[#8D6574] mt-0.5 truncate max-w-xs font-medium">
            "{lastMessage}"
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-3.5 py-1.5 rounded-full bg-[#FFE5ED] text-[#C92A57] hover:bg-[#FFD1E0] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>New Bubble Sheet</span>
        </button>
      </div>

      {/* 24 Satisfying Popping Bubbles Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 max-w-2xl mx-auto">
        {bubbles.map((b) => (
          <motion.button
            key={b.id}
            whileHover={!b.popped ? { scale: 1.05 } : {}}
            whileTap={!b.popped ? { scale: 0.9 } : {}}
            onClick={() => handlePop(b.id)}
            disabled={b.popped}
            className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-2 transition-all cursor-pointer border relative select-none shadow-sm ${
              b.popped
                ? 'bg-gray-100/70 border-gray-200 text-gray-400 opacity-60 scale-95 shadow-inner'
                : 'bg-gradient-to-b from-white to-[#FFF0F4] border-[#FBC5D6] hover:border-[#FF8DA7] shadow-[#FFD4E2]'
            }`}
          >
            {/* 3D bubble reflection highlight */}
            {!b.popped && (
              <div className="absolute top-1.5 left-2 w-3 h-1.5 bg-white rounded-full opacity-80 pointer-events-none" />
            )}

            <span className="text-xl sm:text-2xl mb-1">
              {b.popped ? '💨' : '🫧'}
            </span>

            <span className="text-[10px] font-bold text-center leading-tight line-clamp-2 px-1 text-[#6B1B32]">
              {b.popped ? b.message : `Pop #${b.id + 1}`}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Bottom Tip */}
      <div className="mt-8 text-center text-xs text-[#8D6574]">
        Each bubble sends realistic satisfying sound waves to calm your nerves. Pop them all!
      </div>
    </div>
  );
};
