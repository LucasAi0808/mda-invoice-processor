'use client'

interface SuccessResultProps {
  sheetUrl: string
  onReset: () => void
}

export default function SuccessResult({ sheetUrl, onReset }: SuccessResultProps) {
  return (
    <div className="w-full max-w-2xl mx-auto px-6 sm:px-8">
      <div className="relative rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/50 to-white overflow-hidden">
        {/* Subtle success gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-transparent to-transparent pointer-events-none" />

        <div className="relative px-8 py-12 sm:px-12 sm:py-16 text-center">
          {/* Success icon */}
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-b from-emerald-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Success message */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-neutral-800 tracking-tight">
              Invoice Processed
            </h2>
            <p className="mt-2 text-[14px] text-neutral-500">
              Your invoice data has been extracted and saved
            </p>
          </div>

          {/* Primary CTA - Google Sheets */}
          <div className="mt-8">
            <a
              href={sheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 hover:shadow-elevated transition-all duration-200"
            >
              {/* Google Sheets icon */}
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                  <path d="M7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7zm4-8h6v2h-6zm0 4h6v2h-6zm0 4h6v2h-6z"/>
                </svg>
              </div>
              <div className="text-left">
                <p className="text-[14px] font-medium text-neutral-700">
                  View in Google Sheets
                </p>
                <p className="text-[12px] text-neutral-400">
                  Open spreadsheet in new tab
                </p>
              </div>
              <svg
                className="w-4 h-4 text-neutral-300 group-hover:text-neutral-400 group-hover:translate-x-0.5 transition-all"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>

          {/* Divider */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-neutral-200" />
            <span className="text-[11px] font-medium tracking-wider uppercase text-neutral-300">
              or
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-neutral-200" />
          </div>

          {/* Secondary action */}
          <button
            onClick={onReset}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-medium text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Process Another Invoice
          </button>
        </div>

        {/* Decorative corner accents - success themed */}
        <div className="absolute top-3 left-3 w-3 h-3 border-l-2 border-t-2 border-emerald-200/60 rounded-tl" />
        <div className="absolute top-3 right-3 w-3 h-3 border-r-2 border-t-2 border-emerald-200/60 rounded-tr" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-l-2 border-b-2 border-emerald-200/60 rounded-bl" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-r-2 border-b-2 border-emerald-200/60 rounded-br" />
      </div>
    </div>
  )
}
