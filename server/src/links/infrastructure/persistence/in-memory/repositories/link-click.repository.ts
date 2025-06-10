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

    async countByLinkId(linkId: number): Promise<number> {
        try {
            const count = Array.from(this.linkClicks.values()).filter(
                (c) => c.link.id === linkId
            ).length

            return await Promise.resolve(count)
        } catch {
            throw new InternalServerException()
        }
    }

    async getLastIpsByLinkId(linkId: number, limit: number): Promise<string[]> {
        try {
            const lastIps = Array.from(this.linkClicks.values())
                .filter((c) => c.link.id === linkId)
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                .map((c) => c.ipAddress)
                .slice(0, limit)

            return await Promise.resolve(lastIps)
        } catch {
            throw new InternalServerException()
        }
    }
}
