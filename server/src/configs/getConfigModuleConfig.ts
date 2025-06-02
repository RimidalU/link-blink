import { ConfigModuleOptions } from '@nestjs/config'
import { envSchema } from 'src/env/env'

export const getConfigModuleConfig = (): ConfigModuleOptions => {
    return {
        isGlobal: true,
        validate: (env) => envSchema.parse(env),
        envFilePath: `../.env`,
    }
}
