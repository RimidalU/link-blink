import { Module } from '@nestjs/common'
import { DRIVER_TYPE } from '@src/common/interfaces/application-bootstrap-options'

import { InMemoryLinkPersistenceModule } from './in-memory/in-memory-persistence.module'
import { OrmLinkPersistenceModule } from './orm/orm-persistence.module'

@Module({})
export class LinksInfrastructureModule {
    static use(driver: DRIVER_TYPE) {
        const presentersModule =
            driver === 'orm'
                ? OrmLinkPersistenceModule
                : InMemoryLinkPersistenceModule

        return {
            module: LinksInfrastructureModule,
            imports: [presentersModule],
            exports: [presentersModule],
        }
    }
}
