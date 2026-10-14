import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { AppView, Nickname } from '../types';

interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  nickname: Nickname;
  onSelectNickname: (name: Nickname) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  isMuted,
  onToggleMute,
  nickname,
  onSelectNickname,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#FFF5F7]/90 backdrop-blur-md border-b border-[#FAD2DF]/60 transition-all">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => onNavigate('surprises_hub')}
          className="text-left font-bold text-lg md:text-xl text-[#8E2848] tracking-tight hover:opacity-85 transition-opacity whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="text-xl">🌸</span>
          <span className="font-serif-love">For My {nickname}</span>
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-[#7D5A68]">
          <button
            onClick={() => onNavigate('scanner')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              currentView === 'scanner' ? 'text-[#C92A57] font-bold border-b-2 border-[#C92A57]' : 'hover:text-[#A6274D]'
            }`}
          >
            Love Scanner
          </button>
          <button
            onClick={() => onNavigate('surprises_hub')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              currentView === 'surprises_hub' || currentView === 'bouquet' || currentView === 'scrapbook' || currentView === 'letter'
                ? 'text-[#C92A57] font-bold border-b-2 border-[#C92A57]'
                : 'hover:text-[#A6274D]'
            }`}
          >
            Surprises
          </button>
          <button
            onClick={() => onNavigate('evict_game')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              currentView === 'evict_game' ? 'text-[#C92A57] font-bold border-b-2 border-[#C92A57]' : 'hover:text-[#A6274D]'
            }`}
          >
            Evict Cannon 🚀
          </button>
          <button
            onClick={() => onNavigate('rage_room')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              currentView === 'rage_room' ? 'text-[#C92A57] font-bold border-b-2 border-[#C92A57]' : 'hover:text-[#A6274D]'
            }`}
          >
            Rage Room 💥
          </button>
          <button
            onClick={() => onNavigate('fir_tribunal')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              currentView === 'fir_tribunal' ? 'text-[#C92A57] font-bold border-b-2 border-[#C92A57]' : 'hover:text-[#A6274D]'
            }`}
          >
            FIR Court ⚖️
          </button>
          <button
            onClick={() => onNavigate('excuse_slot')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              currentView === 'excuse_slot' ? 'text-[#C92A57] font-bold border-b-2 border-[#C92A57]' : 'hover:text-[#A6274D]'
            }`}
          >
            Excuses 🎰
          </button>
          <button
            onClick={() => onNavigate('pamper_bar')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              currentView === 'pamper_bar' ? 'text-[#C92A57] font-bold border-b-2 border-[#C92A57]' : 'hover:text-[#A6274D]'
            }`}
          >
            Champi 💆‍♀️
          </button>
          <button
            onClick={() => onNavigate('coupons')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              currentView === 'coupons' ? 'text-[#C92A57] font-bold border-b-2 border-[#C92A57]' : 'hover:text-[#A6274D]'
            }`}
          >
            Coupons 🎟️
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action (Music / Sound Toggle + Quick Nickname Picker) */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* Quick Nickname Selector */}
          <div className="relative inline-flex items-center bg-white/80 border border-[#FAD2DF] rounded-full px-2.5 py-1 text-xs text-[#7D5A68]">
            <span className="text-gray-400 mr-1 hidden sm:inline">Calling:</span>
            <select
              aria-label="Select nickname"
              value={nickname}
              onChange={(e) => onSelectNickname(e.target.value as Nickname)}
              className="bg-transparent font-medium text-[#A6274D] focus:outline-none cursor-pointer pr-1"
            >
              <option value="Soni">Soni</option>
              <option value="Mano">Mano</option>
              <option value="Shona">Shona</option>
              <option value="Soni Mano Shona">All Three ❤️</option>
            </select>
          </div>

          <button
            onClick={onToggleMute}
            title={isMuted ? 'Turn on sound' : 'Mute sound'}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-[#FFE5ED] text-[#C92A57] hover:bg-[#FFD4E2] transition-colors whitespace-nowrap cursor-pointer shadow-xs border border-[#FFCCD9]"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Unmute</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sound ON</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
