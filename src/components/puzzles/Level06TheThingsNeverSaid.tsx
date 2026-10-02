import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, Lock, Unlock, Sparkles, Heart } from 'lucide-react';
import { useArchive } from '../../context/ArchiveContext';
import { ARCHIVE_CONFIG } from '../../config/archiveConfig';
import { HintAccordion } from '../common/HintAccordion';
import { archiveAudio } from '../../utils/audio';

export const Level06TheThingsNeverSaid: React.FC = () => {
  const { completeLevel, completedLevels, setCurrentLevel } = useArchive();
  const [unlockedFragmentIds, setUnlockedFragmentIds] = useState<string[]>([]);
  const [activeModalFragId, setActiveModalFragId] = useState<string | null>(null);
  const [inputKey, setInputKey] = useState('');
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);
  const isCompleted = completedLevels.includes(6);

  const { introText, fragments, allFragmentsCompletedMessage, hints } = ARCHIVE_CONFIG.level06;

  const handleOpenFragment = (id: string) => {
    archiveAudio.playClick();
    setActiveModalFragId(id);
    setInputKey('');
    setErrorFeedback(null);
  };

  const handleUnlockFragment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalFragId) return;

    const frag = fragments.find(f => f.id === activeModalFragId);
    if (!frag) return;

    const clean = inputKey.trim().toUpperCase();
    if (clean === frag.key.trim().toUpperCase()) {
      archiveAudio.playUnlock();
      const nextUnlocked = [...unlockedFragmentIds, frag.id];
      setUnlockedFragmentIds(nextUnlocked);
      setActiveModalFragId(null);
      setErrorFeedback(null);

      // If all 4 unlocked, complete level!
      if (nextUnlocked.length >= fragments.length && !isCompleted) {
        completeLevel(6, 'Reconstructed 4 Silent Truths');
      }
    } else {
      archiveAudio.playDenied();
      setErrorFeedback('That answer does not resonate with this fragment.');
    }
  };

  const allDone = isCompleted || unlockedFragmentIds.length >= fragments.length;

  return (
    <div className="space-y-8">
      {/* Minimalist Centered Intro */}
      <div className="text-center py-6 sm:py-10 space-y-4 max-w-lg mx-auto">
        <span className="font-mono text-xs uppercase tracking-widest text-rose-400">
          ACCESS LEVEL 06 // SILENT TRUTHS
        </span>

        <h2 className="text-2xl sm:text-4xl font-serif-archive text-zinc-100 font-normal leading-snug">
          “{introText}”
        </h2>

        <p className="text-xs text-zinc-400 font-sans">
          Four fragments remain suspended in silence. Reconstruct each piece to reach the final archive threshold.
        </p>
      </div>

      {/* 4 Fragment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fragments.map((frag, idx) => {
          const isFragUnlocked = isCompleted || unlockedFragmentIds.includes(frag.id);

          return (
            <div
              key={frag.id}
              className={`p-6 rounded-xl border transition-all ${
                isFragUnlocked
                  ? 'bg-[#18181D] border-rose-500/40 shadow-xl'
                  : 'bg-[#121214] border-[#27272A] hover:border-zinc-500'
              }`}
            >
              <div className="flex items-center justify-between mb-3 font-mono text-xs">
                <span className="text-zinc-500 font-semibold">{frag.code}</span>
                {isFragUnlocked ? (
                  <span className="flex items-center gap-1 text-rose-400 text-[10px] uppercase">
                    <Unlock className="w-3 h-3" /> RESTORED
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-zinc-600 text-[10px] uppercase">
                    <Lock className="w-3 h-3" /> LOCKED
                  </span>
                )}
              </div>

              {isFragUnlocked ? (
                <div className="space-y-2 animate-fade-in">
                  <p className="text-sm font-serif-archive text-zinc-100 leading-relaxed italic">
                    “{frag.revealedText}”
                  </p>
                  <p className="text-[10px] font-mono text-rose-400/80 uppercase">
                    Key: {frag.key}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs text-zinc-400 font-sans italic">
                    {frag.prompt}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleOpenFragment(frag.id)}
                    className="w-full py-2 bg-[#1A1A1E] hover:bg-zinc-800 text-zinc-200 hover:text-white border border-[#27272A] rounded-lg font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Resolve Fragment [{idx + 1}]
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pop-up dialog for entering fragment key */}
      {activeModalFragId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#18181C] border border-[#27272A] rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4">
            {(() => {
              const activeFrag = fragments.find(f => f.id === activeModalFragId);
              if (!activeFrag) return null;

              return (
                <>
                  <div className="flex items-center justify-between border-b border-[#27272A] pb-2 text-xs font-mono">
                    <span className="text-rose-400 font-semibold">{activeFrag.code}</span>
                    <button
                      type="button"
                      onClick={() => setActiveModalFragId(null)}
                      className="text-zinc-500 hover:text-white"
                    >
                      Close
                    </button>
                  </div>

                  <p className="text-sm text-zinc-200 font-serif-archive italic leading-relaxed">
                    “{activeFrag.prompt}”
                  </p>

                  <form onSubmit={handleUnlockFragment} className="space-y-3">
                    <input
                      type="text"
                      autoFocus
                      value={inputKey}
                      onChange={e => setInputKey(e.target.value)}
                      placeholder="[ ENTER RECOGNIZED WORD ]"
                      className="w-full px-4 py-2.5 bg-[#0E0E12] border border-[#27272A] focus:border-rose-500 rounded-lg text-white font-mono text-xs uppercase tracking-widest outline-none"
                    />

                    {errorFeedback && (
                      <p className="text-xs text-rose-400 font-sans">{errorFeedback}</p>
                    )}

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setActiveModalFragId(null)}
                        className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={!inputKey.trim()}
                        className="px-4 py-1.5 bg-zinc-100 hover:bg-white text-zinc-950 font-mono text-xs uppercase font-semibold rounded cursor-pointer"
                      >
                        Restore
                      </button>
                    </div>
                  </form>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Completion Banner */}
      {allDone && (
        <div className="bg-[#121215] border border-rose-500/40 rounded-xl p-6 shadow-2xl space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-widest">
            <CheckCircle2 className="w-4 h-4" />
            <span>ALL FOUR FRAGMENTS RESTORED // LEVEL 06 COMPLETE</span>
          </div>

          <p className="text-base font-serif-archive text-zinc-200 italic leading-relaxed">
            {allFragmentsCompletedMessage}
          </p>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setCurrentLevel(7)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-lg"
            >
              <span>Unlock Final Gate (Level 07)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Hint System */}
      <HintAccordion levelId={6} hints={hints} />
    </div>
  );
};
