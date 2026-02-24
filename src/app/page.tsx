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
    batchResult,
    statusMessage,
    setFiles,
    process,
    reset,
  } = useInvoiceProcessor()

  return (
    <div className="flex-1 flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col justify-center py-8 sm:py-12">
        {(status === 'idle' || status === 'ready') && (
          <UploadZone
            files={files}
            onFilesChange={setFiles}
            onProcess={process}
            disabled={false}
          />
        )}

        {status === 'processing' && (
          <ProcessingState message={statusMessage} />
        )}

        {status === 'success' && batchResult && (
          <SuccessResult
            batchResult={batchResult}
            onReset={reset}
          />
        )}

        {status === 'error' && (
          <ErrorResult
            error={statusMessage}
            code="PROCESSING_ERROR"
            onRetry={reset}
          />
        )}
      </div>

      <footer className="py-6 text-center">
        <p className="text-[11px] text-neutral-400">
          Powered by n8n automation
        </p>
      </footer>
    </div>
  )
}
