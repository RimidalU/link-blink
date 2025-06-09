import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LinkRepository } from '@src/links/application/ports/links.repository'
import { LinkClicksRepository } from '@src/links/application/ports/link-clicks.repository'

import { LinkEntity } from './entities/link.entity'
import { TypeOrmLinkRepository } from './repositories/link.repository'
import { TypeOrmLinkClickRepository } from './repositories/link-click.repository'
import { LinkClickEntity } from './entities/link-click.entity'

@Module({
    imports: [TypeOrmModule.forFeature([LinkEntity, LinkClickEntity])],
    providers: [
        TypeOrmLinkRepository,
        {
            provide: LinkRepository,
            useClass: TypeOrmLinkRepository,
        },
        TypeOrmLinkClickRepository,
        {
            provide: LinkClicksRepository,
            useClass: TypeOrmLinkClickRepository,
        },
    ],
    exports: [LinkRepository, LinkClicksRepository],
})
export class OrmLinkPersistenceModule {}
