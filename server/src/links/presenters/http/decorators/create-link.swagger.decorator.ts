import { applyDecorators } from '@nestjs/common'
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiOperation,
} from '@nestjs/swagger'

import { CreateLinkResponseDto } from '../dto/create-link-response.dto'

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
            type: CreateLinkResponseDto,
        })
    )
}
