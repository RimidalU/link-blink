import { Module } from '@nestjs/common'

import { CacheRepository } from '../../ports/cache.repository'

import { InMemoryCacheRepository } from './in-memory-cache.repository'

@Module({
    imports: [],
    providers: [
        InMemoryCacheRepository,
        {
            provide: CacheRepository,
            useClass: InMemoryCacheRepository,
        },
    ],
    exports: [CacheRepository],
})
export class InMemoryCachePersistenceModule {}
