import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsArray, IsIP } from 'class-validator'

export class AnalyticsDto {
    @ApiProperty({
        example: 10,
        description: 'The number of clicks on the link',
    })
    @IsNumber()
    clickCount: number

    @ApiProperty({
        example: ['192.168.0.1', '172.17.0.1'],
        description: 'The last IP addresses that clicked on the link',
    })
    @IsArray()
    @IsIP(4, { each: true })
    lastIps: string[]
}
