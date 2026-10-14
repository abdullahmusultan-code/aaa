import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Nickname } from '../types';
import { soundManager } from '../utils/soundEffects';
import { ArrowLeft, Heart, Sparkles, Copy, Check, Edit3, Save } from 'lucide-react';

interface LetterSurpriseProps {
  onBack: () => void;
  nickname: Nickname;
  onGoToPamper: () => void;
}

export const LetterSurprise: React.FC<LetterSurpriseProps> = ({
  onBack,
  nickname,
  onGoToPamper,
}) => {
  const defaultLetter = `Meri pyari ${nickname},

You make my life feel more beautiful and meaningful, and I feel so lucky to have you. I love you wholeheartedly, and I can't wait to continue loving you for the rest of my life.

I know today was crazy tiring—subha se mehmaan aur shor machate bachon ne aapko boht zyada exhaust kar diya. You handled everything with so much patience and grace, but I know how heavy your head feels right now.

Now the guests are gone, the noise is outside, and this cozy space is just for you. Close your eyes for a moment, take a deep breath in, and let all that fatigue melt away.

Aap meri sab se pyari Soni ho, meri sweetest Mano ho, aur mera cute sa Shona ho. Whenever you feel tired, remember you have me to lean on, pamper you, and make you smile.

Thank you for being you and for filling my heart with so much pure love.

Always, forever. ❤️`;

  const [letterContent, setLetterContent] = useState<string>(defaultLetter);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [hugCount, setHugCount] = useState<number>(0);

  const handleSendHug = () => {
    setHugCount((c) => c + 1);
    soundManager.playSweetChime();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF6B8B', '#FFA5B9', '#FF4B72'],
    });

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([80, 40, 80]);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(letterContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-6 px-4 max-w-4xl mx-auto min-h-[calc(100vh-5rem)] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#FCD6E2] pb-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#8D6574] hover:text-[#C92A57] px-3 py-1.5 rounded-full hover:bg-white/80 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Surprises</span>
        </button>

        <h1 className="text-2xl md:text-3xl font-extrabold text-[#751B35] font-serif-love text-center">
          A Letter From My Heart
        </h1>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-1 text-xs font-semibold text-[#8D6574] hover:text-[#C92A57] px-3 py-1.5 rounded-full bg-white/80 border border-[#FCD6E2] hover:bg-white transition-colors cursor-pointer"
          >
            {isEditing ? <Save className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
            <span>{isEditing ? 'Done' : 'Edit'}</span>
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs font-semibold text-[#8D6574] hover:text-[#C92A57] px-3 py-1.5 rounded-full bg-white/80 border border-[#FCD6E2] hover:bg-white transition-colors cursor-pointer"
            title="Copy letter to send on WhatsApp"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Parchment Lined Letter (Exact match to video aesthetic) */}
      <div className="relative my-auto max-w-2xl mx-auto w-full">
        {/* Soft pink border frame with floral stamps */}
        <div className="bg-[#FFF8F3] border-2 border-[#E8CDBC] rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden bg-lined-paper">
          {/* Top red ribbon stamp */}
          <div className="flex justify-between items-center mb-6 border-b border-[#F0D5C5] pb-3">
            <span className="text-xs font-serif-love italic text-[#B34B6B]">
              Written with all my heart
            </span>
            <span className="text-xs font-mono text-gray-400">
              For {nickname} · Special Edition
            </span>
          </div>

          {/* Letter text content or editable textarea */}
          {isEditing ? (
            <textarea
              aria-label="Edit heartfelt letter"
              value={letterContent}
              onChange={(e) => setLetterContent(e.target.value)}
              className="w-full h-80 bg-transparent text-[#4A3B43] font-script text-xl leading-relaxed p-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8DA7]"
            />
          ) : (
            <div className="text-[#3D2C34] font-script text-xl sm:text-2xl leading-relaxed space-y-4 whitespace-pre-line pl-10 pr-2">
              {letterContent}
            </div>
          )}

          {/* Bottom corner Cat with Heart (From the video!) */}
          <div className="mt-8 pt-4 border-t border-[#F0D5C5] flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Cute Cat SVG with Heart */}
              <div className="w-14 h-14 relative flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Calico / Ginger patched cute cat */}
                  <path d="M 25 80 C 15 80, 15 45, 30 38 C 26 25, 40 18, 50 28 C 60 20, 75 26, 70 40 C 85 48, 85 80, 65 80 Z" fill="#FFFFFF" stroke="#2B2129" strokeWidth="2.5" />
                  {/* Ginger patch */}
                  <path d="M 26 38 C 24 28, 38 20, 45 28 C 35 34, 30 45, 26 38 Z" fill="#FF9E64" stroke="#2B2129" strokeWidth="2" />
                  <path d="M 32 44 Q 38 38 44 44" stroke="#2B2129" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 56 44 Q 62 38 68 44" stroke="#2B2129" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Blushes */}
                  <ellipse cx="28" cy="48" rx="4" ry="2.5" fill="#FFA5B9" />
                  <ellipse cx="72" cy="48" rx="4" ry="2.5" fill="#FFA5B9" />
                  {/* Big Heart held by paws */}
                  <path d="M 50 50 C 44 42, 32 45, 42 60 L 50 67 L 58 60 C 68 45, 56 42, 50 50 Z" fill="#E63956" stroke="#2B2129" strokeWidth="2" />
                  {/* Holding paws */}
                  <circle cx="38" cy="56" r="3" fill="#FFFFFF" stroke="#2B2129" strokeWidth="2" />
                  <circle cx="62" cy="56" r="3" fill="#FFFFFF" stroke="#2B2129" strokeWidth="2" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-[#751B35]">Sent by your biggest supporter</p>
                <p className="text-[11px] text-[#8D6574]">Rest well, my favorite human 💕</p>
              </div>
            </div>

            <div className="text-right">
              <span className="font-script text-2xl font-bold text-[#A6274D]">Always, forever.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons to comfort her immediately */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handleSendHug}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FF4B72] to-[#E63956] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer hover:scale-102"
        >
          <Heart className="w-3.5 h-3.5 fill-white" />
          <span>Send Virtual Hug ({hugCount > 0 ? `${hugCount} Hugs Given` : 'Click to Hug'})</span>
        </button>

        <button
          onClick={onGoToPamper}
          className="px-5 py-2.5 rounded-full bg-white text-[#C92A57] border border-[#FCD6E2] text-xs font-bold shadow-xs hover:bg-[#FFF0F5] transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>💆‍♀️</span>
          <span>Go to Virtual Champi & Pamper Bar</span>
        </button>
      </div>
    </div>
  );
};
