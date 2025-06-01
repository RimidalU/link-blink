import { Injectable } from '@nestjs/common'

import { LinkInfoDto } from '../presenters/http/dto/link-info.dto'
import { AnalyticsDto } from '../presenters/http/dto/analytics.dto'

import { CreateLinkCommand } from './commands/create-link.command'

@Injectable()
export class LinksService {
    createLink(createLinkDto: CreateLinkCommand) {
        return `This action adds a new link with ${JSON.stringify(createLinkDto)} body`
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
