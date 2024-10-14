import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import React from 'react'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'

type Props = {
	message?: string
}

export const ErrorMessage: React.FC<Props> = ({ message }) => {
	if (!message) {
		return null
	}
	return (
		<Alert variant='destructive' className='mt-4'>
			<ExclamationTriangleIcon className='h-4 w-4' />
			<AlertTitle>Ошибка!</AlertTitle>
			<AlertDescription>{message}</AlertDescription>
		</Alert>
	)
}
