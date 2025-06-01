import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LinksModule } from './links/application/links.module'

@Module({
    imports: [LinksModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
