import { CheckIcon, ChevronsUpDown } from 'lucide-react'
import * as React from 'react'
import { Button, type ButtonProps } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	type CommandInputProps,
	CommandItem,
	type CommandItemProps,
	CommandList,
	type CommandListProps,
	type CommandProps
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	type PopoverContentProps,
	type PopoverProps,
	PopoverTrigger,
	type PopoverTriggerProps
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

// Types
export interface Option {
	value: string
	label: string
}

export interface ComboboxProps {
	value: Option['value'] | null
	options: Option[]
	isValueCanBeEmptyString?: boolean
	placeholder?: string
	popoverTriggerProps?: PopoverTriggerProps
	buttonTriggerProps?: ButtonProps
	popoverProps?: PopoverProps
	popoverContentProps?: PopoverContentProps
	commandProps?: CommandProps
	commandInputProps?: CommandInputProps
	commandListProps?: CommandListProps
	commandItemProps?: Omit<CommandItemProps, 'children'> & {
		children: (option: Option) => React.ReactNode
	}
	commandGroupSlot?: React.ReactNode
	onValueChange: (value: Option['value'] | null) => void
}

// Hooks
export const useLabel = (args: Pick<ComboboxProps, 'value' | 'options' | 'isValueCanBeEmptyString'>) => {
	// Args
	const { value, options, isValueCanBeEmptyString } = args

	// States
	const [label, setLabel] = React.useState<string>()

	// Effects
	// Reset label
	React.useEffect(() => {
		if (value == null || (value === '' && !isValueCanBeEmptyString)) {
			return setLabel(undefined)
		}

		const selectedOption = options.find((option) => option.value === value)

		if (selectedOption) {
			setLabel(selectedOption.label)
		}
	}, [value, options, isValueCanBeEmptyString])

	return { label }
}

// Components
export const Combobox = ({
	value,
	options,
	isValueCanBeEmptyString = true,
	placeholder,
	popoverProps,
	popoverTriggerProps,
	buttonTriggerProps,
	popoverContentProps,
	commandProps,
	commandInputProps,
	commandListProps,
	commandItemProps,
	commandGroupSlot,
	onValueChange
}: ComboboxProps) => {
	// Hooks
	const { label } = useLabel({
		value,
		options,
		isValueCanBeEmptyString
	})

	// States
	const [isOpenPopover, setIsOpenPopover] = React.useState(false)

	return (
		<Popover {...popoverProps} open={isOpenPopover} onOpenChange={setIsOpenPopover}>
			<PopoverTrigger {...popoverTriggerProps} asChild={popoverTriggerProps?.asChild ?? true}>
				{popoverTriggerProps?.children ?? (
					<Button
						variant='outline'
						role='combobox'
						aria-expanded={isOpenPopover}
						{...buttonTriggerProps}
						className={cn('w-full justify-start', buttonTriggerProps?.className, {
							'text-muted-foreground': value == null || (value === '' && !isValueCanBeEmptyString)
						})}
					>
						{buttonTriggerProps?.children ?? (
							<React.Fragment>
								<span className='line-clamp-1 block text-ellipsis'> {label ?? placeholder}</span>
								<ChevronsUpDown className='text-muted-foreground ml-auto size-4 shrink-0' />
							</React.Fragment>
						)}
					</Button>
				)}
			</PopoverTrigger>

			<PopoverContent
				{...popoverContentProps}
				className={cn('min-w-(--radix-popover-trigger-width) p-0', popoverContentProps?.className)}
			>
				<Command {...commandProps}>
					<CommandInput {...commandInputProps} />
					<CommandList {...commandListProps} className={cn('scrollbar', commandListProps?.className)}>
						<CommandEmpty>No option found.</CommandEmpty>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									key={option.value}
									value={option.label}
									onSelect={() => {
										onValueChange(option.value)
										setIsOpenPopover(false)
									}}
								>
									{commandItemProps?.children ? commandItemProps.children(option) : option.label}
									<CheckIcon className={cn('mr-2 h-4 w-4', option.value === value ? 'opacity-100' : 'opacity-0')} />
								</CommandItem>
							))}

							{commandGroupSlot && commandGroupSlot}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
