import { Component } from 'src/components/entities/component.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Product } from './product.entity'

@Entity('product_components')
export class ProductComponent {
	@PrimaryColumn()
	product_id: number

	@PrimaryColumn()
	component_id: number

	@Column({ type: 'int' })
	quantity: number

	@ManyToOne(() => Product, product => product.components)
	@JoinColumn({ name: 'product_id' }) // JoinColumn для определения внешнего ключа
	product: Product

	@ManyToOne(() => Component, component => component.products)
	@JoinColumn({ name: 'component_id' }) // JoinColumn для определения внешнего ключа
	component: Component
}
