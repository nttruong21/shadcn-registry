import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utils
export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs))
}
