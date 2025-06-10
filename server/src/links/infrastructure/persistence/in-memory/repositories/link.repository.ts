import { Injectable } from '@nestjs/common'
import { Link } from '@src/links/domain/link'
import { AnalyticsDto } from '@src/links/presenters/http/dto/analytics.dto'
import { LinkInfoDto } from '@src/links/presenters/http/dto/link-info.dto'
import { LinkRepository } from '@src/links/application/ports/links.repository'
import { LinkClicksRepository } from '@src/links/application/ports/link-clicks.repository'
import { ANALYTICS_LAST_IPS_LIMIT } from '@src/links/constants/analytics.constants'

import { LinkMapper } from '../../mappers/link.mapper'
import { LinkNotFoundException } from '../../exception/link-not-found.exception'
import { LinkEntity } from '../entities/link.entities'
import { InternalServerException } from '../../exception/internal-server-exception.exception'
@Injectable()
export class InMemoryLinkRepository implements LinkRepository {
    private readonly links = new Map<number, LinkEntity>()
    private currentId = 0

    constructor(private readonly linkClicksRepository: LinkClicksRepository) {}

    async create(link: Link): Promise<string> {
        try {
            this.currentId++

            const presentersLinkModel = LinkMapper.toPersistence(link)
            presentersLinkModel.id = this.currentId

            this.links.set(presentersLinkModel.id, presentersLinkModel)

            const newLinkEntity = this.links.get(presentersLinkModel.id)

            if (!newLinkEntity) {
                throw new InternalServerException()
            }

            return Promise.resolve(
                LinkMapper.toCreateLinkResponseDto(newLinkEntity)
            )
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
                return Promise.resolve(null)
            }
            return Promise.resolve(LinkMapper.toDomain(linkEntity))
        } catch {
            throw new InternalServerException()
        }
    }

    async findByLinkId(linkId: number): Promise<Link | null> {
        try {
            const linkEntity = this.links.get(linkId)
            if (!linkEntity) {
                return Promise.resolve(null)
            }
            return Promise.resolve(LinkMapper.toDomain(linkEntity))
        } catch {
            throw new InternalServerException()
        }
    }

    async deleteByAlias(alias: string): Promise<string> {
        try {
            const linkEntity = await this.findByAlias(alias)
            if (!linkEntity) {
                throw new LinkNotFoundException(alias)
            }
            this.links.delete(linkEntity.id)
            return alias
        } catch (error) {
            if (error instanceof LinkNotFoundException) {
                throw error
            }
            throw new InternalServerException()
        }
    }

    async getInfo(alias: string): Promise<LinkInfoDto> {
        try {
            const linkEntity = await this.findByAlias(alias)
            if (!linkEntity) {
                throw new LinkNotFoundException(alias)
            }
            const clickCount = await this.linkClicksRepository.countByLinkId(
                linkEntity.id
            )

            const link = LinkMapper.toInfoDto(
                linkEntity.originalUrl,
                linkEntity.createdAt,
                clickCount
            )

            return Promise.resolve(link)
        } catch (error) {
            if (error instanceof LinkNotFoundException) {
                throw error
            }
            throw new InternalServerException()
        }
    }

    async getAnalytics(alias: string): Promise<AnalyticsDto> {
        try {
            const link = await this.findByAlias(alias)
            if (!link) {
                throw new LinkNotFoundException(alias)
            }
            const clickCount = await this.linkClicksRepository.countByLinkId(
                link.id
            )

            const lastIps = await this.linkClicksRepository.getLastIpsByLinkId(
                link.id,
                ANALYTICS_LAST_IPS_LIMIT
            )

            return Promise.resolve({
                clickCount,
                lastIps,
            })
        } catch (error) {
            if (error instanceof LinkNotFoundException) {
                throw error
            }
            throw new InternalServerException()
        }
    }
}
