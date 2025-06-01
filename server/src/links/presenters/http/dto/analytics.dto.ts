import { IsNumber, IsArray, IsIP } from 'class-validator'

export class AnalyticsDto {
    @IsNumber()
    clickCount: number

    @IsArray()
    @IsIP(4, { each: true })
    lastIps: string[]
}
