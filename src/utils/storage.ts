import { ArchiveState, ArchiveTheme, SystemLogEntry } from '../types/archive';

const STORAGE_KEY = 'the_archive_state_v1';

export const INITIAL_STATE: ArchiveState = {
  currentLevel: 1,
  unlockedLevels: [1],
  completedLevels: [],
  discoveredClues: [],
  hintsUsedCount: 0,
  easterEggsDiscovered: [],
  systemLogs: [
    {
      id: 'log_init',
      timestamp: '00:00:01',
      message: 'Archive kernel loaded. Integrity verified.',
      type: 'system'
    },
    {
      id: 'log_ready',
      timestamp: '00:00:03',
      message: 'Awaiting authorized credential sequence.',
      type: 'auth'
    }
  ],
  soundEnabled: false,
  theme: 'crimson',
  isArchiveAuthenticated: false,
  hasSeenLanding: false,
  hasCompletedArchive: false,
  isTerminalOpen: false,
  isUserManualOpen: false,
  selectedViewerImage: null
};

export function loadSavedState(): ArchiveState {
  if (typeof window === 'undefined') return INITIAL_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...INITIAL_STATE,
      ...parsed,
      // Transient UI states should not stick on refresh
      isTerminalOpen: false,
      isUserManualOpen: false,
      selectedViewerImage: null
    };
  } catch {
    return INITIAL_STATE;
  }
}

export function saveState(state: ArchiveState): void {
  if (typeof window === 'undefined') return;
  try {
    const toSave = {
      currentLevel: state.currentLevel,
      unlockedLevels: state.unlockedLevels,
      completedLevels: state.completedLevels,
      discoveredClues: state.discoveredClues,
      hintsUsedCount: state.hintsUsedCount,
      easterEggsDiscovered: state.easterEggsDiscovered,
      systemLogs: state.systemLogs.slice(-40), // preserve last 40 logs
      soundEnabled: state.soundEnabled,
      theme: state.theme,
      isArchiveAuthenticated: state.isArchiveAuthenticated,
      hasSeenLanding: state.hasSeenLanding,
      hasCompletedArchive: state.hasCompletedArchive
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch {
    // Ignore quota issues
  }
}

export function clearSavedArchive(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
}
