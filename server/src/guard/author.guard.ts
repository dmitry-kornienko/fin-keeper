import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common'
import { ComponentsService } from 'src/components/components.service'
import { ProductsService } from 'src/products/products.service'

@Injectable()
export class AuthorGuard implements CanActivate {
	constructor(
		private readonly productsService: ProductsService,
		private readonly componentsService: ComponentsService
	) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const { id, type } = request.params

		let entity

		switch (type) {
			case 'product':
				entity = await this.productsService.findOne(id)
				break
			case 'component':
				entity = await this.componentsService.findOne(id)
				break

			default:
				throw new ForbiddenException()
		}

		const user = request.user

		if (entity && user && entity.user.id === user.id) {
			return true
		}

		return false
	}
}
