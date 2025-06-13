import { CacheModuleOptions } from '@nestjs/cache-manager'
import { ConfigService } from '@nestjs/config'

import { DEFAULT_CACHE_TTL } from '../../constants/cache.constants'

export const getCacheModuleConfig = async (
    configService: ConfigService
    // eslint-disable-next-line
): Promise<CacheModuleOptions> => {
    return {
        ttl: configService.get<number>('CACHE_TTL', DEFAULT_CACHE_TTL),
        isGlobal: false,
    }
}
