import { ApiProperty } from '@nestjs/swagger'

export class CreateLinkResponseDto {
    @ApiProperty({
        example: 'https://example.com/short-link',
        description: 'The short URL of the link',
    })
    shortUrl: string
}
