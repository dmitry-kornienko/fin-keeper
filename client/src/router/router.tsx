import { AdminLayout } from '@/components/layouts/AdminLayout'
import { RootLayout } from '@/components/layouts/RootLayout'
import { WarehouseLayout } from '@/components/layouts/WarehouseLayout'
import { AdminDashboard } from '@/pages/admin/Dashboard'
import { Login } from '@/pages/auth/Login'
import { Registration } from '@/pages/auth/Registration'
import { Components } from '@/pages/Components'
import { Finance } from '@/pages/Finance'
import { Home } from '@/pages/Home'
import { Productions } from '@/pages/Productions'
import { Products } from '@/pages/Products'
import { Paths } from '@/paths'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
	{
		path: Paths.home,
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: Paths.registration,
				element: <Registration />,
			},
			{
				path: Paths.login,
				element: <Login />,
			},
			{
				path: Paths.warehouse,
				element: <WarehouseLayout />,
				children: [
					{
						path: `${Paths.warehouse}/products`,
						element: <Products />,
					},
					{
						path: `${Paths.warehouse}/components`,
						element: <Components />,
					},
					{
						path: `${Paths.warehouse}/productions`,
						element: <Productions />,
					},
				],
			},
			{
				path: Paths.finance,
				element: <Finance />,
			},
			{
				path: Paths.admin,
				element: <AdminLayout />,
				children: [
					{
						path: `${Paths.admin}/dashboard`,
						element: <AdminDashboard />,
					},
					{
						path: `${Paths.admin}/users`,
						element: <h1>Users</h1>,
					},
				],
			},
		],
	},
])
