export class LinkEntity {
    id: number
    shortCode: string
    originalUrl: string
    createdAt: Date
    clickCount: number
    lastIps?: string[]
    expiresAt?: Date
}
