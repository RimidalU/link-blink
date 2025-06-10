import { applyDecorators } from '@nestjs/common'
import {
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOperation,
    ApiResponse,
} from '@nestjs/swagger'

import { InternalServerErrorResponseDto } from '../dto/internal--server-error-response.dto'
import { LinkNotFoundDTO } from '../dto/link-note-found.response.dto'

export function RedirectSwagger() {
    return applyDecorators(
        ApiOperation({
            summary: 'Redirect to original url',
            description: `
**Important Note:**  
When a redirect (302 status code) is successful, Swagger UI may display an error such as:  
\`Failed to fetch. Possible Reasons: CORS, Network Failure, URL scheme must be "http" or "https" for CORS request.\`  
This happens because Swagger UI does not support automatic navigation to external URLs via AJAX requests and cannot handle redirects to third-party sites.  
To test the redirect, use your browser or cURL—there will be no error in these cases.
            `,
        }),
        ApiNotFoundResponse({
            description: 'Not Found',
            type: LinkNotFoundDTO,
        }),
        ApiInternalServerErrorResponse({
            description: 'Internal server error',
            type: InternalServerErrorResponseDto,
        }),
        ApiResponse({
            status: 302,
            description:
                'Redirect to original link. Note: Testing this redirect in Swagger UI will result in an error, as Swagger UI does not support redirects to external URLs via AJAX.',
        })
    )
}
