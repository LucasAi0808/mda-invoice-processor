import { NextRequest, NextResponse } from 'next/server'

const WEBHOOK_URL = 'https://lucasr08.app.n8n.cloud/webhook/pdf-to-excel'

export async function POST(request: NextRequest) {
  try {
    // Get the form data from the request
    const formData = await request.formData()

    // Forward to n8n webhook
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      body: formData,
    })

    // Get the response data
    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Error processing invoice:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process invoice. Please try again.',
        code: 'PROCESSING_ERROR',
      },
      { status: 500 }
    )
  }
}
