import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { LinkClicksRepository } from '@src/links/application/ports/link-clicks.repository'
import { LinkClick } from '@src/links/domain/link-click'

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
}
