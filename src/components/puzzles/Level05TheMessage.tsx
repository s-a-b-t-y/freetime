import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, KeyRound, Sparkles } from 'lucide-react';
import { useArchive } from '../../context/ArchiveContext';
import { ARCHIVE_CONFIG } from '../../config/archiveConfig';
import { HintAccordion } from '../common/HintAccordion';
import { archiveAudio } from '../../utils/audio';

export const Level05TheMessage: React.FC = () => {
  const { completeLevel, completedLevels, setCurrentLevel, soundEnabled } = useArchive();
  const [keyInput, setKeyInput] = useState('');
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);
  const [typewriterText, setTypewriterText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const isCompleted = completedLevels.includes(5);

  const { encryptedText, cipherType, keyClue, expectedKey, decryptedMessage, hints } = ARCHIVE_CONFIG.level05;

  // Typewriter effect when solved
  useEffect(() => {
    if (isCompleted && !typewriterText) {
      setIsTyping(true);
      let idx = 0;
      const timer = setInterval(() => {
        if (idx < decryptedMessage.length) {
          setTypewriterText(decryptedMessage.slice(0, idx + 1));
          if (idx % 3 === 0) archiveAudio.playKeystroke();
          idx++;
        } else {
          clearInterval(timer);
          setIsTyping(false);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [isCompleted, decryptedMessage, typewriterText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCompleted) return;

    const clean = keyInput.trim().toUpperCase();
    if (clean === expectedKey.trim().toUpperCase()) {
      archiveAudio.playUnlock();
      setErrorFeedback(null);
      completeLevel(5, `Decoded Cipher Key: ${expectedKey}`);
    } else {
      archiveAudio.playDenied();
      setErrorFeedback('Security handshake rejected. The cipher key does not match.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Level Header Banner */}
      <div className="bg-[#121214] border border-[#27272A] rounded-xl p-6 shadow-xl space-y-3">
        <div className="flex items-center justify-between font-mono text-xs text-zinc-400 border-b border-[#27272A] pb-3">
          <span className="uppercase tracking-widest text-rose-400 font-semibold">
            ACCESS LEVEL 05 // THE MESSAGE
          </span>
          <span>FILE_005</span>
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-serif-archive text-white font-normal">
            Confidential Transmission Intercept
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
            An encrypted data stream was preserved in hexadecimal code. Provide the private key to unlock the stream.
          </p>
        </div>
      </div>

      {/* Hex Stream Card */}
      <div className="bg-[#141417] border border-[#27272A] rounded-xl p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="text-zinc-500 uppercase tracking-wider">
            ENCRYPTION PROTOCOL: {cipherType}
          </span>
          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold ${
            isCompleted ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'
          }`}>
            {isCompleted ? 'PLAINTEXT RESTORED' : 'PAYLOAD LOCKED'}
          </span>
        </div>

        {/* Encrypted Raw Hex Stream */}
        <div className="p-4 bg-[#0B0B0E] border border-[#27272A] rounded-lg">
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">
            Encrypted Hex Buffer:
          </p>
          <p className="font-mono text-xs text-zinc-400 tracking-widest break-all font-medium">
            {encryptedText}
          </p>
        </div>

        {/* Context Clue Prompt */}
        <div className="border-l-2 border-rose-500 pl-4 py-1 space-y-1">
          <span className="font-mono text-[10px] uppercase text-zinc-400 tracking-wider">
            Decryption Key Clue:
          </span>
          <p className="text-sm font-serif-archive italic text-zinc-200 leading-relaxed">
            “{keyClue}”
          </p>
        </div>

        {/* Form or Typewriter Output */}
        {!isCompleted ? (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={keyInput}
                  onChange={e => setKeyInput(e.target.value)}
                  placeholder="[ ENTER PRIVATE CIPHER KEY ]"
                  className="w-full px-4 py-2.5 bg-[#0E0E12] border border-[#27272A] focus:border-rose-500 rounded-lg text-white font-mono text-xs uppercase tracking-widest outline-none"
                />
                <KeyRound className="absolute right-3 top-3 w-4 h-4 text-zinc-600 pointer-events-none" />
              </div>

              <button
                type="submit"
                disabled={!keyInput.trim()}
                className="px-6 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 font-mono text-xs uppercase tracking-widest font-semibold rounded-lg transition-colors disabled:opacity-40 cursor-pointer"
              >
                Decrypt Stream
              </button>
            </div>

            {errorFeedback && (
              <div className="flex items-center gap-2 text-rose-400 text-xs font-sans bg-rose-950/20 border border-rose-900/40 p-2.5 rounded-lg">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorFeedback}</span>
              </div>
            )}
          </form>
        ) : (
          <div className="p-6 bg-[#16161A] border border-rose-500/30 rounded-xl space-y-3 animate-fade-in">
            <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              <span>Decryption Successful // Authorized Readout</span>
            </div>

            <p className="text-lg sm:text-xl font-serif-archive text-white leading-relaxed italic">
              {typewriterText}
              {isTyping && <span className="inline-block w-2 h-4 bg-rose-500 ml-1 animate-pulse" />}
            </p>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setCurrentLevel(6)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>Advance to Level 06</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Hint System */}
      <HintAccordion levelId={5} hints={hints} />
    </div>
  );
};
