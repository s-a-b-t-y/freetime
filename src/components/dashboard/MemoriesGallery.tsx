import React from 'react';
import { Eye, Calendar, MapPin, Sparkles, Lock, ArrowRight } from 'lucide-react';
import { useArchive } from '../../context/ArchiveContext';
import { ARCHIVE_CONFIG } from '../../config/archiveConfig';
import { ARCHIVE_LEVELS } from '../../data/levelData';
import { MemoryPhotoArt, CluePhotoArt, FinalRevealArt } from '../../assets/illustrations';

export const MemoriesGallery: React.FC<{ onSelectLevel: (lvl: number) => void }> = ({ onSelectLevel }) => {
  const { completedLevels, openImageViewer } = useArchive();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#121214] border border-[#27272A] rounded-xl p-6 shadow-xl space-y-2">
        <div className="flex items-center justify-between font-mono text-xs text-zinc-400 border-b border-[#27272A] pb-3">
          <span className="uppercase tracking-widest text-rose-400 font-semibold">
            ARCHIVAL RETROSPECTIVE // RECOVERED MEMORIES
          </span>
          <span>{completedLevels.length} / 07 RESTORED</span>
        </div>
        <h2 className="text-2xl font-serif-archive text-white">
          Decrypted Records &amp; Captured Moments
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
          Every puzzle solved permanently anchors an unalterable memory into this retrospective.
        </p>
      </div>

      {/* Grid of 7 Records */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ARCHIVE_LEVELS.map(level => {
          const isDone = completedLevels.includes(level.id);

          return (
            <div
              key={level.id}
              className={`rounded-xl border p-5 transition-all flex flex-col justify-between ${
                isDone
                  ? 'bg-[#151518] border-rose-500/30 shadow-lg'
                  : 'bg-[#101012] border-[#222226] opacity-60'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">{level.fileId}</span>
                  {isDone ? (
                    <span className="text-rose-400 text-[10px] uppercase font-semibold">
                      RECOVERED
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-zinc-600 text-[10px] uppercase">
                      <Lock className="w-3 h-3" /> ENCRYPTED
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-serif-archive text-zinc-100">
                  {level.unlockedFileTitle}
                </h3>

                {isDone ? (
                  <p className="text-xs sm:text-sm text-zinc-300 font-serif-archive italic leading-relaxed">
                    “{level.unlockedContent}”
                  </p>
                ) : (
                  <p className="text-xs text-zinc-600 font-sans italic">
                    Access restricted. Solve Level 0{level.id} challenge to reveal this record.
                  </p>
                )}
              </div>

              <div className="pt-4 mt-3 border-t border-[#222226] flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-500">
                  LEVEL 0{level.id}
                </span>

                <button
                  type="button"
                  onClick={() => onSelectLevel(level.id)}
                  className="inline-flex items-center gap-1 text-xs font-mono text-zinc-300 hover:text-white hover:underline underline-offset-4 cursor-pointer"
                >
                  <span>{isDone ? 'Revisit Challenge' : 'Inspect Level'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
