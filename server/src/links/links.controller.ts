import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { LinkInfoDto } from './dto/link-info.dto';
import { AnalyticsDto } from './dto/analytics.dto';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post('shorten')
  create(@Body() createLinkDto: CreateLinkDto) {
    return this.linksService.createLink(createLinkDto);
  }

  @Get(':shortUrl')
  redirect(@Param('shortUrl') shortUrl: string, @Res() res: Response) {
    const originalUrl = this.linksService.getOriginalUrl(shortUrl);

    if (!originalUrl) {
      return res.status(HttpStatus.NOT_FOUND).send('Not found');
    }
    return res.redirect(originalUrl);
  }

  @Get('info/:shortUrl')
  getInfo(@Param('shortUrl') shortUrl: string): LinkInfoDto {
    return this.linksService.getLinkInfo(shortUrl);
  }

  @Delete('delete/:shortUrl')
  delete(@Param('shortUrl') shortUrl: string) {
    return this.linksService.deleteLink(shortUrl);
  }

  @Get('analytics/:shortUrl')
  getAnalytics(@Param('shortUrl') shortUrl: string): AnalyticsDto {
    return this.linksService.getAnalytics(shortUrl);
  }
}
