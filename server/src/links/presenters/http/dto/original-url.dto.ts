import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber } from 'class-validator'

export class OriginalUrlDto {
    @ApiProperty({
        example: 10,
        description: 'The id of the link',
    })
    @IsNumber()
    id: number

    @ApiProperty({
        example: 'https://example.com',
        description: 'The original URL of the link',
    })
    @IsString()
    originalUrl: string
}
