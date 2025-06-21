import { ConfigService } from '@nestjs/config'
import * as Bull from 'bullmq'

const DEFAULT_CACHE_URL = 'redis://localhost:6379'
const DEFAULT_ATTEMPTS = 2
const REMOVE_ON_COMPLETE = 1000
const REMOVE_ON_FAIL = 3000

export const getBullmqQueuePersistenceModuleConfig = async (
    configService: ConfigService
    // eslint-disable-next-line
): Promise<Bull.QueueOptions> => {
    return {
        connection: {
            url: configService.get<string>('REDIS_URL', DEFAULT_CACHE_URL),
        },
        defaultJobOptions: {
            removeOnComplete: REMOVE_ON_COMPLETE,
            removeOnFail: REMOVE_ON_FAIL,
            attempts: DEFAULT_ATTEMPTS,
        },
    }
}
