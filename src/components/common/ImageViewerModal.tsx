import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, MapPin, Calendar, Info, Sparkles } from 'lucide-react';
import { useArchive } from '../../context/ArchiveContext';
import { CluePhotoArt, MemoryPhotoArt, FinalRevealArt } from '../../assets/illustrations';
import { archiveAudio } from '../../utils/audio';

export const ImageViewerModal: React.FC = () => {
  const { selectedViewerImage, closeImageViewer, completeLevel, triggerEasterEgg } = useArchive();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [discoveredClueInViewer, setDiscoveredClueInViewer] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeImageViewer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeImageViewer]);

  if (!selectedViewerImage) return null;

  const { title, date, location, caption, hotspot, isHotspotActive, url } = selectedViewerImage;

  const handleHotspotClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hotspot) {
      archiveAudio.playUnlock();
      setDiscoveredClueInViewer(hotspot.discoveredMessage);
      triggerEasterEgg('hotspot_discovered', 'Hidden margin inscription discovered in Photo 001.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg p-2 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Archival Image Lightbox"
    >
      {/* Top Bar Navigation */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-3 bg-[#121214]/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-[#27272A]">
          <span className="text-xs font-mono uppercase tracking-widest text-rose-400">
            RECORD
          </span>
          <span className="text-xs font-medium text-zinc-300 truncate max-w-[200px] sm:max-w-md">
            {title}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center bg-[#121214]/80 backdrop-blur-md rounded-lg border border-[#27272A] p-1 text-zinc-300">
            <button
              type="button"
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.5))}
              className="p-1.5 hover:text-white hover:bg-[#27272A] rounded transition-colors cursor-pointer"
              title="Zoom In"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.75))}
              className="p-1.5 hover:text-white hover:bg-[#27272A] rounded transition-colors cursor-pointer"
              title="Zoom Out"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel(1)}
              className="p-1.5 hover:text-white hover:bg-[#27272A] rounded transition-colors cursor-pointer"
              title="Reset Zoom"
              aria-label="Reset zoom"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={closeImageViewer}
            className="p-2 bg-[#121214]/80 hover:bg-[#27272A] text-zinc-300 hover:text-white rounded-lg border border-[#27272A] transition-colors cursor-pointer"
            aria-label="Close image viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative w-full max-w-5xl max-h-[75vh] flex items-center justify-center overflow-hidden rounded-lg">
        <div
          className="transition-transform duration-300 relative select-none"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {url ? (
            <img
              src={url}
              alt={title}
              referrerPolicy="no-referrer"
              className="max-h-[70vh] w-auto object-contain rounded border border-[#27272A]"
            />
          ) : title.includes('STUDY') || title.includes('ARTIFACT') ? (
            <div className="w-[85vw] max-w-[780px] h-[55vh] max-h-[580px] relative">
              <CluePhotoArt showHotspotHint={isHotspotActive} />
            </div>
          ) : title.includes('SILHOUETTE') || title.includes('TWILIGHT') ? (
            <div className="w-[85vw] max-w-[840px] h-[55vh] max-h-[500px]">
              <FinalRevealArt />
            </div>
          ) : (
            <div className="w-[85vw] max-w-[780px] h-[55vh] max-h-[580px]">
              <MemoryPhotoArt />
            </div>
          )}

          {/* Interactive Hotspot target overlay if active for Level 04 */}
          {hotspot && (
            <button
              type="button"
              onClick={handleHotspotClick}
              className="absolute z-30 group cursor-pointer focus:outline-none"
              style={{
                left: `${hotspot.x}%`,
                top: `${hotspot.y}%`,
                width: `${hotspot.radius * 2}px`,
                height: `${hotspot.radius * 2}px`,
                transform: 'translate(-50%, -50%)'
              }}
              title="Inspect micro-detail"
              aria-label="Inspect micro-inscription"
            >
              <div className="w-full h-full rounded-full border border-dashed border-rose-500/40 group-hover:border-rose-400 group-hover:bg-rose-500/10 transition-all flex items-center justify-center animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-rose-400 opacity-60 group-hover:opacity-100" />
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Discovered Banner Notification */}
      {discoveredClueInViewer && (
        <div className="absolute top-20 z-40 bg-[#18181B] border border-rose-500/60 p-4 rounded-xl shadow-2xl max-w-md mx-4 animate-fade-in text-center">
          <div className="flex items-center justify-center gap-2 text-rose-400 font-mono text-xs uppercase mb-1">
            <Sparkles className="w-4 h-4" /> Secret Inscription Found
          </div>
          <p className="text-sm text-zinc-100 font-medium mb-3">
            {discoveredClueInViewer}
          </p>
          <button
            type="button"
            onClick={() => {
              setDiscoveredClueInViewer(null);
              closeImageViewer();
            }}
            className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-mono transition-colors cursor-pointer"
          >
            Apply to Record Level 04
          </button>
        </div>
      )}

      {/* Bottom Metadata Ribbon */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#121214]/85 backdrop-blur-md px-4 py-2.5 rounded-lg border border-[#27272A] text-xs font-mono text-zinc-400">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-zinc-300">{date}</span>
          </div>
          <span className="text-zinc-600">·</span>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-zinc-300">{location}</span>
          </div>
        </div>

        {caption && (
          <p className="text-zinc-300 font-sans italic text-center sm:text-right max-w-md">
            “{caption}”
          </p>
        )}
      </div>
    </div>
  );
};
