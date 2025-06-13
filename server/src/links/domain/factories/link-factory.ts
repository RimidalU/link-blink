import { Link } from '../link'

interface CreateLinkParams {
    alias: string
    originalUrl: string
    expiresAt?: Date
}

export class LinkFactory {
    create(params: CreateLinkParams): Link {
        const { alias, originalUrl } = params
        let { expiresAt } = params

        const id = -1
        const createdAt = new Date()

        if (expiresAt === undefined || expiresAt <= createdAt) {
            expiresAt = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000)
        }

        return new Link(id, alias, originalUrl, createdAt, expiresAt)
    }
}
