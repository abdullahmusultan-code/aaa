// Web Audio API Synthesizers for cute interactive sounds and soothing ambience
class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientGain: GainNode | null = null;
  private activeAmbientNodes: { stop: () => void }[] = [];
  public currentAmbient: string | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.ambientGain) {
      this.ambientGain.gain.setValueAtTime(muted ? 0 : 0.4, this.ctx ? this.ctx.currentTime : 0);
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // Soft low heartbeat thump (for fingerprint scanning)
  public playHeartbeat(pitch: number = 70) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    } catch {
      // Audio fallback silent
    }
  }

  // Scanning frequency beep
  public playScanBeep(progress: number) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const baseFreq = 440 + (progress * 5); // climbs higher as scan progresses
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    } catch {}
  }

  // Sweet chime for completion / button clicks
  public playSweetChime(chord: number[] = [523.25, 659.25, 783.99, 1046.50]) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.07 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.07);
        osc.stop(ctx.currentTime + idx * 0.07 + 0.7);
      });
    } catch {}
  }

  // Satisfying bubble pop sound
  public playBubblePop() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const startFreq = 400 + Math.random() * 300;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(startFreq * 2.5, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.06);
    } catch {}
  }

  // Gentle purr sound for head pats / champi
  public playPurr() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(45, ctx.currentTime);

      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(25, ctx.currentTime); // 25Hz purr flutter
      lfoGain.gain.setValueAtTime(15, ctx.currentTime);

      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      lfo.start(ctx.currentTime);
      osc.start(ctx.currentTime);
      lfo.stop(ctx.currentTime + 0.4);
      osc.stop(ctx.currentTime + 0.4);
    } catch {}
  }

  // Ambient sound machine: Rain, Lofi Chords, or Purring Haven
  public startAmbientSound(type: 'rain' | 'piano' | 'purr' | null) {
    this.stopAmbientSound();
    if (!type || this.isMuted) return;

    const ctx = this.getContext();
    if (!ctx) return;

    this.currentAmbient = type;

    if (type === 'rain') {
      // Pink/White noise generator filtered for soft soothing rain
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.06;
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1000, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
      this.activeAmbientNodes.push({
        stop: () => {
          try {
            whiteNoise.stop();
            whiteNoise.disconnect();
          } catch {}
        }
      });
    } else if (type === 'piano') {
      // Dreamy repeating calming chord sequence (Lofi calm progression: Fmaj7 - Em7 - Dm7 - Cmaj7)
      const chords = [
        [349.23, 440.0, 523.25, 659.25], // Fmaj7
        [329.63, 392.0, 493.88, 587.33], // Em7
        [293.66, 349.23, 440.0, 523.25], // Dm7
        [261.63, 329.63, 392.0, 493.88]  // Cmaj7
      ];
      let chordIndex = 0;

      const intervalId = window.setInterval(() => {
        if (this.isMuted) return;
        const currentChord = chords[chordIndex % chords.length];
        chordIndex++;

        currentChord.forEach((freq, i) => {
          try {
            const osc = ctx.createOscillator();
            const noteGain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.06);

            noteGain.gain.setValueAtTime(0, ctx.currentTime);
            noteGain.gain.setValueAtTime(0.04, ctx.currentTime + i * 0.06);
            noteGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.06 + 3.2);

            osc.connect(noteGain);
            noteGain.connect(ctx.destination);

            osc.start(ctx.currentTime + i * 0.06);
            osc.stop(ctx.currentTime + i * 0.06 + 3.5);
          } catch {}
        });
      }, 3500);

      // Play first chord immediately
      const firstChord = chords[0];
      firstChord.forEach((freq, i) => {
        try {
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.06);
          noteGain.gain.setValueAtTime(0.04, ctx.currentTime + i * 0.06);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.06 + 3.2);
          osc.connect(noteGain);
          noteGain.connect(ctx.destination);
          osc.start(ctx.currentTime + i * 0.06);
          osc.stop(ctx.currentTime + i * 0.06 + 3.5);
        } catch {}
      });

      this.activeAmbientNodes.push({
        stop: () => {
          clearInterval(intervalId);
        }
      });
    }
  }

  public stopAmbientSound() {
    this.activeAmbientNodes.forEach(node => {
      try {
        node.stop();
      } catch {}
    });
    this.activeAmbientNodes = [];
    this.currentAmbient = null;
  }

  // Funny Cartoon Boing
  public playBoing() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(650, ctx.currentTime + 0.15);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.38);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.4);
    } catch {}
  }

  // Desi Flying Chappal Slap
  public playChappalSlap() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      // Noise burst for the slap impact
      const bufferSize = ctx.sampleRate * 0.1;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.02));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.09);
      noise.connect(gain);
      gain.connect(ctx.destination);
      noise.start();

      // Thud low frequency tone
      const osc = ctx.createOscillator();
      const thudGain = ctx.createGain();
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.08);
      thudGain.gain.setValueAtTime(0.3, ctx.currentTime);
      thudGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.connect(thudGain);
      thudGain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {}
  }

  // Porcelain / Glass Plate Smash for Rage Room
  public playPlateSmash() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const bufferSize = ctx.sampleRate * 0.25;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.05));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1800, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    } catch {}
  }

  // Funny Cartoon Wah-Wah Buzzer
  public playFunnyBuzzer() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const freqs = [350, 330, 310, 260];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.12);
        osc.stop(ctx.currentTime + i * 0.12 + 0.2);
      });
    } catch {}
  }
}

export const soundManager = new SoundManager();
