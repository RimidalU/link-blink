import { DynamicModule, Module, Type } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { LinksController } from '../presenters/http/links.controller'
import { LinkFactory } from '../domain/factories/link-factory'
import { LinkClickFactory } from '../domain/factories/link-click-factory'

import { LinksService } from './links.service'

@Module({
    controllers: [LinksController],
    providers: [LinksService, LinkFactory, LinkClickFactory],
})
export class LinksModule {
    static withInfrastructure(linksInfrastructureModule: Type | DynamicModule) {
        return {
            module: LinksModule,
            imports: [ConfigModule, linksInfrastructureModule],
        }
    }
}
