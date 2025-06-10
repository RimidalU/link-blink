import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Link } from '@src/links/domain/link'
import { AnalyticsDto } from '@src/links/presenters/http/dto/analytics.dto'
import { LinkInfoDto } from '@src/links/presenters/http/dto/link-info.dto'
import { LinkRepository } from '@src/links/application/ports/links.repository'
import { LinkClicksRepository } from '@src/links/application/ports/link-clicks.repository'

import { LinkNotFoundException } from '../../exception/link-not-found.exception'
import { InternalServerException } from '../../exception/internal-server-exception.exception'
import { LinkEntity } from '../entities/link.entity'
import { LinkMapper } from '../../mappers/link.mapper'

@Injectable()
export class TypeOrmLinkRepository implements LinkRepository {
    constructor(
        @InjectRepository(LinkEntity)
        private readonly repository: Repository<LinkEntity>,
        private readonly linkClicksRepository: LinkClicksRepository
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
            const linkEntity = await this.repository.findOneBy({ alias })
            if (!linkEntity) {
                return null
            }
            return LinkMapper.toDomain(linkEntity)
        } catch {
            throw new InternalServerException()
        }
    }

    async findByLinkId(linkId: number): Promise<Link | null> {
        try {
            const linkEntity = await this.repository.findOneBy({ id: linkId })
            if (!linkEntity) {
                return null
            }
            return LinkMapper.toDomain(linkEntity)
        } catch {
            throw new InternalServerException()
        }
    }

    async deleteByAlias(alias: string): Promise<string> {
        try {
            const result = await this.repository.delete({ alias })

            if (!result.affected) {
                throw new LinkNotFoundException(alias)
            }
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
            return LinkMapper.toInfoDto(
                linkEntity.originalUrl,
                linkEntity.createdAt,
                clickCount
            )
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
                link.id
            )
            return {
                clickCount,
                lastIps,
            }
        } catch (error) {
            if (error instanceof LinkNotFoundException) {
                throw error
            }
            throw new InternalServerException()
        }
    }
}
