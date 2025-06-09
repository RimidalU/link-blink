import { LinkClick } from '../link-click'

interface CreateLinkClickParams {
    alias: string
    ip: string
}

export class LinkClickFactory {
    create(params: CreateLinkClickParams): LinkClick {
        const { alias, ip } = params
        const id = -1
        const createdAt = new Date()

        return new LinkClick(id, alias, ip, createdAt)
    }
}
