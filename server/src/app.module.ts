import { DynamicModule, Module, Type } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LinksModule } from './links/application/links.module'
import { getConfigModuleConfig } from './common/configs/getConfigModuleConfig'
import { ApplicationBootstrapOptions } from './common/interfaces/application-bootstrap-options'
import { LinksInfrastructureModule } from './links/infrastructure/persistence/links-infrastructure.module'
import { DatabaseModule } from './common/database/database.module'
import { CacheModule } from './common/cache/cache.module'
import { CacheInfrastructureModule } from './common/cache/persistence/cache-infrastructure.module'
import { QueueModule } from './common/queue/queue.module'

@Module({
    imports: [
        ConfigModule.forRoot(getConfigModuleConfig()),
        DatabaseModule,
        QueueModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    static register(options: ApplicationBootstrapOptions): DynamicModule {
        const importsArray: (Type<any> | DynamicModule)[] = [
            LinksModule.withInfrastructure(
                LinksInfrastructureModule.use(options.DBdriver)
            ),
            CacheModule.withInfrastructure(
                CacheInfrastructureModule.use(options.cacheDriver)
            ),
        ]

        return {
            module: AppModule,
            imports: importsArray,
        }
    }
}
