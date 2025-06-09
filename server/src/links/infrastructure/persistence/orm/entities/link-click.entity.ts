import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm'
import { IsDateString, IsIP, IsString, MinLength } from 'class-validator'

@Entity('linkClicks')
export class LinkClickEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsString()
    @MinLength(1)
    alias: string

    @Column()
    @IsIP()
    ipAddress: string

    @CreateDateColumn()
    @IsDateString()
    createdAt: Date
}
