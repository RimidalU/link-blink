import { ApiProperty } from '@nestjs/swagger'

export class AliasAlreadyExistsResponseDto {
    @ApiProperty({
        example: "Alias 'my-link' is already in use.",
        description: 'Alias is already in use.',
    })
    readonly message: string

    @ApiProperty({
        example: 'Conflict',
        description: 'Conflict',
    })
    readonly error: string

    @ApiProperty({
        example: 409,
        description: '409',
    })
    readonly statusCode: number
}
