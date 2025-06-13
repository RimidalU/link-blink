import { Module } from '@nestjs/common'
import { CacheModule } from '@nestjs/cache-manager'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { CacheRepository } from '../../ports/cache.repository'

import { NestCacheRepository } from './nest-cache.repository'
import { getCacheModuleConfig } from './get-cache-module.config'

@Module({
    imports: [
        ConfigModule,
        CacheModule.registerAsync({
            imports: [ConfigModule],
            useFactory: getCacheModuleConfig,
            inject: [ConfigService],
        }),
    ],
    providers: [
        NestCacheRepository,
        {
            provide: CacheRepository,
            useClass: NestCacheRepository,
        },
    ],
    exports: [CacheRepository],
})
export class NestCachePersistenceModule {}
