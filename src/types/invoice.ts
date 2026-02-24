export interface InvoiceData {
  supplier_name: string;
  invoice_date: string;
  invoice_number: string;
  net_amount: number;
  net_amount_plus_10: number;
  week: number;
  period: string;
}

export interface ProcessingSuccess {
  success: true;
  data: InvoiceData;
  sheetUrl: string;
  message: string;
}

export interface ProcessingError {
  success: false;
  error: string;
  code?: 'INVALID_FILE' | 'DUPLICATE' | 'PARSING_FAILED' | 'PROCESSING_ERROR';
  data?: InvoiceData;
}

export type ApiResponse = ProcessingSuccess | ProcessingError;

// Batch result for multiple files
export interface BatchResult {
  total: number;
  succeeded: number;
  failed: number;
  results: { fileName: string; response: ApiResponse }[];
}

export type ProcessingStatus = 'idle' | 'ready' | 'processing' | 'success' | 'error';

export interface FileWithPreview extends File {
  id: string;
}
