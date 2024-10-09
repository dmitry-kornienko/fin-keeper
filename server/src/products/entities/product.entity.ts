import { User } from 'src/users/entities/user.entity'
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { ProductComponent } from './product-component.entity'

@Entity()
export class Product {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column({ unique: true })
	sku: string

	@Column({ default: 0 })
	stock_quantity: number

	@ManyToOne(() => User, user => user.products)
	@JoinColumn({ name: 'user_id' })
	user: User

	@OneToMany(
		() => ProductComponent,
		productComponent => productComponent.product
	)
	components: ProductComponent[]

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
