import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { ARCHIVE_CONFIG } from '../config/archiveConfig';
import { ARCHIVE_LEVELS } from '../data/levelData';
import { ArchiveState, ArchiveTheme, SystemLogEntry, PhotographClue } from '../types/archive';
import { archiveAudio } from '../utils/audio';
import { loadSavedState, saveState, clearSavedArchive, INITIAL_STATE } from '../utils/storage';

interface ArchiveContextType extends ArchiveState {
  enterArchive: () => void;
  authenticateAccessCode: (code: string) => { success: boolean; hint?: string };
  unlockLevel: (levelId: number) => void;
  completeLevel: (levelId: number, clueNote?: string) => void;
  recordHintUse: (levelId: number) => void;
  triggerEasterEgg: (eggId: string, message: string) => void;
  addLog: (message: string, type?: SystemLogEntry['type']) => void;
  setCurrentLevel: (level: number) => void;
  toggleSound: () => void;
  setTheme: (theme: ArchiveTheme) => void;
  toggleTerminal: (open?: boolean) => void;
  toggleUserManual: (open?: boolean) => void;
  openImageViewer: (imageData: {
    url?: string;
    title: string;
    date: string;
    location: string;
    caption?: string;
    hotspot?: PhotographClue['hotspot'];
    isHotspotActive?: boolean;
  }) => void;
  closeImageViewer: () => void;
  resetArchive: () => void;
  revisitArchive: () => void;
  executeTerminalCommand: (command: string) => string;
}

const ArchiveContext = createContext<ArchiveContextType | null>(null);

function formatTimestamp(): string {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

export const ArchiveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ArchiveState>(() => loadSavedState());
  const [accessAttempts, setAccessAttempts] = useState(0);

  // Sync to localStorage
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Sync audio system state
  useEffect(() => {
    archiveAudio.setEnabled(state.soundEnabled);
  }, [state.soundEnabled]);

  // Sync theme to root element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  // Keyboard shortcut: Ctrl + Shift + A or Backquote to toggle terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') || e.key === '`') {
        // Toggle terminal
        e.preventDefault();
        setState(prev => ({ ...prev, isTerminalOpen: !prev.isTerminalOpen }));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addLog = useCallback((message: string, type: SystemLogEntry['type'] = 'system') => {
    setState(prev => {
      const newEntry: SystemLogEntry = {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        timestamp: formatTimestamp(),
        message,
        type
      };
      return {
        ...prev,
        systemLogs: [...prev.systemLogs, newEntry]
      };
    });
  }, []);

  const enterArchive = useCallback(() => {
    archiveAudio.playClick();
    setState(prev => ({ ...prev, hasSeenLanding: true }));
    addLog('User initiated access handshake.', 'auth');
  }, [addLog]);

  const authenticateAccessCode = useCallback((code: string): { success: boolean; hint?: string } => {
    const cleanCode = code.trim().toUpperCase();
    const correctCode = ARCHIVE_CONFIG.accessCode.trim().toUpperCase();

    if (cleanCode === correctCode) {
      archiveAudio.playUnlock();
      setState(prev => ({
        ...prev,
        isArchiveAuthenticated: true,
        currentLevel: prev.completedLevels.length >= 7 ? 7 : Math.max(prev.currentLevel, 1)
      }));
      addLog('Primary access code verified. Level 01 unlocked.', 'auth');
      return { success: true };
    } else {
      archiveAudio.playDenied();
      setAccessAttempts(prev => prev + 1);
      addLog(`Failed access attempt with key: "${code}".`, 'auth');

      let hint: string | undefined = undefined;
      if (accessAttempts + 1 >= ARCHIVE_CONFIG.maxAttemptsBeforeHint) {
        hint = ARCHIVE_CONFIG.accessCodeHint;
      }
      return { success: false, hint };
    }
  }, [accessAttempts, addLog]);

  const unlockLevel = useCallback((levelId: number) => {
    setState(prev => {
      if (prev.unlockedLevels.includes(levelId)) return prev;
      archiveAudio.playUnlock();
      return {
        ...prev,
        unlockedLevels: [...prev.unlockedLevels, levelId]
      };
    });
    addLog(`Access clearance granted for Level ${levelId.toString().padStart(2, '0')}.`, 'access');
  }, [addLog]);

  const completeLevel = useCallback((levelId: number, clueNote?: string) => {
    archiveAudio.playUnlock();
    setState(prev => {
      const completed = prev.completedLevels.includes(levelId)
        ? prev.completedLevels
        : [...prev.completedLevels, levelId];

      const nextLevel = Math.min(levelId + 1, 7);
      const unlocked = prev.unlockedLevels.includes(nextLevel)
        ? prev.unlockedLevels
        : [...prev.unlockedLevels, nextLevel];

      const clues = clueNote && !prev.discoveredClues.includes(clueNote)
        ? [...prev.discoveredClues, clueNote]
        : prev.discoveredClues;

      const isAllDone = completed.length >= 7;

      return {
        ...prev,
        completedLevels: completed,
        unlockedLevels: unlocked,
        currentLevel: isAllDone ? 7 : nextLevel,
        discoveredClues: clues,
        hasCompletedArchive: isAllDone || prev.hasCompletedArchive
      };
    });

    addLog(`Level ${levelId.toString().padStart(2, '0')} challenge decoded successfully.`, 'puzzle');
    if (levelId === 7) {
      archiveAudio.playFinalHarmonic();
      addLog('Final archive file recovered. Complete disclosure initiated.', 'secret');
    }
  }, [addLog]);

  const recordHintUse = useCallback((levelId: number) => {
    archiveAudio.playClick();
    setState(prev => ({
      ...prev,
      hintsUsedCount: prev.hintsUsedCount + 1
    }));
    addLog(`Hint decrypted for Level ${levelId.toString().padStart(2, '0')}.`, 'puzzle');
  }, [addLog]);

  const triggerEasterEgg = useCallback((eggId: string, message: string) => {
    archiveAudio.playUnlock();
    setState(prev => {
      if (prev.easterEggsDiscovered.includes(eggId)) return prev;
      return {
        ...prev,
        easterEggsDiscovered: [...prev.easterEggsDiscovered, eggId]
      };
    });
    addLog(`Easter egg unlocked [${eggId}]: ${message}`, 'secret');
  }, [addLog]);

  const setCurrentLevel = useCallback((level: number) => {
    archiveAudio.playClick();
    setState(prev => {
      if (prev.unlockedLevels.includes(level)) {
        return { ...prev, currentLevel: level };
      }
      return prev;
    });
  }, []);

  const toggleSound = useCallback(() => {
    setState(prev => {
      const next = !prev.soundEnabled;
      archiveAudio.setEnabled(next);
      if (next) archiveAudio.playClick();
      return { ...prev, soundEnabled: next };
    });
  }, []);

  const setTheme = useCallback((theme: ArchiveTheme) => {
    archiveAudio.playClick();
    setState(prev => ({ ...prev, theme }));
    addLog(`Theme set to ${theme}.`, 'system');
  }, [addLog]);

  const toggleTerminal = useCallback((open?: boolean) => {
    archiveAudio.playClick();
    setState(prev => ({
      ...prev,
      isTerminalOpen: open !== undefined ? open : !prev.isTerminalOpen
    }));
  }, []);

  const toggleUserManual = useCallback((open?: boolean) => {
    archiveAudio.playClick();
    setState(prev => ({
      ...prev,
      isUserManualOpen: open !== undefined ? open : !prev.isUserManualOpen
    }));
  }, []);

  const openImageViewer = useCallback((imageData: {
    url?: string;
    title: string;
    date: string;
    location: string;
    caption?: string;
    hotspot?: PhotographClue['hotspot'];
    isHotspotActive?: boolean;
  }) => {
    archiveAudio.playClick();
    setState(prev => ({
      ...prev,
      selectedViewerImage: imageData
    }));
  }, []);

  const closeImageViewer = useCallback(() => {
    archiveAudio.playClick();
    setState(prev => ({
      ...prev,
      selectedViewerImage: null
    }));
  }, []);

  const resetArchive = useCallback(() => {
    clearSavedArchive();
    setState(INITIAL_STATE);
    setAccessAttempts(0);
  }, []);

  const revisitArchive = useCallback(() => {
    archiveAudio.playClick();
    setState(prev => ({
      ...prev,
      currentLevel: 1
    }));
  }, []);

  const executeTerminalCommand = useCallback((cmdRaw: string): string => {
    const cmd = cmdRaw.trim().toLowerCase();
    const parts = cmd.split(' ');
    const root = parts[0];

    switch (root) {
      case 'help':
        return [
          'AVAILABLE ARCHIVE CLI COMMANDS:',
          '  status        - Displays current archive clearance & recovery progress',
          '  files         - Enumerates all 7 archive files and status',
          '  logs          - Prints the last 5 system log entries',
          '  theme <name>  - Switch theme: crimson | indigo | emerald | parchment',
          '  sound         - Toggles audio synthesizer feedback on/off',
          '  secret        - Latent diagnostic probe',
          '  origin        - Classified trajectory insight',
          '  clear         - Clears terminal output',
          '  exit          - Closes terminal view'
        ].join('\n');

      case 'status':
        return [
          'ARCHIVE SYSTEM DIAGNOSTIC:',
          `  AUTHENTICATION: ${state.isArchiveAuthenticated ? 'VERIFIED' : 'GUEST'}`,
          `  CURRENT LEVEL:  LEVEL 0${state.currentLevel}`,
          `  UNLOCKED FILES: ${state.unlockedLevels.length} / 07`,
          `  COMPLETED:      ${state.completedLevels.length} / 07`,
          `  HINTS CONSUMED: ${state.hintsUsedCount}`,
          `  EASTER EGGS:    ${state.easterEggsDiscovered.length} discovered`,
          `  ARCHIVE STATE:  ${state.hasCompletedArchive ? 'ARCHIVE RECOVERED' : 'INVESTIGATION IN PROGRESS'}`
        ].join('\n');

      case 'files':
        return ARCHIVE_LEVELS.map(l => {
          const isDone = state.completedLevels.includes(l.id);
          const isUnlocked = state.unlockedLevels.includes(l.id);
          const stateStr = isDone ? '[RECOVERED]' : isUnlocked ? '[UNLOCKED ]' : '[ENCRYPTED]';
          return `  ${l.fileId.padEnd(12)} ${stateStr}  ${l.title}`;
        }).join('\n');

      case 'logs':
        return state.systemLogs.slice(-6).map(l => `[${l.timestamp}] (${l.type}) ${l.message}`).join('\n');

      case 'theme': {
        const target = parts[1] as ArchiveTheme;
        if (['crimson', 'indigo', 'emerald', 'parchment'].includes(target)) {
          setTheme(target);
          return `Theme set to: ${target}`;
        }
        return 'Invalid theme. Options: crimson, indigo, emerald, parchment';
      }

      case 'sound':
        toggleSound();
        return `Audio synthesizer toggled. Current state: ${!state.soundEnabled ? 'ENABLED' : 'DISABLED'}`;

      case 'secret':
      case 'easter':
        triggerEasterEgg('terminal_discovery', 'User accessed the classified terminal directory.');
        return ARCHIVE_CONFIG.easterEggs.terminalEasterEggAnswer;

      case 'origin':
        return `ORIGIN RECORD: Dedicated to ${ARCHIVE_CONFIG.recipientName} from ${ARCHIVE_CONFIG.senderName} (${ARCHIVE_CONFIG.dedicationDate}).`;

      case 'exit':
        toggleTerminal(false);
        return 'Terminal closed.';

      case '':
        return '';

      default:
        return `Command not recognized: "${cmdRaw}". Type "help" for valid directives.`;
    }
  }, [state, setTheme, toggleSound, triggerEasterEgg, toggleTerminal]);

  const value = useMemo(() => ({
    ...state,
    enterArchive,
    authenticateAccessCode,
    unlockLevel,
    completeLevel,
    recordHintUse,
    triggerEasterEgg,
    addLog,
    setCurrentLevel,
    toggleSound,
    setTheme,
    toggleTerminal,
    toggleUserManual,
    openImageViewer,
    closeImageViewer,
    resetArchive,
    revisitArchive,
    executeTerminalCommand
  }), [
    state,
    enterArchive,
    authenticateAccessCode,
    unlockLevel,
    completeLevel,
    recordHintUse,
    triggerEasterEgg,
    addLog,
    setCurrentLevel,
    toggleSound,
    setTheme,
    toggleTerminal,
    toggleUserManual,
    openImageViewer,
    closeImageViewer,
    resetArchive,
    revisitArchive,
    executeTerminalCommand
  ]);

  return <ArchiveContext.Provider value={value}>{children}</ArchiveContext.Provider>;
};

export const useArchive = (): ArchiveContextType => {
  const context = useContext(ArchiveContext);
  if (!context) {
    throw new Error('useArchive must be used within an ArchiveProvider');
  }
  return context;
};
