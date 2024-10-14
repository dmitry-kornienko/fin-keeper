import React from 'react'
import { Link, useLocation } from 'react-router-dom'

type SideBarProps = {
	tabs: {
		label: string
		path: string
	}[]
}

const SideBar: React.FC<SideBarProps> = ({ tabs }) => {
	const { pathname } = useLocation()

	return (
		<nav className='flex flex-col gap-2 sticky top-14 items-start'>
			{tabs.map((tab, index) => (
				<Link
					key={index}
					to={tab.path}
					className={`${
						pathname.startsWith(tab.path)
							? 'text-foreground'
							: 'text-muted-foreground'
					} transition-colors hover:text-foreground`}
				>
					{tab.label}
				</Link>
			))}
		</nav>
	)
}

export default SideBar
