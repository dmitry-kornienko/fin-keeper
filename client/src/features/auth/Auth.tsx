import { Loader } from 'lucide-react'
import { useCurrentQuery } from '../../app/services/auth'

export const Auth = ({ children }: { children: JSX.Element }) => {
	const { isLoading } = useCurrentQuery()
	if (isLoading) {
		return (
			<div className='flex flex-col justify-center items-center mt-20'>
				<Loader className='mr-2 h-8 w-8 animate-spin' />
				<span className='font-bold'>Загрузка...</span>
			</div>
		)
	}
	return children
}
