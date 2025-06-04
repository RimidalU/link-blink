import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Link } from '@src/links/domain/link'
import { AnalyticsDto } from '@src/links/presenters/http/dto/analytics.dto'
import { LinkInfoDto } from '@src/links/presenters/http/dto/link-info.dto'
import { LinkRepository } from '@src/links/application/ports/links.repository'

import { LinkNotFoundException } from '../../exception/link-not-found.exception'
import { InternalServerException } from '../../exception/internal-server-exception.exception'
import { LinkEntity } from '../entities/link.entity'
import { LinkMapper } from '../../mappers/link.mapper'

@Injectable()
export class TypeOrmLinkRepository implements LinkRepository {
    constructor(
        @InjectRepository(LinkEntity)
        private readonly repository: Repository<LinkEntity>
    ) {}

    async create(link: Link): Promise<string> {
        try {
            const presentersLinkModel = LinkMapper.toPersistence(link)

            const newLinkEntity =
                await this.repository.save(presentersLinkModel)

            return LinkMapper.toCreateLinkResponseDto(newLinkEntity)
        } catch {
            throw new InternalServerException()
        }
    }

    async findByAlias(alias: string): Promise<Link | null> {
        try {
            const linkEntity = await this.repository.findOne({
                where: { alias },
            })
            if (!linkEntity) {
                return null
            }
            return LinkMapper.toDomain(linkEntity)
        } catch {
            throw new InternalServerException()
        }
    }

    async deleteByAlias(alias: string): Promise<void> {
        await this.repository.delete({ alias })
    }

    async getInfo(alias: string): Promise<LinkInfoDto> {
        try {
            const linkEntity = await this.findByAlias(alias)
            if (!linkEntity) {
                throw new LinkNotFoundException(alias)
            }
            return LinkMapper.toInfoDto(linkEntity)
        } catch {
            throw new InternalServerException()
        }
    }

    async updateAnalytics(alias: string, ip: string): Promise<void> {
        try {
            const link = await this.findByAlias(alias)
            if (!link) {
                throw new LinkNotFoundException(alias)
            }
            link.clickCount += 1
            link.lastIps = link.lastIps || []
            link.lastIps.unshift(ip)
            if (link.lastIps.length > 5) {
                link.lastIps = link.lastIps.slice(0, 5)
            }
            await this.repository.save(link)
        } catch {
            throw new InternalServerException()
        }
    }

    async getAnalytics(alias: string): Promise<AnalyticsDto> {
        try {
            const link = await this.findByAlias(alias)
            if (!link) {
                throw new LinkNotFoundException(alias)
            }
            return {
                clickCount: link.clickCount,
                lastIps: link.lastIps || [],
            }
        } catch {
            throw new InternalServerException()
        }
    }
}
