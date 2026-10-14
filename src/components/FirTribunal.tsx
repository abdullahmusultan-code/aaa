import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/soundEffects';
import { Nickname } from '../types';
import { Scale, Check, Copy, Stamp, Gavel, Award } from 'lucide-react';

interface FirTribunalProps {
  nickname: Nickname;
}

export const FirTribunal: React.FC<FirTribunalProps> = ({ nickname }) => {
  const [isStamped, setIsStamped] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const firText = `⚖️ OFFICIAL FIR & COURT VERDICT ⚖️
Case No: 420/2026
Police Station: Dil Ka Sukoon & Peace Thana
Judge: The Honorable Princess ${nickname}

COMPLAINANT:
${nickname} (Exhausted, Tired & Done with Mehmaan)

ACCUSED:
Subha Ke Bin-Bulaye Mehmaan & Unke 4 Shaitan Bache

CHARGES & SECTIONS:
1. Section 302-A: Mano ki pyari subha ki neend ka berahmi se qatal.
2. Section 420: Sab kuch kha peey kar aakhir mein bolna 'Namak thoda kam tha'.
3. Section 144: Sofa pe jump maar ke spring todne ka jurm.
4. Section 506: 'Beta baji phone do na game khelna hai' bol ke dimagh ki dahi banana.
5. Section 201: White cushion pe Rooh Afza gira kar chupa dena.

FINAL COURT JUDGMENT:
Mulzimaan ko foran drawing room se bedakhal kia jata hai.
${nickname} ko harjana (compensation) ke tor par:
- 1 Bucket Chocolate Ice Cream
- Full VIP Head Champi
- 24 ghante ka complete peace & queen treatment!

VERDICT: ACCUSED DECLARED 100% GUILTY!`;

  const handleStamp = () => {
    soundManager.playChappalSlap();
    soundManager.playSweetChime();
    setIsStamped(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E63956', '#D90429', '#FFD166'],
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(firText);
    setCopied(true);
    soundManager.playBubblePop();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-8 px-4 max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C92A57] mb-1 inline-flex items-center gap-1.5">
          <Scale className="w-3.5 h-3.5" />
          The Supreme Court of Comfort
        </span>
        <h1 className="text-3xl font-extrabold text-[#751B35] font-serif-love">
          Official FIR Against The Mehmaan ⚖️
        </h1>
        <p className="text-sm text-[#8D6574] mt-1 max-w-md mx-auto">
          Insaaf ka waqt agaya hai! Aaj subha ke sab juraim par official legal case file karein.
        </p>
      </div>

      {/* Legal Stamp Paper Document */}
      <div className="relative max-w-2xl mx-auto bg-[#FFFDF7] border-4 border-[#C8A265] rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden font-mono">
        {/* Government Style Stamp Header */}
        <div className="border-b-2 border-[#C8A265] pb-4 mb-6 text-center">
          <div className="w-12 h-12 mx-auto rounded-full border-2 border-[#C8A265] flex items-center justify-center text-xl mb-1 bg-[#FFF8E7]">
            ⚖️
          </div>
          <h2 className="text-base sm:text-lg font-black tracking-widest text-[#5A3E1B] uppercase font-serif-love">
            HIGH TRIBUNAL OF {nickname.toUpperCase()}'S PEACE
          </h2>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">
            Case No: FIR-420/MEHMAAN · Registered Under Section 302 (Sleep Murder)
          </p>
        </div>

        {/* Case Details */}
        <div className="space-y-4 text-xs sm:text-sm text-[#3E2D1D] leading-relaxed">
          <div className="flex justify-between border-b border-[#F0DFBE] pb-2 text-xs">
            <span><strong>Complainant:</strong> Princess {nickname}</span>
            <span className="text-[#C92A57] font-bold">Status: Highly Exhausted</span>
          </div>

          <div className="border-b border-[#F0DFBE] pb-2 text-xs">
            <strong>Accused Parties:</strong> Subha Ke Mehmaan & Unke 4 Toofan Bache
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase text-[#8B4513] mb-2 tracking-wider">
              📜 List of Crimes Committed:
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <span className="font-bold text-rose-600">§ 302-A:</span>
                <span>Mano ki pyari subha ki neend ka berahmi se qatal kiya gaya.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-rose-600">§ 420:</span>
                <span>Sab khana khatam karne ke baad aakhir mein bolna 'Namak thoda kam tha'.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-rose-600">§ 144:</span>
                <span>Drawing room sofa pe gande socks pehan ke WWE match shuru karna.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-rose-600">§ 506:</span>
                <span>'Beta baji phone do na game khelna hai' bol bol ke dimagh khana.</span>
              </li>
            </ul>
          </div>

          {/* Court Judgment Box */}
          <div className="bg-[#FFF4DC] border border-[#E6CCA0] p-4 rounded-xl mt-4">
            <h4 className="font-bold text-xs uppercase text-[#8B4513] mb-1 flex items-center gap-1.5">
              <Gavel className="w-3.5 h-3.5" />
              Final Court Judgment & Compensation:
            </h4>
            <p className="text-xs text-[#523A1B] leading-relaxed">
              Mulzimaan ko foran ghr se bedakhal kia jata hai. {nickname} ko compensation ke tor par <strong>1 tub Chocolate Fudge Ice Cream</strong>, <strong>Full Head Champi</strong>, aur <strong>24 ghante ka complete rest order</strong> diya jata hai!
            </p>
          </div>
        </div>

        {/* Big Official Stamp Overlay */}
        <AnimatePresence>
          {isStamped && (
            <motion.div
              initial={{ scale: 2, opacity: 0, rotate: -25 }}
              animate={{ scale: 1, opacity: 1, rotate: -12 }}
              className="absolute bottom-16 right-8 border-4 border-rose-600 text-rose-600 rounded-xl p-3 font-black text-center uppercase tracking-widest bg-white/90 shadow-lg pointer-events-none"
            >
              <div className="text-xs border-b-2 border-rose-600 pb-0.5">HIGH COURT OF SHONA</div>
              <div className="text-xl sm:text-2xl font-black py-1">100% GUILTY!</div>
              <div className="text-[9px]">EVICTED & PENALIZED</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons inside Document */}
        <div className="mt-8 pt-4 border-t-2 border-[#C8A265] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleStamp}
            disabled={isStamped}
            className={`px-5 py-2.5 rounded-full font-bold text-xs transition-all cursor-pointer flex items-center gap-2 ${
              isStamped
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                : 'bg-[#C92A57] text-white hover:bg-[#B3234B] shadow-md hover:scale-102'
            }`}
          >
            <Stamp className="w-4 h-4" />
            <span>{isStamped ? 'Court Sealed & Stamped! ⚖️' : 'Stamp Official Verdict (GUILTY!)'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-full bg-white text-[#5A3E1B] border border-[#C8A265] text-xs font-semibold hover:bg-[#FFF8E7] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied FIR to Clipboard!' : 'Copy FIR Text for WhatsApp'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
