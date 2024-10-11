import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateComponentDto } from './dto/create-component.dto'
import { UpdateComponentDto } from './dto/update-component.dto'
import { Component } from './entities/component.entity'

@Injectable()
export class ComponentsService {
	constructor(
		@InjectRepository(Component)
		private readonly componentRepository: Repository<Component>
	) {}

	async create(createComponentDto: CreateComponentDto, id: number) {
		const component = await this.componentRepository.findBy({
			user: { id },
			sku: createComponentDto.sku,
		})

		if (component.length)
			throw new BadRequestException('Component with this sku already exist')

		const newComponent = {
			name: createComponentDto.name,
			sku: createComponentDto.sku,
			user: { id },
		}

		return await this.componentRepository.save(newComponent)
	}

	async findAll(id: number) {
		return await this.componentRepository.find({ where: { user: { id } } })
	}

	async findOne(id: number) {
		const component = await this.componentRepository.findOne({
			where: { id },
			relations: {
				user: true,
			},
		})
		if (!component) throw new NotFoundException('Component not found')

		return component
	}

	async update(
		id: number,
		updateComponentDto: UpdateComponentDto,
		user_id: number
	) {
		const component = await this.componentRepository.findOne({ where: { id } })
		if (!component) throw new NotFoundException('Component not found')

		if (updateComponentDto.sku) {
			const componentWithSameSku = await this.componentRepository.findBy({
				user: { id: user_id },
				sku: updateComponentDto.sku,
			})
			if (componentWithSameSku.length)
				throw new BadRequestException('Component with this sku already exist')
		}

		return await this.componentRepository.update(id, updateComponentDto)
	}

	async remove(id: number) {
		const component = await this.componentRepository.findOne({ where: { id } })
		if (!component) throw new NotFoundException('Component not found')

		return await this.componentRepository.delete(id)
	}
}
