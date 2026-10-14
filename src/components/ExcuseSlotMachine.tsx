import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/soundEffects';
import { Nickname } from '../types';
import { Dices, Sparkles, Copy, Check, ShieldAlert } from 'lucide-react';

interface ExcuseSlotMachineProps {
  nickname: Nickname;
}

export const ExcuseSlotMachine: React.FC<ExcuseSlotMachineProps> = ({ nickname }) => {
  const excuseOptions = [
    {
      title: 'The NASA Emergency Excuse',
      text: `“Aunty actually ${nickname} ko achanak NASA ki emergency Zoom call attend karni hai, wo mic on karke bethi hain to ghr mein bilkul pin-drop silence chahiye!”`,
      tag: 'Tech Excuse 💻',
    },
    {
      title: 'The Medical Prescription Excuse',
      text: `“Doctor ne ${nickname} ko strictly advice di hai ke aglay 48 ghantay tak mehmaano ke bachon ke shor se 500 meter door rahein, warna allergy ho sakti hai!”`,
      tag: 'Medical 🩺',
    },
    {
      title: 'The Ghost Key Excuse',
      text: `“Arey mehmaan aaye? Par Mano to kamray mein thi aur bahir se taala achanak jam ho gaya hai, chabi bhi ghum gayi hai! Sorry bahir nahi asakti!”`,
      tag: 'Lockdown 🔒',
    },
    {
      title: 'The Hangry Danger Excuse',
      text: `“Warning: ${nickname} ne subha se kuch nahi khaya aur wo hangry mode mein hain. Unke qareeb jana khatarnaak sabit ho sakta hai!”`,
      tag: 'High Alert ⚠️',
    },
    {
      title: 'The Phone Battery Defense',
      text: `“Baji bache game maang rahe hain? Lekin baji ke phone mein to 0.5% charging hai aur charger padosi le gaye thay!”`,
      tag: 'Classic 📱',
    },
    {
      title: 'The Champi Therapy Excuse',
      text: `“Abhi ${nickname} ki VIP head massage aur beauty sleep chal rahi hai. Disturb karne wale par 5000 rupay jurmana hai!”`,
      tag: 'VIP Spa 💆‍♀️',
    },
  ];

  const [currentExcuseIndex, setCurrentExcuseIndex] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleSpin = () => {
    setIsSpinning(true);
    soundManager.playBoing();

    let counter = 0;
    const interval = setInterval(() => {
      setCurrentExcuseIndex((prev) => (prev + 1) % excuseOptions.length);
      soundManager.playScanBeep(counter * 10);
      counter++;
      if (counter > 8) {
        clearInterval(interval);
        setIsSpinning(false);
        soundManager.playSweetChime();
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#FF6B8B', '#FFA5B9', '#FFD166'],
        });
      }
    }, 90);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(excuseOptions[currentExcuseIndex].text);
    setCopied(true);
    soundManager.playBubblePop();
    setTimeout(() => setCopied(false), 2000);
  };

  const selected = excuseOptions[currentExcuseIndex];

  return (
    <div className="py-8 px-4 max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C92A57] mb-1 inline-flex items-center gap-1.5">
          <Dices className="w-3.5 h-3.5" />
          Future Protection System
        </span>
        <h1 className="text-3xl font-extrabold text-[#751B35] font-serif-love">
          Desi Mehmaan Escape Excuse Generator 🎰
        </h1>
        <p className="text-sm text-[#8D6574] mt-1 max-w-md mx-auto">
          Next time jab koi bin-bulaye mehmaan aane lagein, spin karein aur 100% airtight excuse copy karein!
        </p>
      </div>

      {/* Slot Machine Box */}
      <div className="bg-gradient-to-b from-[#FFF0F5] to-[#FFE5ED] border-2 border-[#F9CAD7] rounded-3xl p-6 sm:p-8 max-w-xl mx-auto shadow-lg relative text-center">
        {/* Slot Screen */}
        <div className="bg-white border-2 border-pink-200 rounded-2xl p-6 shadow-inner mb-6 min-h-[160px] flex flex-col justify-center items-center">
          <span className="text-xs font-bold text-[#C92A57] uppercase tracking-wider mb-2 px-2.5 py-0.5 rounded-full bg-pink-50 border border-pink-100">
            {selected.tag}
          </span>

          <motion.h3
            key={selected.title}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg font-bold text-[#6B1B32] mb-2"
          >
            {selected.title}
          </motion.h3>

          <motion.p
            key={selected.text}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-[#4A3B43] leading-relaxed font-medium italic"
          >
            {selected.text}
          </motion.p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#FF4B72] to-[#E63956] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-102"
          >
            <Dices className="w-4 h-4" />
            <span>{isSpinning ? 'Rolling Excuses...' : 'Spin For Next Excuse 🎲'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="w-full sm:w-auto px-4 py-3 rounded-full bg-white text-[#751B35] border border-pink-200 text-xs font-bold hover:bg-pink-50 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Excuse!' : 'Copy to Send'}</span>
          </button>
        </div>
      </div>

      {/* Quick Cards Grid */}
      <div className="mt-10">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#751B35] text-center mb-4">
          All Tactical Excuses Ready:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {excuseOptions.map((opt, idx) => (
            <div
              key={idx}
              onClick={() => {
                setCurrentExcuseIndex(idx);
                soundManager.playBubblePop();
              }}
              className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                currentExcuseIndex === idx
                  ? 'bg-white border-[#C92A57] shadow-sm'
                  : 'bg-white/70 border-pink-100 hover:bg-white'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-[#A6274D]">{opt.tag}</span>
                <span className="text-[10px] text-gray-400">#{idx + 1}</span>
              </div>
              <h5 className="font-bold text-xs text-[#6B1B32] truncate">{opt.title}</h5>
              <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">{opt.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
