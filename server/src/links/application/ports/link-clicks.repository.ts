import { LinkClick } from '@src/links/domain/link-click'

export abstract class LinkClicksRepository {
    abstract create(linkClick: LinkClick): Promise<void>
    abstract countByLinkId(linkId: number): Promise<number>
    abstract getLastIpsByLinkId(
        linkId: number,
        limit?: number
    ): Promise<string[]>
}
