export type User = {
	id: number
	email: string
	password: string
	bill: number
	wb_token: string
	role: string
	activationLink: string
	isActivated: boolean
	products?: Product[]
	components?: Component[]
	createdAt: string
	updatedAt: string
}

export type Product = {
	id: number
}

export type Component = {
	id: number
}

export type ErrorWithMessage = {
	status: number
	data: {
		message: string
	}
}
