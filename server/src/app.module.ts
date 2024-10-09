import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ComponentsModule } from './components/components.module'
import { ProductsModule } from './products/products.module'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		UsersModule,
		ProductsModule,
		AuthModule,
		ComponentsModule,
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get('DB_HOST'),
				port: configService.get('DB_PORT'),
				username: configService.get('DB_USERNAME'),
				password: configService.get('DB_PASSWORD'),
				database: configService.get('DB_NAME'),
				entities: [__dirname + '/**/*.entity{.ts,.js}'],
				synchronize: true,
			}),
			inject: [ConfigService],
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
