import { applyDecorators } from '@nestjs/common'
import {
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOperation,
    ApiResponse,
} from '@nestjs/swagger'

import { AnalyticsDto } from '../dto/analytics.dto'
import { LinkNotFoundDTO } from '../dto/link-note-found.response.dto'
import { InternalServerErrorResponseDto } from '../dto/internal--server-error-response.dto'

export function GetLinkAnalyticsSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Get link analytics' }),
        ApiNotFoundResponse({
            description: 'Not Found',
            type: LinkNotFoundDTO,
        }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error',
            type: InternalServerErrorResponseDto,
        }),
        ApiResponse({
            status: 200,
            description: 'Link analytics',
            type: AnalyticsDto,
        })
    )
}
