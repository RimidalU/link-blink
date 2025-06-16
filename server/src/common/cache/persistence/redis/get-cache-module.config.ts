import { ConfigService } from '@nestjs/config'
import { RedisModuleOptions } from '@nestjs-modules/ioredis'

const DEFAULT_CACHE_URL = 'redis://localhost:6379'

export const getCacheModuleConfig = async (
    configService: ConfigService
    // eslint-disable-next-line
): Promise<RedisModuleOptions> => {
    return {
        type: 'single',
        url: configService.get<string>('REDIS_URL', DEFAULT_CACHE_URL),
    }
}
