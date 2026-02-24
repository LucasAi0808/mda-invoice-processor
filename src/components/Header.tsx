'use client'

export default function Header() {
  return (
    <header className="relative w-full">
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-transparent pointer-events-none" />

      <div className="relative px-6 pt-10 pb-8 sm:px-8 sm:pt-12 sm:pb-10">
        <div className="max-w-2xl mx-auto">
          {/* Company identifier with geometric accent */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-primary-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
              <span className="w-1 h-1 rounded-full bg-primary-300" />
            </div>
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-neutral-400">
              MDA Consulting AB
            </span>
          </div>

          {/* Main heading with refined typography */}
          <h1 className="text-[2rem] sm:text-[2.5rem] font-semibold tracking-[-0.02em] text-neutral-800 leading-none">
            Invoice Processor
          </h1>

          {/* Subtle descriptor line */}
          <p className="mt-3 text-[15px] text-neutral-400 font-normal">
            Extract and organize invoice data automatically
          </p>
        </div>
      </div>

      {/* Elegant bottom border with gradient fade */}
      <div className="h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
    </header>
  )
}
