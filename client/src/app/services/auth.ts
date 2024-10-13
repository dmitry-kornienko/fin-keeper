import { User } from '../../types'
import { api } from './api'

export type UserData = Omit<User, 'id'>
type ResponsLoginData = {
	user: User
	token: string
}

export const authApi = api.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation<ResponsLoginData, UserData>({
			query: UserData => ({
				url: '/auth/login',
				method: 'POST',
				body: UserData,
			}),
		}),
		register: builder.mutation<ResponsLoginData, UserData>({
			query: UserData => ({
				url: '/auth/registration',
				method: 'POST',
				body: UserData,
			}),
		}),
		current: builder.query<ResponsLoginData, void>({
			query: () => ({
				url: '/auth/profile',
				method: 'GET',
			}),
		}),
	}),
})

export const { useLoginMutation, useRegisterMutation, useCurrentQuery } =
	authApi

export const {
	endpoints: { login, register, current },
} = authApi
