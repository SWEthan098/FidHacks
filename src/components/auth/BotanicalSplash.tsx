export function BotanicalSplash() {
  return (
    <div className="hidden md:flex flex-col justify-between h-full bg-forest relative overflow-hidden p-10 lg:p-14">
      {/* Decorative botanical SVGs */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Bottom-left large leaf cluster */}
        <svg className="absolute bottom-0 left-0 w-72 opacity-20" viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 380 Q60 200 180 100 Q120 250 20 380Z" fill="#DDE3D2"/>
          <path d="M0 350 Q80 180 200 80 Q100 220 0 350Z" fill="#DDE3D2" opacity="0.6"/>
          <path d="M40 400 Q90 250 160 150 Q110 280 40 400Z" fill="#C39B3A" opacity="0.4"/>
        </svg>
        {/* Top-right accent leaves */}
        <svg className="absolute top-0 right-0 w-56 opacity-15" viewBox="0 0 250 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M250 0 Q180 80 240 200 Q200 100 250 0Z" fill="#DDE3D2"/>
          <path d="M230 0 Q170 60 200 180 Q180 80 230 0Z" fill="#C39B3A" opacity="0.6"/>
        </svg>
        {/* Gold decorative line */}
        <svg className="absolute bottom-32 left-1/2 -translate-x-1/2 w-32 opacity-40" viewBox="0 0 120 4" fill="none">
          <line x1="0" y1="2" x2="48" y2="2" stroke="#C39B3A" strokeWidth="1"/>
          <circle cx="60" cy="2" r="3" fill="#C39B3A"/>
          <line x1="72" y1="2" x2="120" y2="2" stroke="#C39B3A" strokeWidth="1"/>
        </svg>
      </div>

      {/* Logo */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          {/* Inline logo mark */}
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="22" cy="22" r="21" stroke="#C39B3A" strokeWidth="1.5"/>
            <path d="M22 8 Q14 16 14 24 Q14 32 22 36 Q30 32 30 24 Q30 16 22 8Z" fill="#DDE3D2" opacity="0.6"/>
            <path d="M18 28 Q20 20 22 14 Q24 20 26 28" stroke="#C39B3A" strokeWidth="1" fill="none"/>
            <circle cx="33" cy="10" r="2" fill="#C39B3A"/>
          </svg>
          <div>
            <p className="font-serif text-2xl text-warm-white font-semibold leading-none">Her Wealth</p>
            <p className="font-sans text-[10px] text-sage tracking-[0.2em] uppercase mt-0.5">Financial Freedom for Every Woman</p>
          </div>
        </div>
      </div>

      {/* Headline */}
      <div className="relative z-10">
        <h1 className="font-serif text-5xl lg:text-6xl text-warm-white leading-tight font-light">
          Your Future.<br />
          <span className="text-muted-gold italic">Your Freedom.</span>
        </h1>
        {/* Decorative divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px w-12 bg-muted-gold/40" />
          <svg width="12" height="12" viewBox="0 0 12 12" fill="#C39B3A"><path d="M6 0l1.5 4.5L12 6l-4.5 1.5L6 12l-1.5-4.5L0 6l4.5-1.5z"/></svg>
          <div className="h-px w-12 bg-muted-gold/40" />
        </div>
        <p className="font-sans text-sm text-sage/80 leading-relaxed uppercase tracking-widest max-w-xs">
          Empowering women to take control of their finances and build the life they deserve.
        </p>
      </div>

      {/* Bottom tagline */}
      <div className="relative z-10">
        <p className="font-serif text-sage/60 text-sm italic">
          Together, let&apos;s build <em className="text-muted-gold not-italic">your</em> tomorrow.
        </p>
      </div>
    </div>
  )
}
