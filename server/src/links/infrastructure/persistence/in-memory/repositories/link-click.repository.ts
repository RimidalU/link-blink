import { Injectable } from '@nestjs/common'
import { LinkClicksRepository } from '@src/links/application/ports/link-clicks.repository'
import { LinkClick } from '@src/links/domain/link-click'

import { InternalServerException } from '../../exception/internal-server-exception.exception'
import { LinkClickEntity } from '../entities/link-click.entities'
import { LinkClickMapper } from '../../mappers/link-click.mapper'

@Injectable()
export class InMemoryLinkClickRepository implements LinkClicksRepository {
    private readonly linkClicks = new Map<number, LinkClickEntity>()
    private currentId = 0

    async create(linkClick: LinkClick): Promise<void> {
        try {
            this.currentId++

            const presentersLinkModel = LinkClickMapper.toPersistence(linkClick)
            presentersLinkModel.id = this.currentId

            this.linkClicks.set(presentersLinkModel.id, presentersLinkModel)

            const newLinkClickEntity = this.linkClicks.get(
                presentersLinkModel.id
            )

            if (!newLinkClickEntity) {
                throw new InternalServerException()
            }
            await Promise.resolve()
        } catch {
            throw new InternalServerException()
        }
    }
}
