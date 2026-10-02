import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Key, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { useArchive } from '../../context/ArchiveContext';
import { ARCHIVE_CONFIG } from '../../config/archiveConfig';
import { ARCHIVE_LEVELS } from '../../data/levelData';

export const OverviewPanel: React.FC<{ onGoToLevel: (lvl: number) => void }> = ({ onGoToLevel }) => {
  const { currentLevel, completedLevels, discoveredClues, easterEggsDiscovered, hasCompletedArchive } = useArchive();

  const currentLevelInfo = ARCHIVE_LEVELS.find(l => l.id === currentLevel) || ARCHIVE_LEVELS[0];
  const isCurrentDone = completedLevels.includes(currentLevel);

  return (
    <div className="space-y-6">
      {/* Current Objective Hero Card */}
      <div className="bg-[#141417] border border-[#27272A] rounded-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-semibold"
            style={{ color: 'var(--color-accent)' }}
          >
            <Compass className="w-4 h-4" />
            <span>CURRENT OPERATIONAL OBJECTIVE</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-serif-archive text-white font-normal">
              {isCurrentDone
                ? 'Level Completed — Ready for Next Level'
                : `Level 0${currentLevelInfo.id}: ${currentLevelInfo.title}`}
            </h2>

            <p className="text-sm text-zinc-300 font-sans leading-relaxed max-w-xl">
              {currentLevelInfo.subtitle}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onGoToLevel(currentLevel)}
              className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg font-mono text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer shadow-lg active:scale-95"
              style={{ backgroundColor: 'var(--color-accent)' }}
            >
              <span>{isCurrentDone ? 'Inspect Completed Level' : 'Begin Investigation'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono text-zinc-500">
              {currentLevelInfo.fileId} · {isCurrentDone ? 'RECOVERED' : 'UNRESOLVED'}
            </span>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Discovered Clues & Intel Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Clues Discovered */}
        <div className="bg-[#121214] border border-[#27272A] rounded-xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between border-b border-[#27272A] pb-2 text-xs font-mono">
            <span className="uppercase tracking-widest text-zinc-400">
              Recovered Clues &amp; Keys
            </span>
            <span className="font-bold" style={{ color: 'var(--color-accent)' }}>
              {discoveredClues.length} LOGGED
            </span>
          </div>

          {discoveredClues.length === 0 ? (
            <p className="text-xs text-zinc-500 font-sans italic py-4 text-center">
              No clues logged yet. Solve Level 01 to anchor the first coordinate.
            </p>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {discoveredClues.map((clue, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded bg-[#16161A] border border-[#222226] text-xs font-mono text-zinc-300"
                >
                  <Key className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--color-accent)' }} />
                  <span className="truncate">{clue}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Latent Discoveries / Easter Eggs */}
        <div className="bg-[#121214] border border-[#27272A] rounded-xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between border-b border-[#27272A] pb-2 text-xs font-mono">
            <span className="uppercase tracking-widest text-zinc-400">
              Latent Curiosities Unlocked
            </span>
            <span className="text-sky-400 font-bold">{easterEggsDiscovered.length} FOUND</span>
          </div>

          {easterEggsDiscovered.length === 0 ? (
            <p className="text-xs text-zinc-500 font-sans italic py-4 text-center">
              Hidden secrets exist beneath the surface. Try clicking the archive seal emblem or accessing the terminal.
            </p>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {easterEggsDiscovered.map((egg, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded bg-[#16161A] border border-[#222226] text-xs font-mono text-zinc-300"
                >
                  <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="truncate capitalize">{egg.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
