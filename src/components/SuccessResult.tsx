'use client'

import type { BatchResult, ProcessingSuccess } from '@/types/invoice'

interface SuccessResultProps {
  batchResult: BatchResult
  onReset: () => void
}

export default function SuccessResult({ batchResult, onReset }: SuccessResultProps) {
  const successResults = batchResult.results
    .filter((r): r is { fileName: string; response: ProcessingSuccess } => r.response.success)

  const sheetUrl = successResults[0]?.response.sheetUrl || null

  return (
    <div className="w-full max-w-4xl mx-auto px-6 sm:px-8">
      <div className="relative rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-transparent to-transparent pointer-events-none" />

        <div className="relative px-8 py-12 sm:px-12 sm:py-14">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-b from-emerald-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-6 text-xl font-semibold text-neutral-800 tracking-tight">
              {batchResult.succeeded === batchResult.total
                ? `${batchResult.total} faktura${batchResult.total > 1 ? 'or' : ''} bearbetade`
                : `${batchResult.succeeded} av ${batchResult.total} bearbetade`
              }
            </h2>
            {batchResult.failed > 0 && (
              <p className="mt-1 text-[14px] text-amber-600">
                {batchResult.failed} misslyckades — se detaljer nedan
              </p>
            )}
          </div>

          {/* Data table */}
          {successResults.length > 0 && (
            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="py-3 px-3 font-semibold text-neutral-600">Leverantör</th>
                    <th className="py-3 px-3 font-semibold text-neutral-600">Datum</th>
                    <th className="py-3 px-3 font-semibold text-neutral-600">Fakturanr</th>
                    <th className="py-3 px-3 font-semibold text-neutral-600 text-right">Netto</th>
                    <th className="py-3 px-3 font-semibold text-neutral-600 text-right">Netto+10%</th>
                    <th className="py-3 px-3 font-semibold text-neutral-600 text-right">Vecka</th>
                    <th className="py-3 px-3 font-semibold text-neutral-600">Period</th>
                  </tr>
                </thead>
                <tbody>
                  {successResults.map((r, i) => (
                    <tr key={i} className="border-b border-neutral-100 hover:bg-emerald-50/30 transition-colors">
                      <td className="py-3 px-3 text-neutral-800 font-medium">{r.response.data.supplier_name}</td>
                      <td className="py-3 px-3 text-neutral-600">{r.response.data.invoice_date}</td>
                      <td className="py-3 px-3 text-neutral-600">{r.response.data.invoice_number}</td>
                      <td className="py-3 px-3 text-neutral-800 text-right font-mono">{r.response.data.net_amount.toLocaleString('sv-SE')} kr</td>
                      <td className="py-3 px-3 text-neutral-800 text-right font-mono">{r.response.data.net_amount_plus_10.toLocaleString('sv-SE')} kr</td>
                      <td className="py-3 px-3 text-neutral-600 text-right">{r.response.data.week}</td>
                      <td className="py-3 px-3 text-neutral-600">{r.response.data.period}</td>
                    </tr>
                  ))}
                  {/* Totals row */}
                  {successResults.length > 1 && (
                    <tr className="border-t-2 border-neutral-300 bg-neutral-50/50">
                      <td className="py-3 px-3 font-semibold text-neutral-700" colSpan={3}>Totalt ({successResults.length} fakturor)</td>
                      <td className="py-3 px-3 text-neutral-800 text-right font-mono font-semibold">
                        {successResults.reduce((sum, r) => sum + r.response.data.net_amount, 0).toLocaleString('sv-SE')} kr
                      </td>
                      <td className="py-3 px-3 text-neutral-800 text-right font-mono font-semibold">
                        {successResults.reduce((sum, r) => sum + r.response.data.net_amount_plus_10, 0).toLocaleString('sv-SE')} kr
                      </td>
                      <td colSpan={2}></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Failed files */}
          {batchResult.failed > 0 && (
            <div className="mt-6 space-y-2">
              <h3 className="text-[13px] font-semibold text-red-600">Misslyckade filer:</h3>
              {batchResult.results.filter(r => !r.response.success).map((r, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-2 rounded-lg border border-red-100 bg-red-50/50">
                  <span className="w-4 h-4 rounded-full bg-red-400 flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <span className="text-[13px] text-neutral-700">{r.fileName}</span>
                  <span className="text-[12px] text-red-500 ml-auto">{r.response.success ? '' : r.response.error}</span>
                </div>
              ))}
            </div>
          )}

          {/* Open Excel button */}
          {sheetUrl && (
            <div className="mt-8 text-center">
              <a
                href={sheetUrl}
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
                  <p className="text-[14px] font-medium text-neutral-700">Öppna Excel-filen</p>
                  <p className="text-[12px] text-neutral-400">Visa i OneDrive</p>
                </div>
              </a>
            </div>
          )}

          {/* Process more */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-neutral-200" />
            <span className="text-[11px] font-medium tracking-wider uppercase text-neutral-300">eller</span>
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
              Ladda upp fler fakturor
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
