import { Link } from '@src/links/domain/link'
import { AnalyticsDto } from '@src/links/presenters/http/dto/analytics.dto'
import { LinkInfoDto } from '@src/links/presenters/http/dto/link-info.dto'

export abstract class LinkRepository {
    abstract create(link: Link): Promise<Link>
    abstract findByShortCode(shortCode: string): Promise<Link | null>
    abstract deleteByShortCode(shortCode: string): Promise<void>
    abstract getInfo(shortCode: string): Promise<LinkInfoDto>
    abstract updateAnalytics(shortCode: string, ip: string): Promise<void>
    abstract getAnalytics(shortCode: string): Promise<AnalyticsDto>
}
