'use client'

import { CircleUser, Menu, Package2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button, buttonVariants } from './ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'
import ModeToggle from './ui/mode-togle'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

const NavBar = () => {
	const pathName = usePathname()
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const user: any = { role: 'admin', bill: 5 }

	return (
		<header className='sticky top-0 flex h-14 items-center justify-between gap-4 border-b bg-background/50 backdrop-blur px-4 md:px-6'>
			<Link
				href='/'
				className='flex items-center gap-2 text-lg font-semibold md:text-base'
			>
				<span className='font-extrabold text-2xl'>Fin-Keeper</span>
			</Link>
			{user && (
				<nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
					<Link
						href='/warehouse'
						className={`${
							pathName === '/warehouse'
								? 'text-foreground'
								: 'text-muted-foreground'
						} transition-colors hover:text-foreground`}
					>
						Склад
					</Link>
					<Link
						href='/finance'
						className={`${
							pathName === '/finance'
								? 'text-foreground'
								: 'text-muted-foreground'
						} transition-colors hover:text-foreground`}
					>
						Финансы
					</Link>
				</nav>
			)}
			<Sheet>
				<SheetTrigger asChild>
					<Button variant='outline' size='icon' className='shrink-0 md:hidden'>
						<Menu className='h-5 w-5' />
						<span className='sr-only'>Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side='left'>
					<nav className='grid gap-6 text-lg font-medium'>
						<Link
							href='#'
							className='flex items-center gap-2 text-lg font-semibold'
						>
							<Package2 className='h-6 w-6' />
							<span className='sr-only'>Acme Inc</span>
						</Link>
						<Link
							href='#'
							className='text-muted-foreground hover:text-foreground'
						>
							Dashboard
						</Link>
						<Link
							href='#'
							className='text-muted-foreground hover:text-foreground'
						>
							Orders
						</Link>
						<Link
							href='#'
							className='text-muted-foreground hover:text-foreground'
						>
							Products
						</Link>
						<Link
							href='#'
							className='text-muted-foreground hover:text-foreground'
						>
							Customers
						</Link>
						<Link href='#' className='hover:text-foreground'>
							Settings
						</Link>
					</nav>
				</SheetContent>
			</Sheet>
			<div className='flex items-center gap-4 md:gap-2 lg:gap-4'>
				{user && user.role === 'admin' && (
					<Button
						variant={`${pathName.startsWith('/admin') ? 'default' : 'ghost'}`}
					>
						<Link href='/admin'>Админ панель</Link>
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
						<Link href={'#'} className={buttonVariants({ variant: 'outline' })}>
							Войти
						</Link>
						<Link href={'#'} className={buttonVariants({ variant: 'outline' })}>
							Зарегистрироваться
						</Link>
					</>
				)}
				<ModeToggle />
			</div>
		</header>
	)
}

export default NavBar
