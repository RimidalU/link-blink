import { Injectable } from '@nestjs/common'
import { CacheRepository } from '@src/common/cache/ports/cache.repository'

import { LinkInfoDto } from '../presenters/http/dto/link-info.dto'
import { AnalyticsDto } from '../presenters/http/dto/analytics.dto'
import { LinkFactory } from '../domain/factories/link-factory'
import { LinkClickFactory } from '../domain/factories/link-click-factory'
import { Link } from '../domain/link'
import { LinkCacheMapper } from '../infrastructure/persistence/mappers/link-cash.mapper'

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

const REDIRECT_CACHE_TTL = 24 * 60 * 60 * 1000 //  24 hours

@Injectable()
export class LinksService {
    constructor(
        private readonly linkRepository: LinkRepository,
        private readonly linkClicksRepository: LinkClicksRepository,
        private readonly linkFactory: LinkFactory,
        private readonly linkClickFactory: LinkClickFactory,
        private readonly cacheRepository: CacheRepository
    ) {}
    async createLink(createLinkDto: CreateLinkCommand): Promise<string> {
        let { alias } = createLinkDto
        const { originalUrl, expiresAt } = createLinkDto

        if (!alias) {
            alias = generateAlias()
        } else {
            const existingLink = await this.linkRepository.findByAlias(alias)
            if (existingLink) {
                if (
                    existingLink.expiresAt &&
                    existingLink.expiresAt <= new Date()
                ) {
                    await this.linkRepository.deleteByAlias(alias)
                } else {
                    throw new AliasAlreadyInUseException(alias)
                }
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

        const cacheKey = `shortUrl:${alias}`
        let link: Link | null

        const cachedLinkJson = await this.cacheRepository.get(cacheKey)
        if (!cachedLinkJson) {
            link = await this.linkRepository.findByAlias(alias)
            if (!link) {
                throw new LinkNotFoundException(alias)
            }

            if (link.expiresAt && link.expiresAt <= new Date()) {
                await this.linkRepository.deleteByAlias(alias)
                throw new LinkNotFoundException(alias)
            }

            const ttl = link.expiresAt
                ? Math.ceil((link.expiresAt.getTime() - Date.now()) / 1000)
                : REDIRECT_CACHE_TTL

            await this.cacheRepository.set(
                cacheKey,
                LinkCacheMapper.toJSON(link),
                ttl
            )
        } else {
            link = LinkCacheMapper.fromJSON(cachedLinkJson)
        }

        const newLinkClick = this.linkClickFactory.create({
            ip,
            link,
        })

        await this.linkClicksRepository.create(newLinkClick)

        return link.originalUrl
    }

    async getLinkInfo(
        getLinkInfoDTO: GetLinkInfoCommand
    ): Promise<LinkInfoDto> {
        const { alias } = getLinkInfoDTO
        const link = await this.linkRepository.getInfo(alias)
        if (!link) {
            throw new LinkNotFoundException(alias)
        }
        return link
    }

    async deleteLink(deleteLinkDTO: DeleteLinkCommand): Promise<string> {
        const { alias } = deleteLinkDTO
        return await this.linkRepository.deleteByAlias(alias)
    }

    async getAnalytics(
        getLinkAnalyticsDTO: GetLinkAnalyticsCommand
    ): Promise<AnalyticsDto> {
        const { alias } = getLinkAnalyticsDTO
        const link = await this.linkRepository.getAnalytics(alias)

        if (!link) {
            throw new LinkNotFoundException(alias)
        }

        return link
    }
}
