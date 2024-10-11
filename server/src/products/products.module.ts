import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ComponentsService } from 'src/components/components.service'
import { Component } from 'src/components/entities/component.entity'
import { ProductComponent } from './entities/product-component.entity'
import { Product } from './entities/product.entity'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'

@Module({
	imports: [TypeOrmModule.forFeature([Product, Component, ProductComponent])],
	controllers: [ProductsController],
	providers: [ProductsService, ComponentsService],
	exports: [ProductsService],
})
export class ProductsModule {}
