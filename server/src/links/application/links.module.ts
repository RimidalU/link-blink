import { Module } from '@nestjs/common'

import { LinksController } from '../presenters/http/links.controller'
import { LinkFactory } from '../domain/factories/link-factory'

import { LinksService } from './links.service'

@Module({
    controllers: [LinksController],
    providers: [LinksService, LinkFactory],
})
export class LinksModule {}
