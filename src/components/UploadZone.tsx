'use client'

import { useCallback, useRef, useState } from 'react'

interface UploadZoneProps {
  files: File[]
  onFilesChange: (files: File[]) => void
  onProcess: () => void
  disabled?: boolean
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function UploadZone({
  files,
  onFilesChange,
  onProcess,
  disabled = false,
}: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const validateAndAddFiles = useCallback(
    (newFiles: FileList | File[]) => {
      setError(null)
      const validFiles: File[] = []
      const fileArray = Array.from(newFiles)

      for (const file of fileArray) {
        if (file.type !== 'application/pdf') {
          setError('Only PDF files are accepted')
          continue
        }
        if (file.size > MAX_FILE_SIZE) {
          setError(`File "${file.name}" exceeds 10MB limit`)
          continue
        }
        // Check for duplicates
        const isDuplicate = files.some(
          (f) => f.name === file.name && f.size === file.size
        )
        if (!isDuplicate) {
          validFiles.push(file)
        }
      }

      if (validFiles.length > 0) {
        onFilesChange([...files, ...validFiles])
      }
    },
    [files, onFilesChange]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragOver(false)

      if (disabled) return
      validateAndAddFiles(e.dataTransfer.files)
    },
    [disabled, validateAndAddFiles]
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        validateAndAddFiles(e.target.files)
      }
      // Reset input so same file can be selected again
      e.target.value = ''
    },
    [validateAndAddFiles]
  )

  const removeFile = useCallback(
    (index: number) => {
      const newFiles = files.filter((_, i) => i !== index)
      onFilesChange(newFiles)
      setError(null)
    },
    [files, onFilesChange]
  )

  const handleZoneClick = () => {
    if (!disabled) {
      inputRef.current?.click()
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-6 sm:px-8">
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        multiple
        onChange={handleFileInput}
        className="hidden"
        disabled={disabled}
      />

      {/* Drop zone */}
      <div
        onClick={handleZoneClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative group cursor-pointer
          rounded-2xl border-2 border-dashed
          transition-all duration-300 ease-out
          ${
            isDragOver
              ? 'border-primary-500 bg-primary-50/50 scale-[1.01]'
              : 'border-neutral-200 hover:border-neutral-300 bg-white/50'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {/* Inner content */}
        <div className="px-8 py-12 sm:px-12 sm:py-16 text-center">
          {/* Upload icon */}
          <div
            className={`
              mx-auto w-14 h-14 rounded-xl
              flex items-center justify-center
              transition-all duration-300
              ${
                isDragOver
                  ? 'bg-primary-100 text-primary-600'
                  : 'bg-neutral-100 text-neutral-400 group-hover:bg-neutral-200/70 group-hover:text-neutral-500'
              }
            `}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>

          {/* Text */}
          <div className="mt-5">
            <p className="text-[15px] font-medium text-neutral-700">
              {isDragOver ? 'Drop files here' : 'Drop PDF invoices here'}
            </p>
            <p className="mt-1.5 text-[13px] text-neutral-400">
              or{' '}
              <span className="text-primary-600 hover:text-primary-700 font-medium">
                browse files
              </span>{' '}
              from your computer
            </p>
          </div>

          {/* File constraints */}
          <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-neutral-400 tracking-wide">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-neutral-300" />
              PDF only
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-neutral-300" />
              Max 10MB
            </span>
          </div>
        </div>

        {/* Decorative corner accents */}
        <div className="absolute top-3 left-3 w-3 h-3 border-l-2 border-t-2 border-neutral-200/60 rounded-tl" />
        <div className="absolute top-3 right-3 w-3 h-3 border-r-2 border-t-2 border-neutral-200/60 rounded-tr" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-l-2 border-b-2 border-neutral-200/60 rounded-bl" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-r-2 border-b-2 border-neutral-200/60 rounded-br" />
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-4 px-4 py-3 rounded-xl bg-red-50/80 border border-red-100">
          <p className="text-[13px] text-red-600 text-center">{error}</p>
        </div>
      )}

      {/* File list */}
      {files.length > 0 && (
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between px-1">
            <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-neutral-400">
              {files.length} {files.length === 1 ? 'file' : 'files'} selected
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onFilesChange([])
                setError(null)
              }}
              className="text-[11px] text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              Clear all
            </button>
          </div>

          <div className="space-y-1.5 max-h-48 overflow-y-auto custom-scrollbar">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${file.size}-${index}`}
                className="group/item flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-neutral-100 hover:border-neutral-200 transition-colors"
              >
                {/* PDF icon */}
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                {/* File info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-neutral-700 truncate">
                    {file.name}
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    {formatFileSize(file.size)}
                  </p>
                </div>

                {/* Remove button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(index)
                  }}
                  className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-neutral-300 hover:text-neutral-500 hover:bg-neutral-100 opacity-0 group-hover/item:opacity-100 transition-all"
                  aria-label={`Remove ${file.name}`}
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Process button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onProcess()
            }}
            disabled={disabled}
            className={`
              w-full mt-4 px-6 py-3.5
              rounded-xl font-medium text-[14px]
              transition-all duration-200
              ${
                disabled
                  ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                  : 'bg-gradient-to-b from-primary-500 to-primary-600 text-white shadow-button hover:shadow-elevated hover:-translate-y-0.5 active:translate-y-0'
              }
            `}
          >
            Process {files.length} {files.length === 1 ? 'Invoice' : 'Invoices'}
          </button>
        </div>
      )}
    </div>
  )
}
