import { Link } from 'react-router-dom'
import { buttonVariants } from '../ui/button'

export default function AdminSideBar() {
	return (
		<nav className='flex flex-col gap-1 items-start'>
			<Link to='#' className={buttonVariants({ variant: 'ghost' })}>
				Dashboard
			</Link>
			<Link to='#' className={buttonVariants({ variant: 'ghost' })}>
				Пользователи
			</Link>
			<Link to='#' className={buttonVariants({ variant: 'ghost' })}>
				Товары
			</Link>
			<Link to='#' className={buttonVariants({ variant: 'ghost' })}>
				Компоненты
			</Link>
		</nav>
	)
}
