import React, { useState } from 'react';
import { Terminal, Shield, Lock, Sparkles, Filter } from 'lucide-react';
import { useArchive } from '../../context/ArchiveContext';
import { SystemLogEntry } from '../../types/archive';

export const SystemLogsPanel: React.FC = () => {
  const { systemLogs } = useArchive();
  const [filterType, setFilterType] = useState<string>('all');

  const filteredLogs = filterType === 'all'
    ? systemLogs
    : systemLogs.filter(l => l.type === filterType);

  const getBadgeStyle = (type: SystemLogEntry['type']) => {
    switch (type) {
      case 'auth':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'access':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'puzzle':
        return 'text-sky-400 bg-sky-500/10 border-sky-500/20';
      case 'secret':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default:
        return 'text-zinc-400 bg-zinc-800 border-zinc-700';
    }
  };

  return (
    <div className="bg-[#121214] border border-[#27272A] rounded-xl p-5 shadow-lg space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#27272A] pb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-rose-500" />
          <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-200">
            System Telemetry &amp; Access Log
          </h3>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-1 text-[11px] font-mono">
          <span className="text-zinc-500 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {(['all', 'auth', 'puzzle', 'secret'] as const).map(f => (
            <button
              key={f}
              type="button"
              onClick={() => setFilterType(f)}
              className={`px-2 py-0.5 rounded transition-colors uppercase cursor-pointer ${
                filterType === f
                  ? 'bg-zinc-700 text-white font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Feed */}
      <div className="max-h-72 overflow-y-auto space-y-2 font-mono text-xs pr-1">
        {filteredLogs.length === 0 ? (
          <div className="text-center py-6 text-zinc-600">No logs for this category</div>
        ) : (
          filteredLogs.slice().reverse().map(log => (
            <div
              key={log.id}
              className="flex items-start gap-2.5 p-2 rounded bg-[#16161A] border border-[#1F1F24] hover:border-zinc-700 transition-colors"
            >
              <span className="text-zinc-500 text-[10px] shrink-0 mt-0.5">
                [{log.timestamp}]
              </span>
              <span
                className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded border shrink-0 ${getBadgeStyle(
                  log.type
                )}`}
              >
                {log.type}
              </span>
              <span className="text-zinc-300 font-sans text-xs flex-1 break-words">
                {log.message}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="pt-2 border-t border-[#1F1F24] flex items-center justify-between text-[11px] font-mono text-zinc-500">
        <span>Session Records: {systemLogs.length} entries</span>
        <span className="flex items-center gap-1 text-emerald-400/80">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Active Monitor
        </span>
      </div>
    </div>
  );
};
