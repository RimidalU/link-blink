import { applyDecorators } from '@nestjs/common'
import {
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOperation,
    ApiResponse,
} from '@nestjs/swagger'

export function DeleteLinkSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Delete short link' }),
        ApiNotFoundResponse({
            description: 'Not Found',
            // type: LinkNotFoundDTO,
        }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error',
            // type: InternalServerErrorResponseDto,
        }),
        ApiResponse({
            status: 204,
            description: 'Link created',
            // type: SuccessResponseDto,
        })
    )
}
