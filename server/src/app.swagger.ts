import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'

export const initSwagger = (app: INestApplication) => {
    const swaggerConfig = new DocumentBuilder()
        .setTitle('LinkBlink')
        .addBearerAuth()
        .setDescription('"LinkBlink" Server API')
        .setVersion('1.0')
        .setContact(
            'RimidalU',
            'https://github.com/RimidalU',
            'stankevichuuladimiru@gmail.com'
        )
        .setLicense(
            'BSD 3-Clause',
            'https://opensource.org/licenses/BSD-3-Clause'
        )
        .setExternalDoc('GitHub', 'https://github.com/RimidalU/link-blink')
        .build()
    const document = SwaggerModule.createDocument(app, swaggerConfig)
    SwaggerModule.setup('/docs', app, document)
}
