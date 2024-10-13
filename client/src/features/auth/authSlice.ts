import { User } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import { authApi } from '../../app/services/auth'
import { RootState } from '../../app/store'

interface InitialState {
	user: User | null
	token: string | null
}

const initialState: InitialState = {
	user: null,
	token: null,
}

const slice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: () => initialState,
	},
	extraReducers: builder => {
		builder
			.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
				state.user = action.payload.user
				state.token = action.payload.token
			})
			.addMatcher(
				authApi.endpoints.register.matchFulfilled,
				(state, action) => {
					state.user = action.payload.user
					state.token = action.payload.token
				}
			)
			.addMatcher(authApi.endpoints.current.matchFulfilled, (state, action) => {
				state.user = action.payload.user
			})
	},
})

export const { logout } = slice.actions
export default slice.reducer

export const selectUser = (state: RootState) => state.auth.user
