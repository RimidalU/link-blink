import { Injectable } from '@nestjs/common'

import { LinkInfoDto } from '../presenters/http/dto/link-info.dto'
import { AnalyticsDto } from '../presenters/http/dto/analytics.dto'
import { LinkFactory } from '../domain/factories/link-factory'

import { CreateLinkCommand } from './commands/create-link.command'
import { LinkRepository } from './ports/links.repository'
import { generateAlias } from './utils/generate-alias'
import { AliasAlreadyInUseException } from './exception/alias-already-in-use.exception'
import { LinkNotFoundException } from './exception/link-not-found.exception'

@Injectable()
export class LinksService {
    constructor(
        private readonly linkRepository: LinkRepository,
        private readonly linkFactory: LinkFactory
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

    async getOriginalUrl(alias: string): Promise<string> {
        const link = await this.linkRepository.findByAlias(alias)
        if (!link) {
            throw new LinkNotFoundException(alias)
        }
        //TODO: implement check  IP
        await this.linkRepository.updateAnalytics(alias, 'ip')
        return link.originalUrl
    }

    async getLinkInfo(alias: string): Promise<LinkInfoDto> {
        const link = await this.linkRepository.findByAlias(alias)
        if (!link) {
            throw new LinkNotFoundException(alias)
        }

        return await this.linkRepository.getInfo(alias)
    }

    async deleteLink(alias: string): Promise<string> {
        return await this.linkRepository.deleteByAlias(alias)
    }

    getAnalytics(shortUrl: string): AnalyticsDto {
        return {
            clickCount: shortUrl.length,
            lastIps: [],
        }
    }
}
