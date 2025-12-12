import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

export enum SmartFilterLogicalOperation {
  And = ',',
  Or = '|'
}

export enum SmartFilterOperation {
  EqualsTo = 'equalsTo',
  DoesNotEqualTo = 'doesNotEqualTo',
  Contains = 'contains',
  IsLessThan = 'isLessThan',
  IsLessThanOrEqualTo = 'isLessThanOrEqualTo',
  IsGreaterThan = 'isGreaterThan',
  IsGreaterThanOrEqualTo = 'isGreaterThanOrEqualTo',
  IsBetween = 'isBetween',
  HasAnyOf = 'hasAnyOf',
  HasAllOf = 'hasAllOf'
}

export enum SmartFilterType {
  Text = 'text',
  Number = 'number',
  Date = 'date',
  Select = 'select',
  SelectWithInfiniteQuery = 'select-with-infinite-query',
  MultiSelect = 'multi-select'
}

export enum SmartFilterApiOperation {
  Equal = '==',
  NotEqual = '!=',
  LessThan = '<',
  GreaterThan = '>',
  LessThanOrEqual = '<=',
  GreaterThanOrEqual = '>=',
  Contain = '@=',
  StartWith = '_=',
  NotStartWith = '!_=',
  CaseInsensitiveStringContain = '@=*',
  CaseInsensitiveStringNotContain = '!@=*',
  CaseInsensitiveStartWith = '_=*',
  CaseInsensitiveNotStartWith = '!_=*',
  CaseInsensitiveEqual = '==*',
  CaseInsensitiveNotEqual = '!=*',
  EqualArray = '[]'
}

export const operationsPerType: Record<SmartFilterType, SmartFilterOperation[]> = {
  [SmartFilterType.Text]: [
    SmartFilterOperation.EqualsTo,
    SmartFilterOperation.DoesNotEqualTo,
    SmartFilterOperation.Contains
  ],
  [SmartFilterType.Number]: [
    SmartFilterOperation.EqualsTo,
    SmartFilterOperation.DoesNotEqualTo,
    SmartFilterOperation.IsLessThan,
    SmartFilterOperation.IsLessThanOrEqualTo,
    SmartFilterOperation.IsGreaterThan,
    SmartFilterOperation.IsGreaterThanOrEqualTo,
    SmartFilterOperation.IsBetween
  ],
  [SmartFilterType.Date]: [
    SmartFilterOperation.EqualsTo,
    SmartFilterOperation.IsLessThan,
    SmartFilterOperation.IsLessThanOrEqualTo,
    SmartFilterOperation.IsGreaterThan,
    SmartFilterOperation.IsGreaterThanOrEqualTo,
    SmartFilterOperation.IsBetween
  ],
  [SmartFilterType.Select]: [
    SmartFilterOperation.EqualsTo,
    SmartFilterOperation.DoesNotEqualTo,
    SmartFilterOperation.HasAnyOf
  ],
  [SmartFilterType.SelectWithInfiniteQuery]: [
    SmartFilterOperation.EqualsTo,
    SmartFilterOperation.DoesNotEqualTo,
    SmartFilterOperation.HasAnyOf
  ],
  [SmartFilterType.MultiSelect]: [SmartFilterOperation.HasAnyOf, SmartFilterOperation.HasAllOf]
} as const

export const defaultStringValue = {
  default: '',
  additional: {
    from: '',
    to: ''
  }
} as const

export const defaultStringArrayValue = {
  default: '',
  additional: {
    from: '',
    to: ''
  }
} as const

export const defaultValuePerOperation: Record<SmartFilterOperation, SmartFilterFormOutput['filters'][number]['value']> =
  {
    [SmartFilterOperation.EqualsTo]: defaultStringValue,
    [SmartFilterOperation.DoesNotEqualTo]: defaultStringValue,
    [SmartFilterOperation.IsLessThan]: defaultStringValue,
    [SmartFilterOperation.IsLessThanOrEqualTo]: defaultStringValue,
    [SmartFilterOperation.IsGreaterThan]: defaultStringValue,
    [SmartFilterOperation.IsGreaterThanOrEqualTo]: defaultStringValue,
    [SmartFilterOperation.Contains]: defaultStringValue,
    [SmartFilterOperation.IsBetween]: defaultStringValue,
    [SmartFilterOperation.HasAnyOf]: defaultStringArrayValue,
    [SmartFilterOperation.HasAllOf]: defaultStringArrayValue
  } as const

export const apiOperationPerOperation: Partial<Record<SmartFilterOperation, SmartFilterApiOperation>> = {
  [SmartFilterOperation.EqualsTo]: SmartFilterApiOperation.Equal,
  [SmartFilterOperation.DoesNotEqualTo]: SmartFilterApiOperation.NotEqual,
  [SmartFilterOperation.IsLessThan]: SmartFilterApiOperation.LessThan,
  [SmartFilterOperation.IsLessThanOrEqualTo]: SmartFilterApiOperation.LessThanOrEqual,
  [SmartFilterOperation.IsGreaterThan]: SmartFilterApiOperation.GreaterThan,
  [SmartFilterOperation.IsGreaterThanOrEqualTo]: SmartFilterApiOperation.GreaterThanOrEqual,
  [SmartFilterOperation.Contains]: SmartFilterApiOperation.Contain
} as const

export const smartFilterFormSchema = z.object({
  search: z.string().trim(),
  filters: z.array(
    z
      .object({
        name: z.string().trim(),
        operation: z.enum(SmartFilterOperation),
        type: z.enum(SmartFilterType),
        value: z.object({
          default: z.union([z.string().trim(), z.array(z.string()).min(1, 'Please enter/select the information')]),
          additional: z.object({
            from: z.string(),
            to: z.string()
          })
        })
      })
      .superRefine((fieldValues, ctx) => {
        const { value, operation } = fieldValues

        if (operation === SmartFilterOperation.IsBetween) {
          if (value.additional.from === '') {
            ;['value.additional', 'value.additional.from'].forEach((path) => {
              ctx.addIssue({
                path: [path],
                message: 'Please enter/select the information',
                code: 'custom'
              })
            })
          }

          if (value.additional.to === '') {
            ;['value.additional', 'value.additional.to'].forEach((path) => {
              ctx.addIssue({
                path: [path],
                message: 'Please enter/select the information',
                code: 'custom'
              })
            })
          }
        } else {
          if (value.default === '') {
            ctx.addIssue({
              path: ['value.default'],
              message: 'Please enter/select the information',
              code: 'custom'
            })
          }
        }
      })
  )
})

export const defaultSmartFilterFormValue: SmartFilterFormInput = {
  search: '',
  filters: []
} as const

export interface Filter {
  label: string
  name: string
  type: SmartFilterType
  options?: Array<{
    value: string
    label: string
  }>
  apiPath?: string
  datePickerFormat?: 'date' | 'month' | 'year'
}

export type SmartFilterFormInput = z.input<typeof smartFilterFormSchema>

export type SmartFilterFormOutput = z.output<typeof smartFilterFormSchema>

export const useSmartFilterForm = ({ defaultFormValue }: { defaultFormValue?: SmartFilterFormInput } = {}) => {
  return useForm<SmartFilterFormInput, unknown, SmartFilterFormOutput>({
    resolver: zodResolver(smartFilterFormSchema),
    defaultValues: defaultFormValue ?? defaultSmartFilterFormValue
  })
}
