import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, Calendar, Clock, MapPin, Hash, Sparkles } from 'lucide-react';
import { useArchive } from '../../context/ArchiveContext';
import { ARCHIVE_CONFIG } from '../../config/archiveConfig';
import { HintAccordion } from '../common/HintAccordion';
import { archiveAudio } from '../../utils/audio';

export const Level01TheFirstClue: React.FC = () => {
  const { completeLevel, completedLevels, setCurrentLevel } = useArchive();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [inputVal, setInputVal] = useState('');
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);
  const isCompleted = completedLevels.includes(1);

  const { prompt, subprompt, options, correctValue, hints, unlockedQuote } = ARCHIVE_CONFIG.level01;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCompleted) return;

    const clean = inputVal.trim();
    if (clean === correctValue || clean === '10.24' || clean.toLowerCase() === 'date') {
      archiveAudio.playUnlock();
      setErrorFeedback(null);
      completeLevel(1, 'Genesis Date: 10.24');
    } else {
      archiveAudio.playDenied();
      setErrorFeedback('The archive registry rejected this value. Look for the parameter that anchors memory.');
    }
  };

  const handleSelectCard = (val: string) => {
    archiveAudio.playClick();
    setSelectedOption(val);
    setInputVal(val);
    setErrorFeedback(null);
  };

  const getOptionIcon = (type: string) => {
    switch (type) {
      case 'DATE':
        return <Calendar className="w-4 h-4 text-rose-400" />;
      case 'TIME':
        return <Clock className="w-4 h-4 text-sky-400" />;
      case 'LOCATION':
        return <MapPin className="w-4 h-4 text-emerald-400" />;
      default:
        return <Hash className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Level Header Banner */}
      <div className="bg-[#121214] border border-[#27272A] rounded-xl p-6 shadow-xl space-y-3">
        <div className="flex items-center justify-between font-mono text-xs text-zinc-400 border-b border-[#27272A] pb-3">
          <span
            className="uppercase tracking-widest font-semibold px-2 py-0.5 rounded text-[10px]"
            style={{
              backgroundColor: 'var(--color-accent-subtle)',
              color: 'var(--color-accent-badge)'
            }}
          >
            ACCESS LEVEL 01 // ORIGIN SEED
          </span>
          <span>FILE_001</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif-archive text-white font-normal">
            “{prompt}”
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
            {subprompt}
          </p>
        </div>
      </div>

      {/* 4 Archival Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((opt, idx) => {
          const isSelected = selectedOption === opt.value;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectCard(opt.value)}
              className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#1C1C22] border-rose-500/80 shadow-md ring-1 ring-rose-500/40'
                  : 'bg-[#141416] border-[#27272A] hover:border-zinc-500 hover:bg-[#18181C]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                  {opt.label}
                </span>
                {getOptionIcon(opt.type)}
              </div>
              <div className="text-base sm:text-lg font-mono font-semibold text-white tracking-wider mb-1">
                {opt.value}
              </div>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                {opt.contextNote}
              </p>
            </button>
          );
        })}
      </div>

      {/* Input Verification Form */}
      <div className="bg-[#18181C] border border-[#27272A] rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="uppercase tracking-widest text-zinc-400">
            Submit Origin Coordinate
          </span>
          <span className="text-zinc-500">Tap card above or type value</span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            disabled={isCompleted}
            placeholder="[ ENTER VALUE: E.G. 10.24 ]"
            className="flex-1 px-4 py-2.5 bg-[#0E0E12] border border-[#27272A] focus:border-rose-500 rounded-lg text-white font-mono text-sm tracking-wider outline-none disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={isCompleted || !inputVal.trim()}
            className="px-6 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 font-mono text-xs uppercase tracking-widest font-semibold rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {isCompleted ? 'Decoded' : 'Verify Seed'}
          </button>
        </form>

        {errorFeedback && (
          <div className="flex items-center gap-2 text-rose-400 text-xs font-sans bg-rose-950/20 border border-rose-900/40 p-3 rounded-lg">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorFeedback}</span>
          </div>
        )}
      </div>

      {/* Success Reveal Banner */}
      {isCompleted && (
        <div
          className="bg-[#121215] border rounded-xl p-6 shadow-2xl space-y-4 animate-fade-in"
          style={{ borderColor: 'var(--color-accent)' }}
        >
          <div
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-semibold"
            style={{ color: 'var(--color-accent)' }}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>ACCESS GRANTED // LEVEL 01 COMPLETE</span>
          </div>

          <div
            className="border-l-2 pl-4 py-1"
            style={{ borderLeftColor: 'var(--color-accent)' }}
          >
            <p className="text-xs font-mono uppercase text-zinc-500 tracking-wider">
              RECOVERED FILE // FILE_001
            </p>
            <p className="text-lg font-serif-archive text-zinc-100 italic mt-1 leading-relaxed">
              “{unlockedQuote}”
            </p>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setCurrentLevel(2)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-white rounded-lg font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer shadow-lg active:scale-95"
              style={{ backgroundColor: 'var(--color-accent)' }}
            >
              <span>Advance to Level 02</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Hint System */}
      <HintAccordion levelId={1} hints={hints} />
    </div>
  );
};
