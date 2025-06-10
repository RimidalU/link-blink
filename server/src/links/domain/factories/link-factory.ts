import { Link } from '../link'

interface CreateLinkParams {
    alias: string
    originalUrl: string
    expiresAt?: Date
}

export class LinkFactory {
    create(params: CreateLinkParams): Link {
        const { alias, originalUrl, expiresAt } = params
        const id = -1
        const createdAt = new Date()

        return new Link(id, alias, originalUrl, createdAt, expiresAt)
    }
}
