import { NotFoundException } from '@nestjs/common'

export class LinkNotFoundException extends NotFoundException {
    constructor(alias: string) {
        super(`Link with alias '${alias}' not found`)
    }
}
