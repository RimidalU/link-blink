import { Injectable } from '@nestjs/common'

import { LinkInfoDto } from '../presenters/http/dto/link-info.dto'
import { AnalyticsDto } from '../presenters/http/dto/analytics.dto'
import { LinkFactory } from '../domain/factories/link-factory'

import { CreateLinkCommand } from './commands/create-link.command'
import { LinkRepository } from './ports/links.repository'

@Injectable()
export class LinksService {
    constructor(
        private readonly linkRepository: LinkRepository,
        private readonly LinkFactory: LinkFactory
    ) {}
    createLink(createLinkDto: CreateLinkCommand) {
        const newLink = LinkFactory.create({
            shortCode: createLinkDto.alias,
            originalUrl: createLinkDto.originalUrl,
            expiresAt: createLinkDto.expiresAt,
        })

        return this.linkRepository.create(newLink)
    }

    getOriginalUrl(shortUrl: string): string | null {
        return `https://www.google.com/search?q=${shortUrl}`
    }

    getLinkInfo(shortUrl: string): LinkInfoDto {
        const linkInfo: LinkInfoDto = {
            originalUrl: `original url for ${shortUrl}`,
            createdAt: new Date(),
            clickCount: 0,
        }
        return linkInfo
    }

    deleteLink(shortUrl: string) {
        return `This action removes a #${shortUrl} link`
    }

    getAnalytics(shortUrl: string): AnalyticsDto {
        return {
            clickCount: shortUrl.length,
            lastIps: [],
        }
    }
}
