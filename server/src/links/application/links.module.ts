import { DynamicModule, Module, Type } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { QueueModule } from '@src/common/queue/queue.module'
import { BullModule } from '@nestjs/bullmq'

import { LinksController } from '../presenters/http/links.controller'
import { LinkFactory } from '../domain/factories/link-factory'
import { LinkClickFactory } from '../domain/factories/link-click-factory'
import { LinkClickQueueProcessor } from '../infrastructure/persistence/queues/click-queue.processor'
import { SERVICE_NAME } from '../constants/service.constants'

import { LinksService } from './links.service'

@Module({
    controllers: [LinksController],
    providers: [
        LinksService,
        LinkFactory,
        LinkClickFactory,
        LinkClickQueueProcessor,
    ],
    imports: [
        ConfigModule,
        QueueModule,
        BullModule.registerQueue({ name: SERVICE_NAME }),
    ],
})
export class LinksModule {
    static withInfrastructure(linksInfrastructureModule: Type | DynamicModule) {
        return {
            module: LinksModule,
            imports: [linksInfrastructureModule],
        }
    }
}
