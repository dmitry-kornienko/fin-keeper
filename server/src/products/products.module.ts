import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Component } from 'src/components/entities/component.entity'
import { ProductComponent } from './entities/product-component.entity'
import { Product } from './entities/product.entity'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'

@Module({
	imports: [TypeOrmModule.forFeature([Product, Component, ProductComponent])],
	controllers: [ProductsController],
	providers: [ProductsService],
})
export class ProductsModule {}
