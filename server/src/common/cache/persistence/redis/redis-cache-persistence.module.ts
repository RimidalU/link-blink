import { Module } from '@nestjs/common'
import { RedisModule } from '@nestjs-modules/ioredis'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { CacheRepository } from '../../ports/cache.repository'

import { RedisCacheRepository } from './redis-cache.repository'
import { getCacheModuleConfig } from './get-cache-module.config'

@Module({
    imports: [
        RedisModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: getCacheModuleConfig,
            inject: [ConfigService],
        }),
    ],
    providers: [
        RedisCacheRepository,
        {
            provide: CacheRepository,
            useClass: RedisCacheRepository,
        },
    ],
    exports: [CacheRepository],
})
export class RedisCachePersistenceModule {}
