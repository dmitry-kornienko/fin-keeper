import { Component } from 'src/components/entities/component.entity'
import { Product } from 'src/products/entities/product.entity'
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ unique: true })
	email: string

	@Column()
	password: string

	@Column()
	activationLink: string

	@Column({ default: '' })
	wb_token: string

	@Column({ default: 5 })
	bill: number

	@Column({ default: false })
	isActivated: boolean

	@OneToMany(() => Product, product => product.user, {
		onDelete: 'CASCADE',
	})
	products: Product[]

	@OneToMany(() => Component, component => component.user, {
		onDelete: 'CASCADE',
	})
	components: Component[]

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
