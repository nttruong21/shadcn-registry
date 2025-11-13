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

export const OPERATIONS_PER_TYPE: Record<SmartFilterType, SmartFilterOperation[]> = {
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
}

export const DEFAULT_STRING_VALUE = {
  default: '',
  additional: {
    from: '',
    to: ''
  }
}

export const DEFAULT_STRING_ARRAY_VALUE = {
  default: '',
  additional: {
    from: '',
    to: ''
  }
}

export const DEFAULT_VALUE_PER_OPERATION: Record<
  SmartFilterOperation,
  SmartFilterFormOutput['filters'][number]['value']
> = {
  [SmartFilterOperation.EqualsTo]: DEFAULT_STRING_VALUE,
  [SmartFilterOperation.DoesNotEqualTo]: DEFAULT_STRING_VALUE,
  [SmartFilterOperation.IsLessThan]: DEFAULT_STRING_VALUE,
  [SmartFilterOperation.IsLessThanOrEqualTo]: DEFAULT_STRING_VALUE,
  [SmartFilterOperation.IsGreaterThan]: DEFAULT_STRING_VALUE,
  [SmartFilterOperation.IsGreaterThanOrEqualTo]: DEFAULT_STRING_VALUE,
  [SmartFilterOperation.Contains]: DEFAULT_STRING_VALUE,
  [SmartFilterOperation.IsBetween]: DEFAULT_STRING_VALUE,
  [SmartFilterOperation.HasAnyOf]: DEFAULT_STRING_ARRAY_VALUE,
  [SmartFilterOperation.HasAllOf]: DEFAULT_STRING_ARRAY_VALUE
}

export const API_OPERATION_PER_OPERATION: Partial<Record<SmartFilterOperation, SmartFilterApiOperation>> = {
  [SmartFilterOperation.EqualsTo]: SmartFilterApiOperation.Equal,
  [SmartFilterOperation.DoesNotEqualTo]: SmartFilterApiOperation.NotEqual,
  [SmartFilterOperation.IsLessThan]: SmartFilterApiOperation.LessThan,
  [SmartFilterOperation.IsLessThanOrEqualTo]: SmartFilterApiOperation.LessThanOrEqual,
  [SmartFilterOperation.IsGreaterThan]: SmartFilterApiOperation.GreaterThan,
  [SmartFilterOperation.IsGreaterThanOrEqualTo]: SmartFilterApiOperation.GreaterThanOrEqual,
  [SmartFilterOperation.Contains]: SmartFilterApiOperation.Contain
}

export const SMART_FILTER_FORM_SCHEMA = z.object({
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

export const DEFAULT_SMART_FILTER_FORM_VALUE: SmartFilterFormInput = {
  search: '',
  filters: []
}

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

export type SmartFilterFormInput = z.input<typeof SMART_FILTER_FORM_SCHEMA>

export type SmartFilterFormOutput = z.output<typeof SMART_FILTER_FORM_SCHEMA>

export const useSmartFilterForm = ({ defaultFormValue }: { defaultFormValue?: SmartFilterFormInput } = {}) => {
  return useForm<SmartFilterFormInput, unknown, SmartFilterFormOutput>({
    // @ts-expect-error - type mismatch from zod
    resolver: zodResolver(SMART_FILTER_FORM_SCHEMA),
    defaultValues: defaultFormValue ?? DEFAULT_SMART_FILTER_FORM_VALUE
  })
}
