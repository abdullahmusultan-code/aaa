import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AppView, Nickname } from '../types';
import { soundManager } from '../utils/soundEffects';
import { ArrowLeft, ArrowRight, Play, Pause, SkipForward, SkipBack, Volume2, CloudRain, Music2, Heart, Sparkles, Upload } from 'lucide-react';
import scrapbookImg from '../assets/images/scrapbook_dream_view_1791993879053.jpg';

interface ScrapbookSurpriseProps {
  onBack: () => void;
  onNext: () => void;
  nickname: Nickname;
}

export const ScrapbookSurprise: React.FC<ScrapbookSurpriseProps> = ({
  onBack,
  onNext,
  nickname,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeSoundscape, setActiveSoundscape] = useState<'rain' | 'piano' | 'purr' | null>(null);
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  const [playbackSeconds, setPlaybackSeconds] = useState<number>(42);

  const playlist = [
    { title: 'Birds of a Feather (Cozy Lofi)', artist: 'Acoustic Sanctuary', duration: '3:15' },
    { title: 'Soft Rain & Safe Arms', artist: 'Peace for Mano', duration: '4:20' },
    { title: 'Golden Hour Dream', artist: 'For My Shona', duration: '3:45' },
  ];
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);

  useEffect(() => {
    let timer: number;
    if (isPlaying) {
      timer = window.setInterval(() => {
        setPlaybackSeconds((s) => (s + 1) % 195);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const togglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      // Start calming piano by default
      setActiveSoundscape('piano');
      soundManager.startAmbientSound('piano');
      soundManager.playSweetChime();
    } else {
      setIsPlaying(false);
      setActiveSoundscape(null);
      soundManager.stopAmbientSound();
    }
  };

  const handleSoundscapeToggle = (type: 'rain' | 'piano' | 'purr') => {
    if (activeSoundscape === type) {
      setActiveSoundscape(null);
      soundManager.stopAmbientSound();
      setIsPlaying(false);
    } else {
      setActiveSoundscape(type);
      setIsPlaying(true);
      soundManager.startAmbientSound(type);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomPhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="py-6 px-4 max-w-5xl mx-auto min-h-[calc(100vh-5rem)] flex flex-col justify-between">
      {/* Top Navigation */}
      <div className="flex items-center justify-between border-b border-[#FCD6E2] pb-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#8D6574] hover:text-[#C92A57] px-3 py-1.5 rounded-full hover:bg-white/80 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Surprises</span>
        </button>

        <h1 className="text-2xl md:text-3xl font-extrabold text-[#751B35] font-serif-love text-center">
          Melody & Memories
        </h1>

        <button
          onClick={onNext}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#C92A57] hover:text-[#9F1E42] px-4 py-1.5 rounded-full bg-[#FFE6ED] hover:bg-[#FFD4E2] transition-colors cursor-pointer"
        >
          <span>Next Surprise</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Scrapbook Collage Area */}
      <div className="relative my-auto bg-[#FFF5F8] border border-[#FCD6E2] rounded-3xl p-6 md:p-10 shadow-lg overflow-hidden">
        {/* Decorative corner stickers & washi tapes */}
        <div className="absolute top-4 left-6 -rotate-6 bg-[#FFE3EC] text-[#B34B6B] text-[11px] font-bold px-3 py-1 rounded shadow-xs border border-pink-200 uppercase tracking-widest">
          ♡ Our Memory ♡
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left: Romantic Polaroid with Scrapbook frame */}
          <div className="md:col-span-6 flex flex-col items-center">
            <motion.div
              initial={{ rotate: -2, scale: 0.95 }}
              animate={{ rotate: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-4 pb-7 rounded-sm shadow-xl border border-gray-100 max-w-sm w-full relative group"
            >
              {/* Washi Tape on top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#FFC5D3]/80 -rotate-1 shadow-xs border-y border-pink-300 pointer-events-none" />

              {/* Photo Viewport */}
              <div className="relative w-full aspect-4/3 rounded-xs overflow-hidden bg-[#FAF0F3] shadow-inner">
                <img
                  src={customPhoto || scrapbookImg}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/scrapbook_dream_view.jpg';
                  }}
                  alt="Aesthetic romantic view for Soni Mano Shona"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />

                {/* Floating butterfly sticker */}
                <span className="absolute top-2 right-2 text-2xl drop-shadow-sm select-none">
                  🦋
                </span>
              </div>

              {/* Polaroid Handwritten Caption */}
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="font-script text-xl text-[#6B1B32] font-bold">
                    Safe place with my {nickname} 🌸
                  </p>
                  <p className="text-[11px] text-gray-500">
                    No noise, no stress, just you and me.
                  </p>
                </div>

                {/* Change photo button */}
                <label className="text-[11px] font-semibold text-[#C92A57] bg-[#FFEBF1] hover:bg-[#FFD9E4] px-2.5 py-1 rounded-full cursor-pointer transition-colors flex items-center gap-1">
                  <Upload className="w-3 h-3" />
                  <span>{customPhoto ? 'Change' : 'Our Pic'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </motion.div>
          </div>

          {/* Right: Music Player & Love Pass Ticket */}
          <div className="md:col-span-6 flex flex-col gap-6">
            {/* Music Player Widget (Reproduces video's Birds of a feather player) */}
            <div className="bg-white/90 backdrop-blur-sm border border-[#FCD6E2] rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isPlaying ? 'bg-[#FF4B72] text-white animate-spin' : 'bg-[#FFE5ED] text-[#C92A57]'}`}>
                    <Music2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#6B1B32]">
                      {playlist[currentTrackIndex].title}
                    </h4>
                    <p className="text-[11px] text-[#8D6574]">
                      {playlist[currentTrackIndex].artist}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C92A57] bg-[#FFEBF1] px-2.5 py-0.5 rounded-full">
                  {isPlaying ? 'Playing' : 'Paused'}
                </span>
              </div>

              {/* Progress Slider */}
              <div className="space-y-1 mb-4">
                <div className="w-full h-1.5 bg-[#FFE5ED] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FF4B72] rounded-full transition-all duration-300"
                    style={{ width: `${(playbackSeconds / 195) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-[#8D6574]">
                  <span>{formatTime(playbackSeconds)}</span>
                  <span>{playlist[currentTrackIndex].duration}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setCurrentTrackIndex((i) => (i - 1 + playlist.length) % playlist.length)}
                  className="p-2 text-[#8D6574] hover:text-[#C92A57] transition-colors cursor-pointer"
                  title="Previous track"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={togglePlay}
                  className="w-11 h-11 rounded-full bg-[#C92A57] text-white flex items-center justify-center shadow-md hover:bg-[#B3234B] hover:scale-105 transition-all cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
                </button>

                <button
                  onClick={() => setCurrentTrackIndex((i) => (i + 1) % playlist.length)}
                  className="p-2 text-[#8D6574] hover:text-[#C92A57] transition-colors cursor-pointer"
                  title="Next track"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Soothing Ambience Soundscape Selectors */}
              <div className="mt-5 pt-4 border-t border-[#FCD6E2]/60">
                <p className="text-[11px] font-semibold text-[#8D6574] mb-2 text-center">
                  ✨ Instant Relaxing Soundscapes (Web Audio):
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleSoundscapeToggle('rain')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer flex items-center justify-center gap-1 ${
                      activeSoundscape === 'rain'
                        ? 'bg-[#EBF5FF] border-[#90CAF9] text-[#1976D2]'
                        : 'bg-white border-[#FCD6E2] text-[#8D6574] hover:bg-[#FFF0F5]'
                    }`}
                  >
                    <span>🌧️</span>
                    <span>Soft Rain</span>
                  </button>

                  <button
                    onClick={() => handleSoundscapeToggle('piano')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer flex items-center justify-center gap-1 ${
                      activeSoundscape === 'piano'
                        ? 'bg-[#FFF0F5] border-[#FF8DA7] text-[#C92A57]'
                        : 'bg-white border-[#FCD6E2] text-[#8D6574] hover:bg-[#FFF0F5]'
                    }`}
                  >
                    <span>🎹</span>
                    <span>Lofi Piano</span>
                  </button>

                  <button
                    onClick={() => handleSoundscapeToggle('purr')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer flex items-center justify-center gap-1 ${
                      activeSoundscape === 'purr'
                        ? 'bg-[#FFF9E6] border-[#FFD166] text-[#B87024]'
                        : 'bg-white border-[#FCD6E2] text-[#8D6574] hover:bg-[#FFF0F5]'
                    }`}
                  >
                    <span>🐱</span>
                    <span>Cat Purr</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Aesthetic "Love Pass Ticket" (Matches video) */}
            <div className="bg-gradient-to-r from-[#FFF0F5] to-[#FFE5ED] border-2 border-dashed border-[#FFA5B9] rounded-2xl p-4 relative shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#C92A57]">
                    VIP LOVE PASS #001
                  </span>
                  <h5 className="font-bold text-sm text-[#6B1B32] mt-0.5">
                    Admit One: Unlimited Peaceful Cuddles
                  </h5>
                  <p className="text-[11px] text-[#8D6574]">
                    Valid for: <span className="font-semibold text-[#A6274D]">{nickname}</span> · Expires: Never
                  </p>
                </div>
                <div className="text-3xl">
                  🎟️
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-[#8D6574]">
          Earphones recommended: Close your eyes, listen to the soft rain or gentle piano, and let the stress dissolve.
        </p>
      </div>
    </div>
  );
};
