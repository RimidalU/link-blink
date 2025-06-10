import { Link } from '@src/links/domain/link'
import { AnalyticsDto } from '@src/links/presenters/http/dto/analytics.dto'
import { LinkInfoDto } from '@src/links/presenters/http/dto/link-info.dto'

export abstract class LinkRepository {
    abstract create(link: Link): Promise<string>
    abstract findByAlias(alias: string): Promise<Link | null>
    abstract findByLinkId(linkIdi: number): Promise<Link | null>
    abstract deleteByAlias(alias: string): Promise<string>
    abstract getInfo(alias: string): Promise<LinkInfoDto>
    abstract getAnalytics(alias: string): Promise<AnalyticsDto>
}
