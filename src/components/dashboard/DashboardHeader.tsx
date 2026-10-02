import React, { useState } from 'react';
import { Terminal, BookOpen, Sparkles } from 'lucide-react';
import { useArchive } from '../../context/ArchiveContext';
import { ARCHIVE_CONFIG } from '../../config/archiveConfig';
import { ArchiveLogo } from '../../assets/illustrations';
import { SoundToggle } from '../common/SoundToggle';
import { ThemeSelector } from '../common/ThemeSelector';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DashboardHeader: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const {
    currentLevel,
    unlockedLevels,
    completedLevels,
    toggleTerminal,
    toggleUserManual,
    triggerEasterEgg,
    hasCompletedArchive
  } = useArchive();

  const [logoClicks, setLogoClicks] = useState(0);

  const handleLogoClick = () => {
    const next = logoClicks + 1;
    setLogoClicks(next);
    if (next === ARCHIVE_CONFIG.easterEggs.logoClickCountRequired) {
      triggerEasterEgg('seal_easter_egg', ARCHIVE_CONFIG.easterEggs.logoClickMessage);
    }
  };

  return (
    <header className="w-full bg-[#121214] border-b border-[#27272A] sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand title & logo */}
        <div className="flex items-center gap-3 shrink-0">
          <ArchiveLogo onClick={handleLogoClick} size={34} />
          <div className="flex items-center gap-2">
            <span className="font-serif-archive text-xl tracking-wider text-white font-medium">
              {ARCHIVE_CONFIG.archiveTitle}
            </span>
            <span className="hidden md:inline text-zinc-600 text-xs">/</span>
            <span
              className="hidden md:inline font-mono text-[10px] px-2 py-0.5 rounded uppercase tracking-widest font-semibold"
              style={{
                backgroundColor: 'var(--color-accent-subtle)',
                color: 'var(--color-accent-badge)'
              }}
            >
              LEVEL 0{currentLevel}
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-zinc-400">
          {(['overview', 'archive', 'memories', 'logs'] as const).map(tab => {
            const isActive = activeTab === tab;
            const labels: Record<string, string> = {
              overview: 'Overview',
              archive: 'Levels',
              memories: `Memories (${completedLevels.length})`,
              logs: 'Logs'
            };
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`transition-all uppercase tracking-wider cursor-pointer pb-0.5 border-b-2 font-medium ${
                  isActive ? 'text-white' : 'border-transparent hover:text-zinc-200'
                }`}
                style={isActive ? { borderBottomColor: 'var(--color-accent)' } : undefined}
              >
                {labels[tab]}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Utility Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Terminal Launcher - hidden on very small mobile screens */}
          <button
            type="button"
            onClick={() => toggleTerminal()}
            className="hidden sm:flex p-2 rounded-full border border-[#27272A] hover:border-zinc-500 bg-[#14151B] text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
            title="Open Diagnostic Shell Terminal (` or Ctrl+Shift+A)"
            aria-label="Open Terminal"
          >
            <Terminal className="w-3.5 h-3.5" />
          </button>

          {/* User Manual */}
          <button
            type="button"
            onClick={() => toggleUserManual(true)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border border-[#27272A] hover:border-zinc-500 bg-[#14151B] text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer shrink-0"
            title="Archive Operator Manual"
            aria-label="Manual"
          >
            <BookOpen className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
            <span className="hidden md:inline">Manual</span>
          </button>

          <ThemeSelector />
          <SoundToggle />
        </div>
      </div>
    </header>
  );
};
