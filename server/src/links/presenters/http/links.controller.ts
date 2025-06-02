import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Res,
    HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'
import { CreateLinkCommand } from '@src/links/application/commands/create-link.command'
import { ApiTags } from '@nestjs/swagger'

import { LinksService } from '../../application/links.service'

import { LinkInfoDto } from './dto/link-info.dto'
import { AnalyticsDto } from './dto/analytics.dto'
import { CreateLinkDto } from './dto/create-link.dto'
import { CreateLinkSwagger } from './decorators/create-link.swagger.decorator'
import { DeleteLinkSwagger } from './decorators/delete-link.swagger.decorator'
import { RedirectSwagger } from './decorators/redirect.swagger.decorator'
import { GetLinkInfoSwagger } from './decorators/get-link-info.swagger.decorator'

@ApiTags('Links routes')
@Controller('links')
export class LinksController {
    constructor(private readonly linksService: LinksService) {}

    @CreateLinkSwagger()
    @Post('shorten')
    create(@Body() createLinkDto: CreateLinkDto) {
        return this.linksService.createLink(
            new CreateLinkCommand(
                createLinkDto.originalUrl,
                createLinkDto.alias,
                createLinkDto.expiresAt
            )
        )
    }

    @RedirectSwagger()
    // @ApiExcludeEndpoint()
    @Get(':shortUrl')
    redirect(@Param('shortUrl') shortUrl: string, @Res() res: Response) {
        const originalUrl = this.linksService.getOriginalUrl(shortUrl)

        if (!originalUrl) {
            return res.status(HttpStatus.NOT_FOUND).send('Not found')
        }
        return res.redirect(originalUrl)
    }

    @GetLinkInfoSwagger()
    @Get('info/:shortUrl')
    getInfo(@Param('shortUrl') shortUrl: string): LinkInfoDto {
        return this.linksService.getLinkInfo(shortUrl)
    }

    @DeleteLinkSwagger()
    @Delete('delete/:shortUrl')
    delete(@Param('shortUrl') shortUrl: string) {
        return this.linksService.deleteLink(shortUrl)
    }

    @Get('analytics/:shortUrl')
    getAnalytics(@Param('shortUrl') shortUrl: string): AnalyticsDto {
        return this.linksService.getAnalytics(shortUrl)
    }
}
