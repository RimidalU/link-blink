import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class InternalServerErrorResponseDto {
    @ApiProperty({
        example: 'Internal Server Error',
        description: 'Internal Server Error',
    })
    @IsString()
    @IsNotEmpty()
    readonly message: string

    @ApiProperty({
        example: 'Internal Server Error',
        description: 'Internal Server Error',
    })
    @IsString()
    @IsNotEmpty()
    readonly error: string

    @ApiProperty({
        example: 500,
        description: '500',
    })
    @IsNumber()
    @IsNotEmpty()
    readonly statusCode: number
}
