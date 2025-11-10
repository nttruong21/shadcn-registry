import type { Accept } from 'react-dropzone'
import type { FieldValues, UseFormReturn } from 'react-hook-form'
import type { NumberInputProps } from '@/components/molecules/number-input'
import type { DatePickerProps } from '@/components/ui/date-picker'
import { Spinner } from '@/components/ui/spinner'
import type { Option } from '@/types/base'

// Smart form
export interface FormData {
  code: string
  templates: Array<{
    code: string
    title: string
    description?: string
    className?: string
    fields: Array<{
      code: string
      title: string
      type:
        | 'text'
        | 'textarea'
        | 'number'
        | 'phone-number'
        | 'password'
        | 'select'
        | 'select-with-infinite-query'
        | 'multi-select'
        | 'multi-select-with-infinite-query'
        | 'select-or-text'
        | 'select-or-text-with-infinite-query'
        | 'date'
        | 'checkbox'
        | 'radio'
        | 'file'
        | 'multi-file'
        | 'editor'
        | 'label'
        | 'slot'
      config: {
        validation?: Record<
          string,
          {
            /**
             * @field TEXT | TEXTAREA | PASSWORD | SELECT_OR_TEXT
             * @type required (boolean), min (number), max (number), email (boolean), regex({pattern: string, flags: string}), phone(string[])
             *
             * @field PASSWORD
             * @type required (boolean), min (number), max (number), regex({pattern: string, flags: string})
             *
             * @field SELECT | RADIO
             * @type required (boolean)
             *
             * @field NUMBER
             * @type min (number), max (number), negative (boolean), positive (boolean)
             *
             * @field MULTI_SELECT
             * @type required (boolean)
             *
             * @field DATE
             * @type required (boolean)
             *
             * @field FILE, MULTI_FILES
             * @type required (boolean), max_size (number), mime_types (string[])
             */
            value: boolean | number | { pattern: string; flags: string } | string[]
            message: string
          }
        >
        // Number
        numberInputProps: NumberInputProps
        // Date
        isPreviousDateDisabled?: boolean
        isNextDateDisabled?: boolean
        datePickerProps?: DatePickerProps
        // Select, multi select, select or text
        options?: Option[]
        apiPath?: string
        // File, multi file
        dropzoneOptions?: {
          maxFiles?: number
          maxSize?: number
          accept?: Accept
        }
        // Password
        isPasswordConfirmation?: boolean
      }
      description?: string
      className?: string
    }>
  }>
}

export interface SmartFormProps {
  form: UseFormReturn
  formData: FormData
  isUpdateMode?: boolean
  isPending?: boolean
  slots?: Record<string, React.ReactNode>
  hiddenFields?: string[]
  disabledFields?: string[]
  submitButtonText?: string
  actionButtonsClassName?: string
  updateConfirmationDialogSlot?: React.ReactNode
  onCancel?: () => void
  onValidate?: (fieldValues: FieldValues) => boolean | Promise<boolean>
  onSubmit?: (fieldValues: FieldValues) => void | Promise<void>
}

export const SmartForm = ({
  form
  // formData,
  // isPending,
  // isUpdateMode = false,
  // slots,
  // hiddenFields,
  // disabledFields,
  // submitButtonText,
  // actionButtonsClassName,
  // updateConfirmationDialogSlot,
  // onCancel,
  // onValidate,
  // onSubmit
}: SmartFormProps) => {
  // Template
  if (form.formState.isLoading) {
    return <Spinner className='size-6' />
  }

  return <div></div>
}
