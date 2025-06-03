import { Module } from '@nestjs/common'
import { LinkRepository } from '@src/links/application/ports/links.repository'

import { InMemoryLinkRepository } from './repositories/link.repository'

@Module({
    imports: [],
    providers: [
        InMemoryLinkRepository,
        {
            provide: LinkRepository,
            useClass: InMemoryLinkRepository,
        },
    ],
    exports: [LinkRepository],
})
export class InMemoryLinkPersistenceModule {}
