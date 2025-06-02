import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
    IsDate,
    IsOptional,
    IsString,
    IsUrl,
    Matches,
    MaxLength,
} from 'class-validator'

class CreateLinkDto {
    @IsUrl()
    @ApiProperty({
        example: 'https://example.com',
        description: 'The original URL of the link',
    })
    originalUrl: string

    @IsOptional()
    @IsString()
    @MaxLength(20)
    @MaxLength(20)
    @Matches(/^[A-Za-z0-9_-]+$/, {
        message: 'Alias can contain only letters, numbers, underscore and dash',
    })
    @ApiPropertyOptional({
        uniqueItems: true,
        example: 'my-link',
        description: 'The alias of the link',
    })
    alias?: string

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    @ApiPropertyOptional({
        example: '2023-01-01T00:00:00.000Z',
        description: 'The expiration date of the link',
    })
    expiresAt?: Date
}

export { CreateLinkDto }
