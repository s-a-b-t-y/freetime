import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, Binary, Sparkles, Hash } from 'lucide-react';
import { useArchive } from '../../context/ArchiveContext';
import { ARCHIVE_CONFIG } from '../../config/archiveConfig';
import { HintAccordion } from '../common/HintAccordion';
import { archiveAudio } from '../../utils/audio';

export const Level03ThePattern: React.FC = () => {
  const { completeLevel, completedLevels, setCurrentLevel } = useArchive();
  const [answerInput, setAnswerInput] = useState('');
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);
  const [showHelperGrid, setShowHelperGrid] = useState(false);
  const isCompleted = completedLevels.includes(3);

  const { sequenceTitle, sequenceDisplay, ruleExplanation, question, correctAnswer, cipherExplanation, hints } = ARCHIVE_CONFIG.level03;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCompleted) return;

    const clean = answerInput.trim().toUpperCase();
    if (clean === correctAnswer.trim().toUpperCase()) {
      archiveAudio.playUnlock();
      setErrorFeedback(null);
      completeLevel(3, `Decoded Pattern: ${correctAnswer}`);
    } else {
      archiveAudio.playDenied();
      setErrorFeedback('The derived keyword is incorrect. Map each 2-digit number to its 1-indexed alphabetical counterpart (01=A, 02=B...).');
    }
  };

  return (
    <div className="space-y-6">
      {/* Level Header Banner */}
      <div className="bg-[#121214] border border-[#27272A] rounded-xl p-6 shadow-xl space-y-3">
        <div className="flex items-center justify-between font-mono text-xs text-zinc-400 border-b border-[#27272A] pb-3">
          <span className="uppercase tracking-widest text-rose-400 font-semibold">
            ACCESS LEVEL 03 // THE PATTERN
          </span>
          <span>FILE_003</span>
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-serif-archive text-white font-normal">
            {sequenceTitle}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
            {ruleExplanation}
          </p>
        </div>
      </div>

      {/* Sequence Display Dial */}
      <div className="bg-[#141417] border border-[#27272A] rounded-xl p-6 sm:p-8 shadow-2xl text-center space-y-6">
        <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
          {sequenceDisplay.map((num, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-1.5 p-3 sm:p-4 rounded-xl bg-[#0E0E12] border border-[#27272A] min-w-[55px] sm:min-w-[70px] shadow-inner"
            >
              <span className="text-[10px] font-mono text-zinc-400 uppercase">POS {idx + 1}</span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-rose-400 tracking-wider">
                {num}
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                {isCompleted ? correctAnswer[idx] : '?'}
              </span>
            </div>
          ))}
        </div>

        <p className="text-xs sm:text-sm text-zinc-300 font-sans max-w-lg mx-auto leading-relaxed">
          {question}
        </p>

        {/* Toggle Alphabet Helper Grid */}
        <div>
          <button
            type="button"
            onClick={() => setShowHelperGrid(prev => !prev)}
            className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 hover:text-zinc-200 transition-colors underline underline-offset-4 cursor-pointer"
          >
            {showHelperGrid ? 'Hide Alphabet Map' : 'View A1Z26 Alphabet Matrix'}
          </button>

          {showHelperGrid && (
            <div className="mt-4 p-3 bg-[#0B0B0E] border border-[#27272A] rounded-lg max-w-xl mx-auto overflow-x-auto text-[10px] font-mono text-zinc-400 grid grid-cols-6 sm:grid-cols-9 gap-1.5 animate-fade-in">
              {Array.from({ length: 26 }, (_, i) => {
                const char = String.fromCharCode(65 + i);
                const num = (i + 1).toString().padStart(2, '0');
                const isPart = sequenceDisplay.includes(num);
                return (
                  <div
                    key={char}
                    className={`p-1.5 rounded text-center border ${
                      isPart ? 'bg-rose-950/40 border-rose-500/60 text-rose-300 font-bold' : 'border-zinc-800'
                    }`}
                  >
                    <span>{num}={char}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Answer Form */}
      <div className="bg-[#18181C] border border-[#27272A] rounded-xl p-5 shadow-lg space-y-4">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={answerInput}
            onChange={e => setAnswerInput(e.target.value)}
            disabled={isCompleted}
            placeholder="[ ENTER 6-LETTER WORD ]"
            className="flex-1 px-4 py-2.5 bg-[#0E0E12] border border-[#27272A] focus:border-rose-500 rounded-lg text-white font-mono text-sm uppercase tracking-widest outline-none disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={isCompleted || !answerInput.trim()}
            className="px-6 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 font-mono text-xs uppercase tracking-widest font-semibold rounded-lg transition-colors disabled:opacity-40 cursor-pointer"
          >
            {isCompleted ? 'Solved' : 'Verify Keyword'}
          </button>
        </form>

        {errorFeedback && (
          <div className="flex items-center gap-2 text-rose-400 text-xs font-sans bg-rose-950/20 border border-rose-900/40 p-3 rounded-lg">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorFeedback}</span>
          </div>
        )}
      </div>

      {/* Success Reveal */}
      {isCompleted && (
        <div className="bg-[#121215] border border-rose-500/40 rounded-xl p-6 shadow-2xl space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-widest">
            <CheckCircle2 className="w-4 h-4" />
            <span>PATTERN SOLVED // RECORD UNLOCKED</span>
          </div>

          <div className="border-l-2 border-rose-500 pl-4 py-1">
            <p className="text-xs font-mono uppercase text-zinc-500 tracking-wider">
              MATHEMATICAL PROOF // {correctAnswer}
            </p>
            <p className="text-base sm:text-lg font-serif-archive text-zinc-100 italic mt-1 leading-relaxed">
              “{cipherExplanation}”
            </p>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setCurrentLevel(4)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>Advance to Level 04</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Hint System */}
      <HintAccordion levelId={3} hints={hints} />
    </div>
  );
};
