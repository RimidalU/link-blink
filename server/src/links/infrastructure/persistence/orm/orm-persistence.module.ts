import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LinkRepository } from '@src/links/application/ports/links.repository'

import { LinkEntity } from './entities/link.entity'
import { TypeOrmLinkRepository } from './repositories/link.repository'

@Module({
    imports: [TypeOrmModule.forFeature([LinkEntity])],
    providers: [
        TypeOrmLinkRepository,
        {
            provide: LinkRepository,
            useClass: TypeOrmLinkRepository,
        },
    ],
    exports: [LinkRepository],
})
export class OrmLinkPersistenceModule {}
