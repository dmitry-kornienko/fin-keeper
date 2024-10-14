import { Outlet } from 'react-router-dom'
import { Header } from '../Header'

export const RootLayout = () => {
	return (
		<div>
			<Header />
			<div className='container pt-2'>
				<Outlet />
			</div>
		</div>
	)
}
