import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class LinkNotFoundDTO {
    @ApiProperty({
        example: "Link with alias 'my-link' not found",
        description: 'Link not found',
    })
    @IsString()
    @IsNotEmpty()
    readonly message: string

    @ApiProperty({
        example: 'Not Found',
        description: 'Not Found',
    })
    @IsString()
    @IsNotEmpty()
    readonly error: string

    @ApiProperty({
        example: 404,
        description: '404',
    })
    @IsNumber()
    @IsNotEmpty()
    readonly statusCode: number
}
