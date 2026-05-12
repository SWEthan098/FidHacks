/**
 * Scattered botanical accents + sparkles around the auth pages so the cream
 * background feels alive rather than empty. All decorative, pointer-events disabled.
 */
export function AuthDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 select-none">
      {/* === Top-left: fern frond === */}
      <svg
        className="absolute top-6 left-4 md:top-12 md:left-12 opacity-60"
        width="80" height="110" viewBox="0 0 80 110" fill="none"
      >
        <defs>
          <filter id="dec-sketch-1">
            <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="3" seed="2"/>
            <feDisplacementMap in="SourceGraphic" scale="1.4"/>
          </filter>
        </defs>
        <g filter="url(#dec-sketch-1)" stroke="#263D28" strokeWidth="1.2" strokeLinecap="round" fill="none">
          <path d="M 12 102 Q 30 60 56 14"/>
          <path d="M 16 88 Q 8 84 8 76"/>
          <path d="M 16 88 Q 26 84 32 78"/>
          <path d="M 22 72 Q 14 68 14 60"/>
          <path d="M 22 72 Q 32 68 38 62"/>
          <path d="M 30 56 Q 22 52 22 44"/>
          <path d="M 30 56 Q 40 52 46 46"/>
          <path d="M 38 40 Q 30 36 30 28"/>
          <path d="M 38 40 Q 48 36 54 30"/>
          <path d="M 46 24 Q 40 22 42 16"/>
          <path d="M 46 24 Q 54 22 60 18"/>
        </g>
      </svg>

      {/* === Top-right: sparkle cluster === */}
      <svg
        className="absolute top-6 right-4 md:top-14 md:right-14 opacity-80"
        width="110" height="110" viewBox="0 0 110 110" fill="none"
      >
        <path d="M 78 22 L 80 30 L 88 32 L 80 34 L 78 42 L 76 34 L 68 32 L 76 30 Z" fill="#C39B3A" opacity="0.85"/>
        <path d="M 56 50 L 57.5 54.5 L 62 56 L 57.5 57.5 L 56 62 L 54.5 57.5 L 50 56 L 54.5 54.5 Z" fill="#C39B3A" opacity="0.7"/>
        <circle cx="46" cy="28" r="2" fill="#C39B3A" opacity="0.6"/>
        <circle cx="32" cy="62" r="1.6" fill="#C39B3A" opacity="0.5"/>
        <circle cx="90" cy="60" r="1.8" fill="#C39B3A" opacity="0.5"/>
        <path d="M 26 86 L 27 89 L 30 90 L 27 91 L 26 94 L 25 91 L 22 90 L 25 89 Z" fill="#C39B3A" opacity="0.55"/>
      </svg>

      {/* === Bottom-left: 3-leaf sprout === */}
      <svg
        className="absolute bottom-6 left-4 md:bottom-12 md:left-16 opacity-55"
        width="70" height="80" viewBox="0 0 70 80" fill="none"
      >
        <defs>
          <filter id="dec-sketch-2">
            <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="3" seed="4"/>
            <feDisplacementMap in="SourceGraphic" scale="1.5"/>
          </filter>
        </defs>
        <g filter="url(#dec-sketch-2)" stroke="#263D28" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 35 74 Q 35 50 35 22" fill="none"/>
          <path d="M 35 46 Q 14 40 10 22 Q 18 16 30 28 Q 35 38 35 46 Z" fill="#DDE3D2" fillOpacity="0.45"/>
          <path d="M 35 46 Q 56 40 60 22 Q 52 16 40 28 Q 35 38 35 46 Z" fill="#DDE3D2" fillOpacity="0.45"/>
          <path d="M 35 28 Q 24 16 28 6 Q 35 4 42 10 Q 42 20 35 28 Z" fill="#DDE3D2" fillOpacity="0.5"/>
          <path d="M 28 36 Q 22 34 18 30" stroke="#263D28" strokeWidth="0.7" fill="none" opacity="0.5"/>
          <path d="M 42 36 Q 48 34 52 30" stroke="#263D28" strokeWidth="0.7" fill="none" opacity="0.5"/>
        </g>
      </svg>

      {/* === Bottom-right: curved horizontal leaf === */}
      <svg
        className="absolute bottom-6 right-4 md:bottom-14 md:right-14 opacity-55"
        width="100" height="60" viewBox="0 0 100 60" fill="none"
      >
        <defs>
          <filter id="dec-sketch-3">
            <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="3" seed="7"/>
            <feDisplacementMap in="SourceGraphic" scale="1.4"/>
          </filter>
        </defs>
        <g filter="url(#dec-sketch-3)">
          <path
            d="M 10 32 Q 28 8 64 12 Q 86 16 92 30 Q 84 44 56 46 Q 26 46 10 32 Z"
            fill="#DDE3D2" fillOpacity="0.42"
            stroke="#263D28" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
          />
          <path d="M 14 32 Q 38 26 86 28" stroke="#263D28" strokeWidth="0.8" fill="none" opacity="0.55"/>
          <path d="M 30 22 Q 32 28 32 36" stroke="#263D28" strokeWidth="0.6" fill="none" opacity="0.45"/>
          <path d="M 55 18 Q 56 26 56 40" stroke="#263D28" strokeWidth="0.6" fill="none" opacity="0.45"/>
          <path d="M 76 22 Q 76 30 74 40" stroke="#263D28" strokeWidth="0.6" fill="none" opacity="0.45"/>
        </g>
      </svg>

      {/* === Scattered dots === */}
      <span className="absolute top-[18%] left-[8%] w-2 h-2 rounded-full bg-muted-gold/40" />
      <span className="absolute top-[28%] right-[7%] w-1.5 h-1.5 rounded-full bg-muted-gold/45" />
      <span className="absolute top-[60%] left-[6%] w-1.5 h-1.5 rounded-full bg-muted-gold/35" />
      <span className="absolute top-[72%] right-[6%] w-2 h-2 rounded-full bg-muted-gold/40" />
      <span className="absolute top-[42%] left-[4%] w-1 h-1 rounded-full bg-muted-gold/50" />
      <span className="absolute top-[50%] right-[4%] w-1 h-1 rounded-full bg-muted-gold/50" />
      <span className="absolute top-[12%] left-[26%] w-1 h-1 rounded-full bg-muted-gold/35" />
      <span className="absolute top-[88%] right-[24%] w-1 h-1 rounded-full bg-muted-gold/40" />
    </div>
  )
}
