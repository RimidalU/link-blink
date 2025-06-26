import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateLinkResponseDto {
    @ApiProperty({
        example: 'https://example.com/short-link',
        description: 'The short URL of the link',
    })
    @IsString()
    @IsNotEmpty()
    shortUrl: string
}
