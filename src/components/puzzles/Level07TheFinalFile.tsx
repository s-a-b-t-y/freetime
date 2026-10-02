import React, { useState } from 'react';
import { AlertCircle, Lock, ShieldAlert, Sparkles, ArrowRight, Eye } from 'lucide-react';
import { useArchive } from '../../context/ArchiveContext';
import { ARCHIVE_CONFIG } from '../../config/archiveConfig';
import { HintAccordion } from '../common/HintAccordion';
import { archiveAudio } from '../../utils/audio';

interface Props {
  onTriggerReveal: () => void;
}

export const Level07TheFinalFile: React.FC<Props> = ({ onTriggerReveal }) => {
  const { completeLevel, completedLevels } = useArchive();
  const [hasOpenedFile, setHasOpenedFile] = useState(false);
  const [verificationInput, setVerificationInput] = useState('');
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);
  const isCompleted = completedLevels.includes(7);

  const { fileCode, statusLabel, verificationQuestion, verificationExpectedAnswer, hints } = ARCHIVE_CONFIG.level07;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCompleted) {
      onTriggerReveal();
      return;
    }

    const clean = verificationInput.trim().toUpperCase();
    if (clean === verificationExpectedAnswer.trim().toUpperCase()) {
      archiveAudio.playFinalHarmonic();
      setErrorFeedback(null);
      completeLevel(7, 'Master Verification Solved: EVERYTHING');
      onTriggerReveal();
    } else {
      archiveAudio.playDenied();
      setErrorFeedback('That answer does not unlock the final seal. Think about the scale of what changed.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Level Header Banner */}
      <div className="bg-[#121214] border border-[#27272A] rounded-xl p-6 shadow-xl space-y-3">
        <div className="flex items-center justify-between font-mono text-xs text-zinc-400 border-b border-[#27272A] pb-3">
          <span className="uppercase tracking-widest text-rose-400 font-semibold">
            FINAL ACCESS CLEARANCE // LEVEL 07
          </span>
          <span className="font-bold text-rose-500">{fileCode}</span>
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-serif-archive text-white font-normal">
            The Master Record
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
            All peripheral files have been synthesized. Only the foundational root record remains behind cryptographic lock.
          </p>
        </div>
      </div>

      {/* Sealed File Dossier */}
      <div className="bg-[#151518] border border-[#27272A] rounded-xl p-6 sm:p-8 shadow-2xl text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1F1F24] border border-[#33333C] text-rose-500 mx-auto">
          <Lock className="w-8 h-8 stroke-[1.5]" />
        </div>

        <div className="space-y-1 font-mono">
          <p className="text-xs text-zinc-400 uppercase tracking-widest">RECORD DESIGNATION</p>
          <p className="text-2xl text-white font-bold tracking-widest">{fileCode}</p>
          <p className="text-xs text-rose-400/90 pt-1 tracking-wider uppercase font-semibold">
            {statusLabel}
          </p>
        </div>

        {!hasOpenedFile && !isCompleted ? (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                archiveAudio.playClick();
                setHasOpenedFile(true);
              }}
              className="px-8 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs uppercase tracking-widest font-semibold rounded-lg shadow-lg hover:shadow-rose-900/40 transition-all cursor-pointer"
            >
              Open File
            </button>
          </div>
        ) : (
          /* Verification Form */
          <div className="max-w-md mx-auto space-y-5 text-left pt-4 border-t border-[#27272A] animate-fade-in">
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 block">
                Final Verification Protocol
              </span>
              <p className="text-sm sm:text-base font-serif-archive text-zinc-200 italic leading-relaxed">
                “{verificationQuestion}”
              </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-4">
              <input
                type="text"
                value={verificationInput}
                onChange={e => setVerificationInput(e.target.value)}
                placeholder="[ ENTER FINAL VERIFICATION ANSWER ]"
                className="w-full px-4 py-3 bg-[#0E0E12] border border-[#27272A] focus:border-rose-500 rounded-lg text-white font-mono text-xs uppercase tracking-widest outline-none"
              />

              <button
                type="submit"
                disabled={!verificationInput.trim()}
                className="w-full py-3 bg-zinc-100 hover:bg-white text-zinc-950 font-mono text-xs uppercase tracking-widest font-semibold rounded-lg transition-colors disabled:opacity-40 cursor-pointer shadow-xl flex items-center justify-center gap-2"
              >
                <span>Authorize Full Disclosure</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {errorFeedback && (
              <div className="flex items-center gap-2 text-rose-400 text-xs font-sans bg-rose-950/20 border border-rose-900/40 p-2.5 rounded-lg">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorFeedback}</span>
              </div>
            )}
          </div>
        )}

        {/* If already completed, button to view the cinematic reveal again */}
        {isCompleted && (
          <div className="pt-4 border-t border-[#27272A]">
            <button
              type="button"
              onClick={onTriggerReveal}
              className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs uppercase tracking-widest rounded-lg transition-colors cursor-pointer shadow-xl"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Final Reveal Presentation</span>
            </button>
          </div>
        )}
      </div>

      {/* Hint System */}
      <HintAccordion levelId={7} hints={hints} />
    </div>
  );
};
