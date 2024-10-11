import { BadRequestException, Injectable } from '@nestjs/common'
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

	findOne(id: number) {
		return `This action returns a #${id} product`
	}

	update(id: number, updateProductDto: UpdateProductDto) {
		return `This action updates a #${id} product`
	}

	remove(id: number) {
		return `This action removes a #${id} product`
	}
}
