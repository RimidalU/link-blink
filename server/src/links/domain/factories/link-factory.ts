import { Link } from '../link'

interface CreateLinkParams {
    id: number
    shortCode: string
    originalUrl: string
    expiresAt?: Date
}

export class LinkFactory {
    static create(params: CreateLinkParams): Link {
        const { id, shortCode, originalUrl, expiresAt } = params
        const createdAt = new Date()
        const clickCount = 0

        return new Link(
            id,
            shortCode,
            originalUrl,
            createdAt,
            clickCount,
            expiresAt
        )
    }
}
