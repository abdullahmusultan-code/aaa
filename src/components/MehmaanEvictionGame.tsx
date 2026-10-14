import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/soundEffects';
import { Nickname } from '../types';
import { Sparkles, Trophy, RotateCcw, Volume2, ShieldAlert } from 'lucide-react';

interface MehmaanEvictionGameProps {
  nickname: Nickname;
}

interface Target {
  id: number;
  type: 'kid_phone' | 'aunty_rishta' | 'kid_sofa' | 'uncle_css';
  name: string;
  dialogue: string;
  emoji: string;
  remedy: string;
  x: number; // percentage
  y: number; // percentage
  evicted: boolean;
}

export const MehmaanEvictionGame: React.FC<MehmaanEvictionGameProps> = ({ nickname }) => {
  const [score, setScore] = useState<number>(0);
  const [flyingChappal, setFlyingChappal] = useState<{ x: number; y: number } | null>(null);
  const [targets, setTargets] = useState<Target[]>([]);
  const [gameActive, setGameActive] = useState<boolean>(true);
  const [lastEvictedMsg, setLastEvictedMsg] = useState<string>(
    'Tap on the mehmaan and annoying kids popping up to eject them with a flying chappal!'
  );

  const characterTypes = [
    {
      type: 'kid_phone' as const,
      name: 'Toofan Bacha',
      dialogue: '“Baji phone do na game khelna hai!”',
      emoji: '👦📱',
      remedy: 'Candy & Math Homework phenk ke maari!',
    },
    {
      type: 'aunty_rishta' as const,
      name: 'Curious Aunty',
      dialogue: '“Beta shadi kab kar rahi ho?”',
      emoji: '🧕👀',
      remedy: 'Samosa de ke munh band karwaya!',
    },
    {
      type: 'kid_sofa' as const,
      name: 'Muddy Shoes Kid',
      dialogue: '“Main to sofa pe jump karunga!”',
      emoji: '🏃👟',
      remedy: 'Cushion maar ke drawing room se bahir!',
    },
    {
      type: 'uncle_css' as const,
      name: 'Lecturer Uncle',
      dialogue: '“Beta government job ke liye apply karo”',
      emoji: '👨‍🦳📰',
      remedy: 'Cricket match laga ke TV room bhej diya!',
    },
  ];

  // Spawn targets periodically
  useEffect(() => {
    if (!gameActive) return;

    const interval = window.setInterval(() => {
      setTargets((prev) => {
        // Keep max 4 targets at once
        const activeCount = prev.filter((t) => !t.evicted).length;
        if (activeCount >= 4) return prev;

        const char = characterTypes[Math.floor(Math.random() * characterTypes.length)];
        const newTarget: Target = {
          id: Date.now() + Math.random(),
          type: char.type,
          name: char.name,
          dialogue: char.dialogue,
          emoji: char.emoji,
          remedy: char.remedy,
          x: 10 + Math.random() * 75,
          y: 15 + Math.random() * 65,
          evicted: false,
        };
        return [...prev.slice(-6), newTarget];
      });
    }, 1100);

    return () => clearInterval(interval);
  }, [gameActive]);

  const handleEvict = (target: Target, e: React.MouseEvent) => {
    // Slap sound & boing
    soundManager.playChappalSlap();
    soundManager.playBoing();

    // Trigger flying chappal animation at click coordinates
    const rect = e.currentTarget.getBoundingClientRect();
    setFlyingChappal({ x: rect.left + rect.width / 2, y: rect.top });
    setTimeout(() => setFlyingChappal(null), 400);

    setLastEvictedMsg(`💥 EVICTED: ${target.name} (${target.remedy})`);

    setTargets((prev) =>
      prev.map((t) => (t.id === target.id ? { ...t, evicted: true } : t))
    );

    setScore((s) => {
      const newScore = s + 1;
      if (newScore === 15) {
        soundManager.playSweetChime();
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#E63956', '#FFD166', '#06D6A0', '#118AB2'],
        });
      }
      return newScore;
    });
  };

  const resetGame = () => {
    setScore(0);
    setTargets([]);
    setLastEvictedMsg('Round reset! Empty the living room again.');
    soundManager.playSweetChime();
  };

  return (
    <div className="py-8 px-4 max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C92A57] mb-1 inline-flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5" />
          Hilarious Desi Mini-Game
        </span>
        <h1 className="text-3xl font-extrabold text-[#751B35] font-serif-love">
          Mehmaan & Bachay Eviction Cannon 🚀
        </h1>
        <p className="text-sm text-[#8D6574] mt-1 max-w-md mx-auto">
          Tap fast on anyone disturbing {nickname}'s peace! Har tap pe flying chappal se bedakhal karein.
        </p>
      </div>

      {/* Scoreboard & Status Bar */}
      <div className="bg-white/85 border border-[#FCD6E2] rounded-2xl p-4 mb-6 shadow-xs max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#6B1B32]">
              EVICTION SCORE:
            </span>
            <span className="text-base font-extrabold text-[#C92A57] font-mono tabular-nums">
              {score} Mehmaan Sent Home 🏠
            </span>
          </div>
          <p className="text-xs text-[#8D6574] mt-1 font-medium truncate max-w-sm">
            {lastEvictedMsg}
          </p>
        </div>

        <button
          onClick={resetGame}
          className="px-3.5 py-1.5 rounded-full bg-[#FFE5ED] text-[#C92A57] hover:bg-[#FFD1E0] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restart Round</span>
        </button>
      </div>

      {/* The Living Room Arena */}
      <div className="relative w-full h-96 sm:h-[420px] bg-gradient-to-b from-[#FFF5F8] via-[#FFEBF1] to-[#FFDEE9] rounded-3xl border-2 border-[#F9CAD7] shadow-inner overflow-hidden select-none">
        {/* Living Room Background elements (Sofa, Curtain, TV) */}
        <div className="absolute bottom-4 left-6 text-5xl opacity-40 pointer-events-none">
          🛋️
        </div>
        <div className="absolute top-4 left-6 text-4xl opacity-30 pointer-events-none">
          🪴
        </div>
        <div className="absolute bottom-4 right-8 text-5xl opacity-40 pointer-events-none">
          📺
        </div>
        <div className="absolute top-4 right-10 text-4xl opacity-30 pointer-events-none">
          🚪
        </div>

        {/* Center Room Peace Indicator */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xs px-3.5 py-1 rounded-full text-[11px] font-bold text-[#A6274D] border border-pink-200 shadow-xs flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>Mano & Shona's VIP Living Room</span>
        </div>

        {/* Active Targets popping up */}
        <AnimatePresence>
          {targets
            .filter((t) => !t.evicted)
            .map((target) => (
              <motion.div
                key={target.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.1, 1], opacity: 1 }}
                exit={{ scale: 1.4, opacity: 0, y: -40, rotate: 25 }}
                transition={{ duration: 0.25 }}
                style={{
                  position: 'absolute',
                  left: `${target.x}%`,
                  top: `${target.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={(e) => handleEvict(target, e)}
                className="cursor-pointer group z-20 flex flex-col items-center"
              >
                {/* Speech Bubble */}
                <div className="bg-white/95 border border-pink-200 text-[#4A3B43] px-2.5 py-1 rounded-xl text-[10px] font-bold shadow-md whitespace-nowrap mb-1 animate-bounce group-hover:bg-rose-50">
                  {target.dialogue}
                </div>

                {/* Character Button */}
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-white border-2 border-[#FFA5B9] group-hover:border-[#FF4B72] shadow-md group-hover:shadow-lg flex flex-col items-center justify-center p-1 transition-transform group-hover:scale-110 active:scale-90">
                  <span className="text-2xl sm:text-3xl">{target.emoji}</span>
                  <span className="text-[9px] font-bold text-[#8E2848] truncate max-w-full">
                    {target.name}
                  </span>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>

        {/* Empty state if all evicted */}
        {targets.filter((t) => !t.evicted).length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-5xl mb-2 animate-bounce">🕊️</span>
            <p className="text-sm font-bold text-[#751B35] font-serif-love">
              Ghar mein khamoshi aur sukoon hai!
            </p>
            <p className="text-xs text-[#8D6574]">
              Wait for incoming mehmaan or celebrate peace!
            </p>
          </div>
        )}

        {/* Flying Chappal visual effect */}
        {flyingChappal && (
          <motion.div
            initial={{ scale: 0.5, rotate: -45, opacity: 1 }}
            animate={{ scale: 1.5, rotate: 180, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed z-50 text-4xl pointer-events-none"
            style={{ left: flyingChappal.x, top: flyingChappal.y }}
          >
            🩴💥
          </motion.div>
        )}
      </div>

      {/* Bottom Achievement / Reward */}
      {score >= 10 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center max-w-lg mx-auto"
        >
          <div className="flex items-center justify-center gap-2 text-emerald-800 font-bold text-sm">
            <Trophy className="w-4 h-4 text-emerald-600" />
            <span>Title Unlocked: "Mehmaan Banishment Champion" 🏆</span>
          </div>
          <p className="text-xs text-emerald-700 mt-1">
            Mano aur Shona ne poore drawing room ko akele defend kiya! Abdullah ki taraf se free treat reserved hai!
          </p>
        </motion.div>
      )}
    </div>
  );
};
