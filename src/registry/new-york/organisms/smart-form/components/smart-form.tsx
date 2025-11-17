import React from 'react'
import { type FieldValues, FormProvider } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { FieldDescription, FieldLegend, FieldSet } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/utils/ui'
import AutocompleteWithInfiniteQueryField from './autocomplete-with-infinite-query-field'
import AutocompleteWithOptionsField from './autocomplete-with-options-field'
import AutocompleteWithQueryField from './autocomplete-with-query-field'
import CheckboxField from './checkbox-field'
import DateField from './date-field'
import EditorField from './editor-field'
import type { FieldProps } from './field-container'
import FileField from './file-field'
import InputField from './input-field'
import type { SmartFormFieldType, SmartFormProps } from './lib'
import MultiFileField from './multi-file-field'
import MultiSelectWithInfiniteQueryField from './multi-select-with-infinite-query-field'
import MultiSelectWithOptionsField from './multi-select-with-options-field'
import MultiSelectWithQueryField from './multi-select-with-query-field'
import NumberField from './number-field'
import PasswordField from './password-field'
import PhoneNumberField from './phone-number-field'
import SelectWithInfiniteQueryField from './select-with-infinite-query-field'
import SelectWithOptionsField from './select-with-options-field'
import SelectWithQueryField from './select-with-query-field'
import TextareaField from './textarea-field'

const FIELD_COMPONENTS: Record<SmartFormFieldType, React.FC<FieldProps>> = {
  input: InputField,
  textarea: TextareaField,
  number: NumberField,
  'phone-number': PhoneNumberField,
  password: PasswordField,
  'select-with-options': SelectWithOptionsField,
  'select-with-query': SelectWithQueryField,
  'select-with-infinite-query': SelectWithInfiniteQueryField,
  'multi-select-with-options': MultiSelectWithOptionsField,
  'multi-select-with-query': MultiSelectWithQueryField,
  'multi-select-with-infinite-query': MultiSelectWithInfiniteQueryField,
  'autocomplete-with-options': AutocompleteWithOptionsField,
  'autocomplete-with-query': AutocompleteWithQueryField,
  'autocomplete-with-infinite-query': AutocompleteWithInfiniteQueryField,
  date: DateField,
  checkbox: CheckboxField,
  radio: () => null,
  file: FileField,
  'multi-file': MultiFileField,
  editor: EditorField,
  label: () => null,
  slot: () => null
}

// Smart form
export const SmartForm = ({
  form,
  formData,
  isPending,
  isUpdateMode = false,
  slots,
  hiddenFields,
  disabledFields,
  submitButtonText,
  actionButtonsClassName,
  updateConfirmationDialogSlot,
  cancel,
  validate,
  submit
}: SmartFormProps) => {
  // Refs
  const formValueRef = React.useRef<FieldValues>(() => form.getValues())

  // States
  const [isOpenConfirmationDialog, setIsOpenConfirmationDialog] = React.useState(false)

  // Methods
  const startValidation = async (formValue: FieldValues) => {
    const isValidationPassed = (await validate?.(formValue)) ?? true
    if (!isValidationPassed) return
    formValueRef.current = formValue
    return isUpdateMode ? setIsOpenConfirmationDialog(true) : submit?.(formValue)
  }

  const submitUpdateConfirmationDialog = async () => {
    await submit?.(formValueRef.current)
    if (isUpdateMode) {
      setIsOpenConfirmationDialog(false)
    }
  }

  // Template
  if (form.formState.isLoading) {
    return <Spinner className='size-6' />
  }

  return (
    <FormProvider {...form}>
      {/* Form */}
      <form className='space-y-6' onSubmit={form.handleSubmit(startValidation)}>
        {formData.templates.map((template) => (
          <FieldSet key={template.code} className={cn('grid grid-cols-12 gap-x-4 gap-y-6', template.className)}>
            {/* Form template label */}
            <FieldLegend>{template.label}</FieldLegend>
            {template.description && <FieldDescription>{template.description}</FieldDescription>}

            {/* Form template fields */}
            {template.fields.map((fieldData) => {
              // Hidden
              if (hiddenFields?.[fieldData.code]) {
                return null
              }

              // Label
              if (fieldData.type === 'label') {
                return (
                  <div key={fieldData.code} className={cn('col-span-full', fieldData.className)}>
                    <span className='font-bold text-base text-muted-foreground'>{fieldData.label}</span>
                  </div>
                )
              }

              // Slot
              if (fieldData.type === 'slot') {
                return (
                  <div key={fieldData.code} className={cn('col-span-full', fieldData.className)}>
                    {slots?.[fieldData.code]}
                  </div>
                )
              }

              // Others
              const FieldComponent = FIELD_COMPONENTS[fieldData.type]
              return <FieldComponent key={fieldData.code} fieldData={fieldData} disabledFields={disabledFields} />
            })}
          </FieldSet>
        ))}

        {/* Action buttons */}
        {slots?.Actions === undefined ? (
          <div className={cn('flex flex-col justify-stretch gap-4 xl:flex-row xl:justify-end', actionButtonsClassName)}>
            <Button variant='outline' onClick={cancel}>
              Cancel
            </Button>

            <Button isLoading={isPending || form.formState.isSubmitting} onClick={form.handleSubmit(startValidation)}>
              {submitButtonText ?? 'Submit'}
            </Button>
          </div>
        ) : (
          slots.Actions
        )}
      </form>

      {/* Update confirmation dialog */}
      {isUpdateMode && (
        <Dialog open={isOpenConfirmationDialog} onOpenChange={setIsOpenConfirmationDialog}>
          <DialogContent className='max-w-2xl'>
            <DialogHeader>
              <DialogTitle>Update information</DialogTitle>
              <DialogDescription>Are you sure that you want to save the updated information?</DialogDescription>
            </DialogHeader>

            {updateConfirmationDialogSlot && <main>{updateConfirmationDialogSlot}</main>}

            <DialogFooter className='mt-6'>
              <DialogClose asChild>
                <Button type='button' variant='outline'>
                  Cancel
                </Button>
              </DialogClose>

              <Button isLoading={isPending || form.formState.isSubmitting} onClick={submitUpdateConfirmationDialog}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </FormProvider>
  )
}
