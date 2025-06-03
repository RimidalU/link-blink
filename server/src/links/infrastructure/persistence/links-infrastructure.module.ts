import { Module } from '@nestjs/common'

import { InMemoryLinkPersistenceModule } from './in-memory/in-memory-persistence.module'
import { OrmLinkPersistenceModule } from './orm/orm-persistence.module'

type DRIVER_TYPE = 'orm' | 'in-memory'

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
