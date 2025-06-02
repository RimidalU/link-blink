import { applyDecorators } from '@nestjs/common'
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiOperation,
} from '@nestjs/swagger'

export function CreateLinkSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Create new short link' }),
        ApiConflictResponse({
            description: 'Link alias already exists',
            // type: UserAlreadyExistsResponseDto,
        }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error',
            // type: InternalServerErrorResponseDto,
        }),
        ApiCreatedResponse({
            description: 'Link created',
            // type: SuccessResponseDto,
        })
    )
}
