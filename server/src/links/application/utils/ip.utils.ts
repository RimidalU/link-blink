import { Request } from 'express'

export function extractClientIp(req: Request): string {
    const xForwardedFor = req.headers['x-forwarded-for']
    if (typeof xForwardedFor === 'string') {
        return xForwardedFor.split(',')[0].trim()
    }
    return req.ip || req.connection.remoteAddress || ''
}
