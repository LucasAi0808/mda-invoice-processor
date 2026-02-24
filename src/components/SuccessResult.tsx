'use client'

import type { BatchResult } from '@/types/invoice'

interface SuccessResultProps {
  batchResult: BatchResult
  onReset: () => void
}

export default function SuccessResult({ batchResult, onReset }: SuccessResultProps) {
  const sheetUrl = batchResult.results.find(r => r.response.success && 'sheetUrl' in r.response)
  const sheetLink = sheetUrl && sheetUrl.response.success ? sheetUrl.response.sheetUrl : null

  return (
    <div className="w-full max-w-2xl mx-auto px-6 sm:px-8">
      <div className="relative rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-transparent to-transparent pointer-events-none" />

        <div className="relative px-8 py-12 sm:px-12 sm:py-16">
          {/* Success icon */}
          <div className="text-center">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-b from-emerald-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="mt-6 text-xl font-semibold text-neutral-800 tracking-tight">
              {batchResult.succeeded === batchResult.total
                ? `${batchResult.total} Invoice${batchResult.total > 1 ? 's' : ''} Processed`
                : `${batchResult.succeeded} of ${batchResult.total} Processed`
              }
            </h2>
            {batchResult.failed > 0 && (
              <p className="mt-1 text-[14px] text-amber-600">
                {batchResult.failed} failed — see details below
              </p>
            )}
          </div>

          {/* Results list */}
          <div className="mt-8 space-y-2">
            {batchResult.results.map((r, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border ${
                  r.response.success
                    ? 'border-emerald-100 bg-emerald-50/50'
                    : 'border-red-100 bg-red-50/50'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                    r.response.success ? 'bg-emerald-500' : 'bg-red-400'
                  }`}>
                    {r.response.success ? (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </span>
                  <span className="text-[13px] font-medium text-neutral-700 truncate">
                    {r.fileName}
                  </span>
                </div>
                <div className="flex-shrink-0 ml-3">
                  {r.response.success ? (
                    <span className="text-[12px] text-emerald-600">
                      {r.response.data.supplier_name} — {r.response.data.net_amount.toLocaleString()} SEK
                    </span>
                  ) : (
                    <span className="text-[12px] text-red-500">
                      {r.response.code === 'DUPLICATE' ? 'Duplicate' : r.response.error}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Open Sheet button */}
          {sheetLink && (
            <div className="mt-8 text-center">
              <a
                href={sheetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 hover:shadow-elevated transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                  <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                    <path d="M7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7zm4-8h6v2h-6zm0 4h6v2h-6zm0 4h6v2h-6z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-[14px] font-medium text-neutral-700">View in Excel</p>
                  <p className="text-[12px] text-neutral-400">Open spreadsheet in new tab</p>
                </div>
              </a>
            </div>
          )}

          {/* Divider */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-neutral-200" />
            <span className="text-[11px] font-medium tracking-wider uppercase text-neutral-300">or</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-neutral-200" />
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={onReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-medium text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Process More Invoices
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
