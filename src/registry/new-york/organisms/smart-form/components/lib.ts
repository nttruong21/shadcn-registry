import { toDate } from 'date-fns'
import type { Accept } from 'react-dropzone'
import type { FieldValues, UseFormReturn } from 'react-hook-form'
import { isValidPhoneNumber } from 'react-phone-number-input'
import z, { type ZodArray, type ZodNullable, type ZodNumber, type ZodPipe, type ZodString, type ZodType } from 'zod'
import type { UploadedFile } from '@/components/molecules/file-upload'
import type { NumberInputProps } from '@/components/molecules/number-input'
import type { DatePickerProps } from '@/components/ui/date-picker'
import type { Option } from '@/types/base'

// [T] Smart form data
export interface SmartFormData {
  code: string
  templates: Array<{
    code: string
    label: string
    description?: string
    className?: string
    fields: Array<{
      code: string
      label: string
      type:
        | 'input'
        | 'textarea'
        | 'number'
        | 'phone-number'
        | 'password'
        | 'select-with-options'
        | 'select-with-query'
        | 'select-with-infinite-query'
        | 'multi-select-with-options'
        | 'multi-select-with-query'
        | 'multi-select-with-infinite-query'
        | 'autocomplete-with-options'
        | 'autocomplete-with-query'
        | 'autocomplete-with-infinite-query'
        | 'date'
        | 'checkbox'
        | 'radio'
        | 'file'
        | 'multi-file'
        | 'editor'
        | 'label'
        | 'slot'
      config?: {
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
        referenceFields?: Array<{
          code: string
          key: string
          message: string
        }>
        // Number
        numberInputProps?: NumberInputProps
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

// [T] Smart form field data
export type SmartFormFieldData = SmartFormData['templates'][number]['fields'][number]

// [T] Smart form field type
export type SmartFormFieldType = SmartFormData['templates'][number]['fields'][number]['type']

// [T] Schema options
export type SchemaOptions<T = FieldValues> = {
  hiddenFields?: Record<string, boolean | undefined>
  slots?: Record<string, z.ZodTypeAny>
  refinement?: (arg: T, ctx: z.core.$RefinementCtx<T>) => void | Promise<void>
}

// [T] Smart form props
export interface SmartFormProps {
  form: UseFormReturn
  formData: SmartFormData
  isUpdateMode?: boolean
  isPending?: boolean
  slots?: Record<string, React.ReactNode | undefined>
  hiddenFields?: Record<string, boolean | undefined>
  disabledFields?: Record<string, boolean | undefined>
  submitButtonText?: string
  actionButtonsClassName?: string
  updateConfirmationDialogSlot?: React.ReactNode
  cancel?: () => void
  validate?: (fieldValues: FieldValues) => boolean | Promise<boolean>
  submit?: (fieldValues: FieldValues) => void | Promise<void>
}

// [C] Default value per field type
export const DEFAULT_VALUE_PER_FIELD_TYPE: Record<SmartFormFieldType, string | number | boolean | null | string[]> = {
  input: '', // string
  textarea: '', // string
  'phone-number': '', // string
  number: '', // string | number
  password: '', // string
  'select-with-options': null, // string | null
  'select-with-query': null, // string | null
  'select-with-infinite-query': null, // string | null
  'multi-select-with-options': [], // string[]
  'multi-select-with-query': [], // string[]
  'multi-select-with-infinite-query': [], // string[]
  'autocomplete-with-options': '', // string
  'autocomplete-with-query': '', // string
  'autocomplete-with-infinite-query': '',
  date: null, // Date | null
  checkbox: false, // boolean
  radio: null, // string | null
  file: null, // File | ApiFile | null
  'multi-file': [], // File[] | ApiFile[]
  editor: '', // string
  label: null,
  slot: null
}

// [U] Get default form value
export const getDefaultFormValue = (formData: SmartFormData, slots?: FieldValues) => {
  const defaultValues: FieldValues = {}
  formData.templates.forEach((template) => {
    template.fields.forEach((field) => {
      // LABEL fields
      if (field.type === 'label') {
        return
      }

      // Other fields
      defaultValues[field.code] = slots?.[field.code] ?? DEFAULT_VALUE_PER_FIELD_TYPE[field.type]
    })
  })
  return defaultValues
}

// [U] Get form schema
export const getFormSchema = (formData: SmartFormData, schemaOptions?: SchemaOptions) => {
  const shape: Record<string, ZodType> = {}

  const passwordConfirmationFields: Array<{
    code: string
    referenceFields: NonNullable<
      NonNullable<SmartFormData['templates'][number]['fields'][number]['config']>['referenceFields']
    >
  }> = []

  formData.templates.forEach((template) => {
    template.fields.forEach((field) => {
      const { code, type, config: { validation, isPasswordConfirmation, referenceFields } = {} } = field

      // Hidden fields
      if (schemaOptions?.hiddenFields?.[code]) return

      // Visible fields
      switch (type) {
        // input | textarea | phone-number | autocomplete | autocomplete-with-infinite-query | editor (string)
        case 'input':
        case 'textarea':
        case 'phone-number':
        case 'autocomplete-with-options':
        case 'autocomplete-with-query':
        case 'autocomplete-with-infinite-query':
        case 'editor': {
          let fieldSchema: ZodString | ZodPipe<ZodType> = z.string().trim()

          if (!validation) {
            shape[code] = fieldSchema
            break
          }

          // Email
          if (validation?.email) {
            fieldSchema = fieldSchema.refine((value) => {
              try {
                if (!validation.required && !value) {
                  return true
                }
                return Boolean(z.email().parse(value))
              } catch {
                return false
              }
            }, validation.email.message)

            shape[code] = fieldSchema
            break
          }

          // Required
          if (validation.required) {
            fieldSchema = fieldSchema.min(1, validation.required.message)
          }

          // Min
          if (validation.min) {
            fieldSchema = fieldSchema.min(validation.min.value as number, validation.min.message)
          }

          // Max
          if (validation.max) {
            fieldSchema = fieldSchema.max(validation.max.value as number, validation.max.message)
          }

          // Regex
          if (validation.regex) {
            const value = validation.regex.value as {
              pattern: string
              flags: string
            }
            fieldSchema = fieldSchema.regex(new RegExp(value.pattern, value.flags), validation.regex.message)
          }

          // Phone
          if (validation.phone) {
            fieldSchema = fieldSchema.refine(
              (value) => (value ? isValidPhoneNumber(value) : true),
              validation.phone.message
            )
          }

          shape[code] = fieldSchema
          break
        }

        // password (string)
        case 'password': {
          let fieldSchema: ZodString | ZodPipe<ZodType> = z.string().trim()

          if (isPasswordConfirmation) {
            if (referenceFields && referenceFields.length > 0) {
              passwordConfirmationFields.push({
                code,
                referenceFields
              })
            }

            shape[code] = fieldSchema
            break
          }

          if (!validation) {
            shape[code] = fieldSchema
            break
          }

          // Required
          if (validation.required) {
            fieldSchema = fieldSchema.min(1, validation.required.message)
          }

          // Min
          if (validation.min) {
            fieldSchema = fieldSchema.min(validation.min.value as number, validation.min.message)
          }

          // Max
          if (validation.max) {
            fieldSchema = fieldSchema.max(validation.max.value as number, validation.max.message)
          }

          // Regex
          if (validation.regex) {
            const value = validation.regex.value as {
              pattern: string
              flags: string
            }
            fieldSchema = fieldSchema.regex(new RegExp(value.pattern, value.flags), validation.regex.message)
          }

          shape[code] = fieldSchema
          break
        }

        // select-with-options | select-with-query | select-with-infinite-query | radio (string)
        case 'select-with-options':
        case 'select-with-query':
        case 'select-with-infinite-query':
        case 'radio': {
          let fieldSchema: ZodNullable<ZodString> | ZodPipe<ZodNullable<ZodString>> = z.string().trim().nullable()

          if (!validation) {
            shape[code] = fieldSchema
            break
          }

          // Required
          if (validation.required) {
            fieldSchema = fieldSchema.refine((value) => value != null, validation.required.message)
          }

          shape[code] = fieldSchema
          break
        }

        // number (string | number)
        case 'number': {
          let fieldSchema: ZodNumber = z.number()

          if (!validation) {
            shape[code] = z.preprocess((value) => (Number.isNaN(Number(value)) ? 0 : Number(value)), fieldSchema)
            break
          }

          // Required
          if (validation.required) {
            fieldSchema = fieldSchema.positive(validation.required.message)
          }

          // Min
          if (validation.min) {
            fieldSchema = fieldSchema.gte(validation.min.value as number, validation.min.message)
          }

          // Max
          if (validation.max) {
            fieldSchema = fieldSchema.lte(validation.max.value as number, validation.max.message)
          }

          shape[code] = z.preprocess((value) => (Number.isNaN(Number(value)) ? 0 : Number(value)), fieldSchema)
          break
        }

        // multi-select-with-options | multi-select-with-query | multi-select-with-infinite-query (string[])
        case 'multi-select-with-options':
        case 'multi-select-with-query':
        case 'multi-select-with-infinite-query': {
          let fieldSchema: ZodArray<ZodString> = z.array(z.string())

          if (!validation) {
            shape[code] = fieldSchema
            break
          }

          // Required
          if (validation.required) {
            fieldSchema = fieldSchema.min(1, validation.required.message)
          }

          shape[code] = fieldSchema
          break
        }

        // date (iso string | Date)
        case 'date': {
          if (!validation) {
            shape[code] = z.codec(z.union([z.iso.datetime(), z.date()]).nullable(), z.iso.datetime().nullable(), {
              decode: (value) => (value ? (typeof value === 'string' ? value : value.toISOString()) : null),
              encode: (value) => (value ? toDate(value) : null)
            })
            break
          }

          // Required
          if (validation.required) {
            shape[code] = z.codec(
              z.union([z.iso.datetime(), z.date()]).nullable(),
              z.iso.datetime().nullable().refine(Boolean, validation.required.message),
              {
                decode: (value) => (value ? (typeof value === 'string' ? value : value.toISOString()) : null),
                encode: (value) => (value ? toDate(value) : null)
              }
            )
            break
          }
          break
        }

        // checkbox (boolean)
        case 'checkbox': {
          shape[code] = z.boolean()
          break
        }

        // file (File | UploadedFile | null)
        case 'file': {
          let fieldSchema: ZodType<File | UploadedFile | null> | ZodPipe<ZodType<File | UploadedFile | null>> =
            z.custom<File | UploadedFile | null>()

          if (!validation) {
            shape[code] = fieldSchema
            break
          }

          // Required
          if (validation.required) {
            fieldSchema = fieldSchema.refine((value) => Boolean(value), validation.required.message)
          }

          shape[code] = fieldSchema
          break
        }

        // multi-file (Array<File | UploadedFile>)
        case 'multi-file': {
          let fieldSchema: ZodArray<ZodType<File | UploadedFile>> | ZodPipe<ZodArray<ZodType<File | UploadedFile>>> =
            z.array(z.custom<File | UploadedFile>())

          if (!validation) {
            shape[code] = fieldSchema
            break
          }

          // Required
          if (validation.required) {
            fieldSchema = fieldSchema.refine((value) => value.length > 0, validation.required.message)
          }

          shape[code] = fieldSchema
          break
        }

        // Slot
        case 'slot': {
          const slotFieldSchema = schemaOptions?.slots?.[code]
          if (slotFieldSchema) {
            shape[code] = slotFieldSchema
          }
          break
        }
      }
    })
  })

  let schema = z.object(shape)

  if (passwordConfirmationFields.length > 0) {
    schema = schema.superRefine((arg, ctx) => {
      passwordConfirmationFields.forEach((passwordConfirmationField) => {
        const { code, referenceFields } = passwordConfirmationField
        const referenceField = referenceFields[0]
        if (arg[code] !== arg[referenceField.code]) {
          ctx.addIssue({
            code: 'custom',
            message: referenceField.message,
            path: [code]
          })
        }
      })
    })
  }

  if (schemaOptions?.refinement) {
    schema = schema.superRefine(schemaOptions.refinement)
  }

  return schema
}
