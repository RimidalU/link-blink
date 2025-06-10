import { Link } from '../link'
import { LinkClick } from '../link-click'

interface CreateLinkClickParams {
    link: Link
    ip: string
}

export class LinkClickFactory {
    create(params: CreateLinkClickParams): LinkClick {
        const { link, ip } = params
        const id = -1
        const createdAt = new Date()

        return new LinkClick(id, ip, createdAt, link)
    }
}
