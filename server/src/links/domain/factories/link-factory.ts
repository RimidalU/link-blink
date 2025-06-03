import { Link } from '../link'

interface CreateLinkParams {
    alias: string
    originalUrl: string
    expiresAt?: Date
}

export class LinkFactory {
    static create(params: CreateLinkParams): Link {
        const { alias, originalUrl, expiresAt } = params
        const id = -1
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
