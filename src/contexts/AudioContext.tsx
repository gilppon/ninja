import React, { createContext, useContext, useRef, useState, useEffect } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  toggleMusic: () => void;
  playMusic: (type: 'game' | 'boss') => void;
  stopMusic: () => void;
  playSfx: (type: 'hit' | 'slash' | 'fail' | 'boss' | 'powerup' | 'nav' | 'select' | 'click' | 'warning') => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const bgmIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const bgmStepRef = useRef(0);
  const currentMusicRef = useRef<HTMLAudioElement | null>(null);

  const PENTATONIC = [196.00, 220.00, 261.63, 293.66, 329.63, 392.00]; // G3, A3, C4, D4, E4, G4

  useEffect(() => {
    // Lazy init audio context on first user interaction
    const initAudio = () => {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };
    window.addEventListener('pointerdown', initAudio, { once: true });
    return () => window.removeEventListener('pointerdown', initAudio);
  }, []);

  const playTone = (freq: number, type: OscillatorType = 'sine', duration = 0.1, vol = 0.1) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gainNode.gain.setValueAtTime(vol, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  };

  const playNoise = (duration = 0.1, type: 'white' | 'pink' = 'white', vol = 0.1, filterFreq = 1000) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(filterFreq, ctx.currentTime);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(vol, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noise.start();
    noise.stop(ctx.currentTime + duration);
  };

  const getSfxPath = (type: string) => {
    switch (type) {
      case 'hit': return '/assets/sounds/hit/hit.mp3';
      case 'slash': return '/assets/sounds/hit/slash.wav';
      case 'nav': return '/assets/sounds/ui/nav.wav';
      case 'select': return '/assets/sounds/ui/select.mp3';
      case 'click': return '/assets/sounds/ui/click.wav';
      case 'fail': return '/assets/sounds/effect/fail.mp3';
      case 'boss': return '/assets/sounds/bgm/boss_theme.mp3';
      case 'powerup': return '/assets/sounds/effect/powerup.wav';
      case 'warning': return '/assets/sounds/effect/warning.mp3';
      default: return '';
    }
  };

  const playFile = (path: string) => {
    if (!path) return false;
    const audio = new Audio(path);
    audio.volume = 0.5;
    audio.play().catch(() => {
       // Silent fail if file not found, will use fallback tones
    });
    return true;
  };

  const playSfx = (type: 'hit' | 'slash' | 'fail' | 'boss' | 'powerup' | 'nav' | 'select' | 'click' | 'warning') => {
    // Try to play custom file first
    const path = getSfxPath(type);
    playFile(path);

    // Always keep synthesized sounds as a stylistic layering or fallback
    switch (type) {
      case 'hit':
        playTone(400, 'square', 0.1, 0.05); // Sharp metal
        playTone(200, 'sawtooth', 0.1, 0.03); // Low impact
        break;
      case 'slash':
        playNoise(0.2, 'white', 0.08, 2000); // Air cutting "Shick!"
        break;
      case 'warning':
        playTone(600, 'sawtooth', 0.5, 0.1);
        setTimeout(() => playTone(500, 'sawtooth', 0.5, 0.1), 100);
        break;
      case 'nav':
        playTone(1200, 'sine', 0.1, 0.02);
        playNoise(0.1, 'white', 0.02, 3000); // "Swoosh"
        break;
      case 'select':
        playTone(880, 'sine', 0.05, 0.05);
        setTimeout(() => playTone(1320, 'sine', 0.05, 0.04), 50);
        break;
      case 'click':
        playTone(1500, 'square', 0.02, 0.02);
        break;
      case 'fail':
        playTone(100, 'sawtooth', 0.5, 0.2);
        break;
      case 'boss':
        playTone(150, 'sawtooth', 0.3, 0.2);
        break;
      case 'powerup':
        playTone(660, 'sine', 0.2, 0.1);
        setTimeout(() => playTone(880, 'sine', 0.3, 0.1), 100);
        break;
    }
  };

  const playMusic = (type: 'game' | 'boss') => {
    if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    // Stop current music if any
    if (currentMusicRef.current) {
        currentMusicRef.current.pause();
        currentMusicRef.current = null;
    }

    const path = '/assets/sounds/bgm/boss_theme.mp3'; // Use boss theme as the primary BGM
    const audio = new Audio(path);
    audio.loop = true;
    audio.volume = 0.4;
    audio.play().catch(e => console.error("Music play failed:", e));
    currentMusicRef.current = audio;
  };

  const stopMusic = () => {
    if (currentMusicRef.current) {
        currentMusicRef.current.pause();
        currentMusicRef.current = null;
    }
  };

  const toggleMusic = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      startBgm();
    } else {
      setIsPlaying(false);
      stopBgm();
    }
  };

  const startBgm = () => {
    if (bgmIntervalRef.current) return;
    bgmIntervalRef.current = setInterval(() => {
      if (!audioCtxRef.current) return;
      
      const step = bgmStepRef.current % 16;
      const note = PENTATONIC[Math.floor(Math.random() * PENTATONIC.length)];
      
      // Kick/Drive Rhythms
      if (step % 4 === 0) {
        playTone(50, 'sine', 0.1, 0.08); // Deep kick
      }
      
      // Cyber Bass
      if (step % 2 === 0) {
        playTone(PENTATONIC[0] / 4, 'sawtooth', 0.2, 0.02);
      }
      
      // Melody note
      if (Math.random() > 0.4 && step % 2 !== 0) {
        playTone(note, 'sine', 0.15, 0.02);
      }
      
      bgmStepRef.current++;
    }, 150); // Faster tempo for cyberpunk feel
  };

  const stopBgm = () => {
    if (bgmIntervalRef.current) {
      clearInterval(bgmIntervalRef.current);
      bgmIntervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopBgm();
  }, []);

  return (
    <AudioContext.Provider value={{ isPlaying, toggleMusic, playMusic, stopMusic, playSfx }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used within AudioProvider');
  return context;
};
