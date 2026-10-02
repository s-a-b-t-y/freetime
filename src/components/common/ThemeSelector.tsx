import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check, Sparkles, ChevronDown } from 'lucide-react';
import { useArchive } from '../../context/ArchiveContext';
import { ArchiveTheme } from '../../types/archive';

interface ThemeOption {
  id: ArchiveTheme;
  name: string;
  subtitle: string;
  accent: string;
  badge: string;
  bgHex: string;
  desc: string;
}

const THEMES: ThemeOption[] = [
  {
    id: 'crimson',
    name: 'Crimson Noir',
    subtitle: 'Matte obsidian & deep ruby glow',
    accent: '#E11D48',
    badge: '#FDA4AF',
    bgHex: '#0B0B0D',
    desc: 'The original mysterious archive atmosphere with quiet ruby warmth.'
  },
  {
    id: 'indigo',
    name: 'Midnight Indigo',
    subtitle: 'Deep charcoal & celestial lapis',
    accent: '#38BDF8',
    badge: '#BAE6FD',
    bgHex: '#080A0F',
    desc: 'Cool astronomical nighttime aesthetic beneath endless stars.'
  },
  {
    id: 'emerald',
    name: 'Emerald Specimen',
    subtitle: 'Obsidian & muted forest tone',
    accent: '#10B981',
    badge: '#A7F3D0',
    bgHex: '#070B09',
    desc: 'Quiet botanical specimen vault with restorative emerald luminance.'
  },
  {
    id: 'parchment',
    name: 'Sepia Parchment',
    subtitle: 'Dark antique paper & warm bronze',
    accent: '#D97706',
    badge: '#FDE68A',
    bgHex: '#0E0D0B',
    desc: 'Curatorial historical monograph with gentle amber candlelight.'
  }
];

export const ThemeSelector: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, setTheme } = useArchive();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentTheme = THEMES.find(t => t.id === theme) || THEMES[0];

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
      {/* Sleek, Glowing Trigger Pill */}
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="group relative inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-full border border-[#27272A] hover:border-zinc-500 bg-[#121215]/90 hover:bg-[#18181D] text-zinc-300 hover:text-white transition-all duration-300 cursor-pointer shadow-lg backdrop-blur-md active:scale-95 shrink-0"
        title="Switch Visual Atmosphere Theme"
        aria-expanded={isOpen}
      >
        {/* Soft Ambient Radiance */}
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform group-hover:scale-125 shadow-sm"
          style={{
            backgroundColor: currentTheme.accent,
            boxShadow: `0 0 10px ${currentTheme.accent}`
          }}
        />

        <Palette className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors shrink-0" />

        <span className="hidden md:inline font-mono text-[11px] uppercase tracking-wider font-medium text-zinc-200 whitespace-nowrap">
          {currentTheme.name}
        </span>

        <ChevronDown
          className={`hidden sm:inline w-3 h-3 text-zinc-500 group-hover:text-zinc-300 transition-transform duration-300 shrink-0 ${
            isOpen ? 'rotate-180 text-white' : ''
          }`}
        />
      </button>

      {/* Floating Glassmorphism Theme Menu */}
      {isOpen && (
        <div
          className="fixed sm:absolute left-3 right-3 sm:left-auto sm:right-0 top-16 sm:top-auto sm:mt-2.5 max-w-sm sm:w-88 rounded-2xl bg-[#111216]/98 border border-[#27272A] shadow-2xl p-3 z-50 text-left focus:outline-none backdrop-blur-xl animate-fade-in"
          role="menu"
        >
          {/* Header */}
          <div className="px-3 py-2 border-b border-[#222228] mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" style={{ color: currentTheme.accent }} />
              <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 font-semibold">
                Atmosphere &amp; Colorway
              </span>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">4 PALETTES</span>
          </div>

          {/* Theme List */}
          <div className="space-y-1.5">
            {THEMES.map(t => {
              const isSelected = t.id === theme;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 text-left cursor-pointer group border ${
                    isSelected
                      ? 'bg-[#181A22] border-zinc-600 shadow-md ring-1'
                      : 'border-transparent hover:bg-[#16171D] hover:border-zinc-800'
                  }`}
                  style={isSelected ? { borderColor: t.accent } : undefined}
                  role="menuitem"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Live Palette Swatch Orb */}
                    <div
                      className="relative w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 transition-transform group-hover:scale-105"
                      style={{
                        backgroundColor: t.bgHex,
                        borderColor: isSelected ? t.accent : '#27272A'
                      }}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full"
                        style={{
                          backgroundColor: t.accent,
                          boxShadow: `0 0 8px ${t.accent}`
                        }}
                      />
                    </div>

                    {/* Text Details */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="font-sans text-xs font-semibold text-white tracking-wide truncate">
                          {t.name}
                        </p>
                        {isSelected && (
                          <span
                            className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded font-semibold"
                            style={{
                              backgroundColor: `${t.accent}20`,
                              color: t.badge
                            }}
                          >
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-400 font-sans truncate">
                        {t.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Check Indicator */}
                  {isSelected && (
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 ml-2"
                      style={{ backgroundColor: `${t.accent}25` }}
                    >
                      <Check className="w-3 h-3" style={{ color: t.accent }} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="px-3 pt-2.5 pb-1 mt-1 border-t border-[#222228] text-[10px] font-mono text-zinc-500 text-center">
            Instantly themes all controls, borders, and ambient glows
          </div>
        </div>
      )}
    </div>
  );
};
