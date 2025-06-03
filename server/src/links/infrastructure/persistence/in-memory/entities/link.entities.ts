export class LinkEntity {
    id: number
    alias: string
    originalUrl: string
    createdAt: Date
    clickCount: number
    lastIps?: string[]
    expiresAt?: Date
}
