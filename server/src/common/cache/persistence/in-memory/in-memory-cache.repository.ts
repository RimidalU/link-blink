import { Injectable } from '@nestjs/common'

import { CacheRepository } from '../../ports/cache.repository'

interface CacheItem {
    value: string
    expiresAt: number
}

@Injectable()
export class InMemoryCacheRepository extends CacheRepository {
    private cache = new Map<string, CacheItem>()

    async get(key: string): Promise<string | null> {
        const item = this.cache.get(key)
        if (!item) return null
        if (Date.now() > item.expiresAt) {
            this.cache.delete(key)
            return Promise.resolve(null)
        }
        return Promise.resolve(item.value)
    }

    async set(key: string, value: string, ttl: number): Promise<void> {
        const expiresAt = Date.now() + ttl * 1000
        this.cache.set(key, { value, expiresAt })
        return Promise.resolve()
    }

    async delete(key: string): Promise<void> {
        this.cache.delete(key)
        return Promise.resolve()
    }
}
