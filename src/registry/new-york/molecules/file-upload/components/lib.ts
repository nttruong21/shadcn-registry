import React from 'react'
import { toast } from 'sonner'

// [T] Uploaded file
export interface UploadedFile {
  id: string
  path: string
  original: string
  mime: string
  compress_info: Record<
    string,
    {
      ext: string
      size: number
    }
  >
}

// [U] Get file
export const getFileUrl = (path: string) => {
  if (path.startsWith('https')) {
    return path
  }
  return `${path}`
}

// [U] Get size text
export const getSizeText = (size: number) => {
  return size < 1024 * 1024 ? `${(size / 1024).toFixed(2)}Kb` : `${(size / 1024 / 1024).toFixed(2)}MB`
}

// [H] Use file upload
export const useFileUpload = (args?: { isThrowError?: boolean }) => {
  // Args
  const { isThrowError = false } = args ?? {}

  // Methods
  const uploadFile = React.useCallback(
    async (file: File): Promise<UploadedFile | null> => {
      try {
        console.log(file)
        // Mutate

        // Extract response and return value
        return null
      } catch {
        if (isThrowError) {
          throw new Error('An error occurred when upload the file')
        }
        toast.error('Failure', {
          description: 'An error occurred when upload the file'
        })
        return null
      }
    },
    [isThrowError]
  )

  return {
    uploadFile,
    isUploadFilePending: false
  }
}
