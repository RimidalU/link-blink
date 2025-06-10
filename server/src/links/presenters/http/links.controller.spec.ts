import { Test, TestingModule } from '@nestjs/testing'
import { LinksService } from '@src/links/application/links.service'

import { LinksController } from './links.controller'

describe('LinksController', () => {
    let controller: LinksController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LinksController],
            providers: [LinksService],
        }).compile()

        controller = module.get<LinksController>(LinksController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
