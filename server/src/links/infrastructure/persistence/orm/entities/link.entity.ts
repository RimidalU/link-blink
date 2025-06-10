import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToMany,
} from 'typeorm'

import { LinkClickEntity } from './link-click.entity'

@Entity('links')
export class LinkEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    alias: string

    @Column()
    originalUrl: string

    @CreateDateColumn()
    createdAt: Date

    @Column({ nullable: true })
    expiresAt?: Date

    @OneToMany(() => LinkClickEntity, (click) => click.link)
    clicks: LinkClickEntity[]
}
