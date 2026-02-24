import type { ApiResponse } from '@/types/invoice'

export async function processInvoices(files: File[]): Promise<ApiResponse> {
  const formData = new FormData()

  files.forEach((file) => {
    formData.append('data', file)
  })

  const response = await fetch('/api/process-invoice', {
    method: 'POST',
    body: formData,
  })

  const data = await response.json()

  return data as ApiResponse
}
