import { Outlet } from 'react-router-dom'
import AdminSideBar from '../admin/AdminSideBar'

export const AdminLayout = () => {
	return (
		<div className='flex px-4'>
			<AdminSideBar />
			<Outlet />
		</div>
	)
}
