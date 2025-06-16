import { DynamicModule, Module, Type } from '@nestjs/common'
import { CACHE_DRIVER_TYPE } from '@src/common/interfaces/application-bootstrap-options'

import { InMemoryCachePersistenceModule } from './in-memory/in-memory-cache-persistence.module'
import { RedisCachePersistenceModule } from './redis/redis-cache-persistence.module'
import { NestCachePersistenceModule } from './nest/nest-cache-persistence.module'

const cacheInfrastructureModules: Record<CACHE_DRIVER_TYPE, Type<any>> = {
    'in-memory': InMemoryCachePersistenceModule,
    redis: RedisCachePersistenceModule,
    nest: NestCachePersistenceModule,
}
@Module({})
export class CacheInfrastructureModule {
    static use(driver: CACHE_DRIVER_TYPE): DynamicModule {
        const cacheInfrastructureModule =
            cacheInfrastructureModules[driver] ?? InMemoryCachePersistenceModule

        return {
            module: CacheInfrastructureModule,
            imports: [cacheInfrastructureModule],
            exports: [cacheInfrastructureModule],
        }
    }
}
