import React, { useState } from 'react';
import { ArchiveProvider, useArchive } from './context/ArchiveContext';
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

  const [activeTab, setActiveTab] = useState<'overview' | 'archive' | 'memories' | 'logs'>('archive');
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
    <div className="min-h-screen bg-[#0B0B0D] text-[#F4F4F5] flex flex-col justify-between selection:bg-rose-500/30 selection:text-white">
      {/* Fixed Modals & Overlays */}
      <ImageViewerModal />
      <UserManualModal />
      <TerminalDrawer />

      {/* Top Header */}
      <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab as (tab: string) => void} />

      {/* Main Content Arena */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Progress Timeline Rail */}
        <DashboardProgress />

        {/* Tab Content */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Navigation Sidebar */}
          <DashboardNavigation />

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

            {activeTab === 'archive' && renderActiveLevel()}

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
      <nav className="md:hidden sticky bottom-0 z-40 bg-[#121214]/95 backdrop-blur-md border-t border-[#27272A] px-2 py-2 flex items-center justify-around text-[10px] font-mono uppercase tracking-wider">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`py-1.5 px-3 rounded flex flex-col items-center gap-1 cursor-pointer ${
            activeTab === 'overview' ? 'text-white bg-[#1F1F24]' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          Overview
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('archive')}
          className={`py-1.5 px-3 rounded flex flex-col items-center gap-1 cursor-pointer ${
            activeTab === 'archive' ? 'text-white bg-[#1F1F24]' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          Levels (0{currentLevel})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('memories')}
          className={`py-1.5 px-3 rounded flex flex-col items-center gap-1 cursor-pointer ${
            activeTab === 'memories' ? 'text-white bg-[#1F1F24]' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          Memories ({completedLevels.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('logs')}
          className={`py-1.5 px-3 rounded flex flex-col items-center gap-1 cursor-pointer ${
            activeTab === 'logs' ? 'text-white bg-[#1F1F24]' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          Logs
        </button>
      </nav>

      {/* Footer */}
      <footer className="w-full border-t border-[#18181C] bg-[#0E0E10] text-[11px] font-mono text-zinc-500 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>THE ARCHIVE // PRIVATE PERSONAL REPOSITORY</span>
          <span>PRESS [ ` ] OR [ CTRL + SHIFT + A ] FOR SHELL CLI</span>
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
