import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useArchive } from '../../context/ArchiveContext';

export const SoundToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { soundEnabled, toggleSound } = useArchive();

  return (
    <button
      type="button"
      onClick={toggleSound}
      className={`group relative inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer shadow-lg backdrop-blur-md active:scale-95 ${
        soundEnabled
          ? 'bg-[#14151B] border-zinc-600 text-white shadow-sm'
          : 'bg-[#121215]/90 border-[#27272A] hover:border-zinc-500 text-zinc-400 hover:text-zinc-200'
      } ${className}`}
      style={
        soundEnabled
          ? {
              borderColor: 'var(--color-accent)',
              boxShadow: '0 0 14px var(--color-accent-subtle)'
            }
          : undefined
      }
      title={soundEnabled ? 'Acoustic Soundscape: Active (Click to mute)' : 'Acoustic Soundscape: Muted (Click to enable subtle synthesizer)'}
      aria-label={soundEnabled ? 'Mute audio feedback' : 'Enable acoustic audio feedback'}
    >
      {/* Dynamic Animated Equalizer Soundwave Bars */}
      <div className="flex items-end gap-0.5 h-3.5 w-3.5 justify-center shrink-0">
        {soundEnabled ? (
          <>
            <span
              className="w-0.5 rounded-full animate-eq-1"
              style={{ backgroundColor: 'var(--color-accent)' }}
            />
            <span
              className="w-0.5 rounded-full animate-eq-2"
              style={{ backgroundColor: 'var(--color-accent)' }}
            />
            <span
              className="w-0.5 rounded-full animate-eq-3"
              style={{ backgroundColor: 'var(--color-accent)' }}
            />
            <span
              className="w-0.5 rounded-full animate-eq-4"
              style={{ backgroundColor: 'var(--color-accent)' }}
            />
          </>
        ) : (
          <>
            <span className="w-0.5 h-1 rounded-full bg-zinc-600" />
            <span className="w-0.5 h-1.5 rounded-full bg-zinc-600" />
            <span className="w-0.5 h-1 rounded-full bg-zinc-600" />
            <span className="w-0.5 h-0.5 rounded-full bg-zinc-600" />
          </>
        )}
      </div>

      {/* Label & Status */}
      <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider">
        <span className="hidden sm:inline text-zinc-400">Audio</span>
        <span
          className={`font-semibold ${
            soundEnabled ? 'text-white' : 'text-zinc-500'
          }`}
          style={soundEnabled ? { color: 'var(--color-accent-badge)' } : undefined}
        >
          {soundEnabled ? 'Active' : 'Off'}
        </span>
      </div>

      {/* Subtle indicator dot */}
      <span
        className={`w-1.5 h-1.5 rounded-full transition-all ${
          soundEnabled ? 'animate-pulse' : 'bg-zinc-700'
        }`}
        style={soundEnabled ? { backgroundColor: 'var(--color-accent)' } : undefined}
      />
    </button>
  );
};
