import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LinksModule } from './links/application/links.module'
import { getConfigModuleConfig } from './configs/getConfigModuleConfig'
import { ApplicationBootstrapOptions } from './common/interfaces/application-bootstrap-options'
import { LinksInfrastructureModule } from './links/infrastructure/persistence/links-infrastructure.module'
import { DatabaseModule } from './database/database.module'

@Module({
    imports: [ConfigModule.forRoot(getConfigModuleConfig()), DatabaseModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    static register(options: ApplicationBootstrapOptions): DynamicModule {
        return {
            module: AppModule,
            imports: [
                LinksModule.withInfrastructure(
                    LinksInfrastructureModule.use(options.driver)
                ),
            ],
        }
    }
}
