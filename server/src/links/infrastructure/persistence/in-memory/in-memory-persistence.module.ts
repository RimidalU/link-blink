import { Module } from '@nestjs/common'
import { LinkRepository } from '@src/links/application/ports/links.repository'
import { LinkClicksRepository } from '@src/links/application/ports/link-clicks.repository'

import { InMemoryLinkRepository } from './repositories/link.repository'
import { InMemoryLinkClickRepository } from './repositories/link-click.repository'

@Module({
    imports: [],
    providers: [
        InMemoryLinkRepository,
        {
            provide: LinkRepository,
            useClass: InMemoryLinkRepository,
        },
        InMemoryLinkClickRepository,
        {
            provide: LinkClicksRepository,
            useClass: InMemoryLinkClickRepository,
        },
    ],
    exports: [LinkRepository, LinkClicksRepository],
})
export class InMemoryLinkPersistenceModule {}
