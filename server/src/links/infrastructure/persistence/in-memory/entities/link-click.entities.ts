import { LinkEntity } from './link.entities'

export class LinkClickEntity {
    id: number
    link: LinkEntity
    ipAddress: string
    createdAt: Date
}
