import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { getDefaultFormValue, getFormSchema, SmartForm, type SmartFormData } from '@/components/organisms/smart-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

const FORM_DATA: SmartFormData = {
  code: 'demo',
  templates: [
    {
      code: 'template-1',
      label: 'Template 1',
      fields: [
        {
          code: 'text',
          type: 'text',
          label: 'Text',
          className: 'xl:col-span-4',
          config: {
            validation: {
              required: {
                value: true,
                message: 'Please enter the text'
              }
            }
          }
        },
        {
          code: 'textarea',
          type: 'textarea',
          label: 'Textarea',
          className: 'xl:col-span-4',
          config: {
            validation: {
              required: {
                value: true,
                message: 'Please enter the textarea'
              }
            }
          }
        },
        {
          code: 'number',
          type: 'number',
          label: 'Number',
          className: 'xl:col-span-4',
          config: {
            validation: {
              required: {
                value: true,
                message: 'Please enter the number'
              }
            }
          }
        },
        {
          code: 'phone-number',
          type: 'phone-number',
          label: 'Phone number',
          className: 'xl:col-span-4',
          config: {
            validation: {
              required: {
                value: true,
                message: 'Please enter the phone number'
              },
              phone: {
                value: true,
                message: 'Phone number is invalid'
              }
            }
          }
        },
        {
          code: 'password',
          type: 'password',
          label: 'Password',
          className: 'xl:col-span-4',
          config: {
            validation: {
              required: {
                value: true,
                message: 'Please enter the password'
              }
            }
          }
        },
        {
          code: 'select',
          type: 'select',
          label: 'Select',
          className: 'xl:col-span-4',
          config: {
            validation: {
              required: {
                value: true,
                message: 'Please enter the select'
              }
            },
            options: [
              {
                value: 'next.js',
                label: 'Next.js'
              },
              {
                value: 'sveltekit',
                label: 'SvelteKit'
              },
              {
                value: 'nuxt.js',
                label: 'Nuxt.js'
              },
              {
                value: 'remix',
                label: 'Remix'
              },
              {
                value: 'astro',
                label: 'Astro'
              }
            ]
          }
        },
        {
          code: 'multi-select',
          type: 'multi-select',
          label: 'Multi select',
          className: 'xl:col-span-4',
          config: {
            validation: {
              required: {
                value: true,
                message: 'Please enter the multi select'
              }
            },
            options: [
              {
                value: 'next.js',
                label: 'Next.js'
              },
              {
                value: 'sveltekit',
                label: 'SvelteKit'
              },
              {
                value: 'nuxt.js',
                label: 'Nuxt.js'
              },
              {
                value: 'remix',
                label: 'Remix'
              },
              {
                value: 'astro',
                label: 'Astro'
              }
            ]
          }
        },
        {
          code: 'autocomplete',
          type: 'autocomplete',
          label: 'Autocomplete',
          className: 'xl:col-span-4',
          config: {
            validation: {
              required: {
                value: true,
                message: 'Please enter the autocomplete'
              }
            },
            options: [
              {
                value: 'next.js',
                label: 'Next.js'
              },
              {
                value: 'sveltekit',
                label: 'SvelteKit'
              },
              {
                value: 'nuxt.js',
                label: 'Nuxt.js'
              },
              {
                value: 'remix',
                label: 'Remix'
              },
              {
                value: 'astro',
                label: 'Astro'
              }
            ]
          }
        },
        {
          code: 'date',
          type: 'date',
          label: 'Date',
          className: 'xl:col-span-4',
          config: {
            validation: {
              required: {
                value: true,
                message: 'Please select the date'
              }
            }
          }
        },
        {
          code: 'checkbox',
          type: 'checkbox',
          label: 'Checkbox',
          className: 'xl:col-span-4',
          config: {
            validation: {
              required: {
                value: true,
                message: 'Please select the checkbox'
              }
            }
          }
        }
      ]
    }
  ]
}

const FORM_SCHEMA = getFormSchema(FORM_DATA)

const DEFAULT_FORM_VALUE = getDefaultFormValue(FORM_DATA)

// Component
export const SmartFormDemo = () => {
  // Hooks
  const form = useForm({
    // biome-ignore lint/suspicious/noExplicitAny: ignore
    resolver: zodResolver(FORM_SCHEMA as any),
    defaultValues: DEFAULT_FORM_VALUE
  })

  // Template
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>

      <DialogContent className='w-7xl'>
        <DialogHeader>
          <DialogTitle>Smart form</DialogTitle>
          <DialogDescription>Smart form demo</DialogDescription>
        </DialogHeader>
        <SmartForm form={form} formData={FORM_DATA} />
      </DialogContent>
    </Dialog>
  )
}
