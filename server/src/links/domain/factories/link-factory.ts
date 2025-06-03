import { Link } from '../link'

interface CreateLinkParams {
    id: number
    alias: string
    originalUrl: string
    expiresAt?: Date
}

export class LinkFactory {
    static create(params: CreateLinkParams): Link {
        const { id, alias, originalUrl, expiresAt } = params
        const createdAt = new Date()
        const clickCount = 0
        const lastIps: string[] = []

        return new Link(
            id,
            alias,
            originalUrl,
            createdAt,
            clickCount,
            lastIps,
            expiresAt
        )
    }
}
