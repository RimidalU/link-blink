import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Equal, Repository } from 'typeorm'
import { LinkClicksRepository } from '@src/links/application/ports/link-clicks.repository'
import { LinkClick } from '@src/links/domain/link-click'
import { ANALYTICS_LAST_IPS_LIMIT } from '@src/links/constants/analytics.constants'

import { InternalServerException } from '../../exception/internal-server-exception.exception'
import { LinkClickMapper } from '../../mappers/link-click.mapper'
import { LinkClickEntity } from '../entities/link-click.entity'

@Injectable()
export class TypeOrmLinkClickRepository implements LinkClicksRepository {
    constructor(
        @InjectRepository(LinkClickEntity)
        private readonly repository: Repository<LinkClickEntity>
    ) {}

    async create(linkClick: LinkClick): Promise<void> {
        try {
            const presentersLinkModel = LinkClickMapper.toPersistence(linkClick)
            await this.repository.save(presentersLinkModel)
        } catch {
            throw new InternalServerException()
        }
    }
    async countByLinkId(linkId: number): Promise<number> {
        try {
            return await this.repository.countBy({
                link: { id: Equal(linkId) },
            })
        } catch {
            throw new InternalServerException()
        }
    }

    async getLastIpsByLinkId(
        linkId: number,
        limit = ANALYTICS_LAST_IPS_LIMIT
    ): Promise<string[]> {
        try {
            const clicks = await this.repository.find({
                where: { link: { id: linkId } },
                order: { createdAt: 'DESC' },
                take: limit,
                // select: ['ipAddress'],
            })
            return clicks.map((c) => c.ipAddress)
        } catch {
            throw new InternalServerException()
        }
    }
}
