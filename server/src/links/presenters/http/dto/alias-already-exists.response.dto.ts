import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class AliasAlreadyExistsResponseDto {
    @ApiProperty({
        example: "Alias 'my-link' is already in use.",
        description: 'Alias is already in use.',
    })
    @IsString()
    @IsNotEmpty()
    readonly message: string

    @ApiProperty({
        example: 'Conflict',
        description: 'Conflict',
    })
    @IsString()
    @IsNotEmpty()
    readonly error: string

    @ApiProperty({
        example: 409,
        description: '409',
    })
    @IsNumber()
    @IsNotEmpty()
    readonly statusCode: number
}
