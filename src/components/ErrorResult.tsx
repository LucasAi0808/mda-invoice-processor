'use client'

interface ErrorResultProps {
  error: string
  code?: string
  onRetry: () => void
}

const ERROR_DETAILS: Record<string, { title: string; suggestion: string }> = {
  INVALID_FILE: {
    title: 'Invalid File Format',
    suggestion: 'Please upload a valid PDF file. Other formats are not supported.',
  },
  DUPLICATE: {
    title: 'Duplicate Invoice',
    suggestion: 'This invoice has already been processed. Check your Google Sheet for the existing entry.',
  },
  PARSING_FAILED: {
    title: 'Could Not Read Invoice',
    suggestion: 'The invoice content could not be extracted. Ensure the PDF is not password-protected or corrupted.',
  },
  CONFIG_ERROR: {
    title: 'Configuration Error',
    suggestion: 'There is a server configuration issue. Please contact support.',
  },
  PROCESSING_ERROR: {
    title: 'Processing Failed',
    suggestion: 'Something went wrong while processing. Please try again.',
  },
}

export default function ErrorResult({ error, code, onRetry }: ErrorResultProps) {
  const details = code ? ERROR_DETAILS[code] : null

  return (
    <div className="w-full max-w-2xl mx-auto px-6 sm:px-8">
      <div className="relative rounded-2xl border border-red-100 bg-gradient-to-b from-red-50/30 to-white overflow-hidden">
        {/* Subtle error gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative px-8 py-12 sm:px-12 sm:py-14 text-center">
          {/* Error icon */}
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-b from-red-100 to-red-50 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Error message */}
          <div className="mt-5">
            <h2 className="text-lg font-semibold text-neutral-800 tracking-tight">
              {details?.title || 'Something Went Wrong'}
            </h2>
            <p className="mt-2 text-[14px] text-neutral-500 max-w-sm mx-auto">
              {details?.suggestion || error}
            </p>
          </div>

          {/* Error code badge */}
          {code && (
            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 border border-red-100">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              <span className="text-[11px] font-medium tracking-wide text-red-600 uppercase">
                {code.replace(/_/g, ' ')}
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-b from-neutral-700 to-neutral-800 text-white text-[14px] font-medium shadow-button hover:shadow-elevated hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Try Again
            </button>
          </div>

          {/* Help text */}
          <p className="mt-6 text-[12px] text-neutral-400">
            If this issue persists, please contact support
          </p>
        </div>

        {/* Decorative corner accents - error themed */}
        <div className="absolute top-3 left-3 w-3 h-3 border-l-2 border-t-2 border-red-100 rounded-tl" />
        <div className="absolute top-3 right-3 w-3 h-3 border-r-2 border-t-2 border-red-100 rounded-tr" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-l-2 border-b-2 border-red-100 rounded-bl" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-r-2 border-b-2 border-red-100 rounded-br" />
      </div>
    </div>
  )
}
