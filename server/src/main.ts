import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'

import { AppModule } from './app.module'
import { initSwagger } from './app.swagger'

async function bootstrap() {
    const app = await NestFactory.create(
        AppModule.register({
            DBdriver: 'orm',
            cacheDriver: 'redis',
        })
    )

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        })
    )

    const config = app.get(ConfigService)

    const port = +config.get<number>('API_PORT', 4000)

    initSwagger(app)

    await app.listen(port)
}
bootstrap()
