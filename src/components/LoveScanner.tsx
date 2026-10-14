import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { CuteCat, CatMood } from './CuteCat';
import { soundManager } from '../utils/soundEffects';
import { Nickname } from '../types';
import { Sparkles, Heart } from 'lucide-react';

interface LoveScannerProps {
  onScanComplete: () => void;
  nickname: Nickname;
}

export const LoveScanner: React.FC<LoveScannerProps> = ({
  onScanComplete,
  nickname,
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [scanMessage, setScanMessage] = useState<string>('Tap & hold to scan your love');
  const [catMood, setCatMood] = useState<CatMood>('curious');
  const scanIntervalRef = useRef<number | null>(null);

  // Message & mood updates based on progress
  useEffect(() => {
    if (progress === 0) {
      setScanMessage(`Tap & hold to scan love for ${nickname}`);
      setCatMood('curious');
    } else if (progress < 25) {
      setScanMessage('Checking your feelings...');
      setCatMood('blushing');
    } else if (progress < 55) {
      setScanMessage('Something is happening... 👀');
      setCatMood('excited');
    } else if (progress < 75) {
      setScanMessage("Okayyy... that's a LOT of love!");
      setCatMood('in_love');
    } else if (progress < 100) {
      setScanMessage('Love level is getting serious 💕');
      setCatMood('in_love');
    } else {
      setScanMessage(`LOVE DETECTED! 100000% FOR ${nickname.toUpperCase()} 💕`);
      setCatMood('hug');
    }
  }, [progress, nickname]);

  const startScanning = () => {
    if (isCompleted) return;
    setIsScanning(true);

    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);

    // Initial heartbeat
    soundManager.playHeartbeat();

    scanIntervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
          handleCompletion();
          return 100;
        }

        const next = Math.min(100, prev + 2);
        // Play scan feedback
        if (next % 10 === 0) {
          soundManager.playHeartbeat(60 + next * 0.8);
        }
        soundManager.playScanBeep(next);
        return next;
      });
    }, 45);
  };

  const stopScanning = () => {
    if (isCompleted) return;
    setIsScanning(false);
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    // If not complete, slowly decay back
    if (progress < 100) {
      const decay = window.setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(decay);
            return 0;
          }
          return Math.max(0, prev - 5);
        });
      }, 50);
    }
  };

  const handleCompletion = () => {
    setIsScanning(false);
    setIsCompleted(true);
    soundManager.playSweetChime();

    // Trigger sweet confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF6B8B', '#FFA5B9', '#FFD166', '#FF85A1'],
    });

    // Vibration if supported
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([100, 50, 150]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4.5rem)] px-4 py-8 max-w-xl mx-auto text-center">
      {/* Cute corner decorations */}
      <div className="absolute top-20 left-6 pointer-events-none hidden sm:block animate-float-slow opacity-80">
        <span className="text-3xl">🎀</span>
      </div>
      <div className="absolute top-20 right-6 pointer-events-none hidden sm:block animate-float-slow opacity-80" style={{ animationDelay: '1.5s' }}>
        <span className="text-3xl">🎀</span>
      </div>

      {/* Cat Animation at Top */}
      <div className="mb-4">
        <CuteCat mood={catMood} size={150} />
      </div>

      {/* Dynamic Status Text */}
      <motion.h2
        key={scanMessage}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl md:text-2xl font-bold text-[#8E2848] mb-1 font-serif-love min-h-[2rem]"
      >
        {scanMessage}
      </motion.h2>

      {/* Percentage Counter */}
      <div className="text-2xl md:text-3xl font-extrabold text-[#C92A57] mb-6 tabular-nums tracking-wider">
        {progress}%
      </div>

      {/* Fingerprint Heart Scanner Container */}
      <div className="relative my-2 select-none">
        {/* Pulsing ring while scanning */}
        <div
          className={`absolute -inset-4 rounded-full transition-opacity duration-300 pointer-events-none ${
            isScanning ? 'opacity-100 bg-[#FFD1E0]/50 animate-ping' : 'opacity-0'
          }`}
        />

        <div
          onMouseDown={startScanning}
          onMouseUp={stopScanning}
          onMouseLeave={stopScanning}
          onTouchStart={startScanning}
          onTouchEnd={stopScanning}
          role="button"
          tabIndex={0}
          aria-label="Hold to scan love"
          className={`relative w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-white border-4 border-[#FFA5B9] shadow-lg flex items-center justify-center cursor-pointer transition-transform duration-200 active:scale-95 ${
            isScanning ? 'scale-105 border-[#FF4B72] shadow-pink-200 shadow-xl' : 'hover:scale-102'
          }`}
        >
          {/* Heart Outline & Liquid Fill SVG */}
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath id="heart-clip">
                  <path d="M 50,30 C 50,15 35,5 20,15 C 5,25 5,45 20,60 L 50,90 L 80,60 C 95,45 95,25 80,15 C 65,5 50,15 50,30 Z" />
                </clipPath>
                <linearGradient id="liquid-grad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#C92A57" />
                  <stop offset="100%" stopColor="#FF6B8B" />
                </linearGradient>
              </defs>

              {/* Heart Background Fill Outline */}
              <path
                d="M 50,30 C 50,15 35,5 20,15 C 5,25 5,45 20,60 L 50,90 L 80,60 C 95,45 95,25 80,15 C 65,5 50,15 50,30 Z"
                fill="#FFF0F5"
                stroke="#FF8DA7"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {/* Liquid rising inside heart */}
              <g clipPath="url(#heart-clip)">
                <rect
                  x="0"
                  y={100 - progress}
                  width="100"
                  height={progress}
                  fill="url(#liquid-grad)"
                  className="transition-all duration-75 ease-out"
                />
              </g>

              {/* Fingerprint ridges inside heart */}
              <g
                stroke={progress > 60 ? '#FFFFFF' : '#FF6B8B'}
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
                opacity={0.85}
              >
                {/* Center loop */}
                <path d="M 50 35 C 44 35, 42 42, 42 48 C 42 54, 46 62, 50 68 C 54 62, 58 54, 58 48 C 58 42, 56 35, 50 35" />
                {/* Inner Arch */}
                <path d="M 50 28 C 40 28, 36 38, 36 48 C 36 58, 42 68, 50 76 C 58 68, 64 58, 64 48 C 64 38, 60 28, 50 28" />
                {/* Outer Arch */}
                <path d="M 50 21 C 35 21, 30 34, 30 48 C 30 63, 38 74, 50 83 C 62 74, 70 63, 70 48 C 70 34, 65 21, 50 21" />
              </g>
            </svg>
          </div>

          {/* Touch scanner hint */}
          <div className="absolute bottom-3 text-[10px] font-bold text-[#C92A57] tracking-widest uppercase">
            {isCompleted ? 'Unlocked' : isScanning ? 'Keep Holding...' : 'Hold Finger'}
          </div>
        </div>
      </div>

      {/* Subtext and Action Button */}
      <div className="mt-8">
        {!isCompleted ? (
          <p className="text-xs text-[#9B7082] max-w-sm">
            Press and keep your finger on the heart to measure the pure love and comfort ready for you today.
          </p>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Love Verification 100% Passed!
            </div>
            <button
              onClick={onScanComplete}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FF4B72] to-[#E63956] text-white font-bold text-sm shadow-md hover:shadow-lg hover:from-[#F03A62] hover:to-[#D42B47] transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              <span>Open Your Surprises</span>
              <span>🎁</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
