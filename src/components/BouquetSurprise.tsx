import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/soundEffects';
import { Nickname } from '../types';
import { ArrowLeft, ArrowRight, Heart, Sparkles, Droplets } from 'lucide-react';
import bouquetImg from '../assets/images/bouquet_of_roses_1791993880978.jpg';

interface BouquetSurpriseProps {
  onBack: () => void;
  onNext: () => void;
  nickname: Nickname;
}

export const BouquetSurprise: React.FC<BouquetSurpriseProps> = ({
  onBack,
  onNext,
  nickname,
}) => {
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [bloomCount, setBloomCount] = useState<number>(0);

  const notes = [
    { text: 'You make my heart bloom', icon: '🌸' },
    { text: 'I choose you every day', icon: '💍' },
    { text: 'Life feels sweeter with you', icon: '🍯' },
    { text: 'My love for you keeps growing', icon: '🌱' },
    { text: 'You make every moment special', icon: '✨' },
    { text: 'My heart will always choose you', icon: '💖' },
  ];

  const handleBloomRoses = () => {
    setBloomCount((c) => c + 1);
    soundManager.playSweetChime([587.33, 739.99, 880, 1174.66]);

    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#E63946', '#FF758F', '#FFB3C1', '#FFF0F3'],
    });
  };

  const handleNoteClick = (noteText: string) => {
    soundManager.playBubblePop();
    setSelectedNote(noteText);
  };

  return (
    <div className="py-6 px-4 max-w-5xl mx-auto min-h-[calc(100vh-5rem)] flex flex-col justify-between">
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between border-b border-[#FCD6E2] pb-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#8D6574] hover:text-[#C92A57] px-3 py-1.5 rounded-full hover:bg-white/80 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Surprises</span>
        </button>

        <h1 className="text-2xl md:text-3xl font-extrabold text-[#751B35] font-serif-love text-center">
          Your Bouquet
        </h1>

        <button
          onClick={onNext}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#C92A57] hover:text-[#9F1E42] px-4 py-1.5 rounded-full bg-[#FFE6ED] hover:bg-[#FFD4E2] transition-colors cursor-pointer"
        >
          <span>Next Surprise</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Bouquet Area */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        {/* Left Side 3 Floating Love Cards (Matches video layout) */}
        <div className="lg:col-span-3 flex flex-col gap-4 order-2 lg:order-1">
          {notes.slice(0, 3).map((note, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => handleNoteClick(note.text)}
              className="bg-white/85 hover:bg-white border border-[#FCD6E2] rounded-2xl p-4 shadow-xs hover:shadow-md transition-all cursor-pointer text-center relative"
            >
              <span className="text-base mb-1 block">{note.icon}</span>
              <p className="text-sm font-semibold text-[#6B1B32] font-script text-lg">
                "{note.text}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* Center: The Lush Rose Bouquet */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative group w-72 sm:w-84 md:w-96 rounded-3xl p-3 bg-gradient-to-b from-[#FFF0F4] to-[#FFE0E9] border-2 border-[#F9CAD7] shadow-xl overflow-hidden"
          >
            {/* Lace ribbon corner accent */}
            <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-bold text-[#C92A57] border border-[#FCD6E2] shadow-xs flex items-center gap-1.5">
              <Heart className="w-3 h-3 fill-[#C92A57]" />
              <span>For My {nickname}</span>
            </div>

            {/* Generated Bouquet Image */}
            <div className="w-full aspect-square rounded-2xl overflow-hidden relative shadow-inner">
              <img
                src={bouquetImg}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/bouquet_of_roses.jpg';
                }}
                alt="A lush romantic bouquet of fresh red roses for Soni, Mano and Shona"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gentle glimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Interactive Bloom Button */}
            <div className="mt-3 flex items-center justify-between px-2">
              <span className="text-xs text-[#8D6574] font-medium">
                {bloomCount > 0 ? `Bloomed with love ${bloomCount} times 💕` : 'Click to send fresh petals!'}
              </span>
              <button
                onClick={handleBloomRoses}
                className="px-3.5 py-1.5 rounded-full bg-[#E63956] text-white text-xs font-bold hover:bg-[#CF2946] transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bloom Petals</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Side 3 Floating Love Cards (Matches video layout) */}
        <div className="lg:col-span-3 flex flex-col gap-4 order-3">
          {notes.slice(3, 6).map((note, idx) => (
            <motion.div
              key={idx + 3}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * (idx + 3), duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => handleNoteClick(note.text)}
              className="bg-white/85 hover:bg-white border border-[#FCD6E2] rounded-2xl p-4 shadow-xs hover:shadow-md transition-all cursor-pointer text-center relative"
            >
              <span className="text-base mb-1 block">{note.icon}</span>
              <p className="text-sm font-semibold text-[#6B1B32] font-script text-lg">
                "{note.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sweet popup card when clicking any quote */}
      <AnimatePresence>
        {selectedNote && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-md border border-[#F9CAD7] rounded-2xl p-4 shadow-xl max-w-md w-[90%] text-center"
          >
            <p className="text-xs uppercase font-bold text-[#C92A57] tracking-wider mb-1">
              Note for {nickname}
            </p>
            <p className="text-sm text-[#5F192E] font-medium font-serif-love">
              "{selectedNote}"
            </p>
            <p className="text-xs text-[#8D6574] mt-1">
              Ghar ka sara shor aur thakan is pure rose bouquet ke samne kuch bhi nahi hai. You deserve all the peace in this world!
            </p>
            <button
              onClick={() => setSelectedNote(null)}
              className="mt-2.5 text-[11px] font-bold text-[#A6274D] hover:underline cursor-pointer"
            >
              Close Note ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
