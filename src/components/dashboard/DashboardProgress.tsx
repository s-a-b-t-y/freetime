import React from 'react';
import { Check, Lock } from 'lucide-react';
import { useArchive } from '../../context/ArchiveContext';
import { ARCHIVE_LEVELS } from '../../data/levelData';

export const DashboardProgress: React.FC = () => {
  const { currentLevel, unlockedLevels, completedLevels, setCurrentLevel } = useArchive();

  return (
    <div className="bg-[#121214] border border-[#27272A] rounded-xl p-4 sm:p-5 shadow-lg">
      <div className="flex items-center justify-between mb-3 text-xs font-mono">
        <span className="uppercase tracking-widest text-zinc-400">
          Archive Recovery Progress
        </span>
        <span className="text-zinc-200 font-bold">
          0{completedLevels.length} / 07 RECOVERED
        </span>
      </div>

      {/* Nodes Rail */}
      <div className="relative flex items-center justify-between">
        {/* Continuous background bar */}
        <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-0.5 bg-[#27272A] z-0" />

        {ARCHIVE_LEVELS.map(level => {
          const isDone = completedLevels.includes(level.id);
          const isUnlocked = unlockedLevels.includes(level.id);
          const isCurrent = currentLevel === level.id;

          return (
            <button
              key={level.id}
              type="button"
              disabled={!isUnlocked}
              onClick={() => setCurrentLevel(level.id)}
              className={`relative z-10 flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer transition-transform ${
                !isUnlocked ? 'cursor-not-allowed opacity-40' : 'hover:scale-110'
              }`}
              title={`Level ${level.numberStr}: ${level.title} (${
                isDone ? 'Completed' : isUnlocked ? 'Unlocked' : 'Encrypted'
              })`}
            >
              {/* Node Circle */}
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-[11px] font-semibold border transition-all ${
                  isDone
                    ? 'shadow-sm'
                    : isCurrent
                    ? 'bg-[#27272A] border-white text-white ring-2 scale-105'
                    : isUnlocked
                    ? 'bg-[#18181B] border-zinc-500 text-zinc-300'
                    : 'bg-[#0E0E10] border-[#27272A] text-zinc-600'
                }`}
                style={
                  isDone
                    ? {
                        borderColor: 'var(--color-accent)',
                        backgroundColor: 'var(--color-accent-subtle)',
                        color: 'var(--color-accent-badge)'
                      }
                    : isCurrent
                    ? {
                        boxShadow: '0 0 12px var(--color-accent-glow)'
                      }
                    : undefined
                }
              >
                {isDone ? (
                  <Check className="w-3.5 h-3.5 stroke-[3]" style={{ color: 'var(--color-accent)' }} />
                ) : !isUnlocked ? (
                  <Lock className="w-3 h-3 text-zinc-600" />
                ) : (
                  <span>{level.numberStr}</span>
                )}
              </div>

              {/* Title label hidden on very small screens, visible on tablet+ */}
              <span
                className={`hidden md:inline text-[10px] font-mono tracking-wider truncate max-w-[80px] text-center ${
                  isCurrent ? 'text-zinc-200 font-semibold' : 'text-zinc-500'
                }`}
              >
                {level.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
