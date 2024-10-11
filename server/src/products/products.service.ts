import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Component } from 'src/components/entities/component.entity'
import { Repository } from 'typeorm'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductComponent } from './entities/product-component.entity'
import { Product } from './entities/product.entity'

@Injectable()
export class ProductsService {
	constructor(
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>,

		@InjectRepository(Component)
		private componentRepository: Repository<Component>,

		@InjectRepository(ProductComponent)
		private productComponentRepository: Repository<ProductComponent>
	) {}
	async create(createProductDto: CreateProductDto, user_id: number) {
		const product = await this.productRepository.findBy({
			user: { id: user_id },
			sku: createProductDto.sku,
		})
		if (product.length)
			throw new BadRequestException('Product with this sku already exist')

		const newProduct = await this.productRepository.save({
			name: createProductDto.name,
			sku: createProductDto.sku,
			user: { id: user_id },
		})

		if (!createProductDto.components) return newProduct

		for (const item of createProductDto.components) {
			const component = await this.componentRepository.findOne({
				where: { id: item.id },
			})

			const productComponent = new ProductComponent()
			productComponent.product = newProduct
			productComponent.component = component
			productComponent.quantity = item.quantity
			await this.productComponentRepository.save(productComponent)
		}

		return newProduct
	}

	async findAll(id: number) {
		const products = await this.productRepository.find({
			where: { user: { id } },
			relations: ['components', 'components.component'],
		})

		return products.map(product => {
			return {
				...product,
				components: product.components.map(component => {
					const { product_id, component_id, ...rest } = component
					return rest
				}),
			}
		})
	}

	async findOne(id: number) {
		const product = await this.productRepository.findOne({
			where: {
				id,
			},
			relations: ['components', 'components.component'],
		})
		if (!product) throw new NotFoundException('Product not found')

		return {
			...product,
			components: product.components.map(component => {
				const { product_id, component_id, ...rest } = component
				return rest
			}),
		}
	}

	async update(
		id: number,
		updateProductDto: UpdateProductDto,
		user_id: number
	) {
		const product = await this.productRepository.findOne({
			where: { id },
			relations: ['components'],
		})
		if (!product) throw new NotFoundException('Product not found')

		if (updateProductDto.sku) {
			const productWithSameSKU = await this.productRepository.findOneBy({
				user: { id: user_id },
				sku: updateProductDto.sku,
			})
			if (productWithSameSKU)
				throw new BadRequestException('Component with this sku already exist')
		}

		if (updateProductDto.components) {
			await this.productComponentRepository.delete({ product: { id } })

			const productComponents = updateProductDto.components.map(item => {
				const productComponent = new ProductComponent()
				productComponent.product = product
				productComponent.component = { id: item.id } as Component
				productComponent.quantity = item.quantity
				return productComponent
			})
			await this.productComponentRepository.save(productComponents)
		}

		const { components, ...rest } = updateProductDto
		return await this.productRepository.update(id, rest)
	}

	async remove(id: number) {
		const product = await this.productRepository.findOne({ where: { id } })
		if (!product) throw new NotFoundException('Product not found')

		await this.productComponentRepository.delete({ product: { id } })

		return await this.productRepository.delete(id)
	}
}
