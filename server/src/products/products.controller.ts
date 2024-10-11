import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Req,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	create(@Body() createProductDto: CreateProductDto, @Req() req) {
		return this.productsService.create(createProductDto, +req.user.id)
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	findAll(@Req() req) {
		return this.productsService.findAll(+req.user.id)
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string) {
		return this.productsService.findOne(+id)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	update(
		@Param('id') id: string,
		@Body() updateProductDto: UpdateProductDto,
		@Req() req
	) {
		return this.productsService.update(+id, updateProductDto, +req.user.id)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	remove(@Param('id') id: string) {
		return this.productsService.remove(+id)
	}
}
