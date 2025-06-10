import { applyDecorators } from '@nestjs/common'
import {
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOperation,
    ApiResponse,
} from '@nestjs/swagger'

import { LinkNotFoundDTO } from '../dto/link-note-found.response.dto'
import { InternalServerErrorResponseDto } from '../dto/internal--server-error-response.dto'
import { CreateLinkResponseDto } from '../dto/create-link-response.dto'

export function DeleteLinkSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Delete short link' }),
        ApiNotFoundResponse({
            description: 'Not Found',
            type: LinkNotFoundDTO,
        }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error',
            type: InternalServerErrorResponseDto,
        }),
        ApiResponse({
            status: 204,
            description: 'Link created',
            type: CreateLinkResponseDto,
        })
    )
}
