import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Link } from '@src/links/domain/link'
import { AnalyticsDto } from '@src/links/presenters/http/dto/analytics.dto'
import { LinkInfoDto } from '@src/links/presenters/http/dto/link-info.dto'
import { LinkRepository } from '@src/links/application/ports/links.repository'

import { LinkMapper } from '../mappers/link.mapper'
import { LinkNotFoundException } from '../../exception/link-not-found.exception'
import { InternalServerException } from '../../exception/internal-server-exception.exception'

@Injectable()
export class TypeOrmLinkRepository implements LinkRepository {
    constructor(
        @InjectRepository(Link)
        private readonly repository: Repository<Link>
    ) {}

    async create(link: Link): Promise<Link> {
        try {
            const presentersLinkModel = LinkMapper.toPersistence(link)

            const newLinkEntity =
                await this.repository.save(presentersLinkModel)

            return LinkMapper.toDomain(newLinkEntity)
        } catch {
            throw new InternalServerException()
        }
    }

    async findByShortCode(shortCode: string): Promise<Link | null> {
        try {
            const linkEntity = await this.repository.findOne({
                where: { shortCode },
            })
            if (!linkEntity) {
                throw new LinkNotFoundException(shortCode)
            }
            return LinkMapper.toDomain(linkEntity)
        } catch {
            throw new InternalServerException()
        }
    }

    async deleteByShortCode(shortCode: string): Promise<void> {
        await this.repository.delete({ shortCode })
    }

    async getInfo(shortCode: string): Promise<LinkInfoDto> {
        try {
            const linkEntity = await this.findByShortCode(shortCode)
            if (!linkEntity) {
                throw new LinkNotFoundException(shortCode)
            }
            const link = LinkMapper.toDomain(linkEntity)

            return {
                originalUrl: link.originalUrl,
                createdAt: link.createdAt,
                clickCount: link.clickCount,
            }
        } catch {
            throw new InternalServerException()
        }
    }

    async updateAnalytics(shortCode: string, ip: string): Promise<void> {
        try {
            const link = await this.findByShortCode(shortCode)
            if (!link) {
                throw new LinkNotFoundException(shortCode)
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

    async getAnalytics(shortCode: string): Promise<AnalyticsDto> {
        try {
            const link = await this.findByShortCode(shortCode)
            if (!link) {
                throw new LinkNotFoundException(shortCode)
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
