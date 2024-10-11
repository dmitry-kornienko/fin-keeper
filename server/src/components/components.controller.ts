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
import { ComponentsService } from './components.service'
import { CreateComponentDto } from './dto/create-component.dto'
import { UpdateComponentDto } from './dto/update-component.dto'

@Controller('components')
export class ComponentsController {
	constructor(private readonly componentsService: ComponentsService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	create(@Body() createComponentDto: CreateComponentDto, @Req() req) {
		return this.componentsService.create(createComponentDto, +req.user.id)
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	findAll(@Req() req) {
		return this.componentsService.findAll(req.user.id)
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string) {
		return this.componentsService.findOne(+id)
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	update(
		@Param('id') id: string,
		@Body() updateComponentDto: UpdateComponentDto,
		@Req() req
	) {
		return this.componentsService.update(+id, updateComponentDto, +req.user.id)
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	remove(@Param('id') id: string) {
		return this.componentsService.remove(+id)
	}
}
