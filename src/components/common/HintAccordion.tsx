import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { useArchive } from '../../context/ArchiveContext';

interface HintProps {
  levelId: number;
  hints: [string, string, string];
}

export const HintAccordion: React.FC<HintProps> = ({ levelId, hints }) => {
  const { recordHintUse } = useArchive();
  const [unlockedTier, setUnlockedTier] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleRevealTier = (tier: number) => {
    if (tier > unlockedTier) {
      setUnlockedTier(tier);
      recordHintUse(levelId);
    }
  };

  return (
    <div className="border border-[#27272A] rounded-lg bg-[#141417] overflow-hidden text-xs">
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-[#18181C] hover:bg-[#1E1E24] text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer select-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 font-mono">
          <HelpCircle className="w-3.5 h-3.5 text-zinc-500" />
          <span className="uppercase tracking-wider">Assistance Decryption</span>
          {unlockedTier > 0 && (
            <span className="text-[10px] text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded font-mono">
              Tier {unlockedTier}/3 Active
            </span>
          )}
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {isOpen && (
        <div className="p-4 space-y-3 bg-[#121215] border-t border-[#27272A]">
          <p className="text-zinc-400 text-[11px] leading-relaxed">
            Hints unlock gradually. Reveal only as much as you need to preserve the discovery.
          </p>

          {/* Tier 1 */}
          <div className="border border-[#27272A] rounded-md p-3 bg-[#16161A]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                Hint 01 // Directional
              </span>
              {unlockedTier < 1 && (
                <button
                  type="button"
                  onClick={() => handleRevealTier(1)}
                  className="px-2 py-0.5 text-[10px] font-mono uppercase bg-[#27272A] hover:bg-rose-600 text-zinc-200 hover:text-white rounded transition-colors cursor-pointer"
                >
                  Reveal Hint 01
                </button>
              )}
            </div>
            {unlockedTier >= 1 ? (
              <p className="text-zinc-200 leading-relaxed font-sans">{hints[0]}</p>
            ) : (
              <p className="text-zinc-600 font-mono text-[11px] italic">Encrypted</p>
            )}
          </div>

          {/* Tier 2 */}
          <div className="border border-[#27272A] rounded-md p-3 bg-[#16161A]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                Hint 02 // Structural
              </span>
              {unlockedTier < 2 && (
                <button
                  type="button"
                  onClick={() => handleRevealTier(2)}
                  className="px-2 py-0.5 text-[10px] font-mono uppercase bg-[#27272A] hover:bg-rose-600 text-zinc-200 hover:text-white rounded transition-colors cursor-pointer"
                >
                  Reveal Hint 02
                </button>
              )}
            </div>
            {unlockedTier >= 2 ? (
              <p className="text-zinc-200 leading-relaxed font-sans">{hints[1]}</p>
            ) : (
              <p className="text-zinc-600 font-mono text-[11px] italic">Encrypted</p>
            )}
          </div>

          {/* Tier 3 */}
          <div className="border border-[#27272A] rounded-md p-3 bg-[#16161A]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                Hint 03 // Resolution
              </span>
              {unlockedTier < 3 && (
                <button
                  type="button"
                  onClick={() => handleRevealTier(3)}
                  className="px-2 py-0.5 text-[10px] font-mono uppercase bg-[#27272A] hover:bg-rose-600 text-zinc-200 hover:text-white rounded transition-colors cursor-pointer"
                >
                  Reveal Hint 03
                </button>
              )}
            </div>
            {unlockedTier >= 3 ? (
              <div className="flex items-start gap-2 text-rose-300">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-sans">{hints[2]}</p>
              </div>
            ) : (
              <p className="text-zinc-600 font-mono text-[11px] italic">Encrypted</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
