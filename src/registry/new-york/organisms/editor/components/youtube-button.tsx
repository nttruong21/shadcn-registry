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
import { isValidYoutubeUrl } from './custom-youtube-extension'

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
const YoutubeButton = React.memo(() => {
  // Hooks
  const { editor } = useCurrentEditor()

  // States
  const [isOpenPopover, setIsOpenPopover] = React.useState(false)

  // Form
  const youtubeForm = useForm({
    resolver: zodResolver(YOUTUBE_FORM_SCHEMA),
    defaultValues: DEFAULT_YOUTUBE_FORM_VALUE
  })

  // Methods
  const save = (fieldValues: z.output<typeof YOUTUBE_FORM_SCHEMA>) => {
    // Add youtube node view
    editor
      ?.chain()
      .focus()
      .setYoutubeVideo({
        src: fieldValues.url
      })
      .enter()
      .run()

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
                  <FieldLabel htmlFor='editor-youtube-button-youtube-form-url'>URL</FieldLabel>
                  <Input
                    {...field}
                    id='editor-youtube-button-youtube-form-url'
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
                  <Button size='icon' variant='outline' onClick={youtubeForm.handleSubmit(save)}>
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
