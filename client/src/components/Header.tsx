import { selectUser } from '@/features/auth/authSlice'
import { Paths } from '@/paths'
import { CircleUser } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { ModeToggle } from './mode-toggle'
import { Button, buttonVariants } from './ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'

export const Header = () => {
	// const user = { role: 'admin', bill: 5 }
	const user = useSelector(selectUser)
	const { pathname } = useLocation()

	return (
		<header className='sticky top-0 flex h-14 items-center justify-between gap-4 border-b bg-background/50 backdrop-blur px-4 md:px-6'>
			<Link
				to={Paths.home}
				className='flex items-center gap-2 text-lg font-semibold md:text-base'
			>
				<span className='font-extrabold text-2xl'>Fin-Keeper</span>
			</Link>
			{user && (
				<nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
					<Link
						to={Paths.warehouse}
						className={`${
							pathname === '/warehouse'
								? 'text-foreground'
								: 'text-muted-foreground'
						} transition-colors hover:text-foreground`}
					>
						Склад
					</Link>
					<Link
						to={Paths.finance}
						className={`${
							pathname === '/finance'
								? 'text-foreground'
								: 'text-muted-foreground'
						} transition-colors hover:text-foreground`}
					>
						Финансы
					</Link>
				</nav>
			)}
			<div className='flex items-center gap-4 md:gap-2 lg:gap-4'>
				{user && user.role === 'admin' && (
					<Button
						variant={`${pathname.startsWith('/admin') ? 'default' : 'ghost'}`}
					>
						<Link to={`${Paths.admin}/dashboard`}>Админ панель</Link>
					</Button>
				)}
				{user ? (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='secondary' size='icon' className='rounded-full'>
								<CircleUser className='h-5 w-5' />
								<span className='sr-only'>Toggle user menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuLabel>Мой профиль</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Настройки</DropdownMenuItem>
							<DropdownMenuItem>
								Счет: {user.bill}
								<Button variant='outline' size='sm' className='ml-2'>
									Пополнить
								</Button>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Выйти</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					<>
						<Link
							to={Paths.login}
							className={buttonVariants({ variant: 'outline' })}
						>
							Войти
						</Link>
						<Link
							to={Paths.registration}
							className={buttonVariants({ variant: 'outline' })}
						>
							Зарегистрироваться
						</Link>
					</>
				)}
				<ModeToggle />
			</div>
		</header>
	)
}
