import { zodResolver } from '@hookform/resolvers/zod'
import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { CheckCircle, Copy, ExternalLink, Link, Trash, Unlink } from 'lucide-react'
import React from 'react'
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form'
import z from 'zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/utils/ui'

// [C] Link form schema
const linkFormSchema = z.object({
  url: z
    .string()
    .trim()
    .min(1, JSON.stringify('Please enter the URL'))
    .refine(
      (url) =>
        /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,}\b(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)/gi.test(
          url
        ),
      JSON.stringify('URL is invalid')
    ),
  displayText: z.string().trim(),
  isOpenInNewTab: z.boolean()
})

// [C] Default link form value
const defaultLinkFormValue: z.input<typeof linkFormSchema> = {
  url: '',
  displayText: '',
  isOpenInNewTab: false
} as const

// Component
const LinkButton = React.memo<{
  id: string
}>(({ id }) => {
  // Hooks
  const { editor } = useCurrentEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return { isActive: editor?.isActive('link') }
    }
  })

  // Refs
  const isUpdateModeRef = React.useRef(false)

  // States
  const [isOpenPopover, setIsOpenPopover] = React.useState(false)

  // Form
  const linkForm = useForm({
    resolver: zodResolver(linkFormSchema),
    defaultValues: defaultLinkFormValue
  })

  const linkFormUrl = useWatch({
    control: linkForm.control,
    name: 'url'
  })

  // Methods
  const openLinkInNewTab = () => {
    window.open(linkFormUrl, '_blank', 'noopener,noreferrer')
  }

  const unsetLink = () => {
    editor?.chain().focus().extendMarkRange('link').unsetLink().run()
    linkForm.reset()
    setIsOpenPopover(false)
  }

  const copyLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigator.clipboard.writeText(linkFormUrl)
  }

  const saveLink = (linkFormValue: z.output<typeof linkFormSchema>) => {
    const { url, displayText, isOpenInNewTab } = linkFormValue

    // Add link node view
    let chains = editor
      ?.chain()
      .extendMarkRange('link')
      .insertContent({
        type: 'text',
        text: displayText || url,
        marks: [
          {
            type: 'link',
            attrs: {
              href: url,
              target: isOpenInNewTab ? '_blank' : '_self'
            }
          }
        ]
      })
      .setLink({ href: url })

    if (isUpdateModeRef.current) {
      // Reset is update mode ref
      isUpdateModeRef.current = false
    } else {
      // Enter new line when create new link
      chains = chains?.enter()
    }

    chains?.focus().run()

    // Close popover
    setIsOpenPopover(false)
  }

  const deleteLink = () => {
    editor?.chain().focus().extendMarkRange('link').deleteSelection().run()
  }

  // Template
  return (
    <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              size='icon'
              variant='ghost'
              className={cn({
                'bg-accent text-accent-foreground': editorState?.isActive
              })}
            >
              <Link />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>

        <TooltipContent>Link</TooltipContent>
      </Tooltip>

      <PopoverContent
        className='space-y-4'
        onOpenAutoFocus={() => {
          const isLinkActive = editor?.isActive('link')
          const { href, target } = editor?.getAttributes('link') ?? {}

          if (isLinkActive && href) {
            linkForm.setValue('url', href, {
              shouldValidate: true
            })
            linkForm.setValue('displayText', editor?.view.domAtPos(editor?.state.selection.from).node.textContent ?? '')
            linkForm.setValue('isOpenInNewTab', target === '_blank')
            isUpdateModeRef.current = true
            setIsOpenPopover(true)
          }
        }}
        onCloseAutoFocus={() => linkForm.reset()}
      >
        <FormProvider {...linkForm}>
          <form className='w-xs space-y-6'>
            <Controller
              control={linkForm.control}
              name='url'
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`editor-${id}-link-button-link-form-url`}>URL</FieldLabel>
                  <Input
                    {...field}
                    id={`editor-${id}-link-button-link-form-url`}
                    placeholder={`Enter URL`}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              control={linkForm.control}
              name='displayText'
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`editor-${id}-link-button-link-display-text`}>Display text</FieldLabel>
                  <Input
                    {...field}
                    id={`editor-${id}-link-button-link-display-text`}
                    placeholder={`Enter URL`}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              control={linkForm.control}
              name='isOpenInNewTab'
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} orientation='horizontal'>
                  <Checkbox
                    id={`editor-${id}-link-button-link-is-open-in-new-tab`}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FieldLabel htmlFor={`editor-${id}-link-button-link-is-open-in-new-tab`}>Open in new tab</FieldLabel>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <div className='flex items-center justify-end gap-2'>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size='icon' variant='outline' disabled={!linkFormUrl} onClick={openLinkInNewTab}>
                    <ExternalLink />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Open link in new tab</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size='icon' variant='outline' disabled={!editor?.isActive('link')} onClick={unsetLink}>
                    <Unlink />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Unset</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size='icon' variant='outline' disabled={!linkFormUrl} onClick={copyLink}>
                    <Copy />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size='icon' variant='outline' disabled={!linkFormUrl} onClick={deleteLink}>
                    <Trash />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size='icon' variant='outline' onClick={linkForm.handleSubmit(saveLink)}>
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

LinkButton.displayName = 'LinkButton'
export default LinkButton
