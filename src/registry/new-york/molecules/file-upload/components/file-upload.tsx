import { CloudUpload, FileIcon, XIcon } from 'lucide-react'
import * as React from 'react'
import { type DropzoneOptions, type DropzoneState, type FileRejection, useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/utils/ui'

// File upload
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

export type FileUploadValue = Array<File | UploadedFile>

export type FileUploadProps = {
  value: FileUploadValue
  dropzoneOptions?: DropzoneOptions
  isReplaceOnSelect?: boolean
  isDisabled?: boolean
  onValueChange: (value: FileUploadProps['value']) => void
} & React.HTMLAttributes<HTMLDivElement>

export type FileUploadContext = Pick<FileUploadProps, 'value' | 'onValueChange'> & {
  dropzoneState: DropzoneState
  isDisabled: boolean
}

const FILE_UPLOAD_CONTEXT = React.createContext<FileUploadContext | null>(null)

export const useFileUploadContext = () => {
  const context = React.useContext(FILE_UPLOAD_CONTEXT)
  if (!context) {
    throw new Error('useFileUploadContext must be used within the <FileUpload />')
  }
  return context
}

export const FileUpload = ({
  className,
  dropzoneOptions,
  value,
  isReplaceOnSelect: isReplaceOnSelectProp,
  isDisabled: isDisabledProp,
  children,
  dir,
  onValueChange,
  ...props
}: FileUploadProps) => {
  const { maxFiles = 1, maxSize = 20 * 1024 * 1024, ...restDropzoneOptions } = dropzoneOptions ?? {}
  const isReplaceOnSelect = maxFiles === 1 ? true : isReplaceOnSelectProp
  const multiple = maxFiles > 1
  const isDisabled = Boolean(
    isDisabledProp !== undefined ? isDisabledProp : value.length === maxFiles && !isReplaceOnSelect
  )

  // Dropzone
  const dropzoneState = useDropzone({
    maxFiles,
    maxSize,
    multiple,
    disabled: isDisabled,
    ...restDropzoneOptions,
    onDrop: React.useCallback(
      (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        const newValues = [...value]

        if (isReplaceOnSelect) {
          newValues.splice(0, newValues.length)
        }

        acceptedFiles.forEach((acceptedFile) => {
          if (newValues.length < maxFiles) {
            newValues.push(acceptedFile)
          }
        })

        console.log({ acceptedFiles, rejectedFiles })

        onValueChange(newValues)

        if (rejectedFiles.length > 0) {
          if (
            rejectedFiles.some((rejectedFile) => rejectedFile.errors.some((error) => error.code === 'too-many-files'))
          ) {
            console.log('go here ...')
            toast.warning('The number of files exceeds the allowed number', {
              description: `Only ${maxFiles} files are allowed to be uploaded`
            })
            return
          }

          rejectedFiles.forEach((rejectedFile) => {
            if (rejectedFile.errors[0]?.code === 'file-too-large') {
              toast.warning('File size exceeds the allowed limit', {
                description: `File ${rejectedFile.file.name} (Maximum size is ${Math.round(maxSize / 1024 / 1024).toString()}MB)`
              })
              return
            }

            if (rejectedFile.errors[0]?.code === 'file-invalid-type') {
              const acceptedExtensions = Object.values(dropzoneOptions?.accept ?? {}).reduce<string[]>((acc, cur) => {
                acc.push(...cur.map((extension) => extension))
                return acc
              }, [])

              toast.warning('Unsupported file format', {
                description: `File ${rejectedFile.file.name} (Allowed formats are ${acceptedExtensions.join(', ')})`
              })
              return
            }

            toast.warning('Error', {
              description: 'An error occurred while uploading the file'
            })
          })
        }
      },
      [value, isReplaceOnSelect, maxFiles, maxSize, dropzoneOptions?.accept, onValueChange]
    )
  })

  // Template
  return (
    <FILE_UPLOAD_CONTEXT.Provider
      value={{
        value,
        dropzoneState,
        isDisabled,
        onValueChange
      }}
    >
      <div className={cn('w-full space-y-2', className)} dir={dir} {...props}>
        {children}
      </div>
    </FILE_UPLOAD_CONTEXT.Provider>
  )
}

// File upload input
export type FileUploadInputProps = React.HTMLAttributes<HTMLDivElement>

export const FileUploadInput = ({ className, children, ...restProps }: FileUploadInputProps) => {
  // Hooks
  const { dropzoneState, isDisabled } = useFileUploadContext()
  const dropzoneRootProps = isDisabled ? {} : dropzoneState.getRootProps()

  // Template
  return (
    <div
      {...restProps}
      className={cn(
        'relative w-full rounded hover:bg-accent/40',
        isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-default'
      )}
    >
      <div
        className={cn(`w-full rounded-lg border border-dashed hover:border-solid`, className)}
        {...dropzoneRootProps}
      >
        {children ?? (
          <div className='flex w-full flex-col items-center justify-center gap-4 p-4 text-muted-foreground'>
            <CloudUpload className='size-10' />
            <span className='text-center'>Drag and drop a file here or select a file</span>
          </div>
        )}
      </div>

      <Input
        ref={dropzoneState.inputRef}
        disabled={isDisabled}
        {...dropzoneState.getInputProps()}
        className={cn(isDisabled ? 'cursor-not-allowed' : '')}
      />
    </div>
  )
}

// File upload content
export type FileUploadContentProps = React.HTMLAttributes<HTMLDivElement>

export const FileUploadContent = ({ className, children, ...props }: FileUploadContentProps) => {
  // Hooks
  const { value } = useFileUploadContext()

  // Template
  return value.length ? (
    <div className={cn('max-h-80 space-y-2 overflow-auto', className)} {...props}>
      {children}
    </div>
  ) : null
}

// File uploader item
export type FileUploaderItemProps = React.HTMLAttributes<HTMLDivElement> & {
  value: FileUploadValue[number]
  index: number
}

export const getSizeText = (size: number) => {
  return size < 1024 * 1024 ? `${(size / 1024).toFixed(2)}Kb` : `${(size / 1024 / 1024).toFixed(2)}MB`
}

export const FileUploadItem = ({ value, index, className, children }: FileUploaderItemProps) => {
  // Hooks
  const { value: fileUploadValue, onValueChange } = useFileUploadContext()

  // Memos
  const { name, size } = React.useMemo<{ name: string; size: string }>(() => {
    const size = value instanceof File ? value.size : (value.compress_info?.['']?.size ?? 0)
    const name = value instanceof File ? value.name : value.original
    return {
      name,
      size: getSizeText(size)
    }
  }, [value])

  // Template
  return (
    <div
      className={cn(
        'flex cursor-default items-center justify-between gap-2 overflow-hidden rounded-md border bg-transparent p-2 transition-colors hover:bg-accent/40',
        className
      )}
    >
      {children ?? (
        <div className='flex items-center gap-2 overflow-hidden'>
          <div className='flex size-10 shrink-0 items-center justify-center rounded-full border'>
            <FileIcon className='size-6' />
          </div>

          <div className='space-y-2'>
            <div>{name}</div>
            <div>{size}</div>
          </div>
        </div>
      )}

      <Button
        variant='ghost'
        size='icon'
        onClick={() => {
          const newFileUploadValue = [...fileUploadValue]
          newFileUploadValue.splice(index, 1)
          onValueChange(newFileUploadValue)
        }}
      >
        <XIcon />
      </Button>
    </div>
  )
}
