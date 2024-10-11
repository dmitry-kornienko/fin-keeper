import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateProductDto {
	@IsNotEmpty()
	name: string

	@IsNotEmpty()
	sku: string

	@IsOptional()
	components?: { id: number; quantity: number }[]
}
