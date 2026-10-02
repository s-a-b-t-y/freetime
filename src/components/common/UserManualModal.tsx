import React, { useState } from 'react';
import { X, BookOpen, Compass, Code, Key, HelpCircle, Sparkles, RotateCcw } from 'lucide-react';
import { useArchive } from '../../context/ArchiveContext';
import { ARCHIVE_CONFIG } from '../../config/archiveConfig';

export const UserManualModal: React.FC = () => {
  const { isUserManualOpen, toggleUserManual, resetArchive } = useArchive();
  const [activeTab, setActiveTab] = useState<'player' | 'curator' | 'cheatsheet'>('player');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (!isUserManualOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="manual-title"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#121214] border border-[#27272A] rounded-xl flex flex-col shadow-2xl overflow-hidden text-zinc-200">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-[#27272A] bg-[#18181B]">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <BookOpen className="w-5 h-5 shrink-0" style={{ color: 'var(--color-accent)' }} />
            <div>
              <h2 id="manual-title" className="text-sm sm:text-base font-semibold text-white tracking-wide">
                Archive Operator Manual
              </h2>
              <p className="text-[10px] sm:text-xs font-mono text-zinc-400">
                Classification: Confidential · Instructions &amp; Architecture
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => toggleUserManual(false)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#27272A] transition-colors cursor-pointer shrink-0"
            aria-label="Close user manual"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-[#27272A] px-2 sm:px-6 bg-[#0E0E10] text-xs font-mono overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('player')}
            className={`py-2.5 sm:py-3 px-3 sm:px-4 border-b-2 font-medium transition-colors cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'player'
                ? 'text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
            style={activeTab === 'player' ? { borderBottomColor: 'var(--color-accent)', backgroundColor: 'var(--color-accent-subtle)' } : undefined}
          >
            <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>How to Play</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('curator')}
            className={`py-2.5 sm:py-3 px-3 sm:px-4 border-b-2 font-medium transition-colors cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'curator'
                ? 'text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
            style={activeTab === 'curator' ? { borderBottomColor: 'var(--color-accent)', backgroundColor: 'var(--color-accent-subtle)' } : undefined}
          >
            <Code className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>How to Personalize</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cheatsheet')}
            className={`py-2.5 sm:py-3 px-3 sm:px-4 border-b-2 font-medium transition-colors cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'cheatsheet'
                ? 'text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
            style={activeTab === 'cheatsheet' ? { borderBottomColor: 'var(--color-accent)', backgroundColor: 'var(--color-accent-subtle)' } : undefined}
          >
            <Key className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>Default Keys</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm leading-relaxed">
          {/* TAB 1: PLAYER / RECIPIENT */}
          {activeTab === 'player' && (
            <div className="space-y-5">
              <div className="bg-[#18181B] border border-[#27272A] p-4 rounded-lg">
                <h3 className="text-white font-medium text-base mb-1">Welcome to The Archive</h3>
                <p className="text-zinc-300 text-xs">
                  This website was built not as an ordinary message, but as a private investigation into shared history.
                  Behind its quiet, minimal interface lie seven locked records. Each step requires observation, memory, and curiosity.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-[#27272A] p-4 rounded-lg bg-[#141416]">
                  <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-wider mb-2">
                    <Key className="w-4 h-4" /> 01. The Gatekeeper
                  </div>
                  <p className="text-xs text-zinc-300">
                    The initial access gate requires an authorized entry code. If you enter an incorrect code multiple times,
                    the system will gently provide a subtle hint to guide your memory.
                  </p>
                </div>

                <div className="border border-[#27272A] p-4 rounded-lg bg-[#141416]">
                  <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-wider mb-2">
                    <HelpCircle className="w-4 h-4" /> 02. Three-Tier Hints
                  </div>
                  <p className="text-xs text-zinc-300">
                    Never get stuck. Every puzzle includes a progressive hint system: Hint 1 points in the right direction,
                    Hint 2 breaks down the structure, and Hint 3 provides clarity.
                  </p>
                </div>

                <div className="border border-[#27272A] p-4 rounded-lg bg-[#141416]">
                  <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4" /> 03. Photograph Hotspots
                  </div>
                  <p className="text-xs text-zinc-300">
                    In Level 04 and the Memory views, photographs can be enlarged into a full lightbox.
                    Hover or touch across artifacts to find micro-inscriptions hidden in the margins.
                  </p>
                </div>

                <div className="border border-[#27272A] p-4 rounded-lg bg-[#141416]">
                  <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-wider mb-2">
                    <Code className="w-4 h-4" /> 04. Hidden CLI Terminal
                  </div>
                  <p className="text-xs text-zinc-300">
                    Press <span className="font-mono text-white bg-[#27272A] px-1 py-0.5 rounded">Ctrl + Shift + A</span> or the backtick key <span className="font-mono text-white bg-[#27272A] px-1 py-0.5 rounded">`</span> anytime, or click the terminal icon to access command-line diagnostics and hidden secrets.
                  </p>
                </div>
              </div>

              <div className="border border-zinc-800 p-4 rounded-lg bg-zinc-950/60">
                <h4 className="text-xs font-mono uppercase text-zinc-400 mb-1">Easter Egg Notice</h4>
                <p className="text-xs text-zinc-400">
                  Try clicking the diamond Archive logo in the header five consecutive times, or investigate timestamps and system logs.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: CURATOR / PERSONALIZATION */}
          {activeTab === 'curator' && (
            <div className="space-y-5">
              <div className="bg-[#18181B] border border-rose-500/20 p-4 rounded-lg">
                <h3 className="text-white font-medium text-base mb-1">
                  How to Personalize Everything
                </h3>
                <p className="text-xs text-zinc-300">
                  All personal data, names, dates, answers, photographs, inside jokes, and the final emotional reveal are centralized in one single configuration file:
                </p>
                <div className="mt-2 p-2 bg-[#0E0E10] border border-[#27272A] rounded font-mono text-xs text-rose-400">
                  src/config/archiveConfig.ts
                </div>
              </div>

              <div className="space-y-3">
                <div className="border border-[#27272A] p-3 rounded-lg bg-[#141416]">
                  <h4 className="font-mono text-xs font-semibold text-white mb-1">1. Recipient & Sender Names</h4>
                  <p className="text-xs text-zinc-400 mb-2">
                    Replace <code className="text-zinc-200">recipientName</code> and <code className="text-zinc-200">senderName</code> with real names or private nicknames.
                  </p>
                </div>

                <div className="border border-[#27272A] p-3 rounded-lg bg-[#141416]">
                  <h4 className="font-mono text-xs font-semibold text-white mb-1">2. Gatekeeper Access Code</h4>
                  <p className="text-xs text-zinc-400 mb-2">
                    Change <code className="text-zinc-200">accessCode</code> (currently <code className="text-rose-400">NOVA</code>) and <code className="text-zinc-200">accessCodeHint</code> to your anniversary date, a memorable pet name, or a secret word.
                  </p>
                </div>

                <div className="border border-[#27272A] p-3 rounded-lg bg-[#141416]">
                  <h4 className="font-mono text-xs font-semibold text-white mb-1">3. Photographs</h4>
                  <p className="text-xs text-zinc-400 mb-2">
                    The app comes with beautiful, high-fidelity generative archival illustrations as fallbacks.
                    To use your own photos, simply set the <code className="text-zinc-200">imageUrl</code> property on Level 02, Level 04, and the final reveal in <code className="text-zinc-200">archiveConfig.ts</code> to any valid image URL or base64 data string.
                  </p>
                </div>

                <div className="border border-[#27272A] p-3 rounded-lg bg-[#141416]">
                  <h4 className="font-mono text-xs font-semibold text-white mb-1">4. The Final Reveal Letter</h4>
                  <p className="text-xs text-zinc-400 mb-2">
                    In <code className="text-zinc-200">archiveConfig.finalReveal.personalLetter</code>, write your own paragraphs line by line. It will be rendered with atmospheric typography, slow fade transitions, and the final photograph.
                  </p>
                </div>
              </div>

              {/* Reset Archive tool */}
              <div className="border border-red-900/40 bg-red-950/20 p-4 rounded-lg flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-mono uppercase text-red-300 font-semibold">Testing Tool: Reset Archive</h4>
                  <p className="text-xs text-zinc-400">
                    Clear local storage to experience the archive from Level 01 again.
                  </p>
                </div>
                {showResetConfirm ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        resetArchive();
                        setShowResetConfirm(false);
                        toggleUserManual(false);
                      }}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-mono cursor-pointer"
                    >
                      Confirm Reset
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowResetConfirm(false)}
                      className="px-2 py-1.5 text-xs text-zinc-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowResetConfirm(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-red-700/60 text-red-300 hover:bg-red-900/40 rounded text-xs font-mono transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset Progress
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: CHEATSHEET */}
          {activeTab === 'cheatsheet' && (
            <div className="space-y-4">
              <p className="text-xs text-zinc-400">
                For testing or troubleshooting during setup, here are the default configured answers:
              </p>
              <div className="border border-[#27272A] rounded-lg divide-y divide-[#27272A] bg-[#141416] text-xs font-mono">
                <div className="p-3 flex justify-between">
                  <span className="text-zinc-400">Entrance Access Code:</span>
                  <span className="text-rose-400 font-bold">{ARCHIVE_CONFIG.accessCode}</span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-zinc-400">Level 01 (Genesis Coordinate):</span>
                  <span className="text-white font-bold">{ARCHIVE_CONFIG.level01.correctValue}</span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-zinc-400">Level 02 (Memory Decipher):</span>
                  <span className="text-white font-bold">SILENCE</span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-zinc-400">Level 03 (Numeric Sequence):</span>
                  <span className="text-white font-bold">{ARCHIVE_CONFIG.level03.correctAnswer}</span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-zinc-400">Level 04 (Photograph Hotspot):</span>
                  <span className="text-white font-bold">{ARCHIVE_CONFIG.level04.requiredDiscoveryWord}</span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-zinc-400">Level 05 (Telegram Key):</span>
                  <span className="text-white font-bold">{ARCHIVE_CONFIG.level05.expectedKey}</span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-zinc-400">Level 06 (Four Fragments):</span>
                  <span className="text-white font-bold">PRESENCE · MEMORY · GRACE · QUIET</span>
                </div>
                <div className="p-3 flex justify-between">
                  <span className="text-zinc-400">Level 07 (Final Verification):</span>
                  <span className="text-white font-bold">{ARCHIVE_CONFIG.level07.verificationExpectedAnswer}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#27272A] bg-[#18181B] flex items-center justify-between text-xs text-zinc-400 font-mono">
          <span>The Archive System Engine</span>
          <button
            type="button"
            onClick={() => toggleUserManual(false)}
            className="px-4 py-1.5 bg-[#27272A] hover:bg-[#3F3F46] text-white rounded transition-colors cursor-pointer"
          >
            Close Manual
          </button>
        </div>
      </div>
    </div>
  );
};
