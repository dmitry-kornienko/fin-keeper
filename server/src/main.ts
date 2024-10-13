import { ClassSerializerInterceptor } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const configService = app.get(ConfigService)

	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

	app.setGlobalPrefix('api')
	app.enableCors({
		origin: configService.get('MAIN_CLIENT_URL'),
		credentials: true,
	})

	const port = configService.get('PORT')

	await app.listen(port)
}
bootstrap()
