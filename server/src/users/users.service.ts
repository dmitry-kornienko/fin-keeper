import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>
	) {}

	async create(createUserDto: CreateUserDto) {
		const existUser = await this.userRepository.findOne({
			where: {
				email: createUserDto.email,
			},
		})

		if (existUser) throw new BadRequestException('This email already exist')

		const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
		const activationLink = randomUUID()

		const user = await this.userRepository.save({
			email: createUserDto.email,
			password: hashedPassword,
			activationLink,
		})

		return { user }
	}

	// findOne(id: number) {
	// 	return `This action returns a #${id} user`
	// }
}
