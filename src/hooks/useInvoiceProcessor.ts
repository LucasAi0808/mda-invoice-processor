'use client'

import { useState, useCallback } from 'react'
import type { ProcessingStatus, ApiResponse, ProcessingSuccess, ProcessingError } from '@/types/invoice'
import { processInvoices } from '@/lib/api'

interface UseInvoiceProcessorReturn {
  status: ProcessingStatus
  files: File[]
  result: ProcessingSuccess | null
  error: ProcessingError | null
  statusMessage: string
  addFiles: (files: File[]) => void
  setFiles: (files: File[]) => void
  removeFile: (index: number) => void
  process: () => Promise<void>
  reset: () => void
}

const STATUS_MESSAGES: Record<ProcessingStatus, string> = {
  idle: '',
  ready: '',
  processing: 'Processing invoices...',
  success: 'Complete',
  error: 'Error',
}

export function useInvoiceProcessor(): UseInvoiceProcessorReturn {
  const [status, setStatus] = useState<ProcessingStatus>('idle')
  const [files, setFilesState] = useState<File[]>([])
  const [result, setResult] = useState<ProcessingSuccess | null>(null)
  const [error, setError] = useState<ProcessingError | null>(null)
  const [statusMessage, setStatusMessage] = useState('')

  const addFiles = useCallback((newFiles: File[]) => {
    setFilesState((prev) => [...prev, ...newFiles])
    setStatus('ready')
    setError(null)
  }, [])

  const setFiles = useCallback((newFiles: File[]) => {
    setFilesState(newFiles)
    setStatus(newFiles.length > 0 ? 'ready' : 'idle')
    setError(null)
  }, [])

  const removeFile = useCallback((index: number) => {
    setFilesState((prev) => {
      const newFiles = prev.filter((_, i) => i !== index)
      if (newFiles.length === 0) {
        setStatus('idle')
      }
      return newFiles
    })
  }, [])

  const process = useCallback(async () => {
    if (files.length === 0) return

    setStatus('processing')
    setStatusMessage('Uploading files...')
    setError(null)
    setResult(null)

    try {
      // Simulate upload progress messaging
      await new Promise((resolve) => setTimeout(resolve, 500))
      setStatusMessage('Extracting invoice data...')

      const response = await processInvoices(files)

      await new Promise((resolve) => setTimeout(resolve, 300))
      setStatusMessage('Saving to spreadsheet...')

      await new Promise((resolve) => setTimeout(resolve, 200))

      if (response.success) {
        setResult(response)
        setStatus('success')
        setStatusMessage('Complete')
      } else {
        setError(response)
        setStatus('error')
        setStatusMessage('Error')
      }
    } catch (err) {
      const errorResponse: ProcessingError = {
        success: false,
        error: err instanceof Error ? err.message : 'An unexpected error occurred',
        code: undefined,
      }
      setError(errorResponse)
      setStatus('error')
      setStatusMessage('Error')
    }
  }, [files])

  const reset = useCallback(() => {
    setStatus('idle')
    setFilesState([])
    setResult(null)
    setError(null)
    setStatusMessage('')
  }, [])

  return {
    status,
    files,
    result,
    error,
    statusMessage,
    addFiles,
    setFiles,
    removeFile,
    process,
    reset,
  }
}
