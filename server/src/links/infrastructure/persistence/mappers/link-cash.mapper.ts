import { Link } from '@src/links/domain/link'

import { LinkEntity } from '../in-memory/entities/link.entities'

export class LinkCacheMapper {
    // Persistence (plain object) → Domain
    static toDomain(raw: LinkEntity): Link {
        return new Link(
            raw.id,
            raw.alias,
            raw.originalUrl,
            new Date(raw.createdAt),
            raw.expiresAt ? new Date(raw.expiresAt) : undefined
        )
    }

    // Domain → Persistence (plain object)
    static toPersistence(link: Link): LinkEntity {
        return {
            id: link.id,
            alias: link.alias,
            originalUrl: link.originalUrl,
            createdAt: link.createdAt,
            expiresAt: link.expiresAt ? link.expiresAt : undefined,
        }
    }

    // Domain → JSON string
    static toJSON(link: Link): string {
        const persistence = this.toPersistence(link)
        return JSON.stringify(persistence)
    }

    // JSON string → Domain
    static fromJSON(json: string): Link {
        const raw = JSON.parse(json) as LinkEntity
        return this.toDomain(raw)
    }
}
