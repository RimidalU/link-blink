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
    originalUrl: string

    @IsOptional()
    @IsString()
    @MaxLength(20)
    @MaxLength(20)
    @Matches(/^[A-Za-z0-9_-]+$/, {
        message: 'Alias can contain only letters, numbers, underscore and dash',
    })
    alias?: string

    @IsOptional()
    @IsDate()
    expiresAt?: Date
}

export { CreateLinkDto }
