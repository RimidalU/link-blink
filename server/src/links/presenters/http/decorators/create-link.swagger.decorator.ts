import { applyDecorators } from '@nestjs/common'
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiOperation,
} from '@nestjs/swagger'

import { CreateLinkResponseDto } from '../dto/create-link-response.dto'
import { InternalServerErrorResponseDto } from '../dto/internal--server-error-response.dto'
import { AliasAlreadyExistsResponseDto } from '../dto/alias-already-exists.response.dto'

export function CreateLinkSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Create new short link' }),
        ApiConflictResponse({
            description: 'Alias already exists',
            type: AliasAlreadyExistsResponseDto,
        }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error',
            type: InternalServerErrorResponseDto,
        }),
        ApiCreatedResponse({
            description: 'Link created',
            type: CreateLinkResponseDto,
        })
    )
}
