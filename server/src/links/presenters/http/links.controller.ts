import { Controller, Get, Post, Body, Param, Delete, Res } from '@nestjs/common'
import { Response } from 'express'
import { CreateLinkCommand } from '@src/links/application/commands/create-link.command'
import { ApiTags } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import { ClientIp } from '@src/common/decorators/client-ip.decorator'
import { GetOriginalUrlCommand } from '@src/links/application/commands/get-original-url.command'
import { GetLinkInfoCommand } from '@src/links/application/commands/get-link-info.command'
import { DeleteLinkCommand } from '@src/links/application/commands/delete-link.command'
import { GetLinkAnalyticsCommand } from '@src/links/application/commands/get-link-analytics.command'

import { LinksService } from '../../application/links.service'

import { LinkInfoDto } from './dto/link-info.dto'
import { AnalyticsDto } from './dto/analytics.dto'
import { CreateLinkDto } from './dto/create-link.dto'
import { CreateLinkSwagger } from './decorators/create-link.swagger.decorator'
import { DeleteLinkSwagger } from './decorators/delete-link.swagger.decorator'
import { RedirectSwagger } from './decorators/redirect.swagger.decorator'
import { GetLinkInfoSwagger } from './decorators/get-link-info.swagger.decorator'
import { GetLinkAnalyticsSwagger } from './decorators/get-link-analytics.swagger.decorator'
import { CreateLinkResponseDto } from './dto/create-link-response.dto'

@ApiTags('Links routes')
@Controller('links')
export class LinksController {
    constructor(
        private readonly linksService: LinksService,
        private configService: ConfigService
    ) {}

    @CreateLinkSwagger()
    @Post('shorten')
    async create(
        @Body() createLinkDto: CreateLinkDto
    ): Promise<CreateLinkResponseDto> {
        const alias = await this.linksService.createLink(
            new CreateLinkCommand(
                createLinkDto.originalUrl,
                createLinkDto.alias,
                createLinkDto.expiresAt
            )
        )
        const apiUrl = await this.configService.get<Promise<string>>('API_URL')

        return { shortUrl: `${apiUrl}/links/${alias}` }
    }

    @RedirectSwagger()
    // @ApiExcludeEndpoint()
    @Get(':shortUrl')
    async redirect(
        @Param('shortUrl') shortUrl: string,
        @Res() res: Response,
        @ClientIp() ip: string
    ): Promise<void> {
        const originalUrl = await this.linksService.getOriginalUrl(
            new GetOriginalUrlCommand(shortUrl, ip)
        )
        return res.redirect(originalUrl)
    }

    @GetLinkInfoSwagger()
    @Get('info/:shortUrl')
    async getInfo(@Param('shortUrl') shortUrl: string): Promise<LinkInfoDto> {
        return await this.linksService.getLinkInfo(
            new GetLinkInfoCommand(shortUrl)
        )
    }

    @DeleteLinkSwagger()
    @Delete('delete/:shortUrl')
    async delete(@Param('shortUrl') shortUrl: string): Promise<string> {
        return await this.linksService.deleteLink(
            new DeleteLinkCommand(shortUrl)
        )
    }

    @GetLinkAnalyticsSwagger()
    @Get('analytics/:shortUrl')
    async getAnalytics(
        @Param('shortUrl') shortUrl: string
    ): Promise<AnalyticsDto> {
        return await this.linksService.getAnalytics(
            new GetLinkAnalyticsCommand(shortUrl)
        )
    }
}
