import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsDate, IsNumber, IsNotEmpty } from 'class-validator'

export class LinkInfoDto {
    @ApiProperty({
        example: 'https://example.com',
        description: 'The original URL of the link',
    })
    @IsString()
    @IsNotEmpty()
    originalUrl: string

    @ApiProperty({
        example: '2023-01-01T00:00:00.000Z',
        description: 'The creation date of the link',
    })
    @IsDate()
    @IsNotEmpty()
    createdAt: Date

    @ApiProperty({
        example: 10,
        description: 'The number of clicks on the link',
    })
    @IsNumber()
    @IsNotEmpty()
    clickCount: number
}
