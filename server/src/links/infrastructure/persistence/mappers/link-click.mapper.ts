import { LinkClick } from '@src/links/domain/link-click'

import { LinkClickEntity } from '../in-memory/entities/link-click.entities'

export class LinkClickMapper {
    // Entity → Domain
    static toDomain(linkClickEntity: LinkClickEntity): LinkClick {
        return new LinkClick(
            linkClickEntity.id,
            linkClickEntity.ipAddress,
            linkClickEntity.createdAt,

            linkClickEntity.link
        )
    }

    // Domain → Entity
    static toPersistence(linkClick: LinkClick): LinkClickEntity {
        const entity = new LinkClickEntity()
        entity.id = linkClick.id
        entity.link = linkClick.link
        entity.ipAddress = linkClick.ipAddress
        entity.createdAt = linkClick.createdAt

        return entity
    }
}
