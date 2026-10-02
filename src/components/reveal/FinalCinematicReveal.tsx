import React, { useState, useEffect } from 'react';
import { Sparkles, RotateCcw, Heart, CheckCircle2, Calendar, User, Eye } from 'lucide-react';
import { useArchive } from '../../context/ArchiveContext';
import { ARCHIVE_CONFIG } from '../../config/archiveConfig';
import { FinalRevealArt } from '../../assets/illustrations';
import { archiveAudio } from '../../utils/audio';

interface Props {
  onRevisit: () => void;
}

export const FinalCinematicReveal: React.FC<Props> = ({ onRevisit }) => {
  const { openImageViewer } = useArchive();
  const [phase, setPhase] = useState<number>(0);

  const { leadIn, cinematicQuotes, personalLetter, closingStatement, finalPhotoCaption, finalPhotoDate } = ARCHIVE_CONFIG.finalReveal;

  useEffect(() => {
    // Cinematic phase pacing
    const t1 = setTimeout(() => setPhase(1), 1200); // Fade from black to ARCHIVE COMPLETE
    const t2 = setTimeout(() => setPhase(2), 3200); // Quote 1
    const t3 = setTimeout(() => setPhase(3), 5500); // Full letter & Final Photo

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleInspectFinalPhoto = () => {
    openImageViewer({
      title: 'MASTER ARCHIVE ARTIFACT // PERMANENT SILHOUETTE',
      date: finalPhotoDate,
      location: 'The Horizon',
      caption: finalPhotoCaption
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070709] text-zinc-100 overflow-y-auto flex flex-col justify-between p-4 sm:p-8 animate-fade-in">
      {/* Background Starlight Subtle Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-rose-950/20 via-[#070709] to-[#070709] pointer-events-none" />

      {/* Top Bar */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex items-center justify-between text-xs font-mono text-zinc-500 pb-6 border-b border-[#1E1E24]">
        <div className="flex items-center gap-2 text-rose-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="uppercase tracking-widest font-semibold">
            {leadIn}
          </span>
        </div>
        <button
          type="button"
          onClick={onRevisit}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#27272A] hover:bg-[#18181C] text-zinc-300 hover:text-white transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Return to Archive</span>
        </button>
      </div>

      {/* Main Cinematic Container */}
      <main className="relative z-10 w-full max-w-3xl mx-auto my-auto py-12 space-y-12">
        {/* Phase 1: Archive Complete Statement */}
        <div
          className={`text-center space-y-3 transition-opacity duration-1000 ${
            phase >= 1 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/30 bg-rose-950/30 text-rose-300 font-mono text-xs uppercase tracking-widest">
            <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
            <span>07 / 07 Files Recovered</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif-archive tracking-wider text-white font-normal">
            Archive Complete
          </h1>
        </div>

        {/* Phase 2: Cinematic Lead-In Quote */}
        {phase >= 2 && (
          <div className="text-center max-w-xl mx-auto space-y-2 animate-fade-in">
            <p className="text-lg sm:text-xl font-serif-archive italic text-zinc-300 leading-relaxed">
              “{cinematicQuotes[0]}”
            </p>
            {cinematicQuotes[1] && (
              <p className="text-sm font-sans text-zinc-500 font-light">
                {cinematicQuotes[1]}
              </p>
            )}
          </div>
        )}

        {/* Phase 3: The Personal Letter & Final Photograph */}
        {phase >= 3 && (
          <div className="space-y-10 animate-fade-in">
            {/* The Personal Letter */}
            <div className="bg-[#121215] border border-[#27272A] rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6">
              <div className="space-y-4 font-serif-archive text-base sm:text-lg text-zinc-200 leading-relaxed">
                {personalLetter.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className={
                      idx === 0
                        ? 'text-xl sm:text-2xl text-white font-medium mb-3'
                        : idx === personalLetter.length - 1
                        ? 'text-lg sm:text-xl text-rose-300 font-medium italic pt-2'
                        : ''
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Final Cinematic Photograph */}
            <div className="bg-[#121215] border border-[#27272A] rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative aspect-16/9 bg-black group">
                <FinalRevealArt />

                <button
                  type="button"
                  onClick={handleInspectFinalPhoto}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs uppercase tracking-wider backdrop-blur-xs cursor-pointer"
                >
                  <Eye className="w-4 h-4" /> Fullscreen Artifact View
                </button>
              </div>

              <div className="p-4 sm:p-6 border-t border-[#27272A] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-400">
                <p className="text-zinc-300 font-sans italic text-center sm:text-left">
                  “{finalPhotoCaption}”
                </p>
                <span className="text-zinc-500 shrink-0">{finalPhotoDate}</span>
              </div>
            </div>

            {/* Final Dedication Dossier */}
            <div className="bg-[#0E0E11] border border-[#27272A] rounded-xl p-6 font-mono text-xs text-zinc-400 space-y-4">
              <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
                <span className="text-zinc-500 uppercase tracking-widest">
                  RECORD METADATA
                </span>
                <span className="text-emerald-400 uppercase tracking-wider">
                  PRESERVED IN PERPETUITY
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">
                    CREATED FOR:
                  </p>
                  <p className="text-white font-semibold text-sm">
                    {ARCHIVE_CONFIG.recipientName}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">
                    CREATED BY:
                  </p>
                  <p className="text-white font-semibold text-sm">
                    {ARCHIVE_CONFIG.senderName}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">
                    DEDICATION DATE:
                  </p>
                  <p className="text-rose-400 font-semibold text-sm">
                    {ARCHIVE_CONFIG.dedicationDate}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#1C1C22] flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-zinc-400 font-sans italic text-xs">
                  {closingStatement}
                </p>

                <button
                  type="button"
                  onClick={onRevisit}
                  className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-mono text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer shadow-lg"
                >
                  Revisit The Archive
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-4xl mx-auto flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-6 border-t border-[#1E1E24]">
        <span>THE ARCHIVE // ALL DISCLOSURES RESTORED</span>
        <span>FINAL SYSTEM VERIFICATION PASSED</span>
      </footer>
    </div>
  );
};
