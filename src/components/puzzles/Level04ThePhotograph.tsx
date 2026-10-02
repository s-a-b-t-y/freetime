import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, Eye, Calendar, Sparkles, MapPin, ZoomIn } from 'lucide-react';
import { useArchive } from '../../context/ArchiveContext';
import { ARCHIVE_CONFIG } from '../../config/archiveConfig';
import { CluePhotoArt } from '../../assets/illustrations';
import { HintAccordion } from '../common/HintAccordion';
import { archiveAudio } from '../../utils/audio';

export const Level04ThePhotograph: React.FC = () => {
  const { completeLevel, completedLevels, setCurrentLevel, openImageViewer } = useArchive();
  const [keywordInput, setKeywordInput] = useState('');
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);
  const isCompleted = completedLevels.includes(4);

  const { photo, prompt, requiredDiscoveryWord, hints } = ARCHIVE_CONFIG.level04;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCompleted) return;

    const clean = keywordInput.trim().toUpperCase();
    if (clean === requiredDiscoveryWord.trim().toUpperCase()) {
      archiveAudio.playUnlock();
      setErrorFeedback(null);
      completeLevel(4, `Discovered Inscription: ${requiredDiscoveryWord}`);
    } else {
      archiveAudio.playDenied();
      setErrorFeedback('That is not the inscription recorded in the margin. Inspect the photograph carefully near the brass key.');
    }
  };

  const handleInspect = () => {
    openImageViewer({
      url: photo.imageUrl,
      title: photo.title,
      date: photo.date,
      location: photo.location,
      caption: photo.description,
      hotspot: photo.hotspot,
      isHotspotActive: true
    });
  };

  return (
    <div className="space-y-6">
      {/* Level Header Banner */}
      <div className="bg-[#121214] border border-[#27272A] rounded-xl p-6 shadow-xl space-y-3">
        <div className="flex items-center justify-between font-mono text-xs text-zinc-400 border-b border-[#27272A] pb-3">
          <span className="uppercase tracking-widest text-rose-400 font-semibold">
            ACCESS LEVEL 04 // THE PHOTOGRAPH
          </span>
          <span>FILE_004</span>
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-serif-archive text-white font-normal">
            Artifact Inspection &amp; Hidden Margin
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
            {prompt}
          </p>
        </div>
      </div>

      {/* Interactive Photo Artifact Card */}
      <div className="bg-[#141417] border border-[#27272A] rounded-xl overflow-hidden shadow-2xl">
        <div className="relative aspect-16/10 bg-[#0A0A0D] flex items-center justify-center p-4">
          <div className="w-full max-w-2xl h-full relative rounded border border-[#27272A] overflow-hidden group">
            <CluePhotoArt showHotspotHint={false} />

            {/* Click to open Lightbox overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-xs">
              <button
                type="button"
                onClick={handleInspect}
                className="px-5 py-2.5 bg-[#18181B] hover:bg-zinc-800 text-white border border-[#27272A] rounded-lg font-mono text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-xl transition-all"
              >
                <ZoomIn className="w-4 h-4 text-rose-400" />
                <span>Launch High-Resolution Lightbox</span>
              </button>
            </div>
          </div>
        </div>

        {/* Artifact Metadata Bar */}
        <div className="p-5 border-t border-[#27272A] bg-[#121215] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-zinc-400">
          <div className="space-y-1">
            <p className="text-zinc-200 font-semibold">{photo.title}</p>
            <p className="text-[11px] text-zinc-500 font-sans">
              {photo.description}
            </p>
          </div>

          <button
            type="button"
            onClick={handleInspect}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-[#1C1C22] hover:bg-[#27272F] text-zinc-200 hover:text-white border border-[#27272A] rounded-lg text-xs font-mono transition-colors cursor-pointer shrink-0"
          >
            <Eye className="w-3.5 h-3.5 text-rose-400" />
            <span>Inspect Artifact</span>
          </button>
        </div>
      </div>

      {/* Submit Inscription Form */}
      <div className="bg-[#18181C] border border-[#27272A] rounded-xl p-5 shadow-lg space-y-4">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={keywordInput}
            onChange={e => setKeywordInput(e.target.value)}
            disabled={isCompleted}
            placeholder="[ ENTER DISCOVERED INSCRIPTION: E.G. ECHOES ]"
            className="flex-1 px-4 py-2.5 bg-[#0E0E12] border border-[#27272A] focus:border-rose-500 rounded-lg text-white font-mono text-sm uppercase tracking-widest outline-none disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={isCompleted || !keywordInput.trim()}
            className="px-6 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 font-mono text-xs uppercase tracking-widest font-semibold rounded-lg transition-colors disabled:opacity-40 cursor-pointer"
          >
            {isCompleted ? 'Verified' : 'Verify Discovery'}
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
        <div className="bg-[#121215] border border-rose-500/40 rounded-xl p-6 shadow-2xl space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-widest">
            <CheckCircle2 className="w-4 h-4" />
            <span>MICRO-INSCRIPTION RECOVERED // LEVEL 04 COMPLETE</span>
          </div>

          <div className="border-l-2 border-rose-500 pl-4 py-1">
            <p className="text-xs font-mono uppercase text-zinc-500 tracking-wider">
              ARTIFACT CONTEXT // {requiredDiscoveryWord}
            </p>
            <p className="text-base sm:text-lg font-serif-archive text-zinc-100 italic mt-1 leading-relaxed">
              “Not everything meaningful in a picture is immediately visible to an untrained eye. You looked where others walked past.”
            </p>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setCurrentLevel(5)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>Advance to Level 05</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Hint System */}
      <HintAccordion levelId={4} hints={hints} />
    </div>
  );
};
