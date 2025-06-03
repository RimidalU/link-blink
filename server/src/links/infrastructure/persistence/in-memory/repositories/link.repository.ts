import { Injectable } from '@nestjs/common'
import { Link } from '@src/links/domain/link'
import { AnalyticsDto } from '@src/links/presenters/http/dto/analytics.dto'
import { LinkInfoDto } from '@src/links/presenters/http/dto/link-info.dto'
import { LinkRepository } from '@src/links/application/ports/links.repository'

import { LinkMapper } from '../mappers/link.mapper'
import { LinkNotFoundException } from '../../exception/link-not-found.exception'
import { LinkEntity } from '../entities/link.entities'
import { InternalServerException } from '../../exception/internal-server-exception.exception'

@Injectable()
export class InMemoryLinkRepository implements LinkRepository {
    private readonly links = new Map<number, LinkEntity>()
    private currentId = 0
    constructor() {}

    async create(link: Link): Promise<Link> {
        try {
            this.currentId++

            const presentersLinkModel = LinkMapper.toPersistence(link)
            presentersLinkModel.id = this.currentId

            this.links.set(presentersLinkModel.id, presentersLinkModel)

            const newLinkEntity = this.links.get(presentersLinkModel.id)

            if (!newLinkEntity) {
                throw new InternalServerException()
            }

            return Promise.resolve(LinkMapper.toDomain(newLinkEntity))
        } catch {
            throw new InternalServerException()
        }
    }

    async findByAlias(alias: string): Promise<Link | null> {
        try {
            const linkEntity = Array.from(this.links.values()).find(
                (link) => link.alias === alias
            )
            if (!linkEntity) {
                throw new LinkNotFoundException(alias)
            }
            return Promise.resolve(LinkMapper.toDomain(linkEntity))
        } catch {
            throw new InternalServerException()
        }
    }

    async deleteByAlias(alias: string): Promise<void> {
        try {
            const linkEntity = await this.findByAlias(alias)
            if (!linkEntity) {
                return
            }
            this.links.delete(linkEntity.id)
        } catch {
            throw new InternalServerException()
        }
    }

    async getInfo(alias: string): Promise<LinkInfoDto> {
        try {
            const linkEntity = await this.findByAlias(alias)
            if (!linkEntity) {
                throw new LinkNotFoundException(alias)
            }
            const link = LinkMapper.toDomain(linkEntity)

            return Promise.resolve({
                originalUrl: link.originalUrl,
                createdAt: link.createdAt,
                clickCount: link.clickCount,
            })
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
            this.links.set(link.id, link)
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
            return Promise.resolve({
                clickCount: link.clickCount,
                lastIps: link.lastIps || [],
            })
        } catch {
            throw new InternalServerException()
        }
    }
}
