export type ArchiveTheme = 'crimson' | 'indigo' | 'emerald' | 'parchment';

export type LevelStatus = 'locked' | 'unlocked' | 'completed';

export interface LevelInfo {
  id: number;
  numberStr: string; // "01", "02", etc.
  title: string;
  subtitle: string;
  codename: string;
  fileId: string;
  unlockedFileTitle: string;
  unlockedContent: string;
}

export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  location: string;
  coordinates?: string;
  cipherText: string;
  plainText: string;
  cipherHint: string;
  cipherShift?: number;
  imageUrl?: string;
  caption: string;
}

export interface PhotographClue {
  id: string;
  title: string;
  date: string;
  location: string;
  dimensions: string;
  imageUrl?: string;
  description: string;
  hotspot: {
    x: number; // percentage from left (0-100)
    y: number; // percentage from top (0-100)
    radius: number;
    discoveredMessage: string;
    subtleHint: string;
    keyPiece: string;
  };
}

export interface FragmentMessage {
  id: string;
  code: string;
  prompt: string;
  key: string;
  revealedText: string;
}

export interface SystemLogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'system' | 'auth' | 'access' | 'puzzle' | 'secret';
}

export interface ArchiveConfig {
  archiveTitle: string;
  archiveSubtitle: string;
  accessCode: string;
  accessCodeHint: string;
  maxAttemptsBeforeHint: number;
  recipientName: string;
  senderName: string;
  dedicationDate: string;

  // Level 01: The First Clue
  level01: {
    prompt: string;
    subprompt: string;
    options: {
      type: 'DATE' | 'TIME' | 'LOCATION' | 'NUMBER';
      label: string;
      value: string;
      isClue: boolean;
      contextNote: string;
    }[];
    correctValue: string;
    correctType: string;
    hints: [string, string, string];
    unlockedQuote: string;
  };

  // Level 02: The Memory
  level02: {
    memory: MemoryItem;
    hints: [string, string, string];
  };

  // Level 03: The Pattern
  level03: {
    sequenceTitle: string;
    sequenceDisplay: string[];
    ruleExplanation: string;
    question: string;
    correctAnswer: string;
    cipherExplanation: string;
    hints: [string, string, string];
  };

  // Level 04: The Photograph
  level04: {
    photo: PhotographClue;
    prompt: string;
    requiredDiscoveryWord: string;
    hints: [string, string, string];
  };

  // Level 05: The Message
  level05: {
    encryptedText: string;
    cipherType: string;
    keyClue: string;
    expectedKey: string;
    decryptedMessage: string;
    hints: [string, string, string];
  };

  // Level 06: The Things Never Said
  level06: {
    introText: string;
    fragments: FragmentMessage[];
    allFragmentsCompletedMessage: string;
    hints: [string, string, string];
  };

  // Level 07: The Final File
  level07: {
    fileCode: string;
    statusLabel: string;
    verificationQuestion: string;
    verificationExpectedAnswer: string;
    hints: [string, string, string];
  };

  // Final Reveal
  finalReveal: {
    leadIn: string;
    cinematicQuotes: string[];
    personalLetter: string[];
    closingStatement: string;
    finalPhotoCaption: string;
    finalPhotoDate: string;
  };

  // Easter Eggs
  easterEggs: {
    logoClickCountRequired: number;
    logoClickMessage: string;
    secretRoutePath: string;
    terminalEasterEggAnswer: string;
  };
}

export interface ArchiveState {
  currentLevel: number;
  unlockedLevels: number[];
  completedLevels: number[];
  discoveredClues: string[];
  hintsUsedCount: number;
  easterEggsDiscovered: string[];
  systemLogs: SystemLogEntry[];
  soundEnabled: boolean;
  theme: ArchiveTheme;
  isArchiveAuthenticated: boolean;
  hasSeenLanding: boolean;
  hasCompletedArchive: boolean;
  isTerminalOpen: boolean;
  isUserManualOpen: boolean;
  selectedViewerImage: {
    url?: string;
    title: string;
    date: string;
    location: string;
    caption?: string;
    hotspot?: PhotographClue['hotspot'];
    isHotspotActive?: boolean;
  } | null;
}
