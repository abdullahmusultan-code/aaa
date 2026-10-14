/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppView, Nickname } from './types';
import { soundManager } from './utils/soundEffects';
import { Header } from './components/Header';
import { LoveScanner } from './components/LoveScanner';
import { GiftBoxes } from './components/GiftBoxes';
import { BouquetSurprise } from './components/BouquetSurprise';
import { ScrapbookSurprise } from './components/ScrapbookSurprise';
import { LetterSurprise } from './components/LetterSurprise';
import { BubblePopper } from './components/BubblePopper';
import { PamperSalon } from './components/PamperSalon';
import { BreathingExercise } from './components/BreathingExercise';
import { CouponsSection } from './components/CouponsSection';
import { MehmaanEvictionGame } from './components/MehmaanEvictionGame';
import { RageRoom } from './components/RageRoom';
import { FirTribunal } from './components/FirTribunal';
import { ExcuseSlotMachine } from './components/ExcuseSlotMachine';
import { Heart, Sparkles } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('scanner');
  const [nickname, setNickname] = useState<Nickname>('Soni Mano Shona');
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundManager.setMuted(nextMuted);
  };

  const handleScanComplete = () => {
    setCurrentView('surprises_hub');
  };

  return (
    <div className="min-h-screen bg-[#FFF5F7] text-[#4A3B43] flex flex-col relative selection:bg-pink-200 selection:text-pink-900 pb-16 md:pb-6">
      {/* Subtle floating background ambient elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <div className="absolute top-12 left-10 text-2xl animate-float-slow">🌸</div>
        <div className="absolute top-1/3 right-8 text-2xl animate-float-slow" style={{ animationDelay: '2s' }}>✨</div>
        <div className="absolute bottom-20 left-16 text-2xl animate-float-slow" style={{ animationDelay: '1s' }}>💖</div>
        <div className="absolute bottom-1/4 right-1/4 text-2xl animate-float-slow" style={{ animationDelay: '3s' }}>🎀</div>
      </div>

      {/* Header following Top Bar Contract */}
      <Header
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        nickname={nickname}
        onSelectNickname={(name) => setNickname(name)}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 relative z-10">
        {currentView === 'scanner' && (
          <LoveScanner
            onScanComplete={handleScanComplete}
            nickname={nickname}
          />
        )}

        {currentView === 'surprises_hub' && (
          <GiftBoxes
            onSelectSurprise={(view) => setCurrentView(view)}
            nickname={nickname}
          />
        )}

        {currentView === 'bouquet' && (
          <BouquetSurprise
            onBack={() => setCurrentView('surprises_hub')}
            onNext={() => setCurrentView('scrapbook')}
            nickname={nickname}
          />
        )}

        {currentView === 'scrapbook' && (
          <ScrapbookSurprise
            onBack={() => setCurrentView('surprises_hub')}
            onNext={() => setCurrentView('letter')}
            nickname={nickname}
          />
        )}

        {currentView === 'letter' && (
          <LetterSurprise
            onBack={() => setCurrentView('surprises_hub')}
            onGoToPamper={() => setCurrentView('pamper_bar')}
            nickname={nickname}
          />
        )}

        {/* Brand New Funny Features */}
        {currentView === 'evict_game' && (
          <MehmaanEvictionGame nickname={nickname} />
        )}

        {currentView === 'rage_room' && (
          <RageRoom nickname={nickname} />
        )}

        {currentView === 'fir_tribunal' && (
          <FirTribunal nickname={nickname} />
        )}

        {currentView === 'excuse_slot' && (
          <ExcuseSlotMachine nickname={nickname} />
        )}

        {/* Relaxing Classics */}
        {currentView === 'bubble_popper' && (
          <BubblePopper nickname={nickname} />
        )}

        {currentView === 'pamper_bar' && (
          <PamperSalon nickname={nickname} />
        )}

        {currentView === 'breathing' && (
          <BreathingExercise nickname={nickname} />
        )}

        {currentView === 'coupons' && (
          <CouponsSection nickname={nickname} />
        )}
      </main>

      {/* Mobile Floating Bottom Navigation Bar (under 15% sticky budget) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#FCD6E2] px-2 py-1.5 flex items-center justify-around text-[10px] font-semibold text-[#8D6574]">
        <button
          onClick={() => setCurrentView('evict_game')}
          className={`flex flex-col items-center gap-0.5 cursor-pointer py-0.5 ${
            currentView === 'evict_game' ? 'text-rose-600 font-bold' : 'hover:text-[#6B1B32]'
          }`}
        >
          <span className="text-base">🚀</span>
          <span>Evict!</span>
        </button>

        <button
          onClick={() => setCurrentView('rage_room')}
          className={`flex flex-col items-center gap-0.5 cursor-pointer py-0.5 ${
            currentView === 'rage_room' ? 'text-amber-600 font-bold' : 'hover:text-[#6B1B32]'
          }`}
        >
          <span className="text-base">💥</span>
          <span>Rage</span>
        </button>

        <button
          onClick={() => setCurrentView('fir_tribunal')}
          className={`flex flex-col items-center gap-0.5 cursor-pointer py-0.5 ${
            currentView === 'fir_tribunal' ? 'text-[#C92A57] font-bold' : 'hover:text-[#6B1B32]'
          }`}
        >
          <span className="text-base">⚖️</span>
          <span>FIR</span>
        </button>

        <button
          onClick={() => setCurrentView('excuse_slot')}
          className={`flex flex-col items-center gap-0.5 cursor-pointer py-0.5 ${
            currentView === 'excuse_slot' ? 'text-purple-600 font-bold' : 'hover:text-[#6B1B32]'
          }`}
        >
          <span className="text-base">🎰</span>
          <span>Excuses</span>
        </button>

        <button
          onClick={() => setCurrentView('surprises_hub')}
          className={`flex flex-col items-center gap-0.5 cursor-pointer py-0.5 ${
            currentView === 'surprises_hub' || currentView === 'bouquet' || currentView === 'scrapbook' || currentView === 'letter'
              ? 'text-[#C92A57] font-bold'
              : 'hover:text-[#6B1B32]'
          }`}
        >
          <span className="text-base">🎁</span>
          <span>Hub</span>
        </button>
      </div>

      {/* Subtle quiet footer */}
      <footer className="text-center text-[11px] text-[#A67E8F] py-3 border-t border-[#FCD6E2]/40 hidden md:block">
        Made with pure love to bring a smile back to Soni, Mano & Shona's face 💕
      </footer>
    </div>
  );
}
