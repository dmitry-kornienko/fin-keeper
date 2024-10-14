import { Button, ButtonProps } from '@/components/ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'

interface ButtonLoadingProps extends ButtonProps {
	text: string
}

export function ButtonLoading({
	text,
	className,
	...props
}: ButtonLoadingProps) {
	return (
		<Button className={className} disabled {...props}>
			<ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
			{text}
		</Button>
	)
}
