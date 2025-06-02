import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LinksModule } from './links/application/links.module'
import { getConfigModuleConfig } from './configs/getConfigModuleConfig'

@Module({
    imports: [ConfigModule.forRoot(getConfigModuleConfig()), LinksModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
