import { Injectable } from '@nestjs/common';

import { CreateLinkDto } from './dto/create-link.dto';
import { LinkInfoDto } from './dto/link-info.dto';
import { AnalyticsDto } from './dto/analytics.dto';

@Injectable()
export class LinksService {
  createLink(createLinkDto: CreateLinkDto) {
    return `This action adds a new link with ${JSON.stringify(createLinkDto)} body`;
  }

  getOriginalUrl(shortUrl: string): string | null {
    return `wwww.google.com/${shortUrl}`;
  }

  getLinkInfo(shortUrl: string): LinkInfoDto {
    const linkInfo: LinkInfoDto = {
      originalUrl: `original url for ${shortUrl}`,
      createdAt: new Date(),
      clickCount: 0,
    };
    return linkInfo;
  }

  deleteLink(shortUrl: string) {
    return `This action removes a #${shortUrl} link`;
  }

  getAnalytics(shortUrl: string): AnalyticsDto {
    return {
      clickCount: shortUrl.length,
      lastIps: [],
    };
  }
}
