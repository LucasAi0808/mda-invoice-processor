import type { ApiResponse, BatchResult } from '@/types/invoice'

async function processSingleInvoice(file: File): Promise<ApiResponse> {
  const formData = new FormData()
  formData.append('data', file)

  const response = await fetch('/api/process-invoice', {
    method: 'POST',
    body: formData,
  })

  const data = await response.json()
  return data as ApiResponse
}

export async function processInvoices(files: File[]): Promise<BatchResult> {
  const results: BatchResult['results'] = []

  // Process files sequentially to avoid overwhelming the webhook
  for (const file of files) {
    try {
      const response = await processSingleInvoice(file)
      results.push({ fileName: file.name, response })
    } catch (err) {
      results.push({
        fileName: file.name,
        response: {
          success: false,
          error: err instanceof Error ? err.message : 'Unknown error',
          code: 'PROCESSING_ERROR' as const,
        },
      })
    }
  }

  const succeeded = results.filter((r) => r.response.success).length
  const failed = results.length - succeeded

  return { total: results.length, succeeded, failed, results }
}
