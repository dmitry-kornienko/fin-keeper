import { IsNotEmpty, IsOptional } from 'class-validator'
import { User } from 'src/users/entities/user.entity'

export class CreateComponentDto {
	@IsNotEmpty()
	name: string

	@IsNotEmpty()
	sku: string

	@IsOptional()
	user?: User
}
