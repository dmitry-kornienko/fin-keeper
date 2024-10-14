import { useRegisterMutation } from '@/app/services/auth'
import { ErrorMessage } from '@/components/ErrorMessage'
import { Button } from '@/components/ui/button'
import { ButtonLoading } from '@/components/ui/button-loading'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Paths } from '@/paths'
import { isErrorWithMessage } from '@/utils/is-error-with-message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

const formSchema = z.object({
	email: z.string().email({ message: 'Не соответствует формату' }),
	password: z.string().min(6, {
		message: 'Пароль должен быть не менее 6 символов',
	}),
})

export function Registration() {
	const [register] = useRegisterMutation()
	const navigate = useNavigate()
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			setIsLoading(true)

			await register(values).unwrap()

			setIsLoading(false)
			navigate(Paths.warehouse)
		} catch (err) {
			setIsLoading(false)
			const maybeerror = isErrorWithMessage(err)

			if (maybeerror) {
				setError(err.data.message)
			} else {
				setError('Неизвестная ошибка')
			}
		}
	}

	return (
		<Card className='mx-auto mt-20 max-w-sm string, text-left'>
			<CardHeader>
				<CardTitle className='text-2xl'>Регистрация</CardTitle>
				<CardDescription>Введите данные для регистрации</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder='example@mail.com' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Пароль</FormLabel>
									<FormControl>
										<Input placeholder='******' type='password' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{isLoading ? (
							<ButtonLoading text='Ожидайте' className='w-full' />
						) : (
							<Button type='submit' className='w-full'>
								Зарегистрироваться
							</Button>
						)}
					</form>
				</Form>
				<div className='mt-4 text-center text-sm'>
					Уже есть аккаунт?{' '}
					<Link to={Paths.login} className='underline'>
						Войти
					</Link>
					<ErrorMessage message={error} />
				</div>
			</CardContent>
		</Card>
	)
}
