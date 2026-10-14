import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { soundManager } from '../utils/soundEffects';
import { Nickname } from '../types';
import { Sparkles, Play, Pause, RotateCcw } from 'lucide-react';

interface BreathingExerciseProps {
  nickname: Nickname;
}

type Phase = 'inhale' | 'hold' | 'exhale';

export const BreathingExercise: React.FC<BreathingExerciseProps> = ({ nickname }) => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [phase, setPhase] = useState<Phase>('inhale');
  const [cycle, setCycle] = useState<number>(1);
  const [countdown, setCountdown] = useState<number>(4);

  useEffect(() => {
    if (!isActive) return;

    let timer: number;
    timer = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Switch phase
          if (phase === 'inhale') {
            setPhase('hold');
            soundManager.playHeartbeat(55);
            return 4;
          } else if (phase === 'hold') {
            setPhase('exhale');
            soundManager.playHeartbeat(45);
            return 5;
          } else {
            setPhase('inhale');
            setCycle((c) => c + 1);
            soundManager.playHeartbeat(65);
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase]);

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return {
          title: 'Inhale Peace...',
          subtitle: 'Fill your lungs with fresh calm energy',
          scale: 1.35,
          color: 'from-pink-100 to-rose-200 border-pink-300 text-[#8E2848]',
        };
      case 'hold':
        return {
          title: 'Hold Gently...',
          subtitle: 'Keep the stillness within you',
          scale: 1.35,
          color: 'from-amber-100 to-rose-100 border-amber-300 text-[#8B4513]',
        };
      case 'exhale':
        return {
          title: 'Exhale All Fatigue...',
          subtitle: 'Blow away every bit of guest noise and exhaustion',
          scale: 0.9,
          color: 'from-teal-50 to-pink-100 border-teal-200 text-[#2C6B6F]',
        };
    }
  };

  const currentInfo = getPhaseText();

  return (
    <div className="py-8 px-4 max-w-xl mx-auto text-center flex flex-col items-center justify-center min-h-[calc(100vh-6rem)]">
      <span className="text-xs font-bold uppercase tracking-wider text-[#C92A57] mb-1 inline-flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5" />
        Nervous System Reset
      </span>
      <h1 className="text-3xl font-extrabold text-[#751B35] font-serif-love mb-1">
        Breathe with Mano
      </h1>
      <p className="text-xs text-[#8D6574] mb-8 max-w-sm">
        Follow the circle rhythm to wash away physical exhaustion and tension, {nickname}.
      </p>

      {/* Breathing Circle Container */}
      <div className="relative w-64 h-64 flex items-center justify-center my-4">
        {/* Outer Aura Ring */}
        <motion.div
          animate={{ scale: currentInfo.scale }}
          transition={{ duration: phase === 'exhale' ? 5 : 4, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FFE0EB] to-[#FFF0F5] opacity-60 filter blur-md"
        />

        {/* Interactive Breathing Sphere */}
        <motion.div
          animate={{ scale: currentInfo.scale }}
          transition={{ duration: phase === 'exhale' ? 5 : 4, ease: 'easeInOut' }}
          className={`w-48 h-48 rounded-full bg-gradient-to-br ${currentInfo.color} border-4 shadow-xl flex flex-col items-center justify-center p-4 transition-colors duration-1000 select-none`}
        >
          <span className="text-3xl mb-1">
            {phase === 'inhale' ? '🌸' : phase === 'hold' ? '✨' : '🍃'}
          </span>
          <h2 className="text-base font-bold tracking-tight">
            {currentInfo.title}
          </h2>
          <span className="text-3xl font-extrabold font-mono tabular-nums my-1">
            {countdown}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">
            Cycle #{cycle}
          </span>
        </motion.div>
      </div>

      <p className="text-xs text-[#8D6574] mt-6 max-w-xs font-medium">
        {currentInfo.subtitle}
      </p>

      {/* Controls */}
      <div className="mt-8 flex items-center gap-3">
        <button
          onClick={() => setIsActive(!isActive)}
          className="px-5 py-2 rounded-full bg-[#E63956] text-white text-xs font-bold hover:bg-[#CF2946] shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
        >
          {isActive ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />}
          <span>{isActive ? 'Pause' : 'Resume'}</span>
        </button>

        <button
          onClick={() => {
            setPhase('inhale');
            setCountdown(4);
            setCycle(1);
          }}
          className="px-4 py-2 rounded-full bg-white text-[#751B35] border border-[#FCD6E2] text-xs font-bold hover:bg-[#FFF0F5] shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};
