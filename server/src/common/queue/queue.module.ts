import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bullmq'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { getBullmqQueuePersistenceModuleConfig } from './get-bullmq-queue-persistence-module.config'

@Module({
    imports: [
        BullModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: getBullmqQueuePersistenceModuleConfig,
            inject: [ConfigService],
        }),
    ],
})
export class QueueModule {}
