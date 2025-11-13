import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { getDefaultFormValue, getFormSchema, SmartForm, type SmartFormData } from '@/components/organisms/smart-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogScrollableContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

const FORM_DATA: SmartFormData = {
  code: 'user',
  templates: [
    {
      code: 'personal',
      label: 'Personal',
      fields: [
        {
          code: 'fullName',
          type: 'text',
          label: 'Full name',
          className: 'xl:col-span-4',
          config: {
            validation: {
              required: {
                value: true,
                message: 'Please enter the full name'
              }
            }
          }
        },
        {
          code: 'age',
          type: 'number',
          label: 'Age',
          className: 'xl:col-span-4',
          config: {
            validation: {
              required: {
                value: true,
                message: 'Please enter the age'
              }
            }
          }
        },
        {
          code: 'birthdate',
          type: 'date',
          label: 'Birthdate',
          className: 'xl:col-span-4',
          config: {
            validation: {
              required: {
                value: true,
                message: 'Please select the birthdate'
              }
            }
          }
        },
        {
          code: 'gender',
          type: 'select',
          label: 'Gender',
          className: 'xl:col-span-4',
          config: {
            validation: {
              required: {
                value: true,
                message: 'Please select the gender'
              }
            },
            options: [
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' }
            ]
          }
        },
        {
          code: 'phoneNumber',
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
          code: 'email',
          type: 'text',
          label: 'Email',
          className: 'xl:col-span-4',
          config: {
            validation: {
              required: {
                value: true,
                message: 'Please enter the email'
              },
              email: {
                value: true,
                message: 'Email is invalid'
              }
            }
          }
        },
        {
          code: 'description',
          type: 'textarea',
          label: 'Description',
          className: 'xl:col-span-full',
          config: {
            validation: {
              required: {
                value: true,
                message: 'Please enter the description'
              }
            }
          }
        }
      ]
    },
    {
      code: 'professionalSkills',
      label: 'Professional skills',
      fields: [
        {
          code: 'department',
          type: 'select',
          label: 'Department',
          className: 'xl:col-span-4',
          config: {
            validation: {
              required: {
                value: true,
                message: 'Please select the department'
              }
            },
            options: [
              {
                value: 'front-end',
                label: 'Front-end'
              },
              {
                value: 'back-end',
                label: 'Back-end'
              },
              {
                value: 'ba',
                label: 'BA'
              },
              {
                value: 'qa-qc',
                label: 'QA-QC'
              }
            ]
          }
        },
        {
          code: 'technologies',
          type: 'multi-select',
          label: 'Technologies',
          className: 'xl:col-span-4',
          config: {
            validation: {
              required: {
                value: true,
                message: 'Please select the technologies'
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
          code: 'graduatedUniversity',
          type: 'autocomplete',
          label: 'Graduated university',
          config: {
            validation: {
              required: {
                value: true,
                message: 'Please enter the graduated university'
              }
            },
            options: [
              {
                value: 'TDTU',
                label: 'Ton Duc Thang University'
              },
              {
                value: 'VLU',
                label: 'Van Lang University'
              },
              {
                value: 'UIT',
                label: 'University of information technology'
              }
            ]
          },
          className: 'xl:col-span-4'
        },
        {
          code: 'resumes',
          type: 'multi-file',
          label: 'Resumes',
          className: 'xl:col-span-full',
          config: {
            validation: {
              required: {
                value: true,
                message: 'Please select the file'
              }
            },
            dropzoneOptions: {
              maxFiles: 10
            }
          }
        },
        {
          code: 'deep-knowledge',
          type: 'checkbox',
          label: 'Is has deep knowledge about these techs',
          className: 'xl:col-span-full'
        }
      ]
    },
    {
      code: 'account',
      label: 'Account',
      fields: [
        {
          code: 'username',
          type: 'text',
          label: 'Username',
          className: 'xl:col-span-4',
          config: {
            validation: {
              required: {
                value: true,
                message: 'Please enter the username'
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
          code: 'password-confirmation',
          type: 'password',
          label: 'Password confirmation',
          className: 'xl:col-span-4',
          config: {
            validation: {
              required: {
                value: true,
                message: 'Please enter the password confirmation'
              }
            },
            referenceFields: [
              {
                code: 'password',
                key: 'password-confirmation',
                message: 'Password confirmation does not match with the password'
              }
            ],
            isPasswordConfirmation: true
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
    // @ts-expect-error - type mismatch from zod
    resolver: zodResolver(FORM_SCHEMA),
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

        <DialogScrollableContent>
          <SmartForm form={form} formData={FORM_DATA} />
        </DialogScrollableContent>
      </DialogContent>
    </Dialog>
  )
}
