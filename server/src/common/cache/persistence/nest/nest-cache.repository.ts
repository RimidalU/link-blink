import { Inject, Injectable } from '@nestjs/common'
import { Cache } from 'cache-manager'
import { CACHE_MANAGER } from '@nestjs/cache-manager'

import { CacheRepository } from '../../ports/cache.repository'

@Injectable()
export class NestCacheRepository extends CacheRepository {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {
        super()
    }

    async get(key: string): Promise<string | null> {
        return (await this.cacheManager.get<string>(key)) ?? null
    }

    async set(key: string, value: string, ttl: number): Promise<void> {
        await this.cacheManager.set(key, value, ttl)
    }

    async delete(key: string): Promise<void> {
        await this.cacheManager.del(key)
    }
}
