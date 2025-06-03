import { Link } from '@src/links/domain/link'
import { LinkInfoDto } from '@src/links/presenters/http/dto/link-info.dto'
import { AnalyticsDto } from '@src/links/presenters/http/dto/analytics.dto'

import { LinkEntity } from '../entities/link.entities'

export class LinkMapper {
    // Entity → Domain
    static toDomain(linkEntity: LinkEntity): Link {
        return new Link(
            linkEntity.id,
            linkEntity.alias,
            linkEntity.originalUrl,
            linkEntity.createdAt,
            linkEntity.clickCount,
            linkEntity.lastIps,
            linkEntity.expiresAt
        )
    }

    // Domain → Entity
    static toPersistence(link: Link): LinkEntity {
        const entity = new LinkEntity()

        if (link.id !== -1) {
            entity.id = link.id
        }
        entity.alias = link.alias
        entity.originalUrl = link.originalUrl
        entity.createdAt = link.createdAt
        entity.clickCount = link.clickCount
        entity.expiresAt = link.expiresAt
        entity.lastIps = link.lastIps

        return entity
    }

    // Domain → LinkInfoDto
    static toInfoDto(link: Link): LinkInfoDto {
        return {
            originalUrl: link.originalUrl,
            createdAt: link.createdAt,
            clickCount: link.clickCount,
        }
    }

    // Domain → AnalyticsDto
    static toAnalyticsDto(link: Link): AnalyticsDto {
        return {
            clickCount: link.clickCount,
            lastIps: link.lastIps ?? [],
        }
    }
}
