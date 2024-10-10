import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { IUser } from 'src/types/types'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UsersService,
		private readonly jwtService: JwtService
	) {}

	async validateUser(email: string, password: string) {
		const user = await this.userService.findOne(email)
		const passwordIsMatch = await bcrypt.compare(password, user.password)

		if (user && passwordIsMatch) {
			return user
		}

		throw new UnauthorizedException('Bad credentials')
	}

	async login(user: IUser) {
		return {
			...user,
			token: this.jwtService.sign({
				id: user.id,
				email: user.email,
				bill: user.bill,
				wb_token: user.wb_token,
				isActivated: user.isActivated,
			}),
		}
	}
}
