import { ApiProperty } from '@nestjs/swagger'

export class LinkNotFoundDTO {
    @ApiProperty({
        example: "Link with alias 'my-link' not found",
        description: 'Link not found',
    })
    readonly message: string

    @ApiProperty({
        example: 'Not Found',
        description: 'Not Found',
    })
    readonly error: string

    @ApiProperty({
        example: 404,
        description: '404',
    })
    readonly statusCode: number
}
