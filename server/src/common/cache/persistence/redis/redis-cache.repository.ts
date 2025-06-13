import { Injectable } from '@nestjs/common'
import { InjectRedis } from '@nestjs-modules/ioredis'
import { Redis } from 'ioredis'

import { CacheRepository } from '../../ports/cache.repository'

@Injectable()
export class RedisCacheRepository extends CacheRepository {
    constructor(
        @InjectRedis()
        private readonly redis: Redis
    ) {
        super()
    }

    async get(key: string): Promise<string | null> {
        return this.redis.get(key)
    }

    async set(key: string, value: string, ttl: number): Promise<void> {
        await this.redis.set(key, value, 'EX', ttl)
    }

    async delete(key: string): Promise<void> {
        await this.redis.del(key)
    }
}
