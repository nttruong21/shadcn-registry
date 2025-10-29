import { GitBranch } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Component
export const ButtonWithIcon = () => {
	// Template
	return (
		<Button variant='outline' size='sm'>
			<GitBranch />
			<span>New Branch</span>
		</Button>
	)
}
