import { NotFoundException } from '@nestjs/common'

export class LinkNotFoundException extends NotFoundException {
    constructor(shortCode: string) {
        super(`Link with shortcode '${shortCode}' not found.`)
    }
}
