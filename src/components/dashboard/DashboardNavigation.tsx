import React from 'react';
import { Lock, Check, ChevronRight, ShieldCheck, FileText, Sparkles } from 'lucide-react';
import { useArchive } from '../../context/ArchiveContext';
import { ARCHIVE_LEVELS } from '../../data/levelData';

export const DashboardNavigation: React.FC = () => {
  const { currentLevel, unlockedLevels, completedLevels, setCurrentLevel, discoveredClues } = useArchive();

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-4">
      {/* System Status Card */}
      <div className="bg-[#121214] border border-[#27272A] rounded-xl p-4 font-mono text-xs space-y-3">
        <div className="flex items-center justify-between border-b border-[#27272A] pb-2.5">
          <span className="text-zinc-500 uppercase tracking-widest text-[10px]">
            System Kernel
          </span>
          <span className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            ONLINE
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-zinc-300">
          <div>
            <p className="text-[10px] text-zinc-500 uppercase">ACCESS CLEARANCE</p>
            <p className="text-white font-semibold">LEVEL 0{currentLevel}</p>
          </div>
          <div>
            <p className="text-[10px] text-zinc-500 uppercase">FILES DISCOVERED</p>
            <p className="font-semibold" style={{ color: 'var(--color-accent)' }}>
              0{completedLevels.length} / 07
            </p>
          </div>
        </div>
      </div>

      {/* Levels Index */}
      <div className="bg-[#121214] border border-[#27272A] rounded-xl p-3 shadow-lg space-y-1">
        <div className="px-3 py-2 border-b border-[#27272A] mb-2 flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
            Archive Registry Index
          </span>
          <span className="text-[10px] font-mono text-zinc-500">7 FILES</span>
        </div>

        <div className="space-y-1">
          {ARCHIVE_LEVELS.map(level => {
            const isCompleted = completedLevels.includes(level.id);
            const isUnlocked = unlockedLevels.includes(level.id);
            const isCurrent = currentLevel === level.id;

            return (
              <button
                key={level.id}
                type="button"
                disabled={!isUnlocked}
                onClick={() => setCurrentLevel(level.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#1E1E24] text-white border shadow-sm'
                    : isUnlocked
                    ? 'text-zinc-300 hover:bg-[#18181C] hover:text-white'
                    : 'text-zinc-600 opacity-50 cursor-not-allowed'
                }`}
                style={
                  isCurrent
                    ? {
                        borderColor: 'var(--color-accent)',
                        boxShadow: '0 0 12px var(--color-accent-subtle)'
                      }
                    : undefined
                }
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-mono shrink-0 ${
                      isCurrent
                        ? 'bg-white text-zinc-950 font-bold'
                        : isUnlocked
                        ? 'bg-[#27272A] text-zinc-300'
                        : 'bg-[#141416] text-zinc-600'
                    }`}
                    style={
                      isCompleted
                        ? {
                            backgroundColor: 'var(--color-accent-subtle)',
                            color: 'var(--color-accent-badge)',
                            border: '1px solid var(--color-accent)'
                          }
                        : undefined
                    }
                  >
                    {isCompleted ? <Check className="w-3 h-3" /> : level.numberStr}
                  </div>

                  <div className="truncate">
                    <p className="text-xs font-medium truncate font-sans">{level.title}</p>
                    <p className="text-[10px] font-mono text-zinc-500 truncate">
                      {level.fileId} · {isCompleted ? 'RECOVERED' : isUnlocked ? 'ACTIVE' : 'ENCRYPTED'}
                    </p>
                  </div>
                </div>

                {!isUnlocked ? (
                  <Lock className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                ) : (
                  <ChevronRight
                    className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                      isCurrent ? 'translate-x-0.5' : 'text-zinc-600'
                    }`}
                    style={isCurrent ? { color: 'var(--color-accent)' } : undefined}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
