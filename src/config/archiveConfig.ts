import { ArchiveConfig } from '../types/archive';

/**
 * =======================================================================
 * THE ARCHIVE - CENTRAL PERSONALIZATION CONFIGURATION
 * =======================================================================
 * You can edit all personal information, puzzle solutions, hints,
 * custom photographs, dates, inside jokes, and the final reveal here.
 *
 * DO NOT modify application logic files - everything personal is here.
 */
export const ARCHIVE_CONFIG: ArchiveConfig = {
  // Title & Subtitle shown on entrance and headers
  archiveTitle: 'AETERNA',
  archiveSubtitle: 'Some things are better discovered than explained.',

  // Initial Gatekeeper Access Code
  // Can be a memorable date (e.g. "1024", "OCTOBER"), an inside joke, or a secret word
  accessCode: 'NOVA',
  accessCodeHint: 'A four-letter word: the birth of a sudden, brilliant star in the night sky.',
  maxAttemptsBeforeHint: 3,

  // Identities & Dedication
  recipientName: '[RECIPIENT_NAME]',
  senderName: '[SENDER_NAME]',
  dedicationDate: '[IMPORTANT_DATE]',

  // =====================================================================
  // LEVEL 01: THE FIRST CLUE
  // "You already know where this begins."
  // The user investigates four archived metrics to identify the key seed.
  // =====================================================================
  level01: {
    prompt: 'You already know where this begins.',
    subprompt: 'Four coordinates were logged when this record was initiated. Only one marked the turning point.',
    options: [
      {
        type: 'DATE',
        label: 'RECORDED DATE',
        value: '10.24',
        isClue: true,
        contextNote: 'The calendar day when everything quietly changed.'
      },
      {
        type: 'TIME',
        label: 'LOCAL TIME',
        value: '02:47 AM',
        isClue: false,
        contextNote: 'A late night conversation that refused to end.'
      },
      {
        type: 'LOCATION',
        label: 'COORDINATES',
        value: 'LAT 40.7128° N',
        isClue: false,
        contextNote: 'The city intersection under rain-slicked streetlights.'
      },
      {
        type: 'NUMBER',
        label: 'ARCHIVE STAMP',
        value: 'FILE_7729',
        isClue: false,
        contextNote: 'Standard system sequence registry index.'
      }
    ],
    correctValue: '10.24',
    correctType: 'DATE',
    hints: [
      'Observe the four parameters. One holds personal significance on a calendar.',
      'It represents an anniversary or an unforgettable evening.',
      'The answer is the DATE: 10.24'
    ],
    unlockedQuote: 'Some memories don’t need photographs to remain etched into stone.'
  },

  // =====================================================================
  // LEVEL 02: THE MEMORY
  // Partially encrypted memory card requiring deciphering
  // =====================================================================
  level02: {
    memory: {
      id: 'MEM_001',
      title: 'The Seaside Observatory',
      date: '[IMPORTANT_DATE]',
      location: '[PERSONAL_LOCATION]',
      coordinates: '36.6182° N, 121.9018° W',
      // Caesar cipher shifted by 3 letters:
      // "WE SAT BY THE WATER IN SILENCE" -> "ZH VDW EB WKH ZDWHU LQ VLOHQFH"
      // Answer to unlock full memory text: "SILENCE" or the full sentence
      cipherText: 'ZH VDW EB WKH ZDWHU LQ VLOHQFH',
      plainText: 'We sat by the water in silence, listening to the tide and realizing neither of us needed to speak to be understood.',
      cipherHint: 'Caesar shift of +3. Look at the final 7 letters ("VLOHQFH"): -3 letters shifts V->S, L->I, O->L, H->E, Q->N, F->C, H->E.',
      cipherShift: 3,
      caption: 'The bench facing the tide. Cold wind, warm coffee, and no rush to be anywhere else.'
    },
    hints: [
      'Each letter in the cipher has been shifted forward by 3 steps in the alphabet (A becomes D, B becomes E).',
      'The last word in the cipher "VLOHQFH" translates to a peaceful state without words: S-I-L-E-N-C-E.',
      'Enter the word "SILENCE" (or the full phrase "WE SAT BY THE WATER IN SILENCE").'
    ]
  },

  // =====================================================================
  // LEVEL 03: THE PATTERN
  // Number to letter sequence / Personal milestone correlation
  // =====================================================================
  level03: {
    sequenceTitle: 'THE FREQUENCY SEQUENCE',
    sequenceDisplay: ['03', '08', '15', '19', '05', '14'],
    ruleExplanation: 'A numeric cadence extracted from archival telemetry. Numbers map to their classical alphabetical positions (1 = A, 2 = B, 3 = C...).',
    question: 'Decode the six-letter hidden keyword represented by: 03 - 08 - 15 - 19 - 05 - 14',
    correctAnswer: 'CHOSEN',
    cipherExplanation: '03 = C, 08 = H, 15 = O, 19 = S, 05 = E, 14 = N. Out of millions of paths, this was chosen.',
    hints: [
      'Think of the alphabet as an ordered index: 01 is A, 02 is B, 03 is C...',
      '03=C, 08=H, 15=O... decode the remaining numbers 19, 05, 14.',
      '19 is S, 05 is E, 14 is N. The full word is CHOSEN.'
    ]
  },

  // =====================================================================
  // LEVEL 04: THE PHOTOGRAPH
  // Photograph inspection with a hidden hotspot to reveal an embedded clue
  // =====================================================================
  level04: {
    photo: {
      id: 'PHOTO_001',
      title: 'ARCHIVE ARTIFACT #04 — THE STUDY DESK',
      date: '[IMPORTANT_DATE]',
      location: 'Private Study, 01:14 AM',
      dimensions: '35mm Monochrome Silver Gelatin',
      description: 'An open journal, an antique brass key, and a pocket watch resting beside handwritten drafts.',
      hotspot: {
        x: 68, // % from left (near the antique key / journal margin)
        y: 45, // % from top
        radius: 35,
        discoveredMessage: 'You found the inscription hidden inside the margin: "ECHOES REMAIN".',
        subtleHint: 'Inspect the antique key and notebook corner on the right side.',
        keyPiece: 'ECHOES'
      }
    },
    prompt: 'Something about this artifact contains a micro-inscription. Inspect the photograph carefully, locate the hidden artifact detail, and enter the discovered key piece.',
    requiredDiscoveryWord: 'ECHOES',
    hints: [
      'Click "Inspect Photograph" to open the high-resolution lightbox view.',
      'Hover over or touch around the vintage brass key and the journal on the right side (around 68% across, 45% down).',
      'The hidden inscription reveals the word: ECHOES'
    ]
  },

  // =====================================================================
  // LEVEL 05: THE MESSAGE
  // Encrypted confidential communication with a memorable secret key
  // =====================================================================
  level05: {
    encryptedText: '77-65-20-61-6C-77-61-79-73-20-66-6F-75-6E-64-20-61-20-77-61-79',
    cipherType: 'Hexadecimal ASCII & Key Lock',
    keyClue: 'The key is an inside joke or shared pet name: the thing you always say when it rains.',
    expectedKey: 'UMBRELLA',
    decryptedMessage: '“We always found a way through the quietest storms, even when the world outside had forgotten how to listen.”',
    hints: [
      'The security lock requires the key word that protects from rain.',
      'Eight letters. Starts with U, ends with A.',
      'Enter the secret key: UMBRELLA'
    ]
  },

  // =====================================================================
  // LEVEL 06: THE THINGS NEVER SAID
  // 4 locked fragments requiring mini-discoveries to unlock emotional truths
  // =====================================================================
  level06: {
    introText: 'There are some things that are easier to build than to say.',
    fragments: [
      {
        id: 'FRAG_01',
        code: 'FRAGMENT // 01',
        prompt: 'What did we share when words felt too small?',
        key: 'PRESENCE',
        revealedText: 'Thank you for simply being there. You never asked me to pretend I was stronger than I was.'
      },
      {
        id: 'FRAG_02',
        code: 'FRAGMENT // 02',
        prompt: 'What remains long after the conversation ends?',
        key: 'MEMORY',
        revealedText: 'I remember more than you think. Every small detail, the way your voice softened, the quiet laughter between sentences.'
      },
      {
        id: 'FRAG_03',
        code: 'FRAGMENT // 03',
        prompt: 'What happens when time passes effortlessly?',
        key: 'GRACE',
        revealedText: 'You became part of more memories than you probably realize. Without even trying, you reshaped the way I see tomorrow.'
      },
      {
        id: 'FRAG_04',
        code: 'FRAGMENT // 04',
        prompt: 'What kind of moments mattered the most?',
        key: 'QUIET',
        revealedText: 'The things that mattered were rarely the loudest. It was always the unspoken understanding between us.'
      }
    ],
    allFragmentsCompletedMessage: 'All four fragments synthesized. The core archive gate is unlocking.',
    hints: [
      'The fragment keys are single foundational words: PRESENCE, MEMORY, GRACE, QUIET.',
      'Click on any locked fragment card and enter its corresponding answer.',
      'For Fragment 1 try PRESENCE, for Fragment 2 try MEMORY, for 3 try GRACE, for 4 try QUIET.'
    ]
  },

  // =====================================================================
  // LEVEL 07: THE FINAL FILE (UNKNOWN_000)
  // Verification question that unlocks the final reveal
  // =====================================================================
  level07: {
    fileCode: 'UNKNOWN_000',
    statusLabel: 'ENCRYPTED — FINAL SECURITY THRESHOLD',
    verificationQuestion: 'What was the first thing we both remember that made us realize this was different?',
    verificationExpectedAnswer: 'EVERYTHING',
    hints: [
      'It is not a single mundane detail, but the entirety of how it started.',
      'Ten letters. Starts with E. It encompasses all of it.',
      'Enter the word: EVERYTHING'
    ]
  },

  // =====================================================================
  // THE FINAL REVEAL
  // The emotional climax, personal letter, dedication, and closing statement
  // =====================================================================
  finalReveal: {
    leadIn: 'ARCHIVE VERIFIED. ALL RESTRICTIONS LIFTED.',
    cinematicQuotes: [
      'Now you know why this existed.',
      'Some things cannot simply be written in a card or spoken over dinner.',
      'They deserve to be discovered, piece by piece.'
    ],
    personalLetter: [
      'To [RECIPIENT_NAME],',
      'I could have simply written everything here in an email, a letter, or a text message.',
      'But that wouldn’t have felt right.',
      'So I built this archive.',
      'I hid what I wanted to tell you inside dates you might recognize, inside the quiet cadence of memories we shared, and inside questions that only someone who paid attention would ever understand.',
      'Because some things are infinitely more meaningful when you discover them yourself.',
      'Thank you for being one of the most important, irreplaceable people in my life.',
      'Every line of code, every riddle, and every hidden corner here was crafted with you in mind.',
      'This entire archive was made for you.'
    ],
    closingStatement: 'The archive is now permanently unlocked in your care.',
    finalPhotoCaption: 'Two silhouettes against an endless twilight horizon. Where the past is preserved, and the future begins.',
    finalPhotoDate: '[IMPORTANT_DATE]'
  },

  // =====================================================================
  // EASTER EGGS & HIDDEN DISCOVERIES
  // Secret interactions for the curious observer
  // =====================================================================
  easterEggs: {
    logoClickCountRequired: 5,
    logoClickMessage: 'You clicked the archive seal five times. You actually looked beneath the surface. Of course you did.',
    secretRoutePath: 'origin',
    terminalEasterEggAnswer: 'You were not supposed to find this terminal branch so soon... but curiosity has always been your greatest gift.'
  }
};
