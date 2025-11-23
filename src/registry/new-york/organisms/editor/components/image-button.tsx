import { zodResolver } from '@hookform/resolvers/zod'
import { useCurrentEditor } from '@tiptap/react'
import { CheckCircle, Image } from 'lucide-react'
import React from 'react'
import type { DropzoneOptions } from 'react-dropzone'
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form'
import z from 'zod'
import {
  FileUpload,
  FileUploadContent,
  FileUploadInput,
  FileUploadItem,
  getFileUrl,
  useFileUpload
} from '@/components/molecules/file-upload'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

// [E] Form mode
export enum FormMode {
  Url = 'Url',
  Files = 'Files'
}

// [C] Image form schema
export const IMAGE_FORM_SCHEMA = z
  .object({
    mode: z.enum(FormMode),
    url: z.string().trim(),
    files: z.array(z.custom<File>())
  })
  .superRefine((form, ctx) => {
    const { mode, url, files } = form
    switch (mode) {
      case FormMode.Url: {
        if (!url) {
          ctx.addIssue({
            code: 'custom',
            path: ['url'],
            message: 'Please enter the URL'
          })
          break
        }

        if (!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|webp|svg)/g.test(url)) {
          ctx.addIssue({
            code: 'custom',
            path: ['url'],
            message: 'URL is invalid'
          })
          break
        }

        break
      }
      case FormMode.Files: {
        if (!files.length) {
          ctx.addIssue({
            code: 'custom',
            path: ['files'],
            message: 'Please select the image file'
          })
        }
      }
    }
  })

// [C] Default image form value
export const DEFAULT_IMAGE_FORM_VALUE: z.input<typeof IMAGE_FORM_SCHEMA> = {
  mode: FormMode.Url,
  url: '',
  files: []
}

// [C] File uploader dropzone options
export const FILE_UPLOADER_DROPZONE_OPTIONS: DropzoneOptions = {
  maxFiles: 10,
  multiple: true,
  accept: {
    'image/jpeg': ['.jpeg', '.jpg'],
    'image/png': ['.png'],
    'image/webp': ['.webp'],
    'image/svg+xml': ['.svg']
  }
}

// Component
const ImageButton = React.memo(() => {
  // Hooks
  const { editor } = useCurrentEditor()
  const { isUploadFilePending, uploadFile } = useFileUpload()

  // States
  const [isOpenPopover, setIsOpenPopover] = React.useState(false)

  // Form
  const imageForm = useForm({
    resolver: zodResolver(IMAGE_FORM_SCHEMA),
    defaultValues: DEFAULT_IMAGE_FORM_VALUE
  })

  const formMode = useWatch({
    control: imageForm.control,
    name: 'mode'
  })

  // Methods
  const changeTab = (value: string) => {
    imageForm.setValue('mode', value as FormMode)
  }

  const submit = async (fieldValues: z.output<typeof IMAGE_FORM_SCHEMA>) => {
    const { mode, url, files } = fieldValues

    // Add image node view
    switch (mode) {
      case FormMode.Url: {
        editor?.chain().focus().setImage({ src: url }).enter().run()
        break
      }
      case FormMode.Files: {
        const uploadedFiles = await Promise.all(files.map(async (file) => await uploadFile(file)))
        uploadedFiles.forEach((uploadedFile) => {
          if (!uploadedFile) return

          editor
            ?.chain()
            .focus()
            .setImage({
              src: getFileUrl(uploadedFile.path)
            })
            .enter()
            .run()
        })
        break
      }
    }

    // Close popover
    setIsOpenPopover(false)
  }

  // Template
  return (
    <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button size='icon' variant='ghost'>
              <Image />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>

        <TooltipContent>Image</TooltipContent>
      </Tooltip>

      <PopoverContent className='w-xs space-y-6' onCloseAutoFocus={() => imageForm.reset()}>
        <div>Acceptable formats: jpeg, jpg, png, webp, svg</div>

        <FormProvider {...imageForm}>
          <form>
            <Tabs value={formMode} onValueChange={changeTab}>
              {/* Tabs list */}
              <ScrollArea>
                <TabsList loop className='w-full [&_button]:flex-1'>
                  <TabsTrigger value={FormMode.Url}>URL</TabsTrigger>
                  <TabsTrigger value={FormMode.Files}>File</TabsTrigger>
                </TabsList>
                <ScrollBar orientation='horizontal' />
              </ScrollArea>

              {/* Tabs content */}
              {/* Url tab */}
              <TabsContent value={FormMode.Url}>
                <Controller
                  control={imageForm.control}
                  name='url'
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor='editor-image-button-image-form-url'>URL</FieldLabel>
                      <Input
                        {...field}
                        id='editor-image-button-image-form-url'
                        placeholder={`Enter URL`}
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </TabsContent>

              {/* Files tab */}
              <TabsContent value={FormMode.Files}>
                <Controller
                  control={imageForm.control}
                  name='files'
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor='editor-image-button-image-form-files'>Image files</FieldLabel>
                      <FileUpload
                        value={field.value}
                        dropzoneOptions={FILE_UPLOADER_DROPZONE_OPTIONS}
                        className='xl:grid-cols-1'
                        onValueChange={field.onChange}
                      >
                        <FileUploadInput id='editor-image-button-image-form-files' aria-invalid={fieldState.invalid} />

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
              </TabsContent>
            </Tabs>
          </form>
        </FormProvider>

        <div className='flex items-center justify-end gap-1'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size='icon'
                variant='outline'
                isLoading={isUploadFilePending}
                onClick={imageForm.handleSubmit(submit)}
              >
                <CheckCircle />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Save</TooltipContent>
          </Tooltip>
        </div>
      </PopoverContent>
    </Popover>
  )
})

ImageButton.displayName = 'ImageButton'
export default ImageButton
