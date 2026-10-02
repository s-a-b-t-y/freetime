import React, { useState } from 'react';
import { ArchiveProvider, useArchive } from './context/ArchiveContext';
import { ARCHIVE_CONFIG } from './config/archiveConfig';
import { ARCHIVE_LEVELS } from './data/levelData';
import { LandingPage } from './components/landing/LandingPage';
import { AccessCodeScreen } from './components/landing/AccessCodeScreen';
import { DashboardHeader } from './components/dashboard/DashboardHeader';
import { DashboardNavigation } from './components/dashboard/DashboardNavigation';
import { DashboardProgress } from './components/dashboard/DashboardProgress';
import { OverviewPanel } from './components/dashboard/OverviewPanel';
import { MemoriesGallery } from './components/dashboard/MemoriesGallery';
import { SystemLogsPanel } from './components/common/SystemLogsPanel';
import { ImageViewerModal } from './components/common/ImageViewerModal';
import { UserManualModal } from './components/common/UserManualModal';
import { TerminalDrawer } from './components/common/TerminalDrawer';
import { FinalCinematicReveal } from './components/reveal/FinalCinematicReveal';

// Puzzles
import { Level01TheFirstClue } from './components/puzzles/Level01TheFirstClue';
import { Level02TheMemory } from './components/puzzles/Level02TheMemory';
import { Level03ThePattern } from './components/puzzles/Level03ThePattern';
import { Level04ThePhotograph } from './components/puzzles/Level04ThePhotograph';
import { Level05TheMessage } from './components/puzzles/Level05TheMessage';
import { Level06TheThingsNeverSaid } from './components/puzzles/Level06TheThingsNeverSaid';
import { Level07TheFinalFile } from './components/puzzles/Level07TheFinalFile';

const ArchiveApp: React.FC = () => {
  const {
    hasSeenLanding,
    isArchiveAuthenticated,
    currentLevel,
    setCurrentLevel,
    completedLevels,
    hasCompletedArchive,
    revisitArchive
  } = useArchive();

  const [activeTab, setActiveTab] = useState<'overview' | 'archive' | 'directory' | 'memories' | 'logs'>('archive');
  const [showFinalRevealModal, setShowFinalRevealModal] = useState(false);

  // If not past landing page
  if (!hasSeenLanding) {
    return (
      <>
        <LandingPage />
        <UserManualModal />
      </>
    );
  }

  // If past landing page but not authenticated with access code
  if (!isArchiveAuthenticated) {
    return (
      <>
        <AccessCodeScreen />
        <UserManualModal />
      </>
    );
  }

  // If user opened the final cinematic reveal
  if (showFinalRevealModal) {
    return (
      <>
        <FinalCinematicReveal
          onRevisit={() => {
            setShowFinalRevealModal(false);
            revisitArchive();
            setActiveTab('overview');
          }}
        />
        <ImageViewerModal />
      </>
    );
  }

  const renderActiveLevel = () => {
    switch (currentLevel) {
      case 1:
        return <Level01TheFirstClue />;
      case 2:
        return <Level02TheMemory />;
      case 3:
        return <Level03ThePattern />;
      case 4:
        return <Level04ThePhotograph />;
      case 5:
        return <Level05TheMessage />;
      case 6:
        return <Level06TheThingsNeverSaid />;
      case 7:
        return (
          <Level07TheFinalFile
            onTriggerReveal={() => setShowFinalRevealModal(true)}
          />
        );
      default:
        return <Level01TheFirstClue />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F4F4F5] flex flex-col justify-between selection:bg-rose-500/30 selection:text-white overflow-x-hidden">
      {/* Fixed Modals & Overlays */}
      <ImageViewerModal />
      <UserManualModal />
      <TerminalDrawer />

      {/* Top Header */}
      <DashboardHeader
        activeTab={activeTab === 'directory' ? 'archive' : activeTab}
        setActiveTab={t => setActiveTab(t as any)}
      />

      {/* Main Content Arena */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Progress Timeline Rail */}
        <DashboardProgress />

        {/* Tab Content */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Navigation Sidebar - Visible on Desktop */}
          <div className="hidden lg:block lg:w-72 shrink-0">
            <DashboardNavigation />
          </div>

          {/* Right Main Stage */}
          <div className="flex-1 w-full min-w-0">
            {activeTab === 'overview' && (
              <OverviewPanel
                onGoToLevel={lvl => {
                  setCurrentLevel(lvl);
                  setActiveTab('archive');
                }}
              />
            )}

            {/* Mobile Levels Directory View */}
            {activeTab === 'directory' && (
              <div className="lg:hidden space-y-4">
                <div className="flex items-center justify-between pb-1">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                    Select Archive Level
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('archive')}
                    className="text-xs font-mono text-zinc-300 hover:text-white underline underline-offset-4"
                  >
                    Return to Active Puzzle
                  </button>
                </div>
                <DashboardNavigation onSelect={() => setActiveTab('archive')} />
              </div>
            )}

            {activeTab === 'archive' && (
              <div className="space-y-3">
                {/* Mobile Quick Level Switcher Pill */}
                <div className="lg:hidden flex items-center justify-between p-2.5 rounded-xl bg-[#141417] border border-[#27272A] text-xs font-mono">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    />
                    <span className="text-zinc-400 truncate">
                      Active: <span className="text-white font-medium">Level 0{currentLevel}</span>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('directory')}
                    className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg border border-zinc-700 bg-[#1D1D24] text-zinc-300 hover:text-white shrink-0 cursor-pointer"
                  >
                    All Levels ▾
                  </button>
                </div>

                {renderActiveLevel()}
              </div>
            )}

            {activeTab === 'memories' && (
              <MemoriesGallery
                onSelectLevel={lvl => {
                  setCurrentLevel(lvl);
                  setActiveTab('archive');
                }}
              />
            )}

            {activeTab === 'logs' && <SystemLogsPanel />}
          </div>
        </div>
      </main>

      {/* Mobile Bottom Tab Bar */}
      <nav className="lg:hidden sticky bottom-0 z-40 bg-[#121214]/95 backdrop-blur-md border-t border-[#27272A] px-2 py-1.5 flex items-center justify-around text-[10px] font-mono uppercase tracking-wider">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`py-1.5 px-2.5 rounded-lg flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
            activeTab === 'overview' ? 'text-white bg-[#1F1F24]' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <span>Overview</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('archive')}
          className={`py-1.5 px-2.5 rounded-lg flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
            activeTab === 'archive' ? 'text-white bg-[#1F1F24]' : 'text-zinc-400 hover:text-zinc-200'
          }`}
          style={activeTab === 'archive' ? { color: 'var(--color-accent-badge)' } : undefined}
        >
          <span className="font-semibold">Puzzle (0{currentLevel})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('directory')}
          className={`py-1.5 px-2.5 rounded-lg flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
            activeTab === 'directory' ? 'text-white bg-[#1F1F24]' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <span>Directory</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('memories')}
          className={`py-1.5 px-2.5 rounded-lg flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
            activeTab === 'memories' ? 'text-white bg-[#1F1F24]' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <span>Memories</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('logs')}
          className={`py-1.5 px-2.5 rounded-lg flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
            activeTab === 'logs' ? 'text-white bg-[#1F1F24]' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <span>Logs</span>
        </button>
      </nav>

      {/* Footer */}
      <footer className="w-full border-t border-[#18181C] bg-[#0E0E10] text-[11px] font-mono text-zinc-500 py-3 sm:py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <span>{ARCHIVE_CONFIG.archiveTitle} // PRIVATE PERSONAL REPOSITORY</span>
          <span className="hidden sm:inline">PRESS [ ` ] OR [ CTRL + SHIFT + A ] FOR SHELL CLI</span>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <ArchiveProvider>
      <ArchiveApp />
    </ArchiveProvider>
  );
}
