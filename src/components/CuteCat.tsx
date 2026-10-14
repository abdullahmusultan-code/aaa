import React from 'react';
import { motion } from 'motion/react';

export type CatMood = 
  | 'idle' 
  | 'curious' 
  | 'blushing' 
  | 'excited' 
  | 'in_love' 
  | 'hug' 
  | 'sleeping' 
  | 'massage';

interface CuteCatProps {
  mood?: CatMood;
  className?: string;
  size?: number;
}

export const CuteCat: React.FC<CuteCatProps> = ({
  mood = 'idle',
  className = '',
  size = 140,
}) => {
  if (mood === 'hug') {
    // Two cats cuddling/hugging as shown in the 100% video scene
    return (
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className={`relative inline-flex items-center justify-center ${className}`}
        style={{ width: size, height: size * 0.85 }}
      >
        <svg
          viewBox="0 0 200 170"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Floating tiny hearts around cuddle */}
          <motion.path
            animate={{ y: [-4, 4, -4], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity }}
            d="M 50 30 C 45 20, 35 25, 45 40 L 50 45 L 55 40 C 65 25, 55 20, 50 30 Z"
            fill="#FF6B8B"
          />
          <motion.path
            animate={{ y: [4, -4, 4], scale: [1, 1.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }}
            d="M 150 25 C 145 15, 135 20, 145 35 L 150 40 L 155 35 C 165 20, 155 15, 150 25 Z"
            fill="#FFA5B9"
          />

          {/* Left Cat (White/Cream) */}
          <g transform="translate(10, 20)">
            {/* Left Cat Body */}
            <path
              d="M 50 140 C 20 140, 20 70, 45 60 C 40 40, 60 30, 75 45 C 90 35, 110 45, 105 65 C 130 75, 125 140, 95 140 Z"
              fill="#FFFFFF"
              stroke="#2B2129"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Left Cat Ears */}
            <path d="M 46 56 L 36 28 L 62 42 Z" fill="#FFE3EC" stroke="#2B2129" strokeWidth="4" strokeLinejoin="round" />
            <path d="M 85 43 L 105 26 L 102 54 Z" fill="#FFE3EC" stroke="#2B2129" strokeWidth="4" strokeLinejoin="round" />
            {/* Left Cat closed happy curved eyes */}
            <path d="M 50 68 Q 58 60 66 68" stroke="#2B2129" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 80 68 Q 88 60 96 68" stroke="#2B2129" strokeWidth="3.5" strokeLinecap="round" />
            {/* Cheeks */}
            <ellipse cx="48" cy="74" rx="7" ry="5" fill="#FFB3C6" opacity="0.8" />
            <ellipse cx="98" cy="74" rx="7" ry="5" fill="#FFB3C6" opacity="0.8" />
            {/* Cat mouth */}
            <path d="M 70 76 Q 73 80 76 76 Q 79 80 82 76" stroke="#2B2129" strokeWidth="3" strokeLinecap="round" />
            {/* Hugging arm */}
            <path d="M 95 95 C 115 90, 120 105, 100 110" fill="#FFFFFF" stroke="#2B2129" strokeWidth="4" strokeLinecap="round" />
          </g>

          {/* Right Cat (Slightly warm peach/tan) */}
          <g transform="translate(75, 25)">
            {/* Right Cat Body */}
            <path
              d="M 40 135 C 15 135, 15 75, 35 65 C 32 45, 52 35, 65 48 C 80 38, 98 48, 94 68 C 115 78, 112 135, 85 135 Z"
              fill="#FFF0F5"
              stroke="#2B2129"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Ears */}
            <path d="M 37 60 L 25 35 L 50 48 Z" fill="#FFCCD8" stroke="#2B2129" strokeWidth="4" strokeLinejoin="round" />
            <path d="M 72 45 L 94 32 L 90 58 Z" fill="#FFCCD8" stroke="#2B2129" strokeWidth="4" strokeLinejoin="round" />
            {/* Eyes */}
            <path d="M 44 70 Q 51 63 58 70" stroke="#2B2129" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 70 70 Q 77 63 84 70" stroke="#2B2129" strokeWidth="3.5" strokeLinecap="round" />
            {/* Cheeks */}
            <ellipse cx="40" cy="76" rx="6" ry="4" fill="#FFA5B9" opacity="0.8" />
            <ellipse cx="88" cy="76" rx="6" ry="4" fill="#FFA5B9" opacity="0.8" />
            {/* Mouth */}
            <path d="M 60 77 Q 63 81 66 77 Q 69 81 72 77" stroke="#2B2129" strokeWidth="3" strokeLinecap="round" />
            {/* Hugging arm wrapping back */}
            <path d="M 35 95 C 15 90, 10 105, 30 110" fill="#FFF0F5" stroke="#2B2129" strokeWidth="4" strokeLinecap="round" />
          </g>

          {/* Central Heart between them */}
          <motion.path
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            d="M 100 85 C 95 75, 80 80, 95 100 L 100 106 L 105 100 C 120 80, 105 75, 100 85 Z"
            fill="#FF4B72"
          />
        </svg>
      </motion.div>
    );
  }

  // Single Cat with responsive moods
  return (
    <motion.div
      animate={
        mood === 'massage' 
          ? { y: [0, -3, 0] } 
          : mood === 'excited' 
          ? { y: [-6, 0, -6] } 
          : { y: [0, -4, 0] }
      }
      transition={{ duration: mood === 'massage' ? 0.8 : 2.5, repeat: Infinity, ease: 'easeInOut' }}
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full drop-shadow-sm select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft floating particles or stars */}
        {(mood === 'excited' || mood === 'in_love') && (
          <>
            <motion.path
              animate={{ y: [-3, -12], opacity: [0, 1, 0], scale: [0.6, 1.2, 0.5] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              d="M 35 30 L 38 38 L 46 39 L 40 45 L 42 53 L 35 48 L 28 53 L 30 45 L 24 39 L 32 38 Z"
              fill="#FFD166"
            />
            <motion.path
              animate={{ y: [-2, -10], opacity: [0, 1, 0], scale: [0.6, 1.1, 0.5] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}
              d="M 125 32 L 128 39 L 135 40 L 130 45 L 132 52 L 125 48 L 118 52 L 120 45 L 115 40 L 122 39 Z"
              fill="#FF6B8B"
            />
          </>
        )}

        {/* Cat Body */}
        <path
          d="M 40 135 C 20 135, 20 75, 45 60 C 40 40, 58 30, 72 45 C 88 35, 106 45, 102 65 C 128 75, 126 135, 96 135 Z"
          fill="#FFFFFF"
          stroke="#2C2329"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Left Ear */}
        <path d="M 44 56 L 30 26 L 58 40 Z" fill="#FFE5ED" stroke="#2C2329" strokeWidth="4" strokeLinejoin="round" />
        {/* Right Ear */}
        <path d="M 88 42 L 116 26 L 102 56 Z" fill="#FFE5ED" stroke="#2C2329" strokeWidth="4" strokeLinejoin="round" />

        {/* Eyes according to mood */}
        {mood === 'idle' && (
          <>
            <circle cx="56" cy="72" r="5" fill="#2C2329" />
            <circle cx="58" cy="70" r="1.5" fill="#FFFFFF" />
            <circle cx="88" cy="72" r="5" fill="#2C2329" />
            <circle cx="90" cy="70" r="1.5" fill="#FFFFFF" />
          </>
        )}

        {mood === 'curious' && (
          <>
            <ellipse cx="56" cy="70" rx="6" ry="7" fill="#2C2329" />
            <circle cx="58" cy="68" r="2" fill="#FFFFFF" />
            <ellipse cx="88" cy="70" rx="6" ry="7" fill="#2C2329" />
            <circle cx="90" cy="68" r="2" fill="#FFFFFF" />
          </>
        )}

        {mood === 'blushing' && (
          <>
            {/* Blushing curved smiling eyes */}
            <path d="M 50 72 Q 57 65 64 72" stroke="#2C2329" strokeWidth="4" strokeLinecap="round" />
            <path d="M 80 72 Q 87 65 94 72" stroke="#2C2329" strokeWidth="4" strokeLinecap="round" />
            {/* Paws on cheeks */}
            <ellipse cx="44" cy="78" rx="8" ry="6" fill="#FFFFFF" stroke="#2C2329" strokeWidth="3" />
            <ellipse cx="100" cy="78" rx="8" ry="6" fill="#FFFFFF" stroke="#2C2329" strokeWidth="3" />
          </>
        )}

        {(mood === 'excited' || mood === 'in_love' || mood === 'massage') && (
          <>
            {/* Joyful closed curved eyes */}
            <path d="M 50 70 Q 57 62 64 70" stroke="#2C2329" strokeWidth="4" strokeLinecap="round" />
            <path d="M 80 70 Q 87 62 94 70" stroke="#2C2329" strokeWidth="4" strokeLinecap="round" />
          </>
        )}

        {mood === 'sleeping' && (
          <>
            {/* Sleeping flat line eyes */}
            <path d="M 50 74 L 64 74" stroke="#2C2329" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 80 74 L 94 74" stroke="#2C2329" strokeWidth="3.5" strokeLinecap="round" />
            {/* ZZZ text */}
            <text x="105" y="45" fill="#F472B6" fontSize="14" fontWeight="bold">z</text>
            <text x="115" y="35" fill="#EC4899" fontSize="16" fontWeight="bold">Z</text>
          </>
        )}

        {/* Rosy Cheeks */}
        <ellipse cx="46" cy="78" rx="7" ry="4.5" fill="#FFB3C6" />
        <ellipse cx="98" cy="78" rx="7" ry="4.5" fill="#FFB3C6" />

        {/* Cute Mouth */}
        {mood === 'excited' ? (
          <path d="M 68 76 Q 72 84 76 76 Q 80 84 84 76" stroke="#2C2329" strokeWidth="3" strokeLinecap="round" fill="#FF94A8" />
        ) : (
          <path d="M 68 76 Q 72 80 76 76 Q 80 80 84 76" stroke="#2C2329" strokeWidth="3" strokeLinecap="round" />
        )}

        {/* Paws */}
        {mood === 'excited' ? (
          // Paws raised up in air!
          <>
            <ellipse cx="40" cy="54" rx="7" ry="6" fill="#FFFFFF" stroke="#2C2329" strokeWidth="3" />
            <ellipse cx="104" cy="54" rx="7" ry="6" fill="#FFFFFF" stroke="#2C2329" strokeWidth="3" />
          </>
        ) : mood !== 'blushing' ? (
          // Resting paws on chest / lap
          <>
            <ellipse cx="58" cy="105" rx="7" ry="5.5" fill="#FFFFFF" stroke="#2C2329" strokeWidth="3" />
            <ellipse cx="86" cy="105" rx="7" ry="5.5" fill="#FFFFFF" stroke="#2C2329" strokeWidth="3" />
          </>
        ) : null}

        {/* Whisker details */}
        <line x1="32" y1="74" x2="20" y2="72" stroke="#2C2329" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="33" y1="78" x2="22" y2="82" stroke="#2C2329" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="112" y1="74" x2="124" y2="72" stroke="#2C2329" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="111" y1="78" x2="122" y2="82" stroke="#2C2329" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
};
