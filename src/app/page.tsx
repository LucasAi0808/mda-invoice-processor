'use client'

import Header from '@/components/Header'
import UploadZone from '@/components/UploadZone'
import ProcessingState from '@/components/ProcessingState'
import SuccessResult from '@/components/SuccessResult'
import ErrorResult from '@/components/ErrorResult'
import { useInvoiceProcessor } from '@/hooks/useInvoiceProcessor'

export default function Home() {
  const {
    status,
    files,
    result,
    error,
    statusMessage,
    setFiles,
    process,
    reset,
  } = useInvoiceProcessor()

  return (
    <div className="flex-1 flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col justify-center py-8 sm:py-12">
        {/* Idle or Ready state - show upload zone */}
        {(status === 'idle' || status === 'ready') && (
          <UploadZone
            files={files}
            onFilesChange={setFiles}
            onProcess={process}
            disabled={false}
          />
        )}

        {/* Processing state */}
        {status === 'processing' && (
          <ProcessingState message={statusMessage} />
        )}

        {/* Success state */}
        {status === 'success' && result && (
          <SuccessResult
            sheetUrl={result.sheetUrl}
            onReset={reset}
          />
        )}

        {/* Error state */}
        {status === 'error' && error && (
          <ErrorResult
            error={error.error}
            code={error.code}
            onRetry={reset}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="py-6 text-center">
        <p className="text-[11px] text-neutral-400">
          Powered by n8n automation
        </p>
      </footer>
    </div>
  )
}
