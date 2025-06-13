import { DynamicModule, Global, Module, Type } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Global()
@Module({
    imports: [ConfigModule],
})
export class CacheModule {
    static withInfrastructure(cacheInfrastructureModule: Type | DynamicModule) {
        return {
            module: CacheModule,
            imports: [cacheInfrastructureModule],
            exports: [cacheInfrastructureModule],
        }
    }
}
