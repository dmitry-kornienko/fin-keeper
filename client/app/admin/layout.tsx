'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const pathName = usePathname()
	return (
		<div>
			<nav className='sticky top-14 flex h-10 items-center justify-start gap-4 border-b bg-background/50 backdrop-blur px-4 md:px-6'>
				<Link
					href='/admin'
					className={`${
						pathName === '/admin' ? 'text-foreground' : 'text-muted-foreground'
					} transition-colors hover:text-foreground`}
				>
					Dashboard
				</Link>
				<Link
					href='/admin/users'
					className={`${
						pathName === '/admin/users'
							? 'text-foreground'
							: 'text-muted-foreground'
					} transition-colors hover:text-foreground`}
				>
					Пользователи
				</Link>
				<Link
					href='/admin/products'
					className={`${
						pathName === '/admin/products'
							? 'text-foreground'
							: 'text-muted-foreground'
					} transition-colors hover:text-foreground`}
				>
					Товары
				</Link>
				<Link
					href='/admin/components'
					className={`${
						pathName === '/admin/components'
							? 'text-foreground'
							: 'text-muted-foreground'
					} transition-colors hover:text-foreground`}
				>
					Компоненты
				</Link>
			</nav>
			{children}
		</div>
	)
}
