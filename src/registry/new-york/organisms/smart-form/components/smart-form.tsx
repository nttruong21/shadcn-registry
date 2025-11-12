import React from 'react'
import { Controller, type FieldValues, FormProvider } from 'react-hook-form'
import { Autocomplete } from '@/components/molecules/autocomplete'
import {
  FileUpload,
  FileUploadContent,
  FileUploadInput,
  FileUploadItem,
  type FileUploadValue
} from '@/components/molecules/file-upload'
import { MultiSelect } from '@/components/molecules/multi-select'
import { NumberInput } from '@/components/molecules/number-input'
import { PasswordInput } from '@/components/molecules/password-input'
import { PhoneNumberInput } from '@/components/molecules/phone-number-input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Combobox } from '@/components/ui/combobox'
import { DatePicker } from '@/components/ui/date-picker'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/utils/ui'
import type { SmartFormProps } from './lib'

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
          <div key={template.code} className={cn('grid grid-cols-12 gap-x-4 gap-y-6', template.className)}>
            {/* Form template label */}
            <h1 className='col-span-full font-bold text-base'>{template.label}</h1>

            {/* Form template fields */}
            {template.fields.map((field) => {
              // Hidden
              if (hiddenFields?.[field.code]) {
                return null
              }

              const type = field.type
              const className = field.className
              const label = field.label
              // const isRequired = field.config.validation?.['required']
              const isDisabled = disabledFields?.[field.code]

              // LABEL
              if (field.type === 'label') {
                return (
                  <div key={field.code} className={cn('col-span-full', className)}>
                    <span className='font-bold text-base text-muted-foreground'>{label}</span>
                  </div>
                )
              }

              // SLOT
              if (field.type === 'slot') {
                return (
                  <div key={field.code} className={cn('col-span-full', field.className)}>
                    {slots?.[field.code]}
                  </div>
                )
              }

              // Others
              return (
                <Controller
                  key={field.code}
                  control={form.control}
                  name={field.code}
                  render={({ field: formField, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className={cn(
                        'group/field',
                        {
                          'flex-row-reverse': field.type === 'checkbox'
                        },
                        field.className
                      )}
                      orientation={field.type === 'checkbox' ? 'horizontal' : 'vertical'}
                    >
                      <FieldLabel htmlFor={field.code}>{label}</FieldLabel>

                      {(type === 'text' && (
                        <Input
                          {...formField}
                          id={field.code}
                          placeholder={`Enter ${label.toLowerCase()}`}
                          disabled={isDisabled}
                          aria-invalid={fieldState.invalid}
                        />
                      )) ||
                        (type === 'textarea' && (
                          <Textarea
                            {...formField}
                            id={field.code}
                            placeholder={`Enter ${label.toLowerCase()}`}
                            disabled={isDisabled}
                            aria-invalid={fieldState.invalid}
                          />
                        )) ||
                        (type === 'number' && (
                          <NumberInput
                            {...field.config?.numberInputProps}
                            id={field.code}
                            value={formField.value}
                            disabled={isDisabled}
                            placeholder={`Enter ${label.toLowerCase()}`}
                            aria-invalid={fieldState.invalid}
                            onFieldChange={formField.onChange}
                            onValueChange={(event) => formField.onChange(event.value)}
                          />
                        )) ||
                        (type === 'phone-number' && (
                          <PhoneNumberInput
                            {...formField}
                            id={field.code}
                            placeholder={`Enter ${label.toLowerCase()}`}
                            disabled={isDisabled}
                            aria-invalid={fieldState.invalid}
                            onValueChange={formField.onChange}
                          />
                        )) ||
                        (type === 'password' && (
                          <PasswordInput
                            {...formField}
                            id={field.code}
                            placeholder={`Enter ${label.toLowerCase()}`}
                            disabled={isDisabled}
                            aria-invalid={fieldState.invalid}
                          />
                        )) ||
                        (type === 'select' && (
                          <Combobox
                            value={formField.value}
                            options={field.config?.options ?? []}
                            placeholder={`Select ${label.toLowerCase()}`}
                            buttonTriggerProps={{
                              id: field.code
                            }}
                            onValueChange={formField.onChange}
                          />
                        )) ||
                        (type === 'select-with-infinite-query' && (
                          <Combobox
                            value={formField.value}
                            options={field.config?.options ?? []}
                            placeholder={`Select ${label.toLowerCase()}`}
                            buttonTriggerProps={{
                              id: field.code
                            }}
                            onValueChange={formField.onChange}
                          />
                        )) ||
                        (type === 'multi-select' && (
                          <MultiSelect
                            value={formField.value}
                            options={field.config?.options ?? []}
                            placeholder={`Select ${label.toLowerCase()}`}
                            buttonTriggerProps={{
                              id: field.code
                            }}
                            onValueChange={formField.onChange}
                          />
                        )) ||
                        (type === 'multi-select-with-infinite-query' && (
                          <MultiSelect
                            value={formField.value}
                            options={field.config?.options ?? []}
                            placeholder={`Select ${label.toLowerCase()}`}
                            buttonTriggerProps={{
                              id: field.code
                            }}
                            onValueChange={formField.onChange}
                          />
                        )) ||
                        (type === 'autocomplete' && (
                          <Autocomplete
                            value={formField.value}
                            options={field.config?.options ?? []}
                            placeholder={`Enter ${label.toLowerCase()}`}
                            inputProps={{
                              id: field.code,
                              'aria-invalid': fieldState.invalid
                            }}
                            onValueChange={formField.onChange}
                          />
                        )) ||
                        (type === 'autocomplete-with-infinite-query' && (
                          <Autocomplete
                            value={formField.value}
                            options={field.config?.options ?? []}
                            placeholder={`Enter ${label.toLowerCase()}`}
                            inputProps={{
                              id: field.code,
                              'aria-invalid': fieldState.invalid
                            }}
                            onValueChange={formField.onChange}
                          />
                        )) ||
                        (type === 'date' && (
                          <DatePicker
                            id={field.code}
                            value={formField.value}
                            placeholder={`Select ${label.toLowerCase()}`}
                            onValueChange={formField.onChange}
                          />
                        )) ||
                        (type === 'checkbox' && (
                          <Checkbox
                            id={field.code}
                            checked={formField.value}
                            disabled={isDisabled}
                            onCheckedChange={formField.onChange}
                          />
                        )) ||
                        (type === 'radio' && null) ||
                        (type === 'file' && (
                          <FileUpload
                            value={formField.value}
                            dropzoneOptions={field.config?.dropzoneOptions}
                            isDisabled={isDisabled}
                            onValueChange={(files) => formField.onChange(files[0])}
                          >
                            <FileUploadInput />

                            {formField.value && (
                              <FileUploadContent className='flex-1'>
                                <FileUploadItem value={formField.value} index={0} />
                              </FileUploadContent>
                            )}
                          </FileUpload>
                        )) ||
                        (type === 'multi-file' && (
                          <FileUpload
                            value={formField.value}
                            dropzoneOptions={field.config?.dropzoneOptions}
                            isDisabled={isDisabled}
                            onValueChange={formField.onChange}
                          >
                            <FileUploadInput />

                            {formField.value && (
                              <FileUploadContent className='flex-1'>
                                {(formField.value as FileUploadValue).map((value, index) => (
                                  <FileUploadItem
                                    // biome-ignore lint/suspicious/noArrayIndexKey: ignore
                                    key={index}
                                    index={index}
                                    value={value}
                                  />
                                ))}
                              </FileUploadContent>
                            )}
                          </FileUpload>
                        )) ||
                        (type === 'editor' && null) ||
                        'Invalid field.'}

                      {field.description && <FieldDescription>{field.description}</FieldDescription>}

                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              )
            })}
          </div>
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
