import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductsModule } from 'src/products/products.module'
import { ComponentsController } from './components.controller'
import { ComponentsService } from './components.service'
import { Component } from './entities/component.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Component]), ProductsModule],
	controllers: [ComponentsController],
	providers: [ComponentsService],
})
export class ComponentsModule {}
