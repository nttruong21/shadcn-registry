import { zodResolver } from '@hookform/resolvers/zod'
import { useCurrentEditor } from '@tiptap/react'
import { CheckCircle, TvMinimalPlay } from 'lucide-react'
import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import z from 'zod'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { CallbackRef, SetExtensions } from './editor'
import { isValidYoutubeUrl, minWidth } from './lib'

// [C] Youtube form schema
const YOUTUBE_FORM_SCHEMA = z.object({
  url: z
    .string()
    .trim()
    .min(1, 'Please enter the URL')
    .refine((value) => isValidYoutubeUrl(value), 'URL is invalid')
})

// [C] Default youtube form value
const DEFAULT_YOUTUBE_FORM_VALUE: z.input<typeof YOUTUBE_FORM_SCHEMA> = {
  url: ''
}

// Component
const YoutubeButton = React.memo<{
  id: string
  callbackRef: CallbackRef
  setExtensions: SetExtensions
}>(({ id, callbackRef, setExtensions }) => {
  // Hooks
  const { editor } = useCurrentEditor()
  const [isPending, startTransition] = React.useTransition()

  // Refs
  const isExtensionLoadedRef = React.useRef(false)

  // States
  const [isOpenPopover, setIsOpenPopover] = React.useState(false)

  // Form
  const youtubeForm = useForm({
    resolver: zodResolver(YOUTUBE_FORM_SCHEMA),
    defaultValues: DEFAULT_YOUTUBE_FORM_VALUE
  })

  // Methods
  const insertYoutubeNode = (fieldValues: z.output<typeof YOUTUBE_FORM_SCHEMA>) => {
    const callback: CallbackRef['current'] = (editor) => {
      editor
        ?.chain()
        .focus()
        .setYoutubeVideo({
          src: fieldValues.url
        })
        .enter()
        .run()
    }

    // Add youtube node view
    if (isExtensionLoadedRef.current) {
      return callback(editor)
    }

    // Load extension
    startTransition(async () => {
      try {
        const { default: CustomYoutubeExtension } = await import('./custom-youtube-extension')

        callbackRef.current = callback

        setExtensions((prev) => [
          ...prev,
          CustomYoutubeExtension.configure({
            nocookie: true,
            width: minWidth,
            height: 180
          })
        ])

        isExtensionLoadedRef.current = true
      } catch (error) {
        console.error('An error occurred when load the CustomYoutube extension', error)
      }
    })

    // Close popover
    setIsOpenPopover(false)
  }

  // Template
  return (
    <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button size='icon' variant='ghost' isLoading={isPending}>
              <TvMinimalPlay />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>

        <TooltipContent>YouTube</TooltipContent>
      </Tooltip>

      <PopoverContent className='w-xs space-y-4' onCloseAutoFocus={() => youtubeForm.reset()}>
        <FormProvider {...youtubeForm}>
          <form className='space-y-6'>
            <Controller
              control={youtubeForm.control}
              name='url'
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`editor-${id}-youtube-button-youtube-form-url`}>URL</FieldLabel>
                  <Input
                    {...field}
                    id={`editor-${id}-youtube-button-youtube-form-url`}
                    placeholder={`Enter URL`}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <div className='flex items-center justify-end gap-1'>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size='icon' variant='outline' onClick={youtubeForm.handleSubmit(insertYoutubeNode)}>
                    <CheckCircle />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Save</TooltipContent>
              </Tooltip>
            </div>
          </form>
        </FormProvider>
      </PopoverContent>
    </Popover>
  )
})

YoutubeButton.displayName = 'YoutubeButton'
export default YoutubeButton
