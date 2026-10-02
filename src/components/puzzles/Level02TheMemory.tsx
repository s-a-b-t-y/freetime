import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, Eye, Calendar, MapPin, Sparkles, Lock } from 'lucide-react';
import { useArchive } from '../../context/ArchiveContext';
import { ARCHIVE_CONFIG } from '../../config/archiveConfig';
import { MemoryPhotoArt } from '../../assets/illustrations';
import { HintAccordion } from '../common/HintAccordion';
import { archiveAudio } from '../../utils/audio';

export const Level02TheMemory: React.FC = () => {
  const { completeLevel, completedLevels, setCurrentLevel, openImageViewer } = useArchive();
  const [cipherInput, setCipherInput] = useState('');
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);
  const isCompleted = completedLevels.includes(2);

  const { memory, hints } = ARCHIVE_CONFIG.level02;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCompleted) return;

    const clean = cipherInput.trim().toUpperCase();
    if (clean === 'SILENCE' || clean === 'WE SAT BY THE WATER IN SILENCE') {
      archiveAudio.playUnlock();
      setErrorFeedback(null);
      completeLevel(2, 'Decoded Memory: Seaside Silence');
    } else {
      archiveAudio.playDenied();
      setErrorFeedback('Cipher mismatch. Look at the last word "VLOHQFH" and shift each letter backward by 3.');
    }
  };

  const handleOpenPhoto = () => {
    openImageViewer({
      url: memory.imageUrl,
      title: memory.title,
      date: memory.date,
      location: memory.location,
      caption: memory.caption
    });
  };

  return (
    <div className="space-y-6">
      {/* Level Header Banner */}
      <div className="bg-[#121214] border border-[#27272A] rounded-xl p-6 shadow-xl space-y-3">
        <div className="flex items-center justify-between font-mono text-xs text-zinc-400 border-b border-[#27272A] pb-3">
          <span className="uppercase tracking-widest text-rose-400 font-semibold">
            ACCESS LEVEL 02 // PERSONAL MEMORY
          </span>
          <span>FILE_002</span>
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-serif-archive text-white font-normal">
            The Seaside Observatory Record
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
            A cryptographic partition was detected on this memory card. Decode the encrypted cadence to reconstruct the record.
          </p>
        </div>
      </div>

      {/* Memory Card with Photo Preview */}
      <div className="bg-[#141417] border border-[#27272A] rounded-xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Visual Side */}
          <div className="relative bg-[#0E0E11] p-4 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#27272A]">
            <div className="relative aspect-4/3 rounded-lg overflow-hidden border border-[#27272A] group">
              <MemoryPhotoArt />
              {/* Click to open in full lightbox */}
              <button
                type="button"
                onClick={handleOpenPhoto}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs uppercase tracking-wider backdrop-blur-xs cursor-pointer"
              >
                <Eye className="w-4 h-4" /> Inspect Photograph
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <div className="flex items-center gap-1.5 text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>{memory.location}</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-400">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                <span>{memory.date}</span>
              </div>
            </div>
          </div>

          {/* Cipher / Memory Prose Side */}
          <div className="p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-zinc-500 tracking-wider">RECORD // {memory.id}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold ${
                  isCompleted ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'
                }`}>
                  {isCompleted ? 'DECRYPTED' : 'ENCRYPTED CIPHER'}
                </span>
              </div>

              <h3 className="text-xl font-serif-archive text-zinc-100">
                {memory.title}
              </h3>

              {/* Cipher or Plain Text */}
              {!isCompleted ? (
                <div className="space-y-3">
                  <div className="p-4 bg-[#0D0D10] border border-[#27272A] rounded-lg">
                    <p className="text-[10px] font-mono uppercase text-zinc-400 mb-1">
                      Caesar Inscription (+3 Shift):
                    </p>
                    <p className="font-mono text-rose-400 tracking-widest text-sm break-all font-semibold">
                      {memory.cipherText}
                    </p>
                  </div>
                  <p className="text-xs text-zinc-400 font-sans italic leading-relaxed">
                    “I remember when we sat by the water in _________.”
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-[#18181D] border-l-2 border-rose-500 rounded-r-lg space-y-2 animate-fade-in">
                  <p className="text-sm font-serif-archive text-zinc-200 italic leading-relaxed">
                    “{memory.plainText}”
                  </p>
                  <p className="text-xs text-zinc-400 font-sans">
                    — {memory.caption}
                  </p>
                </div>
              )}
            </div>

            {/* Input Form for Decryption */}
            {!isCompleted ? (
              <form onSubmit={handleSubmit} className="space-y-3 pt-2">
                <label
                  htmlFor="cipher-input"
                  className="block font-mono text-xs uppercase tracking-widest text-zinc-400"
                >
                  Enter Decoded Word (or Full Phrase)
                </label>
                <div className="flex gap-2">
                  <input
                    id="cipher-input"
                    type="text"
                    value={cipherInput}
                    onChange={e => setCipherInput(e.target.value)}
                    placeholder="[ E.G. SILENCE ]"
                    className="flex-1 px-4 py-2.5 bg-[#0E0E12] border border-[#27272A] focus:border-rose-500 rounded-lg text-white font-mono text-xs uppercase tracking-widest outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!cipherInput.trim()}
                    className="px-5 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 font-mono text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors disabled:opacity-40 cursor-pointer"
                  >
                    Decode
                  </button>
                </div>

                {errorFeedback && (
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-sans bg-rose-950/20 border border-rose-900/40 p-2.5 rounded-lg">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorFeedback}</span>
                  </div>
                )}
              </form>
            ) : (
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentLevel(3)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>Advance to Level 03</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hint System */}
      <HintAccordion levelId={2} hints={hints} />
    </div>
  );
};
