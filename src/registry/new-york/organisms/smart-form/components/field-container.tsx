import { Controller, type ControllerProps, type FieldPath, type FieldValues, useFormContext } from 'react-hook-form'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { cn } from '@/utils/ui'
import type { SmartFormFieldData, SmartFormProps } from './lib'

export type FieldContainerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues
> = Pick<SmartFormProps, 'disabledFields'> & {
  fieldData: SmartFormFieldData
  children: (
    props: Pick<SmartFormProps, 'disabledFields'> &
      Parameters<ControllerProps<TFieldValues, TName, TTransformedValues>['render']>[0] & {
        fieldData: SmartFormFieldData
      }
  ) => React.ReactNode
}

export type FieldProps = Omit<FieldContainerProps, 'children'>

// Component
const FieldContainer = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues
>({
  fieldData,
  disabledFields,
  children
}: FieldContainerProps<TFieldValues, TName, TTransformedValues>) => {
  // Hooks
  const form = useFormContext<TFieldValues, TName, TTransformedValues>()

  // Template
  return (
    <Controller
      control={form.control}
      name={fieldData.code as TName}
      render={({ field, fieldState, formState }) => {
        return (
          <Field
            data-invalid={fieldState.invalid}
            className={cn(
              'group/field',
              {
                'flex-row-reverse': fieldData.type === 'checkbox'
              },
              fieldData.className
            )}
            orientation={fieldData.type === 'checkbox' ? 'horizontal' : 'vertical'}
          >
            <FieldLabel htmlFor={fieldData.code}>
              {fieldData.label} {fieldData.config?.validation?.required && '*'}
            </FieldLabel>

            {children({
              field,
              fieldState,
              formState,
              fieldData,
              disabledFields
            })}

            {fieldData.description && <FieldDescription>{fieldData.description}</FieldDescription>}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )
      }}
    />
  )
}

export default FieldContainer
