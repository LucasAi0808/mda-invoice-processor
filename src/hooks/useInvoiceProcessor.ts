'use client'

import { useState, useCallback } from 'react'
import type { ProcessingStatus, BatchResult } from '@/types/invoice'
import { processInvoices } from '@/lib/api'

interface UseInvoiceProcessorReturn {
  status: ProcessingStatus
  files: File[]
  batchResult: BatchResult | null
  statusMessage: string
  addFiles: (files: File[]) => void
  setFiles: (files: File[]) => void
  removeFile: (index: number) => void
  process: () => Promise<void>
  reset: () => void
}

export function useInvoiceProcessor(): UseInvoiceProcessorReturn {
  const [status, setStatus] = useState<ProcessingStatus>('idle')
  const [files, setFilesState] = useState<File[]>([])
  const [batchResult, setBatchResult] = useState<BatchResult | null>(null)
  const [statusMessage, setStatusMessage] = useState('')

  const addFiles = useCallback((newFiles: File[]) => {
    setFilesState((prev) => [...prev, ...newFiles])
    setStatus('ready')
  }, [])

  const setFiles = useCallback((newFiles: File[]) => {
    setFilesState(newFiles)
    setStatus(newFiles.length > 0 ? 'ready' : 'idle')
  }, [])

  const removeFile = useCallback((index: number) => {
    setFilesState((prev) => {
      const newFiles = prev.filter((_, i) => i !== index)
      if (newFiles.length === 0) setStatus('idle')
      return newFiles
    })
  }, [])

  const process = useCallback(async () => {
    if (files.length === 0) return

    setStatus('processing')
    setBatchResult(null)
    setStatusMessage(`Processing 0/${files.length} invoices...`)

    try {
      const result = await processInvoices(files)
      setBatchResult(result)

      if (result.failed === 0) {
        setStatus('success')
        setStatusMessage(`${result.succeeded}/${result.total} invoices processed successfully`)
      } else if (result.succeeded > 0) {
        setStatus('success')
        setStatusMessage(`${result.succeeded} succeeded, ${result.failed} failed`)
      } else {
        setStatus('error')
        setStatusMessage(`All ${result.total} invoices failed`)
      }
    } catch (err) {
      setStatus('error')
      setStatusMessage(err instanceof Error ? err.message : 'An unexpected error occurred')
    }
  }, [files])

  const reset = useCallback(() => {
    setStatus('idle')
    setFilesState([])
    setBatchResult(null)
    setStatusMessage('')
  }, [])

  return {
    status,
    files,
    batchResult,
    statusMessage,
    addFiles,
    setFiles,
    removeFile,
    process,
    reset,
  }
}
