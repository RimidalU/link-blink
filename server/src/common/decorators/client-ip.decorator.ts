import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export const ClientIp = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): string => {
        const request = ctx.switchToHttp().getRequest<Request>()
        const xForwardedFor = request.headers['x-forwarded-for']
        if (typeof xForwardedFor === 'string') {
            return xForwardedFor.split(',')[0].trim()
        }
        return request.ip || request.connection?.remoteAddress || ''
    }
)
