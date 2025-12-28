"use client";

import { useState, useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from "react";
import { FaPlay, FaPause, FaVolumeUp } from "react-icons/fa";

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

    if (!isSupported) {
      return null;
    }

    return (
      <div className="text-to-speech-container mt-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
        <div className="flex items-center gap-2 mb-3">
          <FaVolumeUp className="text-blue-600 dark:text-blue-400" size={18} />
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Text to Speech
          </h3>
        </div>

        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {!isPlaying && !isPaused && (
            <button
              onClick={speak}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm font-medium cursor-pointer"
              aria-label="Play"
            >
              <FaPlay size={14} />
              Play
            </button>
          )}
          
          {isPlaying && !isPaused && (
            <button
              onClick={pause}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm font-medium cursor-pointer"
              aria-label="Pause"
            >
              <FaPause size={14} />
              Pause
            </button>
          )}
          
          {isPaused && (
            <button
              onClick={resume}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm font-medium cursor-pointer"
              aria-label="Resume"
            >
              <FaPlay size={14} />
              Resume
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div>
            <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
              Speed: {rate.toFixed(1)}x
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => handleRateChange(parseFloat(e.target.value))}
              className="w-full cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
              Pitch: {pitch.toFixed(1)}
            </label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => handlePitchChange(parseFloat(e.target.value))}
              className="w-full cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
              Volume: {Math.round(volume * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full cursor-pointer"
            />
          </div>
        </div>

        {voices.length > 0 && (
          <div className="mt-3">
            <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
              Voice
            </label>
            <select
              value={voice?.name || ""}
              onChange={(e) => {
                const selectedVoice = voices.find((v) => v.name === e.target.value);
                handleVoiceChange(selectedVoice || null);
              }}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-slate-100 cursor-pointer"
            >
              {voices.map((v) => (
                <option key={v.name} value={v.name}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    );
  }
);

TextToSpeech.displayName = "TextToSpeech";

export default TextToSpeech;
