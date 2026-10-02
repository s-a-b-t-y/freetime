import React, { useState } from 'react';
import { Lock, KeyRound, AlertTriangle, HelpCircle, ShieldAlert, ArrowLeft } from 'lucide-react';
import { useArchive } from '../../context/ArchiveContext';
import { ARCHIVE_CONFIG } from '../../config/archiveConfig';
import { ArchiveLogo } from '../../assets/illustrations';
import { SoundToggle } from '../common/SoundToggle';
import { ThemeSelector } from '../common/ThemeSelector';
import { archiveAudio } from '../../utils/audio';

export const AccessCodeScreen: React.FC = () => {
  const { authenticateAccessCode, toggleUserManual, triggerEasterEgg } = useArchive();
  const [code, setCode] = useState('');
  const [errorInfo, setErrorInfo] = useState<{ message: string; hint?: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  const handleLogoClick = () => {
    const next = logoClicks + 1;
    setLogoClicks(next);
    if (next === ARCHIVE_CONFIG.easterEggs.logoClickCountRequired) {
      triggerEasterEgg('seal_easter_egg', ARCHIVE_CONFIG.easterEggs.logoClickMessage);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || isSubmitting) return;

    archiveAudio.playKeystroke();
    setIsSubmitting(true);

    setTimeout(() => {
      const res = authenticateAccessCode(code);
      if (!res.success) {
        setErrorInfo({
          message: 'That doesn’t seem right. Try remembering something you would normally overlook.',
          hint: res.hint
        });
      } else {
        setErrorInfo(null);
      }
      setIsSubmitting(false);
    }, 350);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between items-center px-4 sm:px-6 py-8 relative">
      {/* Top Header */}
      <header className="w-full max-w-5xl flex items-center justify-between text-xs font-mono text-zinc-500">
        <div className="flex items-center gap-3">
          <ArchiveLogo onClick={handleLogoClick} size={34} />
          <div className="flex items-center gap-2">
            <span className="font-serif-archive text-base tracking-widest text-zinc-100 font-medium">
              {ARCHIVE_CONFIG.archiveTitle}
            </span>
            <span className="text-zinc-600 hidden sm:inline">·</span>
            <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline uppercase tracking-widest">
              Security Gatekeeper
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toggleUserManual(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-zinc-300 hover:text-white border border-[#27272A] hover:border-zinc-500 rounded-full bg-[#121214] transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
            <span className="hidden sm:inline">Manual</span>
          </button>
          <ThemeSelector />
          <SoundToggle />
        </div>
      </header>

      {/* Main Gatekeeper Card */}
      <main className="w-full max-w-md my-auto space-y-6">
        {/* Terminal Header Metadata Block */}
        <div className="bg-[#121215] border border-[#27272A] rounded-xl p-5 shadow-2xl font-mono text-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
            <span className="text-zinc-500 tracking-wider">PRIVATE ARCHIVE</span>
            <span className="flex items-center gap-1.5 text-amber-500/90 bg-amber-500/10 px-2 py-0.5 rounded text-[11px]">
              <Lock className="w-3 h-3" /> ACCESS REQUIRED
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-zinc-400 pt-1">
            <div>
              <p className="text-[10px] text-zinc-400 uppercase tracking-widest">IDENTITY</p>
              <p className="text-zinc-200 font-semibold tracking-wider">UNKNOWN</p>
            </div>
            <div>
              <p className="text-[10px] text-zinc-400 uppercase tracking-widest">STATUS</p>
              <p className="text-rose-400 font-semibold tracking-wider">LOCKED</p>
            </div>
            <div className="col-span-2 pt-1">
              <p className="text-[10px] text-zinc-400 uppercase tracking-widest">FILES</p>
              <p className="text-zinc-600 tracking-widest font-mono text-sm">
                ████████████████
              </p>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <div className="bg-[#18181C] border border-[#27272A] rounded-xl p-6 shadow-2xl space-y-5">
          <div className="space-y-1">
            <label
              htmlFor="access-code-input"
              className="block font-mono text-xs uppercase tracking-widest text-zinc-400"
            >
              Enter Access Code
            </label>
            <p className="text-xs text-zinc-400 font-sans">
              Enter the initial key phrase to unlock the archive registry.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                id="access-code-input"
                type="text"
                autoComplete="off"
                spellCheck="false"
                value={code}
                onChange={e => {
                  setCode(e.target.value);
                  archiveAudio.playKeystroke();
                }}
                placeholder="[ ACCESS CODE ]"
                className="w-full px-4 py-3 bg-[#0E0E12] border border-[#27272A] focus:border-rose-500/80 rounded-lg text-white font-mono text-sm uppercase tracking-widest placeholder:text-zinc-700 outline-none transition-all"
              />
              <KeyRound className="absolute right-3.5 top-3.5 w-4 h-4 text-zinc-600 pointer-events-none" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !code.trim()}
              className="w-full py-3 bg-zinc-100 hover:bg-white text-zinc-950 font-mono text-xs uppercase tracking-widest font-semibold rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 shadow-lg active:scale-98"
            >
              {isSubmitting ? (
                <span>Verifying Cryptographic Seed...</span>
              ) : (
                <span>Unlock Archive</span>
              )}
            </button>
          </form>

          {/* Access Denied Feedback */}
          {errorInfo && (
            <div className="p-4 rounded-lg bg-rose-950/20 border border-rose-500/30 text-rose-200 space-y-2 animate-fade-in font-sans text-xs">
              <div className="flex items-center gap-2 font-mono text-rose-400 font-semibold uppercase tracking-wider text-[11px]">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Access Denied</span>
              </div>
              <p className="leading-relaxed text-zinc-300 font-light">
                {errorInfo.message}
              </p>

              {errorInfo.hint && (
                <div className="pt-2 border-t border-rose-500/20 text-xs">
                  <span className="font-mono text-rose-400 font-semibold uppercase tracking-widest text-[10px] block mb-1">
                    System Hint:
                  </span>
                  <p className="text-zinc-200 italic font-serif-archive text-sm leading-relaxed">
                    “{errorInfo.hint}”
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Curator Testing Quick Access */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => toggleUserManual(true)}
            className="text-[11px] font-mono text-zinc-400 hover:text-zinc-400 underline underline-offset-4 cursor-pointer transition-colors"
          >
            Lost access key? Review Operator Manual &amp; Default Keys
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-6 border-t border-[#18181C]">
        <span>NODE: LOCAL_SECURE_VAULT</span>
        <span>LATENCY: 0ms</span>
      </footer>
    </div>
  );
};
