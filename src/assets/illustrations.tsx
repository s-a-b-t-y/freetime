import React from 'react';

interface ArtProps {
  className?: string;
  onClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
  showHotspotHint?: boolean;
}

/**
 * Level 02: Seaside Observatory Memory Art
 * Black and white film aesthetic, pier bench, calm mist, twilight horizon
 */
export const MemoryPhotoArt: React.FC<ArtProps> = ({ className = 'w-full h-full' }) => {
  return (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Monochrome archival illustration of a seaside pier bench at twilight"
    >
      <defs>
        <linearGradient id="skyGrad" x1="400" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0D0D11" />
          <stop offset="40%" stopColor="#17181F" />
          <stop offset="75%" stopColor="#252733" />
          <stop offset="100%" stopColor="#3A3C4D" />
        </linearGradient>
        <linearGradient id="waterGrad" x1="400" y1="380" x2="400" y2="600" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#20222B" />
          <stop offset="40%" stopColor="#14151B" />
          <stop offset="100%" stopColor="#0B0B0E" />
        </linearGradient>
        <filter id="grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.08 0" />
          <feComposite in2="SourceGraphic" in="glitch" operator="in" />
        </filter>
      </defs>

      {/* Sky & Horizon */}
      <rect width="800" height="600" fill="#0B0B0E" />
      <rect width="800" height="380" fill="url(#skyGrad)" />
      <line x1="0" y1="380" x2="800" y2="380" stroke="#4A4E63" strokeWidth="1" opacity="0.6" />

      {/* Gentle Distant Coastline Silhouettes */}
      <path
        d="M0 380 Q140 372 260 376 T520 378 Q680 374 800 380 L800 380 L0 380 Z"
        fill="#181922"
        opacity="0.8"
      />

      {/* Calm Water */}
      <rect y="380" width="800" height="220" fill="url(#waterGrad)" />

      {/* Water Light Shimmer Reflections */}
      <ellipse cx="400" cy="410" rx="140" ry="3" fill="#4B4E63" opacity="0.3" />
      <ellipse cx="420" cy="430" rx="90" ry="2" fill="#52556E" opacity="0.25" />
      <ellipse cx="380" cy="450" rx="110" ry="2.5" fill="#5C607A" opacity="0.2" />
      <ellipse cx="440" cy="480" rx="70" ry="2" fill="#4B4E63" opacity="0.25" />
      <ellipse cx="390" cy="520" rx="150" ry="3" fill="#3D4054" opacity="0.2" />

      {/* Wooden Pier Planks */}
      <path d="M120 600 L280 430 L520 430 L680 600 Z" fill="#14151B" stroke="#252733" strokeWidth="1" />
      {/* Planks Horizontal lines */}
      <line x1="260" y1="450" x2="540" y2="450" stroke="#242633" strokeWidth="1.5" />
      <line x1="230" y1="480" x2="570" y2="480" stroke="#242633" strokeWidth="1.5" />
      <line x1="195" y1="520" x2="605" y2="520" stroke="#242633" strokeWidth="1.5" />
      <line x1="155" y1="565" x2="645" y2="565" stroke="#242633" strokeWidth="1.5" />

      {/* Pier Railing */}
      <line x1="280" y1="430" x2="280" y2="395" stroke="#404354" strokeWidth="3" />
      <line x1="520" y1="430" x2="520" y2="395" stroke="#404354" strokeWidth="3" />
      <line x1="280" y1="400" x2="520" y2="400" stroke="#404354" strokeWidth="3" />
      <line x1="280" y1="415" x2="520" y2="415" stroke="#323442" strokeWidth="1.5" />

      {/* The Empty Bench Facing the Sea */}
      {/* Bench Legs */}
      <line x1="360" y1="455" x2="360" y2="485" stroke="#5A5E75" strokeWidth="3" strokeLinecap="round" />
      <line x1="440" y1="455" x2="440" y2="485" stroke="#5A5E75" strokeWidth="3" strokeLinecap="round" />
      <line x1="375" y1="450" x2="375" y2="475" stroke="#424557" strokeWidth="2" />
      <line x1="425" y1="450" x2="425" y2="475" stroke="#424557" strokeWidth="2" />

      {/* Bench Seat Slat */}
      <rect x="345" y="450" width="110" height="7" rx="2" fill="#757991" stroke="#2C2E3B" strokeWidth="1" />
      {/* Bench Backrest Slats */}
      <rect x="345" y="432" width="110" height="5" rx="1.5" fill="#6A6F87" />
      <rect x="345" y="440" width="110" height="5" rx="1.5" fill="#5E637A" />

      {/* Muted warm lamp in the distance */}
      <circle cx="590" cy="370" r="1.5" fill="#FDE68A" />
      <circle cx="590" cy="370" r="14" fill="#FDE68A" opacity="0.08" />

      {/* Subtle Analog Film Stamp Frame */}
      <rect x="18" y="18" width="764" height="564" fill="none" stroke="#2B2D38" strokeWidth="1.5" opacity="0.4" />
      <text x="32" y="42" fill="#71717A" fontSize="11" fontFamily="JetBrains Mono, monospace" letterSpacing="0.1em">
        RECORD REF // 36.6182° N, 121.9018° W
      </text>
      <text x="768" y="42" textAnchor="end" fill="#71717A" fontSize="11" fontFamily="JetBrains Mono, monospace">
        EXPOSURE: DUSK SILENCE
      </text>
    </svg>
  );
};

/**
 * Level 04: The Study Desk Clue Photograph
 * Desk, journal, vintage watch, and the secret brass key with interactive hotspot
 */
export const CluePhotoArt: React.FC<ArtProps> = ({
  className = 'w-full h-full',
  onClick,
  showHotspotHint = false
}) => {
  return (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
      role="img"
      aria-label="Monochrome study desk with antique key and open notebook"
    >
      <defs>
        <radialGradient id="deskLamp" cx="400" cy="250" r="450" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2A2C38" />
          <stop offset="55%" stopColor="#15161C" />
          <stop offset="100%" stopColor="#0B0B0E" />
        </radialGradient>
      </defs>

      {/* Dark Studio Background */}
      <rect width="800" height="600" fill="#0B0B0E" />
      <rect width="800" height="600" fill="url(#deskLamp)" />

      {/* Table Surface with subtle wood grain lines */}
      <line x1="0" y1="180" x2="800" y2="180" stroke="#1F2029" strokeWidth="1" />
      <line x1="0" y1="280" x2="800" y2="280" stroke="#1A1B24" strokeWidth="1" />
      <line x1="0" y1="390" x2="800" y2="390" stroke="#1A1B24" strokeWidth="1" />
      <line x1="0" y1="490" x2="800" y2="490" stroke="#1F2029" strokeWidth="1" />

      {/* Left: Open Linen Journal */}
      <g transform="translate(140, 160) rotate(-6)">
        {/* Shadow */}
        <rect x="12" y="14" width="310" height="230" rx="8" fill="#000000" opacity="0.6" filter="blur(6px)" />
        {/* Cover Spine */}
        <rect x="0" y="0" width="310" height="230" rx="6" fill="#1C1D24" stroke="#343747" strokeWidth="2" />
        {/* Open Pages */}
        <rect x="12" y="10" width="138" height="210" rx="3" fill="#E2DFC8" opacity="0.92" />
        <rect x="158" y="10" width="138" height="210" rx="3" fill="#DAD6C0" opacity="0.9" />
        {/* Spine Crease */}
        <line x1="154" y1="10" x2="154" y2="220" stroke="#999484" strokeWidth="2" />

        {/* Handwritten text lines in notebook */}
        <line x1="28" y1="40" x2="135" y2="40" stroke="#686558" strokeWidth="1.5" strokeDasharray="8 4 14 3" />
        <line x1="28" y1="60" x2="130" y2="60" stroke="#686558" strokeWidth="1.5" strokeDasharray="12 5 10 4" />
        <line x1="28" y1="80" x2="120" y2="80" stroke="#686558" strokeWidth="1.5" strokeDasharray="6 3 16 5" />
        <line x1="28" y1="100" x2="132" y2="100" stroke="#686558" strokeWidth="1.5" strokeDasharray="15 6 9 3" />
        <line x1="28" y1="120" x2="110" y2="120" stroke="#686558" strokeWidth="1.5" strokeDasharray="10 4 12 4" />

        {/* Right page lines */}
        <line x1="172" y1="40" x2="280" y2="40" stroke="#686558" strokeWidth="1.5" strokeDasharray="14 4 10 3" />
        <line x1="172" y1="60" x2="275" y2="60" stroke="#686558" strokeWidth="1.5" strokeDasharray="8 5 15 4" />
        <line x1="172" y1="80" x2="265" y2="80" stroke="#686558" strokeWidth="1.5" strokeDasharray="12 4 12 3" />

        {/* Small sketch diagram on right page */}
        <circle cx="225" cy="140" r="30" fill="none" stroke="#7A7667" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="225" y1="105" x2="225" y2="175" stroke="#7A7667" strokeWidth="1" />
        <line x1="190" y1="140" x2="260" y2="140" stroke="#7A7667" strokeWidth="1" />
      </g>

      {/* Top Right: Vintage Pocket Watch */}
      <g transform="translate(560, 130)">
        <circle cx="50" cy="50" r="44" fill="#0F1014" stroke="#4A4E63" strokeWidth="4" />
        <circle cx="50" cy="50" r="38" fill="#1C1E26" stroke="#2F3240" strokeWidth="1.5" />
        {/* Crown & loop */}
        <rect x="44" y="0" width="12" height="8" rx="2" fill="#5B5F75" />
        <circle cx="50" cy="-6" r="10" fill="none" stroke="#5B5F75" strokeWidth="2.5" />
        {/* Watch Hands pointing to 01:14 */}
        <circle cx="50" cy="50" r="3" fill="#E2E8F0" />
        <line x1="50" y1="50" x2="62" y2="30" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
        <line x1="50" y1="50" x2="70" y2="52" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Fountain Pen resting diagonally */}
      <g transform="translate(480, 240) rotate(32)">
        <rect x="0" y="0" width="14" height="180" rx="7" fill="#1B1C24" stroke="#3D4052" strokeWidth="1" />
        <rect x="0" y="50" width="14" height="6" fill="#C59B27" />
        <path d="M0 180 L7 205 L14 180 Z" fill="#D4AF37" stroke="#8C7320" strokeWidth="1" />
        <line x1="7" y1="180" x2="7" y2="198" stroke="#1A1A1A" strokeWidth="1" />
      </g>

      {/* THE HOTSPOT AREA: Vintage Brass Key resting near the margin */}
      {/* Coordinate is centered around x=544 (68%), y=270 (45%) */}
      <g id="hotspot-area" transform="translate(510, 235) rotate(-15)">
        {/* Key Shadow */}
        <ellipse cx="40" cy="50" rx="35" ry="10" fill="#000000" opacity="0.5" filter="blur(4px)" />

        {/* Antique Brass Key Shape */}
        {/* Key Bow (ring with clover cutout) */}
        <circle cx="20" cy="40" r="18" fill="none" stroke="#D4AF37" strokeWidth="4" />
        <circle cx="20" cy="40" r="8" fill="#1B1C24" stroke="#997C1E" strokeWidth="1.5" />
        {/* Shaft */}
        <rect x="36" y="38" width="55" height="5" rx="1.5" fill="#D4AF37" stroke="#997C1E" strokeWidth="1" />
        {/* Bit / teeth */}
        <rect x="80" y="43" width="5" height="12" fill="#D4AF37" />
        <rect x="72" y="43" width="4" height="9" fill="#D4AF37" />

        {/* Micro Inscription in the margin next to key: "ECHOES" */}
        <text
          x="38"
          y="32"
          fill="#A3852C"
          fontSize="9"
          fontFamily="JetBrains Mono, monospace"
          letterSpacing="0.12em"
          opacity="0.85"
        >
          ECHOES
        </text>

        {/* Subtle pulse ring if hinted */}
        {showHotspotHint && (
          <circle
            cx="45"
            cy="40"
            r="38"
            fill="none"
            stroke="#E11D48"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="animate-spin"
          />
        )}
      </g>

      {/* Glass of Water with refraction */}
      <g transform="translate(100, 390)">
        <path d="M15 15 L22 90 Q40 96 58 90 L65 15 Z" fill="#252834" opacity="0.3" />
        <ellipse cx="40" cy="15" rx="25" ry="6" fill="#4B4F66" opacity="0.4" />
        <ellipse cx="40" cy="70" rx="20" ry="4" fill="#3D4154" opacity="0.5" />
      </g>

      {/* Frame & Technical Stamp */}
      <rect x="18" y="18" width="764" height="564" fill="none" stroke="#2B2D38" strokeWidth="1.5" opacity="0.4" />
      <text x="32" y="42" fill="#71717A" fontSize="11" fontFamily="JetBrains Mono, monospace" letterSpacing="0.1em">
        ARTIFACT IDENT // PHOTO_001 · STUDY ARCHIVE
      </text>
      <text x="768" y="42" textAnchor="end" fill="#71717A" fontSize="11" fontFamily="JetBrains Mono, monospace">
        ZONE: LATENT INSCRIPTION
      </text>
    </svg>
  );
};

/**
 * Level 07 / Final Reveal Art:
 * Two subtle silhouette figures standing together under twilight ocean sky
 */
export const FinalRevealArt: React.FC<ArtProps> = ({ className = 'w-full h-full' }) => {
  return (
    <svg
      viewBox="0 0 1200 675"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Two subtle silhouette figures under the twilight sky at the ocean horizon"
    >
      <defs>
        <linearGradient id="finalSky" x1="600" y1="0" x2="600" y2="480" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#07080B" />
          <stop offset="35%" stopColor="#11131A" />
          <stop offset="70%" stopColor="#211F2E" />
          <stop offset="90%" stopColor="#3F2B3B" />
          <stop offset="100%" stopColor="#6E3D4B" />
        </linearGradient>
        <linearGradient id="finalSea" x1="600" y1="480" x2="600" y2="675" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#241B26" />
          <stop offset="40%" stopColor="#141119" />
          <stop offset="100%" stopColor="#08070A" />
        </linearGradient>
      </defs>

      {/* Sky Canvas */}
      <rect width="1200" height="675" fill="#07080B" />
      <rect width="1200" height="480" fill="url(#finalSky)" />

      {/* Distant Stars in the upper sky */}
      <circle cx="150" cy="80" r="1.2" fill="#FFFFFF" opacity="0.7" />
      <circle cx="280" cy="140" r="1" fill="#FFFFFF" opacity="0.6" />
      <circle cx="420" cy="70" r="1.5" fill="#FFFFFF" opacity="0.9" />
      <circle cx="560" cy="110" r="1" fill="#FFFFFF" opacity="0.5" />
      <circle cx="710" cy="60" r="1.3" fill="#FFFFFF" opacity="0.8" />
      <circle cx="890" cy="120" r="1.1" fill="#FFFFFF" opacity="0.7" />
      <circle cx="1020" cy="90" r="1.4" fill="#FFFFFF" opacity="0.6" />
      <circle cx="340" cy="190" r="0.9" fill="#FFFFFF" opacity="0.4" />
      <circle cx="780" cy="170" r="1" fill="#FFFFFF" opacity="0.5" />

      {/* Ocean Horizon Line */}
      <line x1="0" y1="480" x2="1200" y2="480" stroke="#75485A" strokeWidth="1" opacity="0.5" />
      <rect y="480" width="1200" height="195" fill="url(#finalSea)" />

      {/* Warm Ambient Horizon Glow */}
      <ellipse cx="600" cy="480" rx="360" ry="18" fill="#F472B6" opacity="0.12" />
      <ellipse cx="600" cy="480" rx="180" ry="9" fill="#FDA4AF" opacity="0.18" />

      {/* Gentle Shore Shimmers */}
      <ellipse cx="600" cy="510" rx="200" ry="2.5" fill="#6A4657" opacity="0.3" />
      <ellipse cx="580" cy="540" rx="140" ry="2" fill="#553745" opacity="0.25" />
      <ellipse cx="620" cy="570" rx="220" ry="3" fill="#3A2630" opacity="0.2" />

      {/* Dune Ridge Foreground */}
      <path
        d="M0 675 L0 570 Q300 550 560 555 Q800 540 1200 575 L1200 675 Z"
        fill="#0A0A0E"
      />

      {/* Two Subtle Silhouettes Standing Side by Side */}
      {/* Figure 1 (Left, slightly taller) */}
      <g transform="translate(565, 465)">
        {/* Head */}
        <circle cx="12" cy="10" r="6" fill="#0A0A0E" />
        {/* Shoulders & Torso */}
        <path d="M4 20 Q12 17 20 20 L24 65 Q12 66 0 65 Z" fill="#0A0A0E" />
        {/* Legs */}
        <line x1="6" y1="65" x2="5" y2="92" stroke="#0A0A0E" strokeWidth="4" strokeLinecap="round" />
        <line x1="18" y1="65" x2="19" y2="92" stroke="#0A0A0E" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* Figure 2 (Right, leaning slightly closer) */}
      <g transform="translate(588, 470)">
        {/* Head */}
        <circle cx="11" cy="9" r="5.5" fill="#0A0A0E" />
        {/* Torso & Coat / Dress silhouette */}
        <path d="M3 19 Q11 16 19 19 L23 63 Q11 65 -1 63 Z" fill="#0A0A0E" />
        {/* Legs */}
        <line x1="5" y1="63" x2="4" y2="87" stroke="#0A0A0E" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="16" y1="63" x2="17" y2="87" stroke="#0A0A0E" strokeWidth="3.5" strokeLinecap="round" />
      </g>

      {/* Subtle Archival Frame */}
      <rect x="24" y="24" width="1152" height="627" fill="none" stroke="#3A2633" strokeWidth="1.5" opacity="0.4" />
      <text x="44" y="54" fill="#A1A1AA" fontSize="12" fontFamily="JetBrains Mono, monospace" letterSpacing="0.15em">
        ARCHIVE SEAL // PERMANENT RECORD
      </text>
      <text x="1156" y="54" textAnchor="end" fill="#A1A1AA" fontSize="12" fontFamily="JetBrains Mono, monospace">
        STATUS: PRESERVED IN PERPETUITY
      </text>
    </svg>
  );
};

/**
 * Beautiful Luminous Archive Insignia Logo
 * Intricate celestial diamond star with glowing core, orbits, and Easter Egg tracking
 */
export const ArchiveLogo: React.FC<{
  className?: string;
  onClick?: () => void;
  size?: number;
}> = ({ className = '', onClick, size = 36 }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center focus:outline-none rounded-xl transition-all duration-300 active:scale-90 cursor-pointer ${className}`}
      aria-label="Aeterna Archive Seal Emblem"
      title="Aeterna Seal // Click 5 times for Easter Egg"
    >
      {/* Ambient background glow matching active theme */}
      <span
        className="absolute inset-0 rounded-xl opacity-20 group-hover:opacity-60 transition-opacity blur-md"
        style={{ backgroundColor: 'var(--color-accent)' }}
      />

      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 transition-transform duration-500 group-hover:rotate-45"
      >
        <defs>
          <radialGradient id="logoCoreGlow" cx="20" cy="20" r="14" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.8" />
            <stop offset="60%" stopColor="var(--color-accent)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer talisman tile */}
        <rect
          x="2"
          y="2"
          width="36"
          height="36"
          rx="10"
          fill="var(--color-bg-panel)"
          stroke="var(--color-border)"
          strokeWidth="1.2"
        />

        {/* Soft core glow */}
        <circle cx="20" cy="20" r="10" fill="url(#logoCoreGlow)" />

        {/* Outer Faceted Diamond */}
        <path
          d="M20 6L32 20L20 34L8 20Z"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1.3"
          strokeLinejoin="round"
          className="transition-colors duration-300"
        />

        {/* Inner Diamond Star Rays */}
        <path
          d="M20 9L23 20L20 31L17 20Z"
          fill="var(--color-accent)"
          fillOpacity="0.25"
          stroke="var(--color-accent)"
          strokeWidth="0.8"
        />
        <path
          d="M9 20L20 23L31 20L20 17Z"
          fill="var(--color-accent)"
          fillOpacity="0.25"
          stroke="var(--color-accent)"
          strokeWidth="0.8"
        />

        {/* Delicate Corner Coordinate Ticks */}
        <line x1="20" y1="3" x2="20" y2="5" stroke="var(--color-text-muted)" strokeWidth="1" strokeLinecap="round" />
        <line x1="20" y1="35" x2="20" y2="37" stroke="var(--color-text-muted)" strokeWidth="1" strokeLinecap="round" />
        <line x1="3" y1="20" x2="5" y2="20" stroke="var(--color-text-muted)" strokeWidth="1" strokeLinecap="round" />
        <line x1="35" y1="20" x2="37" y2="20" stroke="var(--color-text-muted)" strokeWidth="1" strokeLinecap="round" />

        {/* Central Luminous Pearl */}
        <circle cx="20" cy="20" r="2.8" fill="var(--color-text-primary)" />
        <circle cx="20" cy="20" r="1.2" fill="var(--color-accent)" />
      </svg>
    </button>
  );
};
