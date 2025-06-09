import { LinkClick } from '@src/links/domain/link-click'

export abstract class LinkClicksRepository {
    abstract create(linkClick: LinkClick): Promise<void>
}
