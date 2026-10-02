import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, CornerDownLeft, Sparkles } from 'lucide-react';
import { useArchive } from '../../context/ArchiveContext';

interface TerminalLine {
  id: string;
  type: 'input' | 'output';
  text: string;
}

export const TerminalDrawer: React.FC = () => {
  const { isTerminalOpen, toggleTerminal, executeTerminalCommand } = useArchive();
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: 'init_1',
      type: 'output',
      text: 'ARCHIVE DIAGNOSTIC TERMINAL v1.4 // TYPE "help" FOR COMMANDS'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isTerminalOpen) {
      inputRef.current?.focus();
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isTerminalOpen, history]);

  if (!isTerminalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputVal.trim();
    if (!clean) return;

    if (clean.toLowerCase() === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    const output = executeTerminalCommand(clean);
    setHistory(prev => [
      ...prev,
      { id: `in_${Date.now()}`, type: 'input', text: clean },
      { id: `out_${Date.now()}`, type: 'output', text: output }
    ]);
    setInputVal('');
  };

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 bg-[#0B0B0E]/95 border-t border-[#27272A] shadow-2xl backdrop-blur-md max-h-[45vh] flex flex-col font-mono text-xs transition-all"
      role="region"
      aria-label="Archive System Terminal"
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#121215] border-b border-[#27272A] text-zinc-400 select-none">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-rose-500" />
          <span className="text-[11px] uppercase tracking-wider text-zinc-300">
            Archive Shell Terminal
          </span>
          <span className="hidden sm:inline text-zinc-600">· [Ctrl + Shift + A or ` to toggle]</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setHistory([])}
            className="hover:text-zinc-200 transition-colors cursor-pointer px-1.5 py-0.5 rounded text-[10px]"
            title="Clear terminal buffer"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => toggleTerminal(false)}
            className="hover:text-white transition-colors cursor-pointer p-1 rounded"
            aria-label="Close terminal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Output Console Log */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1.5 text-zinc-300 leading-relaxed font-mono">
        {history.map(item => (
          <div key={item.id} className="whitespace-pre-wrap">
            {item.type === 'input' ? (
              <div className="flex items-center gap-2 text-rose-400 font-semibold">
                <span>&gt;</span>
                <span>{item.text}</span>
              </div>
            ) : (
              <div className="text-zinc-400 pl-4">{item.text}</div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Prompt */}
      <form onSubmit={handleSubmit} className="flex items-center border-t border-[#27272A] bg-[#0E0E12] px-4 py-2">
        <span className="text-rose-500 mr-2 font-bold select-none">&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          placeholder="Enter command (e.g. status, files, secret, help)..."
          className="flex-1 bg-transparent text-white outline-none placeholder:text-zinc-600 text-xs font-mono"
        />
        <button
          type="submit"
          className="text-zinc-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
          title="Execute Command"
          aria-label="Execute"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
