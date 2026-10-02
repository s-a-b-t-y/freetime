import React, { useState } from 'react';
import { ArrowRight, Lock } from 'lucide-react';
import { useArchive } from '../../context/ArchiveContext';
import { ARCHIVE_CONFIG } from '../../config/archiveConfig';
import { ArchiveLogo } from '../../assets/illustrations';
import { SoundToggle } from '../common/SoundToggle';
import { ThemeSelector } from '../common/ThemeSelector';

export const LandingPage: React.FC = () => {
  const { enterArchive, triggerEasterEgg } = useArchive();
  const [logoClicks, setLogoClicks] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleLogoClick = () => {
    const next = logoClicks + 1;
    setLogoClicks(next);
    if (next === ARCHIVE_CONFIG.easterEggs.logoClickCountRequired) {
      triggerEasterEgg('seal_easter_egg', ARCHIVE_CONFIG.easterEggs.logoClickMessage);
    }
  };

  const handleEnter = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      enterArchive();
    }, 450);
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-between items-center px-6 py-8 relative transition-opacity duration-500 ${
        isTransitioning ? 'opacity-0 scale-98 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top Utility Bar */}
      <header className="w-full max-w-5xl flex items-center justify-between text-xs font-mono text-zinc-500">
        <div className="flex items-center gap-3">
          <ArchiveLogo onClick={handleLogoClick} size={34} />
          <div className="flex items-center gap-2">
            <span className="font-serif-archive text-base tracking-widest text-zinc-100 font-medium">
              {ARCHIVE_CONFIG.archiveTitle}
            </span>
            <span className="text-zinc-600 hidden sm:inline">·</span>
            <span className="text-[11px] font-sans text-zinc-400 hidden sm:inline tracking-wider">
              Private Digital Archive
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeSelector />
          <SoundToggle />
        </div>
      </header>

      {/* Main Mysterious Hero Center */}
      <main className="w-full max-w-xl text-center space-y-8 my-auto">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#27272A] bg-[#121214] text-[11px] font-mono tracking-widest text-zinc-300 uppercase shadow-sm">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--color-accent)' }}
            />
            <span>Classified Personal Repository</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-serif-archive tracking-wider text-zinc-100 font-normal">
            {ARCHIVE_CONFIG.archiveTitle}
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 font-sans font-light italic max-w-md mx-auto leading-relaxed">
            “{ARCHIVE_CONFIG.archiveSubtitle}”
          </p>
        </div>

        {/* Enter Button */}
        <div className="space-y-4 pt-4">
          <button
            type="button"
            onClick={handleEnter}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#18181B] hover:bg-zinc-800 text-zinc-200 hover:text-white rounded-xl border border-[#27272A] transition-all duration-300 font-mono text-xs uppercase tracking-widest cursor-pointer shadow-xl active:scale-95"
            style={{
              borderColor: 'var(--color-border)'
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-accent)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px var(--color-accent-subtle)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
            aria-label="Enter the archive"
          >
            <span>Enter Archive</span>
            <ArrowRight
              className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200"
              style={{ color: 'var(--color-accent)' }}
            />
          </button>

          <div className="space-y-1 text-[11px] font-mono text-zinc-400 select-none">
            <p className="tracking-widest uppercase">PRIVATE ACCESS</p>
            <p className="text-zinc-400 tracking-wider">ACCESS CODE REQUIRED</p>
          </div>
        </div>
      </main>

      {/* Footer System Stamp */}
      <footer className="w-full max-w-5xl flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-6 border-t border-[#18181C]">
        <span>ENCRYPTION: VERIFIED</span>
        <span>INDEX: FILE_001 TO UNKNOWN_000</span>
      </footer>
    </div>
  );
};
