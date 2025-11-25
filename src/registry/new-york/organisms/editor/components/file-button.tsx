import { zodResolver } from '@hookform/resolvers/zod'
import { useCurrentEditor } from '@tiptap/react'
import { CheckCircle, Paperclip } from 'lucide-react'
import { memo, useState } from 'react'
import type { DropzoneOptions } from 'react-dropzone'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import {
  FileUpload,
  FileUploadContent,
  FileUploadInput,
  FileUploadItem,
  getFileUrl,
  type UploadedFile,
  useFileUpload
} from '@/components/molecules/file-upload'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

// [C] File form schema
export const FILE_FORM_SCHEMA = z.object({
  files: z.array(z.custom<File>()).min(1, 'Please select the file')
})

// [C]  Default file form value
export const DEFAULT_FILE_FORM_VALUE: z.input<typeof FILE_FORM_SCHEMA> = {
  files: []
}

// [C]  File uploader dropzone options
export const FILE_UPLOADER_DROPZONE_OPTIONS: DropzoneOptions = {
  maxFiles: 10,
  multiple: true,
  accept: {
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    'application/xml': ['.xml'],
    'application/pdf': ['.pdf']
  }
}

// Component
const FileButton = memo<{
  id: string
}>(({ id }) => {
  // Hooks
  const { editor } = useCurrentEditor()
  const { isUploadFilePending, uploadFile } = useFileUpload()

  // States
  const [isOpenPopover, setIsOpenPopover] = useState(false)

  // Form
  const fileForm = useForm({
    resolver: zodResolver(FILE_FORM_SCHEMA),
    defaultValues: DEFAULT_FILE_FORM_VALUE
  })

  // Methods
  const insertFileNodes = async (fieldValues: z.output<typeof FILE_FORM_SCHEMA>) => {
    try {
      // Upload file
      const uploadedFiles = (await Promise.all(fieldValues.files.map(async (file) => await uploadFile(file)))).filter(
        Boolean
      ) as UploadedFile[]

      // Add file node view
      uploadedFiles.forEach((uploadedFile) => {
        editor
          ?.chain()
          .focus()
          // @ts-expect-error - custom command from FileExtension
          .insertFile({
            url: getFileUrl(uploadedFile.path),
            name: uploadedFile.original,
            mime: uploadedFile.mime,
            size: uploadedFile.compress_info[''].size
          })
          .run()
      })

      // Enter new line
      if (uploadedFiles.length > 0) {
        editor?.commands.enter()
      }

      // Close popover
      setIsOpenPopover(false)
    } catch {
      toast.error('Failure', {
        description: 'An error occurred, please try again'
      })
    }
  }

  // Template
  return (
    <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button size='icon' variant='ghost'>
              <Paperclip />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>

        <TooltipContent>File</TooltipContent>
      </Tooltip>

      <PopoverContent className='w-xs space-y-6' onCloseAutoFocus={() => fileForm.reset()}>
        <div>Acceptable formats: doc, docx, xlsx, xml, pdf</div>

        <FormProvider {...fileForm}>
          <form>
            <Controller
              control={fileForm.control}
              name='files'
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`editor-${id}-image-button-image-form-files`}>Files</FieldLabel>
                  <FileUpload
                    value={field.value}
                    dropzoneOptions={FILE_UPLOADER_DROPZONE_OPTIONS}
                    className='xl:grid-cols-1'
                    onValueChange={field.onChange}
                  >
                    <FileUploadInput
                      id={`editor-${id}-image-button-image-form-files`}
                      aria-invalid={fieldState.invalid}
                    />

                    <FileUploadContent>
                      {field.value.map((value, index) => (
                        <FileUploadItem
                          // biome-ignore lint/suspicious/noArrayIndexKey: ignore
                          key={index}
                          index={index}
                          value={value}
                        />
                      ))}
                    </FileUploadContent>
                  </FileUpload>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </form>
        </FormProvider>

        <div className='flex items-center justify-end gap-1'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size='icon'
                isLoading={isUploadFilePending}
                variant='outline'
                onClick={fileForm.handleSubmit(insertFileNodes)}
              >
                <CheckCircle />
              </Button>
            </TooltipTrigger>
            <TooltipContent>submitButton</TooltipContent>
          </Tooltip>
        </div>
      </PopoverContent>
    </Popover>
  )
})

FileButton.displayName = 'FileButton'
export default FileButton
