import { Injectable } from '@nestjs/common'

import { LinkInfoDto } from '../presenters/http/dto/link-info.dto'
import { AnalyticsDto } from '../presenters/http/dto/analytics.dto'
import { LinkFactory } from '../domain/factories/link-factory'
import { LinkClickFactory } from '../domain/factories/link-click-factory'

import { CreateLinkCommand } from './commands/create-link.command'
import { LinkRepository } from './ports/links.repository'
import { generateAlias } from './utils/generate-alias'
import { AliasAlreadyInUseException } from './exception/alias-already-in-use.exception'
import { LinkNotFoundException } from './exception/link-not-found.exception'
import { GetOriginalUrlCommand } from './commands/get-original-url.command'
import { GetLinkInfoCommand } from './commands/get-link-info.command'
import { DeleteLinkCommand } from './commands/delete-link.command'
import { GetLinkAnalyticsCommand } from './commands/get-link-analytics.command'
import { LinkClicksRepository } from './ports/link-clicks.repository'

@Injectable()
export class LinksService {
    constructor(
        private readonly linkRepository: LinkRepository,
        private readonly linkClicksRepository: LinkClicksRepository,
        private readonly linkFactory: LinkFactory,
        private readonly linkClickFactory: LinkClickFactory
    ) {}
    async createLink(createLinkDto: CreateLinkCommand): Promise<string> {
        let { alias } = createLinkDto
        const { originalUrl, expiresAt } = createLinkDto

        if (!alias) {
            alias = generateAlias()
        } else {
            const exists = await this.linkRepository.findByAlias(alias)
            if (exists) {
                throw new AliasAlreadyInUseException(alias)
            }
        }

        const newLink = this.linkFactory.create({
            alias: alias,
            originalUrl: originalUrl,
            expiresAt: expiresAt,
        })

        return this.linkRepository.create(newLink)
    }

    async getOriginalUrl(
        getOriginalUrlDTO: GetOriginalUrlCommand
    ): Promise<string> {
        const { alias, ip } = getOriginalUrlDTO
        const link = await this.linkRepository.getOriginalUrl(alias, ip)

        if (!link) {
            throw new LinkNotFoundException(alias)
        }

        const newLinkClick = this.linkClickFactory.create({
            alias,
            ip,
        })
        await this.linkClicksRepository.create(newLinkClick)

        return link.originalUrl
    }

    async getLinkInfo(
        getLinkInfoDTO: GetLinkInfoCommand
    ): Promise<LinkInfoDto> {
        const { alias } = getLinkInfoDTO
        const link = await this.linkRepository.findByAlias(alias)
        if (!link) {
            throw new LinkNotFoundException(alias)
        }
        return await this.linkRepository.getInfo(alias)
    }

    async deleteLink(deleteLinkDTO: DeleteLinkCommand): Promise<string> {
        const { alias } = deleteLinkDTO
        return await this.linkRepository.deleteByAlias(alias)
    }

    async getAnalytics(
        getLinkAnalyticsDTO: GetLinkAnalyticsCommand
    ): Promise<AnalyticsDto> {
        const { alias } = getLinkAnalyticsDTO
        const link = await this.linkRepository.findByAlias(alias)
        if (!link) {
            throw new LinkNotFoundException(alias)
        }

        return await this.linkRepository.getAnalytics(alias)
    }
}
