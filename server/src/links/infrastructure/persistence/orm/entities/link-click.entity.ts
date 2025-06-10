import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { IsDateString, IsIP } from 'class-validator'

import { LinkEntity } from './link.entity'

@Entity('linkClicks')
export class LinkClickEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => LinkEntity, (link) => link.clicks, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'linkId' })
    link: LinkEntity

    @Column()
    @IsIP()
    ipAddress: string

    @CreateDateColumn()
    @IsDateString()
    createdAt: Date
}
