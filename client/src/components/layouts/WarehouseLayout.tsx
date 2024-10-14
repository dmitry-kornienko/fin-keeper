import { Outlet } from 'react-router-dom'
import SideBar from '../SideBar'

export const WarehouseLayout = () => {
	const tabs = [
		{
			label: 'Товары',
			path: '/warehouse/products',
		},
		{
			label: 'Компоненты',
			path: '/warehouse/components',
		},
		{
			label: 'Производство',
			path: '/warehouse/productions',
		},
	]
	return (
		<div className='flex gap-4 px-6'>
			<div>
				<SideBar tabs={tabs} />
			</div>
			<Outlet />
		</div>
	)
}
