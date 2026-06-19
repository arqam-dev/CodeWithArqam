"use client";

import { useState, useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from "react";
import { FaPlay, FaPause, FaDownload, FaSpinner } from "react-icons/fa";

interface TextToSpeechProps {
  text: string;
  title?: string;
}

export interface TextToSpeechRef {
  stop: () => void;
}

const TextToSpeech = forwardRef<TextToSpeechRef, TextToSpeechProps>(
  ({ text, title }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isSupported, setIsSupported] = useState(false);
    const [rate, setRate] = useState(1);
    const [pitch, setPitch] = useState(1);
    const [volume, setVolume] = useState(1);
    const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [isDownloading, setIsDownloading] = useState(false);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const rateRef = useRef(rate);
    const pitchRef = useRef(pitch);
    const volumeRef = useRef(volume);
    const voiceRef = useRef(voice);
    const currentCharIndexRef = useRef(0);
    const startTimeRef = useRef<number | null>(null);
    const isPausedRef = useRef(false);
    
    // Keep refs in sync with state
    useEffect(() => {
      rateRef.current = rate;
    }, [rate]);
    
    useEffect(() => {
      pitchRef.current = pitch;
    }, [pitch]);
    
    useEffect(() => {
      volumeRef.current = volume;
    }, [volume]);
    
    useEffect(() => {
      voiceRef.current = voice;
    }, [voice]);

    // Check if browser supports speech synthesis
    useEffect(() => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        setIsSupported(true);
        loadVoices();
        
        const synth = window.speechSynthesis;
        if (synth.onvoiceschanged !== undefined) {
          synth.onvoiceschanged = loadVoices;
        }
      }
    }, []);

    const loadVoices = () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        try {
          const availableVoices = window.speechSynthesis.getVoices();
          if (availableVoices.length > 0) {
            setVoices(availableVoices);
            
            if (!voice) {
              const englishVoice = availableVoices.find(
                (v) => v.lang.startsWith("en") && v.localService
              ) || availableVoices.find((v) => v.lang.startsWith("en")) || availableVoices[0];
              
              if (englishVoice) {
                setVoice(englishVoice);
              }
            }
          }
        } catch (error) {
          console.error("Error loading voices:", error);
        }
      }
    };

    // Clean up text: remove markdown syntax, code blocks, etc.
    const cleanText = (text: string): string => {
      return text
        .replace(/```[\s\S]*?```/g, "")
        .replace(/`[^`]+`/g, "")
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
        .replace(/^#{1,6}\s+/gm, "")
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .replace(/\*([^*]+)\*/g, "$1")
        .replace(/^[\s]*[-*+]\s+/gm, "")
        .replace(/^\d+\.\s+/gm, "")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
    };

    const stop = useCallback(() => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        try {
          window.speechSynthesis.cancel();
        } catch (error) {
          // Ignore errors when stopping
        }
      }
      setIsPlaying(false);
      setIsPaused(false);
      utteranceRef.current = null;
      currentCharIndexRef.current = 0;
      startTimeRef.current = null;
      isPausedRef.current = false;
    }, []);

    // Expose stop function to parent via ref
    useImperativeHandle(ref, () => ({
      stop,
    }), [stop]);

    // Cleanup on unmount - stop speech when component is removed
    useEffect(() => {
      return () => {
        stop();
      };
    }, [stop]);

    const speakWithParams = (speechRate?: number, speechPitch?: number, speechVolume?: number, speechVoice?: SpeechSynthesisVoice | null, startFromIndex: number = 0) => {
      if (!isSupported) {
        return;
      }

      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        return;
      }

      const cleanedText = cleanText(text);
      if (!cleanedText || cleanedText.length === 0) {
        return;
      }
      
      // Get the text to speak (from current position or start)
      const textToSpeak = startFromIndex > 0 && startFromIndex < cleanedText.length 
        ? cleanedText.substring(startFromIndex) 
        : cleanedText;
      
      if (!textToSpeak || textToSpeak.length === 0) {
        // Reached the end
        setIsPlaying(false);
        setIsPaused(false);
        currentCharIndexRef.current = 0;
        return;
      }

      // Stop any ongoing speech completely
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        try {
          const synth = window.speechSynthesis;
          // Cancel all pending and speaking
          synth.cancel();
          // If paused, resume first then cancel
          if (synth.paused) {
            synth.resume();
            synth.cancel();
          }
        } catch (error) {
          // Ignore errors during cancellation
        }
      }
      setIsPlaying(false);
      setIsPaused(false);
      utteranceRef.current = null;

      // Delay to ensure cancel completes and queue is cleared
      setTimeout(() => {
        try {
          if (typeof window === "undefined" || !("speechSynthesis" in window)) {
            return;
          }
          
          const synth = window.speechSynthesis;
          
          // Double-check nothing is still speaking/pending
          if (synth.speaking || synth.pending) {
            synth.cancel();
            // Wait a bit more if still active, then retry
            setTimeout(() => {
              if (!synth.speaking && !synth.pending) {
                createAndSpeak(textToSpeak, cleanedText, startFromIndex, speechRate, speechPitch, speechVolume, speechVoice);
              }
            }, 50);
            return;
          }
          
          createAndSpeak(textToSpeak, cleanedText, startFromIndex, speechRate, speechPitch, speechVolume, speechVoice);
        } catch (error) {
          console.error("Error in speakWithParams:", error);
          setIsPlaying(false);
          setIsPaused(false);
        }
      }, 150);
    };
    
    const createAndSpeak = (textToSpeak: string, cleanedText: string, startFromIndex: number = 0, speechRate?: number, speechPitch?: number, speechVolume?: number, speechVoice?: SpeechSynthesisVoice | null) => {
      try {
        if (typeof window === "undefined" || !("speechSynthesis" in window)) {
          return;
        }
        
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        const availableVoices = synth.getVoices();
        const currentVoice = speechVoice !== undefined ? speechVoice : voiceRef.current;
        
        if (currentVoice && availableVoices.length > 0) {
          const voiceStillAvailable = availableVoices.find(
            v => v.name === currentVoice.name && v.lang === currentVoice.lang
          );
          if (voiceStillAvailable) {
            utterance.voice = voiceStillAvailable;
          } else if (availableVoices.length > 0) {
            utterance.voice = availableVoices[0];
          }
        } else if (availableVoices.length > 0) {
          utterance.voice = availableVoices[0];
        }
        
        utterance.rate = speechRate !== undefined ? speechRate : rateRef.current;
        utterance.pitch = speechPitch !== undefined ? speechPitch : pitchRef.current;
        utterance.volume = speechVolume !== undefined ? speechVolume : volumeRef.current;

        utterance.onstart = () => {
          setIsPlaying(true);
          setIsPaused(false);
          isPausedRef.current = false;
          startTimeRef.current = Date.now();
        };

        utterance.onend = () => {
          // Update character index to the end
          currentCharIndexRef.current = startFromIndex + textToSpeak.length;
          
          // If we've reached the end of the text, stop
          if (currentCharIndexRef.current >= cleanedText.length) {
            setIsPlaying(false);
            setIsPaused(false);
            currentCharIndexRef.current = 0;
            startTimeRef.current = null;
          } else {
            // Continue with remaining text
            setIsPlaying(true);
            setIsPaused(false);
            speakWithParams(speechRate, speechPitch, speechVolume, speechVoice, currentCharIndexRef.current);
          }
          utteranceRef.current = null;
        };
        
        // Track character position using boundary event
        utterance.onboundary = (event) => {
          if (event.name === 'word' || event.name === 'sentence') {
            currentCharIndexRef.current = startFromIndex + event.charIndex;
          }
        };

        utterance.onerror = (event) => {
          // Only log if it's a real error, not just cancellation
          if (event.error && event.error !== 'interrupted') {
            console.error("Speech synthesis error:", event);
          }
          setIsPlaying(false);
          setIsPaused(false);
          utteranceRef.current = null;
        };

        utteranceRef.current = utterance;
        synth.speak(utterance);
      } catch (error) {
        console.error("Error starting speech:", error);
        setIsPlaying(false);
        setIsPaused(false);
      }
    };

    const speak = () => {
      currentCharIndexRef.current = 0;
      startTimeRef.current = null;
      speakWithParams();
    };

    // Restart speech when volume changes during playback (volume can't be changed in real-time)
    const handleVolumeChange = (newVolume: number) => {
      setVolume(newVolume);
      volumeRef.current = newVolume;
      if (isPlaying || isPaused) {
        // Get current position and continue from there
        const currentPos = currentCharIndexRef.current;
        // Stop current speech
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          try {
            window.speechSynthesis.cancel();
          } catch (error) {
            // Ignore errors
          }
        }
        setIsPlaying(false);
        setIsPaused(false);
        utteranceRef.current = null;
        // Restart from current position with new volume
        setTimeout(() => {
          speakWithParams(rateRef.current, pitchRef.current, newVolume, voiceRef.current, currentPos);
        }, 100);
      }
    };

    // Restart speech when rate, pitch, or voice changes during playback
    const handleRateChange = (newRate: number) => {
      setRate(newRate);
      rateRef.current = newRate;
      if (isPlaying || isPaused) {
        // Get current position and continue from there
        const currentPos = currentCharIndexRef.current;
        // Stop current speech
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          try {
            window.speechSynthesis.cancel();
          } catch (error) {
            // Ignore errors
          }
        }
        setIsPlaying(false);
        setIsPaused(false);
        utteranceRef.current = null;
        // Restart from current position with new rate
        setTimeout(() => {
          speakWithParams(newRate, pitchRef.current, volumeRef.current, voiceRef.current, currentPos);
        }, 100);
      }
    };

    const handlePitchChange = (newPitch: number) => {
      setPitch(newPitch);
      pitchRef.current = newPitch;
      if (isPlaying || isPaused) {
        // Get current position and continue from there
        const currentPos = currentCharIndexRef.current;
        // Stop current speech
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          try {
            window.speechSynthesis.cancel();
          } catch (error) {
            // Ignore errors
          }
        }
        setIsPlaying(false);
        setIsPaused(false);
        utteranceRef.current = null;
        // Restart from current position with new pitch
        setTimeout(() => {
          speakWithParams(rateRef.current, newPitch, volumeRef.current, voiceRef.current, currentPos);
        }, 100);
      }
    };

    const handleVoiceChange = (newVoice: SpeechSynthesisVoice | null) => {
      setVoice(newVoice);
      voiceRef.current = newVoice;
      if (isPlaying || isPaused) {
        // Get current position and continue from there
        const currentPos = currentCharIndexRef.current;
        // Stop current speech
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          try {
            window.speechSynthesis.cancel();
          } catch (error) {
            // Ignore errors
          }
        }
        setIsPlaying(false);
        setIsPaused(false);
        utteranceRef.current = null;
        // Restart from current position with new voice
        setTimeout(() => {
          speakWithParams(rateRef.current, pitchRef.current, volumeRef.current, newVoice, currentPos);
        }, 100);
      }
    };

    const pause = () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        const synth = window.speechSynthesis;
        if (synth.speaking && !synth.paused) {
          synth.pause();
          setIsPaused(true);
          isPausedRef.current = true;
        }
      }
    };

    const resume = () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        const synth = window.speechSynthesis;
        if (synth.paused) {
          synth.resume();
          setIsPaused(false);
          isPausedRef.current = false;
        }
      }
    };

    const handleDownload = async () => {
      if (!text || text.trim().length === 0) {
        return;
      }

      setIsDownloading(true);
      try {
        const cleanedText = cleanText(text);
        const voiceLang = voice?.lang || "en-US";
        
        const response = await fetch("/api/tts-download", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: cleanedText,
            rate: rate,
            pitch: pitch,
            volume: volume,
            voiceLang: voiceLang.split("-")[0], // Use language code
          }),
        });

        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          // Format filename: topic-title-CodeWithArqam.mp3
          const sanitizedTitle = title ? title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() : "audio";
          a.download = `${sanitizedTitle}-CodeWithArqam.mp3`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        } else {
          console.error("Failed to download audio");
        }
      } catch (error) {
        console.error("Error downloading audio:", error);
      } finally {
        setIsDownloading(false);
      }
    };

    if (!isSupported) {
      return null;
    }

    // Helper: compute % fill for slider track background
    const sliderFill = (val: number, min: number, max: number) =>
      `${((val - min) / (max - min)) * 100}%`;

    return (
      <div className="rounded-xl overflow-hidden border border-white/8 shadow-lg" style={{ background: 'linear-gradient(135deg, #1a1f2e 0%, #141824 100%)' }}>

        {/* ── Header row: waveform + title + controls ── */}
        <div className="flex items-center gap-2.5 px-3.5 pt-3 pb-2.5 pr-20">
          {/* Mini waveform */}
          <div className="flex items-end gap-[2px] h-6 w-5 flex-shrink-0">
            {[3,5,4,2,5,3].map((h, i) => (
              <span key={i}
                className={`w-[2px] rounded-full transition-all duration-300 ${isPlaying && !isPaused ? 'bg-blue-400' : 'bg-slate-600'}`}
                style={{
                  height: isPlaying && !isPaused ? `${h * 16}%` : '30%',
                  animation: isPlaying && !isPaused ? `tts-bar ${0.4 + i * 0.07}s ease-in-out infinite alternate` : 'none',
                }} />
            ))}
          </div>

          {/* Title + status */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white/85 truncate leading-tight">{title || 'Audio'}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isPlaying && !isPaused ? 'bg-green-400 animate-pulse' : isPaused ? 'bg-amber-400' : 'bg-slate-500'}`} />
              <p className="text-[10px] text-white/35 font-medium">
                {isPlaying && !isPaused ? 'Playing' : isPaused ? 'Paused' : 'Ready'}
              </p>
            </div>
          </div>

          {/* Compact controls */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {!isPlaying && !isPaused && (
              <button onClick={speak} aria-label="Play"
                className="w-7 h-7 rounded-full flex items-center justify-center text-white transition-all cursor-pointer shadow-md hover:scale-110 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}>
                <FaPlay size={9} className="ml-0.5" />
              </button>
            )}
            {isPlaying && !isPaused && (
              <button onClick={pause} aria-label="Pause"
                className="w-7 h-7 rounded-full flex items-center justify-center text-white transition-all cursor-pointer shadow-md hover:scale-110 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}>
                <FaPause size={9} />
              </button>
            )}
            {isPaused && (
              <button onClick={resume} aria-label="Resume"
                className="w-7 h-7 rounded-full flex items-center justify-center text-white transition-all cursor-pointer shadow-md hover:scale-110 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #10b981, #3b82f6)' }}>
                <FaPlay size={9} className="ml-0.5" />
              </button>
            )}
            <button onClick={handleDownload} disabled={isDownloading || !text}
              aria-label="Download"
              className="w-7 h-7 rounded-full bg-white/8 hover:bg-white/15 border border-white/10 disabled:opacity-40 text-white/60 hover:text-white flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed hover:scale-110 active:scale-95">
              {isDownloading ? <FaSpinner size={9} className="animate-spin" /> : <FaDownload size={9} />}
            </button>
          </div>
        </div>

        {/* ── Sliders ── 3 compact columns */}
        <div className="grid grid-cols-3 gap-2 px-3.5 pb-3 pr-20">
          {/* Speed */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Speed</span>
              <span className="text-[9px] font-mono text-blue-300 font-semibold">{rate.toFixed(1)}x</span>
            </div>
            <div className="relative h-1.5 rounded-full bg-white/10">
              <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all"
                style={{ width: sliderFill(rate, 0.5, 2) }} />
              <input type="range" min="0.5" max="2" step="0.1" value={rate}
                onChange={e => handleRateChange(parseFloat(e.target.value))}
                className="absolute inset-0 w-full opacity-0 h-full cursor-pointer" />
            </div>
          </div>

          {/* Pitch */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Pitch</span>
              <span className="text-[9px] font-mono text-violet-300 font-semibold">{pitch.toFixed(1)}</span>
            </div>
            <div className="relative h-1.5 rounded-full bg-white/10">
              <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-500 to-purple-400 transition-all"
                style={{ width: sliderFill(pitch, 0, 2) }} />
              <input type="range" min="0" max="2" step="0.1" value={pitch}
                onChange={e => handlePitchChange(parseFloat(e.target.value))}
                className="absolute inset-0 w-full opacity-0 h-full cursor-pointer" />
            </div>
          </div>

          {/* Volume */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Vol</span>
              <span className="text-[9px] font-mono text-emerald-300 font-semibold">{Math.round(volume * 100)}%</span>
            </div>
            <div className="relative h-1.5 rounded-full bg-white/10">
              <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all"
                style={{ width: sliderFill(volume, 0, 1) }} />
              <input type="range" min="0" max="1" step="0.05" value={volume}
                onChange={e => handleVolumeChange(parseFloat(e.target.value))}
                className="absolute inset-0 w-full opacity-0 h-full cursor-pointer" />
            </div>
          </div>
        </div>

        {/* ── Voice selector ── */}
        {voices.length > 0 && (
          <div className="px-3.5 pb-3 pr-20 border-t border-white/5 pt-2.5">
            <select
              value={voice?.name || ""}
              onChange={e => {
                const selectedVoice = voices.find(v => v.name === e.target.value);
                handleVoiceChange(selectedVoice || null);
              }}
              className="w-full px-2.5 py-1.5 rounded-lg text-[10px] text-white/60 outline-none cursor-pointer transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {voices.map(v => (
                <option key={v.name} value={v.name} className="bg-slate-800 text-white text-xs">
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </div>
        )}

        <style>{`
          @keyframes tts-bar {
            from { transform: scaleY(0.4); }
            to   { transform: scaleY(1); }
          }
        `}</style>
      </div>
    );
  }
);

TextToSpeech.displayName = "TextToSpeech";

export default TextToSpeech;
