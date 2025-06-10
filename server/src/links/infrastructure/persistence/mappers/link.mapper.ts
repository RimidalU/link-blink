import { Link } from '@src/links/domain/link'
import { LinkInfoDto } from '@src/links/presenters/http/dto/link-info.dto'
import { AnalyticsDto } from '@src/links/presenters/http/dto/analytics.dto'
import { OriginalUrlDto } from '@src/links/presenters/http/dto/original-url.dto'

import { LinkEntity } from '../in-memory/entities/link.entities'

export class LinkMapper {
    // Entity → Domain
    static toDomain(linkEntity: LinkEntity): Link {
        return new Link(
            linkEntity.id,
            linkEntity.alias,
            linkEntity.originalUrl,
            linkEntity.createdAt,
            linkEntity.expiresAt
        )
    }

    // Domain → Entity
    static toPersistence(link: Link): LinkEntity {
        const entity = new LinkEntity()
        entity.id = link.id
        entity.alias = link.alias
        entity.originalUrl = link.originalUrl
        entity.createdAt = link.createdAt
        entity.expiresAt = link.expiresAt

        return entity
    }

    // Domain → CreateLinkResponseDto
    static toCreateLinkResponseDto(link: Link): string {
        return link.alias
    }

    // Domain → LinkInfoDto
    static toInfoDto(
        originalUrl: string,
        createdAt: Date,
        clickCount: number
    ): LinkInfoDto {
        return {
            originalUrl,
            createdAt,
            clickCount,
        }
    }

    // Domain → AnalyticsDto
    static toAnalyticsDto(clickCount: number, lastIps: string[]): AnalyticsDto {
        return {
            clickCount,
            lastIps,
        }
    }

    // Domain → OriginalUrl
    static toOriginalUrl(link: Link): OriginalUrlDto {
        return { originalUrl: link.originalUrl, id: link.id }
    }
}
